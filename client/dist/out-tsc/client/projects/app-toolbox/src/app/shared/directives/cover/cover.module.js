import * as tslib_1 from "tslib";
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoverDirective } from './cover.directive';
let CoverModule = class CoverModule {
};
CoverModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            PortalModule
        ],
        declarations: [
            CoverDirective
        ],
        exports: [
            CoverDirective
        ]
    })
], CoverModule);
export { CoverModule };
//# sourceMappingURL=cover.module.js.map