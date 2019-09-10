import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { Auth } from './auth.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private authStore: AuthStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Auth[]>('https://api.com').pipe(tap(entities => {
      this.authStore.set(entities);
    }));
  }

  add(auth: Auth) {
    this.authStore.add(auth);
  }

  update(id, auth: Partial<Auth>) {
    this.authStore.update(id, auth);
  }

  remove(id: ID) {
    this.authStore.remove(id);
  }
}
