import { dispatch, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { System } from './system.models';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { StandardActionsFactory } from 'app/core/store/actions';
import { IAppState } from '../store/model';

type Payload = System;
interface MetaData {
  systemRelevantClasses?: SysSystemRelevantClass[]
};
export type SystemAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class SystemActions {

  systemRelevantClass: StandardActionsFactory<Payload, SysSystemRelevantClass>;

  constructor(ngRedux: NgRedux<IAppState>) {

    this.systemRelevantClass = new StandardActionsFactory<Payload, SysSystemRelevantClass>
      (ngRedux).createCrudActions('system', 'systemRelevantClass');

  }
  
}
