import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { CoreTableMenuComponent } from './menu.component';
const components = [CoreTableMenuComponent];
let CoreTableMenuModule = class CoreTableMenuModule {
};
CoreTableMenuModule = tslib_1.__decorate([
    NgModule({
        declarations: components,
        exports: components,
        imports: [MaterialModule],
    })
], CoreTableMenuModule);
export { CoreTableMenuModule };
//# sourceMappingURL=menu.module.js.map