import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComConfig, IAppState, InfPersistentItem, PeItDetail, ProjectCrm, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { combineLatest, Observable, Subject } from 'rxjs';
// import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';
import { first, takeUntil } from 'rxjs/operators';
import { CreateOrAddPeIt } from '../create-or-add-pe-it/api/create-or-add-pe-it.models';
import { InformationAPIActions } from './api/information.actions';
import { InformationAPIEpics } from './api/information.epics';
import { Information } from './api/information.models';
import { informationReducer } from './api/information.reducer';

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
  @select() _peIt_add$: Observable<CreateOrAddPeIt>;
  @select() loading$: Observable<boolean>;

  // Primary key of the Entity to be viewed or edited
  pkEntity: number;

  listVisible = true;

  persistentItems: InfPersistentItem[] = [];
  projectId: number;

  // entityModalOptions: NgbModalOptions = {
  //   size: 'lg'
  // }

  pkClassesInProject;
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: InformationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super()

    this.pkEntity = activatedRoute.snapshot.params['pkEntity'];
    this.projectId = activatedRoute.snapshot.parent.params['id'];

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
    combineLatest(this._peIt_editable$, this._peIt_add$).takeUntil(this.destroy$).subscribe(d => {
      this.listVisible = !d.find(item => !!(item));
    })

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (this.pkEntity) this.openEntityEditor(this.pkEntity, this.projectId);

    // listen to route changes
    this.activatedRoute.params.subscribe(params => {
      if (params.pkEntity && params.pkEntity != this.pkEntity) {
        this.pkEntity = params.pkEntity;
        this.openEntityEditor(this.pkEntity, this.projectId)
      }
    })

  }



  openEntity(pkInfPersistentItem) {
    this.router.navigate(['../entity', pkInfPersistentItem], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
    // routerLink="../entity/{{persistentItem.pk_persistent_item}}" queryParamsHandling="merge"
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
