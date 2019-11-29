import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { setLoading } from '@datorama/akita';
import { auth, FirebaseError, User } from 'firebase/app';
import { from, throwError } from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private afAuth: AngularFireAuth) {
    this.get().subscribe();
  }

  get() {
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
    from(this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()))
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
