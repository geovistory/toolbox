import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth/auth-guard.service';
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
    path: 'access-denied',
    component: AccessDeniedComponent
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
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'password',
        component: AccountPasswordComponent
      },
      {
        path: 'email',
        component: AccountEmailComponent
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
