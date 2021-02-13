import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
let DetailContentComponent = class DetailContentComponent {
    constructor() {
        // @HostBinding('class.gv-flex-fh') fh = true;
        this.scroll = true;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-scroll-y-container')
], DetailContentComponent.prototype, "scroll", void 0);
DetailContentComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-detail-content',
        templateUrl: './detail-content.component.html',
        styleUrls: ['./detail-content.component.scss']
    })
], DetailContentComponent);
export { DetailContentComponent };
//# sourceMappingURL=detail-content.component.js.map