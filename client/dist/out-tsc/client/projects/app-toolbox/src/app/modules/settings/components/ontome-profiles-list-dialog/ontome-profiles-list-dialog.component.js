import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let OntomeProfilesListDialogComponent = class OntomeProfilesListDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
    close() {
        this.dialogRef.close();
    }
};
OntomeProfilesListDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profiles-list-dialog',
        templateUrl: './ontome-profiles-list-dialog.component.html',
        styleUrls: ['./ontome-profiles-list-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], OntomeProfilesListDialogComponent);
export { OntomeProfilesListDialogComponent };
//# sourceMappingURL=ontome-profiles-list-dialog.component.js.map