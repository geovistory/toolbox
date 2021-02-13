import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, filter } from 'rxjs/operators';
let ColFilterTextComponent = class ColFilterTextComponent {
    constructor() {
        this.destroy$ = new Subject();
        this.filterChange = new EventEmitter();
        this.operator$ = new BehaviorSubject('%iLike%');
        this.value$ = new BehaviorSubject(null);
    }
    ngOnInit() {
        const debouncedVal$ = this.value$.pipe(filter((val) => val !== null), debounceTime(600));
        combineLatest(debouncedVal$, this.operator$).pipe(takeUntil(this.destroy$)).subscribe(([value, operator]) => {
            if (value === '')
                this.filterChange.emit();
            else {
                const f = {
                    text: { operator, value }
                };
                this.filterChange.emit(f);
            }
        });
    }
    /**
     * listen to user changes regarding the operator
     * @param val
     */
    onOperatorChange(val) {
        this.operator$.next(val.value);
    }
    /**
     * listen to user changes regarding the string value
     * @param val
     */
    onValueChange(val) {
        this.value$.next(val);
    }
    ngOnDestroy() {
        this.filterChange.emit();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Output()
], ColFilterTextComponent.prototype, "filterChange", void 0);
ColFilterTextComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-col-filter-text',
        templateUrl: './col-filter-text.component.html',
        styleUrls: ['./col-filter-text.component.scss']
    })
], ColFilterTextComponent);
export { ColFilterTextComponent };
//# sourceMappingURL=col-filter-text.component.js.map