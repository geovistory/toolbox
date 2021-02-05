import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NavbarModule } from '../../shared/components/navbar/navbar.module';


import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { LogoutConfirmationComponent } from './components/logout-confirmation/logout-confirmation.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountEmailComponent } from './pages/account-email/account-email.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountActions } from './api/account.actions';
import { PassiveLinkModule } from 'app/shared';
import { AccountEpics } from './api/account.epics';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ValidationDirectivesModule } from "app/core/validation/validation.directives";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccountRoutingModule,
    NavbarModule,
    PassiveLinkModule,
    ValidationDirectivesModule
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    EmailVerifiedComponent,
    LogoutConfirmationComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent,
    AccountComponent,
    AccountProfileComponent,
    AccountEmailComponent,
    AccountPasswordComponent,
    AccessDeniedComponent,
  ],
  providers: [
    AccountActions,
    AccountEpics
  ]
})
export class AccountModule { }
