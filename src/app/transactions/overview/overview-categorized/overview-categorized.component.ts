import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsQuery } from '../../state/transactions.query';
import { TransactionsService } from '../../state/transactions.service';

@Component({
  selector: 'app-overview-categorized',
  templateUrl: './overview-categorized.component.html',
  styleUrls: ['./overview-categorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewCategorizedComponent implements OnInit {
  categorizedIncome$ = this.transactionsQuery.selectCategorizedIncome$;
  categorizedExpenses$ = this.transactionsQuery.selectCategorizedExpenses$;

  constructor(private transactionsQuery: TransactionsQuery, private transactionsService: TransactionsService, private router: Router) {
  }

  ngOnInit() {
  }

  get historyLink() {
    const [, date] = [...this.router.url.match(/(\d{4}-\d{2})/)];
    return `/history/${date}`;
  }

  categoryName(category: string) {
    // TODO: load name from categories collection in categories service
    if (category === 'food') {
      return 'Food and drinks';
    }
    if (category === 'shopping') {
      return 'Shopping';
    }
    if (category === 'digital') {
      return 'Digital';
    }
    if (category === 'misc') {
      return 'Misc';
    }
    if (category === 'salary') {
      return 'Salary';
    }
    if (category === 'salary2') {
      return 'Salary 2';
    }

    return category;
  }

  categoryIcon(category: string) {
    // TODO: load icon from categories collection
    if (category === 'food') {
      return 'icon-bowl';
    }
    if (category === 'shopping') {
      return 'icon-shopping-basket';
    }
    if (category === 'digital') {
      return 'icon-video';
    }
    if (category === 'misc') {
      return 'icon-bucket';
    }
    if (category === 'salary') {
      return 'icon-credit';
    }
    if (category === 'salary2') {
      return 'icon-credit';
    }

    return 'icon-water';
  }
}
