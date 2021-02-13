import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let PropertiesTreeDialogComponent = class PropertiesTreeDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
};
PropertiesTreeDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-properties-tree-dialog',
        templateUrl: './properties-tree-dialog.component.html',
        styleUrls: ['./properties-tree-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], PropertiesTreeDialogComponent);
export { PropertiesTreeDialogComponent };
//# sourceMappingURL=properties-tree-dialog.component.js.map