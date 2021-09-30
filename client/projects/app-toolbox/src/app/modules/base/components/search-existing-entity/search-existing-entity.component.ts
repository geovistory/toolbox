import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { EntitySearchHit, SearchExistingRelatedStatement, WarEntityPreviewControllerService, WarEntityPreviewSearchExistingReq } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { HitPreview } from '../entity-add-existing-hit/entity-add-existing-hit.component';

export interface DisableIfHasStatement {
  sourceClassLabel: string
  propertyLabel: string
  relatedStatement: SearchExistingRelatedStatement
  maxQuantity: number
}

export enum SearchExistingEntityListMode {
  mode1 = 'mode1',
  mode2 = 'mode2'
}

export enum SearchScope {
  everywhere = 'everywhere',
  inProject = 'in project',
  // outsideProject = 'outside project'
}

@Component({
  selector: 'gv-search-existing-entity',
  templateUrl: './search-existing-entity.component.html',
  styleUrls: ['./search-existing-entity.component.scss']
})
export class SearchExistingEntityComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  pkProject: number;
  pkNamespace: number;
  className: string;

  @Input() pkClass: number;
  @Input() mode: string = SearchExistingEntityListMode.mode1;
  @Input() searchString$: Subject<string>; // string or '' (can be used to filter the list from the outside)
  @Input() disableIfHasStatement: DisableIfHasStatement;

  @Output() onMore = new EventEmitter<HitPreview>();
  @Output() onBack = new EventEmitter();

  // select observables of substore properties
  loading$ = new BehaviorSubject<boolean>(false);

  // Hits
  hits$: Observable<HitPreview[]>;

  // For search
  scope$ = new BehaviorSubject<SearchScope>(SearchScope.everywhere);

  // Pagination
  collectionSize: number; // number of search results
  collectionSize$: Observable<number>
  limit = 5; // max number of results on a page
  page$ = new BehaviorSubject<number>(1);

  // current selection
  selected: number;

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


    // reset the page on each change of pkProject, searchString and/or scope if we are not on page 1
    const filterParams$ = combineLatest([this.p.pkProject$, this.searchString$.pipe(debounceTime(400)), this.scope$]).pipe(
      tap(() => { if (this.page$.value !== 1) this.page$.next(1) })
    )

    // all params needed for api call
    const params$ = combineLatest([filterParams$, this.page$]).pipe(
      debounceTime(0),
      distinctUntilChanged(equals), // because of filterParams$ and page$ can both emit at the same time (see l.86)
      map(([params, page]) => ({
        pkProject: params[0],
        searchString: params[1],
        scope: params[2],
        page
      }))
    )

    // the api call
    const result$ = params$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(({ pkProject, searchString, page, scope }) => {
        const req: WarEntityPreviewSearchExistingReq = {
          projectId: pkProject,
          searchString: searchString.trim(),
          pkClasses: [this.pkClass],
          limit: this.limit,
          page: page,
          relatedStatement: !!this.disableIfHasStatement ? this.disableIfHasStatement.relatedStatement : undefined,
          scope
        }
        return this.entityPreviewApi.warEntityPreviewControllerSearchExisting(req);
      }),
      map(resp => {
        this.loading$.next(false)
        if (this.disableIfHasStatement) {
          const res: EntitySearchHit[] = resp.data;
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
          return {
            hits,
            collectionSize: resp.totalCount
          }
        } else {
          return {
            hits: resp.data,
            collectionSize: resp.totalCount
          }
        }
      }),
      shareReplay()
    )

    this.hits$ = result$.pipe(map(obj => obj.hits), startWith([]))
    this.collectionSize$ = result$.pipe(map(obj => obj.collectionSize), startWith(0))
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  pageChange(event: PageEvent) {
    this.page$.next(event.pageIndex + 1);
  }

  onMoreClick(hit: HitPreview) {
    this.selected = hit.pk_entity;
    this.onMore.emit(hit);
  }

  onBackClick() {
    this.selected = -1;
    this.onBack.emit();
  }

  searchStringChange(term: string) {
    this.searchString$.next(term)
  }

  changeScope(value: SearchScope) {
    if (value != this.scope$.value) this.page$.next(1)
    this.scope$.next(value);
  }
}
