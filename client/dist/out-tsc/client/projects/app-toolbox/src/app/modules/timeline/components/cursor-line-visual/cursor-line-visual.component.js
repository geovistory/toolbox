import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let CursorLineVisualComponent = class CursorLineVisualComponent {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngDoCheck() {
        this.d3Service.placeCursorOnXAxis(this._element.nativeElement, this.cursor.scaleX, this.cursor.julianSecond);
    }
};
tslib_1.__decorate([
    Input('cursorLineVisual')
], CursorLineVisualComponent.prototype, "cursor", void 0);
CursorLineVisualComponent = tslib_1.__decorate([
    Component({
        selector: '[cursorLineVisual]',
        templateUrl: './cursor-line-visual.component.html',
        styleUrls: ['./cursor-line-visual.component.scss']
    })
], CursorLineVisualComponent);
export { CursorLineVisualComponent };
//# sourceMappingURL=cursor-line-visual.component.js.map