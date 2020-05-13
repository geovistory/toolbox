import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'app/core/store/StandardEpicsFactory';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { SysAnalysisType, SysAnalysisTypeApi, SysClassHasTypeProperty, SysClassHasTypePropertyApi } from '../sdk';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { SysSystemRelevantClassApi } from '../sdk/services/custom/SysSystemRelevantClass';
import { ModifyActionMeta } from '../store/actions';
import { SysActions } from './sys.actions';
import { sysRoot } from './sys.config';
import { SysRelevantClassSlice } from './sys.models';


@Injectable()
export class SysEpics {
  constructor(
    private actions: SysActions,
    private notification: NotificationsAPIActions,
    private sysRelevantClassApi: SysSystemRelevantClassApi,
    // private sysClassHasTypePropertyApi: SysClassHasTypePropertyApi,
    private sysAnalysisTypeApi: SysAnalysisTypeApi,

  ) { }

  public createEpics(): Epic {
    const systemRelevantClassEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysSystemRelevantClass>
      (sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);

    // const classHasTypePropertyEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysClassHasTypeProperty>
    //   (sysRoot, 'class_has_type_property', this.actions.class_has_type_property, this.notification);

    const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
      (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);


    return combineEpics(

      // SystemRelevantClass Epics
      systemRelevantClassEpicsFactory.createLoadEpic((action) => this.sysRelevantClassApi.find(), ''),
      systemRelevantClassEpicsFactory.createUpsertEpic<ModifyActionMeta<SysSystemRelevantClass>>((meta) => this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items)),

      // // ClassHasTypeProperty Epics
      // classHasTypePropertyEpicsFactory.createLoadEpic(() => this.sysClassHasTypePropertyApi.find(), ''),

      analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), '')
    );
  }


}
