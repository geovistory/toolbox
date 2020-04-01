import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material/material.module';
import { TileHeaderModule } from 'app/shared/components/tile-header/tile-header.module';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'primeng/table';
import { DigitalPreviewModule } from '../../shared/components/digital-preview/digital-preview.module';
import { EntityPreviewModule } from '../../shared/components/entity-preview/entity-preview.module';
import { QuillOpsToStrModule } from '../../shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { GraphPathComponent } from './components/graph-path/graph-path.component';
import { MentioningCreateCtrlComponent } from './components/mentioning-create-ctrl/mentioning-create-ctrl.component';
import { MentioningListComponent } from './components/mentioning-list/mentioning-list.component';
import { RamListComponent } from './components/ram-list/ram-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TileHeaderModule,
    DndModule,
    QuillOpsToStrModule,
    EntityPreviewModule,
    TableModule,
    DigitalPreviewModule,
    MaterialModule
  ],
  providers: [],
  declarations: [MentioningListComponent, MentioningCreateCtrlComponent, RamListComponent, GraphPathComponent],
  exports: [MentioningListComponent, MentioningCreateCtrlComponent, RamListComponent]
})
export class AnnotationModule { }
