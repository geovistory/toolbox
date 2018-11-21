import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ProjectCrm, ComConfig, InfEntityAssociation, PeItDetail, U, ClassConfig, InfPersistentItem, ActiveProjectService, DataUnitPreview, DataUnitPreviewList } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { SectionList } from './api/section-list.models';
import { SectionListAPIEpics } from './api/section-list.epics';
import { SectionListAPIActions } from './api/section-list.actions';
import { sectionListReducer } from './api/section-list.reducer';
import { DfhConfig } from '../../shared/dfh-config';
import { CreateOrAddPeIt } from '../create-or-add-pe-it/api/create-or-add-pe-it.models';
import { ClassAndTypePk } from '../class-and-type-selector/api/class-and-type-selector.models';
import { createEntityAssociationDetail } from 'app/core/state/services/state-creator';
import { dropLast } from 'ramda';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, first, map, mergeMap, filter } from 'rxjs/operators';
import { EntityAssociationList } from 'app/core/state/models/entity-association-list';
import * as Config from '../../../../../../../common/config/Config';
import { Columns } from 'ngx-easy-table/src/app/ngx-easy-table';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: sectionListReducer
})
@Component({
  selector: 'gv-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent extends SectionListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<SectionList>;

  // path to the substore
  @Input() basePath: string[];

  // flag to say if the component should init the list via Ajax request or not.
  @Input() loadListOnInit: boolean;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() create$: Observable<CreateOrAddPeIt>;
  @select() pkSections$: Observable<number[]>;

  pkProject$: Observable<number>
  crm$: Observable<ProjectCrm>
  parentPeItDetail$: Observable<PeItDetail>;

  pkClassesOfAddBtn = [DfhConfig.CLASS_PK_EXPRESSION]
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  pkRangeEntity: number;

  dataUnitPreviews$: Observable<DataUnitPreviewList>;
  listData$: Observable<DataUnitPreview[]>;

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
    { key: 'type_label', title: 'Type' },
    { key: 'entity_label', orderBy: 'asc', title: 'Reference' },
    { key: '', title: '', orderEnabled: false, searchEnabled: false },
  ];

  data = [];

  constructor(
    protected rootEpics: RootEpics,
    private epics: SectionListAPIEpics,
    private activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    private router: Router,
    private projectService: ActiveProjectService
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sectionListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.pkProject$ = this.ngRedux.select(['activeProject', 'pk_project']);
    this.crm$ = this.ngRedux.select(['activeProject', 'crm']);
    this.parentPeItDetail$ = this.ngRedux.select(dropLast(1, this.basePath));
    this.dataUnitPreviews$ = this.ngRedux.select(['activeProject', 'dataUnitPreviews']);

    if (this.loadListOnInit) {
      this.loadList()
    }

  }

  loadList() {
    combineLatest(this.pkProject$, this.parentPeItDetail$, this.crm$)
      .pipe(
        first((d) => (
          !!d[0] && (!!d[1] && d[1].pkEntity) && !!d[2]
        )),
        takeUntil(this.destroy$)
      ).subscribe((d) => {
        const pkProject = d[0], parentPeItDetail = d[1], crm = d[2];
        this.pkRangeEntity = parentPeItDetail.pkEntity || parentPeItDetail.peIt.pk_entity;
        this.load(pkProject, this.pkRangeEntity, DfhConfig.PROPERTY_PK_R41_HAS_REP_MANIFESTATION_PRODUCT_TYPE, crm)
      })

    this.pkSections$.pipe(takeUntil(this.destroy$)).subscribe(pks => {
    })

    this.listData$ = this.pkSections$.pipe(filter(pks => pks !== undefined), mergeMap(pks => {
      // update the dataUnitPreview
      pks.forEach(pk => { this.projectService.loadDataUnitPreview(pk); });

      // create the observable of dataPreviewArray
      return combineLatest(pks.map(pk => this.ngRedux.select<DataUnitPreview>(['activeProject', 'dataUnitPreviews', pk])));

    }))

    this.listData$.takeUntil(this.destroy$).subscribe(d => this.data = d);
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onAdd(d: ClassAndTypePk) {

    // Type of the domain entity
    const domain_pe_it = {
      domain_entity_associations: [{
        fk_property: Config.PK_CLASS_PK_HAS_TYPE_MAP[d.pkClass],
        fk_range_entity: d.pkType
      }]
    } as InfPersistentItem;

    this.startCreate(
      createEntityAssociationDetail(
        { isOutgoing: false },
        {
          fk_property: DfhConfig.PROPERTY_PK_R41_HAS_REP_MANIFESTATION_PRODUCT_TYPE,
          fk_range_entity: this.pkRangeEntity,
          domain_pe_it
        } as InfEntityAssociation,
        this.ngRedux.getState().activeProject.crm,
        { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_CREATE }
      )
    )
  }

  openSection(pkEntity: number) {
    this.router.navigate(['section', pkEntity], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
  }
  getClassConfig(fkClass: number): Observable<ClassConfig> {
    return this.crm$.map((crm) => (crm.classes[fkClass]))
  }
}
