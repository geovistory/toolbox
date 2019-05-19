import { Injectable, Inject, forwardRef } from '@angular/core';
import { StandardEpicsFactory, bulkCreateOrReplace } from 'app/core/store/epics';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { SysSystemRelevantClassApi } from '../sdk/services/custom/SysSystemRelevantClass';
import { SystemActions } from './system.actions';
import { SystemRelevantClassSlice } from './system.models';


@Injectable()
export class SystemEpics {
  constructor(
    private actions: SystemActions,
    private notification: NotificationsAPIActions,
    @Inject(forwardRef(() => SysSystemRelevantClassApi)) private sysRelevantClassApi: SysSystemRelevantClassApi
  ) { }

  public createEpics(): Epic {
    const systemRelevantClassEpicsFactory = new StandardEpicsFactory<SystemRelevantClassSlice, SysSystemRelevantClass>
      ('system', 'systemRelevantClass', this.actions.systemRelevantClass, this.notification);


    return combineEpics(

      // SystemRelevantClass Loaders
      systemRelevantClassEpicsFactory.createLoadEpic(this.sysRelevantClassApi.find(), ''),
      systemRelevantClassEpicsFactory.createUpsertEpic((items) => this.sysRelevantClassApi.bulkReplaceOrCreate(items))

    );
  }


}
