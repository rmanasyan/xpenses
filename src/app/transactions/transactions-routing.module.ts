import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewHistoryComponent } from './overview/overview-history/overview-history.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions.component';
import { OverviewCategorizedComponent } from './overview/overview-categorized/overview-categorized.component';
import { OverviewGuard } from './overview/overview.guard';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        children: [
          { path: '', canActivate: [OverviewGuard], },
          { path: 'categorized/:date', component: OverviewCategorizedComponent },
          { path: 'history/:date', component: OverviewHistoryComponent }
        ]
      },
      { path: 'transaction', component: TransactionComponent },
      { path: 'transaction/:date', component: TransactionComponent },
      { path: 'transaction/:date/:id', component: TransactionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
