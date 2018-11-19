import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComConfig, IAppState, PeItDetail, Project, ProjectCrm, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { CreateOrAddPeIt } from 'app/modules/information/containers/create-or-add-pe-it/api/create-or-add-pe-it.models';
import { List } from 'app/modules/information/containers/list/api/list.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ISourceSearchHitState } from '../..';
import { SourceListAPIActions } from './api/source-list.actions';
import { SourceListAPIEpics } from './api/source-list.epics';
import { SourceList } from './api/source-list.models';
import { sourceListReducer } from './api/source-list.reducer';


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

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<SourceList>;

  // path to the substore
  @Input() basePath = ['sources'];

  @select() list$: Observable<List>;
  @select() edit$: Observable<PeItDetail>;
  @select() remove$: Observable<ISourceSearchHitState>;
  @select() create$: Observable<boolean>;
  @select() editSection$: Observable<PeItDetail>;

  project$: Observable<Project>;

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
    private epics: SourceListAPIEpics,
    public activatedRoute: ActivatedRoute,
    public ngRedux: NgRedux<IAppState>,
    public router: Router
  ) {
    super();

    this.params$ = activatedRoute.params;

    // observe the active project
    this.project$ = ngRedux.select<Project>('activeProject');

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

  getBasePath() { return this.basePath }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sourceListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest(this.params$, this.pkProject$, this.crm$).pipe(
      filter((d) => (d.filter((i) => !i).length === 0)),
      takeUntil(this.destroy$)
    ).subscribe((d) => {
      const params = d[0], pkProject = d[1], crm = d[2];
      if (params.pkEntity && params.pkSection) {
        // Init the section edit
        this.loadSectionDetails(params.pkSection, pkProject, crm)

      } else if (params.pkEntity) {
        // Init the source edit
        this.loadSourceDetails(params.pkEntity, pkProject, crm)
      } else {

        // Init the sources list
        this.initializeList(this.pkClassesOfAddBtn);
      }
    })

  }


  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  openEntity(pkInfPersistentItem) {
    this.router.navigate(['../', pkInfPersistentItem], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
  }

  openSearchList() {
    this.router.navigate(['../search'], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
  }


  onRemoveSource = (pkEntity: number) => this.removeSource(pkEntity, this.ngRedux.getState().activeProject.pk_project)
  onRemoveSection = (pkEntity: number) => this.removeSection(pkEntity, this.ngRedux.getState().activeProject.pk_project)

  // /**
  //  * Updates the state of substore
  //  */
  // @dispatch() updateState(payload: ISourceListState) {
  //   return this.actions.stateUpdated(payload)
  // }


  /**
   * listen to changes of the source being edited and updates 'list'
   * in order to apply the changes to the list
   */
  onSourceChange() {
    // this.search()
  }





  /**
   * Call api to remove the digital object from project, on success
   * - update store: delete 'remove'
   * - getList()
   */
  // remove() {


  //   this.eprApi.updateEprAttributes(
  //     this.ngRedux.getState().activeProject.pk_project,
  //     this.hitToRemove.id,
  //     { is_in_project: false } as InfEntityProjectRelInterface
  //   ).takeUntil(this.destroy$).subscribe((deleted) => {
  //     // delete the remove state
  //     this.removed();
  //     // update the sources list
  //     // this.search();
  //   })



  // }


  /**
   * Calls api to persists a new digital object in database, on success
   * Create SourceDetailState
   * - update store: set edit: new SourceDetailState
   */
  // submitCreate(dObj: InfDigitalObject) {

  //   // save digital object with epr and versioning
  //   this.digitObjApi.saveWithEpr(dObj, this.ngRedux.getState().activeProject.pk_project)
  //     .takeUntil(this.destroy$).subscribe((digitalObjects: InfDigitalObject[]) => {
  //       const editState: ISourceDetailState = {
  //         edit: digitalObjects[0],
  //         view: digitalObjects[0],
  //       }
  //       // update the sources list
  //       // this.search();
  //       // open the new source
  //       this.open(editState);
  //       // close the create
  //       this.stopCreate()
  //     })
  // }

  /**
   * called when user changes version of a digital object
   */
  // changeVersion(version: IVersion) {

  //   // update the epr
  //   this.eprApi.updateEprAttributes(
  //     this.ngRedux.getState().activeProject.pk_project,
  //     version.pkEntity,
  //     {
  //       fk_entity_version: version.entityVersion,
  //       fk_entity_version_concat: version.pkEntityVersionConcat
  //     }
  //   ).takeUntil(this.destroy$).subscribe((updatedEpr) => {

  //     // remove previous version
  //     this.sourceUpdated(undefined);

  //     // get the version
  //     this.digitObjApi.findProjectVersion(this.ngRedux.getState().activeProject.pk_project, version.pkEntity)
  //       .takeUntil(this.destroy$).subscribe((digiObjs: InfDigitalObject[]) => {
  //         const editState: ISourceDetailState = {
  //           view: digiObjs[0]
  //         }

  //         // open the new version
  //         this.sourceUpdated(digiObjs[0]);

  //         // update the sources list
  //         // this.search();
  //       })


  //   })


  // }

}
