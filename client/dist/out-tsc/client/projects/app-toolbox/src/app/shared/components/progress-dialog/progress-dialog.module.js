import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { ProgressDialogComponent } from './progress-dialog.component';
let ProgressDialogModule = class ProgressDialogModule {
};
ProgressDialogModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule
        ],
        declarations: [ProgressDialogComponent],
        entryComponents: [ProgressDialogComponent]
    })
], ProgressDialogModule);
export { ProgressDialogModule };
//# sourceMappingURL=progress-dialog.module.js.map