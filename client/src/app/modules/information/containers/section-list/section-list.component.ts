import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ProjectCrm, ComConfig, InfEntityAssociation, PeItDetail, U, ClassConfig } from 'app/core';
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
import { takeUntil, first } from 'rxjs/operators';
import { EntityAssociationList } from 'app/core/state/models/entity-association-list';

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

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() create$: Observable<CreateOrAddPeIt>;
  @select() items$: Observable<EntityAssociationList>;

  pkProject$: Observable<number>
  crm$: Observable<ProjectCrm>
  parentPeItDetail$: Observable<PeItDetail>;

  pkClassesOfAddBtn = [DfhConfig.CLASS_PK_EXPRESSION]
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  pkRangeEntity: number;

  constructor(
    protected rootEpics: RootEpics,
    private epics: SectionListAPIEpics,
    private activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    private router: Router
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
    combineLatest(this.pkProject$, this.parentPeItDetail$, this.crm$)
      .pipe(first((d) => (d.filter(i => !i).length === 0)), takeUntil(this.destroy$)).subscribe((d) => {
        const pkProject = d[0], parentPeItDetail = d[1], crm = d[2];
        this.pkRangeEntity = parentPeItDetail.pkEntity || parentPeItDetail.peIt.pk_entity;
        this.load(pkProject, this.pkRangeEntity, DfhConfig.PROPERTY_PK_R41_HAS_REP_MANIFESTATION_PRODUCT_TYPE, crm)
      })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onAdd(d: ClassAndTypePk) {
    this.startCreate(
      createEntityAssociationDetail(
        { isOutgoing: false },
        {
          fk_property: DfhConfig.PROPERTY_PK_R41_HAS_REP_MANIFESTATION_PRODUCT_TYPE,
          fk_range_entity: this.pkRangeEntity
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
