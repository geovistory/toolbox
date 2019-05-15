import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Information2Module } from '../information/information.module';
import { SourcesModule } from '../sources';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectEditComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';

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
    path: ':pkActiveProject',
    redirectTo: ':pkActiveProject/edit',
    pathMatch: 'full',
  },
  {
    path: ':pkActiveProject/edit',
    component: ProjectEditComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
