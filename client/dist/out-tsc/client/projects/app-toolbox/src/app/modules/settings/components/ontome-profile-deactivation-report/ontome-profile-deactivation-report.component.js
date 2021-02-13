import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let OntomeProfileDeactivationReportComponent = class OntomeProfileDeactivationReportComponent {
    constructor(dfhProfApi) {
        this.dfhProfApi = dfhProfApi;
        this.destroy$ = new Subject();
        this.loading = false;
        this.deactivatedClassesExpanded = false;
        this.maintainedClassesExpanded = false;
        this.deactivatedPropertiesExpanded = false;
        this.maintainedPropertiesExpanded = false;
    }
    ngOnInit() {
        this.loading = true;
        this.dfhProfApi
            .getDeactivationReport(this.pkProject, this.profileId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
            this.loading = false;
            this.report = res;
            this.classWarning = res.deactivatedClasses.some(item => item.numberOfInstances > 0);
            this.propertyWarning = res.deactivatedProperties.some(item => item.numberOfInstances > 0);
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], OntomeProfileDeactivationReportComponent.prototype, "profileId", void 0);
tslib_1.__decorate([
    Input()
], OntomeProfileDeactivationReportComponent.prototype, "pkProject", void 0);
OntomeProfileDeactivationReportComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ontome-profile-deactivation-report',
        templateUrl: './ontome-profile-deactivation-report.component.html',
        styleUrls: ['./ontome-profile-deactivation-report.component.scss']
    })
], OntomeProfileDeactivationReportComponent);
export { OntomeProfileDeactivationReportComponent };
//# sourceMappingURL=ontome-profile-deactivation-report.component.js.map