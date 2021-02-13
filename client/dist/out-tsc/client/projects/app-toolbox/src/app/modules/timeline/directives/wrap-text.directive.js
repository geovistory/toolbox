import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
let WrapTextDirective = class WrapTextDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
        this.d3Service.applyWrapText(this._element.nativeElement, this.wrapText.text, this.wrapText.width, this.wrapText.padding);
    }
};
tslib_1.__decorate([
    Input()
], WrapTextDirective.prototype, "wrapText", void 0);
WrapTextDirective = tslib_1.__decorate([
    Directive({
        selector: '[wrapText]'
    })
], WrapTextDirective);
export { WrapTextDirective };
//# sourceMappingURL=wrap-text.directive.js.map