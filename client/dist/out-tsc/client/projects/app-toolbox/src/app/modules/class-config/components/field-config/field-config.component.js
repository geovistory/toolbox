import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let FieldConfigComponent = class FieldConfigComponent {
    constructor(c) {
        this.c = c;
    }
    ngOnInit() {
        this.fieldLabel$ = this.c.pipeFieldLabel(this.fkProperty, this.fkPropertyDomain, this.fkPropertyRange);
    }
};
tslib_1.__decorate([
    Input()
], FieldConfigComponent.prototype, "fkProject", void 0);
tslib_1.__decorate([
    Input()
], FieldConfigComponent.prototype, "fkProperty", void 0);
tslib_1.__decorate([
    Input()
], FieldConfigComponent.prototype, "fkPropertyDomain", void 0);
tslib_1.__decorate([
    Input()
], FieldConfigComponent.prototype, "fkPropertyRange", void 0);
FieldConfigComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-field-config',
        templateUrl: './field-config.component.html',
        styleUrls: ['./field-config.component.scss']
    })
], FieldConfigComponent);
export { FieldConfigComponent };
//# sourceMappingURL=field-config.component.js.map