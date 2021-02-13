import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let ClassConfigDialogComponent = class ClassConfigDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
};
ClassConfigDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-class-config-dialog',
        templateUrl: './class-config-dialog.component.html',
        styleUrls: ['./class-config-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ClassConfigDialogComponent);
export { ClassConfigDialogComponent };
//# sourceMappingURL=class-config-dialog.component.js.map