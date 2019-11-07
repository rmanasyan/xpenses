import { Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { AuthQuery } from './auth/state/auth.query';
import { TransactionsQuery } from './transactions/state/transactions.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean> = merge(this.authQuery.selectLoading(), this.transactionsQuery.selectLoading());

  constructor(private authQuery: AuthQuery, private transactionsQuery: TransactionsQuery) {}
}
