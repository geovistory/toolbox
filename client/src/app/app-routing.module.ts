import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';
import { HomeComponent } from './modules/home/pages/home.component';
import { ProjectListComponent } from './modules/projects/components/project-list/project-list.component';
import { ProjectsModule } from './modules/projects/projects.module';



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
        loadChildren: () => ProjectsModule,
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
