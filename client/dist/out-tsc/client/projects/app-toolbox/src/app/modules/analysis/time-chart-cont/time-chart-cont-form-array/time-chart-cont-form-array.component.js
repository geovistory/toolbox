import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { lineConfig } from '../time-chart-cont-form/time-chart-cont-form.component';
let TimeChartContFormArrayComponent = class TimeChartContFormArrayComponent {
    constructor() { }
    ngOnInit() {
        console.log(this.formArrayFactory.children);
    }
    /**
     * adds a new lineConfig
     */
    addLine() {
        this.formArrayFactory.append(lineConfig());
    }
    /**
     * removes lineConfig with given index
     */
    removeLine(index) {
        this.formArrayFactory.remove(index);
    }
};
tslib_1.__decorate([
    Input()
], TimeChartContFormArrayComponent.prototype, "formArrayFactory", void 0);
TimeChartContFormArrayComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-time-chart-cont-form-array',
        templateUrl: './time-chart-cont-form-array.component.html',
        styleUrls: ['./time-chart-cont-form-array.component.scss']
    })
], TimeChartContFormArrayComponent);
export { TimeChartContFormArrayComponent };
//# sourceMappingURL=time-chart-cont-form-array.component.js.map