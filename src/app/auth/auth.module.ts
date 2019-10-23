import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AvatarComponent } from './avatar/avatar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports: [AuthComponent, AvatarComponent],
  declarations: [AuthComponent, AvatarComponent]
})
export class AuthModule {}
