import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { ValidationDirectivesModule } from 'app/core';
import { ActiveProjectService } from "app/core/active-project";
import { MaterialModule } from 'app/core/material/material.module';
import { PassiveLinkModule } from 'app/shared';
import { ChecklistControlModule } from 'app/shared/components/checklist-control/checklist-control.module';
import { CoreTableFilterModule } from 'app/shared/components/core-table/filter/filter.module';
import { CoreTableMenuModule } from 'app/shared/components/core-table/menu/menu.module';
import { CoreTableVirtualScrollModule } from 'app/shared/components/core-table/virtual-scroll/virtual-scroll.module';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { ErrorDialogModule } from 'app/shared/components/error-dialog/error-dialog.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { TableModule } from 'primeng/table';
import { GvHelperComponentsModule } from '../../shared/components/gv-helper-components/gv-helper-components.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { ConfigurationPipesService } from 'app/core/redux-queries/services/configuration-pipes.service';
import { InformationBasicPipesService } from '../base/services/information-basic-pipes.service';
import { InformationPipesService } from '../base/services/information-pipes.service';
// import { ClassAndTypeFilterComponent, ClassAndTypeFilterRequiredValidatorDirective } from './components/class-and-type-filter/class-and-type-filter.component';
// import { ClassAndTypePathSegmentComponent, ClassAndTypePathSegmentRequiredValidatorDirective } from './components/class-and-type-path-segment/class-and-type-path-segment.component';
import { ClassAndTypeSelectComponent, ClassOrTypeRequiredValidatorDirective } from './components/class-and-type-select/class-and-type-select.component';
// import { ColDefEditorComponent } from './components/col-def-editor/col-def-editor.component';
import { ColDefTitleComponent } from './components/col-def-title/col-def-title.component';
// import { ColDefComponent } from './components/col-def/col-def.component';
// import { PropertyFilterComponent, PropertyFilterRequiredValidatorDirective } from './components/property-filter/property-filter.component';
// import { PropertyPathSegmentComponent, PropertyPathSegmentRequiredValidatorDirective } from './components/property-path-segment/property-path-segment.component';
import { PropertiesRequiredValidatorDirective, PropertySelectComponent } from './components/property-select/property-select.component';
import { QfFormArrayComponent } from './components/qf-form-array/qf-form-array.component';
import { QfFormControlComponent } from './components/qf-form-control/qf-form-control.component';
import { QfFormGroupComponent } from './components/qf-form-group/qf-form-group.component';
import { QueryFilterComponent } from './components/query-filter/query-filter.component';
import { QueryFilterService } from './components/query-filter/query-filter.service';
// import { QueryPathControlComponent } from './components/query-path-control/query-path-control.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { ResultingEntitiesDialogComponent } from './components/resulting-entities-dialog/resulting-entities-dialog.component';
// import { SubgroupComponent } from './components/subgroup/subgroup.component';
// import { QueryDetailAPIActions } from './containers/query-detail/api/query-detail.actions';
// import { QueryDetailAPIEpics } from './containers/query-detail/api/query-detail.epics';
// import { QueryDetailComponent } from './containers/query-detail/query-detail.component';
// import { QueryListComponent } from './containers/query-list/query-list.component';
import { QueryPathFormArrayComponent } from './forms/query-path/query-path-form-array/query-path-form-array.component';
import { QueryPathFormControlComponent } from './forms/query-path/query-path-form-control/query-path-form-control.component';
import { QueryPathFormGroupComponent } from './forms/query-path/query-path-form-group/query-path-form-group.component';
import { QueryPathFormComponent } from './forms/query-path/query-path-form/query-path-form.component';
import { ResultingValuesDialogComponent } from './components/resulting-values-dialog/resulting-values-dialog.component';

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
    ListDrawerHeaderModule,
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
  exports: components,
  entryComponents: [
    ResultingEntitiesDialogComponent,
    ResultingValuesDialogComponent,
    QueryFilterComponent,
    QueryPathFormComponent
  ]

})
export class QueriesModule { }
