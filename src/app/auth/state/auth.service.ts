import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, FirebaseError, User } from 'firebase/app';
import { from, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private afAuth: AngularFireAuth) {
    this.get().subscribe();
  }

  get() {
    this.authStore.setLoading(true);

    return this.afAuth.authState.pipe(
      tap(() => this.authStore.setLoading(false)),
      filter((user: User) => !!user),
      tap(({ email, uid }) => this.authStore.update({ email, uid })),
      catchError((error: FirebaseError) => {
        this.authStore.setError(error);
        return throwError(error);
      })
    );
  }

  signIn() {
    this.authStore.setLoading(true);

    from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(
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
        tap(() => this.authStore.reset()),
        catchError((error: FirebaseError) => {
          this.authStore.setError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }
}
