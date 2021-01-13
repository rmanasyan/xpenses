import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewHeaderComponent } from './overview/overview-header/overview-header.component';
import { OverviewCategorizedComponent } from './overview/overview-categorized/overview-categorized.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionsComponent } from './transactions.component';
import { OverviewHistoryComponent } from './overview/overview-history/overview-history.component';
import { TransactionTypeSelectComponent } from './transaction/transaction-form/transaction-type-select/transaction-type-select.component';
import { TransactionCategorySelectComponent } from './transaction/transaction-form/transaction-category-select/transaction-category-select.component';
import { TransactionDateInputComponent } from './transaction/transaction-form/transaction-date-input/transaction-date-input.component';
import { OverviewDailyComponent } from './overview/overview-daily/overview-daily.component';

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewHeaderComponent,
    OverviewCategorizedComponent,
    OverviewDailyComponent,
    OverviewHistoryComponent,
    TransactionComponent,
    TransactionFormComponent,
    TransactionsComponent,
    TransactionTypeSelectComponent,
    TransactionCategorySelectComponent,
    TransactionDateInputComponent,
  ],
  imports: [CommonModule, TransactionsRoutingModule, SharedModule, ReactiveFormsModule],
})
export class TransactionsModule {}
