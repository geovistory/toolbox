import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveProjectService, EntityPreview, IAppState, ProjectCrm, SubstoreComponent, SysConfig, U, InfPersistentItem } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { SystemSelector } from 'app/core/sys/sys.service';
import { Information } from 'app/modules/information/containers/entity-list/api/entity-list.models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, tap, takeUntil } from 'rxjs/operators';
import { SourceListAPIActions } from './api/source-list.actions';
import { SourceListAPIEpics } from './api/source-list.epics';
import { sourceListReducer } from './api/source-list.reducer';
import { ClassAndTypePk } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.component';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: sourceListReducer
})
@Component({
  selector: 'gv-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent extends SourceListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Information>;

  // path to the substore
  basePath = ['sources'];

  @select() loading$: Observable<boolean>;

  selectedEntity$ = new BehaviorSubject<EntityPreview>(undefined);

  pkUiContextCreate = SysConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  crm$: Observable<ProjectCrm>;
  params$: Observable<Params>;
  pkClassesOfAddBtn$: Observable<number[]>

  constructor(
    protected rootEpics: RootEpics,
    private epics: SourceListAPIEpics,
    public activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    public router: Router,
    public p: ActiveProjectService,
    public sys: SystemSelector
  ) {
    super();
    this.pkClassesOfAddBtn$ = this.sys.system_relevant_class$.by_required_by_sources$.all$.pipe(
      first(d => !!d.true),
      map(reqBySource => U.obj2Arr(reqBySource.true).map(sysRelClass => sysRelClass.fk_class))
    )
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sourceListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }


  openEntity(preview: EntityPreview) {
    this.p.addSourceTab(preview.pk_entity)
  }


  startCreate(classAndTypePk: ClassAndTypePk) {

    this.p.setListType('')

    this.p.openModalCreateOrAddEntity({
      alreadyInProjectBtnText: 'Open',
      notInProjectClickBehavior: 'addToProject',
      notInProjectBtnText: 'Add and Open',
      classAndTypePk,
      pkUiContext: SysConfig.PK_UI_CONTEXT_SOURCES_CREATE
    }).subscribe(result => {
      this.p.addSourceTab(result.pkEntity)
    })


  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
