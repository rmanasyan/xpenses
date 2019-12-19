import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TransactionsQuery } from '../../state/transactions.query';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss']
})
export class OverviewHeaderComponent implements OnInit, OnDestroy {
  total$ = this.transactionsQuery.selectTotal$;
  income$ = this.transactionsQuery.selectIncome$;
  expenses$ = this.transactionsQuery.selectExpenses$;
  months$ = this.transactionsQuery.selectMonths$;
  urlPath: string;
  urlDate: string;

  constructor(private transactionsQuery: TransactionsQuery) {}

  ngOnInit() {
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
