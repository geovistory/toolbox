import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcesRoutingModule } from './sources-routing.module';

import { SourceSearchHitComponent } from './components/source-search-hit/source-search-hit.component';
import { SourceCreateFormComponent } from './components/source-create-form/source-create-form.component';
import { SourceListComponent } from './containers/source-list/source-list.component';
import { SourceDetailComponent } from './containers/source-detail/source-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SourcesRoutingModule
  ],
  declarations: [
    SourceSearchHitComponent,
    SourceCreateFormComponent,
    SourceListComponent,
    SourceDetailComponent
  ]
})
export class SourcesModule { }
