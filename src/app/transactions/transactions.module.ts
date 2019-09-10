import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewHeaderComponent } from './overview/overview-header/overview-header.component';
import { OverviewCategorizedComponent } from './overview/overview-categorized/overview-categorized.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OverviewComponent, OverviewHeaderComponent, OverviewCategorizedComponent],
  imports: [CommonModule, TransactionsRoutingModule, SharedModule, AuthModule]
})
export class TransactionsModule {}
