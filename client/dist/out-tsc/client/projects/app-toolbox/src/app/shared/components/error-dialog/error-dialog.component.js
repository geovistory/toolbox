import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let ErrorDialogComponent = class ErrorDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.showReport = false;
        data.title = data.title ? data.title : 'Oops, something went wrong...';
    }
    onNoClick() {
        this.dialogRef.close(false);
    }
    onYesClick() {
        this.dialogRef.close(true);
    }
};
ErrorDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-error-dialog',
        templateUrl: './error-dialog.component.html',
        styleUrls: ['./error-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ErrorDialogComponent);
export { ErrorDialogComponent };
//# sourceMappingURL=error-dialog.component.js.map