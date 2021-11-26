import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityCardWrapperComponent } from '../base/components/entity-card-wrapper/entity-card-wrapper.component';
import { InformationModule } from '../information/information.module';
import { SourcesModule } from '../sources';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectEditComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';

export function getInformation2Module() { return InformationModule };

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
  {
    path: ':pkActiveProject/resource/:pkEntity/community-view',
    data: { readonly: true, community: true },
    component: EntityCardWrapperComponent
  },
  {
    path: ':pkActiveProject/resource/:pkEntity',
    data: { readonly: false, community: false },
    component: EntityCardWrapperComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
