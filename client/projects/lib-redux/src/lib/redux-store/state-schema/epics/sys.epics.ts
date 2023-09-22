import { Injectable } from '@angular/core';
import { SysConfigValue, SystemConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { map } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SysActions } from '../actions/sys.actions';
import { SysConfigSlice } from '../models/sys.models';
import { sysRoot } from '../reducer-configs/sys.config';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';



@Injectable({
  providedIn: 'root'
})
export class SysEpics {
  constructor(
    private actions: SysActions,
    private notification: NotificationsAPIActions,
    private sysConfigApi: SystemConfigurationService
  ) { }

  public createEpics(): Epic {

    const configEpicsFactory = new SchemaEpicsFactory<SysConfigSlice, SysConfigValue>
      (sysRoot, 'config', this.actions.config, this.notification);

    return combineEpics(
      configEpicsFactory.createLoadEpic(
        () => this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map(x => [x])),
        '')
    );
  }


}
