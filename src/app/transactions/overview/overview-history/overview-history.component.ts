import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';
import { fadeThroughAnimation } from '../../../shared/animations/fade-through.animation';

@Component({
  selector: 'app-overview-history',
  templateUrl: './overview-history.component.html',
  styleUrls: ['./overview-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeThroughAnimation],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@fadeThroughAnimation]': '' }
})
export class OverviewHistoryComponent implements OnInit {
  filteredTransactions$: Observable<Transaction[]>;

  constructor(private transactionsQuery: TransactionsQuery) {
  }

  ngOnInit() {
    this.filteredTransactions$ = this.transactionsQuery.selectFiltered$;
  }

  trackByFn(i, transaction: Transaction) {
    return transaction.id;
  }
}
