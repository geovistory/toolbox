var SourceListAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let SourceListAPIActions = SourceListAPIActions_1 = class SourceListAPIActions {
    constructor() {
        /*********************************************************************
        *  Actions to manage the list
        *********************************************************************/
        this.initializeList = (pkAllowedClasses) => ({
            type: SourceListAPIActions_1.INITIALIZE_LIST,
            meta: { pkAllowedClasses },
            payload: null
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: SourceListAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
SourceListAPIActions.INITIALIZE_LIST = 'SourceList::INITIALIZE_LIST';
SourceListAPIActions.DESTROY = 'SourceList::DESTROY';
tslib_1.__decorate([
    dispatch()
], SourceListAPIActions.prototype, "initializeList", void 0);
tslib_1.__decorate([
    dispatch()
], SourceListAPIActions.prototype, "destroy", void 0);
SourceListAPIActions = SourceListAPIActions_1 = tslib_1.__decorate([
    Injectable()
], SourceListAPIActions);
export { SourceListAPIActions };
//# sourceMappingURL=source-list.actions.js.map