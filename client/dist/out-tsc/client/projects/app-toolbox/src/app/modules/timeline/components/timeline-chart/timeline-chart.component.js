import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JulianDateTime } from '@kleiolab/lib-utils';
import { GregorianDateTime } from '@kleiolab/lib-utils';
import { merge, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { YAxisDefinition } from '../../models/y-axis-definition';
import { Zoomer } from '../../models/zoomer';
import { ChartLineDefinition } from '../chart-line-visual/chart-line-visual.component';
export class CursorInfo {
    constructor(datePipe) {
        this.datePipe = datePipe;
        this.switchBetweenCalendars = 2299161 * 24 * 60 * 60;
    }
    get rangePx() {
        return this.scaleX(this.domainX);
    }
    get julianDay() {
        return Math.round((this.domainX / 86400));
    }
    get julianSecond() {
        return Math.round(this.domainX);
    }
    get cursorDateLabel() {
        return this.getDateLabel(this.domainX);
    }
    /**
     * Converts julian second to human readable date label
     * @param julianSecond
     */
    getDateLabel(julianSecond) {
        let dt;
        if (julianSecond < this.switchBetweenCalendars) {
            dt = new JulianDateTime().fromJulianSecond(julianSecond);
        }
        else {
            dt = new GregorianDateTime().fromJulianSecond(julianSecond);
        }
        return this.datePipe.transform(dt.getDate(), 'MMM d, y GG');
    }
}
let TimelineChartComponent = class TimelineChartComponent {
    constructor(datePipe, ref) {
        this.datePipe = datePipe;
        this.ref = ref;
        this.destroy$ = new Subject();
        this.switchBetweenCalendars = 2299161 * 24 * 60 * 60;
        this.zoomer = new Zoomer(0, 200);
        this.marginTop = 30;
        this.xAxisHeight = 20;
        this.showInfoBtn = false;
        this.showInfoBox = true;
        this.cursorChange = new EventEmitter();
        this.chartLineDefChange = new EventEmitter();
        this.showDetailsClick = new EventEmitter();
        this.showAllItemsClick = new EventEmitter();
        this.dimension$ = new Subject();
        this.beforeRedraw$ = new Subject();
        /**
         * important object holding all information about the cursor
         * for display
         */
        this.cursorInfo = new CursorInfo(this.datePipe);
    }
    ngOnInit() {
        if (!this.showCursor$)
            this.showCursor$ = new BehaviorSubject(true);
        combineLatest(this.dimension$, this.showCursor$).pipe(first(), takeUntil(this.destroy$)).subscribe(([d, showCursor]) => {
            this.showCursor = showCursor;
            this.width = d.dimensions.width;
            this.height = d.dimensions.height;
            this.zoomer.rangeStart = 30;
            this.zoomer.rangeEnd = this.width - 30;
            let isFirst = true;
            this.data$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
                this.data = data;
                // get the minimum and maximum domain for x and y axes
                this.xMin = Number.POSITIVE_INFINITY;
                this.xMax = Number.NEGATIVE_INFINITY;
                this.yMin = Number.POSITIVE_INFINITY;
                this.yMax = Number.NEGATIVE_INFINITY;
                for (let j = 0; j < data.chartLines.length; j++) {
                    const chartLine = data.chartLines[j];
                    for (let i = 0; i < chartLine.linePoints.length; i++) {
                        const chartLinePoint = chartLine.linePoints[i];
                        if (this.xMin > chartLinePoint.x)
                            this.xMin = chartLinePoint.x;
                        if (this.xMax < chartLinePoint.x)
                            this.xMax = chartLinePoint.x;
                        if (this.yMin > chartLinePoint.y)
                            this.yMin = chartLinePoint.y;
                        if (this.yMax < chartLinePoint.y)
                            this.yMax = chartLinePoint.y;
                    }
                }
                if (this.cursorInfo.domainX === undefined)
                    this.cursorInfo.domainX = this.xMin;
                this.zoomer.setExtent(this.xMin, this.xMax);
                if (isFirst) {
                    isFirst = false;
                    this.zoomer.zoomToExtent();
                }
                this.redraw();
            });
            this.dimension$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
                this.width = event.dimensions.width;
                this.height = event.dimensions.height;
                this.zoomer.rangeStart = 30;
                this.zoomer.rangeEnd = this.width - 30;
                this.redraw();
            });
            this.showCursor$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
                this.showCursor = val;
                this.redraw();
            });
        });
    }
    onDimensionsChange(e) {
        this.dimension$.next(e);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    redraw() {
        this.beforeRedraw$.next();
        this.initXAxis();
        this.initYAxis();
        this.initChartLine();
        this.cursorChange.emit(this.cursorInfo);
        this.ref.detectChanges();
    }
    initXAxis() {
        const xAxisOptions = {
            marginTop: this.height - this.marginTop,
            marginLeft: 30,
            marginRight: 0,
            zoomer: this.zoomer,
            domainStart: this.zoomer.domainStart,
            domainEnd: this.zoomer.domainEnd,
            containerWidth: this.width,
            containerHeight: 30,
            tickSizeInner: 5,
            tickSizeOuter: 0,
            tickPadding: 6
        };
        // Julian fixed top
        this.xAxisJulian = new XAxisDefinition(Object.assign({}, xAxisOptions, { maxJulianSecond: this.switchBetweenCalendars, calendar: 'julian' }), this.datePipe);
        // Gregorian fiyed top
        this.xAxisGreg = new XAxisDefinition(Object.assign({}, xAxisOptions, { minJulianSecond: this.switchBetweenCalendars, calendar: 'gregorian' }), this.datePipe);
        this.cursorInfo.scaleX = this.xAxisJulian.scale;
    }
    initYAxis() {
        this.yAxis = new YAxisDefinition({
            domainStart: this.yMin,
            domainEnd: this.yMax,
            height: this.height,
            marginTop: this.marginTop,
            marginBottom: 30,
            marginLeft: 30,
            tickSizeInner: 5,
            tickSizeOuter: 0,
            tickPadding: 6
        });
    }
    initChartLine() {
        this.chartLine = new ChartLineDefinition({
            data: this.data,
            scaleX: this.xAxisJulian.scale,
            scaleY: this.yAxis.scale,
            marginLeft: 31,
            marginBottom: this.marginTop,
            marginTop: 0,
            width: this.width - 31,
            height: this.height,
            showCursor: this.showCursor,
            cursorRangeX: this.xAxisJulian.scale(this.cursorInfo.domainX),
            cursorInfoFn: (cursorValues) => {
                this.cursorInfo.domainX = cursorValues.domainX;
                this.cursorInfo.linePoint = cursorValues.linePoint;
                this.cursorInfo.activeLine = cursorValues.activeLine;
                this.cursorChange.emit(this.cursorInfo);
            }
        });
        this.chartLine.change$
            .pipe(takeUntil(merge(this.beforeRedraw$, this.destroy$)))
            .subscribe((v) => {
            this.chartLineDefChange.next(v);
            this.redraw();
        });
        this.chartLine.activeLineClicked$
            .pipe(takeUntil(merge(this.beforeRedraw$, this.destroy$)))
            .subscribe((data) => {
            alert(JSON.stringify(data.clickedLinePoint));
        });
    }
    onDrag(rangeDiff) {
        const rangeStart = this.xAxisJulian.scale(this.zoomer.domainStart);
        const rangeEnd = this.xAxisJulian.scale(this.zoomer.domainEnd);
        const s = this.xAxisJulian.scale.invert(rangeStart + rangeDiff);
        const e = this.xAxisJulian.scale.invert(rangeEnd + rangeDiff);
        // end is julian second of day 3500-01-01
        if ((rangeDiff < 0 && s > 0) || (rangeDiff > 0 && e < 2999409 * 86400)) {
            this.zoomer.domainStart = s;
            this.zoomer.domainEnd = e;
            // set bounds to cursor
            if (this.cursorInfo.domainX < s)
                this.cursorInfo.domainX = s;
            else if (this.cursorInfo.domainX > e)
                this.cursorInfo.domainX = e;
            this.redraw();
        }
    }
    /**
     * matSelect compareWith function
     * see: https://material.angular.io/components/select/api#MatSelect
     */
    compareWith(optionVal, selectedVal) {
        return selectedVal !== null ? selectedVal === optionVal : -1 === optionVal;
    }
    // onChangeCursorPosition(rangeX: number) {
    // }
    get hasActiveLine() {
        if (this.chartLine &&
            this.chartLine.config &&
            this.chartLine.config.data &&
            typeof this.chartLine.config.data.activeLine === 'number') {
            return true;
        }
        return false;
    }
    onShowDetailsClick() {
        this.showDetailsClick.emit(this.cursorInfo);
    }
    onAllItemsClick(pkEntities) {
        this.showAllItemsClick.emit(pkEntities);
    }
};
tslib_1.__decorate([
    Input()
], TimelineChartComponent.prototype, "data$", void 0);
tslib_1.__decorate([
    Input()
], TimelineChartComponent.prototype, "showCursor$", void 0);
tslib_1.__decorate([
    Input()
], TimelineChartComponent.prototype, "showInfoBtn", void 0);
tslib_1.__decorate([
    Input()
], TimelineChartComponent.prototype, "showInfoBox", void 0);
tslib_1.__decorate([
    Output()
], TimelineChartComponent.prototype, "cursorChange", void 0);
tslib_1.__decorate([
    Output()
], TimelineChartComponent.prototype, "chartLineDefChange", void 0);
tslib_1.__decorate([
    Output()
], TimelineChartComponent.prototype, "showDetailsClick", void 0);
tslib_1.__decorate([
    Output()
], TimelineChartComponent.prototype, "showAllItemsClick", void 0);
TimelineChartComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-timeline-chart',
        templateUrl: './timeline-chart.component.html',
        styleUrls: ['./timeline-chart.component.scss']
    })
], TimelineChartComponent);
export { TimelineChartComponent };
//# sourceMappingURL=timeline-chart.component.js.map