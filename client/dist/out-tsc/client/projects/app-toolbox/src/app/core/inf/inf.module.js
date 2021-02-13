import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { InfActions } from './inf.actions';
import { InfEpics } from './inf.epics';
let InfModule = class InfModule {
};
InfModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [InfEpics, InfActions]
    })
], InfModule);
export { InfModule };
//# sourceMappingURL=inf.module.js.map