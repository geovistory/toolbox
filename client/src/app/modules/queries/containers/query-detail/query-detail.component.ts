import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, Component, forwardRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, ProQuery, IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { clone, values } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { ClassAndTypeFilterComponent } from '../../components/class-and-type-filter/class-and-type-filter.component';
import { ColDef } from '../../components/col-def-editor/col-def-editor.component';
import { PropertyOption } from '../../components/property-select/property-select.component';
import { QueryDetailAPIActions } from './api/query-detail.actions';
import { QueryDetailAPIEpics } from './api/query-detail.epics';
import { FileType, QueryDetail } from './api/query-detail.models';
import { offsetOfPage, pageOfOffset, queryDetailReducer } from './api/query-detail.reducer';
import { ClassAndTypeSelectModel } from '../../components/class-and-type-select/class-and-type-select.component';

export type SubGroupType = 'property' | 'classAndType'
export interface FilterTreeData {
  subgroup?: SubGroupType;
  operator?: string;

  // inherited from ClassesAndTypes:
  classes?: number[]
  types?: number[]

  // inherited from PropertySelectModel:
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
  limit?: number,
  offset?: number
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
  @Input() pkEntity: number;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() comQuery$: Observable<ProQuery>;

  @select() showRightArea$: Observable<boolean>;
  @select() queryResults$: Observable<any[]>;
  @select() loadedPages$: Observable<{ [pageNr: string]: boolean }>;
  @select() loadingPages$: Observable<{ [pageNr: string]: boolean }>;
  @select() fullCount$: Observable<number>;
  @select() deleted$: Observable<boolean>;


  firstFormGroup: FormGroup;
  filterCtrl: FormControl;

  secondFormGroup: FormGroup;
  columnsCtrl: FormControl;

  thirdFormGroup: FormGroup;
  nameCtrl = new FormControl(null, Validators.required)
  descriptionCtrl = new FormControl(null)

  displayedColumns: string[];


  // propertyOptions will be derived from the filter defined in the first step
  propertyOptions$ = new BehaviorSubject<PropertyOption[]>(null);
  classesAndTypes$ = new BehaviorSubject<ClassAndTypeSelectModel>(null);



  // result table
  colDefsCopy: ColDef[];
  filterQueryCopy;
  readonly limit = 500;
  pending$: Observable<boolean>

  constructor(
    protected rootEpics: RootEpics,
    private epics: QueryDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    public p: ActiveProjectService
  ) {
    super()

    // Prepare first form group
    this.filterCtrl = new FormControl(new FilterTree()) // TODO add validato
    this.firstFormGroup = this.fb.group({
      filterCtrl: this.filterCtrl
    });

    // Prepare second form group
    this.columnsCtrl = new FormControl([
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
    ]) // TODO add validato
    this.secondFormGroup = this.fb.group({
      columnsContro: this.columnsCtrl
    });

    // Prepare third form group
    this.thirdFormGroup = this.fb.group({
      nameCtrl: this.nameCtrl,
      descriptionCtrl: this.descriptionCtrl,
    });
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, queryDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (this.pkEntity) this.loadExistingQuery();
    if (!this.pkEntity) this.setTabTitle('New Query*');

    this.pending$ = this.loadingPages$.pipe(
      map(pages => !!values(pages).find(loading => loading === true))
    )

    this.comQuery$.pipe(filter(q => !!q), takeUntil(this.destroy$)).subscribe(comQuery => {
      this.filterCtrl.setValue(comQuery.query.filter)
      this.columnsCtrl.setValue(comQuery.query.columns);
      this.nameCtrl.setValue(comQuery.name);
      this.descriptionCtrl.setValue(comQuery.description);
    })

  }

  ngAfterViewInit() {
    // get the propertyOptions from the filter defined in the first step
    this.filterComponent.propertyOptions$.pipe(
      filter(o => o !== null),
      takeUntil(this.destroy$)
    ).subscribe(x =>
      this.propertyOptions$.next(x)
    );

    // get the selectedClassesAndTypes from the filter defined in the first step
    this.filterComponent.selectedClassesAndTypes$.pipe(
      filter(o => o !== null),
      takeUntil(this.destroy$)
    ).subscribe(x =>
      this.classesAndTypes$.next(x)
    );

  }

  // if the query detail is opened from existing query, load it
  loadExistingQuery() {
    this.p.pkProject$.pipe(first(pk => !!pk)).subscribe(p => this.load(p, this.pkEntity));
  }

  onRun() {
    if (this.firstFormGroup.invalid) {
      return values(this.firstFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    if (this.secondFormGroup.invalid) {
      return values(this.secondFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pk => {
      this.showRightArea();
      this.colDefsCopy = clone(this.columnsCtrl.value)
      this.filterQueryCopy = clone(this.filterCtrl.value)
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
    const pageAfter = pageOfOffset(range.end - 1, this.limit)
    const loadedPages = this.localStore.getState().loadedPages;
    const loadingPages = this.localStore.getState().loadingPages;

    return (!loadedPages[pageAfter] && !loadingPages[pageAfter]) ? offsetOfPage(pageAfter, this.limit) :
      (!loadedPages[pageBefore] && !loadingPages[pageBefore]) ? offsetOfPage(pageBefore, this.limit) : null;
  }

  composeComQuery(fkProject: number): ProQuery {
    return {
      fk_project: fkProject,
      name: this.thirdFormGroup.controls.nameCtrl.value,
      description: this.thirdFormGroup.controls.descriptionCtrl.value,
      query: {
        filter: this.filterCtrl.value,
        columns: this.columnsCtrl.value
      }
    } as ProQuery
  }


  onSave() {
    const s = this.localStore.getState();
    let pkEntity;

    if (!s.deleted && s.comQuery && s.comQuery.pk_entity) {
      pkEntity = s.comQuery.pk_entity
    }

    this.persist(pkEntity);
  }

  onSaveAs() {
    this.persist()
  }

  persist(pkEntity?: number) {

    let valid = true;
    if (this.firstFormGroup.invalid) {
      values(this.firstFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
      valid = false;
    }

    if (this.secondFormGroup.invalid) {
      values(this.secondFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
      valid = false;
    }

    if (this.thirdFormGroup.invalid) {
      values(this.thirdFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
      valid = false;
    }

    if (valid) {
      this.p.pkProject$.subscribe(p => {

        // create the query definition object
        const q = this.composeComQuery(p)

        // call action to save query
        this.save(q, pkEntity);

      }).unsubscribe()
    }

  }

  onDelete() {
    const pkEntity = (this.localStore.getState().comQuery || { pk_entity: undefined }).pk_entity
    this.delete(pkEntity)
  }

  onDownload(fileType: FileType) {
    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pkProject => {

      this.colDefsCopy = clone(this.columnsCtrl.value)
      this.filterQueryCopy = clone(this.filterCtrl.value)
      this.displayedColumns = this.colDefsCopy.map(col => col.label);

      this.download(
        pkProject,
        {
          filter: this.filterQueryCopy,
          columns: this.colDefsCopy
        },
        fileType
      );
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}