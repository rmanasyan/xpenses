import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { AuthGuard } from '../auth/auth.guard';
import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    // canActivate: [AuthGuard],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
    children: [
      { path: '', component: OverviewComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'transaction/:id', component: TransactionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
