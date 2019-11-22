import { Component, Input, OnInit } from '@angular/core';
import { CursorChangeEvent } from 'app/modules/timeline/components/timeline-chart/timeline-chart.component';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartLineData, MapAndTimeContOutput, TimeChartContOutput, CzmlPacket, TimeCzmlValue, CzmlDoubleValue, CzmlSpatialValue, ChartLine } from '../../../../../../../src/common/interfaces';
import { MapLayers } from '../map-czml-layers/map-czml-layers.sandbox';
import { values, apply } from 'ramda';
import * as d3 from 'd3';

export interface MapAndTimeContLayer {
  data_lookups: { [key: string]: number[] }[]
  map: MapLayer
  time: TimeChartContOutput
}
export interface MapAndTimeContData {
  layers: MapAndTimeContLayer[]
}
export interface MapLayer {
  czml: CzmlPacket[],
}



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

    const processedData$ = this.data$.pipe(
      map(data => this.mapAndTimeContQueryResToOutput(data))
    )

    this.chartLines$ = processedData$.pipe(
      map(d => d.layers.map(l => of(l.time)))
    )

    this.mapData$ = processedData$.pipe(
      map(d => d.layers.map(l => l.map)),
      map(layers => ({ layers }))
    )
  }

  onCursorChange(event: CursorChangeEvent) {
    this.julianSecondOfCursor$.next(event.julianSecond);
  }



  private tempValsToCesiumDouble = (
    temporalVals: TimeCzmlValue[],
    scaleRadius: d3.ScaleLinear<number, number>
  ): CzmlDoubleValue[] => {
    const v: any[] = [];
    temporalVals.forEach(t => {
      v.push(t.iso_x)
      v.push(scaleRadius(t.y))
    })
    return v
  }

  private createPoint = (
    id: string,
    pointColorRgba: number[],
    spatialVal: CzmlSpatialValue,
    temporalVals: TimeCzmlValue[],
    scaleRadius: d3.ScaleLinear<number, number>): CzmlPacket => {

    return {
      id,
      point: {
        color: {
          rgba: [255, 255, 255, 128],
          forwardExtrapolationType: 'HOLD',
          backwardExtrapolationType: 'HOLD'
        },
        outlineColor: {
          rgba: pointColorRgba
        },
        outlineWidth: 3,
        pixelSize: {
          backwardExtrapolationType: 'HOLD',
          forwardExtrapolationType: 'HOLD',
          number: this.tempValsToCesiumDouble(temporalVals, scaleRadius)
        }
      },
      // label: {
      //   horizontalOrigin: { horizontalOrigin: 'LEFT' },
      //   fillColor: {
      //     rgba: [20, 20, 20, 255]
      //   },
      //   outlineColor: {
      //     rgba: [255, 255, 255, 230]
      //   },
      //   outlineWidth: 2,
      //   pixelOffset: {
      //     cartesian2: [12, -16]
      //   },
      //   scaleByDistance: {
      //     nearFarScalar: [150, 1, 15000000, 0.5]
      //   },
      //   text: 'A'
      // },
      position: {
        cartographicDegrees: [
          spatialVal.long, spatialVal.lat, 0
        ]
      },
      availability: '1260-03-07T23:59:59Z/1885-10-14T00:00:00Z'
    }
  }



  /**
   * Converts a MapAndTimeContQueryRes to a MapAndTimeContData
   * TODO
   */
  mapAndTimeContQueryResToOutput(queryRes: MapAndTimeContOutput): MapAndTimeContData {

    if (!queryRes || !queryRes.length) return { layers: [] }

    const czml: CzmlPacket[] = [{
      'id': 'document',
      'name': 'CZML Point - Time Dynamic',
      'version': '1.0'
    }];
    const chartLines: ChartLine[] = []
    const data_lookups: { [key: string]: number[] }[] = []
    let id = 1;

    const minVal = 0;
    let maxVal = 0;
    queryRes.forEach(item => {
      const max = apply(Math.max, values(item.temporal_data.data_lookup).map(x => x.length))
      if (max > maxVal) maxVal = max;
    })
    const minRadius = 5;
    const maxRadius = 50;

    const scalePoint = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([minRadius, maxRadius]);

    queryRes.forEach(item => {
      item.geo_positions.forEach(position => {
        const color = [255, 0, 0, 128]
        const temporalVals = item.temporal_data.timeCzmlValues
        const c = this.createPoint(('_' + id++), color, position, temporalVals, scalePoint)
        czml.push(c);
      })
      const chartLine: ChartLine = {
        label: item.geo_entity_preview.entity_label,
        linePoints: item.temporal_data.timeLinePoints
      }
      chartLines.push(chartLine)
      data_lookups.push(item.temporal_data.data_lookup)
    })

    const map: MapLayer = { czml }
    const time: TimeChartContOutput = {
      activeLine: 0,
      chartLines
    }
    const out: MapAndTimeContData = {
      layers: [
        {
          map,
          time,
          data_lookups
        }
      ]
    }
    return out;
  }

}


