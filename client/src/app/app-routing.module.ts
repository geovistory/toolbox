import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';
import { HomeComponent } from './modules/home/pages/home.component';



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
        loadChildren: './modules/login-and-registration/login-and-registration.module#LoginAndRegistrationModule',
      },
      {
        path: 'account',
        loadChildren: './modules/account/account.module#AccountModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        loadChildren: './modules/projects/projects.module#ProjectsModule',
        canActivate: [AuthGuard]
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
