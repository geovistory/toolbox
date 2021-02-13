import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ValidationService } from "projects/app-toolbox/src/app/core/validation/validation.service";
let ControlMessagesComponent = class ControlMessagesComponent {
    constructor() {
        this.framework = 'bootstrap';
    }
    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
};
tslib_1.__decorate([
    Input()
], ControlMessagesComponent.prototype, "control", void 0);
tslib_1.__decorate([
    Input()
], ControlMessagesComponent.prototype, "framework", void 0);
ControlMessagesComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-control-messages',
        templateUrl: './control-messages.component.html'
    })
], ControlMessagesComponent);
export { ControlMessagesComponent };
//# sourceMappingURL=control-messages.component.js.map