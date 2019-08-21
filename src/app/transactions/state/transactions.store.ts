import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface TransactionsState extends EntityState<Transaction> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'transactions' })
export class TransactionsStore extends EntityStore<TransactionsState> {

  constructor() {
    super();
  }

}

