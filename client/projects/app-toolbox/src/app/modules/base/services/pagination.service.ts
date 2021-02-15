import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Subfield } from '@kleiolab/lib-queries';
import { ActionResultObservable, IAppState, PaginateByParam, paginatedBy, PaginatedStatementList, paginateKey, paginateName, SucceedActionMeta } from '@kleiolab/lib-redux';
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

  constructor(
    private p: ActiveProjectService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

}
