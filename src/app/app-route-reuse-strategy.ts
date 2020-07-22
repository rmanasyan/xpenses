import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { OverviewCategorizedComponent } from './transactions/overview/overview-categorized/overview-categorized.component';
import { OverviewHistoryComponent } from './transactions/overview/overview-history/overview-history.component';

@Injectable()
export class AppRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return curr.component === OverviewCategorizedComponent || curr.component === OverviewHistoryComponent
      ? false
      : future.routeConfig === curr.routeConfig;
  }
}
