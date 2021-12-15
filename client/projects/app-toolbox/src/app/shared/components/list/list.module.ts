import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { ListComponent } from './components/list/list.component';
const components = [
  ListComponent,
  EntitySearchHitComponent
]
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    DndModule,
    EntityPreviewModule,
    PassiveLinkModule
  ],
  declarations: components,
  providers: [],
  exports: components
})
export class ListModule { }
