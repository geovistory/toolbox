import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { IAppState } from '@kleiolab/lib-redux';
import { EntitySearchHit, WarEntityPreviewControllerService } from '@kleiolab/lib-sdk-lb4';
import { WarEntityPreview } from 'projects/lib-sdk-lb4/src/public-api';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListService } from '../../services/list.service';


@Component({
  selector: 'gv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();



  pkAllowedClasses: number[];

  // emits pk_entity of click
  @Output() onOpen = new EventEmitter<WarEntityPreview>();

  // select observables of substore properties
  items$ = new BehaviorSubject<EntitySearchHit[]>([]);
  collectionSize$ = new BehaviorSubject<number>(0);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<boolean>(false);

  // Pagination
  collectionSize: number; // number of search results
  limit = 10; // max number of results on a page
  page = 1; // current page

  // Search
  searchString = '';
  errorMessages: any;

  selectingEntities$: Observable<boolean>;
  projectId: number;

  entityType: 'teEn' | 'peIt' | undefined;

  constructor(
    private ap: ActiveProjectPipesService,
    private entityPreviewApi: WarEntityPreviewControllerService,
    public ngRedux: NgRedux<IAppState>,
    private listService: ListService
  ) {

    // listen to selecting entities for annotation
    this.selectingEntities$ = ngRedux.select<boolean>(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities']);

  }

  ngOnInit() {

    combineLatest([
      this.ap.pkProject$,
      this.listService.pkAllowedClasses$,
      this.listService.entityType$
    ]).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(([projectId, pkAllowedClasses, entityType]) => {
        this.projectId = projectId;
        this.pkAllowedClasses = pkAllowedClasses;
        this.entityType = entityType
        this.searchProject();
      });

    this.collectionSize$.pipe(takeUntil(this.destroy$)).subscribe(d => { this.collectionSize = d })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  searchProject() {
    if (this.projectId && this.pkAllowedClasses) {
      this.search()
    }
  }

  search() {
    this.loading$.next(true)

    this.entityPreviewApi.warEntityPreviewControllerSearch({
      projectId: this.projectId,
      searchString: this.searchString,
      pkClasses: this.pkAllowedClasses,
      entityType: this.entityType,
      limit: this.limit,
      page: this.page
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (res) => {
        this.items$.next(res.data)
        this.collectionSize$.next(res.totalCount)
        this.error$.next(false)
        this.loading$.next(false)
      },
      error: () => {
        this.error$.next(true)
      },
      complete: () => {
        this.loading$.next(false)

      }
    })
  }

  get hitsFrom() {
    return (this.limit * (this.page - 1)) + 1;
  }
  get hitsTo() {
    const upper = (this.limit * (this.page - 1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  pageChange(p: PageEvent) {
    this.page = p.pageIndex;
    this.searchProject();
  }

  searchStringChange() {
    this.page = 1;
    this.searchProject();
  }

  searchKeydown($event) {
    if ($event.key === 'Enter') {
      this.searchStringChange()
    }
  };


}
