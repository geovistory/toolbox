import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDrawerHeaderComponent } from './list-drawer-header.component';
import { MatDividerModule } from '@angular/material';
let ListDrawerHeaderModule = class ListDrawerHeaderModule {
};
ListDrawerHeaderModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatDividerModule
        ],
        declarations: [ListDrawerHeaderComponent],
        exports: [ListDrawerHeaderComponent]
    })
], ListDrawerHeaderModule);
export { ListDrawerHeaderModule };
//# sourceMappingURL=list-drawer-header.module.js.map