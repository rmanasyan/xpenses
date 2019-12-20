import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { CategoriesStore, CategoriesState } from './categories.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC
})
export class CategoriesQuery extends QueryEntity<CategoriesState> {

  constructor(protected store: CategoriesStore) {
    super(store);
  }

}
