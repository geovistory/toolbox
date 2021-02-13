import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
let LeftOuterVisualComponent = class LeftOuterVisualComponent extends TimePrimitiveVisual {
    constructor(d3Service, _element) {
        super(d3Service, _element);
    }
    ngOnInit() {
        this.color = this.leftOuterOnXAxis.color;
        this.initTimePrimitiveVisual(this.leftOuterOnXAxis);
    }
    ngDoCheck() {
        this.d3Service.placeLeftOuterVisualOnXAxis(this._element.nativeElement, this.leftOuterOnXAxis.timeline, this);
    }
};
tslib_1.__decorate([
    Input('leftOuterVisual')
], LeftOuterVisualComponent.prototype, "leftOuterOnXAxis", void 0);
LeftOuterVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[leftOuterVisual]',
        templateUrl: './left-outer-visual.component.html',
        styleUrls: ['./left-outer-visual.component.scss']
    })
], LeftOuterVisualComponent);
export { LeftOuterVisualComponent };
//# sourceMappingURL=left-outer-visual.component.js.map