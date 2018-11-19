import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceListComponent } from './containers/source-list/source-list.component';


const routes: Routes = [
  {
    path: 'search',
    component: SourceListComponent
  },
  {
    path: ':pkEntity',
    component: SourceListComponent
  },
  {
    path: ':pkEntity/section/:pkSection',
    component: SourceListComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule { }