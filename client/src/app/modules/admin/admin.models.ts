import { DfhClassInterface, ComClassField, ComUiContextConfig, DfhPropertyProfileView } from '../../core';
import { PropertyField } from 'app/core/state/models';



export interface Admin {
    classList?: ClassList;
    classDetail?: ClassDetail;
}

export interface ClassList {
    items: {};
    loading: boolean;
    error: any;
}

export interface ClassDetail {
    class?: DfhClassInterface;
    uiContext?: ClassUiContext;
    loading: boolean;
    error: any;
}

export interface ClassUiContext {
    class?: DfhClassInterface;
    containerDisabledProperties?: Container;
    containerDisabledFields?: Container;
    containerEnabled?: Container;
    loading?: boolean;
    error?: any;
}

export class Container {
    constructor(public name: string, public widgets: Array<Widget>) { }
}

export class Widget {
    constructor(
        public name: string, public metaInfo: string, public propertyField: PropertyField,
        public propSet: ComClassField, public uiContextConfig: ComUiContextConfig,
        public profiles: DfhPropertyProfileView[]
    ) { }
}
