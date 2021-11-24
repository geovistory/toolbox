import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { IconType } from '@kleiolab/lib-redux';
import { InfStatement, InfTimePrimitive, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { CalendarType, Granularity, TimeSpanUtil } from '@kleiolab/lib-utils';
import { BehaviorSubject, combineLatest, merge, Observable, pipe } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';



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

  constructor(
    private p: ActiveProjectPipesService,
    private s: SchemaSelectorsService,
  ) { }

  /*********************************************************************
   * Project
  *********************************************************************/


  /**
  * Pipe outgoing statements of an entity
  */
  pipeOutgoingStatements(pkEntity): Observable<InfStatement[]> {
    return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity })
  }

  /**
   * Pipe outgoing statements of temporal entity
   */
  pipeOutgoingStatementsByProperty(pkProperty, pkEntity): Observable<InfStatement[]> {
    return this.s.inf$.statement$.by_subject_and_property$({
      fk_property: pkProperty,
      fk_subject_info: pkEntity
    })

  }



  pipeInfTimePrimitive(pkEntity: number): Observable<InfTimePrimitive> {
    return this.s.inf$.time_primitive$.by_pk_entity$.key(pkEntity)
  }

  /**
   * pipes the TimeSpan of a temporal entity
   * @param pkEntity the pk_entity of the termporal entity
   */
  pipeTimeSpan(pkEntity: number): Observable<TimeSpanUtil> {
    // Get the properties leading to presences
    return combineLatest(
      this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()),
      this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements()),

    ).pipe(
      map(([_72, _71, _150, _151, _152, _153]) => new TimeSpanUtil({
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
    map((r: InfStatement[]) => r[0]),
    switchMap((r) => {
      if (!r) return new BehaviorSubject(undefined)
      return this.pipeInfTimePrimitive(r.fk_object_info).pipe(
        switchMap((infTimePrimitive) => this.p.pkProject$.pipe(
          switchMap((pkProject) => this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
            .key(pkProject + '_' + r[0].pk_entity).pipe(
              filter(statement => !!statement),
              map(ipr => {
                const y: TimePrimitiveWithCal = {
                  calendar: (ipr.calendar ? ipr.calendar : 'gregorian') as CalendarType,
                  julianDay: infTimePrimitive.julian_day,
                  duration: infTimePrimitive.duration as Granularity
                }
                return y;
              })
            ))
        ))
      )
    })
  )

  /**
   * Pipes the fk_class of the given entity
   */
  pipeClassOfEntity(pkEntity: number): Observable<number> {
    return merge(
      this.s.inf$.resource$.by_pk_entity_key$(pkEntity).pipe(
        filter(e => !!e),
        map(e => e.fk_class)
      ),
      this.s.inf$.resource$.by_pk_entity_key$(pkEntity).pipe(
        filter(e => !!e),
        map(e => e.fk_class)
      )
    )
  }

  /**
   * Pipes distinct fk_classes of the given persistent items
   */
  pipeClassesOfPersistentItems(pkEntities: number[]): Observable<number[]> {
    return this.s.inf$.resource$.by_pk_entity_all$().pipe(
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






  /**
   * get array of pks of persistent items of a specific class
   */
  pipePersistentItemPksByClass(pkClass): Observable<number[]> {
    return this.s.inf$.resource$.by_fk_class_key$(pkClass).pipe(
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


}
