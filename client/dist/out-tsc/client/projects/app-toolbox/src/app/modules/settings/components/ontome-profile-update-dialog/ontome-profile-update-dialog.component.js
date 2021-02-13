import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { takeUntil, first } from 'rxjs/operators';
let OntomeProfileUpdateDialogComponent = class OntomeProfileUpdateDialogComponent {
    constructor(dialogRef, data, dfhProfileApi, p) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dfhProfileApi = dfhProfileApi;
        this.p = p;
        this.destroy$ = new Subject();
        this.updating = false;
        this.updated = false;
        this.error = false;
    }
    ngOnInit() {
    }
    update() {
        this.updating = true;
        this.dfhProfileApi.updateFromOntoMe(this.data.profileId, this.language)
            .pipe(takeUntil(this.destroy$))
            .subscribe(succes => {
            this.updating = false;
            this.updated = true;
            this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
                this.p.dfh$.profile.loadOfProject(pkProject);
                this.p.dfh$.klass.loadOfProject(pkProject);
                this.p.dfh$.property.loadOfProject(pkProject);
                this.p.dfh$.label.loadOfProject(pkProject);
            });
        }, error => {
            this.updating = false;
            this.error = true;
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
OntomeProfileUpdateDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profile-update-dialog',
        templateUrl: './ontome-profile-update-dialog.component.html',
        styleUrls: ['./ontome-profile-update-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], OntomeProfileUpdateDialogComponent);
export { OntomeProfileUpdateDialogComponent };
//# sourceMappingURL=ontome-profile-update-dialog.component.js.map