import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Output, Input } from '@angular/core';
let RangeEmitterOnMouseDownDirective = class RangeEmitterOnMouseDownDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
        this.onRangeChange = new EventEmitter();
    }
    ngOnInit() {
        this.d3Service.applyRangeEmitterOnKeyDown(this._element.nativeElement, this.rangeEmitterOnMouseDown)
            .subscribe((event) => {
            this.onRangeChange.emit(event);
        });
    }
};
tslib_1.__decorate([
    Input()
], RangeEmitterOnMouseDownDirective.prototype, "rangeEmitterOnMouseDown", void 0);
tslib_1.__decorate([
    Output()
], RangeEmitterOnMouseDownDirective.prototype, "onRangeChange", void 0);
RangeEmitterOnMouseDownDirective = tslib_1.__decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[rangeEmitterOnMouseDown]'
    })
], RangeEmitterOnMouseDownDirective);
export { RangeEmitterOnMouseDownDirective };
//# sourceMappingURL=range-emitter-on-mouse-down.directive.js.map