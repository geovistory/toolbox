import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
let ClassConfigComponent = class ClassConfigComponent {
    constructor(c) {
        this.c = c;
    }
    getKey(_, item) {
        return _;
    }
    ngOnInit() {
        this.classLabel$ = this.c.pipeClassLabel(this.fkClass);
    }
};
tslib_1.__decorate([
    HostBinding('class.mat-typography')
], ClassConfigComponent.prototype, "true", void 0);
tslib_1.__decorate([
    Input()
], ClassConfigComponent.prototype, "fkAppContext", void 0);
tslib_1.__decorate([
    Input()
], ClassConfigComponent.prototype, "fkClass", void 0);
tslib_1.__decorate([
    Input()
], ClassConfigComponent.prototype, "fkProject", void 0);
ClassConfigComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-class-config',
        templateUrl: './class-config.component.html',
        styleUrls: ['./class-config.component.scss']
    })
], ClassConfigComponent);
export { ClassConfigComponent };
//# sourceMappingURL=class-config.component.js.map