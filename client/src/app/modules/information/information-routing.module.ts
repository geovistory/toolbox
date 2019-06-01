import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './containers/entity-list/entity-list.component';



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
