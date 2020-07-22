import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter } from 'rxjs/operators';
import { Auth } from './auth.model';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  signedIn$ = this.select(state => !!state.uid);
  email$ = this.select('email');
  photoURL$ = this.select('photoURL');
  uid$ = this.select('uid').pipe(
    filter(uid => !!uid)
  );

  get previousUrl() {
    return this.getValue().previousUrl;
  }

  constructor(protected store: AuthStore) {
    super(store);
  }
}
