import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { EntityPreview } from 'app/core';
import { ChartLineDefinition } from 'app/modules/timeline/components/chart-line-visual/chart-line-visual.component';
import { CursorInfo } from 'app/modules/timeline/components/timeline-chart/timeline-chart.component';
import { EntityPreviewsPaginatedDialogService } from 'app/shared/components/entity-previews-paginated/service/entity-previews-paginated-dialog.service';
import * as d3 from 'd3';
import { apply, values, keys, equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { ChartLine, ChartLineData, CzmlDoubleValue, CzmlPacket, CzmlPoint, CzmlRgbaValue, CzmlSpatialValue, MapAndTimeContOutput, TimeChartContOutput, TimeCzmlValue } from '../../../../../../../server/src/lb3/common/interfaces';
import { MapLayer, MapLayers } from '../map-czml-layers/map-czml-layers.component';

export interface MapAndTimeContLayer {
  data_lookups: { [key: string]: number[] }[]
  map: MapLayer
  time: TimeChartContOutput
}
export interface MapAndTimeContData {
  layers: MapAndTimeContLayer[]
}

interface CzmlPath {
  layerIndex: number,
  czmlIndex: number,
  czmlPacket: CzmlPacket
}

interface LinePath {
  layerIndex: number,
  lineIndex: number
}

// let next;
// let lastKeyword = 'StartLogTime'
// const startLogTime = () => {
//   next = new Date().getTime();
//   console.log(`logTime:: next time: ${next}`);
// }
// const logTime = (keyWord: string) => {
//   const t = new Date().getTime();
//   const lastKeywordCache = lastKeyword;
//   console.log(`logTime:: ${t - next} ms ellapsed for: '${keyWord}' since '${lastKeywordCache}'`);
//   lastKeyword = keyWord;
//   next = t
// }


interface InfoBox {
  cursorInfo?: CursorInfo
  geoEntity?: EntityPreview
}
// interface for display settings of the point display
// (extensible for adding e.g. the min and max radius sizes)
export interface PointDisplayMode {
  fixedSize?: {}
  proportionalStaticSize?: {}
  proportionalDynamicSize?: {}
}
interface PointDisplayOption { label: string, svgIcon: string, value: PointDisplayMode }
export const pointDisplayOptions: PointDisplayOption[] = [
  {
    label: 'Proportional (static over time)', svgIcon: 'google-circles',
    value: { proportionalStaticSize: {} }
  },
  {
    label: 'Proportional (time-dynamic)', svgIcon: 'google-circles-group',
    value: { proportionalDynamicSize: {} }
  },
  {
    label: 'Fixed size for all points', svgIcon: 'gamepad-circle-outline',
    value: { fixedSize: {} }
  },
]

@Component({
  selector: 'gv-map-and-time-cont',
  templateUrl: './map-and-time-cont.component.html',
  styleUrls: ['./map-and-time-cont.component.scss']
})
export class MapAndTimeContComponent implements OnInit {

  @Input() data$: Observable<MapAndTimeContOutput>
  @Input() pointDisplayMode$: BehaviorSubject<PointDisplayMode>
  @Input() showInfoBtn = true;
  @Input() showInfoBox = false;

  @HostBinding('class.fullscreen')
  @Input() fullscreen = false;
  @Input() showFullscreenBtn = true;
  @Input() showFullscreenExitBtn = false;

  processedData$: Observable<MapAndTimeContData>;
  chartLines$: Observable<Observable<ChartLineData>[]>
  mapData$: Observable<MapLayers>
  julianSecondOfCursor$ = new ReplaySubject();
  selectedGeoEntityPk$ = new ReplaySubject<number>();

  pkEntityCzmlsMap = new Map<number, CzmlPath[]>()
  pkEntityLineMap = new Map<number, LinePath>()
  pkEntityEntityPreviewMap = new Map<number, EntityPreview>()
  linePkEntityMap = new Map<string, number>()

  selectedPackets$ = new BehaviorSubject<CzmlPath[]>([])
  selectedLine$ = new BehaviorSubject<LinePath>(undefined)
  // array of pk_entity of the entities that are grouped by / belong to a geographical place
  entitiesOfSelectedGeoPlace$: Observable<number[]>

  infoBox: InfoBox = {}

  pointDisplayOptions = pointDisplayOptions;
  pointDisplayOption$: Observable<PointDisplayOption>

  defaultTimelineHeight = 300
  timelineHeight = this.defaultTimelineHeight;

  i = 0
  constructor(
    private pagEntDialog: EntityPreviewsPaginatedDialogService) {
    // startLogTime()
  }

  ngOnInit() {
    if (!this.data$) throw new Error('You must provide a data$ input')
    if (!this.pointDisplayMode$) this.pointDisplayMode$ = new BehaviorSubject(pointDisplayOptions[0].value);

    this.pointDisplayOption$ = this.pointDisplayMode$.pipe(
      map(mode => this.pointDisplayOptions.find(o => equals(keys(o.value), keys(mode))))
    )

    this.entitiesOfSelectedGeoPlace$ = combineLatest(this.data$, this.selectedLine$).pipe(
      map(([data, selectedLine]) => {
        if (!selectedLine || typeof selectedLine.lineIndex !== 'number' || !data.length || !data[selectedLine.lineIndex]) return []
        return data[selectedLine.lineIndex].pk_entities
      })
    )
    this.processedData$ = combineLatest(this.data$, this.pointDisplayMode$).pipe(
      map(([data, pointDisplayMode]) => this.mapAndTimeContQueryResToOutput(data, pointDisplayMode)),
      shareReplay({ refCount: true, bufferSize: 1 })
    )

    let previousSelectedLine: LinePath;
    this.chartLines$ = this.processedData$.pipe(
      map((processedData) => {
        // logTime('chartLines$ - start')

        return processedData.layers.map((layer, layerIndex) => {
          // logTime(`chartLines$ ${layerIndex} - start`)

          return this.selectedLine$.pipe(map(selectedLine => {
            // logTime(`chartLines$ selectedLine$ ${layerIndex} - start`)

            if (previousSelectedLine && previousSelectedLine.layerIndex == layerIndex) {
              layer.time.activeLine = undefined;
            }
            if (selectedLine && selectedLine.layerIndex == layerIndex) {
              layer.time.activeLine = selectedLine.lineIndex;
              previousSelectedLine = selectedLine;
            }
            // logTime(`chartLines$ selectedLine$ ${layerIndex} - end`)
            return layer.time
          }))
        })
      })
    )

    let previousSelectedPackets = []
    this.mapData$ = combineLatest(this.processedData$, this.selectedPackets$).pipe(
      map(([processedData, selectedPackets]) => {
        // logTime('mapData$ - start')

        // Manage the styling of the unselectedPackets
        previousSelectedPackets.forEach(czmlPath => {
          const packetToUnselect = processedData.layers[czmlPath.layerIndex].map.czml[czmlPath.czmlIndex];
          this.styleAsUnselected(packetToUnselect)
        })
        // Manage the styling of selected packets
        selectedPackets.forEach(czmlPath => {
          const packetToSelect = processedData.layers[czmlPath.layerIndex].map.czml[czmlPath.czmlIndex];
          this.styleAsSelected(packetToSelect)
        })
        previousSelectedPackets = selectedPackets

        // logTime('mapData$ - end')
        return processedData.layers.map(l => l.map)
      }
      ),
      map(layers => ({ layers }))
    )
  }


  /**
   * Changes the appearance of the geometry in the given czmlPacket
   * to look selected
   */
  styleAsSelected(packet: CzmlPacket) {
    packet.point.color.rgba = [0, 0, 255, 255];
  }

  /**
   * Changes the appearance of the geometry in the given czmlPacket
   * to look selected
   */
  styleAsUnselected(packet: CzmlPacket) {
    packet.point.color.rgba = [255, 255, 255, 128];
  }

  /**
   * Function iterates over given temporal values and produces
   * the time-tagged czml values
   */
  convertTempValsToCzml = (
    temporalVals: TimeCzmlValue[],
    scaleRadius: d3.ScaleLinear<number, number>,
    colorActive = [255, 255, 255, 128],
    colorPassive = [255, 255, 255, 128],
    outlineWidthActive = 3,
    outlineWidthPassive = 0,
    outlineColorActive = [255, 0, 0, 128],
    outlineColorPassive = [180, 180, 180, 128],
  ): {
    temporalColor: CzmlRgbaValue,
    temporalOutlineColor: CzmlRgbaValue,
    temporalOutlineWidth: CzmlDoubleValue,
    temporalPixelSize: CzmlDoubleValue
  } => {

    const temporalColor: CzmlRgbaValue = [];
    const temporalOutlineColor: CzmlRgbaValue = [];
    const temporalOutlineWidth: any[] = [];
    const temporalPixelSize: any[] = [];

    for (let i = 0; i < temporalVals.length; i++) {
      const t = temporalVals[i];

      temporalColor.push(t.iso_x)
      temporalColor.push(...(t.y === 0 ? colorPassive : colorActive))

      temporalOutlineColor.push(t.iso_x)
      temporalOutlineColor.push(...(t.y === 0 ? outlineColorPassive : outlineColorActive))

      temporalOutlineWidth.push(t.iso_x)
      temporalOutlineWidth.push((t.y === 0 ? outlineWidthPassive : outlineWidthActive))

      temporalPixelSize.push(t.iso_x)
      temporalPixelSize.push(t.y === 0 ? 0 : scaleRadius(t.y))
    }

    return {
      temporalColor,
      temporalOutlineColor,
      temporalOutlineWidth,
      temporalPixelSize,
    };
  }

  private createDynamicPoint = (
    outlineColorRgba: number[],
    temporalVals: TimeCzmlValue[],
    scaleRadius: d3.ScaleLinear<number, number>,
  ): CzmlPoint => {

    const convertedTempVals = this.convertTempValsToCzml(
      temporalVals,
      scaleRadius,
      undefined,
      undefined,
      3,
      0,
      outlineColorRgba,
      undefined
    )

    return {
      color: {
        rgba: [255, 255, 255, 128],
        forwardExtrapolationType: 'HOLD',
        backwardExtrapolationType: 'HOLD'
      },
      outlineColor: {
        backwardExtrapolationType: 'HOLD',
        forwardExtrapolationType: 'HOLD',
        rgba: convertedTempVals.temporalOutlineColor
      },
      outlineWidth: {
        backwardExtrapolationType: 'HOLD',
        forwardExtrapolationType: 'HOLD',
        number: convertedTempVals.temporalOutlineWidth
      },
      pixelSize: {
        backwardExtrapolationType: 'HOLD',
        forwardExtrapolationType: 'HOLD',
        number: convertedTempVals.temporalPixelSize
      }
    }
  }
  private createFixedPoint = (
    outlineColorRgba: number[],
  ): CzmlPoint => {
    return {
      color: { rgba: [255, 255, 255, 128] },
      outlineColor: { rgba: outlineColorRgba },
      outlineWidth: 3,
      pixelSize: 10
    }
  }
  private createStaticPoint = (
    value: number,
    scaleRadius: d3.ScaleLinear<number, number>,
    outlineColorActive = [255, 0, 0, 128],
    outlineColorPassive = [180, 180, 180, 128],
  ): CzmlPoint => {
    return {
      color: { rgba: [255, 255, 255, 128] },
      outlineColor: { rgba: value === 0 ? outlineColorPassive : outlineColorActive },
      outlineWidth: 3,
      pixelSize: scaleRadius(value)
    }
  }
  private createCzmlPacket = (
    id: string,
    point: CzmlPoint,
    spatialVal: CzmlSpatialValue,
    properties: { [key: string]: any }
  ): CzmlPacket => {
    return {
      id,
      point,
      properties,
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
        cartographicDegrees: [spatialVal.long, spatialVal.lat, 0]
      },
    }
  }


  /**
   * Converts a MapAndTimeContQueryRes to a MapAndTimeContData
   * TODO
   */
  mapAndTimeContQueryResToOutput(queryRes: MapAndTimeContOutput, pointDisplayMode: PointDisplayMode): MapAndTimeContData {

    // logTime('conversion - start')

    console.log('mapAndTimeContQueryResToOutput', ++this.i)


    this.pkEntityCzmlsMap.clear()

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
      let max = 0
      if (pointDisplayMode.proportionalDynamicSize) {
        max = apply(Math.max, values(item.temporal_data.data_lookup).map(x => x.length))
      } else if (pointDisplayMode.proportionalStaticSize) {
        max = item.pk_entities.length
      }
      if (max > maxVal) maxVal = max;

    })
    const minRadius = 10;
    const maxRadius = 50;

    // logTime('conversion - minMaxOk')


    const scalePoint = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([minRadius, maxRadius]);
    const outlineColorActive = [255, 0, 0, 128];
    const outlineColorPassive = [180, 180, 180, 128];

    queryRes.forEach((item, lineIndex) => {
      const temporalVals = item.temporal_data.timeCzmlValues
      // logTime(`conversion - item ${lineIndex} start, having ${temporalVals.length} temporalVals`)


      const point: CzmlPoint = pointDisplayMode.fixedSize ?
        // else create fixed point
        this.createFixedPoint(outlineColorActive) :
        pointDisplayMode.proportionalStaticSize ?
          // else create static point
          this.createStaticPoint(item.pk_entities.length, scalePoint, outlineColorActive, outlineColorPassive) :
          pointDisplayMode.proportionalDynamicSize ?
            // if temporal filter enabled create dynamic point
            this.createDynamicPoint(outlineColorActive, temporalVals, scalePoint) :
            // default
            this.createFixedPoint(outlineColorActive);


      // logTime(`conversion - item ${lineIndex} pointCreated`)

      item.geo_positions.forEach((position) => {
        const czmlPacket = this.createCzmlPacket(
          '_' + id++,
          point,
          position,
          { geoEntityPk: item.geo_entity_pk }
        );

        czml.push(czmlPacket);
        // make an index of pkEntity -> Czmls
        const existingCzmls = this.pkEntityCzmlsMap.get(item.geo_entity_pk) || [];
        this.pkEntityCzmlsMap.set(item.geo_entity_pk, [...existingCzmls, {
          layerIndex: 0,
          czmlIndex: (czml.length - 1),
          czmlPacket
        }])

      })

      // logTime(`conversion - item ${lineIndex} geo_positions added`)

      const chartLine: ChartLine = {
        label: item.geo_entity_preview.entity_label,
        linePoints: item.temporal_data.timeLinePoints,
        pkEntities: item.pk_entities
      }
      chartLines.push(chartLine)

      const linePath: LinePath = {
        layerIndex: 0,
        lineIndex: chartLines.length - 1
      }
      // make an index of pkEntity -> LineIndex
      this.pkEntityLineMap.set(item.geo_entity_pk, linePath)
      // make an index of LineIndex --> pkEntity
      this.linePkEntityMap.set(this.linePathToString(linePath), item.geo_entity_pk)

      data_lookups.push(item.temporal_data.data_lookup)

      // logTime(`conversion - item ${lineIndex} end`)
      this.pkEntityEntityPreviewMap.set(item.geo_entity_pk, item.geo_entity_preview)

    })

    // logTime('mapAndTimeContQueryResToOutput - created all points and lines')


    const map: MapLayer = { czml }
    const time: TimeChartContOutput = {
      activeLine: undefined,
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

  linePathToString(linePath: LinePath): string {
    return linePath.layerIndex + '_' + linePath.lineIndex
  }

  selectGeoEntity(pkEntity?: number) {
    this.selectGeometriesOfEntity(pkEntity);
    this.selectLineOfEntity(pkEntity)
    this.infoBox.geoEntity = this.pkEntityEntityPreviewMap.get(pkEntity)
    if (pkEntity) {
      this.showInfoBox = true
      this.showInfoBtn = false
    } else {
      this.showInfoBox = false
      this.showInfoBtn = true
    }
  }
  selectGeometriesOfEntity(pkEntity?: number) {
    this.selectedPackets$.next(this.pkEntityCzmlsMap.get(pkEntity) || [])
  }
  selectLineOfEntity(pkEntity?: number) {
    this.selectedLine$.next(this.pkEntityLineMap.get(pkEntity))
  }

  /**
   * Called when user clicked a geometry on map
   * @param $event the object returned by https://cesium.com/docs/cesiumjs-ref-doc/Scene.html?classFilter=Scene#pick
   */
  onMapObjectClicked($event) {
    let pkEntity;
    if (
      $event &&
      $event.id &&
      $event.id.properties &&
      $event.id.properties._geoEntityPk &&
      $event.id.properties._geoEntityPk._value
    ) {
      pkEntity = $event.id.properties._geoEntityPk._value
    }
    this.selectGeoEntity(pkEntity);
  }

  /**
   * Called when user activates a line on timeline
   * @param layerIndex index of the layer
   * @param chartLineDef chart line definition, containing index of activated line
   */
  onChartLineDefChange(layerIndex: number, chartLineDef: ChartLineDefinition) {
    const linePath: LinePath = {
      layerIndex,
      lineIndex: chartLineDef.config.data.activeLine
    }
    const pkEntity = this.linePkEntityMap.get(this.linePathToString(linePath))
    this.selectGeoEntity(pkEntity);
  }

  /**
   * Called when user changes cursor or the activated line or linepoint changed
   */
  onCursorChange(cursorInfo: CursorInfo) {
    this.julianSecondOfCursor$.next(cursorInfo.julianSecond);
    this.infoBox.cursorInfo = cursorInfo;
  }

  onShowPointDetailsClick() {
    this.openEntitiesDialogForDate()
  }

  onShowLineDetailsClick() {
    this.openEntitiesDialogForDate()
  }

  openEntitiesDialogForDate() {
    this.processedData$
      .pipe(first())
      .subscribe((processedData) => {
        const dataLookup = processedData.layers[this.selectedLine$.value.layerIndex]
          .data_lookups[this.selectedLine$.value.lineIndex];
        const pkEntities = this.infoBox.cursorInfo.linePoint ? dataLookup[this.infoBox.cursorInfo.linePoint.data_ref] : []
        this.pagEntDialog.open(true, pkEntities, `${pkEntities.length} Entities available at ${this.infoBox.cursorInfo.cursorDateLabel}`)
      })
  }
  openAllEntitiesDialog() {
    this.entitiesOfSelectedGeoPlace$.pipe(first()).subscribe(pkEntities => {
      this.pagEntDialog.open(true, pkEntities, `${pkEntities.length} Entities`)
    })
  }
}
