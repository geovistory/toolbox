import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SubstoreComponent } from 'projects/app-toolbox/src/app/core';
import { RootEpics } from 'projects/app-toolbox/src/app/core/redux-store/root-epics';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ListAPIActions } from '../../api/list.actions';
import { ListAPIEpics } from '../../api/list.epics';
import { List } from '../../api/list.models';
import { listReducer } from '../../api/list.reducer';
import { EntitySearchHit } from "@kleiolab/lib-sdk-lb4";
import { IAppState } from 'projects/app-toolbox/src/app/core/redux-store/model';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: listReducer
})
@Component({
  selector: 'gv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends ListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<List>;

  // path to the substore
  @Input() basePath: string[];

  @Input() showTeEnPeItFilter: boolean;

  // the classes for which this list can search
  @Input() pkAllowedClasses$: Observable<number[]>;
  pkAllowedClasses: number[];


  // emits pk_entity of click
  @Output() onOpen = new EventEmitter<number>();

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<EntitySearchHit[]>;
  @select() collectionSize$: Observable<number>;

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
    { value: null, label: '<i class="gv-icon gv-icon-entity"></i> All' },
  ]
  selectedType: { value: any, label: string } = this.typeOptions[0];

  constructor(
    protected rootEpics: RootEpics,
    private epics: ListAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super();

    // listen to selecting entities for annotation
    this.selectingEntities$ = ngRedux.select<boolean>(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities']);


  }

  getBasePath = () => this.basePath;


  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, listReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest(
      this.ngRedux.select<number>(['activeProject', 'pk_project']),
      this.pkAllowedClasses$
    ).pipe(
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
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  searchProject() {
    if (this.projectId && this.pkAllowedClasses) {
      this.search(this.projectId, this.searchString, this.pkAllowedClasses, this.selectedType.value, this.limit, this.page)
    }
  }

  // selectMentionedEntity(entity: MentionedEntity) {
  //   this.mentionedEntitiesCrtlStore.dispatch(this.mEntitiesActions.addMentionedEntity(entity))
  // }

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
