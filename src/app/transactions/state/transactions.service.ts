import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { withTransaction } from '@datorama/akita';
import { FirebaseError } from 'firebase/app';
import { throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthQuery } from '../../auth/state/auth.query';
import { TransactionsStore } from './transactions.store';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private collection: AngularFirestoreCollection;

  constructor(
    private transactionsStore: TransactionsStore,
    private afs: AngularFirestore,
    private authQuery: AuthQuery
  ) {}

  get() {
    return this.authQuery.select('uid').pipe(
      map(uid => {
        this.collection = this.afs.collection(`users/${uid}/transactions`);
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

  add(amount: string) {
    this.collection.add({ amount });
  }

  remove(id: string) {
    this.collection.doc(id).delete();
  }

  update(id, transaction: Partial<Transaction>) {
    this.collection.doc(id).update(transaction);
  }
}
