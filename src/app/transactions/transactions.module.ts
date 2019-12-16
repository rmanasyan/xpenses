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
import { AuthModule } from '../auth/auth.module';
import { OverviewHistoryComponent } from './overview/overview-history/overview-history.component';

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewHeaderComponent,
    OverviewCategorizedComponent,
    TransactionComponent,
    TransactionFormComponent,
    TransactionsComponent,
    OverviewHistoryComponent
  ],
  imports: [CommonModule, TransactionsRoutingModule, SharedModule, ReactiveFormsModule, AuthModule]
})
export class TransactionsModule {}
