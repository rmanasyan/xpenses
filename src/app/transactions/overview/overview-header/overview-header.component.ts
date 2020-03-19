import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TransactionMonth } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';
import { fadeIn } from '../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss'],
  animations: [fadeIn]
})
export class OverviewHeaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dateOffset: number;
  total$: Observable<number>;
  income$: Observable<number>;
  expenses$: Observable<number>;
  months$: Observable<TransactionMonth[]>;
  routeAnimationOptions$: Observable<any>;
  loading$: Observable<boolean>;
  urlPath: string;
  urlDate: string;
  monthDates: TransactionMonth['date'][];

  constructor(private transactionsQuery: TransactionsQuery, private router: Router) {}

  ngOnInit() {
    this.total$ = this.transactionsQuery.selectTotal$;
    this.income$ = this.transactionsQuery.selectIncome$;
    this.expenses$ = this.transactionsQuery.selectExpenses$;
    this.routeAnimationOptions$ = this.transactionsQuery.selectRouteAnimationOptions$;
    this.loading$ = this.transactionsQuery.selectLoading();
    this.months$ = this.transactionsQuery.selectMonths$.pipe(tap(months => {
      this.monthDates = months.map(month => month.date);
    }));

    this.transactionsQuery.selectParsedRouterUrl$.pipe(untilDestroyed(this)).subscribe(({ path, date }) => {
      this.urlPath = path;
      this.urlDate = date;
    });
  }

  ngOnDestroy() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.dateOffset.firstChange) {
      const { previousValue, currentValue } = changes.dateOffset;
      this.changeMonth(currentValue - previousValue);
    }
  }

  isMonthActive(date: string): boolean {
    return this.urlDate === date;
  }

  monthLink(date: string): string {
    return `/${this.urlPath}/${date}`;
  }

  get isHistoryViewActive(): boolean {
    return this.urlPath === 'history';
  }

  get toggleLink(): string {
    const newPath = this.urlPath === 'categorized' ? 'history' : 'categorized';
    return `/${newPath}/${this.urlDate}`;
  }

  get transactionLink(): string {
    return `/transaction/${this.urlDate}`;
  }

  private changeMonth(increment: number): void {
    const dateIndex = this.monthDates.indexOf(this.urlDate);
    const newDate = this.monthDates[dateIndex - increment];

    if (newDate) {
      this.router.navigate([`/${this.urlPath}/${newDate}`]);
    }
  }
}
