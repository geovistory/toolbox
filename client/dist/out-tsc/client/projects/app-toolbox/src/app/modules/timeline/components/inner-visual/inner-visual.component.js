import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
let InnerVisualComponent = class InnerVisualComponent extends TimePrimitiveVisual {
    constructor(d3Service, _element) {
        super(d3Service, _element);
    }
    ngOnInit() {
        this.startDate = this.innerOnXAxis.startEnd.start;
        this.endDate = this.innerOnXAxis.startEnd.end;
        this.color = this.innerOnXAxis.startEnd.color;
    }
    ngDoCheck() {
        this.d3Service.placeInnerVisualOnXAxis(this._element.nativeElement, this.innerOnXAxis.timeline, this);
    }
};
tslib_1.__decorate([
    Input('innerVisual')
], InnerVisualComponent.prototype, "innerOnXAxis", void 0);
InnerVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[innerVisual]',
        templateUrl: './inner-visual.component.html',
        styleUrls: ['./inner-visual.component.scss']
    })
], InnerVisualComponent);
export { InnerVisualComponent };
//# sourceMappingURL=inner-visual.component.js.map