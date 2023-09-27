import { NgModule } from '@angular/core';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { AnalysisIconModule } from '../../shared/pipes/analysis-icon/analysis-icon.module';
import { BaseModule } from '../base/base.module';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { DigitalsListComponent } from './components/digitals-list/digitals-list.component';
import { EntitiesTabsComponent } from './components/entities-tabs/entities-tabs.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { ListDrawerHeaderComponent } from './components/list-drawer-header/list-drawer-header.component';
import { ListComponent } from './components/list/list.component';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourcesTabsComponent } from './components/sources-tabs/sources-tabs.component';


@NgModule({
  imports: [
    BaseModule,
    PassiveLinkModule,
    AnalysisIconModule
  ],
  providers: [
  ],
  exports: [
    AnalysisListComponent,
    EntityListComponent,
    SourceListComponent,
    DigitalsListComponent,
    SettingsListComponent,
  ],
  declarations: [
    ListComponent,
    ListDrawerHeaderComponent,
    EntitySearchHitComponent,
    AnalysisListComponent,
    EntityListComponent,
    EntitiesTabsComponent,
    SourceListComponent,
    SourcesTabsComponent,
    DigitalsListComponent,
    SettingsListComponent,
  ]
})
export class LeftDrawerModule { }
