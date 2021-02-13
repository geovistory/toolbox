import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TabLayout } from './tab-layout';
let TabLayoutService = class TabLayoutService {
    constructor() { }
    create(uiId, ref, destroy$) {
        this.t = new TabLayout(uiId, ref, destroy$);
        return this.t;
    }
};
TabLayoutService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TabLayoutService);
export { TabLayoutService };
//# sourceMappingURL=tab-layout.service.js.map