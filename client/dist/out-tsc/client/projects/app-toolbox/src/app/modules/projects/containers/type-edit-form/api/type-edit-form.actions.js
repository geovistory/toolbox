var TypeEditFormAPIActions_1;
import * as tslib_1 from "tslib";
// TODO DELETE
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let TypeEditFormAPIActions = TypeEditFormAPIActions_1 = class TypeEditFormAPIActions {
    constructor() {
        this.load = () => ({
            type: TypeEditFormAPIActions_1.LOAD,
            meta: null,
            payload: null,
        });
        this.loadStarted = () => ({
            type: TypeEditFormAPIActions_1.LOAD_STARTED,
            meta: null,
            payload: null,
        });
        this.loadSucceeded = (itemsArray) => ({
            type: TypeEditFormAPIActions_1.LOAD_SUCCEEDED,
            meta: {
                itemsArray
            },
            payload: null
        });
        this.loadFailed = (error) => ({
            type: TypeEditFormAPIActions_1.LOAD_FAILED,
            meta: null,
            payload: null,
            error,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: TypeEditFormAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
TypeEditFormAPIActions.LOAD = 'TypeEditForm::LOAD';
TypeEditFormAPIActions.LOAD_STARTED = 'TypeEditForm::LOAD_STARTED';
TypeEditFormAPIActions.LOAD_SUCCEEDED = 'TypeEditForm::LOAD_SUCCEEDED';
TypeEditFormAPIActions.LOAD_FAILED = 'TypeEditForm::LOAD_FAILED';
TypeEditFormAPIActions.DESTROY = 'TypeEditForm::DESTROY';
tslib_1.__decorate([
    dispatch()
], TypeEditFormAPIActions.prototype, "load", void 0);
tslib_1.__decorate([
    dispatch()
], TypeEditFormAPIActions.prototype, "destroy", void 0);
TypeEditFormAPIActions = TypeEditFormAPIActions_1 = tslib_1.__decorate([
    Injectable()
], TypeEditFormAPIActions);
export { TypeEditFormAPIActions };
//# sourceMappingURL=type-edit-form.actions.js.map