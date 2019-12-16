import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { Transaction } from '../state/transaction.model';
import { TransactionsService } from '../state/transactions.service';
import { TransactionsQuery } from '../state/transactions.query';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent implements OnInit, OnDestroy {
  transaction$: Observable<Transaction> = this.transactionsQuery.selectTransaction$;
  loading$: Observable<boolean> = this.transactionsQuery.selectLoading();

  constructor(
    private router: Router,
    private transactionsQuery: TransactionsQuery,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.transactionsService.syncMonthTransactions().pipe(untilDestroyed(this)).subscribe();
  }

  ngOnDestroy(): void {
  }

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
