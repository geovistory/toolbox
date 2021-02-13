import { Injectable } from '@angular/core';
import { SysSystemRelevantClass, SysSystemRelevantClassApi } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValue, SystemConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { map } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SysActions } from '../actions/sys.actions';
import { SysConfigSlice, SysRelevantClassSlice } from '../models/sys.models';
import { sysRoot } from '../reducer-configs/sys.config';
import { ModifyActionMeta } from '../_helpers/schema-actions-factory';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';



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
