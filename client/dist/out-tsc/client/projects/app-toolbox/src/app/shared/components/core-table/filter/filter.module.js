import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { CoreTableFilterComponent } from './filter.component';
const components = [CoreTableFilterComponent];
let CoreTableFilterModule = class CoreTableFilterModule {
};
CoreTableFilterModule = tslib_1.__decorate([
    NgModule({
        declarations: components,
        exports: components,
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MaterialModule
        ],
    })
], CoreTableFilterModule);
export { CoreTableFilterModule };
//# sourceMappingURL=filter.module.js.map