import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
let SourceListAPIEpics = class SourceListAPIEpics {
    constructor() { }
    createEpics(c) {
        return combineEpics();
    }
};
SourceListAPIEpics = tslib_1.__decorate([
    Injectable()
], SourceListAPIEpics);
export { SourceListAPIEpics };
//# sourceMappingURL=source-list.epics.js.map