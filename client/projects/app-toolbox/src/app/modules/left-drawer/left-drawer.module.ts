import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { ListDrawerHeaderModule } from 'projects/app-toolbox/src/app/shared/components/list-drawer-header/list-drawer-header.module';
import { ListModule } from 'projects/app-toolbox/src/app/shared/components/list/list.module';
import { AnalysisIconModule } from '../../shared/pipes/analysis-icon/analysis-icon.module';
import { BaseModule } from '../base/base.module';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { DigitalsListComponent } from './components/digitals-list/digitals-list.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SourceListComponent } from './components/source-list/source-list.component';


@NgModule({
  imports: [
    BaseModule,
    ListModule,
    ListDrawerHeaderModule,
    PassiveLinkModule,
    NgbModule,
    AnalysisIconModule
  ],
  providers: [
  ],
  exports: [
    AnalysisListComponent,
    EntityListComponent,
    SourceListComponent,
    DigitalsListComponent,
    SettingsListComponent
  ],
  declarations: [
    AnalysisListComponent,
    EntityListComponent,
    SourceListComponent,
    DigitalsListComponent,
    SettingsListComponent
  ]
})
export class LeftDrawerModule { }
