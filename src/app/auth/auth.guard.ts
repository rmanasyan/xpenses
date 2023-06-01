import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthQuery } from './state/auth.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private authQuery: AuthQuery) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authQuery.signedIn$.pipe(
      map(signedIn => {
        if (signedIn) {
          return true;
        }

        this.router.navigateByUrl('auth');
        return false;
      }),
      take(1)
    );
  }
}
