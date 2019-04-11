import { EventEmitter } from '@angular/core';
import { TimeSpan } from 'app/core';

import { TimelineOptions } from '../components/timeline/timeline.component';
import { XAxisDefinition } from './x-axis-definition';
import { DatePipe } from '@angular/common';

export type Accentuation = 'highlighted' | 'selected' | 'none';

export interface RangeChangeEvent {
    type: 'mousedown' | 'mousemove' | 'mouseup',
    range: number
}

export interface TimeLineSettings {
    domainStart?: number, // julian seconds
    domainEnd?: number, // julian seconds
    cursorPosition?: number; // julian day in seconds
}

export interface TimeLineData {
    rows: TimeLineRow[]
}

export interface TimeLineRow {    
    label: string;
    existenceTime: TimeSpan;
    accentuation: Accentuation;
    storeConnector?: {
        path: string[];
    }
    color?: string; // CSS color string
}

/**
 * This class generates all data that are needed to create a visual
 * representation of a timeline.
 */
export class Timeline {

    static DEFAULT_COLOR = '#17a2b8'

    public ticker: EventEmitter<any> = new EventEmitter();

    /** xAxis fixed top */
    public xAxis: XAxisDefinition;
    public xAxisGreg: XAxisDefinition;

    /** xAxis ticks on rows */
    public xAxisTicks: XAxisDefinition;
    public xAxisGregTicks: XAxisDefinition;


    public options: TimelineOptions;

    static getExtent(rows, options): { firstSecond: number, lastSecond: number } {
        const timePrimitives = []

        rows.forEach((row: TimeLineRow) => {
            const ext: TimeSpan = row.existenceTime;
            const minMaxOfExTime = ext.getMinMaxTimePrimitive();

            if (minMaxOfExTime) {
                timePrimitives.push(minMaxOfExTime.min);
                timePrimitives.push(minMaxOfExTime.max);
            }
        })

        if (timePrimitives.length > 0) {
            const minMax = TimeSpan.getMinMaxTimePrimitveOfArray(timePrimitives);
            const firstSec = minMax.min.getJulianSecond();
            const lastSec = minMax.max.getLastSecond();

            const domainDiff = Math.abs(firstSec - lastSec);
            const margin = domainDiff * 0.9;

            const firstSecond = firstSec - margin;
            const lastSecond = lastSec + margin;

            return { firstSecond, lastSecond }
        } else {
            const firstSecond = options.domainStartDefault;
            const lastSecond = options.domainEndDefault;

            return { firstSecond, lastSecond };
        }
    }



    /**
     * Construct the TimeLineChart by passing in data (timePrimitives) and options
     * @param timePrimitives the timePrimitives that will be displayed on the timeline
     * @param options options about the outline of the chart
     */
    constructor(public data: TimeLineData, options: TimelineOptions, private datePipe: DatePipe) {

        this.options = options;

        this.init(this.options);

    }


    init(options: TimelineOptions) {

        this.options = options;

        const switchBetweenCalendars = 2299161 * 24 * 60 * 60;

        /** xAxis fixed top */

        const xAxisTopOptions = {
            domainStart: options.domainStart,
            domainEnd: options.domainEnd,
            containerWidth: options.width,
            containerHeight: options.height,
            tickSizeInner: 0,
            tickSizeOuter: 0
        }

        // Julian fixed top
        this.xAxis = new XAxisDefinition({
            ...xAxisTopOptions,
            maxJulianSecond: switchBetweenCalendars, // visible until ~1582
            calendar: 'julian',
        }, this.datePipe)

        // Gregorian fiyed top
        this.xAxisGreg = new XAxisDefinition({
            ...xAxisTopOptions,
            minJulianSecond: switchBetweenCalendars, // visible from ~1582
            calendar: 'gregorian',
        }, this.datePipe)



        const tickSize = this.data.rows.length * this.options.rowHeight;

        /** xAxis ticks on rows */
        const xAxisOnRows = {
            domainStart: options.domainStart,
            domainEnd: options.domainEnd,
            containerWidth: options.width,
            containerHeight: options.height,
            tickSizeInner: tickSize,
            tickSizeOuter: 0,
            marginTop: 0
        }

        // Julian on rows
        this.xAxisTicks = new XAxisDefinition({
            ...xAxisOnRows,
            calendar: 'julian',
            maxJulianSecond: switchBetweenCalendars, // visible until introduction of gregorian calendar in 1582
        }, this.datePipe)

        // Gregorian on rows
        this.xAxisGregTicks = new XAxisDefinition({
            ...xAxisOnRows,
            calendar: 'gregorian',
            minJulianSecond: switchBetweenCalendars, // visible from introduction of gregorian calendae in 1582
        }, this.datePipe)


    }


    getZoomInExtent(): { firstSecond: number, lastSecond: number } {

        const cursor = this.xAxis.scale(this.options.cursorPosition);
        const rangeStart = this.xAxis.scale(this.options.domainStart)
        const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        const minMax = rangeEnd - rangeStart;
        const rangeDiff = minMax / this.options.zoomFactor;

        return {
            firstSecond: this.xAxis.scale.invert(cursor - rangeDiff),
            lastSecond: this.xAxis.scale.invert(cursor + rangeDiff)
        }
    }

    getZoomOutExtent(): { firstSecond: number, lastSecond: number } {

        const cursor = this.xAxis.scale(this.options.cursorPosition);
        const rangeStart = this.xAxis.scale(this.options.domainStart)
        const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        const minMax = rangeEnd - rangeStart;
        const rangeDiff = minMax / this.options.zoomFactor;

        return {
            firstSecond: this.xAxis.scale.invert(cursor - (minMax / 2) - rangeDiff),
            lastSecond: this.xAxis.scale.invert(cursor + (minMax / 2) + rangeDiff)
        }
    }

    /**
     * Moves the timeline for a given number of pixels.
     *
     * @param rangeDiff pixels to move
     */
    move(rangeDiff) {
        const rangeStart = this.xAxis.scale(this.options.domainStart)
        const rangeEnd = this.xAxis.scale(this.options.domainEnd)
        this.options.domainStart = this.xAxis.scale.invert(rangeStart + rangeDiff);
        this.options.domainEnd = this.xAxis.scale.invert(rangeEnd + rangeDiff);
        this.init(this.options)
    }

    changeCursorPosition(julianSecond: number): number {
        return this.xAxis.scale.invert(julianSecond);
    }



}
