import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { withTransaction } from '@datorama/akita';
import { AuthQuery } from '../../auth/state/auth.query';
import { TransactionsStore } from './transactions.store';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  // TODO: dynamic path
  private collection = this.afs.collection('users/nItUP6v6WmRVDjWk1cnuRPWgIRc2/transactions');

  constructor(
    private transactionsStore: TransactionsStore,
    private afs: AngularFirestore,
    private authQuery: AuthQuery
  ) {}

  get() {
    this.authQuery.select('uid').subscribe(uid => {
      console.log('authzzz', uid);
    });

    return this.collection.stateChanges().pipe(
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
