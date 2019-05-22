import { forwardRef, Inject, Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'app/core/store/epics';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { SysSystemRelevantClassApi } from '../sdk/services/custom/SysSystemRelevantClass';
import { SysActions } from './sys.actions';
import { SysRelevantClassSlice } from './sys.models';


@Injectable()
export class SysEpics {
  constructor(
    private actions: SysActions,
    private notification: NotificationsAPIActions,
    @Inject(forwardRef(() => SysSystemRelevantClassApi)) private sysRelevantClassApi: SysSystemRelevantClassApi
  ) { }

  public createEpics(): Epic {
    const systemRelevantClassEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysSystemRelevantClass>
      ('sys', 'system_relevant_class', this.actions.system_relevant_class, this.notification);


    return combineEpics(

      // SystemRelevantClass Loaders
      systemRelevantClassEpicsFactory.createLoadEpic((action) => this.sysRelevantClassApi.find(), ''),
      systemRelevantClassEpicsFactory.createUpsertEpic((items) => this.sysRelevantClassApi.bulkReplaceOrCreate(items))

    );
  }


}
