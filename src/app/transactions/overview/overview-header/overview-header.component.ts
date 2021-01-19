import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionMonth } from '../../state/transaction.model';
import { TransactionsQuery } from '../../state/transactions.query';
import { fadeIn } from '../../../shared/animations/fade-in.animation';

@UntilDestroy()
@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss'],
  animations: [fadeIn],
})
export class OverviewHeaderComponent implements OnInit, OnChanges {
  @Input() dateOffset: number;
  @ViewChildren('monthRef') monthRefs: QueryList<ElementRef>;
  total$: Observable<number>;
  income$: Observable<number>;
  expenses$: Observable<number>;
  months$: Observable<TransactionMonth[]>;
  loading$: Observable<boolean>;
  urlPath: string;
  urlDate: string;
  urlParam: string;
  monthDates: TransactionMonth['date'][];

  constructor(private transactionsQuery: TransactionsQuery, private router: Router) {}

  get isCategorizedViewActive(): boolean {
    return this.urlPath === 'categorized' || this.urlParam === 'category';
  }

  get isDailyViewActive(): boolean {
    return this.urlPath === 'daily' || this.urlParam === 'day';
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

  ngOnInit() {
    this.total$ = this.transactionsQuery.selectTotal$;
    this.income$ = this.transactionsQuery.selectIncome$;
    this.expenses$ = this.transactionsQuery.selectExpenses$;
    this.loading$ = this.transactionsQuery.selectLoading();
    this.months$ = this.transactionsQuery.selectMonths$.pipe(
      tap((months) => {
        this.monthDates = months.map((month) => month.date);
      })
    );

    this.transactionsQuery.selectParsedRouterUrl$.pipe(untilDestroyed(this)).subscribe(({ path, date, param }) => {
      this.urlPath = path;
      this.urlDate = date;
      this.urlParam = param;
    });
  }

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

  private changeMonth(increment: number): void {
    const dateIndex = this.monthDates.indexOf(this.urlDate);
    const newDateIndex = dateIndex - increment;
    const newDate = this.monthDates[newDateIndex];

    if (newDateIndex >= 0) {
      this.scrollMonthIntoView(newDateIndex);
    }

    if (newDate) {
      this.router.navigate([`/${this.urlPath}/${newDate}`]);
    }
  }

  private scrollMonthIntoView(dateIndex: number): void {
    this.monthRefs
      .find((item, index) => index === dateIndex)
      ?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
  }
}
