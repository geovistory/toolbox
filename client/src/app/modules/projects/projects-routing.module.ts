import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProxyRouteComponent } from 'app/shared/components/proxy-route';
import { Information2Module } from '../information/information.module';
import { SourcesModule } from '../sources';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectEditComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
import { ProjectSettingsCollaboratorsComponent } from './containers/project-settings-collaborators/project-settings-collaborators.component';
import { ProjectSettingsDataComponent } from './containers/project-settings-data/project-settings-data.component';
import { ProjectSettingsProfileComponent } from './containers/project-settings-profile/project-settings-profile.component';
import { ClassSettingsComponent } from './containers/class-settings/class-settings.component';
import { ProjectSettingsComponent } from './containers/project-settings/project-settings.component';
import { TypesComponent } from './containers/types/types.component';

export function getInformation2Module() { return Information2Module };

export function getSourcesModule() { return SourcesModule };

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
                loadChildren: '../information/information.module#Information2Module'
                // line above instead of loadChildren: InformationModule according to: https://github.com/angular/angular-cli/issues/4192#issuecomment-274775116
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
            pathMatch: 'full',
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
            path: 'classes',
            component: ProjectSettingsDataComponent
          },
          {
            path: 'classes/:id',
            component: ClassSettingsComponent,
            children: [
              {
                path: 'types',
                component: TypesComponent
              }
            ]
          }
        ]
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
