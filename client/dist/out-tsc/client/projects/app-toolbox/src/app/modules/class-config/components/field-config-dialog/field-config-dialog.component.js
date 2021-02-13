import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let FieldConfigDialogComponent = class FieldConfigDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
};
FieldConfigDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-field-config-dialog',
        templateUrl: './field-config-dialog.component.html',
        styleUrls: ['./field-config-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], FieldConfigDialogComponent);
export { FieldConfigDialogComponent };
//# sourceMappingURL=field-config-dialog.component.js.map