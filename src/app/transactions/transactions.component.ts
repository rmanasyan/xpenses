import { Component, OnInit } from '@angular/core';
import { fadeThroughAnimation } from '../shared/animations/fade-through.animation';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [fadeThroughAnimation],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@fadeThroughAnimation]': '' }
})
export class TransactionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
