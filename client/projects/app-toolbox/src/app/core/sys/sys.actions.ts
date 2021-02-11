import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { StandardActionsFactory } from 'projects/app-toolbox/src/app/core/redux-store/actions';
import { FluxStandardAction } from 'flux-standard-action';
import { SysConfigValue } from "@kleiolab/lib-sdk-lb4";
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { IAppState } from '../redux-store/model';
import { sysRoot } from './sys.config';
import { Sys } from './sys.models';

type Payload = Sys;
interface MetaData {
  systemRelevantClasses?: SysSystemRelevantClass[]
};
export type SysAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SysActions {

  system_relevant_class = new StandardActionsFactory<Payload, SysSystemRelevantClass>
    (this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');

  // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
  //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');


  config = new StandardActionsFactory<Payload, SysConfigValue>
    (this.ngRedux).createCrudActions(sysRoot, 'config');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
