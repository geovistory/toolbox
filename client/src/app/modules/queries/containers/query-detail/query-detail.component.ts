import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { AfterViewInit, Component, forwardRef, HostBinding, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActiveProjectService, ProQuery, IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { clone, values } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, first, map, takeUntil, switchMap } from 'rxjs/operators';
import { ClassAndTypeFilterComponent } from '../../components/class-and-type-filter/class-and-type-filter.component';
import { ColDef } from "../../components/col-def-editor/ColDef";
import { PropertyOption } from '../../components/property-select/property-select.component';
import { QueryDetailAPIActions } from './api/query-detail.actions';
import { QueryDetailAPIEpics } from './api/query-detail.epics';
import { FileType, QueryDetail } from './api/query-detail.models';
import { offsetOfPage, pageOfOffset, queryDetailReducer } from './api/query-detail.reducer';
import { ClassAndTypeSelectModel } from '../../components/class-and-type-select/class-and-type-select.component';
import { TabLayoutComponentInterface } from '../../../projects/containers/project-edit/project-edit.component';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { FilterTree } from './FilterTree';
import { QueryFilterComponent, FilterDefinition } from '../../components/query-filter/query-filter.component';
import { InformationPipesService } from 'app/modules/information/new-services/information-pipes.service';


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
export class QueryDetailComponent extends QueryDetailAPIActions implements OnInit, AfterViewInit, OnDestroy, SubstoreComponent, TabLayoutComponentInterface {


  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(forwardRef(() => QueryFilterComponent), { static: true }) filterComponent: QueryFilterComponent;

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
  filterCtrl: AbstractControl;
  filter$ = new BehaviorSubject<FilterDefinition>(null);
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

  t: TabLayout;

  filterDef$ = new Subject()
  constructor(
    protected rootEpics: RootEpics,
    private epics: QueryDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
    private i: InformationPipesService

  ) {
    super()

    // Prepare first form group
    // this.filterCtrl = new FormControl(new FilterTree()) // TODO add validato
    this.firstFormGroup = this.fb.group({});

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

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
    this.t.defaultSizeRight = 50;

    if (this.pkEntity) this.loadExistingQuery();
    if (!this.pkEntity) {
      this.t.setTabTitle('New Query*');
      this.filterDef$ = new BehaviorSubject(undefined)
    }

    this.pending$ = this.loadingPages$.pipe(
      map(pages => !!values(pages).find(loading => loading === true))
    )

    this.filterComponent.formFactory$.pipe(takeUntil(this.destroy$)).subscribe(f => {
      this.filterCtrl = f.formGroup;
      this.firstFormGroup.addControl('filterCtrl', this.filterCtrl)
    })

    this.comQuery$.pipe(filter(q => !!q), takeUntil(this.destroy$)).subscribe(comQuery => {
      this.filterDef$.next(comQuery.query.filter)
      this.columnsCtrl.setValue(comQuery.query.columns);
      this.nameCtrl.setValue(comQuery.name);
      this.descriptionCtrl.setValue(comQuery.description);
      this.t.setTabTitle(comQuery.name);
    })

  }

  ngAfterViewInit() {


    // get the selectedClassesAndTypes from the filter defined in the first step
    this.filterComponent.formFactory$.pipe(
      filter(o => o !== null),
      switchMap(f => f.formGroupFactory.valueChanges$),
      takeUntil(this.destroy$)
    ).subscribe((x: FilterDefinition) => {
      this.filter$.next(x)
      this.classesAndTypes$.next(x.data)
    });
    const propertyOptions$: Observable<PropertyOption[]> = this.i.getPropertyOptions$(this.classesAndTypes$)
    propertyOptions$.pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.propertyOptions$.next(x)
      });

  }

  // if the query detail is opened from existing query, load it
  loadExistingQuery() {
    this.p.pkProject$.pipe(first(pk => !!pk)).subscribe(p => this.load(p, this.pkEntity));
  }

  onRun() {
    if (this.firstFormGroup.invalid) {
      return this.filterComponent.markAllAsTouched();
    }

    if (this.secondFormGroup.invalid) {
      return values(this.secondFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pk => {
      this.t.setShowRightArea(true);
      this.colDefsCopy = clone(this.columnsCtrl.value)
      this.filterQueryCopy = clone(this.filter$.value)
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
        filter: this.filter$.value,
        columns: this.columnsCtrl.value
      }
    } as ProQuery
  }


  onSave() {
    combineLatest(this.deleted$, this.comQuery$).pipe(first(), takeUntil(this.destroy$)).subscribe(([deleted, comQuery]) => {
      let pkEntity;
      if (!deleted && comQuery && comQuery.pk_entity) {
        pkEntity = comQuery.pk_entity
      }
      this.persist(pkEntity);
    })
  }

  onSaveAs() {
    this.persist()
  }

  persist(pkEntity?: number) {

    let valid = true;
    if (this.firstFormGroup.invalid) {
      this.filterComponent.markAllAsTouched();
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
    this.comQuery$.pipe(first(), takeUntil(this.destroy$)).subscribe((item) => {
      this.delete(item.pk_entity)
    })
  }

  onDownload(fileType: FileType) {
    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pkProject => {

      this.colDefsCopy = clone(this.columnsCtrl.value)
      this.filterQueryCopy = clone(this.filter$.value)
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
