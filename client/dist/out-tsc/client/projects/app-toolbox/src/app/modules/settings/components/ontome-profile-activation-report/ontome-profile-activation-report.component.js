import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let OntomeProfileActivationReportComponent = class OntomeProfileActivationReportComponent {
    constructor(dfhProfApi) {
        this.dfhProfApi = dfhProfApi;
        this.destroy$ = new Subject();
        this.loading = false;
        this.newClassesExpanded = false;
        this.oldClassesExpanded = false;
        this.newPropertiesExpanded = false;
        this.oldPropertiesExpanded = false;
    }
    ngOnInit() {
        this.loading = true;
        this.dfhProfApi
            .getActivationReport(this.pkProject, this.profileId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
            this.loading = false;
            this.report = res;
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], OntomeProfileActivationReportComponent.prototype, "profileId", void 0);
tslib_1.__decorate([
    Input()
], OntomeProfileActivationReportComponent.prototype, "pkProject", void 0);
OntomeProfileActivationReportComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profile-activation-report',
        templateUrl: './ontome-profile-activation-report.component.html',
        styleUrls: ['./ontome-profile-activation-report.component.scss']
    })
], OntomeProfileActivationReportComponent);
export { OntomeProfileActivationReportComponent };
//# sourceMappingURL=ontome-profile-activation-report.component.js.map