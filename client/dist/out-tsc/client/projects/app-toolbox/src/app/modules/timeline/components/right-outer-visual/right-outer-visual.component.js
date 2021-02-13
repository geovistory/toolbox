import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
let RightOuterVisualComponent = class RightOuterVisualComponent extends TimePrimitiveVisual {
    constructor(d3Service, _element) {
        super(d3Service, _element);
    }
    ngOnInit() {
        this.color = this.rightOuterOnXAxis.color;
        this.initTimePrimitiveVisual(this.rightOuterOnXAxis);
    }
    ngDoCheck() {
        this.d3Service.placeRightOuterVisualOnXAxis(this._element.nativeElement, this.rightOuterOnXAxis.timeline, this);
    }
};
tslib_1.__decorate([
    Input('rightOuterVisual')
], RightOuterVisualComponent.prototype, "rightOuterOnXAxis", void 0);
RightOuterVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[rightOuterVisual]',
        templateUrl: './right-outer-visual.component.html',
        styleUrls: ['./right-outer-visual.component.scss']
    })
], RightOuterVisualComponent);
export { RightOuterVisualComponent };
//# sourceMappingURL=right-outer-visual.component.js.map