import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ProjectSettingsProfileComponent } from './components/project-settings-profile/project-settings-profile.component';
import { ProjectSettingsCollaboratorsComponent } from './components/project-settings-collaborators/project-settings-collaborators.component';
import { ProjectSettingsDataComponent } from './components/project-settings-data/project-settings-data.component';
import { ProxyRouteComponent } from 'app/shared/components/proxy-route';


const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'create',
    component: ProjectCreateComponent
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: ProjectDashboardComponent,
      },
      {
        path: 'edit',
        component: ProjectEditComponent,
        children: [
          {
            path: '',
            outlet: 'information',
            component: ProxyRouteComponent,
            children: [
              {
                path: '',
                loadChildren: '../information/information.module#InformationModule'
              }
            ]
          },
          {
            path: '',
            outlet: 'sources',
            component: ProxyRouteComponent,
            children: [
              {
                path: '',
                loadChildren: '../sources/sources.module#SourcesModule'
              }
            ]
          }
        ]
      },
      {
        path: 'settings',
        component: ProjectSettingsComponent,
        children: [
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
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }