import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
let WarEpics = class WarEpics {
    constructor() { }
    createEpics() {
        return combineEpics();
    }
};
WarEpics = tslib_1.__decorate([
    Injectable()
], WarEpics);
export { WarEpics };
//# sourceMappingURL=war.epics.js.map