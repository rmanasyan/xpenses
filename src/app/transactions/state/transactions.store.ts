import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Transaction } from './transaction.model';

export interface TransactionsState extends EntityState<Transaction> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'transactions', resettable: true})
export class TransactionsStore extends EntityStore<TransactionsState> {

  constructor() {
    super({
      loading: false,
      ui: { startDate: '' }
    });
  }

}

