import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { LoginComponent } from './login/login.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'email-verified',
    component: EmailVerifiedComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout-confirmation',
    component: LogoutConfirmationComponent
  },
  {
    path: 'request-password-reset',
    component: RequestPasswordResetComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAndRegistrationRoutingModule { }