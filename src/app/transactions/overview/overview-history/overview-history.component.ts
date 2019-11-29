import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';
import { TransactionsService } from '../../state/transactions.service';

@Component({
  selector: 'app-overview-history',
  templateUrl: './overview-history.component.html',
  styleUrls: ['./overview-history.component.scss']
})
export class OverviewHistoryComponent implements OnInit {
  transactions$ = this.transactionsQuery.selectAll();

  constructor(private transactionsQuery: TransactionsQuery, private transactionsService: TransactionsService) {
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