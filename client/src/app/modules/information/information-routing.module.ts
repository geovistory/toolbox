import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { EntityEditorComponent } from './containers/entity-editor/entity.editor.component';

// TODO: This line is temporary and can be removed when the form to create peIt is finished
import { CreatePeItFormComponent } from './components/create-pe-it-form/create-pe-it-form.component';


const routes: Routes = [
  {
    path: 'search',
    component: ProjectEntitiesComponent
  },
  {
    path: 'entity/:id',
    component: EntityEditorComponent
  },

  // TODO: This route is temporary and can be removed when the form to create peIt is finished
  {
    path: 'temp-create-pe-it',
    component: CreatePeItFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
