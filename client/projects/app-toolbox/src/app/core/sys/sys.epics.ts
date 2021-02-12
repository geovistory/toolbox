import { Injectable } from '@angular/core';
import { SchemaEpicsFactory } from 'projects/app-toolbox/src/app/core/redux-store/schema-epics-factory';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { SystemConfigurationService } from "@kleiolab/lib-sdk-lb4";
import { SysConfigValue } from "@kleiolab/lib-sdk-lb4";
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { SysSystemRelevantClassApi } from '@kleiolab/lib-sdk-lb3';
import { ModifyActionMeta } from '../redux-store/schema-actions-factory';
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
    const systemRelevantClassEpicsFactory = new SchemaEpicsFactory<SysRelevantClassSlice, SysSystemRelevantClass>
      (sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);

    // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
    //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);

    const configEpicsFactory = new SchemaEpicsFactory<SysConfigSlice, SysConfigValue>
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
