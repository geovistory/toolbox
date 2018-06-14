import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';

import { Timeline, TimeLineData } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';

export interface TimelineOptions {
  width: number,
  headerHeight: number, // height of header (where the labels of xAxis are displayed)
  bodyMaxHeight: number, // max height of scrollable body (where the existence times are displayed)
  domainStart: number, // julian day in seconds
  domainEnd: number,
  zoomFactor: number, // increase for smaller zoom steps
  rowHeight: number,
  rowPaddingBottom: number,
  rowPaddingTop: number,
  barHeight: number, // height of bars including the strockes of the brackets
  bracketStrokeWidth: number, // stroke width of left or right brackets of existence time visuals
  bracketWidth: number,
  height?: number, // total height (sum of headerHeight and bodyHeight)
  bodyHeight?: number, // height of scrollable body (barHeight * data.rows.length or bodyMaxHeight)
  timeColWidth?: number // width of the column with the timeline 
}

@Component({
  selector: 'gv-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges, AfterViewInit {

  @Input() data: TimeLineData;

  @HostBinding('style.width') outerWidth: string = '100%';


  _options: TimelineOptions = {
    width: 200,
    bodyMaxHeight: 180,
    headerHeight: 27,
    domainStart: 1721426 * 60 * 60 * 24,
    domainEnd: 2454000 * 60 * 60 * 24,
    zoomFactor: 3,
    rowHeight: 22,
    rowPaddingBottom: 5,
    rowPaddingTop: 5,
    barHeight: 14,
    bracketStrokeWidth: 2,
    bracketWidth: 4
  };


  get options() {
    const rowsHeight = this._options.rowHeight * this.data.rows.length + 7;
    this._options.bodyHeight = this._options.bodyMaxHeight < rowsHeight ? this._options.bodyMaxHeight : rowsHeight;
    this._options.height = this._options.headerHeight + this._options.bodyHeight;

    return this._options;
  }

  constructor(private d3Service: D3Service, private _element: ElementRef, private ref: ChangeDetectorRef) {

  }

  timeline: Timeline;

  ngOnChanges() {
    this.data = this.data ? this.data : { rows: [] };

    /** Receiving an initialized timeline from our custom d3 service */
    this.timeline = this.d3Service.getTimeline(this.data, this.options);

  }

  onDimensionsChange(event) {
    const newWidth = event.dimensions.width - 17;
    if (this.options.width !== newWidth) {
      this._options.width = newWidth;
      this.timeline.init(this.options)
      this.ref.detectChanges()
    }
  }

  ngAfterViewInit() {

  }

  onDrag(rangeDiff) {

    this.timeline.move(rangeDiff);

  }


  zoomIn() {

    this.timeline.zoomIn()

  }

  zoomOut() {

    this.timeline.zoomOut()

  }

  zoomToExtent() {

    this.timeline.zoomToExtent()

  }


  onScroll(event) {
    console.log(event)
  }


}
