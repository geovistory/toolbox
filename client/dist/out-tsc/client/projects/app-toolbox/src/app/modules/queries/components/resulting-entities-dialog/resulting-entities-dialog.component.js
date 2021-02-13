import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ResultingEntitiesDialogComponent = class ResultingEntitiesDialogComponent {
    constructor(dialogRef, data, p) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.p = p;
    }
    onNoClick() {
        this.dialogRef.close();
    }
    openInTab(preview) {
        this.p.addEntityTab(preview.pk_entity, preview.fk_class);
        this.dialogRef.close();
    }
};
ResultingEntitiesDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-resulting-entities-dialog',
        templateUrl: './resulting-entities-dialog.component.html',
        styleUrls: ['./resulting-entities-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ResultingEntitiesDialogComponent);
export { ResultingEntitiesDialogComponent };
//# sourceMappingURL=resulting-entities-dialog.component.js.map