import { NgRedux } from '@angular-redux/store';
import { DfhLabel, DfhProfile } from '@kleiolab/lib-sdk-lb3';
import { DfhClass, DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models/model';
import { DfhClassSlice } from '../models/dfh.models';
import { ActionResultObservable, SchemaActionsFactory } from '../_helpers/schema-actions-factory';
export declare class DfhProfileActionFactory extends SchemaActionsFactory<Payload, DfhProfile> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<DfhProfile>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): DfhProfileActionFactory;
}
export declare class DfhClassActionFactory extends SchemaActionsFactory<Payload, DfhClass> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<DfhClass>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): DfhClassActionFactory;
}
export declare class DfhPropertyActionFactory extends SchemaActionsFactory<Payload, DfhProperty> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<DfhProperty>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): DfhPropertyActionFactory;
}
export declare class DfhLabelActionFactory extends SchemaActionsFactory<Payload, DfhLabel> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<DfhLabel>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): DfhLabelActionFactory;
}
declare type Payload = DfhClassSlice;
export declare class DfhActions {
    ngRedux: NgRedux<IAppState>;
    profile: DfhProfileActionFactory;
    klass: DfhClassActionFactory;
    property: DfhPropertyActionFactory;
    label: DfhLabelActionFactory;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
