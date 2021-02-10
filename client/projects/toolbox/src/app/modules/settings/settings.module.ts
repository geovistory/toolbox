import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/toolbox/src/app/core/material/material.module';
import { DetailContentModule } from 'projects/toolbox/src/app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'projects/toolbox/src/app/shared/components/detail-top-bar/detail-top-bar.module';
import { ActivationReportItemsTableComponent } from './components/activation-report-items-table/activation-report-items-table.component';
import { DeactivationReportItemsTableComponent } from './components/deactivation-report-items-table/deactivation-report-items-table.component';
import { OntomeProfileActivationReportDialogComponent } from './components/ontome-profile-activation-report-dialog/ontome-profile-activation-report-dialog.component';
import { OntomeProfileActivationReportComponent } from './components/ontome-profile-activation-report/ontome-profile-activation-report.component';
import { OntomeProfileDeactivationReportDialogComponent } from './components/ontome-profile-deactivation-report-dialog/ontome-profile-deactivation-report-dialog.component';
import { OntomeProfileDeactivationReportComponent } from './components/ontome-profile-deactivation-report/ontome-profile-deactivation-report.component';
import { OntomeProfileUpdateDialogComponent } from './components/ontome-profile-update-dialog/ontome-profile-update-dialog.component';
import { OntomeProfilesListDialogComponent } from './components/ontome-profiles-list-dialog/ontome-profiles-list-dialog.component';
import { OntomeProfilesListComponent } from './components/ontome-profiles-list/ontome-profiles-list.component';
import { OntomeProfilesSettingsComponent } from './components/ontome-profiles-settings/ontome-profiles-settings.component';



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
    MaterialModule
  ],
  entryComponents: [
    OntomeProfilesListDialogComponent,
    OntomeProfileActivationReportDialogComponent,
    OntomeProfileDeactivationReportDialogComponent,
    OntomeProfileUpdateDialogComponent
  ]
})
export class SettingsModule { }
