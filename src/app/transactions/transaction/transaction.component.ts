import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
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
export class TransactionComponent implements OnInit {
  transaction$: Observable<Transaction> = this.transactionsQuery.selectTransaction$;
  loading$: Observable<boolean> = this.transactionsQuery.selectLoading();

  constructor(
    private router: Router,
    private routerQuery: RouterQuery,
    private transactionsQuery: TransactionsQuery,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
  }

  discardTransaction() {
    this.navigateBack();
  }

  removeTransaction(id: string) {
    this.transactionsService.remove(id).then(() => this.navigateBack());
  }

  saveTransaction(transaction: Partial<Transaction>) {
    const { id, ...update } = { ...transaction };

    if (id) {
      this.transactionsService.update(id, update).then(() => this.navigateBack());
    } else {
      console.log('update', update);
      this.transactionsService.add(update).then(() => this.navigateBack());
    }
  }

  get backLink() {
    return `/categorized/${this.routerQuery.getParams('date')}`;
  }

  private navigateBack() {
    this.router.navigate([`/categorized/${this.routerQuery.getParams('date')}`]);
  }
}
