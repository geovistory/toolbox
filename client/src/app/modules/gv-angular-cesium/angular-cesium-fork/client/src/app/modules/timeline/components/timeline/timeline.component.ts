import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Timeline, TimeLineData, TimeLineRow, TimeLineSettings, RangeChangeEvent } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';
import { IAppState } from '../../../../core';
import { NgRedux, WithSubStore, select } from '@angular-redux/store';
import { TimeLineApiActions } from './api/timeline.actions';
import { timeLineApiReducer } from './api/timeline.reducer';
import { Observable, Subject, combineLatest } from '../../../../../../node_modules/rxjs';

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
  height?: number, // total height (sum of headerHeight and bodyHeight)
  bodyHeight?: number, // height of scrollable body (barHeight * data.rows.length or bodyMaxHeight)
  timeColWidth?: number; // width of the column with the timeline
  cursorPosition?: number; // julian day in seconds
}

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: timeLineApiReducer
})
@Component({
  selector: 'gv-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent extends TimeLineApiActions implements OnInit, OnChanges, OnDestroy {
  @Input() path: string[];
  @Input() data: TimeLineData;

  @select() cursorPosition$: Observable<number>;
  @select() domainStart$: Observable<number>;
  @select() domainEnd$: Observable<number>;

  @Output() rowMouseEnter = new EventEmitter<TimeLineRow>();
  @Output() rowMouseLeave = new EventEmitter<TimeLineRow>();
  @Output() rowClick = new EventEmitter<TimeLineRow>();
  @Output() domainChange = new EventEmitter<{ domainStart: number, domainEnd: number }>();

  @HostBinding('style.width') outerWidth = '100%';

  @ViewChild('header') h;

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
    bracketWidth: 4
  };

  private isDragged = false; // true during dragging

  destroy$ = new Subject<boolean>();

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
    super()
  }

  getBasePath = () => this.path;

  ngOnInit() {
    // Subscribe to cursorPosition changes
    this.cursorPosition$.takeUntil(this.destroy$).subscribe(pos => {
      if (pos && this.options.cursorPosition !== pos) {
        this.options.cursorPosition = pos;
        this.initTimeline()
      }
    })

    // Subscribe to extent changes
    combineLatest(this.domainStart$, this.domainEnd$).takeUntil(this.destroy$).subscribe(res => {
      if (
        (res[0] && res[1]) &&
        (this.options.domainStart !== res[0] || this.options.domainEnd !== res[1])
      ) {
        this.options.domainStart = res[0];
        this.options.domainEnd = res[1];
        this.initTimeline()
      }
    })

  }

  ngOnChanges() {
    this.data = this.data ? this.data : { rows: [] };
    this.initTimeline()
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
      }

      this.setExtent(e.firstSecond, e.lastSecond);

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
      this.timeline.init(this.options)
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
    this.setExtent(this.timeline.options.domainStart, this.timeline.options.domainEnd);
  }

  changeCursorPosition(event: RangeChangeEvent) {
    if (event.type == 'mousemove') this.isDragged = true;
    if (event.type == 'mouseup') this.isDragged = false;

    const newPos = this.timeline.changeCursorPosition(event.range);

    if (this.timeline.options.cursorPosition !== newPos) {
      this.setCursorPosition(newPos)
    }
  }


  zoomIn() {
    const e = this.timeline.getZoomInExtent()
    this.setExtent(e.firstSecond, e.lastSecond);
  }

  zoomOut() {
    const e = this.timeline.getZoomOutExtent()
    this.setExtent(e.firstSecond, e.lastSecond);
  }

  zoomToExtent() {
    const e = Timeline.getExtent(this.data.rows, this.options);
    this.setExtent(e.firstSecond, e.lastSecond);
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

}
