import * as tslib_1 from "tslib";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Input, Output, ViewChild, ViewChildren, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { coerceBoolean } from './coerce-boolean';
import { CoreTableDataSource } from './data-source';
import { CoreTableFilterComponent } from './filter/filter.component';
import { CoreTableMenuComponent } from './menu/menu.component';
export class CoreTable {
    constructor() {
        this.select = new Subject();
    }
    get pending() {
        return this._pending;
    }
    set pending(pending) {
        this._pending = coerceBoolean(pending);
    }
    get indeterminate() {
        return this.dataSource.selected.length > 0 && !this.selectedAll;
    }
    get length() {
        return this.dataSource.data.length;
    }
    get selectedAll() {
        return this.dataSource.selectedAll;
    }
    ngOnInit() {
        this.init();
    }
    ngAfterViewInit() {
        if (this.filters.length && this.tableMenu == null) {
            // this just hides the table data by introducing a bogus filter.
            // not having a clear filters button hopefully makes the error obvious.
            this.dataSource.setFilter({ key: '', predicate: () => null, valueFn: () => { } });
            // this notifies the error to the dev
            throw new Error(`<core-table-filter> usage requires a <core-table-menu> for user convenience`);
        }
        this.afterViewInit();
    }
    init() {
        // already init'd short-circuit/guard
        if (this.dataSource) {
            return;
        }
        if (hasObservers(this.select)) {
            this.columns = ['select', ...this.columns];
        }
        this.dataSource = new CoreTableDataSource([], {
            sort: this.sort,
            paginator: this.paginator,
            viewport: this.viewport,
        });
        this.dataSource.selectionChanged.subscribe(() => this.select.next(this.dataSource.selected));
        this.onInit();
    }
    clearFilters() {
        this.dataSource.clearFilters();
        this.filters.forEach(fc => fc.filter.setValue(null));
    }
    clearSelection() {
        this.dataSource.clearSelection();
    }
    filter(key, predicate, valueFn) {
        this.dataSource.setFilter({ key, predicate, valueFn });
    }
    isSelected(item) {
        return this.dataSource.isSelected(item);
    }
    toggle(item) {
        this.dataSource.toggle(item);
    }
    toggleAll() {
        this.dataSource.toggleAll();
    }
    /**
     * Override this methods to execute during ngOnInit
     */
    onInit() { }
    afterViewInit() { }
    /**
     * Sets the data for dataSource usage
     */
    set(data) {
        this.init();
        this.dataSource.allData = data;
    }
}
tslib_1.__decorate([
    Input()
], CoreTable.prototype, "pending", null);
tslib_1.__decorate([
    Output()
], CoreTable.prototype, "select", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false })
], CoreTable.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], CoreTable.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(CdkVirtualScrollViewport, /* TODO: check static flag */ { static: true })
], CoreTable.prototype, "viewport", void 0);
tslib_1.__decorate([
    ViewChild(CoreTableMenuComponent, { static: false })
], CoreTable.prototype, "tableMenu", void 0);
tslib_1.__decorate([
    ViewChildren(CoreTableFilterComponent)
], CoreTable.prototype, "filters", void 0);
function hasObservers(subject) {
    return subject.observers.length > 0;
}
//# sourceMappingURL=table.js.map