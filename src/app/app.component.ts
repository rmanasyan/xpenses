import { Component } from '@angular/core';
import { combineQueries } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthQuery } from './auth/state/auth.query';
import { AuthService } from './auth/state/auth.service';
import { TransactionsQuery } from './transactions/state/transactions.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean> = combineQueries([
    this.authQuery.selectLoading(),
    this.transactionsQuery.selectLoading()
  ]).pipe(map(([a, t]) => a || t));

  constructor(private authQuery: AuthQuery, private transactionsQuery: TransactionsQuery, private authService: AuthService) {
    this.authService.get().subscribe();
  }
}
