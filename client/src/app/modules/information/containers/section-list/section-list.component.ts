import { Component, OnDestroy, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ProjectCrm, ComConfig, InfEntityAssociation, PeItDetail, U, ClassConfig, InfPersistentItem, ActiveProjectService, EntityPreview, EntityPreviewList } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { SectionList } from './api/section-list.models';
import { SectionListAPIEpics } from './api/section-list.epics';
import { SectionListAPIActions } from './api/section-list.actions';
import { sectionListReducer } from './api/section-list.reducer';
import { DfhConfig } from '../../shared/dfh-config';
import { CreateOrAddEntity } from '../create-or-add-entity/api/create-or-add-entity.models';
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

  @Output() close = new EventEmitter<void>();

  // path to the substore
  @Input() basePath: string[];

  // flag to say if the component should init the list via Ajax request or not.
  @Input() loadListOnInit: boolean;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() create$: Observable<CreateOrAddEntity>;
  @select() pkSections$: Observable<number[]>;

  pkProject$: Observable<number>
  crm$: Observable<ProjectCrm>
  parentPeItDetail$: Observable<PeItDetail>;
  parentFkClass: number;

  pkClassesOfAddBtn = [DfhConfig.CLASS_PK_EXPRESSION]
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  pkRangeEntity: number;
  pkDomainEntity: number;

  entityPreviews$: Observable<EntityPreviewList>;
  listData$: Observable<EntityPreview[]>;

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
    rows: 0,
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
    { key: '', title: '', orderEnabled: false, searchEnabled: false, width: '10%' },
    { key: 'type_label', title: 'Type', width: '35%' },
    { key: 'entity_label', orderBy: 'asc', title: 'Reference', width: '35%' },
    { key: '', title: '', orderEnabled: false, searchEnabled: false, width: '20%' },
  ];

  data = [];

  constructor(
    protected rootEpics: RootEpics,
    private epics: SectionListAPIEpics,
    private activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    private router: Router,
    public p: ActiveProjectService
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
    this.entityPreviews$ = this.ngRedux.select(['activeProject', 'entityPreviews']);

    this.parentPeItDetail$.pipe(filter(d => (!!d && !!d.fkClass)), takeUntil(this.destroy$)).subscribe(parentPeItDetail => {
      this.parentFkClass = parentPeItDetail.fkClass;
    })

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
        this.parentFkClass = parentPeItDetail.fkClass;

        // if parent is a Manifestation Singleton
        if (this.isManifestationSingleton()) {
          this.pkDomainEntity = parentPeItDetail.pkEntity || parentPeItDetail.peIt.pk_entity;
          this.load(pkProject, this.pkDomainEntity, DfhConfig.PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR, null)

          // if parent is a Manifestation Product Type
        } else if (this.isManifestationProductType()) {
          this.pkRangeEntity = parentPeItDetail.pkEntity || parentPeItDetail.peIt.pk_entity;
          this.load(pkProject, null, DfhConfig.PROPERTY_PK_R4_CARRIERS_PROVIDED_BY, this.pkRangeEntity)
        }
      })

    // Listen to the entity pks of the sections
    this.listData$ = this.pkSections$.pipe(filter(pks => pks !== undefined), mergeMap(pks => {

      // update the entityPreview
      pks.forEach(pk => { this.p.streamEntityPreview(pk); });

      // create the observable of dataPreviewArray
      return combineLatest(pks.map(pk => this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', pk])));

    }))

    this.listData$.takeUntil(this.destroy$).subscribe(d => this.data = d);
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onAdd(d: ClassAndTypePk) {

    // Type of the new entity
    const newPeIt = {
      domain_entity_associations: [{
        fk_property: Config.PK_CLASS_PK_HAS_TYPE_MAP[d.pkClass],
        fk_info_range: d.pkType
      }]
    } as InfPersistentItem;

    let newEntityAssociaction;

    if (this.isOutgoing()) {
      newEntityAssociaction = {
        pk_entity: undefined,
        fk_info_domain: this.pkDomainEntity,
        fk_property: DfhConfig.PROPERTY_PK_R42_IS_REP_MANIFESTATION_SINGLETON_FOR,
        fk_info_range: undefined,
        range_pe_it: newPeIt
      } as InfEntityAssociation
    } else if (this.isOutgoing() === false) {
      newEntityAssociaction = {
        pk_entity: undefined,
        fk_info_domain: undefined,
        domain_pe_it: newPeIt,
        fk_property: DfhConfig.PROPERTY_PK_R4_CARRIERS_PROVIDED_BY,
        fk_info_range: this.pkRangeEntity
      } as InfEntityAssociation
    } else {
      throw Error('Oops, parent class must be F3 or F4.')
    }

    this.startCreate(
      createEntityAssociationDetail(
        { isOutgoing: this.isOutgoing() },
        newEntityAssociaction,
        this.ngRedux.getState().activeProject.crm,
        { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_CREATE }
      )
    )
  }

  onSectionCreated() {
    this.created();
    this.loadList();
  }

  openSection(pkEntity) {
    this.p.addTab({
      active: true,
      component: 'section-detail',
      icon: 'section',
      pathSegment: 'sectionDetails',
      data: {
        pkEntity
      }
    })
  }

  getClassConfig(fkClass: number): Observable<ClassConfig> {
    return this.crm$.map((crm) => (crm.classes[fkClass]))
  }

  isManifestationSingleton() {
    if (!this.parentFkClass) return undefined;
    return (this.parentFkClass === DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON)
  }

  isManifestationProductType() {
    if (!this.parentFkClass) return undefined;
    return (this.parentFkClass === DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE)
  }

  isOutgoing() {
    if (this.isManifestationSingleton()) return true;
    if (this.isManifestationProductType()) return false;
    return undefined;
  }
}
