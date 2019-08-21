import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TransactionsStore, TransactionsState } from './transactions.store';

@Injectable({ providedIn: 'root' })
export class TransactionsQuery extends QueryEntity<TransactionsState> {

  constructor(protected store: TransactionsStore) {
    super(store);
  }

}
