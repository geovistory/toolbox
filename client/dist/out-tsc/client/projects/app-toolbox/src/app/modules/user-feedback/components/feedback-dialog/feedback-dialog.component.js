import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let FeedbackDialogComponent = class FeedbackDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onCloseClick() {
        this.dialogRef.close();
    }
};
FeedbackDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-feedback-dialog',
        templateUrl: './feedback-dialog.component.html',
        styleUrls: ['./feedback-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], FeedbackDialogComponent);
export { FeedbackDialogComponent };
//# sourceMappingURL=feedback-dialog.component.js.map