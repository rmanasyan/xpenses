import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsQuery } from '../state/transactions.query';
import { sharedAxis } from '../../shared/animations/shared-axis.animation';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sharedAxis],
})
export class OverviewComponent implements OnInit {
  routeAnimationOptions$: Observable<any>;
  dateOffset = 0;

  constructor(private transactionsQuery: TransactionsQuery) { }

  ngOnInit() {
    this.routeAnimationOptions$ = this.transactionsQuery.selectRouteAnimationOptions$;
  }

  prevMonth() {
    this.dateOffset--;
  }

  nextMonth() {
    this.dateOffset++;
  }
}
