import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TransactionsQuery } from '../../state/transactions.query';
import { TransactionsService } from '../../state/transactions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  transactions$ = this.transactionsQuery.selectAll();
  loading$ = this.transactionsQuery.selectLoading();

  constructor(private transactionsQuery: TransactionsQuery, private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService
      .get()
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  addTransaction(input: HTMLInputElement) {
    this.transactionsService.add(input.value);
    input.value = '';
  }

  removeTransaction(id: string) {
    this.transactionsService.remove(id);
  }

  updateTransaction(id: string) {
    const transaction = {
      amount: Math.random().toFixed(2).toString()
    };

    this.transactionsService.update(id, transaction);
  }

  trackByFn(i, transaction) {
    return transaction.id;
  }

  ngOnDestroy() {}
}
