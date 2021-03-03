import { Injectable } from '@angular/core';
import { InfSelector, SchemaSelectorsService, Subfield } from '@kleiolab/lib-queries';
import { ActionResultObservable, GvSchemaActions, InfActions, PaginatedStatementList, PaginatedStatements, SchemaService, subfieldIdToString, SucceedActionMeta } from '@kleiolab/lib-redux';
import { GvLoadSubfieldPageReq, GvSchemaObject, GvSubfieldId, GvSubfieldPage, GvSubfieldPageScope, PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { equals, keys } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { subfieldToSubfieldId } from '../base.helpers';


class StatementPageLoader {
  private paginationTriggers = new Map<string, Observable<any>>()
  private pageLoaders = new Map<string, {
    refCount: number,
    until$: Subject<any>,
    loadEvent$: Subject<any>
  }>()
  constructor(
    private p: ActiveProjectService,
    private loadNeededFn: (subfieldId: GvSubfieldId, trigger$?: Observable<any>) => Observable<boolean>,
    private loadFn: (pkProject: number,
      pkEntity: number,
      pkProperty: number,
      targetClass: number,
      isOutgoing: boolean,
      limit: number,
      offset: number) => ActionResultObservable<PaginatedStatementList>
  ) { }

  public addPageLoader(pkProject: number, l: Subfield, pkEntity: number, limit, offset, takeUntil$: Observable<any>, alternatives = false) {
    const subfieldId = subfieldToSubfieldId(l, pkEntity, { inProject: pkProject })
    const subfieldIdString = subfieldIdToString(subfieldId)

    const trigger$ = this.getTrigger(subfieldIdString, l, pkEntity, alternatives);

    const pageIdString = subfieldIdString + '_' + limit + '_' + offset;

    if (!this.pageLoaders.has(pageIdString)) {

      // emits when load function has been called
      const loadEvent$ = new Subject<SucceedActionMeta<PaginatedStatementList>>()

      const until$ = new Subject<void>()

      this.pageLoaders.set(pageIdString, {
        refCount: 1,
        until$,
        loadEvent$
      })


      this.loadNeededFn(subfieldId, trigger$).pipe(
        filter(loadNeeded => loadNeeded === true),
        takeUntil(until$)
      ).subscribe(() => {
        this.loadFn(pkProject,
          pkEntity,
          l.property.pkProperty,
          l.targetClass,
          l.isOutgoing,
          limit,
          offset).resolved$.pipe(first(res => !!res)).subscribe((res) => {
            loadEvent$.next(res)
          })
      })

    } else {
      const loader = this.pageLoaders.get(pageIdString)
      this.pageLoaders.set(pageIdString, {
        until$: loader.until$,
        loadEvent$: loader.loadEvent$,
        refCount: loader.refCount + 1
      })
    }

    const sub = takeUntil$.subscribe(() => {
      const loader = this.pageLoaders.get(pageIdString)
      if (loader.refCount === 1) {
        loader.until$.next();

        this.pageLoaders.delete(pageIdString)
      } else {
        this.pageLoaders.set(pageIdString, {
          until$: loader.until$,
          loadEvent$: loader.loadEvent$,
          refCount: loader.refCount - 1
        })
      }
      sub.unsubscribe()
    })


    return this.pageLoaders.get(pageIdString)

  }

  private getTrigger(subfieldId: string, l: Subfield, pkEntity: number, alternatives: boolean) {
    if (!this.paginationTriggers.has(subfieldId)) {
      const ofProject = !alternatives;
      const t = combineLatest([
        this.p.inf$.statement$.by_object_and_property_indexed$({
          fk_property: l.property.pkProperty,
          fk_object_info: pkEntity
        }, ofProject).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
        this.p.inf$.statement$.by_subject_and_property_indexed$({
          fk_property: l.property.pkProperty,
          fk_subject_info: pkEntity
        }, ofProject).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
      ]).pipe(shareReplay({ bufferSize: 1, refCount: true }));
      this.paginationTriggers.set(subfieldId, t);
    }
    return this.paginationTriggers.get(subfieldId);
  }
}

export interface PaginatedStatementList2 {
  count: number;
  schemas: GvSchemaObject;
  paginatedStatements: PaginatedStatements;
}

class StatementPageLoader2 {
  private paginationTriggers = new Map<string, Observable<any>>()
  private pageLoaders = new Map<string, {
    refCount: number,
    until$: Subject<any>,
    // loadEvent$: Subject<any>
  }>()
  constructor(
    private inf$: InfSelector,
    private infActions: InfActions,
    private s: SchemaService,
    private loadNeededFn: (subfieldId: GvSubfieldPage, trigger$?: Observable<any>) => Observable<boolean>,
    private schemaActions: GvSchemaActions,
    private pag: PaginatedStatementsControllerService
  ) { }

  public addPageLoader(l: Subfield, pkEntity: number, limit, offset, takeUntil$: Observable<any>, scope: GvSubfieldPageScope) {
    const subfieldId = subfieldToSubfieldId(l, pkEntity, scope)
    const subfieldIdString = subfieldIdToString(subfieldId)


    const trigger$ = this.getTrigger(subfieldIdString, l, pkEntity, scope);

    const pageIdString = subfieldIdString + '_' + limit + '_' + offset;

    if (!this.pageLoaders.has(pageIdString)) {

      // emits when load function has been called
      const loadEvent$ = new Subject<PaginatedStatementList2>()

      const until$ = new Subject<void>()

      this.pageLoaders.set(pageIdString, {
        refCount: 1,
        until$,
        // loadEvent$
      })
      const subfieldPage: GvSubfieldPage = { ...subfieldId, limit, offset }
      this.loadNeededFn(subfieldPage, trigger$).pipe(
        filter(loadNeeded => loadNeeded === true),
        takeUntil(until$)
      ).subscribe(() => {
        const req: GvLoadSubfieldPageReq = {
          pkProject: scope.inProject,
          subfieldType: l.listType,
          page: {
            fkSourceEntity: pkEntity,
            fkProperty: l.property.pkProperty,
            targetClass: l.targetClass,
            isOutgoing: l.isOutgoing,
            scope: scope,
            limit,
            offset
          }
        }
        this.schemaActions.loadGvPaginationObject(req)
      })

    } else {
      const loader = this.pageLoaders.get(pageIdString)
      this.pageLoaders.set(pageIdString, {
        until$: loader.until$,
        // loadEvent$: loader.loadEvent$,
        refCount: loader.refCount + 1
      })
    }

    const sub = takeUntil$.subscribe(() => {
      const loader = this.pageLoaders.get(pageIdString)
      if (loader.refCount === 1) {
        loader.until$.next();

        this.pageLoaders.delete(pageIdString)
      } else {
        this.pageLoaders.set(pageIdString, {
          until$: loader.until$,
          // loadEvent$: loader.loadEvent$,
          refCount: loader.refCount - 1
        })
      }
      sub.unsubscribe()
    })


    return this.pageLoaders.get(pageIdString)

  }

  private getTrigger(subfieldId: string, l: Subfield, pkEntity: number, scope: GvSubfieldPageScope) {
    if (!this.paginationTriggers.has(subfieldId)) {
      const ofProject = !!scope.inProject;
      const t = combineLatest([
        this.inf$.statement$.by_object_and_property_indexed$({
          fk_property: l.property.pkProperty,
          fk_object_info: pkEntity
        }, ofProject).pipe(map(x => {
          return keys(x)
        }), distinctUntilChanged(equals)),
        this.inf$.statement$.by_subject_and_property_indexed$({
          fk_property: l.property.pkProperty,
          fk_subject_info: pkEntity
        }, ofProject).pipe(map(x => {
          return keys(x)
        }), distinctUntilChanged(equals)),
      ]).pipe(shareReplay({ bufferSize: 1, refCount: true }));
      this.paginationTriggers.set(subfieldId, t);
    }
    return this.paginationTriggers.get(subfieldId);
  }

  logSubfieldMetadata(subfieldId: string) {
    const inf = this.inf$.ngRedux.getState().inf
    if (inf && inf.statement && inf.statement.by_subfield_page && inf.statement.by_subfield_page[subfieldId]) {
      return this.inf$.ngRedux.getState().inf.statement.by_subfield_page[subfieldId]
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  temporalEntity = new StatementPageLoader(
    this.p,
    this.p.inf$.statement$.pagination$.pipePageLoadNeeded,
    this.p.inf.temporal_entity.loadPaginatedList)

  temporalEntityAlternative = new StatementPageLoader(
    this.p,
    this.p.inf$.statement$.pagination$.pipePageLoadNeeded,
    this.p.inf.temporal_entity.loadPaginatedAlternativeList)

  statements = new StatementPageLoader(
    this.p,
    this.p.inf$.statement$.pagination$.pipePageLoadNeeded,
    this.p.inf.statement.loadPaginatedList
  )

  subfield = new StatementPageLoader2(
    this.schemaSelctors.inf$,
    this.inf,
    this.s,
    this.p.inf$.statement$.pagination$.pipePageLoadNeeded,
    this.schemaActions,
    this.paginatedStatementsService
  )
  constructor(
    private schemaSelctors: SchemaSelectorsService,
    private p: ActiveProjectService,
    private inf: InfActions,
    private s: SchemaService,
    private schemaActions: GvSchemaActions,
    private paginatedStatementsService: PaginatedStatementsControllerService
  ) { }

}
