import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let ZoomSliderComponent = class ZoomSliderComponent {
    constructor() {
        this.change = new EventEmitter();
    }
    ngOnInit() {
    }
    onSlide(e) {
        this.zoomer.zoomToLevel(e.value);
        this.onChange();
    }
    onChange() {
        setTimeout(() => {
            this.change.emit(this.zoomer);
        }, 0);
    }
    createThumbLabel(currentLevel) {
        return currentLevel + 1;
    }
};
tslib_1.__decorate([
    Input()
], ZoomSliderComponent.prototype, "zoomer", void 0);
tslib_1.__decorate([
    Output()
], ZoomSliderComponent.prototype, "change", void 0);
ZoomSliderComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-zoom-slider',
        templateUrl: './zoom-slider.component.html',
        styleUrls: ['./zoom-slider.component.scss']
    })
], ZoomSliderComponent);
export { ZoomSliderComponent };
//# sourceMappingURL=zoom-slider.component.js.map