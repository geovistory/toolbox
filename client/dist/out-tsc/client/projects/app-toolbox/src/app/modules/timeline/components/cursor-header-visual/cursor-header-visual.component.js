import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let CursorHeaderVisualComponent = class CursorHeaderVisualComponent {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngDoCheck() {
        this.d3Service.placeCursorOnXAxis(this._element.nativeElement, this.cursor.scaleX, this.cursor.julianSecond);
    }
};
tslib_1.__decorate([
    Input('cursorHeaderVisual')
], CursorHeaderVisualComponent.prototype, "cursor", void 0);
CursorHeaderVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[cursorHeaderVisual]',
        templateUrl: './cursor-header-visual.component.html',
        styleUrls: ['./cursor-header-visual.component.scss']
    })
], CursorHeaderVisualComponent);
export { CursorHeaderVisualComponent };
//# sourceMappingURL=cursor-header-visual.component.js.map