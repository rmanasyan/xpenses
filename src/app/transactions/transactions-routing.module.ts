import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'transaction', component: TransactionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
