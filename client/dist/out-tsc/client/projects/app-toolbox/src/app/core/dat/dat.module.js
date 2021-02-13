import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DatEpics } from './dat.epics';
import { DatActions } from './dat.actions';
import { DatSelector } from './dat.service';
let DatModule = class DatModule {
};
DatModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [DatEpics, DatActions, DatSelector]
    })
], DatModule);
export { DatModule };
//# sourceMappingURL=dat.module.js.map