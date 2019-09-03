import { forwardRef, Inject, Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { SysSystemRelevantClassApi } from '../sdk/services/custom/SysSystemRelevantClass';
import { SysActions } from './sys.actions';
import { SysRelevantClassSlice } from './sys.models';
import { SysClassHasTypePropertyApi } from '../sdk';
import { sysRoot } from './sys.config';
import { ModifyActionMeta } from '../store/actions';


@Injectable()
export class SysEpics {
  constructor(
    private actions: SysActions,
    private notification: NotificationsAPIActions,
    private sysRelevantClassApi: SysSystemRelevantClassApi,
    private sysClassHasTypePropertyApi: SysClassHasTypePropertyApi
  ) { }

  public createEpics(): Epic {
    const systemRelevantClassEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysSystemRelevantClass>
      (sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);

    const classHasTypePropertyEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysSystemRelevantClass>
      (sysRoot, 'class_has_type_property', this.actions.class_has_type_property, this.notification);


    return combineEpics(

      // SystemRelevantClass Epics
      systemRelevantClassEpicsFactory.createLoadEpic((action) => this.sysRelevantClassApi.find(), ''),
      systemRelevantClassEpicsFactory.createUpsertEpic<ModifyActionMeta<SysSystemRelevantClass>>((meta) => this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items)),

      // ClassHasTypeProperty Epics
      classHasTypePropertyEpicsFactory.createLoadEpic(()=>this.sysClassHasTypePropertyApi.find(),'')

    );
  }


}
