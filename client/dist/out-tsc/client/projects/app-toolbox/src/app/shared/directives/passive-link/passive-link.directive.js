import * as tslib_1 from "tslib";
import { Directive, Input, HostListener } from '@angular/core';
let PassiveLinkDirective = class PassiveLinkDirective {
    preventDefault(event) {
        if (this.href.length == 0)
            event.preventDefault();
    }
};
tslib_1.__decorate([
    Input()
], PassiveLinkDirective.prototype, "href", void 0);
tslib_1.__decorate([
    HostListener('click', ['$event'])
], PassiveLinkDirective.prototype, "preventDefault", null);
PassiveLinkDirective = tslib_1.__decorate([
    Directive({
        selector: '[href].gv-passive-link'
    })
], PassiveLinkDirective);
export { PassiveLinkDirective };
//# sourceMappingURL=passive-link.directive.js.map