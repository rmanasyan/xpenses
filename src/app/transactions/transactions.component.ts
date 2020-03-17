import { Component, OnInit } from '@angular/core';
import { fadeThrough } from '../shared/animations/fade-through.animation';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [fadeThrough],
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
