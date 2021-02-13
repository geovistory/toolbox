import * as tslib_1 from "tslib";
import { takeUntil, map } from 'rxjs/operators';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
let TabHandleComponent = class TabHandleComponent {
    constructor(p, ref) {
        this.p = p;
        this.ref = ref;
        this.destroy$ = new Subject();
        this.activateTab = new EventEmitter();
        this.closeTab = new EventEmitter();
    }
    ngOnInit() {
        this.title$ = this.p.getTabTitle(this.tab.path);
        this.tooltip$ = combineLatest(this.p.getTabTooltip(this.tab.path), this.title$).pipe(map(([tooltip, title]) => tooltip ? tooltip : title));
        this.loading$ = this.p.getTabLoading(this.tab.path);
        this.title$.pipe(takeUntil(this.destroy$)).subscribe(t => this.ref.detectChanges());
        this.loading$.pipe(takeUntil(this.destroy$)).subscribe(t => this.ref.detectChanges());
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], TabHandleComponent.prototype, "tab", void 0);
tslib_1.__decorate([
    Output()
], TabHandleComponent.prototype, "activateTab", void 0);
tslib_1.__decorate([
    Output()
], TabHandleComponent.prototype, "closeTab", void 0);
TabHandleComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-tab-handle',
        templateUrl: './tab-handle.component.html',
        styleUrls: ['./tab-handle.component.scss']
    })
], TabHandleComponent);
export { TabHandleComponent };
//# sourceMappingURL=tab-handle.component.js.map