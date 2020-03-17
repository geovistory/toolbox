import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDividerModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatFormFieldModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { AnnotationModule } from 'app/modules/annotation/annotation.module';
import { CoverModule } from 'app/shared/directives/cover/cover.module';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { TableModule } from 'primeng/table';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { QuillModule } from '../quill';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { TextDetailComponent } from './components/text-detail/text-detail.component';
import { VersionPickerComponent } from './components/version-picker/version-picker.component';
import { ColFilterComponent } from './components/col-filter/col-filter.component';

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
    TableModule,
    MatPaginatorModule,
    MatDividerModule,
    SelectAutocompleteModule,
    CoverModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [],
  declarations: [TextDetailComponent, VersionPickerComponent, TableDetailComponent, ColFilterComponent],
  exports: [TextDetailComponent, VersionPickerComponent, TableDetailComponent]
})
export class DataModule { }
