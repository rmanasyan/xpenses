import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsQuery } from '../state/transactions.query';
import { fadeThroughAnimation } from '../../shared/animations/fade-through.animation';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeThroughAnimation],
})
export class OverviewComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private transactionsQuery: TransactionsQuery) { }

  ngOnInit() {
    this.loading$ = this.transactionsQuery.selectLoading();
  }

}
