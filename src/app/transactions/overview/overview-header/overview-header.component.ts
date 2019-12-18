import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
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

  constructor(private transactionsQuery: TransactionsQuery, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        startWith(this.parseRouterUrl()),
        filter(e => e instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => this.parseRouterUrl());
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

  private parseRouterUrl() {
    const [, path, date] = [...(this.router.url.match(/(categorized|history)\/(\d{4}-\d{2})/) || [])];
    this.urlPath = path;
    this.urlDate = date;
  }
}
