var SystemTypeListAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let SystemTypeListAPIActions = SystemTypeListAPIActions_1 = class SystemTypeListAPIActions {
    constructor() {
        this.load = () => ({
            type: SystemTypeListAPIActions_1.LOAD,
            meta: null,
            payload: null,
        });
        this.loadStarted = () => ({
            type: SystemTypeListAPIActions_1.LOAD_STARTED,
            meta: null,
            payload: null,
        });
        this.loadSucceeded = (systemtypes) => ({
            type: SystemTypeListAPIActions_1.LOAD_SUCCEEDED,
            meta: null,
            payload: { systemtypes }
        });
        this.loadFailed = (error) => ({
            type: SystemTypeListAPIActions_1.LOAD_FAILED,
            meta: null,
            payload: null,
            error,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: SystemTypeListAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
SystemTypeListAPIActions.LOAD = 'SystemTypeList::LOAD';
SystemTypeListAPIActions.LOAD_STARTED = 'SystemTypeList::LOAD_STARTED';
SystemTypeListAPIActions.LOAD_SUCCEEDED = 'SystemTypeList::LOAD_SUCCEEDED';
SystemTypeListAPIActions.LOAD_FAILED = 'SystemTypeList::LOAD_FAILED';
SystemTypeListAPIActions.DESTROY = 'SystemTypeList::DESTROY';
tslib_1.__decorate([
    dispatch()
], SystemTypeListAPIActions.prototype, "load", void 0);
tslib_1.__decorate([
    dispatch()
], SystemTypeListAPIActions.prototype, "destroy", void 0);
SystemTypeListAPIActions = SystemTypeListAPIActions_1 = tslib_1.__decorate([
    Injectable()
], SystemTypeListAPIActions);
export { SystemTypeListAPIActions };
//# sourceMappingURL=system-type-list.actions.js.map