import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveProjectService, ComConfig, IAppState, PeItDetail, ComProject, ProjectCrm, SubstoreComponent, EntityPreview } from 'app/core';
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

  @select() list$: Observable<List>;
  @select() edit$: Observable<PeItDetail>;
  @select() remove$: Observable<ISourceSearchHitState>;
  @select() create$: Observable<boolean>;
  @select() editSection$: Observable<PeItDetail>;

  // used for breadcumbs when section is opened
  sourcePreview$: Observable<EntityPreview>;

  project$: Observable<ComProject>;

  listVisible: boolean;

  editPath: string[] | string;

  hitToRemove: ISourceSearchHitState;

  pkClassesOfAddBtn = DfhConfig.CLASS_PKS_SOURCE_PE_IT;
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  pkProject$: Observable<number>;
  crm$: Observable<ProjectCrm>;
  params$: Observable<Params>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: SourceDetailAPIEpics,
    public activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    public router: Router,
    private p: ActiveProjectService
  ) {
    super();

    this.params$ = activatedRoute.params;

    // observe the active project
    this.project$ = ngRedux.select<ComProject>('activeProject');

    // observe the active pk_project
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']);

    // observe the crm
    this.crm$ = ngRedux.select<ProjectCrm>(['activeProject', 'crm']);

    // observe and store the remove hit
    this.remove$.takeUntil(this.destroy$).subscribe(r => {
      this.hitToRemove = r;
    })

    combineLatest(
      this.create$,
      this.edit$,
      this.remove$,
      this.editSection$
    ).takeUntil(this.destroy$).subscribe(d => {
      if (d.filter(i => !!i).length > 0) this.listVisible = false;
      else this.listVisible = true;
    })

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sourceDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest(this.p.crm$, this.p.pkProject$).pipe(
      filter((d) => (d.filter((i) => !i).length === 0)),
      takeUntil(this.destroy$)
    ).subscribe(([crm, pkProject]) => {
      this.loadSourceDetails(this.pkEntity, pkProject, crm);
    })

    // combineLatest(this.params$, this.pkProject$, this.crm$).pipe(
    //   filter((d) => (d.filter((i) => !i).length === 0)),
    //   takeUntil(this.destroy$)
    // ).subscribe((d) => {
    //   const params = d[0], pkProject = d[1], crm = d[2];
    //   if (params.pkEntity && params.pkSection) {
    //     // Init the section edit
    //     this.loadSectionDetails(params.pkEntity, params.pkSection, pkProject, crm)

    //     // load the entityPreview for the source for its display in breadcrumbs
    //     this.p.streamEntityPreview(params.pkEntity)
    //     this.sourcePreview$ = this.ngRedux.select(['activeProject', 'entityPreviews', params.pkEntity])

    //   } else if (params.pkEntity) {
    //     // Init the source edit
    //     this.loadSourceDetails(params.pkEntity, pkProject, crm)
    //   }
    // })

  }


  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  openEntity(pkInfPersistentItem) {
    this.p.navigateToSource(pkInfPersistentItem)
  }

  openSearchList() {
    this.router.navigate(['../search'], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
  }


  onRemoveSource = (pkEntity: number) => this.removeSource(pkEntity, this.ngRedux.getState().activeProject.pk_project)
  onRemoveSection = (pkEntity: number) => this.removeSection(pkEntity, this.ngRedux.getState().activeProject.pk_project)

  /**
   * listen to changes of the source being edited and updates 'list'
   * in order to apply the changes to the list
   */
  onSourceChange() {
    // this.search()
  }

}
