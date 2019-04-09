import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, TimeSpan, U, WarEntityPreview } from 'app/core';
import { AcMapComponent, AcNotification, ActionType } from 'app/modules/gv-angular-cesium/angular-cesium-fork';
import { CzmlPacketGenerator } from 'app/shared/classes/czml-packet-generator';
import { CzmlPacket } from 'app/shared/classes/czml-types';
import { getTemporalDistribution, TemporalDistribution } from 'app/shared/classes/statistic-helpers';
import { values } from 'ramda';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryLayer } from '../map-visual/map-visual.component';

export interface GeoEntity extends WarEntityPreview {
  presences: {
    time_span: TimeSpan,
    was_at: {
      lat: number,
      long: number
    }
  }[],
}

export interface QueryPoint {
  id;
  color: string;
  presences: {
    time_span: TimeSpan,
    was_at: {
      lat: number,
      long: number
    }
  }[],
  label: string,
  labels?: {
    time_span: TimeSpan,
    label: string
  }[],
  entities: WarEntityPreview[],
  temporalDistribution?: TemporalDistribution
}

@Component({
  selector: 'gv-map-query-layer',
  templateUrl: './map-query-layer.component.html',
  styleUrls: ['./map-query-layer.component.scss']
})
export class MapQueryLayerComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() acMap: AcMapComponent;

  data$ = new BehaviorSubject<QueryLayer>(null);

  @Input()
  set data(value) {
    this.data$.next(value);
  };

  get data() {
    return this.data$.getValue();
  }

  czmlPackets$ = new BehaviorSubject<AcNotification>(U.acNotificationFromPacket({
    id: 'document',
    version: '1.0'
  }, ActionType.ADD_UPDATE))

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {
    this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => { this.update(d) })
  }
  ngAfterViewInit() {


  }

  // updates all featues (czml) of this layer
  update(d: QueryLayer) {
    // remove old packets

    // group by geo entity
    const points = this.groupByGeoEntity(d);

    // add temporal Distribution
    let minVal = Number.POSITIVE_INFINITY;
    let maxVal = Number.NEGATIVE_INFINITY;
    points.forEach(p => {
      const dist = getTemporalDistribution(p.entities);
      p.temporalDistribution = dist.temporalDistribution;
      if (dist.minVal < minVal) minVal = dist.minVal
      if (dist.maxVal > maxVal) maxVal = dist.maxVal
    });


    // add all points
    points.forEach(p => {
      const packet = new CzmlPacketGenerator(p.id).fromQueryPoint(p, minVal, maxVal)
      this.addPacked(packet)
    })

    // if (this.acMap) this.acMap.getCesiumSerivce().getViewer() as C

  }

  /**
   * group by geo entity
   * @param d
   */
  groupByGeoEntity(d: QueryLayer): QueryPoint[] {

    if (!d || !d.data || !d.settings) return [];

    let geoList: { [key: number]: QueryPoint } = {};
    const geoCol = d.settings.geoCol;
    const entityPreviewCol = d.settings.entityPreviewCol;

    d.data.forEach((row) => {
      const geoEntities: GeoEntity[] = row[geoCol];

      geoEntities.forEach(geoEntity => {
        if (geoEntity) {
          const entityPreview = row[entityPreviewCol];
          geoList = {
            ...geoList,
            [geoEntity.pk_entity]: {
              id: geoEntity.pk_entity,
              color: d.settings.color,
              entities: [...(geoList[geoEntity.pk_entity] || { entities: [] }).entities, entityPreview],
              label: geoEntity.entity_label,
              presences: geoEntity.presences,
            }
          }
        }
      })
    })

    const points = values(geoList);

    return points;
  }

  
  removePacket() {

  }

  addPacked(p: CzmlPacket) {

    this.czmlPackets$.next(U.acNotificationFromPacket(p, ActionType.ADD_UPDATE))
  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

}
