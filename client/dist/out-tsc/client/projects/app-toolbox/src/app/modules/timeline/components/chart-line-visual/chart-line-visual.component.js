import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
export class ChartLineDefinition {
    constructor(config) {
        this.config = config;
        // emits when user clicks a active (colored) line
        this.activeLineClicked$ = new Subject();
        this.change$ = new Subject();
    }
    activateLine(i, mouseX) {
        this.config.data.activeLine = i;
        this.config.data.mouseX = mouseX;
        this.change$.next(this);
    }
    deactivateLine() {
        this.config.data.activeLine = null;
        this.change$.next(this);
    }
    onActiveLineClick(i, clickedLinePoint) {
        this.config.data.activeLine = i;
        this.activeLineClicked$.next({
            clickedLine: this.config.data.chartLines[i],
            clickedLineIndex: i,
            clickedLinePoint,
        });
    }
}
let ChartLineVisualComponent = class ChartLineVisualComponent {
    constructor(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this.d3Service.placeChartLineVisual(this._element.nativeElement, this.chartLine);
    }
};
tslib_1.__decorate([
    Input('chartLineVisual')
], ChartLineVisualComponent.prototype, "chartLine", void 0);
ChartLineVisualComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line: component-selector
        selector: '[chartLineVisual]',
        templateUrl: './chart-line-visual.component.html',
        styleUrls: ['./chart-line-visual.component.scss']
    })
], ChartLineVisualComponent);
export { ChartLineVisualComponent };
//# sourceMappingURL=chart-line-visual.component.js.map