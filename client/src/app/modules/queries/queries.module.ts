import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, MatTableModule, MatTooltipModule, MatExpansionModule, MatDividerModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { TreeChecklistModule } from 'app/shared/components/tree-checklist/tree-checklist.module';
import { ClassAndTypeSelectComponent } from './components/class-and-type-select/class-and-type-select.component';
import { PropertyFilterComponent } from './components/property-filter/property-filter.component';
import { PropertySelectComponent } from './components/property-select/property-select.component';
import { QueryDetailAPIActions } from './containers/query-detail/api/query-detail.actions';
import { QueryDetailAPIEpics } from './containers/query-detail/api/query-detail.epics';
import { QueryDetailComponent } from './containers/query-detail/query-detail.component';
import { QueryListAPIActions } from './containers/query-list/api/query-list.actions';
import { QueryListAPIEpics } from './containers/query-list/api/query-list.epics';
import { QueryListComponent } from './containers/query-list/query-list.component';
import { SubgroupComponent } from './components/subgroup/subgroup.component';
import { ColDefEditorComponent } from './components/col-def-editor/col-def-editor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColDefComponent } from './components/col-def/col-def.component';
import { ColDefTitleComponent } from './components/col-def-title/col-def-title.component';
import { ClassAndTypeFilterComponent } from './components/class-and-type-filter/class-and-type-filter.component';
import { ClassAndTypePathSegmentComponent } from './components/class-and-type-path-segment/class-and-type-path-segment.component';
import { PropertyPathSegmentComponent } from './components/property-path-segment/property-path-segment.component';



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
    ReactiveFormsModule,
    TreeChecklistModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    DragDropModule,
    FormsModule

  ],
  providers: [
    QueryListAPIActions,
    QueryListAPIEpics,
    QueryDetailAPIActions,
    QueryDetailAPIEpics
  ],
  declarations: [QueryListComponent, QueryDetailComponent, ClassAndTypeSelectComponent, PropertySelectComponent, PropertyFilterComponent, SubgroupComponent, ColDefEditorComponent, ColDefComponent, ColDefTitleComponent, ClassAndTypeFilterComponent, ClassAndTypePathSegmentComponent, PropertyPathSegmentComponent],
  exports: [QueryListComponent, QueryDetailComponent, ClassAndTypeSelectComponent, PropertySelectComponent, PropertyFilterComponent, SubgroupComponent, PropertyPathSegmentComponent]

})
export class QueriesModule { }
