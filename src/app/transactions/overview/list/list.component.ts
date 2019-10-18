import { Component, OnInit } from '@angular/core';
import { TransactionsQuery } from '../../state/transactions.query';
import { TransactionsService } from '../../state/transactions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  transactions$ = this.transactionsQuery.selectAll();
  loading$ = this.transactionsQuery.selectLoading();

  constructor(private transactionsQuery: TransactionsQuery, private transactionsService: TransactionsService) {}

  ngOnInit() {}

  addTransaction(input: HTMLInputElement) {
    this.transactionsService.add({ amount: input.value });
    input.value = '';
  }

  removeTransaction(id: string) {
    this.transactionsService.remove(id);
  }

  updateTransaction(id: string) {
    const transaction = {
      amount: Math.random()
        .toFixed(2)
        .toString()
    };

    this.transactionsService.update(id, transaction);
  }

  trackByFn(i, transaction) {
    return transaction.id;
  }
}
