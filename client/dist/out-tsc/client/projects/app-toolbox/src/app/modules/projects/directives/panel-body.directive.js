import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
let PanelBodyDirective = class PanelBodyDirective extends CdkPortalOutlet {
    constructor(eleRef, _componentFactoryResolver, _viewContainerRef) {
        super(_componentFactoryResolver, _viewContainerRef);
        this.eleRef = eleRef;
    }
};
tslib_1.__decorate([
    Input()
], PanelBodyDirective.prototype, "gvPanelId", void 0);
PanelBodyDirective = tslib_1.__decorate([
    Directive({
        selector: '[gvPanelBody]'
    })
], PanelBodyDirective);
export { PanelBodyDirective };
//# sourceMappingURL=panel-body.directive.js.map