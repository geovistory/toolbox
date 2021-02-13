var CoreTableFixedVirtualScrollDirective_1;
import * as tslib_1 from "tslib";
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ContentChild, Directive, forwardRef, Input, } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CoreTableDataSource } from '../data-source';
import { CoreTableVirtualScrollStrategy } from './virtual-scroll.strategy';
let CoreTableFixedVirtualScrollDirective = CoreTableFixedVirtualScrollDirective_1 = class CoreTableFixedVirtualScrollDirective {
    constructor() {
        this.rowHeight = 48;
        this.offset = 56;
        this.scrollStrategy = new CoreTableVirtualScrollStrategy(this.rowHeight, this.offset);
    }
    ngAfterViewInit() {
        if (this.table.dataSource instanceof CoreTableDataSource) {
            this.sub = this.table.dataSource.filteredData.subscribe(data => {
                this.scrollStrategy.setDataLength(data.length);
            });
        }
    }
    ngOnChanges() {
        this.scrollStrategy.setScrollHeight(this.rowHeight, this.offset);
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
};
tslib_1.__decorate([
    Input()
], CoreTableFixedVirtualScrollDirective.prototype, "rowHeight", void 0);
tslib_1.__decorate([
    Input()
], CoreTableFixedVirtualScrollDirective.prototype, "offset", void 0);
tslib_1.__decorate([
    ContentChild(MatTable, /* TODO: add static flag */ { static: false })
], CoreTableFixedVirtualScrollDirective.prototype, "table", void 0);
CoreTableFixedVirtualScrollDirective = CoreTableFixedVirtualScrollDirective_1 = tslib_1.__decorate([
    Directive({
        selector: 'cdk-virtual-scroll-viewport[coreTableVirtualScroll]',
        providers: [
            {
                provide: VIRTUAL_SCROLL_STRATEGY,
                useFactory: (scroll) => scroll.scrollStrategy,
                deps: [forwardRef(() => CoreTableFixedVirtualScrollDirective_1)],
            },
        ],
    })
], CoreTableFixedVirtualScrollDirective);
export { CoreTableFixedVirtualScrollDirective };
//# sourceMappingURL=virtual-scroll.directive.js.map