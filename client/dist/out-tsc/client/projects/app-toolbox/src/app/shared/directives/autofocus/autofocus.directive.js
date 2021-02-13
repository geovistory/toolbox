import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
let AutofocusDirective = class AutofocusDirective {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        setTimeout(() => this.el.nativeElement.focus(), 0);
    }
};
AutofocusDirective = tslib_1.__decorate([
    Directive({
        selector: '[gvAutofocus]'
    })
], AutofocusDirective);
export { AutofocusDirective };
//# sourceMappingURL=autofocus.directive.js.map