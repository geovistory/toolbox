import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
let ColFilterNumericComponent = class ColFilterNumericComponent {
    constructor() {
        this.destroy$ = new Subject();
        this.filterChange = new EventEmitter();
        this.operator$ = new BehaviorSubject('=');
        this.value$ = new BehaviorSubject(null);
        this.operators = [
            '=', '<', '>'
        ];
    }
    ngOnInit() {
        const debouncedVal$ = this.value$.pipe(filter((val) => val !== null), debounceTime(600));
        combineLatest(debouncedVal$, this.operator$).pipe(takeUntil(this.destroy$)).subscribe(([value, operator]) => {
            if (!value)
                this.filterChange.emit();
            else {
                const f = {
                    numeric: { operator, value }
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
], ColFilterNumericComponent.prototype, "filterChange", void 0);
ColFilterNumericComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-col-filter-numeric',
        templateUrl: './col-filter-numeric.component.html',
        styleUrls: ['./col-filter-numeric.component.scss']
    })
], ColFilterNumericComponent);
export { ColFilterNumericComponent };
//# sourceMappingURL=col-filter-numeric.component.js.map