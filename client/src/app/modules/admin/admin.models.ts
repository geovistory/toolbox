import { DfhClassInterface, ComPropertySet, ComUiContextConfig } from '../../core';
import { RoleSet } from '../information2/information.models';



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
    containerDisabled?: Container;
    containerEnabled?: Container;
    loading: boolean;
    error: any;
}

export class Container {
    constructor(public name: string, public widgets: Array<Widget>) { }
}

export class Widget {
    constructor(public name: string, public metaInfo: string, public roleSet: RoleSet,
        public propSet: ComPropertySet, public uiContextConfig: ComUiContextConfig) { }
}
