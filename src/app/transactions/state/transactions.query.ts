import { Injectable } from '@angular/core';
import { combineQueries, Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { map, pairwise, startWith, switchMap } from 'rxjs/operators';
import { CategoriesQuery } from '../../categories/state/categories.query';
import { getCurrentMonthStart, getMonthNames, getNextMonthStart } from '../../shared/helpers/x-common';
import { XDatePipe } from '../../shared/pipes/x-date.pipe';
import { Transaction, TransactionType } from './transaction.model';
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

  selectMonthTransactions$ = combineQueries([
    this.routerQuery.selectParams('date'),
    this.selectAll(),
    this.categoriesQuery.selectAll({ asObject: true })
  ]).pipe(
    map(([date, transactions, categories]) => {
      return transactions.filter(
        t => getNextMonthStart(date) > t.date.toDate() && t.date.toDate() >= getCurrentMonthStart(date)
      ).map((transaction: Transaction) => {
        return {
          ...transaction,
          category: categories[transaction.categoryId]
        };
      });
    })
  );

  selectFiltered$ = this.routerQuery.selectQueryParams('category').pipe(
    switchMap(categoryId => this.selectMonthTransactions$.pipe(
      map(transactions => categoryId ? transactions.filter(t => t.categoryId === categoryId) : transactions)
    ))
  );

  selectTotal$ = this.selectMonthTransactions$.pipe(
    map(transactions => {
      return transactions.reduce(
        (total, t) => {
          const amount: number = t.type === TransactionType.Debit ? -t.amount : +t.amount;
          return total + amount;
        },
        0);
    })
  );

  selectIncome$ = this.selectMonthTransactions$.pipe(
    map(transactions => {
      return transactions
        .filter(t => t.type === TransactionType.Credit)
        .reduce((total, t) => total + +t.amount, 0);
    })
  );

  selectExpenses$ = this.selectMonthTransactions$.pipe(
    map(transactions => {
      return transactions
        .filter(t => t.type === TransactionType.Debit)
        .reduce((total, t) => total + +t.amount, 0);
    })
  );

  selectCategorized$ = this.selectMonthTransactions$.pipe(
    map(transactions => {
      return [
        ...transactions.reduce((entryMap, e) => {
          const amount: number = e.type === TransactionType.Debit ? -e.amount : +e.amount;
          const total: { total: number } = ((entryMap.get(e.categoryId) || {}).total || 0) + amount;
          const category = e.category;

          return entryMap.set(e.categoryId, { total, category });
        }, new Map())
      ];
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

  selectStartDate$ = this.select(state => state.ui.startDate);

  selectMonths$ = this.selectStartDate$.pipe(
    map(date => {
      const monthNames = getMonthNames();
      const currentDate = this.xDatePipe.transform(Date.now(), 'yyyy-MM');
      const startDate = date || currentDate;

      const [startYear, startMonth] = startDate.split('-');
      const [currentYear, currentMonth] = currentDate.split('-');
      const numberOfMonths = (+currentYear - +startYear) * 12 + (+currentMonth - +startMonth) + 1;

      return [...Array(numberOfMonths).keys()]
        .map((value, index) => {
          const month = (+startMonth + index) % 12 || 12;
          const monthPadded = ('' + month).padStart(2, '0');
          const year = +startYear + Math.floor((+startMonth + index - 1) / 12);
          return {
            date: `${year}-${monthPadded}`,
            name: monthNames[month - 1]
          };
        })
        .reverse();
    })
  );

  selectParsedRouterUrl$ = this.routerQuery.select(state => state.state.url).pipe(
    map(url => {
      const [, path, date] = [...url.match(/(categorized|history)\/(\d{4}-\d{2})/) || []];
      return { path, date };
    })
  );

  selectRouteAnimationOptions$ = this.selectParsedRouterUrl$.pipe(
    startWith({
      path: 'categorized',
      date: '3020-01'
    }),
    pairwise(),
    map(([prev, curr]) => {
      const samePath = prev.path === curr.path;
      const prevDateNumber = prev.date && prev.date.replace(/-/g, '');
      const currDateNumber = curr.date && curr.date.replace(/-/g, '');

      return {
        value: samePath ? currDateNumber : curr.path,
        params: {
          directionEnter: prevDateNumber > currDateNumber ? '' : '-',
          directionLeave: prevDateNumber > currDateNumber ? '-' : ''
        }
      };
    })
  );

  constructor(
    protected store: TransactionsStore,
    private routerQuery: RouterQuery,
    private categoriesQuery: CategoriesQuery,
    private xDatePipe: XDatePipe
  ) {
    super(store);
  }
}
