import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let XAxisComponent = class XAxisComponent {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnChanges() {
        this.initXAxis();
    }
    initXAxis() {
        this.d3Service.applyXAxis(this._element.nativeElement, this.xAxis);
    }
};
tslib_1.__decorate([
    Input('xAxisVisual')
], XAxisComponent.prototype, "xAxis", void 0);
XAxisComponent = tslib_1.__decorate([
    Component({
        selector: '[xAxisVisual]',
        templateUrl: './x-axis.component.html',
        styleUrls: ['./x-axis.component.scss']
    })
], XAxisComponent);
export { XAxisComponent };
//# sourceMappingURL=x-axis.component.js.map