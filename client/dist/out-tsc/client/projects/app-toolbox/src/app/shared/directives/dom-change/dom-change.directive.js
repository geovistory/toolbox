import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, Input } from '@angular/core';
let DomChangeDirective = class DomChangeDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.domChange = new EventEmitter();
        const element = this.elementRef.nativeElement;
        this.changes = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => this.domChange.emit(mutation));
        });
        this.changes.observe(element, {
            subtree: true,
            attributes: true,
            childList: true,
        });
    }
    ngOnDestroy() {
        this.changes.disconnect();
    }
};
tslib_1.__decorate([
    Input()
], DomChangeDirective.prototype, "gvDomChange", void 0);
tslib_1.__decorate([
    Output()
], DomChangeDirective.prototype, "domChange", void 0);
DomChangeDirective = tslib_1.__decorate([
    Directive({
        selector: '[gvDomChange]'
    })
], DomChangeDirective);
export { DomChangeDirective };
//# sourceMappingURL=dom-change.directive.js.map