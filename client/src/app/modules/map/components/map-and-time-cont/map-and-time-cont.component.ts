import { Component, Input, OnInit } from '@angular/core';
import { CursorChangeEvent } from 'app/modules/timeline/components/timeline-chart/timeline-chart.component';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartLineData, MapAndTimeContOutput } from '../../../../../../../src/common/interfaces';
import { MapLayers } from '../map-czml-layers/map-czml-layers.sandbox';



@Component({
  selector: 'gv-map-and-time-cont',
  templateUrl: './map-and-time-cont.component.html',
  styleUrls: ['./map-and-time-cont.component.scss']
})
export class MapAndTimeContComponent implements OnInit {

  @Input() data$: Observable<MapAndTimeContOutput>
  chartLines$: Observable<Observable<ChartLineData>[]>
  mapData$: Observable<MapLayers>
  julianSecondOfCursor$ = new ReplaySubject();

  constructor() { }

  ngOnInit() {
    if (!this.data$) throw new Error('You must provide a data$ input')

    this.chartLines$ = this.data$.pipe(
      map(d => d.layers.map(l => of(l.time)))
    )

    this.mapData$ = this.data$.pipe(
      map(d => d.layers.map(l => l.map)),
      map(layers => ({ layers }))
    )
  }

  onCursorChange(event: CursorChangeEvent) {
    this.julianSecondOfCursor$.next(event.julianSecond);
  }
}


