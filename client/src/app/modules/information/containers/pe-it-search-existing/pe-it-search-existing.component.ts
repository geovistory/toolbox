import { Component, OnDestroy, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, InfPersistentItem, ClassConfig } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { PeItSearchExisting } from './api/pe-it-search-existing.models';
import { PeItSearchExistingAPIEpics } from './api/pe-it-search-existing.epics';
import { PeItSearchExistingAPIActions } from './api/pe-it-search-existing.actions';
import { peItSearchExistingReducer } from './api/pe-it-search-existing.reducer';
import { debounceTime } from 'rxjs/operators';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: peItSearchExistingReducer
})
@Component({
  selector: 'gv-pe-it-search-existing',
  templateUrl: './pe-it-search-existing.component.html',
  styleUrls: ['./pe-it-search-existing.component.css']
})
export class PeItSearchExistingComponent extends PeItSearchExistingAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<PeItSearchExisting>;

  // path to the substore
  @Input() basePath: string[];

  @Input() pkClass: number;

  @Input() searchString$: Observable<string>;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  // Hits
  @select() persistentItems$: Observable<InfPersistentItem[]>;

  //
  @select() collectionSize$: Observable<number>;


  @Output() onAddExisting = new EventEmitter<number>();
  @Output() onOpenExisting = new EventEmitter<number>();

  // Search
  searchString = '';
  minSearchStringLength = 2;

  // Pagination
  collectionSize: number; // number of search results
  limit = 3; // max number of results on a page
  page = 1; // current page

  classConfig: ClassConfig;

  hitsFound = false;

  constructor(
    protected rootEpics: RootEpics,
    private epics: PeItSearchExistingAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, peItSearchExistingReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (!this.pkClass) throw Error('please provide a pkClass')

    this.classConfig = this.ngRedux.getState().activeProject.crm.classes[this.pkClass];

    this.searchString$.pipe(
      debounceTime(400)
    ).subscribe(newValue => {
      this.searchString = newValue;
      if (newValue.length >= this.minSearchStringLength) {
        this.page = 1;
        this.search(this.searchString, this.limit, this.page, this.pkClass);
      } else {
        this.searchFailed();
      }
    });

    // set hitsFound true, once there are some hits
    this.persistentItems$.takeUntil(this.destroy$).subscribe((i) => {
      if (i && i.length > 0) this.hitsFound = true
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  pageChange() {
    this.search(this.searchString, this.limit, this.page, this.pkClass);
  }

  hitsFrom() {
    return (this.limit * (this.page - 1)) + 1;
  }
  hitsTo() {
    const upper = (this.limit * (this.page - 1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }


  onAdd(pkEntity: number) {
    this.onAddExisting.emit(pkEntity)
  }

  onOpen(pkEntity: number) {
    this.onOpenExisting.emit(pkEntity)
  }


}
