import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let EntityPreviewsPaginatedDialogComponent = class EntityPreviewsPaginatedDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
};
EntityPreviewsPaginatedDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-previews-paginated-dialog',
        templateUrl: './entity-previews-paginated-dialog.component.html',
        styleUrls: ['./entity-previews-paginated-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], EntityPreviewsPaginatedDialogComponent);
export { EntityPreviewsPaginatedDialogComponent };
//# sourceMappingURL=entity-previews-paginated-dialog.component.js.map