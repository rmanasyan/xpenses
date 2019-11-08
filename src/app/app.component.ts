import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthQuery } from './auth/state/auth.query';
import { TransactionsQuery } from './transactions/state/transactions.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean> = combineLatest([
    this.authQuery.selectLoading(),
    this.transactionsQuery.selectLoading()
  ]).pipe(map(([a, t]) => a || t));

  constructor(private authQuery: AuthQuery, private transactionsQuery: TransactionsQuery) {}
}
