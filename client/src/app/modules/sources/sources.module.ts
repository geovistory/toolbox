import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcesRoutingModule } from './sources-routing.module';
import { SourceComponent } from './components/source/source.component';
import { ProjectSourcesComponent } from './components/project-sources/project-sources.component';

@NgModule({
  imports: [
    CommonModule,
    SourcesRoutingModule
  ],
  declarations: [
    SourceComponent,
    ProjectSourcesComponent
  ]
})
export class SourcesModule { }
