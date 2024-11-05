import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';
import { SystemAdminGuard } from '../../services/system-admin-guard.service';
import { MaintenanceComponent } from '../maintenance/maintenance.component';
import { HomeComponent } from './home/home.component';
import { maintenanceConfig } from '../../maintenance.config';

const isMaintenanceMode = maintenanceConfig.isMaintenanceMode;

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    component: isMaintenanceMode ? MaintenanceComponent : HomeComponent
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent
  },
  {
    path: 'registration',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/registration/registration.component').then(x => x.RegistrationComponent)
  },
  {
    path: 'email-verified',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/email-verified/email-verified.component').then(x => x.EmailVerifiedComponent)
  },
  {
    path: 'access-denied',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/access-denied/access-denied.component').then(x => x.AccessDeniedComponent)
  },
  {
    path: 'login',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/login/login.component').then(x => x.LoginComponent)
  },
  {
    path: 'logout-confirmation',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/logout-confirmation/logout-confirmation.component').then(x => x.LogoutConfirmationComponent)
  },
  {
    path: 'request-password-reset',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/request-password-reset/request-password-reset.component').then(x => x.RequestPasswordResetComponent)
  },
  {
    path: 'reset-password',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./account/reset-password/reset-password.component').then(x => x.ResetPasswordComponent)
  },
  {
    path: 'projects',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./project-list/project-list.component').then(m => m.ProjectListComponent),
    // line above instead of loadChildren: getProjectModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/create',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadComponent: isMaintenanceMode ? undefined : () => import('./project-create/project-create.component').then(m => m.ProjectCreateComponent),
    // line above instead of loadChildren: getProjectModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
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
    component: isMaintenanceMode ? MaintenanceComponent : undefined,
    loadChildren: () => import('../backoffice/backoffice.routes').then(m => m.BACKOFFICE_ROUTES),
    canActivate: [AuthGuard, SystemAdminGuard]
    // canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
