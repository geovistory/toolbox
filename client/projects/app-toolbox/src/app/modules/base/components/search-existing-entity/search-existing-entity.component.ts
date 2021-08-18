import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { EntitySearchHit, SearchExistingRelatedStatement, WarEntityPreviewControllerService, WarEntityPreviewSearchExistingReq } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, first, map, takeUntil } from 'rxjs/operators';
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
  destroy$ = new Subject<boolean>();

  pkProject: number;
  pkNamespace: number;
  className: string;

  @Input() pkClass: number;
  @Input() searchActive = true;
  @Input() searchString$: Subject<string>; // string or '' (can be used to filter the list from the outside)
  @Input() disableIfHasStatement: DisableIfHasStatement;

  @Output() onMore = new EventEmitter<number>();

  // select observables of substore properties
  loading$ = new BehaviorSubject<boolean>(false);

  // Hits
  persistentItems$ = new BehaviorSubject<HitPreview[]>([]);
  hitsFound = false;
  hitsTo$: Observable<number>;

  // For search
  searchString = '';
  minSearchStringLength = 0;

  // Pagination
  collectionSize: number; // number of search results
  collectionSize$ = new BehaviorSubject<number>(0);
  limit = 5; // max number of results on a page
  page = 1; // current page


  constructor(
    private entityPreviewApi: WarEntityPreviewControllerService,
    private p: ActiveProjectService,
    private c: ConfigurationPipesService
  ) { }

  ngOnInit() {
    // input validation
    if (!this.pkClass) throw Error('please provide a pkClass')
    if (typeof this.pkClass !== 'number') throw Error('pkClass is not a number')
    if (!this.searchString$) throw Error('please provide a searchString$')

    // get class label
    this.c.pipeClassLabel(this.pkClass).subscribe(name => this.className = name);

    // update entity list
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$))
      .subscribe(pkProject => {
        this.pkProject = pkProject;

        this.searchString$.pipe(debounceTime(400), takeUntil(this.destroy$))
          .subscribe(newValue => {
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
    this.persistentItems$.pipe(takeUntil(this.destroy$))
      .subscribe((i) => {
        if (i && i.length > 0) this.hitsFound = true
      })

    // for pagination
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
    const req: WarEntityPreviewSearchExistingReq = {
      projectId: this.pkProject,
      searchString: this.searchString,
      pkClasses: [this.pkClass],
      limit: this.limit,
      page: this.page,
      relatedStatement: !!this.disableIfHasStatement ? this.disableIfHasStatement.relatedStatement : undefined
    }
    if (this.disableIfHasStatement) {
      this.entityPreviewApi.warEntityPreviewControllerSearchExisting(req)
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
      this.entityPreviewApi.warEntityPreviewControllerSearchExisting(req)
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

  onMoreClick(pkEntity: number) {
    this.onMore.emit(pkEntity);
  }

  searchStringChange(term: string) {
    this.searchString$.next(term)
  }
}
