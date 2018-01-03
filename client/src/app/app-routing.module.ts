import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {EmailVerifiedComponent} from './email-verified/email-verified.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
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
import { ProjectEntitiesComponent } from './project-entities/project-entities.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectSourcesComponent } from './project-sources/project-sources.component';
import { SourceComponent } from './source/source.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountPasswordComponent } from './account-password/account-password.component';
import { AccountEmailComponent } from './account-email/account-email.component';
import { AccountComponent } from './account/account.component';
import { ProjectSettingsDataComponent } from './project-settings-data/project-settings-data.component';
import { EntityEditorComponent } from './entity-editor/entity.editor.component';

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
        path: 'request-password-reset',
        component: RequestPasswordResetComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },

      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard],
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
          {
            path: 'profile',
            component: AccountProfileComponent
          }
        ]
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projects/create',
        canActivate: [AuthGuard],
        component: ProjectCreateComponent
      },
      {
        path: 'projects/:id',
        canActivate: [AuthGuard],
        children : [
          {
            path: '',
            component: ProjectDashboardComponent,
          },
          {
            path: 'edit',
            component: ProjectEditComponent,
            children:[
              {
                outlet: 'information',
                path: 'search',
                component: ProjectEntitiesComponent
              },
              {
                outlet: 'information',
                path: 'entity/:id',
                component: EntityEditorComponent
              },
              {
                outlet: 'sources',
                path: 'search',
                component: ProjectSourcesComponent
              },
              {
                outlet: 'sources',
                path: 'source/:id',
                component: SourceComponent
              }
            ]
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
              },
              {
                path: 'data',
                component: ProjectSettingsDataComponent
              }
            ]
          }
        ]
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
