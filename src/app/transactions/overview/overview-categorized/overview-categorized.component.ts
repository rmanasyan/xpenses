import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesQuery } from '../../../categories/state/categories.query';
import { CategorizedTransaction } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';

@Component({
  selector: 'app-overview-categorized',
  templateUrl: './overview-categorized.component.html',
  styleUrls: ['./overview-categorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewCategorizedComponent implements OnInit {
  categorizedIncome$: Observable<CategorizedTransaction[]>;
  categorizedExpenses$: Observable<CategorizedTransaction[]>;
  loading$: Observable<boolean>;

  constructor(
    private transactionsQuery: TransactionsQuery,
    private categoriesQuery: CategoriesQuery,
    private router: Router
  ) {}

  ngOnInit() {
    this.categorizedIncome$ = this.transactionsQuery.selectCategorizedIncome$;
    this.categorizedExpenses$ = this.transactionsQuery.selectCategorizedExpenses$;
    this.loading$ = this.transactionsQuery.selectLoading();
  }

  get historyLink() {
    const [, date] = [...this.router.url.match(/(\d{4}-\d{2})/) || []];
    return `/history/${date}`;
  }
}
