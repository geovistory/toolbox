import { Routes } from '@angular/router';
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { SystemAdminGuard } from '../../shared/services/system-admin-guard.service';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registration',
    loadComponent: () => import('./account/registration/registration.component').then(x => x.RegistrationComponent)
  },
  {
    path: 'email-verified',
    loadComponent: () => import('./account/email-verified/email-verified.component').then(x => x.EmailVerifiedComponent)
  },
  {
    path: 'access-denied',
    loadComponent: () => import('./account/access-denied/access-denied.component').then(x => x.AccessDeniedComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./account/login/login.component').then(x => x.LoginComponent)
  },
  {
    path: 'logout-confirmation',
    loadComponent: () => import('./account/logout-confirmation/logout-confirmation.component').then(x => x.LogoutConfirmationComponent)
  },
  {
    path: 'request-password-reset',
    loadComponent: () => import('./account/request-password-reset/request-password-reset.component').then(x => x.RequestPasswordResetComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./account/reset-password/reset-password.component').then(x => x.ResetPasswordComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./project-list/project-list.component').then(m => m.ProjectListComponent),
    // line above instead of loadChildren: getProjectModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/create',
    loadComponent: () => import('./project-create/project-create.component').then(m => m.ProjectCreateComponent),
    // line above instead of loadChildren: getProjectModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('../project/project.routes').then(m => m.PROJECT_ROUTES),
    canActivate: [AuthGuard]
  },
  // {
  //   path: ':pkActiveProject/edit',
  //   component: ProjectEditComponent
  // },
  {
    path: 'admin',
    redirectTo: 'backoffice',
    pathMatch: 'full'
  },
  {
    path: 'backoffice',
    loadChildren: () => import('../backoffice/backoffice.routes').then(m => m.BACKOFFICE_ROUTES),
    canActivate: [AuthGuard, SystemAdminGuard]
    // canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
