import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { AnnotationModule } from 'projects/app-toolbox/src/app/modules/annotation/annotation.module';
import { DigitalTableModule } from 'projects/app-toolbox/src/app/shared/components/digital-table/digital-table.module';
import { CoverModule } from 'projects/app-toolbox/src/app/shared/directives/cover/cover.module';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { QuillModule } from '../quill';
import { ImporterComponent } from './components/importer/importer.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { TextDetailComponent } from './components/text-detail/text-detail.component';
import { VersionPickerComponent } from './components/version-picker/version-picker.component';
import { BaseModule } from '../base/base.module';

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
  ],
  providers: [],
  declarations: [TextDetailComponent, VersionPickerComponent, TableDetailComponent, ImporterComponent],
  exports: [TextDetailComponent, VersionPickerComponent, TableDetailComponent],
  entryComponents: [ImporterComponent]
})
export class DataModule { }
