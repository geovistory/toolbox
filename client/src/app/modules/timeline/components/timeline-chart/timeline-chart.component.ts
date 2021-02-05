import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { JulianDateTime } from "app/core/date-time";
import { GregorianDateTime } from "app/core/date-time";
import { DimensionChangeEvent } from 'app/shared/directives/dimension-change/dimension-change.directive';
import { merge, Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { IXAxisDefinition, XAxisDefinition } from '../../models/x-axis-definition';
import { YAxisDefinition } from '../../models/y-axis-definition';
import { Zoomer } from '../../models/zoomer';
import { ChartLineDefinition } from '../chart-line-visual/chart-line-visual.component';
import { ChartLine } from 'app/core/sdk-lb4/model/chartLine';
import { ChartLinePoint } from 'app/core/sdk-lb4/model/chartLinePoint';
import { AnalysisTimeChartResponse } from 'app/core/sdk-lb4';
export class CursorInfo {
  readonly switchBetweenCalendars = 2299161 * 24 * 60 * 60;

  domainX: number
  chartLine: ChartLineDefinition;
  linePoint: ChartLinePoint;
  activeLine: ChartLine;
  scaleX: d3.ScaleLinear<number, number>
  get rangePx() {
    return this.scaleX(this.domainX)
  }

  get julianDay() {
    return Math.round((this.domainX / 86400))
  }
  get julianSecond() {
    return Math.round(this.domainX)
  }
  get cursorDateLabel() {
    return this.getDateLabel(this.domainX)
  }
  constructor(private datePipe: DatePipe) { }

  /**
   * Converts julian second to human readable date label
   * @param julianSecond
   */
  getDateLabel(julianSecond: number): string {
    let dt;
    if (julianSecond < this.switchBetweenCalendars) {
      dt = new JulianDateTime().fromJulianSecond(julianSecond)
    } else {
      dt = new GregorianDateTime().fromJulianSecond(julianSecond)
    }
    return this.datePipe.transform(dt.getDate(), 'MMM d, y GG')
  }
}

@Component({
  selector: 'gv-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  switchBetweenCalendars = 2299161 * 24 * 60 * 60;

  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  data: AnalysisTimeChartResponse;

  zoomer = new Zoomer(0, 200)

  width: number;
  height: number;
  marginTop = 30;
  xAxisHeight = 20;

  xAxisJulian: XAxisDefinition
  xAxisGreg: XAxisDefinition
  yAxis: YAxisDefinition
  chartLine: ChartLineDefinition

  showCursor: boolean;

  // Observables that change the chart
  @Input() data$: Observable<AnalysisTimeChartResponse>;
  @Input() showCursor$: Observable<boolean>;
  @Input() showInfoBtn = false;
  @Input() showInfoBox = true;
  @Output() cursorChange = new EventEmitter<CursorInfo>();
  @Output() chartLineDefChange = new EventEmitter<ChartLineDefinition>()
  @Output() showDetailsClick = new EventEmitter<CursorInfo>()
  @Output() showAllItemsClick = new EventEmitter<number[]>()


  dimension$ = new Subject<DimensionChangeEvent>();
  beforeRedraw$ = new Subject<void>();

  /**
   * important object holding all information about the cursor
   * for display
   */
  cursorInfo = new CursorInfo(this.datePipe)

  constructor(
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    if (!this.showCursor$) this.showCursor$ = new BehaviorSubject(true);

    combineLatest(
      this.dimension$,
      this.showCursor$
    ).pipe(first(), takeUntil(this.destroy$)).subscribe(([
      d,
      showCursor
    ]) => {
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
            if (this.xMin > chartLinePoint.x) this.xMin = chartLinePoint.x;
            if (this.xMax < chartLinePoint.x) this.xMax = chartLinePoint.x;
            if (this.yMin > chartLinePoint.y) this.yMin = chartLinePoint.y;
            if (this.yMax < chartLinePoint.y) this.yMax = chartLinePoint.y;
          }
        }

        if (this.cursorInfo.domainX === undefined) this.cursorInfo.domainX = this.xMin;


        this.zoomer.setExtent(this.xMin, this.xMax)

        if (isFirst) {
          isFirst = false;
          this.zoomer.zoomToExtent()
        }

        this.redraw()
      })


      this.dimension$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
        this.width = event.dimensions.width;
        this.height = event.dimensions.height
        this.zoomer.rangeStart = 30;
        this.zoomer.rangeEnd = this.width - 30;

        this.redraw()
      })
      this.showCursor$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
        this.showCursor = val;
        this.redraw()
      })
    })

  }

  onDimensionsChange(e: DimensionChangeEvent) {
    this.dimension$.next(e)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  redraw() {
    this.beforeRedraw$.next()
    this.initXAxis()
    this.initYAxis()
    this.initChartLine()
    this.cursorChange.emit(this.cursorInfo)
    this.ref.detectChanges()

  }

  initXAxis() {


    const xAxisOptions: IXAxisDefinition = {
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
    }

    // Julian fixed top
    this.xAxisJulian = new XAxisDefinition({
      ...xAxisOptions,
      maxJulianSecond: this.switchBetweenCalendars, // visible until ~1582
      calendar: 'julian',
    }, this.datePipe)

    // Gregorian fiyed top
    this.xAxisGreg = new XAxisDefinition({
      ...xAxisOptions,
      minJulianSecond: this.switchBetweenCalendars, // visible from ~1582
      calendar: 'gregorian',
    }, this.datePipe)

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
        this.cursorInfo.activeLine = cursorValues.activeLine
        this.cursorChange.emit(this.cursorInfo)
      }
    })

    this.chartLine.change$
      .pipe(takeUntil(merge(this.beforeRedraw$, this.destroy$)))
      .subscribe((v) => {
        this.chartLineDefChange.next(v)
        this.redraw()
      })
    this.chartLine.activeLineClicked$
      .pipe(takeUntil(merge(this.beforeRedraw$, this.destroy$)))
      .subscribe((data) => {
        alert(JSON.stringify(data.clickedLinePoint))
      })
  }

  onDrag(rangeDiff) {
    const rangeStart = this.xAxisJulian.scale(this.zoomer.domainStart)
    const rangeEnd = this.xAxisJulian.scale(this.zoomer.domainEnd)
    const s = this.xAxisJulian.scale.invert(rangeStart + rangeDiff);
    const e = this.xAxisJulian.scale.invert(rangeEnd + rangeDiff);

    // end is julian second of day 3500-01-01
    if ((rangeDiff < 0 && s > 0) || (rangeDiff > 0 && e < 2999409 * 86400)) {
      this.zoomer.domainStart = s;
      this.zoomer.domainEnd = e;

      // set bounds to cursor
      if (this.cursorInfo.domainX < s) this.cursorInfo.domainX = s;
      else if (this.cursorInfo.domainX > e) this.cursorInfo.domainX = e;

      this.redraw()
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
    if (
      this.chartLine &&
      this.chartLine.config &&
      this.chartLine.config.data &&
      typeof this.chartLine.config.data.activeLine === 'number'
    ) {
      return true
    }
    return false
  }

  onShowDetailsClick() {
    this.showDetailsClick.emit(this.cursorInfo)
  }
  onAllItemsClick(pkEntities: number[]) {
    this.showAllItemsClick.emit(pkEntities)
  }
}


