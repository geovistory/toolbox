import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { WarEpics } from './war.epics';
import { WarActions } from './war.actions';
import { WarSelector } from './war.service';
let WarModule = class WarModule {
};
WarModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [WarEpics, WarActions, WarSelector]
    })
], WarModule);
export { WarModule };
//# sourceMappingURL=war.module.js.map