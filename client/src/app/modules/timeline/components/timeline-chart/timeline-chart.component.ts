import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GregorianDateTime, JulianDateTime } from 'app/core';
import { DimensionChangeEvent } from 'app/shared/directives/dimension-change/dimension-change.directive';
import { merge, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ChartLineData } from '../../../../../../../src/common/interfaces';
import { IXAxisDefinition, XAxisDefinition } from '../../models/x-axis-definition';
import { YAxisDefinition } from '../../models/y-axis-definition';
import { Zoomer } from '../../models/zoomer';
import { ChartLineDefinition, ChartLineXAxisValueLabel } from '../chart-line-visual/chart-line-visual.component';

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
  data: ChartLineData;

  zoomer = new Zoomer(0, 200)

  width: number;
  height: number;
  xAxisJulian: XAxisDefinition
  xAxisGreg: XAxisDefinition
  yAxis: YAxisDefinition
  chartLine: ChartLineDefinition


  // Observables that change the chart
  @Input() data$: Observable<ChartLineData>;
  dimension$ = new Subject<DimensionChangeEvent>();
  beforeRedraw$ = new Subject<void>();
  constructor(
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    this.dimension$.pipe(first(), takeUntil(this.destroy$)).subscribe((e) => {
      this.width = e.dimensions.width;
      this.height = e.dimensions.height;
      this.zoomer.rangeStart = 30;
      this.zoomer.rangeEnd = this.width - 30;

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


        this.zoomer.setExtent(this.xMin, this.xMax)

        this.zoomer.zoomToExtent()

        this.redraw()
      })


      this.dimension$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
        this.width = event.dimensions.width;
        this.height = event.dimensions.height
        this.zoomer.rangeStart = 30;
        this.zoomer.rangeEnd = this.width - 30;

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
    this.ref.detectChanges()

  }

  initXAxis() {


    const xAxisOptions: IXAxisDefinition = {
      marginTop: this.height - 30,
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
  }

  initYAxis() {
    this.yAxis = new YAxisDefinition({
      domainStart: this.yMin,
      domainEnd: this.yMax,
      height: this.height,
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 30,
      tickSizeInner: 5,
      tickSizeOuter: 0,
      tickPadding: 6
    });
  }
  initChartLine() {
    const getLabel: ChartLineXAxisValueLabel = (x: number) => {
      let dt;
      if (x < this.switchBetweenCalendars) {
        dt = new JulianDateTime().fromJulianSecond(x)
      } else {
        dt = new GregorianDateTime().fromJulianSecond(x)
      }
      return this.datePipe.transform(dt.getDate(), 'MMM d, y GG')
    }
    this.chartLine = new ChartLineDefinition({
      data: this.data,
      scaleX: this.xAxisJulian.scale,
      scaleY: this.yAxis.scale,
      marginLeft: 31,
      marginTop: 15,
      width: this.width - 31,
      height: this.height - 30,
      labelFn: getLabel
    })

    this.chartLine.change$
      .pipe(takeUntil(merge(this.beforeRedraw$, this.destroy$)))
      .subscribe((v) => {
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
    //
    // end is julian second of day 3500-01-01
    if ((rangeDiff < 0 && s > 0) || (rangeDiff > 0 && e < 2999409 * 86400)) {
      this.zoomer.domainStart = s;
      this.zoomer.domainEnd = e;
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
}
