import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { SourceListComponent } from './containers/source-list/source-list.component';
import { SourceDetailComponent } from './containers/source-detail/source-detail.component';


const routes: Routes = [
  {
    path: 'search',
    component: SourceListComponent
  },
  {
    path: 'source/:id',
    component: SourceDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule { }