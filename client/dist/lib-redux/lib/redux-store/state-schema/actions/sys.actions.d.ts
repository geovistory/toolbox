import { NgRedux } from '@angular-redux/store';
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models/model';
import { Sys } from '../models/sys.models';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
declare type Payload = Sys;
interface MetaData {
    systemRelevantClasses?: SysSystemRelevantClass[];
}
export declare type SysAction = FluxStandardAction<Payload, MetaData>;
export declare class SysActions {
    ngRedux: NgRedux<IAppState>;
    system_relevant_class: SchemaActionsFactory<Sys, SysSystemRelevantClass>;
    config: SchemaActionsFactory<Sys, SysConfigValue>;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
