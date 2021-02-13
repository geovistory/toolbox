import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';
let ErrorDialogModule = class ErrorDialogModule {
};
ErrorDialogModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatDialogModule,
            MatButtonModule,
            MatIconModule,
            MatDividerModule
        ],
        declarations: [ErrorDialogComponent],
        entryComponents: [ErrorDialogComponent]
    })
], ErrorDialogModule);
export { ErrorDialogModule };
//# sourceMappingURL=error-dialog.module.js.map