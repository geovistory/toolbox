import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryListComponent } from './containers/query-list/query-list.component';
import { QueryDetailComponent } from './containers/query-detail/query-detail.component';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { QueryListAPIActions } from './containers/query-list/api/query-list.actions';
import { QueryListAPIEpics } from './containers/query-list/api/query-list.epics';
import { QueryDetailAPIActions } from './containers/query-detail/api/query-detail.actions';
import { QueryDetailAPIEpics } from './containers/query-detail/api/query-detail.epics';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeChecklistModule } from 'app/shared/components/tree-checklist/tree-checklist.module';

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
    TreeChecklistModule
  ],
  providers: [
    QueryListAPIActions,
    QueryListAPIEpics,
    QueryDetailAPIActions,
    QueryDetailAPIEpics
  ],
  declarations: [QueryListComponent, QueryDetailComponent],
  exports: [QueryListComponent, QueryDetailComponent]

})
export class QueriesModule { }
