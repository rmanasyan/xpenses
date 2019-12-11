import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { action, combineQueries, withTransaction } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { FirebaseError, firestore } from 'firebase/app';
import { throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthQuery } from '../../auth/state/auth.query';
import { XDatePipe } from '../../shared/pipes/x-date.pipe';
import { TransactionsStore } from './transactions.store';
import { Transaction } from './transaction.model';
import { prepare } from '../../shared/operators/prepare.operator';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private collection: AngularFirestoreCollection;

  constructor(
    private transactionsStore: TransactionsStore,
    private afs: AngularFirestore,
    private authQuery: AuthQuery,
    private routerQuery: RouterQuery,
    private xDatePipe: XDatePipe
  ) {
    this.get().subscribe();
    this.getStartDate().subscribe();
  }

  get() {
    return this.authQuery.select('uid').pipe(
      prepare(() => this.transactionsStore.setLoading(true)),
      map(uid => {
        this.collection = this.afs.collection(`users/${uid}/transactions`, ref => ref.orderBy('date', 'desc'));
        return this.collection;
      }),
      switchMap(collection => collection.stateChanges()),
      withTransaction((actions: DocumentChangeAction<Transaction>[]) => {
        this.transactionsStore.setLoading(false);

        if (actions.length === 0) {
          return;
        }

        for (const action of actions) {
          const id = action.payload.doc.id;
          const entity = action.payload.doc.data();

          switch (action.type) {
            case 'added':
              // this.transactionsStore.upsert(id, { id, ...entity });
              this.transactionsStore.add({ id, ...entity });
              break;
            case 'removed':
              this.transactionsStore.remove(id);
              break;
            case 'modified':
              this.transactionsStore.update(id, entity);
          }
        }
      }),
      catchError((error: FirebaseError) => {
        this.transactionsStore.reset();
        this.transactionsStore.setLoading(false);
        this.transactionsStore.setError(error);
        return throwError(error);
      })
    );
  }

  get2() {
    return combineQueries([
      this.authQuery.select('uid'),
      this.routerQuery.selectParams('date')
    ]).pipe(
    // this.authQuery.select('uid').pipe(
      tap(([uid, date]) => {
        console.log('--- date change', date);
        if (date) {
          // this.transactionsStore.reset();
        }
      }),
      // TODO: replace prepare
      prepare(() => this.transactionsStore.setLoading(true)),
      map(([uid, date]) => {
        // console.log('----1', date);
        // const thisMonthStart = date ? new Date(date) : new Date();
        const currentMonth = new Date(date);
        // console.log('--', new Date( thisMonthStart.setMonth(thisMonthStart.getMonth() + 1) ) );
        const nextMonth = new Date( new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1 ) );
        console.log('thisMonthStart', currentMonth);
        console.log('lastMonthEnd', nextMonth);
        // new Date(new Date().setMonth(new Date().getMonth() - 1))
        this.collection = this.afs.collection(
          `users/${uid}/transactions`,
          ref => ref
            // .where('createdAt', '>', lastMonth)
            .where('createdAt', '>=', currentMonth)
            .where('createdAt', '<', nextMonth)
            .orderBy('createdAt', 'desc'));
        return this.collection;
      }),
      switchMap(collection => collection.stateChanges()),
      withTransaction((actions: DocumentChangeAction<Transaction>[]) => {
        this.transactionsStore.setLoading(false);

        if (actions.length === 0) {
          return;
        }

        for (const action of actions) {
          const id = action.payload.doc.id;
          const entity = action.payload.doc.data();

          switch (action.type) {
            case 'added':
              // this.transactionsStore.upsert(id, { id, ...entity });
              this.transactionsStore.add({id, ...entity});
              break;
            case 'removed':
              this.transactionsStore.remove(id);
              break;
            case 'modified':
              this.transactionsStore.update(id, entity);
          }
        }
      }),
      catchError((error: FirebaseError) => {
        this.transactionsStore.reset();
        this.transactionsStore.setLoading(false);
        this.transactionsStore.setError(error);
        return throwError(error);
      })
    );
  }

  add(transaction: Partial<Transaction>) {
    return this.collection.add({
      ...transaction,
      createdAt: TransactionsService.timestamp,
      updatedAt: TransactionsService.timestamp
    });
  }

  remove(id: string) {
    return this.collection.doc(id).delete();
  }

  update(id, transaction: Partial<Transaction>) {
    return this.collection.doc(id).update({
      ...transaction,
      updatedAt: TransactionsService.timestamp
    });
  }

  getStartDate() {
    return this.authQuery.select('uid').pipe(
      map(uid => {
        return this.afs.collection(
          `users/${uid}/transactions`,
          ref => ref.orderBy('date', 'asc').limit(1));
      }),
      switchMap(collection => collection.valueChanges()),
      filter(response => !!response.length),
      withTransaction(response => {
        const startDate = this.xDatePipe.transform(response[0].date, 'yyyy-MM');
        this.updateStartDate(startDate);
      })
    );
  }

  @action('Update startDate')
  updateStartDate(startDate: string) {
    this.transactionsStore.update({
      ui: {startDate}
    });
  }

  private static get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
