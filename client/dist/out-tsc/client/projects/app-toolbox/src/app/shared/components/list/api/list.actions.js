var ListAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let ListAPIActions = ListAPIActions_1 = class ListAPIActions {
    constructor() {
        /*********************************************************************
        *  Actions to manage search of entities
        *********************************************************************/
        this.search = (pkProject, searchString, pkClasses, entityType, limit, page) => ({
            type: ListAPIActions_1.SEARCH,
            meta: { pkProject, searchString, pkClasses, entityType, limit, page },
            payload: null,
        });
        this.searchStarted = () => ({
            type: ListAPIActions_1.SEARCH_STARTED,
            meta: null,
            payload: null,
        });
        this.searchSucceeded = (searchResponse) => ({
            type: ListAPIActions_1.SEARCH_SUCCEEDED,
            meta: { searchResponse },
            payload: null
        });
        this.searchFailed = (error) => ({
            type: ListAPIActions_1.SEARCH_FAILED,
            meta: null,
            payload: null,
            error,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: ListAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
ListAPIActions.SEARCH = 'List::SEARCH';
ListAPIActions.SEARCH_STARTED = 'List::SEARCH_STARTED';
ListAPIActions.SEARCH_SUCCEEDED = 'List::SEARCH_SUCCEEDED';
ListAPIActions.SEARCH_FAILED = 'List::SEARCH_FAILED';
ListAPIActions.DESTROY = 'List::DESTROY';
tslib_1.__decorate([
    dispatch()
], ListAPIActions.prototype, "search", void 0);
tslib_1.__decorate([
    dispatch()
], ListAPIActions.prototype, "destroy", void 0);
ListAPIActions = ListAPIActions_1 = tslib_1.__decorate([
    Injectable()
], ListAPIActions);
export { ListAPIActions };
//# sourceMappingURL=list.actions.js.map