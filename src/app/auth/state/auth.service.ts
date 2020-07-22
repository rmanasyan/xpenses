import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { setLoading } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { auth, FirebaseError, User } from 'firebase/app';
import { from, throwError } from 'rxjs';
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
      filter((user: User) => !!user),
      tap(({ email, photoURL, uid }) => this.authStore.update({ email, photoURL, uid })),
      catchError((error: FirebaseError) => {
        this.authStore.setError(error);
        return throwError(error);
      })
    );
  }

  signIn() {
    const provider = new auth.GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });

    from(this.afAuth.signInWithRedirect(provider))
      .pipe(
        setLoading(this.authStore),
        first(),
        catchError((error: FirebaseError) => {
          this.authStore.setError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  signOut() {
    from(this.afAuth.signOut())
      .pipe(
        first(),
        tap(() => this.authStore.reset()),
        catchError((error: FirebaseError) => {
          this.authStore.setError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  syncRouterState() {
    return this.routerQuery
      .select(state => state.state && state.state.url)
      .pipe(
        pairwise(),
        map(urlsPair => this.authStore.update({ previousUrl: urlsPair[0] || '/' }))
      );
  }
}
