import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let TileHeaderComponent = class TileHeaderComponent {
    constructor() {
        this.close = new EventEmitter();
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Output()
], TileHeaderComponent.prototype, "close", void 0);
TileHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-tile-header',
        templateUrl: './tile-header.component.html',
        styleUrls: ['./tile-header.component.scss']
    })
], TileHeaderComponent);
export { TileHeaderComponent };
//# sourceMappingURL=tile-header.component.js.map