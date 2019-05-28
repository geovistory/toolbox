import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TileHeaderModule } from 'app/shared/components/tile-header/tile-header.module';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'ngx-easy-table';
import { QuillOpsToStrModule } from '../../shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { MentioningCreateCtrlComponent } from './components/mentioning-create-ctrl/mentioning-create-ctrl.component';
import { MentioningListAPIActions } from './components/mentioning-list/api/mentioning-list.actions';
import { MentioningListAPIEpics } from './components/mentioning-list/api/mentioning-list.epics';
import { MentioningListComponent } from './components/mentioning-list/mentioning-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TileHeaderModule,
    DndModule,
    QuillOpsToStrModule,
    TableModule // TODO replace this with Mat Table
  ],
  providers: [MentioningListAPIActions, MentioningListAPIEpics],
  declarations: [MentioningListComponent, MentioningCreateCtrlComponent],
  exports: [MentioningListComponent, MentioningCreateCtrlComponent]
})
export class AnnotationModule { }
