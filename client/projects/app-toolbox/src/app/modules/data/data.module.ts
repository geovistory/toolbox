import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { AnnotationModule } from 'projects/app-toolbox/src/app/modules/annotation/annotation.module';
import { DigitalTableModule } from 'projects/app-toolbox/src/app/shared/components/digital-table/digital-table.module';
import { CoverModule } from 'projects/app-toolbox/src/app/shared/directives/cover/cover.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { InfoDialogModule } from '../../shared/components/info-dialog/info-dialog.module';
import { CopyClipboardModule } from '../../shared/directives/copy-clipboard/copy-clipboard.module';
import { BaseModule } from '../base/base.module';
import { QuillModule } from '../quill';
import { ImporterComponent } from './components/importer/importer.component';
import { TableConfigDialogComponent } from './components/table-config-dialog/table-config-dialog.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';
import { TextDetail2Component } from './components/text-detail2/text-detail2.component';
import { ViewFieldHasTableValueComponent } from './components/view-field-has-table-value/view-field-has-table-value.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    AnnotationModule,
    CoverModule,
    MaterialModule,
    DigitalTableModule,
    NgxFileDropModule,
    BaseModule,
    DragDropModule,
    CopyClipboardModule,
    InfoDialogModule
  ],
  providers: [],
  declarations: [TableDetailComponent, ImporterComponent, TableConfigDialogComponent, TextDetail2Component, TableEditorComponent, ViewFieldHasTableValueComponent],
  exports: [TableDetailComponent, TableConfigDialogComponent, TextDetail2Component, TableEditorComponent],
})
export class DataModule { }
