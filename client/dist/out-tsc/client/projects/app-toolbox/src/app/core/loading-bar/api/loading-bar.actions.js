var LoadingBarActions_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
;
/**
* This actions start, stop and complete the global loading bar
* using a SlimLoadingBarService instantiated within the loading-bar
* module.
*
* In order to show a loading bar in GUI, use the LoadingBarComponent
* exported by this module.
*/
let LoadingBarActions = LoadingBarActions_1 = class LoadingBarActions {
    /**
    * This actions start, stop and complete the global loading bar
    * using a SlimLoadingBarService instantiated within the loading-bar
    * module.
    *
    * In order to show a loading bar in GUI, use the LoadingBarComponent
    * exported by this module.
    */
    constructor() {
        this.startLoading = () => ({
            type: LoadingBarActions_1.START,
            meta: null,
            payload: null,
        });
        this.stopLoading = () => ({
            type: LoadingBarActions_1.STOP,
            meta: null,
            payload: null
        });
        this.completeLoading = () => ({
            type: LoadingBarActions_1.COPMLETE,
            meta: null,
            payload: null,
        });
    }
};
LoadingBarActions.START = 'LOADING_BAR_START';
LoadingBarActions.STOP = 'LOADING_BAR_STOP';
LoadingBarActions.COPMLETE = 'LOADING_BAR_COPMLETE';
tslib_1.__decorate([
    dispatch()
], LoadingBarActions.prototype, "startLoading", void 0);
tslib_1.__decorate([
    dispatch()
], LoadingBarActions.prototype, "stopLoading", void 0);
tslib_1.__decorate([
    dispatch()
], LoadingBarActions.prototype, "completeLoading", void 0);
LoadingBarActions = LoadingBarActions_1 = tslib_1.__decorate([
    Injectable()
], LoadingBarActions);
export { LoadingBarActions };
//# sourceMappingURL=loading-bar.actions.js.map