import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let DigitalPreviewComponent = class DigitalPreviewComponent {
    constructor(p) {
        this.p = p;
        this.openTabOnClick = false;
    }
    ngOnInit() {
        this.label = this.digital.string.substr(0, 20) + (this.digital.string.length > 20 ? '...' : '');
    }
    click() {
        if (this.openTabOnClick)
            this.p.addTextTab(this.digital.pk_entity);
    }
};
tslib_1.__decorate([
    Input()
], DigitalPreviewComponent.prototype, "digital", void 0);
tslib_1.__decorate([
    Input()
], DigitalPreviewComponent.prototype, "openTabOnClick", void 0);
DigitalPreviewComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-digital-preview',
        templateUrl: './digital-preview.component.html',
        styleUrls: ['./digital-preview.component.scss']
    })
], DigitalPreviewComponent);
export { DigitalPreviewComponent };
//# sourceMappingURL=digital-preview.component.js.map