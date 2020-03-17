import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { action, combineQueries, withTransaction } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { FirebaseError, firestore } from 'firebase/app';
import { throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthQuery } from '../../auth/state/auth.query';
import { getCurrentMonthStart, getNextMonthStart } from '../../shared/helpers/x-common';
import { XDatePipe } from '../../shared/pipes/x-date.pipe';
import { TransactionsStore } from './transactions.store';
import { Transaction } from './transaction.model';

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
  }

  init() {
    this.syncMonths().subscribe();
    this.syncMonthTransactions().subscribe();
  }

  syncMonthTransactions() {
    return combineQueries([
      this.authQuery.select('uid'),
      this.routerQuery.selectParams('date')
    ]).pipe(
      tap(() => this.transactionsStore.setLoading(true)),
      map(([uid, date]) => {
        this.collection = this.afs.collection(
          `users/${uid}/transactions`,
          ref => ref
            .where('date', '<', getNextMonthStart(date))
            .where('date', '>=', getCurrentMonthStart(date))
            .orderBy('date', 'desc'));

        return this.collection;
      }),
      switchMap(collection => collection.stateChanges()),
      tap(() => this.transactionsStore.setLoading(false)),
      withTransaction((actions: DocumentChangeAction<Transaction>[]) => {
        if (actions.length === 0) {
          return;
        }

        for (const actn of actions) {
          const id = actn.payload.doc.id;
          const entity = actn.payload.doc.data();

          switch (actn.type) {
            case 'added':
              this.transactionsStore.upsert(id, { id, ...entity });
              // this.transactionsStore.add({id, ...entity});
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

  syncMonths() {
    return this.authQuery.select('uid').pipe(
      map(uid => {
        return this.afs.collection(
          `users/${uid}/transactions`,
          ref => ref.orderBy('date', 'asc').limit(1));
      }),
      switchMap(collection => collection.valueChanges()),
      filter(response => !!response.length),
      withTransaction((response: Transaction[]) => {
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
