import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatSelectModule, MatStepperModule, MatTableModule, MatTooltipModule, MatChipsModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { ValidationDirectivesModule } from 'app/core';
import { PassiveLinkModule } from 'app/shared';
import { CoreTableFilterModule } from 'app/shared/components/core-table/filter/filter.module';
import { CoreTableMenuModule } from 'app/shared/components/core-table/menu/menu.module';
import { CoreTableVirtualScrollModule } from 'app/shared/components/core-table/virtual-scroll/virtual-scroll.module';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { TreeChecklistModule } from 'app/shared/components/tree-checklist/tree-checklist.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { ClassAndTypeFilterComponent, ClassAndTypeFilterRequiredValidatorDirective } from './components/class-and-type-filter/class-and-type-filter.component';
import { ClassAndTypePathSegmentComponent, ClassAndTypePathSegmentRequiredValidatorDirective } from './components/class-and-type-path-segment/class-and-type-path-segment.component';
import { ClassAndTypeSelectComponent, ClassOrTypeRequiredValidatorDirective } from './components/class-and-type-select/class-and-type-select.component';
import { ColDefEditorComponent } from './components/col-def-editor/col-def-editor.component';
import { ColDefTitleComponent } from './components/col-def-title/col-def-title.component';
import { ColDefComponent } from './components/col-def/col-def.component';
import { PropertyFilterComponent, PropertyFilterRequiredValidatorDirective } from './components/property-filter/property-filter.component';
import { PropertyPathSegmentComponent, PropertyPathSegmentRequiredValidatorDirective } from './components/property-path-segment/property-path-segment.component';
import { PropertiesRequiredValidatorDirective, PropertySelectComponent } from './components/property-select/property-select.component';
import { QueryPathControlComponent } from './components/query-path-control/query-path-control.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { ResultingEntitiesDialogComponent } from './components/resulting-entities-dialog/resulting-entities-dialog.component';
import { SubgroupComponent } from './components/subgroup/subgroup.component';
import { QueryDetailAPIActions } from './containers/query-detail/api/query-detail.actions';
import { QueryDetailAPIEpics } from './containers/query-detail/api/query-detail.epics';
import { QueryDetailComponent } from './containers/query-detail/query-detail.component';
import { QueryListComponent } from './containers/query-list/query-list.component';

const components = [
  QueryListComponent,
  QueryDetailComponent,
  ClassAndTypeSelectComponent,
  PropertySelectComponent,
  PropertyFilterComponent,
  SubgroupComponent,
  ColDefEditorComponent,
  ColDefComponent,
  ColDefTitleComponent,
  ClassAndTypeFilterComponent,
  ClassAndTypePathSegmentComponent,
  PropertyPathSegmentComponent,
  ResultTableComponent,
  QueryPathControlComponent,
  ResultingEntitiesDialogComponent,
  ClassOrTypeRequiredValidatorDirective,
  PropertiesRequiredValidatorDirective,
  PropertyFilterRequiredValidatorDirective,
  PropertyPathSegmentRequiredValidatorDirective,
  ClassAndTypeFilterRequiredValidatorDirective,
  ClassAndTypePathSegmentRequiredValidatorDirective,
]

@NgModule({
  imports: [
    CommonModule,
    ListDrawerHeaderModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    AngularSplitModule,
    DetailTopBarModule,
    DetailContentModule,
    ReactiveFormsModule,
    TreeChecklistModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatExpansionModule,
    MatDividerModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
    CoreTableFilterModule,
    CoreTableMenuModule,
    CoreTableVirtualScrollModule,
    MatProgressBarModule,
    EntityPreviewModule,
    MatListModule,
    KeysModule,
    PassiveLinkModule,
    ValidationDirectivesModule,
    MatMenuModule
  ],
  providers: [
    QueryDetailAPIActions,
    QueryDetailAPIEpics
  ],
  declarations: components,
  exports: components,
  entryComponents: [
    ResultingEntitiesDialogComponent
  ]

})
export class QueriesModule { }
