import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '../auth/auth.module';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewHeaderComponent } from './overview/overview-header/overview-header.component';
import { OverviewCategorizedComponent } from './overview/overview-categorized/overview-categorized.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './overview/list/list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewHeaderComponent,
    OverviewCategorizedComponent,
    ListComponent,
    TransactionComponent,
    TransactionFormComponent
  ],
  imports: [CommonModule, TransactionsRoutingModule, SharedModule, AuthModule, ReactiveFormsModule]
})
export class TransactionsModule {}
