import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter } from '@angular/core';
const elementResizeDetectorMaker = require('element-resize-detector');
let DimensionChangeDirective = class DimensionChangeDirective {
    constructor(el) {
        this.el = el;
        this.onDimensionsChange = new EventEmitter();
    }
    ngOnInit() {
        this.nativeElement = this.el.nativeElement;
        const event = new Event('dimensions');
        this.observer = elementResizeDetectorMaker();
        this.observer.listenTo(this.nativeElement, element => {
            const { offsetWidth: width, offsetHeight: height } = element;
            const dimensions = { width, height };
            event['dimensions'] = dimensions;
            this.onDimensionsChange.emit(event);
        });
    }
    ngOnDestroy() {
        this.observer.uninstall(this.nativeElement);
    }
};
tslib_1.__decorate([
    Output()
], DimensionChangeDirective.prototype, "onDimensionsChange", void 0);
DimensionChangeDirective = tslib_1.__decorate([
    Directive({
        selector: '[gvDimensionChange]'
    })
], DimensionChangeDirective);
export { DimensionChangeDirective };
;
//# sourceMappingURL=dimension-change.directive.js.map