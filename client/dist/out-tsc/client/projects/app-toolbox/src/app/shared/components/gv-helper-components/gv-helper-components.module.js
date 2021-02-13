import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule, MatIconModule } from '@angular/material';
import { GeoColSignalComponent } from './geo-col-signal/geo-col-signal.component';
import { TimeColSignalComponent } from './time-col-signal/time-col-signal.component';
/**
 * This module contains small, stupid helper components.
 * like for example icons, label, badges, ect.
 */
const components = [
    GeoColSignalComponent,
    TimeColSignalComponent
];
let GvHelperComponentsModule = class GvHelperComponentsModule {
};
GvHelperComponentsModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatTooltipModule,
            MatIconModule
        ],
        declarations: components,
        exports: components
    })
], GvHelperComponentsModule);
export { GvHelperComponentsModule };
//# sourceMappingURL=gv-helper-components.module.js.map