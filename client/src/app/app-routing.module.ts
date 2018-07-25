import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core';
import { ProjectsModule } from './modules/projects/projects.module';
import { AdminModule } from './modules/admin/admin.module';


export function getProjectModule() { return ProjectsModule };
export function getAdminModule() { return AdminModule };

const indexRoute: Route = {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
};

const fallbackRoute: Route =
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  };

const routes: Routes = [
  {
    path: '',
    children: [
      indexRoute,
      {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule'
      },
      {
        path: '',
        loadChildren: './modules/account/account.module#AccountModule',
      },
      {
        path: 'projects',
        loadChildren: './modules/projects/projects.module#ProjectsModule',
        // line above instead of loadChildren: getProjectModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116 
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule',
        // canActivate: [AdminGuard]
      },
      fallbackRoute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
