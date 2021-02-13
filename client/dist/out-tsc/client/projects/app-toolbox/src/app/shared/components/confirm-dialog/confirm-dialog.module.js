import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
let ConfirmDialogModule = class ConfirmDialogModule {
};
ConfirmDialogModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatDialogModule,
            MatButtonModule
        ],
        declarations: [ConfirmDialogComponent],
        entryComponents: [ConfirmDialogComponent]
    })
], ConfirmDialogModule);
export { ConfirmDialogModule };
//# sourceMappingURL=confirm-dialog.module.js.map