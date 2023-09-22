import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationDirectivesModule } from 'projects/app-toolbox/src/app/core/validation/validation.directives';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutConfirmationComponent } from './components/logout-confirmation/logout-confirmation.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountEmailComponent } from './pages/account-email/account-email.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { AccountComponent } from './pages/account/account.component';





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
    AccountEmailComponent,
    AccountPasswordComponent,
    AccessDeniedComponent,
  ],
  exports: [
    LoginComponent
  ],
  providers: [
  ]
})
export class AccountModule { }
