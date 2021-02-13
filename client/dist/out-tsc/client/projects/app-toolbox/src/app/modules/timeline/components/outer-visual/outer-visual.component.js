import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
let OuterVisualComponent = class OuterVisualComponent extends TimePrimitiveVisual {
    constructor(d3Service, _element) {
        super(d3Service, _element);
    }
    ngOnInit() {
        this.startDate = this.outerOnXAxis.startEnd.start;
        this.endDate = this.outerOnXAxis.startEnd.end;
        this.color = this.outerOnXAxis.startEnd.color;
    }
    ngDoCheck() {
        this.d3Service.placeOuterVisualOnXAxis(this._element.nativeElement, this.outerOnXAxis.timeline, this);
    }
};
tslib_1.__decorate([
    Input('outerVisual')
], OuterVisualComponent.prototype, "outerOnXAxis", void 0);
OuterVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[outerVisual]',
        templateUrl: './outer-visual.component.html',
        styleUrls: ['./outer-visual.component.scss']
    })
], OuterVisualComponent);
export { OuterVisualComponent };
//# sourceMappingURL=outer-visual.component.js.map