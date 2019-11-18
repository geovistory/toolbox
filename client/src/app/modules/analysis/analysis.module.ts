import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatListModule, MatDividerModule, MatCardModule, MatExpansionModule, MatDialogModule } from '@angular/material';
import { ConfirmDialogModule } from 'app/shared/components/confirm-dialog/confirm-dialog.module';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ErrorDialogModule } from 'app/shared/components/error-dialog/error-dialog.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { QueriesModule } from '../queries/queries.module';
import { TimelineModule } from '../timeline/timeline.module';
import { TimeChartContEditComponent } from './time-chart-cont/time-chart-cont-edit/time-chart-cont-edit.component';
import { AnalysisDetailComponent } from './components/analysis-detail/analysis-detail.component';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { TimeChartContFormComponent } from './time-chart-cont/time-chart-cont-form/time-chart-cont-form.component';
import { TimeChartContFormArrayComponent } from './time-chart-cont/time-chart-cont-form-array/time-chart-cont-form-array.component';
import { TimeChartContFormControlComponent } from './time-chart-cont/time-chart-cont-form-control/time-chart-cont-form-control.component';
import { TimeChartContFormGroupComponent } from './time-chart-cont/time-chart-cont-form-group/time-chart-cont-form-group.component';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { PortalModule } from '@angular/cdk/portal';
import { AnalysisLayoutComponent } from './components/analysis-layout/analysis-layout.component';
import { AngularSplitModule } from 'angular-split';
import { AnalysisService } from './services/analysis.service';
import { TableFormComponent } from './table/table-form/table-form.component';
import { TableFormGroupComponent } from './table/table-form-group/table-form-group.component';
import { TableFormArrayComponent } from './table/table-form-array/table-form-array.component';
import { TableFormControlComponent } from './table/table-form-control/table-form-control.component';
import { TableEditComponent } from './table/table-edit/table-edit.component';
import { TableFormService } from './table/table-form/table-form.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { PassiveLinkModule } from 'app/shared';


const components = [
  AnalysisListComponent,
  AnalysisDetailComponent,
  AnalysisLayoutComponent,
  TimeChartContEditComponent,
  TimeChartContFormComponent,
  TimeChartContFormGroupComponent,
  TimeChartContFormArrayComponent,
  TimeChartContFormControlComponent,

  TableEditComponent,
  TableFormComponent,
  TableFormGroupComponent,
  TableFormArrayComponent,
  TableFormControlComponent,

  DialogCreateComponent
]
@NgModule({
  declarations: components,
  providers: [
    AnalysisService,
    TableFormService
  ],
  imports: [
    CommonModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    DetailContentModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    ErrorDialogModule,
    ConfirmDialogModule,
    QueriesModule,
    ReactiveFormsModule,
    TimelineModule,
    FormFactoryModule,
    PortalModule,
    AngularSplitModule,
    DragDropModule,
    PassiveLinkModule
  ],
  exports: components,
  entryComponents: [
    DialogCreateComponent
  ]
})
export class AnalysisModule { }
