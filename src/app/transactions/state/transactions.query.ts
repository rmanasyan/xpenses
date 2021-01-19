import { Injectable } from '@angular/core';
import { combineQueries, Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { filter, map, pairwise, shareReplay, skip, startWith, switchMap } from 'rxjs/operators';
import { CategoriesQuery } from '../../categories/state/categories.query';
import { getCurrentMonthStart, getMonthNames, getNextMonthStart } from '../../shared/helpers/x-common';
import { XDatePipe } from '../../shared/pipes/x-date.pipe';
import {
  CategorizedTransaction,
  DailyTransaction,
  Transaction,
  TransactionMonth,
  TransactionType,
} from './transaction.model';
import { TransactionsState, TransactionsStore } from './transactions.store';
import { Observable } from 'rxjs';
import { Category } from '../../categories/state/category.model';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'date',
  sortByOrder: Order.DESC,
})
export class TransactionsQuery extends QueryEntity<TransactionsState> {
  selectTransaction$: Observable<Transaction> = this.routerQuery.selectParams('id').pipe(
    switchMap((id) => this.selectEntity(id)),
    shareReplay()
  );

  selectMonthTransactions$: Observable<Transaction[]> = combineQueries([
    this.routerQuery.selectParams('date'),
    this.selectAll(),
    this.categoriesQuery.selectAll({ asObject: true }),
  ]).pipe(
    map(([date, transactions, categories]) => {
      return transactions
        .filter((t) => getNextMonthStart(date) > t.date.toDate() && t.date.toDate() >= getCurrentMonthStart(date))
        .map((transaction: Transaction) => {
          return {
            ...transaction,
            category: categories[transaction.categoryId],
          };
        });
    }),
    shareReplay()
  );

  selectFiltered$: Observable<Transaction[]> = this.routerQuery.selectQueryParams(['category', 'day']).pipe(
    switchMap(([categoryId, day]: [string, string]) =>
      this.selectMonthTransactions$.pipe(
        map((transactions) => (categoryId ? transactions.filter((t) => t.categoryId === categoryId) : transactions)),
        map((transactions) => (day ? transactions.filter((t) => t.date.toDate().getDate() === +day) : transactions))
      )
    ),
    shareReplay()
  );

  selectTotal$: Observable<number> = this.selectMonthTransactions$.pipe(
    map((transactions) => {
      return transactions.reduce((total, t) => {
        const amount: number = t.type === TransactionType.Debit ? -t.amount : +t.amount;
        return total + amount;
      }, 0);
    }),
    shareReplay()
  );

  selectIncome$: Observable<number> = this.selectMonthTransactions$.pipe(
    map((transactions) => {
      return transactions.filter((t) => t.type === TransactionType.Credit).reduce((total, t) => total + +t.amount, 0);
    }),
    shareReplay()
  );

  selectExpenses$: Observable<number> = this.selectMonthTransactions$.pipe(
    map((transactions) => {
      return transactions.filter((t) => t.type === TransactionType.Debit).reduce((total, t) => total + +t.amount, 0);
    }),
    shareReplay()
  );

  selectCategorized$: Observable<CategorizedTransaction[]> = this.selectMonthTransactions$.pipe(
    map((transactions) => {
      const categorizedMap: Map<string, { total: number; category: Category }> = transactions.reduce((entryMap, e) => {
        const amount: number = e.type === TransactionType.Debit ? -e.amount : +e.amount;
        const total: number = (entryMap.get(e.categoryId)?.total || 0) + amount;
        const category = e.category;

        return entryMap.set(e.categoryId, { total, category });
      }, new Map<string, { total: number; category: Category }>());

      return [...categorizedMap].reduce((entryArray, e, i) => {
        entryArray[i] = { ...e[1], categoryId: e[0] };

        return entryArray;
      }, [] as CategorizedTransaction[]);
    }),
    shareReplay()
  );

  selectCategorizedIncome$: Observable<CategorizedTransaction[]> = this.selectCategorized$.pipe(
    map((categorized) => {
      return categorized.filter((item) => item.total > 0).sort((a, b) => b.total - a.total);
    }),
    shareReplay()
  );

  selectCategorizedExpenses$: Observable<CategorizedTransaction[]> = this.selectCategorized$.pipe(
    map((categorized) => {
      return categorized.filter((item) => item.total < 0).sort((a, b) => a.total - b.total);
    }),
    shareReplay()
  );

  selectDaily$: Observable<DailyTransaction[]> = this.selectMonthTransactions$.pipe(
    map((transactions) => {
      const groupedByDayMap = transactions.reduce((entryMap, e) => {
        const amount: number = e.type === TransactionType.Debit ? -e.amount : +e.amount;
        const day: string = this.xDatePipe.transform(e.date, 'd');
        const dayTransactionsAmount: number = (entryMap.get(day)?.dayTransactionsAmount || 0) + amount;
        const date = e.date;

        return entryMap.set(day, { dayTransactionsAmount, date });
      }, new Map<string, { dayTransactionsAmount: number; date: Transaction['date'] }>());

      return [...groupedByDayMap]
        .reverse()
        .reduce((entryArray, e, i) => {
          const day: string = e[0];
          const dayTotal: number = (entryArray[i - 1]?.dayTotal || 0) + e[1]?.dayTransactionsAmount;
          entryArray[i] = { ...e[1], dayTotal, day };

          return entryArray;
        }, [] as DailyTransaction[])
        .reverse();
    }),
    shareReplay()
  );

  selectStartDate$: Observable<string> = this.select((state) => state.ui.startDate);

  selectMonths$: Observable<TransactionMonth[]> = this.selectStartDate$.pipe(
    map((date) => {
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
            index: month,
            name: monthNames[month - 1],
            year,
          };
        })
        .reverse();
    }),
    shareReplay()
  );

  selectParsedRouterUrl$: Observable<{ date: string; path: string; param: string }> = this.routerQuery
    .select((state) => state.state.url)
    .pipe(
      map((url) => {
        const [, path, date, , param] = [...(url.match(/(categorized|daily|history)\/(\d{4}-\d{2})(\?(\w+))*/) || [])];
        return { path, date, param };
      }),
      shareReplay()
    );

  selectRouteAnimationOptions$: Observable<{
    params: { directionEnter: string; directionLeave: string };
    value: string;
  }> = this.selectParsedRouterUrl$.pipe(
    startWith({
      path: 'categorized',
      date: '3020-01',
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
          directionLeave: prevDateNumber > currDateNumber ? '-' : '',
        },
      };
    }),
    shareReplay()
  );

  selectAnimationDone$: Observable<boolean> = this.select((state) => state.animation.done).pipe(
    skip(1),
    filter((done) => !!done)
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
