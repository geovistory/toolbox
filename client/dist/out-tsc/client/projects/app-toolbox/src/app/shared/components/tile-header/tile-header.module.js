import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileHeaderComponent } from './tile-header.component';
import { MatTooltipModule } from '@angular/material';
let TileHeaderModule = class TileHeaderModule {
};
TileHeaderModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatTooltipModule
        ],
        declarations: [TileHeaderComponent],
        exports: [TileHeaderComponent]
    })
], TileHeaderModule);
export { TileHeaderModule };
//# sourceMappingURL=tile-header.module.js.map