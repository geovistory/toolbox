import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
let RightInnerVisualComponent = class RightInnerVisualComponent extends TimePrimitiveVisual {
    constructor(d3Service, _element) {
        super(d3Service, _element);
    }
    ngOnInit() {
        this.color = this.rightInnerOnXAxis.color;
        this.initTimePrimitiveVisual(this.rightInnerOnXAxis);
    }
    ngDoCheck() {
        this.d3Service.placeRightInnerVisualOnXAxis(this._element.nativeElement, this.rightInnerOnXAxis.timeline, this);
    }
};
tslib_1.__decorate([
    Input('rightInnerVisual')
], RightInnerVisualComponent.prototype, "rightInnerOnXAxis", void 0);
RightInnerVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[rightInnerVisual]',
        templateUrl: './right-inner-visual.component.html',
        styleUrls: ['./right-inner-visual.component.scss']
    })
], RightInnerVisualComponent);
export { RightInnerVisualComponent };
//# sourceMappingURL=right-inner-visual.component.js.map