import { Injectable } from '@angular/core';
import { spyTag } from 'app/shared';
import { omit, values } from 'ramda';
import { NgRedux } from '../../../../../node_modules/@angular-redux/store';
import { combineLatest, merge, Observable, of, pipe } from '../../../../../node_modules/rxjs';
import { auditTime, filter, map, switchMap } from '../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, IAppState, InfRole, InfTemporalEntity, InfTimePrimitive, TimePrimitive, TimeSpan, EntityType, IconType } from '../../../core';
import { Granularity } from '../../../core/date-time/date-time-commons';
import { CalendarType } from '../../../core/date-time/time-primitive';
import { InfSelector } from '../../../core/inf/inf.service';
import { combineLatestOrEmpty } from '../../../core/util/combineLatestOrEmpty';
import { switchMapOr } from '../../../core/util/switchMapOr';
import { BasicRoleItem, ListDefinition } from '../components/properties-tree/properties-tree.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';




@Injectable({
  providedIn: 'root'
})
/**
 * This service contains a basic pipes for creating more complex
 * rxjs pipes. Each pipe takes non-observable parameters and
 * returns an observable. The method names are mainly
 * based on the type of the observable data
 */
export class InformationBasicPipesService {
  // infRepo: InfSelector;

  constructor(private p: ActiveProjectService,
    ngRedux: NgRedux<IAppState>
  ) {
    // this.infRepo = new InfSelector(ngRedux, of('repo'))
  }

  /*********************************************************************
   * Project
  *********************************************************************/

  @spyTag pipeRelatedTemporalEntities(pkEntity: number): Observable<InfTemporalEntity[]> {
    return this.p.inf$.role$
      .by_object$({ fk_entity: pkEntity })
      .pipe(
        auditTime(1),
        switchMapOr([], (roles) => combineLatest(
          roles.map(role => this.p.inf$.temporal_entity$.by_pk_entity_key$(role.fk_temporal_entity).pipe(
          ))
        ).pipe(
          map(x => x.filter((y) => !!y)),
        )),
      )
  }




  /**
 * Pipe roles of an entity
 */
  @spyTag pipeRoles(pkEntity: number, isOutgoing): Observable<InfRole[]> {
    return isOutgoing ? this.pipeOutgoingRoles(pkEntity) : this.pipeIngoingRoles(pkEntity)
  }


  /**
  * Pipe outgoing roles of an entity
  */
  @spyTag pipeOutgoingRoles(pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_subject$({ fk_temporal_entity: pkEntity })
  }


  /**
   * Pipe ingoing roles of an entity
   */
  @spyTag pipeIngoingRoles(pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_object$({ fk_entity: pkEntity })
  }


  pipeRolesOfList(listDefinition: ListDefinition, pkEntity): Observable<InfRole[]> {
    if (listDefinition.isOutgoing) {
      return this.p.inf$.role$.by_subject_and_property$({
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        fk_temporal_entity: pkEntity
      })
    } else {
      return this.p.inf$.role$.by_object_and_property$({
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        fk_entity: pkEntity
      })
    }
  }

  /**
   * Pipe outgoing roles of temporal entity
   */
  @spyTag pipeOutgoingRolesByProperty(pkProperty, pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_subject_and_property$({
      fk_property: pkProperty,
      fk_temporal_entity: pkEntity
    })

  }


  /**
   * Pipe ingoing roles of an entity
   */
  @spyTag pipeIngoingRolesByProperty(pkProperty, pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_object_and_property$({
      fk_property: pkProperty,
      fk_entity: pkEntity
    })
  }

  /**
 * Pipe outgoing roles of temporal entity
 */
  @spyTag pipeOutgoingBasicRoleItemsByProperty(pkProperty, pkEntity, pkProject: number): Observable<BasicRoleItem[]> {
    return this.p.inf$.role$.by_subject_and_property$({
      fk_property: pkProperty,
      fk_temporal_entity: pkEntity
    }).pipe(
      switchMap(roles => combineLatestOrEmpty(
        roles.map(role => this.pipeBasicRoleItem(pkProject, role, true))
      ))
    )
  }



  /**
   * Pipe ingoing roles of an entity
   */
  @spyTag pipeIngoingBasicRoleItemsByProperty(pkProperty, pkEntity, pkProject: number): Observable<BasicRoleItem[]> {
    return this.p.inf$.role$.by_object_and_property$({
      fk_property: pkProperty,
      fk_entity: pkEntity
    }).pipe(
      switchMap(roles => combineLatestOrEmpty(
        roles.map(role => this.pipeBasicRoleItem(pkProject, role, false))
      ))
    )
  }

