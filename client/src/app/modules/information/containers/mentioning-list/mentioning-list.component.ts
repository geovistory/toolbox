import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, DataUnit, IAppState, SubstoreComponent, DataUnitPreview, InfChunk } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { dropLast } from 'ramda';
import { Observable, Subject, combineLatest } from 'rxjs';
import { first, takeUntil, map, filter, mergeMap } from 'rxjs/operators';
import { MentioningListAPIActions } from './api/mentioning-list.actions';
import { MentioningListAPIEpics } from './api/mentioning-list.epics';
import { MentioningList, MentioningListType, Mentioning } from './api/mentioning-list.models';
import { mentioningListReducer } from './api/mentioning-list.reducer';
import { Config, Columns } from 'ngx-easy-table/src/app/ngx-easy-table';

// this is not for state, only for the table view
export interface MentioningRow extends Mentioning {

  sourceEntity: DataUnitPreview;
  sectionEntity: DataUnitPreview;
  chunkEntity: InfChunk;
  mentionedEntity: DataUnitPreview;

  // stings
  sourceEntityString: string;
  sectionEntityString: string;
  chunkEntityString: string;
  mentionedEntityString: string;

}


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: mentioningListReducer
})
@Component({
  selector: 'gv-mentioning-list',
  templateUrl: './mentioning-list.component.html',
  styleUrls: ['./mentioning-list.component.css']
})
export class MentioningListComponent extends MentioningListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<MentioningList>;

  // path to the substore
  @Input() basePath: string[];


  // select observables of substore properties
  @select() mentioningListType$: Observable<MentioningListType>;
  @select() items$: Observable<Mentioning[]>;
  @select() loading$: Observable<boolean>;
  @select() create$: Observable<boolean>;

  @select() sourceEntityPk$: Observable<number>;
  @select() sectionEntityPk$: Observable<number>;
  @select() chunkEntityPk$: Observable<number>;
  @select() mentionedEntityPk$: Observable<number>;


  sourceEntity$: Observable<DataUnitPreview>;
  sectionEntity$: Observable<DataUnitPreview>;
  chunkEntity$: Observable<InfChunk>;
  mentionedEntity$: Observable<DataUnitPreview>;

  formGroup: FormGroup;
  mentioningCreateCtrl;

  listData$: Observable<MentioningRow[]>;

  tableConfiguration: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    resizeColumn: false,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    tableLayout: {
      style: 'tiny', // or big or normal
      theme: 'normal', // or dark
      borderless: false,
      hover: true,
      striped: true,
    }
  };

  columns: Columns[] = [
    { key: 'mentionedEntityString', title: 'Mentioned Entity' },
    { key: 'sourceEntityString', title: 'Source' },
    { key: 'sectionEntityString', title: 'Section' }
  ];

  data: MentioningRow[] = [];


  constructor(
    protected rootEpics: RootEpics,
    private epics: MentioningListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private projectService: ActiveProjectService,
    fb: FormBuilder
  ) {
    super()
    this.mentioningCreateCtrl = new FormControl(null, [Validators.required])
    this.formGroup = fb.group({ 'mentioningCreateCtrl': this.mentioningCreateCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, mentioningListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.formGroup.valueChanges.takeUntil(this.destroy$).subscribe(vals => {

    })

    // this.parentDataUnit$ = this.ngRedux.select([...dropLast(1, this.basePath), 'pkEntity']);

    // create the dataUnitPreview Observable
    this.sourceEntity$ = this.sourceEntityPk$.pipe(
      filter(pk => !!pk),
      mergeMap(pk => this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', pk]))
    )

    // create the dataUnitPreview Observable
    this.sectionEntity$ = this.sectionEntityPk$.pipe(
      filter(pk => !!pk),
      mergeMap(pk => this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', pk]))
    )

    // create the dataUnitPreview Observable
    this.mentionedEntity$ = this.mentionedEntityPk$.pipe(
      filter(pk => !!pk),
      mergeMap(pk => this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', pk]))
    )

    // Get the init state
    const s = this.localStore.getState();

    // load previews
    [s.sourceEntityPk, s.sectionEntityPk, s.mentionedEntityPk].filter(i => !!i).forEach(pk => {
      this.projectService.loadDataUnitPreview(pk);
    })

    // init the loading
    this.load();

    // Listen to the entity pks of the sections
    this.listData$ = this.items$.pipe(filter(ms => ms !== undefined), mergeMap(ms => {

      // update the dataUnitPreview
      ms.forEach(m => {
        if (m.fk_expression_entity) this.projectService.loadDataUnitPreview(m.fk_expression_entity);
        if (m.fk_source_entity) this.projectService.loadDataUnitPreview(m.fk_source_entity);
        this.projectService.loadDataUnitPreview(m.fk_domain_entity);
      });

      const createString = (p: DataUnitPreview): string => {
        if (!p) return '';
        return [p.type_label, p.entity_label].join(' ');
      }

      // create the observable of MentioningRow[]
      return combineLatest(ms.map(m => {
        return combineLatest(
          this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', m.fk_expression_entity]),
          this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', m.fk_source_entity]),
          this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', m.fk_domain_entity])
        ).map(d => ({
          chunkEntity: null,
          chunkEntityString: null,
          sectionEntity: d[0],
          sectionEntityString: createString(d[0]),
          sourceEntity: d[1],
          sourceEntityString: createString(d[1]),
          mentionedEntity: d[2],
          mentionedEntityString: createString(d[2]),
        } as MentioningRow))
      }));

    }))

    this.listData$.takeUntil(this.destroy$).subscribe(d => this.data = d);



  }

  submit() {
    if (this.formGroup.valid) {
      this.create(this.mentioningCreateCtrl.value)
    }
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
