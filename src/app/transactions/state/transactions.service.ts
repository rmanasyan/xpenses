import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TransactionsStore } from './transactions.store';
import { Transaction } from './transaction.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionsService {

  constructor(private transactionsStore: TransactionsStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Transaction[]>('https://api.com').pipe(tap(entities => {
      this.transactionsStore.set(entities);
    }));
  }

  add(transaction: Transaction) {
    this.transactionsStore.add(transaction);
  }

  update(id, transaction: Partial<Transaction>) {
    this.transactionsStore.update(id, transaction);
  }

  remove(id: ID) {
    this.transactionsStore.remove(id);
  }
}
