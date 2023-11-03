import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationPipesService, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-redux';
import { AngularSplitModule } from 'angular-split';
import { TableModule } from 'primeng/table';
import { ActiveProjectService } from '../../core/active-project/active-project.service';
import { MaterialModule } from '../../core/material/material.module';
import { ValidationDirectivesModule } from '../../core/validation/validation.directives';
import { PassiveLinkModule } from '../../shared';
import { ChecklistControlModule } from '../../shared/components/checklist-control/checklist-control.module';
import { CoreTableFilterModule } from '../../shared/components/core-table/filter/filter.module';
import { CoreTableMenuModule } from '../../shared/components/core-table/menu/menu.module';
import { CoreTableVirtualScrollModule } from '../../shared/components/core-table/virtual-scroll/virtual-scroll.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { EntityPreviewModule } from '../../shared/components/entity-preview/entity-preview.module';
import { ErrorDialogModule } from '../../shared/components/error-dialog/error-dialog.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { GvHelperComponentsModule } from '../../shared/components/gv-helper-components/gv-helper-components.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { ClassAndTypeSelectComponent, ClassOrTypeRequiredValidatorDirective } from './components/class-and-type-select/class-and-type-select.component';
import { ColDefTitleComponent } from './components/col-def-title/col-def-title.component';
import { PropertiesRequiredValidatorDirective, PropertySelectComponent } from './components/property-select/property-select.component';
import { QfFormArrayComponent } from './components/qf-form-array/qf-form-array.component';
import { QfFormControlComponent } from './components/qf-form-control/qf-form-control.component';
import { QfFormGroupComponent } from './components/qf-form-group/qf-form-group.component';
import { QueryFilterComponent } from './components/query-filter/query-filter.component';
import { QueryFilterService } from './components/query-filter/query-filter.service';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { ResultingEntitiesDialogComponent } from './components/resulting-entities-dialog/resulting-entities-dialog.component';
import { ResultingValuesDialogComponent } from './components/resulting-values-dialog/resulting-values-dialog.component';
import { QueryPathFormArrayComponent } from './forms/query-path/query-path-form-array/query-path-form-array.component';
import { QueryPathFormControlComponent } from './forms/query-path/query-path-form-control/query-path-form-control.component';
import { QueryPathFormGroupComponent } from './forms/query-path/query-path-form-group/query-path-form-group.component';
import { QueryPathFormComponent } from './forms/query-path/query-path-form/query-path-form.component';

const components = [
  PropertySelectComponent,
  ColDefTitleComponent,
  ResultTableComponent,
  ResultingEntitiesDialogComponent,
  ResultingValuesDialogComponent,
  ClassOrTypeRequiredValidatorDirective,
  PropertiesRequiredValidatorDirective,
  QueryFilterComponent,
  QfFormGroupComponent,
  QfFormArrayComponent,
  QfFormControlComponent,
  QueryPathFormComponent,
  QueryPathFormGroupComponent,
  QueryPathFormArrayComponent,
  QueryPathFormControlComponent,
  ClassAndTypeSelectComponent
]

@NgModule({
  imports: [
    CommonModule,
    ChecklistControlModule,
    TableModule,
    AngularSplitModule,
    DetailTopBarModule,
    DetailContentModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule,
    CoreTableFilterModule,
    CoreTableMenuModule,
    CoreTableVirtualScrollModule,
    EntityPreviewModule,
    KeysModule,
    PassiveLinkModule,
    ValidationDirectivesModule,
    GvHelperComponentsModule,
    FormFactoryModule,
    ErrorDialogModule,
    MaterialModule
  ],
  providers: [
    // QueryDetailAPIActions,
    // QueryDetailAPIEpics,
    ConfigurationPipesService,
    ActiveProjectService,
    InformationPipesService,
    InformationBasicPipesService,
    QueryFilterService
  ],
  declarations: components,
  exports: components

})
export class QueriesModule { }
