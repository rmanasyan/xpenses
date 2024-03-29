import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { combineQueries } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthQuery } from './auth/state/auth.query';
import { AuthService } from './auth/state/auth.service';
import { CategoriesQuery } from './categories/state/categories.query';
import { CategoriesService } from './categories/state/categories.service';
import { TransactionsQuery } from './transactions/state/transactions.query';
import { TransactionsService } from './transactions/state/transactions.service';
import { fadeThrough } from './shared/animations/fade-through.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeThrough],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private transactionsQuery: TransactionsQuery,
    private transactionsService: TransactionsService,
    private categoriesQuery: CategoriesQuery,
    private categoriesService: CategoriesService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.authService.init();
    this.transactionsService.init();
    this.categoriesService.init();
  }

  ngOnInit() {
    this.loading$ = combineQueries([
      this.authQuery.selectLoading(),
      this.transactionsQuery.selectLoading(),
      this.categoriesQuery.selectLoading()
    ]).pipe(map(([a, t, c]) => a || t || c));

    // fixes :active on ios
    this.document.addEventListener('touchstart', () => {}, false);
    // fixes double tap on ios
    this.document.addEventListener('click', () => {}, false);
  }
}
