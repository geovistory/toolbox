import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let QfFormControlComponent = class QfFormControlComponent {
    constructor() { }
    ngOnInit() {
        this.rootFormGroup = this.formControlFactory.globalConfig.root.control;
        this.config = this.formControlFactory.config;
    }
};
tslib_1.__decorate([
    Input()
], QfFormControlComponent.prototype, "formControlFactory", void 0);
QfFormControlComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-qf-form-control',
        templateUrl: './qf-form-control.component.html',
        styleUrls: ['./qf-form-control.component.scss']
    })
], QfFormControlComponent);
export { QfFormControlComponent };
//# sourceMappingURL=qf-form-control.component.js.map