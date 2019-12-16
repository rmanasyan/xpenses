import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { OverviewHistoryComponent } from './overview/overview-history/overview-history.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions.component';
import { OverviewCategorizedComponent } from './overview/overview-categorized/overview-categorized.component';
import { OverviewGuard } from './overview/overview.guard';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
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
      { path: 'transaction/:date/:id', component: TransactionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
