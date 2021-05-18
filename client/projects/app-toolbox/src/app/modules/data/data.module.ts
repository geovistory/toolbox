import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { AnnotationModule } from 'projects/app-toolbox/src/app/modules/annotation/annotation.module';
import { DigitalTableModule } from 'projects/app-toolbox/src/app/shared/components/digital-table/digital-table.module';
import { CoverModule } from 'projects/app-toolbox/src/app/shared/directives/cover/cover.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { BaseModule } from '../base/base.module';
import { QuillModule } from '../quill';
import { ImporterComponent } from './components/importer/importer.component';
import { TableConfigDialogComponent } from './components/table-config-dialog/table-config-dialog.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { TextDetailComponent } from './components/text-detail/text-detail.component';
import { VersionPickerComponent } from './components/version-picker/version-picker.component';

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
    SelectAutocompleteModule,
    CoverModule,
    MaterialModule,
    DigitalTableModule,
    NgxFileDropModule,
    BaseModule,
    DragDropModule
  ],
  providers: [],
  declarations: [TextDetailComponent, VersionPickerComponent, TableDetailComponent, ImporterComponent, TableConfigDialogComponent],
  exports: [TextDetailComponent, VersionPickerComponent, TableDetailComponent, TableConfigDialogComponent],
  entryComponents: [ImporterComponent, TableConfigDialogComponent]
})
export class DataModule { }
