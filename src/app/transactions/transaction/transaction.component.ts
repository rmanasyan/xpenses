import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../state/transaction.model';
import { TransactionsService } from '../state/transactions.service';
import { TransactionsQuery } from '../state/transactions.query';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent implements OnInit {
  transaction$ = this.transactionsQuery.selectTransaction$;

  constructor(
    private router: Router,
    private transactionsQuery: TransactionsQuery,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {}

  discardTransaction() {
    this.navigateHome();
  }

  removeTransaction(id: string) {
    this.transactionsService.remove(id).then(() => this.navigateHome());
  }

  saveTransaction(transaction: Partial<Transaction>) {
    const { id, ...update } = { ...transaction };

    if (id) {
      this.transactionsService.update(id, update).then(() => this.navigateHome());
    } else {
      this.transactionsService.add(update).then(() => this.navigateHome());
    }
  }

  private navigateHome() {
    this.router.navigate(['/']);
  }
}
