import * as tslib_1 from "tslib";
import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
let DetailTopBarComponent = class DetailTopBarComponent {
    constructor() {
        this.openRight = new EventEmitter();
        this.closeRight = new EventEmitter();
        this.openLeft = new EventEmitter();
        this.closeLeft = new EventEmitter();
        this.noshrink = true;
    }
    ngOnInit() {
        this.height = this.height ? this.height : '2.5rem';
    }
};
tslib_1.__decorate([
    Input()
], DetailTopBarComponent.prototype, "closeRightAreaBtn", void 0);
tslib_1.__decorate([
    Input()
], DetailTopBarComponent.prototype, "openRightAreaBtn", void 0);
tslib_1.__decorate([
    Input()
], DetailTopBarComponent.prototype, "closeLeftAreaBtn", void 0);
tslib_1.__decorate([
    Input()
], DetailTopBarComponent.prototype, "openLeftAreaBtn", void 0);
tslib_1.__decorate([
    Input()
], DetailTopBarComponent.prototype, "height", void 0);
tslib_1.__decorate([
    Output()
], DetailTopBarComponent.prototype, "openRight", void 0);
tslib_1.__decorate([
    Output()
], DetailTopBarComponent.prototype, "closeRight", void 0);
tslib_1.__decorate([
    Output()
], DetailTopBarComponent.prototype, "openLeft", void 0);
tslib_1.__decorate([
    Output()
], DetailTopBarComponent.prototype, "closeLeft", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-shrink-0')
], DetailTopBarComponent.prototype, "noshrink", void 0);
DetailTopBarComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-detail-top-bar',
        templateUrl: './detail-top-bar.component.html',
        styleUrls: ['./detail-top-bar.component.scss']
    })
], DetailTopBarComponent);
export { DetailTopBarComponent };
//# sourceMappingURL=detail-top-bar.component.js.map