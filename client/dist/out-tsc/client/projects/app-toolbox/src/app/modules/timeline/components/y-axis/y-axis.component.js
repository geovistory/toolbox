import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let YAxisComponent = class YAxisComponent {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnChanges() {
        this.initYAxis();
    }
    initYAxis() {
        this.d3Service.applyYAxis(this._element.nativeElement, this.yAxis);
    }
};
tslib_1.__decorate([
    Input('yAxisVisual')
], YAxisComponent.prototype, "yAxis", void 0);
YAxisComponent = tslib_1.__decorate([
    Component({
        selector: '[yAxisVisual]',
        templateUrl: './y-axis.component.html',
        styleUrls: ['./y-axis.component.scss']
    })
], YAxisComponent);
export { YAxisComponent };
//# sourceMappingURL=y-axis.component.js.map