import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'app/core/material/material.module';
import { ListAPIActions } from './api/list.actions';
import { ListAPIEpics } from './api/list.epics';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { ListComponent } from './components/list/list.component';
import { DndModule } from 'ng2-dnd';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { PassiveLinkModule } from 'app/shared';
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
  providers: [
    ListAPIActions,
    ListAPIEpics,
  ],
  exports: components
})
export class ListModule { }