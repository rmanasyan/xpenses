import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppShellComponent } from './app-shell/app-shell.component';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [AppModule, ServerModule, RouterModule.forRoot(routes), SharedModule],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent],
})
export class AppServerModule {
  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
}
