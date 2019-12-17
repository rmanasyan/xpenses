import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsQuery } from '../../state/transactions.query';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewHeaderComponent implements OnInit {
  total$ = this.transactionsQuery.selectTotal$;
  income$ = this.transactionsQuery.selectIncome$;
  expenses$ = this.transactionsQuery.selectExpenses$;
  months$ = this.transactionsQuery.selectMonths$;

  constructor(private transactionsQuery: TransactionsQuery, private router: Router) {
  }

  ngOnInit() {
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
