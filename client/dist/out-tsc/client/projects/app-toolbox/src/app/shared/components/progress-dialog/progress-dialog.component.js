import * as tslib_1 from "tslib";
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil, auditTime } from 'rxjs/operators';
let ProgressDialogComponent = class ProgressDialogComponent {
    constructor(ref, dialogRef, data) {
        this.ref = ref;
        this.dialogRef = dialogRef;
        this.data = data;
        this.destroy$ = new Subject();
        // ref.detach();
    }
    ngOnInit() {
        this.value$ = this.data.value$.pipe(auditTime(500));
        this.data.mode$.pipe(auditTime(500), takeUntil(this.destroy$)).subscribe(v => {
            // console.log(v)
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
};
ProgressDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-progress-dialog',
        templateUrl: './progress-dialog.component.html',
        styleUrls: ['./progress-dialog.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__param(2, Inject(MAT_DIALOG_DATA))
], ProgressDialogComponent);
export { ProgressDialogComponent };
//# sourceMappingURL=progress-dialog.component.js.map