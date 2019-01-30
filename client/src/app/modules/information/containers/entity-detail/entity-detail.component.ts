import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveProjectService, ComConfig, EntityPreview, IAppState, InfPersistentItem, PeItDetail, ProjectCrm, SubstoreComponent, TeEntDetail } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
// import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';
import { first, takeUntil } from 'rxjs/operators';
import { CreateOrAddEntity } from '../create-or-add-entity/api/create-or-add-entity.models';
import { EntityDetailAPIActions } from './api/entity-detail.actions';
import { EntityDetail } from './api/entity-detail.models';
import { EntityDetailAPIEpics } from './api/entity-detail.epics';
import { entityDetailReducer } from './api/entity-detail.reducer';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: entityDetailReducer
})
@Component({
  selector: 'gv-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.css']
})
export class EntityDetailComponent extends EntityDetailAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<EntityDetail>;

  // path to the substore
  @Input() basePath: string[];
  // Primary key of the Entity to be viewed or edited
  @Input() pkEntity: number;

  @select() _peIt_editable$: Observable<PeItDetail>;
  @select() _teEnt_editable$: Observable<TeEntDetail>;
  @select() _peIt_add$: Observable<CreateOrAddEntity>;
  @select() loading$: Observable<boolean>;

  selectedEntity$ = new BehaviorSubject<EntityPreview>(undefined);

  pkClassesInProject;
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: EntityDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public p: ActiveProjectService
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (this.pkEntity) this.initSelectedDataUnitPreview()

  }

  initSelectedDataUnitPreview() {
    this.p.streamEntityPreview(this.pkEntity)
      .takeUntil(this.destroy$)
      .subscribe(a => {
        this.selectedEntity$.next(a);
      })

    combineLatest(this.selectedEntity$, this.p.pkProject$)
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

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRemovePeIt = (pkEntity: number) => this.removePeIt(pkEntity, this.ngRedux.getState().activeProject.pk_project)

}
