import { Injectable } from '@angular/core';
import { SysConfigValue, SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models/model';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { Sys } from '../models/sys.models';
import { sysRoot } from '../reducer-configs/sys.config';

type Payload = Sys;
interface MetaData {
  systemRelevantClasses?: SysSystemRelevantClass[]
};
export type SysAction = FluxStandardAction<Payload, MetaData>;

@Injectable({
  providedIn: 'root'
})
export class SysActions {

  system_relevant_class: SchemaActionsFactory<SysSystemRelevantClass>;
  config: SchemaActionsFactory<SysConfigValue>;

  constructor(public store: Store<IAppState>) {
    this.system_relevant_class = new SchemaActionsFactory<SysSystemRelevantClass>(this.store, sysRoot, 'system_relevant_class');
    this.config = new SchemaActionsFactory<SysConfigValue>(this.store, sysRoot, 'config');
  }

}
