import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { TransactionMonth } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';
import { fadeIn } from '../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss'],
  animations: [fadeIn]
})
export class OverviewHeaderComponent implements OnInit, OnDestroy {
  total$: Observable<number>;
  income$: Observable<number>;
  expenses$: Observable<number>;
  months$: Observable<TransactionMonth[]>;
  routeAnimationOptions$: Observable<any>;
  loading$: Observable<boolean>;
  urlPath: string;
  urlDate: string;

  constructor(private transactionsQuery: TransactionsQuery) {}

  ngOnInit() {
    this.total$ = this.transactionsQuery.selectTotal$;
    this.income$ = this.transactionsQuery.selectIncome$;
    this.expenses$ = this.transactionsQuery.selectExpenses$;
    this.months$ = this.transactionsQuery.selectMonths$;
    this.routeAnimationOptions$ = this.transactionsQuery.selectRouteAnimationOptions$;
    this.loading$ = this.transactionsQuery.selectLoading();

    this.transactionsQuery.selectParsedRouterUrl$.pipe(untilDestroyed(this)).subscribe(({ path, date }) => {
      this.urlPath = path;
      this.urlDate = date;
    });
  }

  ngOnDestroy() {}

  isMonthActive(date: string): boolean {
    return this.urlDate === date;
  }

  monthLink(date: string): string {
    return `/${this.urlPath}/${date}`;
  }

  get isHistoryViewActive(): boolean {
    return this.urlPath === 'history';
  }

  get toggleLink(): string {
    const newPath = this.urlPath === 'categorized' ? 'history' : 'categorized';
    return `/${newPath}/${this.urlDate}`;
  }

  get transactionLink(): string {
    return `/transaction/${this.urlDate}`;
  }
}
