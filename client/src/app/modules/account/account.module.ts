import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountEmailComponent } from './pages/account-email/account-email.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';

@NgModule({
  imports: [
    FormsModule,
    NavbarModule,
    AccountRoutingModule,
    CommonModule
  ],
  declarations: [
    AccountComponent,
    AccountProfileComponent,
    AccountEmailComponent,
    AccountPasswordComponent
  ]
})
export class AccountModule { }
