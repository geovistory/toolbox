import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let TeEntVisualComponent = class TeEntVisualComponent {
    constructor() {
        this.rowMouseEnter = new EventEmitter();
        this.rowMouseLeave = new EventEmitter();
        this.rowClick = new EventEmitter();
    }
    ngDoCheck() {
        this.timeline = this.teEntOnXAxis.timeline;
        this.xAxis = this.teEntOnXAxis.timeline.xAxis;
        this.row = this.teEntOnXAxis.row;
    }
    mouseenter() {
        this.rowMouseEnter.emit(this.row);
    }
    mouseleave() {
        this.rowMouseLeave.emit(this.row);
    }
    click() {
        this.rowClick.emit(this.row);
    }
};
tslib_1.__decorate([
    Input('teEntVisual')
], TeEntVisualComponent.prototype, "teEntOnXAxis", void 0);
tslib_1.__decorate([
    Output()
], TeEntVisualComponent.prototype, "rowMouseEnter", void 0);
tslib_1.__decorate([
    Output()
], TeEntVisualComponent.prototype, "rowMouseLeave", void 0);
tslib_1.__decorate([
    Output()
], TeEntVisualComponent.prototype, "rowClick", void 0);
TeEntVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[teEntVisual]',
        templateUrl: './te-ent-visual.component.html',
        styleUrls: ['./te-ent-visual.component.scss']
    })
], TeEntVisualComponent);
export { TeEntVisualComponent };
//# sourceMappingURL=te-ent-visual.component.js.map