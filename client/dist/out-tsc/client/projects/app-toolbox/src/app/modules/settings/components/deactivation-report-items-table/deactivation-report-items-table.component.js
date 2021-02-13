import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
let DeactivationReportItemsTableComponent = class DeactivationReportItemsTableComponent {
    constructor() {
        this.displayedColumns = ['id', 'identifierInNamespace', 'label', 'numberOfInstances', 'icon'];
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = this.reportItems;
    }
};
tslib_1.__decorate([
    Input()
], DeactivationReportItemsTableComponent.prototype, "reportItems", void 0);
tslib_1.__decorate([
    Input()
], DeactivationReportItemsTableComponent.prototype, "category", void 0);
tslib_1.__decorate([
    Input()
], DeactivationReportItemsTableComponent.prototype, "status", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], DeactivationReportItemsTableComponent.prototype, "paginator", void 0);
DeactivationReportItemsTableComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-deactivation-report-items-table',
        templateUrl: './deactivation-report-items-table.component.html',
        styleUrls: ['./deactivation-report-items-table.component.scss']
    })
], DeactivationReportItemsTableComponent);
export { DeactivationReportItemsTableComponent };
//# sourceMappingURL=deactivation-report-items-table.component.js.map