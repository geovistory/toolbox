import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntityEditorComponent } from './containers/entity-editor/entity.editor.component';
import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {
    path: 'search',
    component: ProjectEntitiesComponent,
    data: {
      reduxPath: ['information']
    }
  },
  // {
  //   path: 'entity/:id',
  //   component: EntityEditorComponent
  // },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
