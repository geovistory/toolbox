import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveProjectService, ComConfig, IAppState, PeItDetail, ComProject, ProjectCrm, SubstoreComponent, EntityPreview } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { List } from 'app/modules/information/containers/list/api/list.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { combineLatest, Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ISourceSearchHitState } from '../..';
import { SourceListAPIActions } from './api/source-list.actions';
import { SourceListAPIEpics } from './api/source-list.epics';
import { SourceList } from './api/source-list.models';
import { sourceListReducer } from './api/source-list.reducer';
import { Information } from 'app/modules/information/containers/information/api/information.models';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';


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

  pkClassesOfAddBtn = DfhConfig.CLASS_PKS_SOURCE_PE_IT;
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  crm$: Observable<ProjectCrm>;
  params$: Observable<Params>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: SourceListAPIEpics,
    public activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    public router: Router,
    public p: ActiveProjectService
  ) {
    super();

    // init list with filtering the classes for sources.
    this.initializeList(this.pkClassesOfAddBtn)

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sourceListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }


  openEntity(preview: EntityPreview) {
    // TODO figure out what icon to use
    this.p.addTab({
      active: true,
      component: 'source-detail',
      icon: 'source',
      pathSegment: 'sourceDetails',
      data: {
        pkEntity: preview.pk_entity
      }
    });
  }


  startCreate(classAndTypePk: ClassAndTypePk) {
    // TODO figure out what icon to use
    this.p.addTab({
      active: true,
      component: 'source-detail',
      icon: 'source',
      pathSegment: 'sourceDetails',
      data: {
        classAndTypePk
      }
    });
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
