import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { TreeChecklistModule } from 'app/shared/components/tree-checklist/tree-checklist.module';
import { ClassAndTypeSelectComponent } from './components/class-and-type-select/class-and-type-select.component';
import { OperatorSelectComponent } from './components/operator-select/operator-select.component';
import { PropertySelectComponent } from './components/property-select/property-select.component';
import { QueryDetailAPIActions } from './containers/query-detail/api/query-detail.actions';
import { QueryDetailAPIEpics } from './containers/query-detail/api/query-detail.epics';
import { QueryDetailComponent } from './containers/query-detail/query-detail.component';
import { QueryListAPIActions } from './containers/query-list/api/query-list.actions';
import { QueryListAPIEpics } from './containers/query-list/api/query-list.epics';
import { QueryListComponent } from './containers/query-list/query-list.component';
import { SubgroupComponent } from './components/subgroup/subgroup.component';



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
    MatTooltipModule
  ],
  providers: [
    QueryListAPIActions,
    QueryListAPIEpics,
    QueryDetailAPIActions,
    QueryDetailAPIEpics
  ],
  declarations: [QueryListComponent, QueryDetailComponent, ClassAndTypeSelectComponent, PropertySelectComponent, OperatorSelectComponent, SubgroupComponent],
  exports: [QueryListComponent, QueryDetailComponent]

})
export class QueriesModule { }
