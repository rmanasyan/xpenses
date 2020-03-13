import { Component, OnInit } from '@angular/core';
import { fadeThroughAnimation } from '../shared/animations/fade-through.animation';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [fadeThroughAnimation],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
