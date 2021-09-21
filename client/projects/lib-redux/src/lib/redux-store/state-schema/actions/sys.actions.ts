import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SysConfigValue, SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
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

@Injectable({
  providedIn: 'root'
})
export class SysActions {

  system_relevant_class = new SchemaActionsFactory<SysSystemRelevantClass>(this.ngRedux, sysRoot, 'system_relevant_class');

  config = new SchemaActionsFactory<SysConfigValue>(this.ngRedux, sysRoot, 'config');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
