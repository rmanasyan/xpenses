import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OverviewGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // TODO: get the latest date from transactions history
    const month = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 7);

    this.router.navigate([`categorized/${month}`]);
    return false;
  }
}
