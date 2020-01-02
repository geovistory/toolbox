import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatTableModule, MatInputModule, MatProgressSpinnerModule, MatTooltipModule, MatDialogModule, MatTabsModule, MatCheckboxModule } from '../../../../node_modules/@angular/material';
import { ClassConfigDialogComponent } from './components/class-config-dialog/class-config-dialog.component';
import { ClassConfigComponent } from './components/class-config/class-config.component';
import { PropertyLabelTableComponent } from './components/property-label-table/property-label-table.component';
import { LanguageSearchTypeaheadModule, PassiveLinkModule } from 'app/shared';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { TruncateModule } from 'app/shared/pipes/truncate/truncate.module';
import { OntoInfoModule } from 'app/shared/components/onto-info/onto-info.module';
import { LabelsComponent } from './components/labels/labels.component';
import { Information2Module } from '../information/information.module';
import { ClassFieldsComponent } from './components/class-fields/class-fields.component';
import { TableModule } from 'primeng/table';
import { FieldConfigComponent } from './components/field-config/field-config.component';
import { FieldConfigDialogComponent } from './components/field-config-dialog/field-config-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule,
    LanguageSearchTypeaheadModule,
    TruncateModule,
    PassiveLinkModule,
    OntoInfoModule,
    Information2Module,
    TableModule
  ],
  declarations: [ClassConfigComponent, ClassConfigDialogComponent, PropertyLabelTableComponent, LabelsComponent, ClassFieldsComponent, FieldConfigComponent, FieldConfigDialogComponent],
  exports: [ClassFieldsComponent], // TODO REMOVE
  entryComponents: [ClassConfigDialogComponent, FieldConfigDialogComponent]
})
export class ClassConfigModule { }
