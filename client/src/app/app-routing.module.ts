import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {EmailVerifiedComponent} from './email-verified/email-verified.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {LogoutConfirmationComponent} from './logout-confirmation/logout-confirmation.component';
import {RequestPasswordResetComponent} from './request-password-reset/request-password-reset.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ProjectCreateComponent} from './project-create/project-create.component';
import {ProjectListComponent} from './project-list/project-list.component';

const indexRoute:Route = {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
};

const fallbackRoute:Route =
{
  path: '**',
  redirectTo: '/home',
  pathMatch: 'full'
};

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
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
        path: 'user',
        component: UserDashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'projects',
            pathMatch: 'full'
          },
          {
            path: 'projects',
            component: ProjectListComponent
          },
          {
            path: 'create-project',
            component: ProjectCreateComponent
          }
        ]
      },
      {
        path: 'request-password-reset',
        component: RequestPasswordResetComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      indexRoute,
      fallbackRoute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
