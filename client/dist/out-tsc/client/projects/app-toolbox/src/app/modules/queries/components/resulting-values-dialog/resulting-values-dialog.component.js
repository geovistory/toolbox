import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ResultingValuesDialogComponent = class ResultingValuesDialogComponent {
    constructor(dialogRef, data, p) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.p = p;
    }
    onNoClick() {
        this.dialogRef.close();
    }
    openEntity(pkEntity) {
        this.p.addEntityTabWithoutClass(pkEntity);
    }
};
ResultingValuesDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-resulting-values-dialog',
        templateUrl: './resulting-values-dialog.component.html',
        styleUrls: ['./resulting-values-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ResultingValuesDialogComponent);
export { ResultingValuesDialogComponent };
//# sourceMappingURL=resulting-values-dialog.component.js.map