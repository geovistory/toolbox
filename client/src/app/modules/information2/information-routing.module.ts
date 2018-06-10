import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { EntityEditorComponent } from './containers/entity-editor/entity.editor.component';


const routes: Routes = [
  {
    path: 'search',
    component: ProjectEntitiesComponent,
    data: {
      reduxPath: ['information']
    }
  },
  {
    path: 'entity/:id',
    component: EntityEditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
