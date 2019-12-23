import { Injectable } from '@angular/core';
import { Auth } from './auth.model';
import { Store, StoreConfig } from '@datorama/akita';

export function createInitialState(): Auth {
  return {
    email: null,
    photoURL: null,
    uid: null,
    previousUrl: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<Auth> {
  constructor() {
    super(createInitialState());
  }
}
