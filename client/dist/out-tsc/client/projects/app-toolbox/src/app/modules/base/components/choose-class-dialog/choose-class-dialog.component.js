import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
let ChooseClassDialogComponent = class ChooseClassDialogComponent {
    constructor(dialogRef, data, c) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.c = c;
    }
    ngOnInit() {
        this.options$ = combineLatest(this.data.pkClasses.map(pkClass => this.c.pipeClassLabel(pkClass).pipe(map((label) => ({
            pkClass, label
        })))));
    }
    select(pkClass) {
        this.dialogRef.close(pkClass);
    }
    cancel() {
        this.dialogRef.close();
    }
};
ChooseClassDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-choose-class-dialog',
        templateUrl: './choose-class-dialog.component.html',
        styleUrls: ['./choose-class-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ChooseClassDialogComponent);
export { ChooseClassDialogComponent };
//# sourceMappingURL=choose-class-dialog.component.js.map