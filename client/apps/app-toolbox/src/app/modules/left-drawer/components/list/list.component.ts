import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StateFacade } from '@kleiolab/lib-redux';
import { EntitySearchHit, WarEntityPreview, WarEntityPreviewControllerService } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
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
  limit = 5; // max number of results on a page
  page = 0; // current page

  // Search
  searchString = '';
  errorMessages: any;

  projectId: number;

  entityType: 'teEn' | 'peIt' | undefined;

  constructor(
    private entityPreviewApi: WarEntityPreviewControllerService,
    private listService: ListService,
    private state: StateFacade
  ) { }

  ngOnInit() {

    combineLatest([
      this.state.pkProject$,
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
    this.items$.next([])
    this.entityPreviewApi.warEntityPreviewControllerSearch({
      projectId: this.projectId,
      searchString: this.searchString,
      pkClasses: this.pkAllowedClasses,
      entityType: this.entityType,
      limit: this.limit,
      page: this.page + 1
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
    return (this.limit * (this.page)) + 1;
  }
  get hitsTo() {
    const upper = (this.limit * (this.page)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  pageChange(p: PageEvent) {
    this.page = p.pageIndex;
    this.searchProject();
  }

  searchStringChange() {
    this.page = 0;
    this.searchProject();
  }

  searchKeydown($event) {
    if ($event.key === 'Enter') {
      this.searchStringChange()
    }
  };


}
