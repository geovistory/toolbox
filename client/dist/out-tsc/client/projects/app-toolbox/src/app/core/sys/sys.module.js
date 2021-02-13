import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { SysActions } from './sys.actions';
import { SysEpics } from './sys.epics';
import { SysSelector } from './sys.service';
let SysModule = class SysModule {
};
SysModule = tslib_1.__decorate([
    NgModule({
        imports: [],
        providers: [SysEpics, SysActions, SysSelector]
    })
], SysModule);
export { SysModule };
//# sourceMappingURL=sys.module.js.map