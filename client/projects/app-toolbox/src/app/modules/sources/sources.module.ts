import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { ListDrawerHeaderModule } from 'projects/app-toolbox/src/app/shared/components/list-drawer-header/list-drawer-header.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { BaseModule } from '../base/base.module';
import { SourceListAPIActions } from './containers/source-list/api/source-list.actions';
import { SourceListAPIEpics } from './containers/source-list/api/source-list.epics';
import { SourceListComponent } from './containers/source-list/source-list.component';
import { ListModule } from 'projects/app-toolbox/src/app/shared/components/list/list.module';


@NgModule({
  imports: [
    BaseModule,
    ListModule,
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
