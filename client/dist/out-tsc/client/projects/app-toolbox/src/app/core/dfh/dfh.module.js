import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DfhEpics } from './dfh.epics';
import { DfhActions } from './dfh.actions';
import { DfhSelector } from './dfh.service';
let DfhModule = class DfhModule {
};
DfhModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [DfhEpics, DfhActions, DfhSelector]
    })
], DfhModule);
export { DfhModule };
//# sourceMappingURL=dfh.module.js.map