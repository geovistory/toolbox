import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSplitModule } from 'angular-split';
import { PassiveLinkModule } from 'app/shared';
import { ConfirmDialogModule } from 'app/shared/components/confirm-dialog/confirm-dialog.module';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ErrorDialogModule } from 'app/shared/components/error-dialog/error-dialog.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { MapModule } from '../map/map.module';
import { QueriesModule } from '../queries/queries.module';
import { TimelineModule } from '../timeline/timeline.module';
import { AnalysisDetailComponent } from './components/analysis-detail/analysis-detail.component';
import { AnalysisLayoutComponent } from './components/analysis-layout/analysis-layout.component';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MapAndTimeContEditComponent } from './map-and-time-cont/map-and-time-cont-edit/map-and-time-cont-edit.component';
import { MapAndTimeContFormArrayComponent } from './map-and-time-cont/map-and-time-cont-form-array/map-and-time-cont-form-array.component';
import { MapAndTimeContFormControlComponent } from './map-and-time-cont/map-and-time-cont-form-control/map-and-time-cont-form-control.component';
import { MapAndTimeContFormGroupComponent } from './map-and-time-cont/map-and-time-cont-form-group/map-and-time-cont-form-group.component';
import { MapAndTimeContFormComponent } from './map-and-time-cont/map-and-time-cont-form/map-and-time-cont-form.component';
import { AnalysisService } from './services/analysis.service';
import { TableEditComponent } from './table/table-edit/table-edit.component';
import { ColtypePipe, TableFormArrayComponent } from './table/table-form-array/table-form-array.component';
import { TableFormControlComponent } from './table/table-form-control/table-form-control.component';
import { TableFormGroupComponent } from './table/table-form-group/table-form-group.component';
import { TableFormComponent } from './table/table-form/table-form.component';
import { TableFormService } from './table/table-form/table-form.service';
import { TimeChartContEditComponent } from './time-chart-cont/time-chart-cont-edit/time-chart-cont-edit.component';
import { TimeChartContFormArrayComponent } from './time-chart-cont/time-chart-cont-form-array/time-chart-cont-form-array.component';
import { TimeChartContFormControlComponent } from './time-chart-cont/time-chart-cont-form-control/time-chart-cont-form-control.component';
import { TimeChartContFormGroupComponent } from './time-chart-cont/time-chart-cont-form-group/time-chart-cont-form-group.component';
import { TimeChartContFormComponent } from './time-chart-cont/time-chart-cont-form/time-chart-cont-form.component';
import { AnalysisIconModule } from 'app/shared/pipes/analysis-icon/analysis-icon.module';


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

  MapAndTimeContEditComponent,
  MapAndTimeContFormComponent,
  MapAndTimeContFormGroupComponent,
  MapAndTimeContFormArrayComponent,
  MapAndTimeContFormControlComponent,

  DialogCreateComponent,
  ColtypePipe
]
@NgModule({
  declarations: components,
  providers: [
    AnalysisService,
    TableFormService,
    ColtypePipe
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
    MatTableModule,
    MatSortModule,
    ErrorDialogModule,
    ConfirmDialogModule,
    QueriesModule,
    ReactiveFormsModule,
    FormFactoryModule,
    PortalModule,
    AngularSplitModule,
    DragDropModule,
    PassiveLinkModule,
    TimelineModule,
    MapModule,
    AnalysisIconModule
  ],
  exports: components
})
export class AnalysisModule { }
