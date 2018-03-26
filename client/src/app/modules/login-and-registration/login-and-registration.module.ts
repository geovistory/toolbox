import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginAndRegistrationRoutingModule } from './login-and-registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LoginAndRegistrationRoutingModule,
    NavbarModule
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    EmailVerifiedComponent,
    LogoutConfirmationComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent
  ]
})
export class LoginAndRegistrationModule { }
