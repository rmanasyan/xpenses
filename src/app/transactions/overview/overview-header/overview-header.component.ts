import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TransactionsQuery } from '../../state/transactions.query';
import { TransactionsService } from '../../state/transactions.service';

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

  constructor(private transactionsService: TransactionsService, private transactionsQuery: TransactionsQuery, private router: Router) {
  }

  ngOnInit() {
    this.transactionsService.syncMonths().pipe(untilDestroyed(this)).subscribe();
    this.transactionsService.syncMonthTransactions().pipe(untilDestroyed(this)).subscribe();
  }

  ngOnDestroy(): void {
  }

  get monthLink() {
    const [, path] = [...this.router.url.match(/(categorized|history)/)];
    return `/${path}`;
  }

  get toggleLink() {
    const [, path, date] = [...this.router.url.match(/(categorized|history)\/(\d{4}-\d{2})/)];
    const newPath = path === 'categorized' ? 'history' : 'categorized';
    return `/${newPath}/${date}`;
  }
}
