import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, Component, forwardRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { clone, values } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, takeUntil, map } from 'rxjs/operators';
import { ClassAndTypeFilterComponent } from '../../components/class-and-type-filter/class-and-type-filter.component';
import { ColDef } from '../../components/col-def-editor/col-def-editor.component';
import { PropertyOption } from '../../components/property-select/property-select.component';
import { QueryDetailAPIActions } from './api/query-detail.actions';
import { QueryDetailAPIEpics } from './api/query-detail.epics';
import { QueryDetail } from './api/query-detail.models';
import { queryDetailReducer, pageOfOffset, offsetOfPage } from './api/query-detail.reducer';

export type SubGroupType = 'property' | 'classAndType'
export interface FilterTreeData {
  subgroup?: SubGroupType;
  classes?: number[]
  types?: number[]
  operator?: string;
  outgoingProperties?: number[]
  ingoingProperties?: number[]
}
export class FilterTree {

  constructor(public data: FilterTreeData = {}, public children: FilterTree[] = []) {

  }
}

export interface GvQuery {
  filter: FilterTree,
  columns: ColDef[],
  limit: number,
  offset: number
}

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: queryDetailReducer
})
@Component({
  selector: 'gv-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.css']
})
export class QueryDetailComponent extends QueryDetailAPIActions implements OnInit, AfterViewInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(forwardRef(() => ClassAndTypeFilterComponent)) filterComponent: ClassAndTypeFilterComponent;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<QueryDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() showRightArea$: Observable<boolean>;
  @select() items$: Observable<any[]>;
  @select() loadedPages$: Observable<{ [pageNr: string]: boolean }>;
  @select() loadingPages$: Observable<{ [pageNr: string]: boolean }>;
  @select() fullCount$: Observable<number>;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  displayedColumns: string[];



  // filter
  filterQuery = new FilterTree();

  // cols
  colDefs = [
    new ColDef({
      ofRootTable: true,
      defaultType: 'entity_preview',
      label: 'Entity'
    }),
    new ColDef({
      ofRootTable: true,
      defaultType: 'entity_label',
      colName: 'entity_label',
      label: 'Entity Label'
    }),
    new ColDef({
      ofRootTable: true,
      defaultType: 'class_label',
      colName: 'class_label',
      label: 'Class Label'
    }),
    new ColDef({
      ofRootTable: true,
      defaultType: 'type_label',
      colName: 'type_label',
      label: 'Type Label'
    })
  ]

  // propertyOptions will be derived from the filter defined in the first step
  propertyOptions$ = new BehaviorSubject<PropertyOption[]>(null);


  // result table
  colDefsCopy: ColDef[];
  filterQueryCopy;
  readonly limit = 500;
  pending$: Observable<boolean>

  constructor(
    protected rootEpics: RootEpics,
    private epics: QueryDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private _formBuilder: FormBuilder,
    public p: ActiveProjectService
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, queryDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      descriptionCtrl: [''],
    });
    this.pending$ = this.loadingPages$.pipe(
      map(pages => !!values(pages).find(loading => loading === true))
    )

  }

  ngAfterViewInit() {
    // get the propertyOptions from the filter defined in the first step
    this.filterComponent.propertyOptions$.pipe(
      filter(o => o !== null),
      takeUntil(this.destroy$)
    ).subscribe(x =>
      this.propertyOptions$.next(x)
    );

  }

  onRun() {
    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pk => {
      this.showRightArea();
      this.colDefsCopy = clone(this.colDefs)
      this.filterQueryCopy = clone(this.filterQuery)
      this.displayedColumns = this.colDefsCopy.map(col => col.label);
      this.runInit(pk, {
        filter: this.filterQueryCopy,
        columns: this.colDefsCopy,
        limit: this.limit,
        offset: 0
      });
    })
  }

  onScroll(range: { start: number, end: number }) {
    const offset = this.nextOffset(range);
    if (offset !== null) {
      console.log(`run offset: ${offset} for start ${range.start} and end ${range.end}`)
      this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pk => {
        this.run(pk, {
          filter: this.filterQueryCopy,
          columns: this.colDefsCopy,
          limit: this.limit,
          offset: offset
        });
      })
    }
  }

  nextOffset(range: { start: number, end: number }): number {

    if (range.start === 0 && range.end === 0) return null;

    const pageBefore = pageOfOffset(range.start, this.limit)
    const pageAfter = pageOfOffset(range.end, this.limit)
    const loadedPages = this.localStore.getState().loadedPages;
    const loadingPages = this.localStore.getState().loadingPages;

    return (!loadedPages[pageAfter] && !loadingPages[pageAfter]) ? offsetOfPage(pageAfter, this.limit) :
      (!loadedPages[pageBefore] && !loadingPages[pageBefore]) ? offsetOfPage(pageBefore, this.limit) : null;
  }


  onSave() {
    
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
