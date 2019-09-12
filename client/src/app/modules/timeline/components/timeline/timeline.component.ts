import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { takeUntil, throttle, audit } from 'rxjs/operators';
import { interval, Subject } from '../../../../../../node_modules/rxjs';
import { IAppState } from '../../../../core';
import { RangeChangeEvent, Timeline, TimeLineData, TimeLineRow } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';

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
}

@Component({
  selector: 'gv-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],

})
export class TimelineComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: TimeLineData;

  @Input() cursorPosition: number;
  @Input() domainStart: number;
  @Input() domainEnd: number;

  @Output() rowMouseEnter = new EventEmitter<TimeLineRow>();
  @Output() rowMouseLeave = new EventEmitter<TimeLineRow>();
  @Output() rowClick = new EventEmitter<TimeLineRow>();
  @Output() domainChange = new EventEmitter<{ domainStart: number, domainEnd: number }>();

  @Output() cursorChange = new EventEmitter<number>();
  @Output() extendChange = new EventEmitter<{ firstJulianSecond: number, lastJulianSecond: number }>();

  @HostBinding('style.width') outerWidth = '100%';

  @ViewChild('header', { static: true }) h;

  timeline: Timeline;

  _options: TimelineOptions = {
    width: 200,
    bodyMaxHeight: 180,
    headerHeight: 27,
    domainStartDefault: 1721426 * 60 * 60 * 24,
    domainEndDefault: 2454000 * 60 * 60 * 24,
    zoomFactor: 3,
    rowHeight: 22,
    rowPaddingBottom: 5,
    rowPaddingTop: 5,
    barHeight: 14,
    bracketStrokeWidth: 2,
    bracketWidth: 4,
    minTimeSpanWidth: 10
  };

  private isDragged = false; // true during dragging

  destroy$ = new Subject<boolean>();

  cursorChangeByDrag$ = new Subject<number>();

  get options() {
    const rowsHeight = this._options.rowHeight * this.data.rows.length + 7;
    this._options.bodyHeight = this._options.bodyMaxHeight < rowsHeight ? this._options.bodyMaxHeight : rowsHeight;
    this._options.height = this._options.headerHeight + this._options.bodyHeight;

    return this._options;
  }

  constructor(
    private d3Service: D3Service,
    private ngRedux: NgRedux<IAppState>,
    private ref: ChangeDetectorRef
  ) {

    // Limits the frame rate when user drags the cursor
    this.cursorChangeByDrag$.pipe(audit(() => interval(40)), takeUntil(this.destroy$)).subscribe(pos => {
      const newPos = this.timeline.changeCursorPosition(pos);

      if (this.timeline.options.cursorPosition !== newPos) {
        this.drawAndEmitCursorPosition(newPos)
      }
    })

  }

  ngOnInit() {

  }

  ngOnChanges(simpleChanges) {
    if (simpleChanges['data']) {
      this.data = this.data ? this.data : { rows: [] };
      this.initTimeline()
    }

    if (simpleChanges['cursorPosition']) {
      this.drawCursorPosition(this.cursorPosition);
    }

    if (simpleChanges['domainStart'] || simpleChanges['domainEnd']) {
      this.drawExtent(this.domainStart, this.domainEnd);
    }

  }



  initTimeline() {


    // make sure there is domainStart and domainEnd to initialize the timeline
    if (
      (!this.options.domainStart || !this.options.domainEnd) &&
      this.data.rows.length > 0
    ) {

      const e = Timeline.getExtent(this.data.rows, this.options);

      if (!this.options.cursorPosition) {
        this.setCursorPosition(e.firstSecond + ((e.lastSecond - e.firstSecond) / 2))
        this.emitCursorPosition(this.options.cursorPosition);
      }

      this.drawAndEmitExtent(e.firstSecond, e.lastSecond);

    } else {

      /** Receiving an initialized timeline from our custom d3 service */
      this.timeline = this.d3Service.getTimeline(this.data, this.options);
      // this.timeline.initCursorPosition()

    }



  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }

  onDimensionsChange(event) {
    const newWidth = event.dimensions.width - 17;
    if (this.options.width !== newWidth) {
      this._options.width = newWidth;
      if (this.timeline) this.timeline.init(this.options)
      this.ref.detectChanges()
    }
  }

  onDragStart() {
    this.isDragged = true;
  }

  onDrag(rangeDiff) {
    this.timeline.move(rangeDiff);
  }

  onDragEnd() {
    this.isDragged = false;
    this.emitExtent(this.timeline.options.domainStart, this.timeline.options.domainEnd);
  }

  changeCursorPosition(event: RangeChangeEvent) {
    if (event.type == 'mousemove') this.isDragged = true;
    if (event.type == 'mouseup') this.isDragged = false;

    this.cursorChangeByDrag$.next(event.range)
  }




  zoomIn() {
    const e = this.timeline.getZoomInExtent()
    this.drawExtent(e.firstSecond, e.lastSecond);
  }

  zoomOut() {
    const e = this.timeline.getZoomOutExtent()
    this.drawExtent(e.firstSecond, e.lastSecond);
  }

  zoomToExtent() {
    const e = Timeline.getExtent(this.data.rows, this.options);
    this.drawExtent(e.firstSecond, e.lastSecond);
  }


  onScroll(event) {
    console.log(event)
  }

  onRowMouseEnter(row: TimeLineRow) {
    if (!this.isDragged) this.rowMouseEnter.emit(row)
  }
  onRowMouseLeave(row: TimeLineRow) {
    if (!this.isDragged) this.rowMouseLeave.emit(row)
  }
  onRowClick(row: TimeLineRow) {
    this.rowClick.emit(row)
  }



  private emitCursorPosition(d: number) {
    this.cursorChange.emit(d)
  }

  private emitExtent(firstJulianSecond: number, lastJulianSecond: number) {
    this.extendChange.emit({ firstJulianSecond, lastJulianSecond })
  }

  /**
 * check if init is neded
 */
  private drawExtent(domainStart, domainEnd) {
    if ((domainStart && domainEnd) &&
      (this.options.domainStart !== domainStart || this.options.domainEnd !== domainEnd)) {
      this.options.domainStart = domainStart;
      this.options.domainEnd = domainEnd;
      this.initTimeline();
    }
  }
  /**
   * retruns true, if position was different from previous val
   * @param position 
   */
  private setCursorPosition(position): boolean {
    if (position && this.options.cursorPosition !== position) {
      this.options.cursorPosition = position;
      return true;
    }
    return false;
  }
  private drawCursorPosition(position) {
    if (this.setCursorPosition(position)) {
      this.initTimeline();
    }
  }

  private drawAndEmitCursorPosition(p: number) {
    this.drawCursorPosition(p)
    this.emitCursorPosition(p)
  }

  private drawAndEmitExtent(firstJulianSecond: number, lastJulianSecond: number) {
    this.drawExtent(firstJulianSecond, lastJulianSecond)
    this.emitExtent(firstJulianSecond, lastJulianSecond)
  }

}
