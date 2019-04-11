import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActiveProjectService, TimeSpan, U, WarEntityPreview } from 'app/core';
import { AcMapComponent, AcNotification, ActionType } from 'app/modules/gv-angular-cesium/angular-cesium-fork';
import { CzmlPacketGenerator } from 'app/shared/classes/czml-packet-generator';
import { CzmlPacket } from 'app/shared/classes/czml-types';
import { getTemporalDistribution, TemporalDistribution } from 'app/shared/classes/statistic-helpers';
import { values } from 'ramda';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryLayer } from '../map-visual/map-visual.component';
import { AcCzmlDescComponent } from '../../../gv-angular-cesium/angular-cesium-fork/src/angular-cesium/components/ac-czml-desc/ac-czml-desc.component';

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

  // these are the entity_previews given by the default entity_preview column
  entities: WarEntityPreview[],

  // these are the aggregated temporal entites gien by the temporal column
  temporalEntities?: WarEntityPreview[],

  // if temporal distribution is added, the point sizw can be made time dynamic
  temporalDistribution?: TemporalDistribution,
}

@Component({
  selector: 'gv-map-query-layer',
  templateUrl: './map-query-layer.component.html',
  styleUrls: ['./map-query-layer.component.scss']
})
export class MapQueryLayerComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() acMap: AcMapComponent;
  @ViewChild(AcCzmlDescComponent) acCzml: AcCzmlDescComponent;

  data$ = new BehaviorSubject<QueryLayer>(null);

  @Input()
  set data(value) {
    this.data$.next(value);
  };

  get data() {
    return this.data$.getValue();
  }

  czmlPackets$ = new Subject<AcNotification>()

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.czmlPackets$.next(U.acNotificationFromPacket({
      id: 'document',
      version: '1.0'
    }, ActionType.ADD_UPDATE))

    this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => { this.update(d) })
  }

  // updates all featues (czml) of this layer
  update(d: QueryLayer) {
    // remove old packets
    if (!d || !d.settings || !d.settings.geoCol) this.removeAllPackets();
    else this.createAndUpdatePackets(d);

  }

  private removeAllPackets() {
    this.acCzml.removeAll()
  }

  private createAndUpdatePackets(d: QueryLayer) {
    // group by geo entity
    const points = this.groupByGeoEntity(d);

    let minVal = Number.POSITIVE_INFINITY;
    let maxVal = Number.NEGATIVE_INFINITY;

    if (d.settings && d.settings.temporalCol) {
      // add temporal Distribution and evaluate min and max value
      points.forEach(p => {
        const dist = getTemporalDistribution(p.temporalEntities);
        p.temporalDistribution = dist.temporalDistribution;
        if (dist.minVal < minVal) minVal = dist.minVal;
        if (dist.maxVal > maxVal) maxVal = dist.maxVal;
      });
    } else {
      // evaluate min and max value
      points.forEach(p => {
        if (p.entities.length < minVal) minVal = p.entities.length;
        if (p.entities.length > maxVal) maxVal = p.entities.length;
      });
    }

    // add all points
    points.forEach(p => {
      const packet = new CzmlPacketGenerator(p.id).fromQueryPoint(p, minVal, maxVal);
      this.addPacked(packet);
    });
  }

  /**
   * group by geo entity
   * @param d
   */
  groupByGeoEntity(d: QueryLayer): QueryPoint[] {

    if (!d || !d.data || !d.settings) return [];

    let geoList: { [key: number]: QueryPoint } = {};
    const geoCol = d.settings.geoCol;
    const temporalCol = d.settings.temporalCol;
    const entityPreviewCol = d.settings.entityPreviewCol;

    d.data.forEach((row) => {
      const geoEntities: GeoEntity[] = row[geoCol];

      geoEntities.forEach(geoEntity => {
        if (geoEntity) {

          // aggregate all the entity_previews  
          const entityPreview = row[entityPreviewCol];

          // aggregate all the temporal entities
          let temporalEntities: WarEntityPreview[];
          if (temporalCol) temporalEntities = row[temporalCol];

          geoList = {
            ...geoList,
            [geoEntity.pk_entity]: {
              id: geoEntity.pk_entity,
              color: d.settings.color,

              // addding the items of entity_preview col (here we 1...1 one per row)
              entities: [...(geoList[geoEntity.pk_entity] || { entities: [] }).entities, entityPreview],

              label: geoEntity.entity_label,

              presences: geoEntity.presences,

              // adding the items of temporal col (here we have 0...n per row)
              temporalEntities: [...(geoList[geoEntity.pk_entity] || { temporalEntities: [] }).temporalEntities, ...temporalEntities],

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
