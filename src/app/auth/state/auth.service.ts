import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { setLoading } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import firebase from 'firebase/compat/app';
import { EMPTY, from } from 'rxjs';
import { catchError, filter, first, map, pairwise, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private afAuth: AngularFireAuth, private routerQuery: RouterQuery) {}

  init() {
    this.sync().subscribe();
    this.syncRouterState().subscribe();
  }

  sync() {
    return this.afAuth.authState.pipe(
      setLoading(this.authStore),
      first(),
      filter((user: firebase.User) => !!user),
      tap(({ email, photoURL, uid }) => this.authStore.update({ email, photoURL, uid })),
      catchError((error: firebase.FirebaseError) => {
        this.authStore.setError(error);
        return EMPTY;
      })
    );
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });

    from(this.afAuth.signInWithRedirect(provider))
      .pipe(
        setLoading(this.authStore),
        first(),
        catchError((error: firebase.FirebaseError) => {
          this.authStore.setError(error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  signOut() {
    from(this.afAuth.signOut())
      .pipe(
        first(),
        tap(() => this.authStore.reset()),
        catchError((error: firebase.FirebaseError) => {
          this.authStore.setError(error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  syncRouterState() {
    return this.routerQuery
      .select((state) => state.state && state.state.url)
      .pipe(
        pairwise(),
        map((urlsPair) => this.authStore.update({ previousUrl: urlsPair[0] || '/' }))
      );
  }
}
