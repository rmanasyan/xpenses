import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';

@Component({
  selector: 'app-overview-history',
  templateUrl: './overview-history.component.html',
  styleUrls: ['./overview-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewHistoryComponent implements OnInit {
  filteredTransactions$: Observable<Transaction[]> = this.transactionsQuery.selectFiltered$;

  constructor(private transactionsQuery: TransactionsQuery) {
  }

  ngOnInit() {
  }

  trackByFn(i, transaction: Transaction) {
    return transaction.id;
  }

  categoryIcon(transaction: Transaction) {
    // TODO: load icon from categories collection
    if (transaction.category === 'food') { return 'icon-bowl'; }
    if (transaction.category === 'shopping') { return 'icon-shopping-basket'; }
    if (transaction.category === 'digital') { return 'icon-video'; }
    if (transaction.category === 'misc') { return 'icon-bucket'; }
    if (transaction.category === 'salary') { return 'icon-credit'; }
    if (transaction.category === 'salary2') { return 'icon-credit'; }

    return 'icon-water';
  }
}
