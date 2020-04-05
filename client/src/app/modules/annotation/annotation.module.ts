import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TileHeaderModule } from 'app/shared/components/tile-header/tile-header.module';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'primeng/table';
import { DigitalPreviewModule } from '../../shared/components/digital-preview/digital-preview.module';
import { BaseModule } from '../base/base.module';
import { GraphPathComponent } from './components/graph-path/graph-path.component';
import { MentioningCreateCtrlComponent } from './components/mentioning-create-ctrl/mentioning-create-ctrl.component';
import { MentioningListComponent } from './components/mentioning-list/mentioning-list.component';
import { RamListEditDialogComponent } from './components/ram-list-edit-dialog/ram-list-edit-dialog.component';
import { RamListComponent } from './components/ram-list/ram-list.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    TileHeaderModule,
    DndModule,
    TableModule,
    DigitalPreviewModule,
  ],
  providers: [],
  declarations: [MentioningListComponent, MentioningCreateCtrlComponent, RamListComponent, GraphPathComponent, RamListEditDialogComponent],
  exports: [MentioningListComponent, MentioningCreateCtrlComponent, RamListComponent],
  entryComponents: [RamListEditDialogComponent]
})
export class AnnotationModule { }
