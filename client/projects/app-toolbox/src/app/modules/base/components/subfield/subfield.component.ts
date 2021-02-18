import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectPipesService, InformationPipesService, ItemList, SchemaSelectorsService, Subfield } from '@kleiolab/lib-queries';
import { PaginateByParam } from '@kleiolab/lib-redux';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { createPaginateBy, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gv-subfield',
  templateUrl: './subfield.component.html',
  styleUrls: ['./subfield.component.scss']
})
export class SubfieldComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() subfield: Subfield
  @Input() pkEntity: number
  @Input() showOntoInfo$: Observable<boolean>

  items$: Observable<ItemList>
  itemsCount$: Observable<number>

  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;

  constructor(
    private p: ActiveProjectPipesService,
    private s: SchemaSelectorsService,
    private pag: PaginationService,
    private i: InformationPipesService
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {

    const pagination$ = combineLatest(
      this.limit$.pipe(),
      this.offset$.pipe(),
      this.p.pkProject$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

    // Loading from rest api
    const nextPage$ = new Subject();
    const until$ = merge(nextPage$, this.destroy$)
    pagination$.pipe(
      distinctUntilChanged(equals),
      takeUntil(this.destroy$)
    ).subscribe(([limit, offset, pkProject]) => {
      nextPage$.next()
      this.pag.subfield.addPageLoader(
        pkProject, this.subfield, this.pkEntity, limit, offset, until$, false
      )
    })

    const paginateBy: PaginateByParam[] = createPaginateBy(this.subfield, this.pkEntity)

    // Piping from store
    this.items$ = pagination$.pipe(
      distinctUntilChanged(equals),
      switchMap(([limit, offset, pkProject]) => this.i.pipeStatementListPage(
        paginateBy,
        limit,
        offset,
        pkProject,
        this.subfield,
        false
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),
    )

    this.itemsCount$ = this.s.inf$.statement$.pagination$.pipeCount(paginateBy)

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
