import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanguageSearchTypeaheadModule, PassiveLinkModule } from 'projects/toolbox/src/app/shared';
import { OntoInfoModule } from 'projects/toolbox/src/app/shared/components/onto-info/onto-info.module';
import { TruncateModule } from 'projects/toolbox/src/app/shared/pipes/truncate/truncate.module';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../base/base.module';
import { InformationModule } from '../information/information.module';
import { ClassConfigDialogComponent } from './components/class-config-dialog/class-config-dialog.component';
import { ClassConfigComponent } from './components/class-config/class-config.component';
import { ClassFieldsComponent } from './components/class-fields/class-fields.component';
import { FieldConfigDialogComponent } from './components/field-config-dialog/field-config-dialog.component';
import { FieldConfigComponent } from './components/field-config/field-config.component';
import { LabelsComponent } from './components/labels/labels.component';
import { PropertyLabelTableComponent } from './components/property-label-table/property-label-table.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseModule,
    LanguageSearchTypeaheadModule,
    TruncateModule,
    PassiveLinkModule,
    OntoInfoModule,
    InformationModule,
    TableModule,
  ],
  declarations: [
    ClassConfigComponent,
    ClassConfigDialogComponent,
    PropertyLabelTableComponent,
    LabelsComponent,
    ClassFieldsComponent,
    FieldConfigComponent,
    FieldConfigDialogComponent
  ],
  exports: [
    ClassFieldsComponent
  ], // TODO REMOVE
  entryComponents: [ClassConfigDialogComponent, FieldConfigDialogComponent]
})
export class ClassConfigModule { }
