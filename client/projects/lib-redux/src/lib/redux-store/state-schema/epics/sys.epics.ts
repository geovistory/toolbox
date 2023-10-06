import { Injectable } from '@angular/core';
import { SysConfigValue, SystemConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { Actions } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import { SysActions } from '../actions/sys.actions';
import { SysConfigSlice } from '../models/sys.models';
import { sysRoot } from '../reducer-configs/sys.config';



@Injectable({
  providedIn: 'root'
})
export class SysEpics {
  loadConfig$
  constructor(
    private actions: SysActions,
    private notification: NotificationsAPIActions,
    private sysConfigApi: SystemConfigurationService,
    actions$: Actions,
  ) {
    const configEpicsFactory = new SchemaEpicsFactory<SysConfigSlice, SysConfigValue>
      (actions$, sysRoot, 'config', this.actions.config, this.notification);

    this.loadConfig$ = configEpicsFactory.createLoadEpic(
      () => this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map(x => [x])),
      '')
  }
}
