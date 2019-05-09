import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, Entity, IAppState, SubstoreComponent, EntityPreview, DatChunk } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { dropLast } from 'ramda';
import { Observable, Subject, combineLatest } from 'rxjs';
import { first, takeUntil, map, filter, mergeMap } from 'rxjs/operators';
import { MentioningListAPIActions } from './api/mentioning-list.actions';
import { MentioningListAPIEpics } from './api/mentioning-list.epics';
import { MentioningList, MentioningListType, Mentioning } from './api/mentioning-list.models';
import { mentioningListReducer } from './api/mentioning-list.reducer';
import { Config, Columns } from 'ngx-easy-table/src/app/ngx-easy-table';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';

// this is not for state, only for the table view
export interface MentioningRow extends Mentioning {
  pk_entity: number;

  sourceEntity: EntityPreview;
  sectionEntity: EntityPreview;
  chunkEntity: DatChunk;
  mentionedEntity: EntityPreview;

  // stings
  sourceEntityString: string;
  sectionEntityString: string;
  chunkEntityString: string;
  mentionedEntityString: string;

  isFocusedInText: boolean;
  isFocusedInTable: boolean;

}


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: mentioningListReducer
})
@Component({
  selector: 'gv-mentioning-list',
  templateUrl: './mentioning-list.component.html',
  styleUrls: ['./mentioning-list.component.scss'],
  providers: [QuillOpsToStrPipe]
})
export class MentioningListComponent extends MentioningListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<MentioningList>;

  // path to the substore
  @Input() basePath: string[];

  @Output() close = new EventEmitter<void>();

  // select observables of substore properties
  @select() mentioningListType$: Observable<MentioningListType>;
  @select() items$: Observable<Mentioning[]>;
  @select() loading$: Observable<boolean>;
  @select() create$: Observable<boolean>;

  @select() sourceEntityPk$: Observable<number>;
  @select() sectionEntityPk$: Observable<number>;
  @select() chunkEntityPk$: Observable<number>;

  @select() mentionedEntityPk$: Observable<number>;

  sourceEntity$: Observable<EntityPreview>;
  sectionEntity$: Observable<EntityPreview>;
  chunkEntity$: Observable<DatChunk>;
  mentionedEntity$: Observable<EntityPreview>;

  formGroup: FormGroup;
  mentioningCreateCtrl;

  listData$: Observable<MentioningRow[]>;

  tableConfiguration: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: false,
    paginationEnabled: false,
    exportEnabled: false,
    clickEvent: false,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 0, // infinit
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

  columns: Columns[];
  checkedCols = new Map<string, Columns>();

  data: MentioningRow[] = [];


  constructor(
    protected rootEpics: RootEpics,
    private epics: MentioningListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private projectService: ActiveProjectService,
    fb: FormBuilder,
    private quillOpsToStr: QuillOpsToStrPipe
  ) {
    super()
    this.mentioningCreateCtrl = new FormControl(null, [Validators.required])
    this.formGroup = fb.group({ 'mentioningCreateCtrl': this.mentioningCreateCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, mentioningListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.mentioningListType$.pipe(first(), takeUntil(this.destroy$)).subscribe(type => {
      switch (type) {
        case 'ofSource':
          this.columns = [
            { key: 'mentionedEntityString', title: 'Entity', width: '50%' },
            { key: 'sectionEntityString', title: 'Section', width: '20%' },
            { key: 'chunkEntityString', title: 'Annotated Text', width: '30%' },
          ];
          break;

        case 'ofSection':
          this.columns = [
            { key: 'mentionedEntityString', title: 'Entity', width: '60%' },
            { key: 'chunkEntityString', title: 'Annotated Text', width: '40%' },
          ];
          break;

        case 'ofEntity':
          this.columns = [
            { key: 'sourceEntityString', title: 'Source', width: '50%' },
            { key: 'sectionEntityString', title: 'Section', width: '20%' },
            { key: 'chunkEntityString', title: 'Annotated Text', width: '30%' },
          ];
          break;

        default:
          break;
      }

      this.columns.forEach(c => { this.checkedCols.set(c.key, c) })
    })


    // create the entityPreview Observable
    this.sourceEntity$ = this.sourceEntityPk$.pipe(
      filter(pk => !!pk),
      mergeMap(pk => this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', pk]))
    )

    // create the entityPreview Observable
    this.sectionEntity$ = this.sectionEntityPk$.pipe(
      filter(pk => !!pk),
      mergeMap(pk => this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', pk]))
    )

    // create the InfChunk Observable
    this.chunkEntity$ = this.ngRedux.select<DatChunk>(['activeProject', 'selectedChunk'])

    // create the entityPreview Observable
    this.mentionedEntity$ = this.mentionedEntityPk$.pipe(
      filter(pk => !!pk),
      mergeMap(pk => this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', pk]))
    )

    // Get the init state
    const s = this.localStore.getState();

    // load previews
    [s.sourceEntityPk, s.sectionEntityPk, s.mentionedEntityPk].filter(i => !!i).forEach(pk => {
      this.projectService.streamEntityPreview(pk);
    })

    // init the loading
    this.load();

    // Listen to the entity pks of the sections
    this.listData$ = this.items$.pipe(filter(ms => ms !== undefined), mergeMap(ms => {

      // update the entityPreview
      ms.forEach(m => {
        if (m.fk_expression_entity) this.projectService.streamEntityPreview(m.fk_expression_entity);
        if (m.fk_source_entity) this.projectService.streamEntityPreview(m.fk_source_entity);
        if (m.fk_chunk) this.projectService.loadChunk(m.fk_chunk);
        this.projectService.streamEntityPreview(m.fk_domain_entity);
      });

      const createString = (p: EntityPreview): string => {
        if (!p) return '';
        return [(p.type_label ? p.type_label : p.class_label), p.entity_label].join(' ');
      }

      // create the observable of MentioningRow[]
      return combineLatest(ms.map(m => {
        return combineLatest(
          this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', m.fk_expression_entity]),
          this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', m.fk_source_entity]),
          this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', m.fk_domain_entity]),
          this.ngRedux.select<DatChunk>(['activeProject', 'chunks', m.fk_chunk]),
          this.ngRedux.select<number[]>(['activeProject', 'mentioningsFocusedInText']),
          this.ngRedux.select<number[]>(['activeProject', 'mentioningsFocusedInTable'])
        )
          .map(d => ({
            pk_entity: m.pk_entity,
            sectionEntity: d[0],
            sectionEntityString: createString(d[0]),
            sourceEntity: d[1],
            sourceEntityString: createString(d[1]),
            mentionedEntity: d[2],
            mentionedEntityString: createString(d[2]),
            chunkEntity: d[3],
            chunkEntityString: (!d[3] || !d[3].quill_doc) ? '' : this.quillOpsToStr.transform(d[3].quill_doc),
            isFocusedInText: (!d[4] ? false : (d[4].indexOf(m.pk_entity) > -1)),
            isFocusedInTable: (!d[5] ? false : (d[5].indexOf(m.pk_entity) > -1))
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
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRowClicked(row: MentioningRow) {
    this.projectService.mentioningsFocusedInText([]);
    if (row.isFocusedInTable) this.projectService.mentioningsFocusedInTable([])
    else this.projectService.mentioningsFocusedInTable([row.pk_entity])
  }

}
