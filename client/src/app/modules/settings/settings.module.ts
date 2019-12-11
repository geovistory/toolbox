import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntomeProfilesSettingsComponent } from './components/ontome-profiles-settings/ontome-profiles-settings.component';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [OntomeProfilesSettingsComponent],
  exports: [OntomeProfilesSettingsComponent],
  imports: [
    CommonModule,
    DetailTopBarModule,
    DetailContentModule,
    MatTableModule
  ]
})
export class SettingsModule { }
