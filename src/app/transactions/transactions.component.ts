import { Component, OnInit } from '@angular/core';
import { fadeThrough } from '../shared/animations/fade-through.animation';
import { TransactionsService } from './state/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [fadeThrough],
})
export class TransactionsComponent implements OnInit {
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {}

  updateAnimationState(isDone: boolean) {
    this.transactionsService.updateAnimationDone(isDone);
  }
}
