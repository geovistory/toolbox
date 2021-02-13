var AccountListAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let AccountListAPIActions = AccountListAPIActions_1 = class AccountListAPIActions {
    constructor() {
        this.load = () => ({
            type: AccountListAPIActions_1.LOAD,
            meta: null,
            payload: null,
        });
        this.loadSucceeded = (itemsArray) => ({
            type: AccountListAPIActions_1.LOAD_SUCCEEDED,
            meta: {
                itemsArray
            },
            payload: null
        });
        this.loadFailed = (error) => ({
            type: AccountListAPIActions_1.LOAD_FAILED,
            meta: null,
            payload: null,
            error,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: AccountListAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
AccountListAPIActions.LOAD = 'AccountList::LOAD';
AccountListAPIActions.LOAD_SUCCEEDED = 'AccountList::LOAD_SUCCEEDED';
AccountListAPIActions.LOAD_FAILED = 'AccountList::LOAD_FAILED';
AccountListAPIActions.DESTROY = 'AccountList::DESTROY';
tslib_1.__decorate([
    dispatch()
], AccountListAPIActions.prototype, "load", void 0);
tslib_1.__decorate([
    dispatch()
], AccountListAPIActions.prototype, "destroy", void 0);
AccountListAPIActions = AccountListAPIActions_1 = tslib_1.__decorate([
    Injectable()
], AccountListAPIActions);
export { AccountListAPIActions };
//# sourceMappingURL=account-list.actions.js.map