import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { OntomeProfilesListComponent } from './components/ontome-profiles-list/ontome-profiles-list.component';
import { OntomeProfilesSettingsComponent } from './components/ontome-profiles-settings/ontome-profiles-settings.component';
import { OntomeProfilesListDialogComponent } from './components/ontome-profiles-list-dialog/ontome-profiles-list-dialog.component';
import { OntomeProfileActivationReportComponent } from './components/ontome-profile-activation-report/ontome-profile-activation-report.component';
import { OntomeProfileActivationReportDialogComponent } from './components/ontome-profile-activation-report-dialog/ontome-profile-activation-report-dialog.component';
import { ActivationReportItemsTableComponent } from './components/activation-report-items-table/activation-report-items-table.component';
import { DeactivationReportItemsTableComponent } from './components/deactivation-report-items-table/deactivation-report-items-table.component';
import { OntomeProfileDeactivationReportDialogComponent } from './components/ontome-profile-deactivation-report-dialog/ontome-profile-deactivation-report-dialog.component';
import { OntomeProfileDeactivationReportComponent } from './components/ontome-profile-deactivation-report/ontome-profile-deactivation-report.component';
import { OntomeProfileUpdateDialogComponent } from './components/ontome-profile-update-dialog/ontome-profile-update-dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OntomeProfilesSettingsComponent,
    OntomeProfilesListComponent,
    OntomeProfilesListDialogComponent,
    OntomeProfileActivationReportComponent,
    OntomeProfileActivationReportDialogComponent,
    ActivationReportItemsTableComponent,
    DeactivationReportItemsTableComponent,
    OntomeProfileDeactivationReportDialogComponent,
    OntomeProfileDeactivationReportComponent,
    OntomeProfileUpdateDialogComponent
  ],
  exports: [
    OntomeProfilesSettingsComponent,
    OntomeProfilesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DetailTopBarModule,
    DetailContentModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SettingsModule { }
