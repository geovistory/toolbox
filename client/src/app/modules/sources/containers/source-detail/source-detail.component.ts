import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveProjectService, SysConfig, IAppState, PeItDetail, ProProject, ProjectCrm, SubstoreComponent, EntityPreview, ClassInstanceLabel } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { List } from 'app/modules/information/containers/list/api/list.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ISourceSearchHitState } from '../..';
import { SourceDetailAPIActions } from './api/source-detail.actions';
import { SourceDetailAPIEpics } from './api/source-detail.epics';
import { SourceDetail } from './api/source-detail.models';
import { sourceDetailReducer } from './api/source-detail.reducer';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';
import { path } from 'ramda';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: sourceDetailReducer
})
@Component({
  selector: 'gv-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.scss']
})
export class SourceDetailComponent extends SourceDetailAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<SourceDetail>;

  // path to the substore
  @Input() basePath: string[];
  // Primary key of the Entity to be viewed or edited
  @Input() pkEntity: number;
  // Class and Type pks of the Entity to be created
  @Input() classAndTypePk: ClassAndTypePk;

  @Output() close = new EventEmitter<void>();

  @select() editSource$: Observable<PeItDetail>;
  @select() add$: Observable<CreateOrAddEntity>;
  @select() editSection$: Observable<PeItDetail>;
  @select() loading$: Observable<boolean>;
  @select() removed$: Observable<boolean>;

  // used for breadcumbs when section is opened
  sourcePreview$: Observable<EntityPreview>;

  pkUiContextCreate = SysConfig.PK_UI_CONTEXT_SOURCES_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: SourceDetailAPIEpics,
    public activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    public router: Router,
    private p: ActiveProjectService
  ) {
    super();
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sourceDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.removed$.pipe(filter(b => b === true), takeUntil(this.destroy$)).subscribe(removed => {
      this.close.emit()
    })

    if (this.pkEntity) this.initEntity(this.pkEntity)
    else if (this.classAndTypePk) this.startCreate(this.classAndTypePk, this.pkUiContextCreate);


  }

  initEntity(pkEntity) {
    this.pkEntity = pkEntity;
    combineLatest(this.p.crm$, this.p.pkProject$).pipe(
      filter((d) => (d.filter((i) => !i).length === 0)),
      takeUntil(this.destroy$)
    ).subscribe(([crm, pkProject]) => {
      this.loadSourceDetails(this.pkEntity, pkProject, crm);
    })

  }


  onPeItLabelChange(label: ClassInstanceLabel) {
    const newTabTitle = path<string>(['parts', 0, 'roleLabels', 0, 'string'], label);
    if (this.localStore.getState().tabTitle !== newTabTitle) this.setTabTitle(newTabTitle);
  }

  onRemoveSource = (pkEntity: number) => this.removeSource(pkEntity, this.ngRedux.getState().activeProject.pk_entity)

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
