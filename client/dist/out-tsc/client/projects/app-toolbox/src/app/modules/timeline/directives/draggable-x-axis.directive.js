import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Output } from '@angular/core';
let DraggableXAxisDirective = class DraggableXAxisDirective {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
        this.onDrag = new EventEmitter();
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
    }
    ngOnInit() {
        this.d3Service.applyDraggableXAxisBehaviour(this._element.nativeElement)
            .subscribe((event) => {
            switch (event.type) {
                case 'onDrag':
                    this.onDrag.emit(event.diff);
                    break;
                case 'onDragStart':
                    this.onDragStart.emit();
                    break;
                case 'onDragEnd':
                    this.onDragEnd.emit();
                    break;
            }
        });
    }
};
tslib_1.__decorate([
    Output()
], DraggableXAxisDirective.prototype, "onDrag", void 0);
tslib_1.__decorate([
    Output()
], DraggableXAxisDirective.prototype, "onDragStart", void 0);
tslib_1.__decorate([
    Output()
], DraggableXAxisDirective.prototype, "onDragEnd", void 0);
DraggableXAxisDirective = tslib_1.__decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[draggableXAxis]'
    })
], DraggableXAxisDirective);
export { DraggableXAxisDirective };
//# sourceMappingURL=draggable-x-axis.directive.js.map