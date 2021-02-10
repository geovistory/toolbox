import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from 'projects/toolbox/src/app/core/redux-store/StandardEpicsFactory';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { SysConfigValue, SystemConfigurationService } from '../sdk-lb4';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { SysSystemRelevantClassApi } from '../sdk/services/custom/SysSystemRelevantClass';
import { ModifyActionMeta } from '../redux-store/actions';
import { SysActions } from './sys.actions';
import { sysRoot } from './sys.config';
import { SysConfigSlice, SysRelevantClassSlice } from './sys.models';
import { map } from 'rxjs/operators';


@Injectable()
export class SysEpics {
  constructor(
    private actions: SysActions,
    private notification: NotificationsAPIActions,
    private sysRelevantClassApi: SysSystemRelevantClassApi,
    // private sysAnalysisTypeApi: SysAnalysisTypeApi,
    private sysConfigApi: SystemConfigurationService
  ) { }

  public createEpics(): Epic {
    const systemRelevantClassEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysSystemRelevantClass>
      (sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);

    // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
    //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);

    const configEpicsFactory = new StandardEpicsFactory<SysConfigSlice, SysConfigValue>
      (sysRoot, 'config', this.actions.config, this.notification);



    return combineEpics(

      // SystemRelevantClass Epics
      systemRelevantClassEpicsFactory.createLoadEpic((action) => this.sysRelevantClassApi.find(), ''),
      systemRelevantClassEpicsFactory.createUpsertEpic<ModifyActionMeta<SysSystemRelevantClass>>((meta) => this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items)),

      // analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), ''),

      configEpicsFactory.createLoadEpic(
        () => this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map(x => [x])),
        '')
    );
  }


}
