import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { XDatePipe } from '../../shared/pipes/x-date.pipe';

@Injectable({
  providedIn: 'root'
})
export class OverviewGuard {
  constructor(private router: Router, private xDatePipe: XDatePipe) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const month = this.xDatePipe.transform(Date.now(), 'yyyy-MM');

    this.router.navigate([`categorized/${month}`]);
    return false;
  }
}
