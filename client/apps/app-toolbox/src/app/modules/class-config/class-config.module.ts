import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PassiveLinkModule } from '../../shared';
import { OntoInfoModule } from '../../shared/components/onto-info/onto-info.module';
import { TruncateModule } from '../../shared/pipes/truncate/truncate.module';
import { BaseModule } from '../base/base.module';
import { InformationModule } from '../information/information.module';
import { ClassConfigDialogComponent } from './components/class-config-dialog/class-config-dialog.component';
import { ClassConfigComponent } from './components/class-config/class-config.component';
import { ClassFieldsSectionComponent } from './components/class-fields-section/class-fields-section.component';
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
    ClassFieldsSectionComponent,
    FieldConfigComponent,
    FieldConfigDialogComponent
  ],
  exports: [
    ClassFieldsComponent
  ]
})
export class ClassConfigModule { }
