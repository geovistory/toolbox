import { EventEmitter } from '@angular/core';
import { TimeSpan, EntityPreview } from 'app/core';

import { XAxisDefinition, IXAxisDefinition, XAxisOptions } from './x-axis-definition';
import { DatePipe } from '@angular/common';
import { Zoomer } from './zoomer';



export interface TimelineOptions {
  width: number,
  headerHeight: number, // height of header (where the labels of xAxis are displayed)
  bodyMaxHeight: number, // max height of scrollable body (where the existence times are displayed)
  domainStart?: number, // julian day in seconds
  domainEnd?: number, // julian day in seconds
  domainStartDefault: number, // julian day in seconds, used on init if no domainStart nor data to zoom to
  domainEndDefault: number, // julian day in seconds, used on init if no domainEnd nor data to zoom to
  zoomFactor: number, // increase for smaller zoom steps
  rowHeight: number,
  rowPaddingBottom: number,
  rowPaddingTop: number,
  barHeight: number, // height of bars including the strockes of the brackets
  bracketStrokeWidth: number, // stroke width of left or right brackets of existence time visuals
  bracketWidth: number,
  minTimeSpanWidth?: number, // minimal width of a time span visual (rectangle)
  height?: number, // total height (sum of headerHeight and bodyHeight)
  bodyHeight?: number, // height of scrollable body (barHeight * data.rows.length or bodyMaxHeight)
  timeColWidth?: number; // width of the column with the timeline
  cursorPosition?: number; // julian day in seconds
  xAxisTopOptions: XAxisOptions
  xAxisRowOptions: XAxisOptions
  zoomer: Zoomer
}

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
  entityPreview: EntityPreview;
  accentuation: Accentuation;
  storeConnector?: {
    path: string[];
  }
  color?: string; // CSS color string
}

export interface TemporalExtent { firstSecond: number, lastSecond: number }

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


  static getExtent(rows, options): TemporalExtent {
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
      const margin = domainDiff * 0.1;

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
    this.options.zoomer.rangeStart = 0;
    this.options.zoomer.rangeEnd = options.width;
    if (this.options.zoomer.currentLevel === undefined) {
      this.options.zoomer.setExtent(options.domainStart, options.domainEnd);
      this.options.zoomer.zoomToExtent();
    }

    const switchBetweenCalendars = 2299161 * 24 * 60 * 60;

    /** xAxis fixed top */
    const xAxisTopOptions: IXAxisDefinition = {
      ...options.xAxisTopOptions,
      zoomer: this.options.zoomer,
      domainStart: this.options.zoomer.domainStart,
      domainEnd: this.options.zoomer.domainEnd,
      containerWidth: options.width,
      tickSizeInner: 0,
      tickSizeOuter: 0,
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
      ...options.xAxisRowOptions,
      zoomer: this.options.zoomer,
      domainStart: this.options.zoomer.domainStart,
      domainEnd: this.options.zoomer.domainEnd,
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


  getZoomInExtent(): TemporalExtent {

    this.options.zoomer.zoomIn()
    return {
      firstSecond: this.options.zoomer.domainStart,
      lastSecond: this.options.zoomer.domainEnd
    }
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

  getZoomOutExtent(): TemporalExtent {
    this.options.zoomer.zoomOut()
    return {
      firstSecond: this.options.zoomer.domainStart,
      lastSecond: this.options.zoomer.domainEnd
    }
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
  getZoomToExtent(e: TemporalExtent): TemporalExtent {
    this.options.zoomer.zoomTo(e.firstSecond, e.lastSecond)
    return {
      firstSecond: this.options.zoomer.domainStart,
      lastSecond: this.options.zoomer.domainEnd
    }
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
    const rangeStart = this.xAxis.scale(this.options.zoomer.domainStart)
    const rangeEnd = this.xAxis.scale(this.options.zoomer.domainEnd)
    const s = this.xAxis.scale.invert(rangeStart + rangeDiff);
    const e = this.xAxis.scale.invert(rangeEnd + rangeDiff);
    //
    // end is julian second of day 3500-01-01
    if ((rangeDiff < 0 && s > 0) || (rangeDiff > 0 && e < 2999409 * 86400)) {
      this.options.zoomer.domainStart = s;
      this.options.zoomer.domainEnd = e;
      this.init(this.options)
    }
  }

  changeCursorPosition(julianSecond: number): number {
    return this.xAxis.scale.invert(julianSecond);
  }



}
