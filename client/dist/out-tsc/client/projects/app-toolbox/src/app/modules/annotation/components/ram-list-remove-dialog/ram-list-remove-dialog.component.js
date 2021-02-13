import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DfhConfig } from "@kleiolab/lib-config";
import { first, takeUntil } from 'rxjs/operators';
import { fieldAtReferencePoP } from '../ram-list-edit-dialog/ram-list-edit-dialog.component';
let RamListRemoveDialogComponent = class RamListRemoveDialogComponent {
    constructor(t, p, dialogRef, data) {
        this.t = t;
        this.p = p;
        this.dialogRef = dialogRef;
        this.data = data;
        this.destroy$ = new Subject();
        this.readonly$ = new BehaviorSubject(true);
        this.showOntoInfo$ = new BehaviorSubject(false);
        this.fieldDefinition = fieldAtReferencePoP;
    }
    onRemove() {
        combineLatest(this.p.inf$.statement$.by_subject_and_property$({
            fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
            fk_subject_info: this.data.statement.pk_entity
        }), this.p.pkProject$).pipe(first()).subscribe(([references, pkProject]) => {
            this.p.inf.statement.remove([this.data.statement, ...references], pkProject).resolved$
                .pipe(takeUntil(this.destroy$)).subscribe(res => {
                if (res)
                    this.dialogRef.close();
            });
        });
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
RamListRemoveDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ram-list-remove-dialog',
        templateUrl: './ram-list-remove-dialog.component.html',
        styleUrls: ['./ram-list-remove-dialog.component.scss']
    }),
    tslib_1.__param(3, Inject(MAT_DIALOG_DATA))
], RamListRemoveDialogComponent);
export { RamListRemoveDialogComponent };
//# sourceMappingURL=ram-list-remove-dialog.component.js.map