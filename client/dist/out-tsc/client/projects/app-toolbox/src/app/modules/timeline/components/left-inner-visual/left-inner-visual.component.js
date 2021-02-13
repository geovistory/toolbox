import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
let LeftInnerVisualComponent = class LeftInnerVisualComponent extends TimePrimitiveVisual {
    constructor(d3Service, _element) {
        super(d3Service, _element);
    }
    ngOnInit() {
        this.color = this.leftInnerOnXAxis.color;
        this.initTimePrimitiveVisual(this.leftInnerOnXAxis);
    }
    ngDoCheck() {
        this.d3Service.placeLeftInnerVisualOnXAxis(this._element.nativeElement, this.leftInnerOnXAxis.timeline, this);
    }
};
tslib_1.__decorate([
    Input('leftInnerVisual')
], LeftInnerVisualComponent.prototype, "leftInnerOnXAxis", void 0);
LeftInnerVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[leftInnerVisual]',
        templateUrl: './left-inner-visual.component.html',
        styleUrls: ['./left-inner-visual.component.scss']
    })
], LeftInnerVisualComponent);
export { LeftInnerVisualComponent };
//# sourceMappingURL=left-inner-visual.component.js.map