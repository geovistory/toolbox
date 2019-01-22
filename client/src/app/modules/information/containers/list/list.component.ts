import { Component, OnDestroy, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { List } from './api/list.models';
import { ListAPIEpics } from './api/list.epics';
import { ListAPIActions } from './api/list.actions';
import { listReducer } from './api/list.reducer';
import { MentionedEntity } from 'app/modules/annotation/annotation.models';
import { MentionedEntityCtrlActions } from 'app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
import { mentionedEntityCtrlReducer } from 'app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.reducer';
import { takeUntil, first } from 'rxjs/operators';
import { EntitySearchHit } from '../information/api/information.models';

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
  @select() pkAllowedClasses$: Observable<number[]>;
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
  mentionedEntitiesCrtlStore: ObservableStore<{ [key: string]: MentionedEntity }>
  projectId: number;

  // DataUnit type (TeEn/PeIt) Filter
  typeOptions = [
    { value: null, label: 'All' },
    { value: 'peIt', label: '<i class="gv-icon gv-icon-entity"></i> Entities' },
    { value: 'teEn', label: '<i class="fa fa-star-o"></i> Events & Phenomena' }
  ]
  selectedType: { value: any, label: string } = this.typeOptions[1];

  constructor(
    protected rootEpics: RootEpics,
    private epics: ListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private mEntitiesActions: MentionedEntityCtrlActions
  ) {
    super();

    // listen to selecting entities for annotation
    this.selectingEntities$ = ngRedux.select<boolean>(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities']);

    this.mentionedEntitiesCrtlStore =
      ngRedux.configureSubStore(['sources', 'edit', 'annotationPanel', 'edit', 'mentionedEntities'], mentionedEntityCtrlReducer)


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

    this.collectionSize$.takeUntil(this.destroy$).subscribe(d => { this.collectionSize = d })

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

  selectMentionedEntity(entity: MentionedEntity) {
    this.mentionedEntitiesCrtlStore.dispatch(this.mEntitiesActions.addMentionedEntity(entity))
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
  dataUnitTypeChange(type, e) {
    if (this.selectedType !== type) {
      this.selectedType = type;
      this.searchProject();
    }
  }

}
