import { Injectable } from '@angular/core';
import { ActiveProjectService, IAppState } from 'app/core';
import { paginatedBy, paginateKey, paginateName } from 'app/core/store/reducer-factory';
import { equals, keys } from 'ramda';
import { combineLatest, Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { ListDefinition } from '../components/properties-tree/properties-tree.models';
import { createPaginateBy } from '../components/temporal-entity-list/temporal-entity-list.component';
import { PaginateByParam, ActionResultObservable } from 'app/core/store/actions';
import { NgRedux } from '@angular-redux/store';
import { InfSelector } from 'app/core/inf/inf.service';
import { PaginatedRolesList } from 'app/core/inf/inf.actions';


class RolePageLoader {
  private paginationTriggers = new Map<string, Observable<any>>()
  private pageLoaders = new Map<string, {
    refCount: number,
    until$: Subject<any>
  }>()
  constructor(
    private p: ActiveProjectService,
    private loadNeededFn: (by: PaginateByParam[], limit: number, offset: number, trigger$?: Observable<any>) => Observable<boolean>,
    private loadFn: (pkProject: number,
      pkEntity: number,
      pkProperty: number,
      targetClass: number,
      isOutgoing: boolean,
      limit: number,
      offset: number) => ActionResultObservable<PaginatedRolesList>
  ) { }

  public addPageLoader(pkProject: number, l: ListDefinition, pkEntity: number, limit, offset, takeUntil$: Observable<any>) {

    const paginateBy = createPaginateBy(l, pkEntity);
    const triggerKey = paginatedBy(paginateName(paginateBy)) + '_' + paginateKey(paginateBy);

    const trigger$ = this.getTrigger(triggerKey, l, pkEntity);

    const loaderKey = triggerKey + '_' + limit + '_' + offset;

    if (!this.pageLoaders.has(loaderKey)) {

      const until$ = new Subject<void>()
      this.pageLoaders.set(loaderKey, {
        refCount: 1,
        until$
      })


      this.loadNeededFn(paginateBy, limit, offset, trigger$).pipe(
        filter(loadNeeded => loadNeeded === true),
        takeUntil(until$)
      ).subscribe(() => {
        this.loadFn(pkProject,
          pkEntity,
          l.pkProperty,
          l.targetClass,
          l.isOutgoing,
          limit,
          offset)
      })

    } else {
      const loader = this.pageLoaders.get(loaderKey)
      this.pageLoaders.set(loaderKey, {
        until$: loader.until$,
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
          refCount: loader.refCount - 1
        })
      }
      sub.unsubscribe()
    })




  }

  private getTrigger(triggerKey: string, l: ListDefinition, pkEntity: number) {
    if (!this.paginationTriggers.has(triggerKey)) {
      const t = combineLatest([
        this.p.inf$.role$
          .by_object_and_property_indexed$({
            fk_property: l.pkProperty,
            fk_entity: pkEntity
          })
          .pipe(map(x => keys(x)), distinctUntilChanged(equals)),
        this.p.inf$.role$.by_subject_and_property_indexed$({
          fk_property: l.pkProperty,
          fk_temporal_entity: pkEntity
        }).pipe(map(x => keys(x)), distinctUntilChanged(equals)),
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
  private infRepo = new InfSelector(this.ngRedux, of('repo'))

  temporalEntity = new RolePageLoader(
    this.p,
    this.p.inf$.role$.pagination$.pipePageLoadNeeded,
    this.p.inf.temporal_entity.loadPaginatedList)

  temporalEntityAlternative = new RolePageLoader(
    this.p,
    this.infRepo.role$.pagination$.pipePageLoadNeeded,
    this.p.inf.temporal_entity.loadPaginatedAlternativeList)

  roles = new RolePageLoader(
    this.p,
    this.p.inf$.role$.pagination$.pipePageLoadNeeded,
    this.p.inf.role.loadPaginatedList
  )

  constructor(
    private p: ActiveProjectService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

}
