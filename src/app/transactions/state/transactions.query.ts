import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { map, switchMap } from 'rxjs/operators';
import { TransactionType } from './transaction.model';
import { TransactionsState, TransactionsStore } from './transactions.store';

@Injectable({providedIn: 'root'})
@QueryConfig({
  sortBy: 'date',
  sortByOrder: Order.DESC
})
export class TransactionsQuery extends QueryEntity<TransactionsState> {
  selectTransaction$ = this.routerQuery.selectParams('id').pipe(
    switchMap(id => this.selectEntity(id))
  );

  selectTotal$ = this.selectAll().pipe(
    map(transactions => {
      return transactions.reduce(
        (total, t) => {
          const amount: number = t.type === TransactionType.Debit ? -t.amount : +t.amount;
          return total + amount;
        },
        0);
    })
  );

  selectIncome$ = this.selectAll().pipe(
    map(transactions => {
      return transactions
        .filter(t => t.type === TransactionType.Credit)
        .reduce((total, t) => total + +t.amount, 0);
    })
  );

  selectExpenses$ = this.selectAll().pipe(
    map(transactions => {
      return transactions
        .filter(t => t.type === TransactionType.Debit)
        .reduce((total, t) => total + +t.amount, 0);
    })
  );

  selectCategorized$ = this.selectAll().pipe(
    map(transactions => {
      return [...transactions.reduce(
        (entryMap, e) => {
          const amount: number = e.type === TransactionType.Debit ? -e.amount : +e.amount;
          const total: { total: number } = ((entryMap.get(e.category) || {}).total || 0) + amount;
          return entryMap.set(e.category, {total});
        },
        new Map()
      )];
    })
  );

  selectCategorizedIncome$ = this.selectCategorized$.pipe(
    map(categorized => {
      return categorized
        .filter(item => item[1].total > 0)
        .sort((a, b) => b[1].total - a[1].total);
    })
  );

  selectCategorizedExpenses$ = this.selectCategorized$.pipe(
    map(categorized => {
      return categorized
        .filter(item => item[1].total < 0)
        .sort((a, b) => a[1].total - b[1].total);
    })
  );

  constructor(protected store: TransactionsStore, private routerQuery: RouterQuery) {
    super(store);
  }
}
