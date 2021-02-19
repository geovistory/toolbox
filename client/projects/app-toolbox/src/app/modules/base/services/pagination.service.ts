import { Injectable } from '@angular/core';
import { InfSelector, SchemaSelectorsService, Subfield } from '@kleiolab/lib-queries';
import { ActionResultObservable, GvSchemaActions, InfActions, PaginateByParam, paginatedBy, PaginatedStatementList, PaginatedStatements, paginateKey, paginateName, SchemaService, SucceedActionMeta } from '@kleiolab/lib-redux';
import { GvLoadSubfieldPageReq, GvSchemaObject, PaginatedStatementsControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { equals, keys } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { createPaginateBy } from '../base.helpers';


class StatementPageLoader {
  private paginationTriggers = new Map<string, Observable<any>>()
  private pageLoaders = new Map<string, {
    refCount: number,
    until$: Subject<any>,
    loadEvent$: Subject<any>
  }>()
  constructor(
    private p: ActiveProjectService,
    private loadNeededFn: (by: PaginateByParam[], limit: number, offset: number, trigger$: Observable<any>) => Observable<boolean>,
    private loadFn: (pkProject: number,
      pkEntity: number,
      pkProperty: number,
      targetClass: number,
      isOutgoing: boolean,
      limit: number,
      offset: number) => ActionResultObservable<PaginatedStatementList>
  ) { }

  public addPageLoader(pkProject: number, l: Subfield, pkEntity: number, limit, offset, takeUntil$: Observable<any>, alternatives = false) {

    const paginateBy = createPaginateBy(l, pkEntity, alternatives);
    const triggerKey = paginatedBy(paginateName(paginateBy)) + '_' + paginateKey(paginateBy);

    const trigger$ = this.getTrigger(triggerKey, l, pkEntity, alternatives);

    const loaderKey = triggerKey + '_' + limit + '_' + offset;

    if (!this.pageLoaders.has(loaderKey)) {

      // emits when load function has been called
      const loadEvent$ = new Subject<SucceedActionMeta<PaginatedStatementList>>()

      const until$ = new Subject<void>()

      this.pageLoaders.set(loaderKey, {
        refCount: 1,
        until$,
        loadEvent$
      })


      this.loadNeededFn(paginateBy, limit, offset, trigger$).pipe(
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
      const loader = this.pageLoaders.get(loaderKey)
      this.pageLoaders.set(loaderKey, {
        until$: loader.until$,
        loadEvent$: loader.loadEvent$,
        refCount: loader.refCount + 1
      })
    }

    const sub = takeUntil$.subscribe(() => {
      const loader = this.pageLoaders.get(loaderKey)
      if (loader.refCount === 1) {
        loader.until$.next();

        this.pageLoaders.delete(loaderKey)
      } else {
        this.pageLoaders.set(loaderKey, {
          until$: loader.until$,
          loadEvent$: loader.loadEvent$,
          refCount: loader.refCount - 1
        })
      }
      sub.unsubscribe()
    })


    return this.pageLoaders.get(loaderKey)

  }

  private getTrigger(triggerKey: string, l: Subfield, pkEntity: number, alternatives: boolean) {
    if (!this.paginationTriggers.has(triggerKey)) {
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
      this.paginationTriggers.set(triggerKey, t);
    }
    return this.paginationTriggers.get(triggerKey);
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
    private loadNeededFn: (by: PaginateByParam[], limit: number, offset: number, trigger$: Observable<any>) => Observable<boolean>,
    private schemaActions: GvSchemaActions,
    private pag: PaginatedStatementsControllerService
  ) { }

  public addPageLoader(pkProject: number, l: Subfield, pkEntity: number, limit, offset, takeUntil$: Observable<any>, alternatives = false) {

    const paginateBy = createPaginateBy(l, pkEntity, alternatives);
    const triggerKey = paginatedBy(paginateName(paginateBy)) + '_' + paginateKey(paginateBy);

    const trigger$ = this.getTrigger(triggerKey, l, pkEntity, alternatives);

    const loaderKey = triggerKey + '_' + limit + '_' + offset;

    if (!this.pageLoaders.has(loaderKey)) {

      // emits when load function has been called
      const loadEvent$ = new Subject<PaginatedStatementList2>()

      const until$ = new Subject<void>()

      this.pageLoaders.set(loaderKey, {
        refCount: 1,
        until$,
        // loadEvent$
      })


      this.loadNeededFn(paginateBy, limit, offset, trigger$).pipe(
        filter(loadNeeded => loadNeeded === true),
        takeUntil(until$)
      ).subscribe(() => {
        const req: GvLoadSubfieldPageReq = {
          pkProject: pkProject,
          subfieldType: { appellation: 'true' },
          page: {
            fkProperty: l.property.pkProperty,
            fkSourceEntity: pkEntity,
            scope: { inProject: pkProject },
            targetClass: l.targetClass,
            isOutgoing: l.isOutgoing,
            limit,
            offset
          }
        }
        this.schemaActions.loadGvPaginationObject(req)

      })

    } else {
      const loader = this.pageLoaders.get(loaderKey)
      this.pageLoaders.set(loaderKey, {
        until$: loader.until$,
        // loadEvent$: loader.loadEvent$,
        refCount: loader.refCount + 1
      })
    }

    const sub = takeUntil$.subscribe(() => {
      const loader = this.pageLoaders.get(loaderKey)
      if (loader.refCount === 1) {
        loader.until$.next();

        this.pageLoaders.delete(loaderKey)
      } else {
        this.pageLoaders.set(loaderKey, {
          until$: loader.until$,
          // loadEvent$: loader.loadEvent$,
          refCount: loader.refCount - 1
        })
      }
      sub.unsubscribe()
    })


    return this.pageLoaders.get(loaderKey)

  }

  private getTrigger(triggerKey: string, l: Subfield, pkEntity: number, alternatives: boolean) {
    if (!this.paginationTriggers.has(triggerKey)) {
      const ofProject = !alternatives;
      const t = combineLatest([
        this.inf$.statement$.by_object_and_property_indexed$({
          fk_property: l.property.pkProperty,
          fk_object_info: pkEntity
        }, ofProject).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
        this.inf$.statement$.by_subject_and_property_indexed$({
          fk_property: l.property.pkProperty,
          fk_subject_info: pkEntity
        }, ofProject).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
      ]).pipe(shareReplay({ bufferSize: 1, refCount: true }));
      this.paginationTriggers.set(triggerKey, t);
    }
    return this.paginationTriggers.get(triggerKey);
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
