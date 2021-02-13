import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let OntomeProfileActivationReportDialogComponent = class OntomeProfileActivationReportDialogComponent {
    constructor(dialogRef, data, dfhProfileApi, p) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dfhProfileApi = dfhProfileApi;
        this.p = p;
        this.destroy$ = new Subject();
        this.activating = false;
        this.activated = false;
        this.error = false;
    }
    ngOnInit() {
    }
    activate() {
        this.activating = true;
        this.dfhProfileApi.updateAndAddToProject(this.data.pkProject, this.data.profileId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(succes => {
            this.activating = false;
            this.activated = true;
            this.p.dfh$.profile.loadOfProject(this.data.pkProject);
            this.p.dfh$.klass.loadOfProject(this.data.pkProject);
            this.p.dfh$.property.loadOfProject(this.data.pkProject);
            this.p.dfh$.label.loadOfProject(this.data.pkProject);
            this.p.pro$.dfh_class_proj_rel.loadOfProject(this.data.pkProject);
            this.p.pro$.dfh_profile_proj_rel.loadOfProject(this.data.pkProject);
        }, error => {
            this.activating = false;
            this.error = true;
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
OntomeProfileActivationReportDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profile-activation-report-dialog',
        templateUrl: './ontome-profile-activation-report-dialog.component.html',
        styleUrls: ['./ontome-profile-activation-report-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], OntomeProfileActivationReportDialogComponent);
export { OntomeProfileActivationReportDialogComponent };
//# sourceMappingURL=ontome-profile-activation-report-dialog.component.js.map