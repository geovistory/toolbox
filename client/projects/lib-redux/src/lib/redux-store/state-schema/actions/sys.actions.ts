import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models/model';
import { Sys } from '../models/sys.models';
import { sysRoot } from '../reducer-configs/sys.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';

type Payload = Sys;
interface MetaData {
  systemRelevantClasses?: SysSystemRelevantClass[]
};
export type SysAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SysActions {

  system_relevant_class = new SchemaActionsFactory<Payload, SysSystemRelevantClass>
    (this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');

  // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
  //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');


  config = new SchemaActionsFactory<Payload, SysConfigValue>
    (this.ngRedux).createCrudActions(sysRoot, 'config');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
