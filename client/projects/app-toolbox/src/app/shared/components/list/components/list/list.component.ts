import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { IAppState } from '@kleiolab/lib-redux';
import { EntitySearchHit, WarEntityPreviewControllerService } from '@kleiolab/lib-sdk-lb4';
import { WarEntityPreview } from 'projects/lib-sdk-lb4/src/public-api';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @Input() showTeEnPeItFilter: boolean;

  // the classes for which this list can search
  @Input() pkAllowedClasses$: Observable<number[]>;
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

  // Entity type (TeEn/PeIt) Filter
  typeOptions = [
    { value: 'peIt', label: '<i class="gv-icon gv-icon-persistent-entity"></i> Persistent' },
    { value: 'teEn', label: '<i class="fa fa-star-o"></i> Temporal' },
    { value: undefined, label: '<i class="gv-icon gv-icon-entity"></i> All' },
  ]
  selectedType: { value: any, label: string } = this.typeOptions[0];

  constructor(
    private ap: ActiveProjectPipesService,
    private entityPreviewApi: WarEntityPreviewControllerService,
    public ngRedux: NgRedux<IAppState>
  ) {

    // listen to selecting entities for annotation
    this.selectingEntities$ = ngRedux.select<boolean>(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities']);


  }

  ngOnInit() {
    // this.localStore = this.ngRedux.configureSubStore(this.basePath, listReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest([
      this.ap.pkProject$,
      this.pkAllowedClasses$
    ]).pipe(
      first((d) => (d.filter((i) => (!i)).length === 0)),
      takeUntil(this.destroy$)
    )
      .subscribe(d => {
        this.projectId = d[0];
        this.pkAllowedClasses = d[1];
        // init the search
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
      entityType: this.selectedType.value,
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

  pageChange() {
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


  /**
   * Called when user changes to see only teEn / peIt or all classes
   */
  entityTypeChange(type) {
    if (this.selectedType !== type) {
      this.selectedType = type;
      this.searchProject();
    }
  }

}
