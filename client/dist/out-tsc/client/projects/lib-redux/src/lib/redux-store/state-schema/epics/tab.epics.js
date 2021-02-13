import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
let TabEpics = class TabEpics {
    constructor() { }
    createEpics() {
        return combineEpics();
    }
};
TabEpics = tslib_1.__decorate([
    Injectable()
], TabEpics);
export { TabEpics };
//# sourceMappingURL=tab.epics.js.map