import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectService, WarEntityPreviewApi } from 'app/core';
import { EntitySearchHit } from 'app/shared/components/list/api/list.models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, first, map, takeUntil } from 'rxjs/operators';
import { SearchExistingRelatedStatement } from '../../../../../../../server/lb3app/dist/server/sql-builders/sql-war-search-existing';
import { HitPreview } from '../entity-add-existing-hit/entity-add-existing-hit.component';

export interface DisableIfHasStatement {
  sourceClassLabel: string
  propertyLabel: string
  relatedStatement: SearchExistingRelatedStatement
  maxQuantity: number
}

@Component({
  selector: 'gv-search-existing-entity',
  templateUrl: './search-existing-entity.component.html',
  styleUrls: ['./search-existing-entity.component.css']
})
export class SearchExistingEntityComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // // local store of this component
  // localStore: ObservableStore<SearchExistingEntity>;

  // path to the substore
  // @Input() basePath: string[];

  @Input() alreadyInProjectBtnText: string;
  @Input() notInProjectBtnText: string;
  @Input() pkClass: number;
  @Input() searchString$: Observable<string>;
  @Input() disableIfHasStatement: DisableIfHasStatement;

  // select observables of substore properties
  loading$ = new BehaviorSubject<boolean>(false);

  // Hits
  persistentItems$ = new BehaviorSubject<HitPreview[]>([]);

  // Total count of hits
  collectionSize$ = new BehaviorSubject<number>(0);

  @Output() onAddExisting = new EventEmitter<number>();
  @Output() onOpenExisting = new EventEmitter<number>();

  // Search
  pkProject: number;
  searchString = '';
  minSearchStringLength = 0;
  pkNamespace: number;

  // Pagination
  collectionSize: number; // number of search results
  limit = 3; // max number of results on a page
  page = 1; // current page

  hitsFound = false;
  hitsTo$: Observable<number>;

  constructor(
    // protected rootEpics: RootEpics,
    // private epics: SearchExistingEntityAPIEpics,
    // public ngRedux: NgRedux<IAppState>,
    private entityPreviewApi: WarEntityPreviewApi,
    private p: ActiveProjectService
  ) {
  }

  // getBasePath = () => this.basePath;

  ngOnInit() {
    // this.localStore = this.ngRedux.configureSubStore(this.basePath, peItSearchExistingReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    if (!this.pkClass) throw Error('please provide a pkClass')
    if (!this.searchString$) throw Error('please provide a searchString$')
    if (!this.alreadyInProjectBtnText) throw Error('please provide a alreadyInProjectBtnText')
    if (!this.notInProjectBtnText) throw Error('please provide a notInProjectBtnText')


    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.pkProject = pkProject;

      this.searchString$.pipe(
        debounceTime(400),
        takeUntil(this.destroy$)
      ).subscribe(newValue => {
        this.searchString = newValue;
        if (newValue.length >= this.minSearchStringLength) {
          this.page = 1;
          this.search();
        } else {
          this.persistentItems$.next([])
          this.collectionSize$.next(0)
        }
      });
    })

    // set hitsFound true, once there are some hits
    this.persistentItems$.pipe(takeUntil(this.destroy$)).subscribe((i) => {
      if (i && i.length > 0) this.hitsFound = true
    })

    this.hitsTo$ = this.collectionSize$.pipe(
      map(collectionSize => {
        const upper = (this.limit * (this.page - 1)) + this.limit;
        return upper > collectionSize ? collectionSize : upper;
      })
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  pageChange() {
    this.search()
  }

  search() {

    if (this.disableIfHasStatement) {

      this.entityPreviewApi.searchExistingWithRelatedStatement(this.pkProject, this.searchString, [this.pkClass], null, this.limit, this.page, this.disableIfHasStatement.relatedStatement)
        .subscribe((result) => {
          const res: EntitySearchHit[] = result.data;

          const hits: HitPreview[] = res.map(r => {
            const btnDisabled = (this.disableIfHasStatement && r.related_statements.length >= this.disableIfHasStatement.maxQuantity);
            return {
              ...r,
              btnDisabled,
              btnTooltip: btnDisabled ?
                `This ${r.class_label} can't be selected because it is already related to ${r.related_statements.length} ${this.disableIfHasStatement.sourceClassLabel} via '${this.disableIfHasStatement.propertyLabel}'.`
                : ''
            }
          })
          this.persistentItems$.next(hits)
          this.collectionSize$.next(result.totalCount)
        }, error => {
          this.persistentItems$.next([])
          this.collectionSize$.next(0)
        })
    } else {
      this.entityPreviewApi.searchExisting(this.pkProject, this.searchString, [this.pkClass], null, this.limit, this.page)
        .subscribe((result) => {
          const res: EntitySearchHit[] = result.data;
          this.persistentItems$.next(res)
          this.collectionSize$.next(result.totalCount)
        }, error => {
          this.persistentItems$.next([])
          this.collectionSize$.next(0)
        })


    }


  }

  hitsFrom() {
    return (this.limit * (this.page - 1)) + 1;
  }


  onAdd(pkEntity: number) {
    this.onAddExisting.emit(pkEntity)
  }

  onOpen(pkEntity: number) {
    this.onOpenExisting.emit(pkEntity)
  }


}
