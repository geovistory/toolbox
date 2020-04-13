import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PassiveLinkModule } from 'app/shared';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { BaseModule } from '../base/base.module';
import { SourceListAPIActions } from './containers/source-list/api/source-list.actions';
import { SourceListAPIEpics } from './containers/source-list/api/source-list.epics';
import { SourceListComponent } from './containers/source-list/source-list.component';
import { SourcesRoutingModule } from './sources-routing.module';
import { ListModule } from 'app/shared/components/list/list.module';


@NgModule({
  imports: [
    BaseModule,
    ListModule,
    SourcesRoutingModule,
    KeysModule,
    ListDrawerHeaderModule,
    PassiveLinkModule,
    NgbModule,
  ],
  providers: [
    SourceListAPIActions,
    SourceListAPIEpics,
    SourceListAPIActions,
  ],
  exports: [
    SourceListComponent,
  ],
  declarations: [
    SourceListComponent,
  ]
})
export class SourcesModule { }
