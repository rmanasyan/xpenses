import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Auth } from './auth.model';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  signedIn$ = this.select(state => !!state.uid);
  email$ = this.select('email');

  signedIn() {
    return !!this.getValue().uid;
  }

  constructor(protected store: AuthStore) {
    super(store);
  }

}