  @spyTag private pipeBasicRoleItem(pkProject: number, role: InfRole, isOutgoing: boolean): Observable<BasicRoleItem> {
    return this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + role.pk_entity).pipe(
      filter(x => !!x),
      map(projRel => ({
        projRel, role, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing
      }))
    );
  }

  @spyTag pipeBasicRoleItemByPkRole(pkProject: number, pkRole: number, isOutgoing: boolean): Observable<BasicRoleItem> {
    return this.p.inf$.role$.by_pk_entity_key$(pkRole).pipe(
      switchMap(role => (!role) ? of(undefined) : this.pipeBasicRoleItem(pkProject, role, isOutgoing))
    )
  }


  @spyTag pipeInfTimePrimitive(pkEntity: number): Observable<InfTimePrimitive> {
    return this.p.inf$.time_primitive$.by_pk_entity$.key(pkEntity)
  }

  /**
   * pipes the TimeSpan of a temporal entity
   * @param pkEntity the pk_entity of the termporal entity
   */
  @spyTag pipeTimeSpan(pkEntity: number): Observable<TimeSpan> {
    // Get the properties leading to presences
    return combineLatest(
      this.pipeOutgoingRolesByProperty(72, pkEntity).pipe(this.timePrimitiveOfRoles()),
      this.pipeOutgoingRolesByProperty(71, pkEntity).pipe(this.timePrimitiveOfRoles()),
      this.pipeOutgoingRolesByProperty(150, pkEntity).pipe(this.timePrimitiveOfRoles()),
      this.pipeOutgoingRolesByProperty(151, pkEntity).pipe(this.timePrimitiveOfRoles()),
      this.pipeOutgoingRolesByProperty(152, pkEntity).pipe(this.timePrimitiveOfRoles()),
      this.pipeOutgoingRolesByProperty(153, pkEntity).pipe(this.timePrimitiveOfRoles()),

    ).pipe(
      map(([_72, _71, _150, _151, _152, _153]) => new TimeSpan({
        p82: _72,
        p81: _71,
        p82a: _152,
        p81a: _150,
        p81b: _151,
        p82b: _153,
      })),
    )
  }



  /**
   * Pipes max. one time primitive for an array of roles, assuming that the roles
   * are of the same properties.
   */
  timePrimitiveOfRoles = () => pipe(
    map((r: InfRole[]) => {
      if (r.length > 1) return [r[0]]
      else return r
    }),
    switchMapOr(undefined, (r) => this.pipeInfTimePrimitive(r[0].fk_entity).pipe(
      switchMapOr(undefined, (infTimePrimitive) => this.p.pkProject$.pipe(
        switchMap((pkProject) => this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$
          .key(pkProject + '_' + r[0].pk_entity).pipe(
            filter(role => !!role),
            map(ipr => {
              const x = new TimePrimitive({
                calendar: (ipr.calendar ? ipr.calendar : 'gregorian') as CalendarType,
                julianDay: infTimePrimitive.julian_day,
                duration: infTimePrimitive.duration as Granularity
              })
              return x;
            })
          ))
      ))
    )),

  )

  /**
   * Pipes the fk_class of the given entity
   */
  @spyTag pipeClassOfEntity(pkEntity: number): Observable<number> {
    return merge(
      this.p.inf$.persistent_item$.by_pk_entity_key$(pkEntity).pipe(
        filter(e => !!e),
        map(e => e.fk_class)
      ),
      this.p.inf$.temporal_entity$.by_pk_entity_key$(pkEntity).pipe(
        filter(e => !!e),
        map(e => e.fk_class)
      )
    )
  }

  /**
   * Pipes distinct fk_classes of the given persistent items
   */
  @spyTag pipeClassesOfPersistentItems(pkEntities: number[]): Observable<number[]> {
    return this.p.inf$.persistent_item$.by_pk_entity_all$().pipe(
      map((peIts) => {
        if (!pkEntities || pkEntities.length === 0) {
          return []
        }
        const classes = {};
        const a = [];
        pkEntities.forEach(typePk => {
          if (!classes[peIts[typePk].fk_class]) {
            classes[peIts[typePk].fk_class] = true;
            a.push(peIts[typePk].fk_class)
          }
        })
        return a;
      })
    )

  }


  /*********************************************************************
   * Repo
  *********************************************************************/

  /**
    * Pipe repo outgoing roles.
    */
  @spyTag pipeRepoOutgoingRoles(pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_subject$({ fk_temporal_entity: pkEntity }, false)
  }

  /**
  * Pipe repo ingoing roles.
  */
  @spyTag pipeRepoIngoingRoles(pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_object$({ fk_entity: pkEntity }, false)
  }

  /**
    * Pipe repo outgoing roles.
    * If max quantity is limited, takes only max allowed number of roles, starting with highest is_in_project_count
    */
  @spyTag pipeRepoOutgoingRolesByProperty(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.p.dfh$.property$.by_pk_property$.key(pkProperty)
        .pipe(filter(x => !!x && Object.keys(x).length > 0), map(p => values(p)[0].range_instances_max_quantifier)),
      this.p.inf$.role$
        .by_subject_and_property$({
          fk_property: pkProperty,
          fk_temporal_entity: pkEntity
        }, false)
      // .pipe(filter(x => !!x))
    ).pipe(
      map(([m, rs]) => {
        if (rs.length === 0) return rs;
        const r = this.sortRolesByRepoPopularity(rs);
        return (m === -1 || m === null) ? r : r.slice(0, m);
      })
    )
  }

  /**
  * Pipe repo ingoing roles.
  * If max quantity is limited, takes only max allowed number of roles, starting with highest is_in_project_count
  */
  @spyTag pipeRepoIngoingRolesByProperty(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.p.dfh$.property$.by_pk_property$.key(pkProperty)
        .pipe(filter(x => !!x && Object.keys(x).length > 0), map(p => values(p)[0].domain_instances_max_quantifier)),
      this.p.inf$.role$
        .by_object_and_property$({
          fk_property: pkProperty,
          fk_entity: pkEntity
        }, false)
      // .pipe(filter(x => !!x))
    ).pipe(
      map(([m, rs]) => {
        if (rs.length === 0) return rs;
        const r = this.sortRolesByRepoPopularity(rs);
        return (m === -1 || m === null) ? r : r.slice(0, m);
      })
    )
  }


  /*********************************************************************
   * Alternatives (Repo minus Project)
  *********************************************************************/

  @spyTag pipeAlternativeBasicRoleItemByPkRole(pkRole: number, isOutgoing: boolean): Observable<BasicRoleItem> {
    return combineLatest(
      this.p.inf$.role$.by_pk_entity_key$(pkRole, false),
      this.p.inf$.role$.by_pk_entity_key$(pkRole),
    )
      .pipe(
        filter(([inrepo]) => !!inrepo),
        map(([inrepo, inproject]) => {
          if (inproject) {
            return undefined
          } else {
            const i: BasicRoleItem = {
              projRel: undefined,
              role: inrepo,
              ordNum: undefined,
              isOutgoing,
              label: ''
            }
            return i
          }
        })
      )
  }


  /**
     * Pipe alternative ingoing roles (= roles not in active project)
     */
  @spyTag pipeAlternativeIngoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.p.inf$.role$.by_object_and_property_indexed$({
        fk_property: pkProperty,
        fk_entity: pkEntity
      }, false),
      this.p.inf$.role$.by_object_and_property_indexed$({
        fk_property: pkProperty,
        fk_entity: pkEntity
      }).pipe(
        map(inproject => inproject ? Object.keys(inproject) : [])
      )
    ).pipe(
      map(([inrepo, inproject]) => omit(inproject, inrepo)),
      map(roles => values(roles))
    )
  }


  /**
   * Pipe alternative outgoing roles (= roles not in active project)
   */
  @spyTag pipeAlternativeOutgoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.p.inf$.role$.by_subject_and_property_indexed$({
        fk_property: pkProperty,
        fk_temporal_entity: pkEntity
      }, false),
      this.p.inf$.role$.by_subject_and_property_indexed$({
        fk_property: pkProperty,
        fk_temporal_entity: pkEntity
      }).pipe(
        map(inproject => inproject ? Object.keys(inproject) : [])
      ),
    ).pipe(
      map(([inrepo, inproject]) => omit(inproject, inrepo)),
      map(roles => values(roles))
    )
  }



  /**
   * get array of pks of persistent items of a specific class
   */
  @spyTag pipePersistentItemPksByClass(pkClass): Observable<number[]> {
    return this.p.inf$.persistent_item$.by_fk_class_key$(pkClass).pipe(
      map(ob => {
        if (ob) return Object.keys(ob).map(k => parseInt(k, 10));
        return []
      }))
  }

  /**
   * gets the css classes for that entity
   * @param pkEntity
   */
  pipeIconType(pkEntity: number): Observable<IconType> {

    return this.p.streamEntityPreview(pkEntity).pipe(
      map(preview => {
        if (preview.entity_type == 'teEn') {
          return 'temporal-entity'
        }
        if (preview.fk_class === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
          return 'expression-portion'
        } else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(preview.fk_class)) {
          return 'source'
        }
        return 'persistent-entity'
      })
    )

  }


  /*********************************************************************
   * Helpers
   *********************************************************************/
  sortRolesByRepoPopularity(roles: InfRole[]): InfRole[] {
    return roles.sort((a, b) => a.is_in_project_count > b.is_in_project_count ? 1 : -1)
  }



}