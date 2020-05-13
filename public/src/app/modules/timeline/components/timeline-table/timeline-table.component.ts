import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild, ElementRef } from '@angular/core';
import { CoreTable } from 'app/shared/components/core-table/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap, filter, auditTime } from 'rxjs/operators';
import { TimeLineData, TimeLineRow, Timeline, TimelineOptions, TemporalExtent, RangeChangeEvent } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';
import { Zoomer } from '../../models/zoomer';

interface TimeLineTableRow extends TimeLineRow {
  index: number
}


@Component({
  selector: 'gv-timeline-table',
  templateUrl: './timeline-table.component.html',
  styleUrls: ['./timeline-table.component.scss']
})
export class TimelineTableComponent extends CoreTable<TimeLineTableRow> implements OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() timelineData$: Observable<TimeLineData>;
  data: TimeLineData;
  @Output() rangeChange = new EventEmitter<{ start: number, end: number }>();
  @Output() cursorChange = new EventEmitter<number>();

  temporalExtent: TemporalExtent

  headerTop$: Observable<number>;
  sticky: boolean;

  columns = ['label', 'time']

  timeline: Timeline;
  options: TimelineOptions = {
    width: undefined,
    bodyMaxHeight: 180,
    headerHeight: 41,
    domainStartDefault: 1721426 * 60 * 60 * 24,
    domainEndDefault: 2454000 * 60 * 60 * 24,
    zoomFactor: 3,
    rowHeight: 36,
    rowPaddingBottom: 5,
    rowPaddingTop: 5,
    barHeight: 28,
    bracketStrokeWidth: 2,
    bracketWidth: 4,
    minTimeSpanWidth: 10,
    xAxisTopOptions: {
      marginTop: 30,
      marginLeft: 0,
      marginRight: 0,
      containerHeight: 20,
    },
    xAxisRowOptions: {
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      containerHeight: 36,
    },
    zoomer: new Zoomer(1721426 * 60 * 60 * 24, 2454000 * 60 * 60 * 24)
  };
  cursorChangeByDrag$ = new Subject<number>();

  constructor(
    private d3Service: D3Service,
    private ref: ChangeDetectorRef,
  ) {
    super();

    // Limits the frame rate when user drags the cursor
    this.cursorChangeByDrag$.pipe(auditTime(40), takeUntil(this.destroy$)).subscribe(pos => {
      const newPos = this.timeline.changeCursorPosition(pos);

      if (this.timeline.options.cursorPosition !== newPos) {
        this.drawAndEmitCursorPosition(newPos)
      }
    })
  }

  onInit() {
    this.set([]);

    let dataRefreshs = 0;
    this.timelineData$.pipe(
      tap(() => dataRefreshs++),
      filter(data => !!data && !!data.rows),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.data = data;
      // this.initTimeline()

      // TODO delete this line and uncomment the next, once the index is not needed anymore
      this.dataSource.allData = data.rows.map((r, index) => ({ ...r, index }));
      // this.dataSource.allData = data.rows;

      if (data.rows && data.rows.length === 0) {
        this.viewport.scrollTo({ top: 0, left: 0 })
      }
    })


    this.headerTop$ = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );

    // fake infinite scroll
    this.viewport.renderedRangeStream.subscribe(({ start, end }) => {
      this.rangeChange.emit({ start, end })
    });
  }

  afterViewInit() {
    this.sticky = true;
    this.ref.detectChanges()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /** D3 timeline related stuff */

  initTimeline() {

    const e = this.temporalExtent = Timeline.getExtent(this.data.rows, this.options);

    // make sure there is domainStart and domainEnd to initialize the timeline
    if ((!this.options.domainStart || !this.options.domainEnd) && this.data.rows) {

      this.options.domainStart = e.firstSecond;
      this.options.domainEnd = e.lastSecond;

      if (!this.options.cursorPosition) {
        this.setCursorPosition(e.firstSecond + ((e.lastSecond - e.firstSecond) / 2))
        this.emitCursorPosition(this.options.cursorPosition);
      }

      // this.drawAndEmitExtent(e.firstSecond, e.lastSecond);

    }

    /** Receiving an initialized timeline from our custom d3 service */
    this.timeline = this.d3Service.getTimeline(this.data, this.options);
    // this.timeline.initCursorPosition()

  }


  onDragStart() {
  }

  onDrag(rangeDiff) {
    this.timeline.move(rangeDiff);
  }

  onDragEnd() {
    // this.emitExtent(this.timeline.options.domainStart, this.timeline.options.domainEnd);
  }

  onDimensionsChange(event) {
    const newWidth = event.dimensions.width // - 24;
    if (this.options.width === undefined) {
      this.options.width = newWidth;
      this.initTimeline();
    }
    else if (this.options.width !== newWidth) {
      this.options.width = newWidth;
      if (this.timeline) this.timeline.init(this.options)
      this.ref.detectChanges()
    }
  }

  onZoomIn() {
    const e = this.timeline.getZoomInExtent()
    this.drawExtent(e.firstSecond, e.lastSecond);
  }

  onZoomOut() {
    const e = this.timeline.getZoomOutExtent()
    this.drawExtent(e.firstSecond, e.lastSecond);
  }

  onZoomToExtent() {
    let e = this.temporalExtent
    e = this.timeline.getZoomToExtent(e)
    this.drawExtent(e.firstSecond, e.lastSecond);
  }

  onChangeCursorPosition(event: RangeChangeEvent) {
    // if (event.type == 'mousemove') this.isDragged = true;
    // if (event.type == 'mouseup') this.isDragged = false;
    this.cursorChangeByDrag$.next(event.range)
  }


  /**
* check if init is neded
*/
  private drawExtent(domainStart, domainEnd) {
    if ((domainStart && domainEnd)) {
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
      // this.initTimeline();
    }
  }

  private emitCursorPosition(d: number) {
    this.cursorChange.emit(d)
  }
  private drawAndEmitCursorPosition(p: number) {
    this.drawCursorPosition(p)
    this.emitCursorPosition(p)
  }


}
