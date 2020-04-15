import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { MaterialModule } from 'app/core/material/material.module';
import { AnnotationModule } from 'app/modules/annotation/annotation.module';
import { DigitalTableModule } from 'app/shared/components/digital-table/digital-table.module';
import { CoverModule } from 'app/shared/directives/cover/cover.module';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { QuillModule } from '../quill';
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
    DigitalTableModule
  ],
  providers: [],
  declarations: [TextDetailComponent, VersionPickerComponent, TableDetailComponent],
  exports: [TextDetailComponent, VersionPickerComponent, TableDetailComponent]
})
export class DataModule { }
