import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
let TimeColSignalComponent = class TimeColSignalComponent {
    constructor() {
        this.dInline = true;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    HostBinding('class.d-inline')
], TimeColSignalComponent.prototype, "dInline", void 0);
TimeColSignalComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-time-col-signal',
        templateUrl: './time-col-signal.component.html',
        styleUrls: ['./time-col-signal.component.scss']
    })
], TimeColSignalComponent);
export { TimeColSignalComponent };
//# sourceMappingURL=time-col-signal.component.js.map