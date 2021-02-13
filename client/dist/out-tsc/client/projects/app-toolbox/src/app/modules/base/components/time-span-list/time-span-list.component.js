import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let TimeSpanListComponent = class TimeSpanListComponent {
    constructor(p, t, timeSpan) {
        this.p = p;
        this.t = t;
        this.timeSpan = timeSpan;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.item$ = this.t.pipeItemTimeSpan(this.pkEntity);
        this.itemsCount$ = of(1);
        this.item$.pipe(takeUntil(this.destroy$)).subscribe(item => {
            this.item = item;
        });
    }
    openModal() {
        this.timeSpan.openModal(this.item, this.pkEntity);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], TimeSpanListComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], TimeSpanListComponent.prototype, "treeControl", void 0);
tslib_1.__decorate([
    Input()
], TimeSpanListComponent.prototype, "readonly$", void 0);
tslib_1.__decorate([
    Input()
], TimeSpanListComponent.prototype, "showOntoInfo$", void 0);
tslib_1.__decorate([
    Input()
], TimeSpanListComponent.prototype, "addButtonVisible", void 0);
tslib_1.__decorate([
    Input()
], TimeSpanListComponent.prototype, "toggleButtonVisible", void 0);
TimeSpanListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-time-span-list',
        templateUrl: './time-span-list.component.html',
        styleUrls: ['./time-span-list.component.scss']
    })
], TimeSpanListComponent);
export { TimeSpanListComponent };
//# sourceMappingURL=time-span-list.component.js.map