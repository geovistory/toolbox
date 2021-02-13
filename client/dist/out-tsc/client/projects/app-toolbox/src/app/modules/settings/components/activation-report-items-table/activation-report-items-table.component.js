import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
let ActivationReportItemsTableComponent = class ActivationReportItemsTableComponent {
    constructor() {
        this.displayedColumns = ['id', 'identifierInNamespace', 'label'];
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = this.reportItems;
    }
};
tslib_1.__decorate([
    Input()
], ActivationReportItemsTableComponent.prototype, "reportItems", void 0);
tslib_1.__decorate([
    Input()
], ActivationReportItemsTableComponent.prototype, "category", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], ActivationReportItemsTableComponent.prototype, "paginator", void 0);
ActivationReportItemsTableComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-activation-report-items-table',
        templateUrl: './activation-report-items-table.component.html',
        styleUrls: ['./activation-report-items-table.component.scss']
    })
], ActivationReportItemsTableComponent);
export { ActivationReportItemsTableComponent };
//# sourceMappingURL=activation-report-items-table.component.js.map