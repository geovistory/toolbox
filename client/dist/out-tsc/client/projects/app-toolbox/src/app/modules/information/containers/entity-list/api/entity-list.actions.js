var InformationAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let InformationAPIActions = InformationAPIActions_1 = class InformationAPIActions {
    constructor() {
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: InformationAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
InformationAPIActions.DESTROY = 'Information::DESTROY';
tslib_1.__decorate([
    dispatch()
], InformationAPIActions.prototype, "destroy", void 0);
InformationAPIActions = InformationAPIActions_1 = tslib_1.__decorate([
    Injectable()
], InformationAPIActions);
export { InformationAPIActions };
//# sourceMappingURL=entity-list.actions.js.map