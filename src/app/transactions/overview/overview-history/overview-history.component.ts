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
  filteredTransactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;

  constructor(private transactionsQuery: TransactionsQuery) {
  }

  ngOnInit() {
    this.filteredTransactions$ = this.transactionsQuery.selectFiltered$;
    this.loading$ = this.transactionsQuery.selectLoading();
  }

  trackByFn(i, transaction: Transaction) {
    return transaction.id;
  }
}
