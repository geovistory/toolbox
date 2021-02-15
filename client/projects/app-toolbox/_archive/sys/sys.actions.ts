import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from "@kleiolab/lib-redux";
import { FluxStandardAction } from 'flux-standard-action';
import { SysConfigValue } from "@kleiolab/lib-sdk-lb4";
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { IAppState } from "@kleiolab/lib-redux";
import { sysRoot } from './sys.config';
import { Sys } from './sys.models';

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
