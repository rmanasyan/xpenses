import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, FirebaseError, User } from 'firebase/app';
import { from, throwError } from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { prepare } from '../../shared/operators/prepare.operator';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private afAuth: AngularFireAuth) {
    this.get().subscribe();
  }

  get() {
    return this.afAuth.authState.pipe(
      prepare(() => this.authStore.setLoading(true)),
      tap(() => this.authStore.setLoading(false)),
      filter((user: User) => !!user),
      tap(({ email, photoURL, uid }) => this.authStore.update({ email, photoURL, uid })),
      catchError((error: FirebaseError) => {
        this.authStore.setError(error);
        return throwError(error);
      })
    );
  }

  signIn() {
    from(this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()))
      .pipe(
        prepare(() => this.authStore.setLoading(true)),
        first(),
        catchError((error: FirebaseError) => {
          this.authStore.setError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  signOut() {
    from(this.afAuth.auth.signOut())
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
}
