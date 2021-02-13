import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreTableFilterModule } from '../filter/filter.module';
import { CoreTableMenuModule } from '../menu/menu.module';
import { CoreTableVirtualScrollModule } from '../virtual-scroll/virtual-scroll.module';
import { ExampleTableComponent } from './example-table.component';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
const components = [ExampleTableComponent];
let ExampleTableModule = class ExampleTableModule {
};
ExampleTableModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            CoreTableFilterModule,
            CoreTableMenuModule,
            CoreTableVirtualScrollModule,
            MaterialModule
        ],
        declarations: components,
        exports: components,
    })
], ExampleTableModule);
export { ExampleTableModule };
//# sourceMappingURL=example-table.module.js.map