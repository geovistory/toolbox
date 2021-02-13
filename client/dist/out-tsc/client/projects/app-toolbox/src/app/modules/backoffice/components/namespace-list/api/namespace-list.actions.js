var NamespaceListAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let NamespaceListAPIActions = NamespaceListAPIActions_1 = class NamespaceListAPIActions {
    constructor() {
        this.load = () => ({
            type: NamespaceListAPIActions_1.LOAD,
            meta: null,
            payload: null,
        });
        this.loadStarted = () => ({
            type: NamespaceListAPIActions_1.LOAD_STARTED,
            meta: null,
            payload: null,
        });
        this.loadSucceeded = (namespaces) => ({
            type: NamespaceListAPIActions_1.LOAD_SUCCEEDED,
            meta: null,
            payload: { namespaces }
        });
        this.loadFailed = (error) => ({
            type: NamespaceListAPIActions_1.LOAD_FAILED,
            meta: null,
            payload: null,
            error,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: NamespaceListAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
NamespaceListAPIActions.LOAD = 'NamespaceList::LOAD';
NamespaceListAPIActions.LOAD_STARTED = 'NamespaceList::LOAD_STARTED';
NamespaceListAPIActions.LOAD_SUCCEEDED = 'NamespaceList::LOAD_SUCCEEDED';
NamespaceListAPIActions.LOAD_FAILED = 'NamespaceList::LOAD_FAILED';
NamespaceListAPIActions.DESTROY = 'NamespaceList::DESTROY';
tslib_1.__decorate([
    dispatch()
], NamespaceListAPIActions.prototype, "load", void 0);
tslib_1.__decorate([
    dispatch()
], NamespaceListAPIActions.prototype, "destroy", void 0);
NamespaceListAPIActions = NamespaceListAPIActions_1 = tslib_1.__decorate([
    Injectable()
], NamespaceListAPIActions);
export { NamespaceListAPIActions };
//# sourceMappingURL=namespace-list.actions.js.map