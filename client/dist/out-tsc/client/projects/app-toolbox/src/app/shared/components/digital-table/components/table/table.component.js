import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
let TableComponent = class TableComponent {
    constructor(p) {
        this.p = p;
        this.destroy$ = new Subject();
        // mandatory inputs
        this.loading = false;
        // optionnal inputs
        this.filteringEnabled = false;
        this.sortingEnabled = false;
        this.lineBreak = false;
        // outputs
        this.sortDemanded = new EventEmitter();
        this.filterDemanded = new EventEmitter();
        this.cellClicked = new EventEmitter();
    }
    ngOnInit() {
        this.headers = [];
        this.table = [];
        this.curSort = { colNb: -1, direction: '' };
        this.filters = [];
        // listen to input headers (from parent)
        this.headers$.pipe(takeUntil(this.destroy$)).subscribe(headers => {
            this.headers = headers;
        });
        this.isThereMappings$ = this.headers$.pipe(map((headers) => headers.some(h => h.mapping)));
        // listen to input table (from parent)
        this.table$.pipe(takeUntil(this.destroy$)).subscribe(table => {
            this.table = table;
        });
        // listen to sortBy option (from parent or from html)
        if (this.sortBy$)
            this.sortBy$.pipe(takeUntil(this.destroy$)).subscribe(sort => this.curSort = sort);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    sort(col) {
        if (!this.sortingEnabled)
            return;
        if (col == this.curSort.colNb)
            this.curSort.direction = this.curSort.direction == 'ASC' ? 'DESC' : 'ASC';
        else
            this.curSort = { colNb: col, direction: 'ASC' };
        this.sortDemanded.emit(this.curSort);
    }
    filter(col, event) {
        if (!this.filteringEnabled)
            return;
        if (event) {
            if (event.numeric)
                event.numeric.value = parseFloat(event.numeric.value);
            this.filters[col + ''] = { col: col, filter: event };
        }
        else
            this.filters.splice(col, 1);
        this.filterDemanded.emit(Object.keys(this.filters).map(f => this.filters[f]));
    }
    cellClick(row, col) {
        this.cellClicked.emit({ col, row });
    }
};
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "loading", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "headers$", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "table$", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "filteringEnabled", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "sortingEnabled", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "lineBreak", void 0);
tslib_1.__decorate([
    Input()
], TableComponent.prototype, "sortBy$", void 0);
tslib_1.__decorate([
    Output()
], TableComponent.prototype, "sortDemanded", void 0);
tslib_1.__decorate([
    Output()
], TableComponent.prototype, "filterDemanded", void 0);
tslib_1.__decorate([
    Output()
], TableComponent.prototype, "cellClicked", void 0);
TableComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss']
    })
], TableComponent);
export { TableComponent };
//# sourceMappingURL=table.component.js.map