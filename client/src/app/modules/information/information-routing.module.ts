import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { EntityEditorComponent } from './containers/entity-editor/entity-editor.component';
import { InformationComponent } from './containers/information/information.component';


const routes: Routes = [
  {
    path: 'search',
    component: InformationComponent,
    data: {
      reduxPath: ['information']
    }
  },
  {
    path: 'entity/:pkEntity',
    component: InformationComponent,
    data: {
      reduxPath: ['information']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
