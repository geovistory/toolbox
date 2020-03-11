import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TileHeaderModule } from 'app/shared/components/tile-header/tile-header.module';
import { DndModule } from 'ng2-dnd';
import { DigitalPreviewModule } from '../../shared/components/digital-preview/digital-preview.module';
import { EntityPreviewModule } from '../../shared/components/entity-preview/entity-preview.module';
import { QuillOpsToStrModule } from '../../shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { MentioningCreateCtrlComponent } from './components/mentioning-create-ctrl/mentioning-create-ctrl.component';
import { MentioningListComponent } from "./components/mentioning-list/MentioningListComponent";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TileHeaderModule,
    DndModule,
    QuillOpsToStrModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    EntityPreviewModule,
    // TableModule, // TODO replace this with Mat Table
    DigitalPreviewModule
  ],
  providers: [],
  declarations: [MentioningListComponent, MentioningCreateCtrlComponent],
  exports: [MentioningListComponent, MentioningCreateCtrlComponent]
})
export class AnnotationModule { }
