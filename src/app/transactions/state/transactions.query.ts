import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { switchMap } from 'rxjs/operators';
import { TransactionsStore, TransactionsState } from './transactions.store';

@Injectable({ providedIn: 'root' })
export class TransactionsQuery extends QueryEntity<TransactionsState> {
  selectTransaction$ = this.routerQuery.selectParams('id').pipe(
    switchMap(id => this.selectEntity(id))
  );

  constructor(protected store: TransactionsStore, private routerQuery: RouterQuery) {
    super(store);
  }
}
