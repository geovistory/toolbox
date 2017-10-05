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
import { ProjectSettingsProfileComponent } from './project-settings-profile/project-settings-profile.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { ProjectSettingsCollaboratorsComponent } from './project-settings-collaborators/project-settings-collaborators.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { AppellationComponent } from './appellation/appellation.component';

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
        canActivate: [AuthGuard],
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
        path: 'project/:id',
        canActivate: [AuthGuard],
        children : [
          {
            path: '',
            component: ProjectDashboardComponent,
          },
          {
            path: 'settings',
            component: ProjectSettingsComponent,
            children : [
              {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
              },
              {
                path: 'profile',
                component: ProjectSettingsProfileComponent
              },
              {
                path: 'collaborators',
                component: ProjectSettingsCollaboratorsComponent
              }
            ]
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
      {
        path: 'appellation-test',
        component: AppellationComponent
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
