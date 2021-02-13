import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ProEpics } from './pro.epics';
import { ProActions } from './pro.actions';
import { ProSelector } from './pro.service';
let ProModule = class ProModule {
};
ProModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [ProEpics, ProActions, ProSelector]
    })
], ProModule);
export { ProModule };
//# sourceMappingURL=pro.module.js.map