import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComConfig, IAppState, InfPersistentItem, PeItDetail, ProjectCrm, SubstoreComponent, ActiveProjectService, EntityPreview, TeEntDetail } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { combineLatest, Observable, Subject, BehaviorSubject } from 'rxjs';
// import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';
import { first, takeUntil, filter } from 'rxjs/operators';
import { CreateOrAddEntity } from '../create-or-add-entity/api/create-or-add-entity.models';
import { InformationAPIActions } from './api/information.actions';
import { InformationAPIEpics } from './api/information.epics';
import { Information } from './api/information.models';
import { informationReducer } from './api/information.reducer';
import { distinctUntilChanged } from 'rxjs-compat/operator/distinctUntilChanged';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: informationReducer
})
@Component({
  selector: 'gv-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent extends InformationAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Information>;

  // path to the substore
  @Input() basePath: string[];

  @select() _peIt_editable$: Observable<PeItDetail>;
  @select() _teEnt_editable$: Observable<TeEntDetail>;
  @select() _peIt_add$: Observable<CreateOrAddEntity>;
  @select() loading$: Observable<boolean>;

  selectedEntity$ = new BehaviorSubject<EntityPreview>(undefined);

  // Primary key of the Entity to be viewed or edited
  pkEntity: number;

  listVisible = true;

  persistentItems: InfPersistentItem[] = [];
  pkProject$: Observable<number>;

  // entityModalOptions: NgbModalOptions = {
  //   size: 'lg'
  // }

  pkClassesInProject;
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: InformationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private projectService: ActiveProjectService
  ) {
    super()

    this.pkEntity = activatedRoute.snapshot.params['pkEntity'];
    this.pkProject$ = projectService.pkProject$;

    // if component is activated by ng-router, take base path here
    activatedRoute.data.subscribe(d => {
      this.basePath = d.reduxPath;
    })

    // listen to the crm and add extract the classes ready to add.
    ngRedux.select<ProjectCrm>(['activeProject', 'crm']).pipe(
      first(d => !!d),
      takeUntil(this.destroy$)).subscribe(crm => {
        this.pkClassesInProject = []
        for (const key in crm.classes) {
          if (crm.classes[key] && crm.classes[key].isInProject) {
            this.pkClassesInProject.push(crm.classes[key].dfh_pk_class);
          }
        }
        this.initializeList(this.pkClassesInProject)
      })


    // if one of the observables returns truthy, list is not visible
    combineLatest(this.selectedEntity$, this._peIt_add$).takeUntil(this.destroy$).subscribe(d => {
      this.listVisible = !d.find(item => !!(item));
    })

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (this.pkEntity) this.initSelectedDataUnitPreview()

    // listen to route changes
    this.activatedRoute.params.subscribe(params => {
      if (params.pkEntity && params.pkEntity != this.pkEntity) {
        this.pkEntity = params.pkEntity;
        this.initSelectedDataUnitPreview()
      }
    })


  }

  initSelectedDataUnitPreview() {
    this.projectService.streamEntityPreview(this.pkEntity)
    .takeUntil(this.destroy$)
    .subscribe(a => {
      this.selectedEntity$.next(a);
    })

    combineLatest(this.selectedEntity$, this.pkProject$)
      .pipe(
        first(([du, pkProject]) => (du && !du.loading && !!pkProject)),
        takeUntil(this.destroy$)
      ).subscribe(([du, pkProject]) => {
        if (du.entity_type === 'peIt') {
          this.openEntityEditor(du.pk_entity, pkProject);
        } else if (du.entity_type === 'teEn') {
          this.openPhenomenonEditor(du.pk_entity, pkProject);
        }
      })

  }


  openEntity(pkEntity) {
    this.router.navigate(['../entity', pkEntity], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
  }

  openSearchList() {
    this.router.navigate(['../../search'], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRemovePeIt = (pkEntity: number) => this.removePeIt(pkEntity, this.ngRedux.getState().activeProject.pk_project)

}
