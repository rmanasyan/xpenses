import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Auth } from './auth.model';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  isSignedIn$ = this.select(state => !!state.uid);
  email$ = this.select('email');

  isLoggedIn() {
    return !!this.getValue().uid;
  }

  constructor(protected store: AuthStore) {
    super(store);
  }

}
