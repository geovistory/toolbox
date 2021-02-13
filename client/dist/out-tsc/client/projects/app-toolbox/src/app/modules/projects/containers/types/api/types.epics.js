import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
let TypesAPIEpics = class TypesAPIEpics {
    constructor(peItApi, actions, loadingBarActions, notificationActions) {
        this.peItApi = peItApi;
        this.actions = actions;
        this.loadingBarActions = loadingBarActions;
        this.notificationActions = notificationActions;
    }
    createEpics(c) {
        return combineEpics();
    }
};
TypesAPIEpics = tslib_1.__decorate([
    Injectable()
], TypesAPIEpics);
export { TypesAPIEpics };
//# sourceMappingURL=types.epics.js.map