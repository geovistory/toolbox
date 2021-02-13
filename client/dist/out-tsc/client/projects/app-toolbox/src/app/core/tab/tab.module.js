import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { TabEpics } from './tab.epics';
import { TabActions } from './tab.actions';
import { TabSelector } from './tab.service';
let TabModule = class TabModule {
};
TabModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [TabEpics, TabActions, TabSelector]
    })
], TabModule);
export { TabModule };
//# sourceMappingURL=tab.module.js.map