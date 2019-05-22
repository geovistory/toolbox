import { dispatch, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Sys } from './sys.models';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { StandardActionsFactory } from 'app/core/store/actions';
import { IAppState } from '../store/model';

type Payload = Sys;
interface MetaData {
  systemRelevantClasses?: SysSystemRelevantClass[]
};
export type SysAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SysActions {

  system_relevant_class: StandardActionsFactory<Payload, SysSystemRelevantClass>;

  constructor(ngRedux: NgRedux<IAppState>) {

    this.system_relevant_class = new StandardActionsFactory<Payload, SysSystemRelevantClass>
      (ngRedux).createCrudActions('sys', 'system_relevant_class');

  }
  
}
