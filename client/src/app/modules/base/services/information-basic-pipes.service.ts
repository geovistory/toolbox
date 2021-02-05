import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ActiveProjectService, IconType, InfStatement, InfTemporalEntity, InfTimePrimitive, TimePrimitive, TimeSpan } from 'app/core';
import { Granularity } from 'app/core/date-time/date-time-commons';
import { CalendarType } from 'app/core/date-time/time-primitive';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { switchMapOr } from 'app/core/util/switchMapOr';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { spyTag } from 'app/shared';
import { omit, values } from 'ramda';
import { combineLatest, merge, Observable, of, pipe } from 'rxjs';
import { auditTime, filter, map, switchMap } from 'rxjs/operators';
import { BasicStatementItem, Subfield } from '../components/properties-tree/properties-tree.models';
import { IAppState } from 'app/core/redux-store/model';




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
    return this.p.inf$.statement$
      .by_object$({ fk_object_info: pkEntity })
      .pipe(
        auditTime(1),
        switchMapOr([], (statements) => combineLatest(
          statements.map(statement => this.p.inf$.temporal_entity$.by_pk_entity_key$(statement.fk_subject_info).pipe(
          ))
        ).pipe(
          map(x => x.filter((y) => !!y)),
        )),
      )
  }




  /**
 * Pipe statements of an entity
 */
  @spyTag pipeStatements(pkEntity: number, isOutgoing): Observable<InfStatement[]> {
    return isOutgoing ? this.pipeOutgoingStatements(pkEntity) : this.pipeIngoingStatements(pkEntity)
  }


  /**
  * Pipe outgoing statements of an entity
  */
  @spyTag pipeOutgoingStatements(pkEntity): Observable<InfStatement[]> {
    return this.p.inf$.statement$.by_subject$({ fk_subject_info: pkEntity })
  }


  /**
   * Pipe ingoing statements of an entity
   */
  @spyTag pipeIngoingStatements(pkEntity): Observable<InfStatement[]> {
    return this.p.inf$.statement$.by_object$({ fk_object_info: pkEntity })
  }


  pipeStatementsOfList(listDefinition: Subfield, pkEntity): Observable<InfStatement[]> {
    if (listDefinition.isOutgoing) {
      return this.p.inf$.statement$.by_subject_and_property$({
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        fk_subject_info: pkEntity
      })
    } else {
      return this.p.inf$.statement$.by_object_and_property$({
        fk_property: listDefinition.property.pkProperty,
        fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
        fk_object_info: pkEntity
      })
    }
  }

  /**
   * Pipe outgoing statements of temporal entity
   */
  @spyTag pipeOutgoingStatementsByProperty(pkProperty, pkEntity): Observable<InfStatement[]> {
    return this.p.inf$.statement$.by_subject_and_property$({
      fk_property: pkProperty,
      fk_subject_info: pkEntity
    })

  }


  /**
   * Pipe ingoing statements of an entity
   */
  @spyTag pipeIngoingStatementsByProperty(pkProperty, pkEntity): Observable<InfStatement[]> {
    return this.p.inf$.statement$.by_object_and_property$({
      fk_property: pkProperty,
      fk_object_info: pkEntity
    })
  }

  /**
 * Pipe outgoing statements of temporal entity
 */
  @spyTag pipeOutgoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject: number): Observable<BasicStatementItem[]> {
    return this.p.inf$.statement$.by_subject_and_property$({
      fk_property: pkProperty,
      fk_subject_info: pkEntity
    }).pipe(
      switchMap(statements => combineLatestOrEmpty(
        statements.map(statement => this.pipeBasicStatementItem(pkProject, statement, true))
      ))
    )
  }



  /**
   * Pipe ingoing statements of an entity
   */
  @spyTag pipeIngoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject: number): Observable<BasicStatementItem[]> {
    return this.p.inf$.statement$.by_object_and_property$({
      fk_property: pkProperty,
      fk_object_info: pkEntity
    }).pipe(
      switchMap(statements => combineLatestOrEmpty(
        statements.map(statement => this.pipeBasicStatementItem(pkProject, statement, false))
      ))
    )
  }

  @spyTag private pipeBasicStatementItem(pkProject: number, statement: InfStatement, isOutgoing: boolean): Observable<BasicStatementItem> {
    return this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(
      filter(x => !!x),
      map(projRel => ({
        projRel, statement, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing
      }))
    );
  }

  @spyTag pipeBasicStatementItemByPkStatement(pkProject: number, pkStatement: number, isOutgoing: boolean): Observable<BasicStatementItem> {
    return this.p.inf$.statement$.by_pk_entity_key$(pkStatement).pipe(
      switchMap(statement => (!statement) ? of(undefined) : this.pipeBasicStatementItem(pkProject, statement, isOutgoing))
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
      this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements()),

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
   * Pipes max. one time primitive for an array of statements, assuming that the statements
   * are of the same properties.
   */
  timePrimitiveOfStatements = () => pipe(
    map((r: InfStatement[]) => {
      if (r.length > 1) return [r[0]]
      else return r
    }),
    switchMapOr(undefined, (r) => this.pipeInfTimePrimitive(r[0].fk_object_info).pipe(
      switchMapOr(undefined, (infTimePrimitive) => this.p.pkProject$.pipe(
        switchMap((pkProject) => this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$
          .key(pkProject + '_' + r[0].pk_entity).pipe(
            filter(statement => !!statement),
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
    * Pipe repo outgoing statements.
    */
  @spyTag pipeRepoOutgoingStatements(pkEntity): Observable<InfStatement[]> {
    return this.p.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }, false)
  }

  /**
  * Pipe repo ingoing statements.
  */
  @spyTag pipeRepoIngoingStatements(pkEntity): Observable<InfStatement[]> {
    return this.p.inf$.statement$.by_object$({ fk_object_info: pkEntity }, false)
  }

  /**
    * Pipe repo outgoing statements.
    * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
    */
  @spyTag pipeRepoOutgoingStatementsByProperty(pkProperty, pkEntity): Observable<InfStatement[]> {
    return combineLatest(
      this.p.dfh$.property$.by_pk_property$.key(pkProperty)
        .pipe(filter(x => !!x && Object.keys(x).length > 0), map(p => values(p)[0].range_instances_max_quantifier)),
      this.p.inf$.statement$
        .by_subject_and_property$({
          fk_property: pkProperty,
          fk_subject_info: pkEntity
        }, false)
      // .pipe(filter(x => !!x))
    ).pipe(
      map(([m, rs]) => {
        if (rs.length === 0) return rs;
        const r = this.sortStatementsByRepoPopularity(rs);
        return (m === -1 || m === null) ? r : r.slice(0, m);
      })
    )
  }

  /**
  * Pipe repo ingoing statements.
  * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
  */
  @spyTag pipeRepoIngoingStatementsByProperty(pkProperty, pkEntity): Observable<InfStatement[]> {
    return combineLatest(
      this.p.dfh$.property$.by_pk_property$.key(pkProperty)
        .pipe(filter(x => !!x && Object.keys(x).length > 0), map(p => values(p)[0].domain_instances_max_quantifier)),
      this.p.inf$.statement$
        .by_object_and_property$({
          fk_property: pkProperty,
          fk_object_info: pkEntity
        }, false)
      // .pipe(filter(x => !!x))
    ).pipe(
      map(([m, rs]) => {
        if (rs.length === 0) return rs;
        const r = this.sortStatementsByRepoPopularity(rs);
        return (m === -1 || m === null) ? r : r.slice(0, m);
      })
    )
  }


  /*********************************************************************
   * Alternatives (Repo minus Project)
  *********************************************************************/

  @spyTag pipeAlternativeBasicStatementItemByPkStatement(pkStatement: number, isOutgoing: boolean): Observable<BasicStatementItem> {
    return combineLatest(
      this.p.inf$.statement$.by_pk_entity_key$(pkStatement, false),
      this.p.inf$.statement$.by_pk_entity_key$(pkStatement),
    )
      .pipe(
        filter(([inrepo]) => !!inrepo),
        map(([inrepo, inproject]) => {
          if (inproject) {
            return undefined
          } else {
            const i: BasicStatementItem = {
              projRel: undefined,
              statement: inrepo,
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
     * Pipe alternative ingoing statements (= statements not in active project)
     */
  @spyTag pipeAlternativeIngoingStatements(pkProperty, pkEntity): Observable<InfStatement[]> {
    return combineLatest(
      this.p.inf$.statement$.by_object_and_property_indexed$({
        fk_property: pkProperty,
        fk_object_info: pkEntity
      }, false),
      this.p.inf$.statement$.by_object_and_property_indexed$({
        fk_property: pkProperty,
        fk_object_info: pkEntity
      }).pipe(
        map(inproject => inproject ? Object.keys(inproject) : [])
      )
    ).pipe(
      map(([inrepo, inproject]) => omit(inproject, inrepo)),
      map(statements => values(statements))
    )
  }


  /**
   * Pipe alternative outgoing statements (= statements not in active project)
   */
  @spyTag pipeAlternativeOutgoingStatements(pkProperty, pkEntity): Observable<InfStatement[]> {
    return combineLatest(
      this.p.inf$.statement$.by_subject_and_property_indexed$({
        fk_property: pkProperty,
        fk_subject_info: pkEntity
      }, false),
      this.p.inf$.statement$.by_subject_and_property_indexed$({
        fk_property: pkProperty,
        fk_subject_info: pkEntity
      }).pipe(
        map(inproject => inproject ? Object.keys(inproject) : [])
      ),
    ).pipe(
      map(([inrepo, inproject]) => omit(inproject, inrepo)),
      map(statements => values(statements))
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
  sortStatementsByRepoPopularity(statements: InfStatement[]): InfStatement[] {
    return statements.sort((a, b) => a.is_in_project_count > b.is_in_project_count ? 1 : -1)
  }



}
