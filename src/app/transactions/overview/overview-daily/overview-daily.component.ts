import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesQuery } from '../../../categories/state/categories.query';
import { DailyTransaction } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';

@Component({
  selector: 'app-overview-daily',
  templateUrl: './overview-daily.component.html',
  styleUrls: ['./overview-daily.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDailyComponent implements OnInit {
  daily$: Observable<DailyTransaction[]>;
  loading$: Observable<boolean>;

  constructor(
    private transactionsQuery: TransactionsQuery,
    private categoriesQuery: CategoriesQuery,
    private router: Router
  ) {}

  get historyLink() {
    const [, date] = [...(this.router.url.match(/(\d{4}-\d{2})/) || [])];
    return `/history/${date}`;
  }

  ngOnInit() {
    this.daily$ = this.transactionsQuery.selectDaily$;
    this.loading$ = this.transactionsQuery.selectLoading();
  }
}
