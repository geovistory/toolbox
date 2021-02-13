import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
let OntomeProfileDeactivationReportDialogComponent = class OntomeProfileDeactivationReportDialogComponent {
    constructor(dialogRef, data, dfhProfileApi, p) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dfhProfileApi = dfhProfileApi;
        this.p = p;
        this.destroy$ = new Subject();
        this.deactivating = false;
        this.deactivated = false;
        this.error = false;
    }
    ngOnInit() {
    }
    deactivate() {
        this.deactivating = true;
        this.dfhProfileApi.deactivateProfileForProject(this.data.pkProject, this.data.profileId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(succes => {
            this.deactivating = false;
            this.deactivated = true;
            this.p.pro$.dfh_class_proj_rel.loadOfProject(this.data.pkProject);
            this.p.pro$.dfh_profile_proj_rel.loadOfProject(this.data.pkProject);
        }, error => {
            this.deactivating = false;
            this.error = true;
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
OntomeProfileDeactivationReportDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profile-deactivation-report-dialog',
        templateUrl: './ontome-profile-deactivation-report-dialog.component.html',
        styleUrls: ['./ontome-profile-deactivation-report-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], OntomeProfileDeactivationReportDialogComponent);
export { OntomeProfileDeactivationReportDialogComponent };
//# sourceMappingURL=ontome-profile-deactivation-report-dialog.component.js.map