import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { startsWith } from 'ramda';
import { combineEpics } from 'redux-observable-es6-compat';
export const ofDirectChildSubstore = (path) => (action) => {
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    // path must be equal to begin of action path
    const startsWithBool = startsWith(path, actionPath);
    // number of levels (_leaf_pe_it) must equal in actionPath and in path
    const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length) === actionPath.filter(s => s === '_leaf_peIt').length;
    return (startsWithBool && nextLevelBool);
};
let InformationAPIEpics = class InformationAPIEpics {
    constructor(eprApi, actions, loadingBarActions, notificationActions) {
        this.eprApi = eprApi;
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
    }
    createEpics(c) {
        return combineEpics();
    }
};
InformationAPIEpics = tslib_1.__decorate([
    Injectable()
], InformationAPIEpics);
export { InformationAPIEpics };
//# sourceMappingURL=entity-list.epics.js.map