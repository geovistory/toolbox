import { EventEmitter } from '@angular/core';
import { TimeSpanUtil } from "@kleiolab/lib-utils";
import { XAxisDefinition } from './x-axis-definition';
/**
 * This class generates all data that are needed to create a visual
 * representation of a timeline.
 */
export class Timeline {
    /**
     * Construct the TimeLineChart by passing in data (timePrimitives) and options
     * @param timePrimitives the timePrimitives that will be displayed on the timeline
     * @param options options about the outline of the chart
     */
    constructor(data, options, datePipe) {
        this.data = data;
        this.datePipe = datePipe;
        this.ticker = new EventEmitter();
        this.options = options;
        this.init(this.options);
    }
    static getExtent(rows, options) {
        const timePrimitives = [];
        rows.forEach((row) => {
            const ext = row.existenceTime;
            const minMaxOfExTime = ext.getMinMaxTimePrimitive();
            if (minMaxOfExTime) {
                timePrimitives.push(minMaxOfExTime.min);
                timePrimitives.push(minMaxOfExTime.max);
            }
        });
        if (timePrimitives.length > 0) {
            const minMax = TimeSpanUtil.getMinMaxTimePrimitveOfArray(timePrimitives);
            const firstSec = minMax.min.getJulianSecond();
            const lastSec = minMax.max.getLastSecond();
            const domainDiff = Math.abs(firstSec - lastSec);
            const margin = domainDiff * 0.1;
            const firstSecond = firstSec - margin;
            const lastSecond = lastSec + margin;
            return { firstSecond, lastSecond };
        }
        else {
            const firstSecond = options.domainStartDefault;
            const lastSecond = options.domainEndDefault;
            return { firstSecond, lastSecond };
        }
    }
    init(options) {
        this.options = options;
        this.options.zoomer.rangeStart = 0;
        this.options.zoomer.rangeEnd = options.width;
        if (this.options.zoomer.currentLevel === undefined) {
            this.options.zoomer.setExtent(options.domainStart, options.domainEnd);
            this.options.zoomer.zoomToExtent();
        }
        const switchBetweenCalendars = 2299161 * 24 * 60 * 60;
        /** xAxis fixed top */
        const xAxisTopOptions = Object.assign({}, options.xAxisTopOptions, { zoomer: this.options.zoomer, domainStart: this.options.zoomer.domainStart, domainEnd: this.options.zoomer.domainEnd, containerWidth: options.width, tickSizeInner: 0, tickSizeOuter: 0 });
        // Julian fixed top
        this.xAxis = new XAxisDefinition(Object.assign({}, xAxisTopOptions, { maxJulianSecond: switchBetweenCalendars, calendar: 'julian' }), this.datePipe);
        // Gregorian fiyed top
        this.xAxisGreg = new XAxisDefinition(Object.assign({}, xAxisTopOptions, { minJulianSecond: switchBetweenCalendars, calendar: 'gregorian' }), this.datePipe);
        const tickSize = this.data.rows.length * this.options.rowHeight;
        /** xAxis ticks on rows */
        const xAxisOnRows = Object.assign({}, options.xAxisRowOptions, { zoomer: this.options.zoomer, domainStart: this.options.zoomer.domainStart, domainEnd: this.options.zoomer.domainEnd, containerWidth: options.width, containerHeight: options.height, tickSizeInner: tickSize, tickSizeOuter: 0, marginTop: 0 });
        // Julian on rows
        this.xAxisTicks = new XAxisDefinition(Object.assign({}, xAxisOnRows, { calendar: 'julian', maxJulianSecond: switchBetweenCalendars }), this.datePipe);
        // Gregorian on rows
        this.xAxisGregTicks = new XAxisDefinition(Object.assign({}, xAxisOnRows, { calendar: 'gregorian', minJulianSecond: switchBetweenCalendars }), this.datePipe);
    }
    getZoomInExtent() {
        this.options.zoomer.zoomIn();
        return {
            firstSecond: this.options.zoomer.domainStart,
            lastSecond: this.options.zoomer.domainEnd
        };
        // const cursor = this.xAxis.scale(this.options.cursorPosition);
        // const rangeStart = this.xAxis.scale(this.options.domainStart)
        // const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        // const minMax = rangeEnd - rangeStart;
        // const rangeDiff = minMax / this.options.zoomFactor;
        // return {
        //   firstSecond: this.xAxis.scale.invert(cursor - rangeDiff),
        //   lastSecond: this.xAxis.scale.invert(cursor + rangeDiff)
        // }
    }
    getZoomOutExtent() {
        this.options.zoomer.zoomOut();
        return {
            firstSecond: this.options.zoomer.domainStart,
            lastSecond: this.options.zoomer.domainEnd
        };
        // const cursor = this.xAxis.scale(this.options.cursorPosition);
        // const rangeStart = this.xAxis.scale(this.options.domainStart)
        // const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        // const minMax = rangeEnd - rangeStart;
        // const rangeDiff = minMax / this.options.zoomFactor;
        // return {
        //   firstSecond: this.xAxis.scale.invert(cursor - (minMax / 2) - rangeDiff),
        //   lastSecond: this.xAxis.scale.invert(cursor + (minMax / 2) + rangeDiff)
        // }
    }
    getZoomToExtent(e) {
        this.options.zoomer.zoomTo(e.firstSecond, e.lastSecond);
        return {
            firstSecond: this.options.zoomer.domainStart,
            lastSecond: this.options.zoomer.domainEnd
        };
        // const cursor = this.xAxis.scale(this.options.cursorPosition);
        // const rangeStart = this.xAxis.scale(this.options.domainStart)
        // const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        // const minMax = rangeEnd - rangeStart;
        // const rangeDiff = minMax / this.options.zoomFactor;
        // return {
        //   firstSecond: this.xAxis.scale.invert(cursor - (minMax / 2) - rangeDiff),
        //   lastSecond: this.xAxis.scale.invert(cursor + (minMax / 2) + rangeDiff)
        // }
    }
    /**
     * Moves the timeline for a given number of pixels.
     *
     * @param rangeDiff pixels to move
     */
    move(rangeDiff) {
        const rangeStart = this.xAxis.scale(this.options.zoomer.domainStart);
        const rangeEnd = this.xAxis.scale(this.options.zoomer.domainEnd);
        const s = this.xAxis.scale.invert(rangeStart + rangeDiff);
        const e = this.xAxis.scale.invert(rangeEnd + rangeDiff);
        //
        // end is julian second of day 3500-01-01
        if ((rangeDiff < 0 && s > 0) || (rangeDiff > 0 && e < 2999409 * 86400)) {
            this.options.zoomer.domainStart = s;
            this.options.zoomer.domainEnd = e;
            this.init(this.options);
        }
    }
    changeCursorPosition(julianSecond) {
        return this.xAxis.scale.invert(julianSecond);
    }
}
Timeline.DEFAULT_COLOR = '#17a2b8';
//# sourceMappingURL=timeline.js.map