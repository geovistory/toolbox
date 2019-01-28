import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveProjectService, ComConfig, EntityPreview, IAppState, InfPersistentItem, PeItDetail, ProjectCrm, SubstoreComponent, TeEntDetail } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { CreateOrAddEntity } from '../create-or-add-entity/api/create-or-add-entity.models';
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
  
  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Information>;

  // path to the substore
  @Input() basePath: string[];

  @select() _peIt_add$: Observable<CreateOrAddEntity>;
  @select() loading$: Observable<boolean>;

  selectedEntity$ = new BehaviorSubject<EntityPreview>(undefined);


  persistentItems: InfPersistentItem[] = [];
  pkProject$: Observable<number>;


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

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));



  }


  openEntity(pkEntity) {
    this.projectService.navigateToDataUnit(pkEntity)
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
