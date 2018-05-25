import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { SourceComponent } from './components/source/source.component';
import { ProjectSourcesComponent } from './components/project-sources/project-sources.component';


const routes: Routes = [
  {
    path: 'search',
    component: ProjectSourcesComponent
  },
  {
    path: 'source/:id',
    component: SourceComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule { }