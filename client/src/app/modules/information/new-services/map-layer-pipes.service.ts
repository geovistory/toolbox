import { Injectable } from '@angular/core';
import { ActiveProjectService, InfPersistentItem, InfPlace, InfTemporalEntity, TimeSpan, EntityPreview, WarEntityPreview } from 'app/core';
import { switchMapOr } from 'app/core/util/switchMapOr';
import { flatten, values } from 'ramda';
import { combineLatest, Observable, pipe } from '../../../../../node_modules/rxjs';
import { map, switchMap, tap, filter } from '../../../../../node_modules/rxjs/operators';
import { DfhConfig } from '../shared/dfh-config';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { getTemporalDistribution, TemporalDistribution } from 'app/shared/classes/statistic-helpers';
import { CzmlPacketGenerator } from 'app/shared/classes/czml-packet-generator';
import { InformationPipesService } from './information-pipes.service';
import { cache, spyTag } from '../../../shared';

export interface GeoPresence {
  time_span: TimeSpan,
  was_at: {
    lat: number,
    long: number
  }
}

export interface GeoEntity extends EntityPreview {
  presences: GeoPresence[],
}

export interface QueryPoint {
  id;
  color: string;
  presences: GeoPresence[],
  label: string,
  labels?: {
    time_span: TimeSpan,
    label: string
  }[],
  // these are the entity_previews given by the default entity_preview column
  entities: WarEntityPreview[],

  // these are the aggregated temporal entites given by the temporal column
  temporalEntities?: WarEntityPreview[],

  // if temporal distribution is added, the point size can be made time dynamic
  temporalDistribution?: TemporalDistribution,
}
export interface InputForCzml {
  teEnPk: number
  teEnTimeSpan: TimeSpan
  geoEntity: GeoEntity,
  label: string
}

@Injectable({
  providedIn: 'root'
})
export class MapLayerPipesService {

  constructor(
    private p: ActiveProjectService,
    private c: ConfigurationPipesService,
    private b: InformationBasicPipesService,
    private i: InformationPipesService
  ) { }




  pipeItem(pkEntity) {
    return this.b.pipeRelatedTemporalEntities(pkEntity).pipe(
      switchMapOr([], (teEns) => combineLatest(
        teEns.map(teEn => this.b.pipeTimeSpan(teEn.pk_entity).pipe(
          map(timeSpan => ({
            timeSpan, teEn
          }))
        ))
      )),
      switchMapOr([], (items) => {

        const presences = items.filter(i => i.teEn.fk_class == DfhConfig.CLASS_PK_PRESENCE)
        const others = items.filter(i => i.teEn.fk_class != DfhConfig.CLASS_PK_PRESENCE)

        const presences$ = presences.map(item => this.pipeInfPlaceOfPresence(item.teEn.pk_entity)
          .pipe(
            map(place => {
              const i: InputForCzml = {
                teEnPk: item.teEn.pk_entity,
                teEnTimeSpan: item.timeSpan,
                geoEntity: {
                  presences: [{
                    time_span: item.timeSpan,
                    was_at: {
                      lat: place.lat,
                      long: place.long
                    }
                  }],
                  entity_label: 'Place',
                  class_label: 'GeoPlace',
                  entity_type: 'peIt',
                  fk_class: 2,
                  fk_project: undefined,
                  fk_type: undefined,
                  time_span: undefined,
                  type_label: undefined,
                  pk_entity: pkEntity,
                },
                label: 'Georeference'
              }
              return [i];
            })
          )
        )

        const others$ = others.map(item => this.pipeRelatedGeoEntity(item.teEn.pk_entity)
          .pipe(
            map(peIts => peIts.filter(peIt => peIt.pk_entity !== pkEntity)),
            switchMapOr([], (peIts) => combineLatest(
              peIts.map(peIt => combineLatest(
                this.p.streamEntityPreview(peIt.pk_entity),
                this.pipePresences(peIt.pk_entity).pipe(
                  switchMapOr([], geoPresences => combineLatest(
                    geoPresences.map((geoPresence) => combineLatest(
                      this.pipeInfPlaceOfPresence(geoPresence.pk_entity).pipe(filter(x => !!x)),
                      this.b.pipeTimeSpan(geoPresence.pk_entity)
                    ).pipe(
                      map(([place, time_span]) => ({
                        time_span, was_at: {
                          lat: place.lat,
                          long: place.long
                        }
                      } as GeoPresence))
                    ))
                  ))
                )
              ).pipe(
                map(([entityPreview, presences]) => {

                  const i: InputForCzml = {
                    geoEntity: {
                      ...entityPreview,
                      presences,
                    },
                    teEnPk: item.teEn.pk_entity,
                    teEnTimeSpan: item.timeSpan,
                    label: 'abc',
                  }
                  return i
                })
              )
              )
            ))
          ))

        return combineLatest(...presences$, ...others$).pipe(
          map(items => flatten(items).filter((item: InputForCzml) => !!item && !!item.geoEntity && item.geoEntity.presences.length > 0)),
        )
      }),
      this.toQueryPoints(),
      this.toCzmlPackets(false),
    )
  }



  toCzmlPackets(timeDynamic = true) {
    return pipe(
      map((points: QueryPoint[]) => {
        let minVal = Number.POSITIVE_INFINITY;
        let maxVal = Number.NEGATIVE_INFINITY;

        if (timeDynamic) {
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
        return points.map(p => {
          const packet = new CzmlPacketGenerator(p.id).fromQueryPoint(p, minVal, maxVal, 8, 15);
          return packet;
        });
      })
    )
  }

  toQueryPoints() {
    return pipe(
      map((items: InputForCzml[]) => {
        let geoList: { [key: number]: QueryPoint } = {};

        // group by geo entity
        items.forEach(item => {
          const geoEntity: GeoEntity = item.geoEntity

          if (geoEntity) {

            // aggregate all the temporal entities
            let temporalEntity = {
              time_span: item.teEnTimeSpan,
              pk_entity: item.teEnPk,
              entity_label: item.label,
            };

            geoList = {
              ...geoList,
              [geoEntity.pk_entity]: {
                id: geoEntity.pk_entity,
                color: '#aabbcc',

                label: geoEntity.entity_label,

                presences: geoEntity.presences,

                // adding the items of temporal col (here we have 0...n per row)
                entities: [...(geoList[geoEntity.pk_entity] || { entities: [] }).entities, temporalEntity],

              }
            }
          }
        })
        return values(geoList);

      })
    )
  }


  @spyTag @cache() pipeRelatedGeoEntity(pkEntity: number): Observable<InfPersistentItem[]> {
    return this.p.inf$.role$.by_fk_temporal_entity$.key(pkEntity).pipe(
      switchMapOr([], (roles) => combineLatest(
        values(roles).map(role => this.p.inf$.persistent_item$.by_pk_entity$.key(role.fk_entity).pipe(
        ))
      ).pipe(
        map(x => x.filter(i => !!i)),
      ))
    )
  }

  /**
   * pipes presences of a persistent item
   * @param pkEntity the pk_entity of the persistent item (usually a Geographical Place or Built Work)
   */
  @spyTag @cache() pipePresences(pkEntity: number): Observable<InfTemporalEntity[]> {
    // Get the properties leading to presences
    return this.c.pipeInheritedPropertyPks(147)
      .pipe(
        switchMap((props) => combineLatest(
          props.map(prop => this.b.pipeIngoingRolesByProperty(prop, pkEntity).pipe(
            switchMapOr([], (roles) => combineLatest(
              roles.map(role => this.p.inf$.temporal_entity$.by_pk_entity$.key(role.fk_temporal_entity))
            ))
          ))
        )),
        map(arrArr => flatten(arrArr).filter(x => !!x) as any as InfTemporalEntity[]),
      )
  }

  /**
   * pipes the place (geo coordinates) of a presence
   * @param pkEntity the pk_entity of the presence
   */
  @spyTag @cache() pipeInfPlaceOfPresence(pkEntity: number): Observable<InfPlace> {
    return this.b.pipeOutgoingRolesByProperty(148, pkEntity).pipe(
      switchMapOr(null, (roles) => this.p.inf$.place$.by_pk_entity$.key(roles[0].fk_entity)),
    )
  }





}
