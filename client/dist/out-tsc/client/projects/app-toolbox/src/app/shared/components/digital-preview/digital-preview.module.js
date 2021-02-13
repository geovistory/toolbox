import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { DigitalPreviewComponent } from './digital-preview.component';
let DigitalPreviewModule = class DigitalPreviewModule {
};
DigitalPreviewModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule
        ],
        declarations: [DigitalPreviewComponent],
        exports: [DigitalPreviewComponent]
    })
], DigitalPreviewModule);
export { DigitalPreviewModule };
//# sourceMappingURL=digital-preview.module.js.map