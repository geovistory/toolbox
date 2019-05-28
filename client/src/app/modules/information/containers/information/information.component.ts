import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveProjectService, SysConfig, EntityPreview, IAppState, InfPersistentItem, ProjectCrm, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ClassAndTypePk } from '../class-and-type-selector/api/class-and-type-selector.models';
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
  basePath = ['information'];

  @select() loading$: Observable<boolean>;

  selectedEntity$ = new BehaviorSubject<EntityPreview>(undefined);

  pkClassesInProject;
  pkUiContextCreate = SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: InformationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public p: ActiveProjectService
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }


  openEntity(preview: EntityPreview) {
    this.p.addTab({
      active: true,
      component: 'entity-detail',
      icon: preview.entity_type === 'peIt' ? 'persistent-entity' : 'temporal-entity',
      pathSegment: 'entityDetails',
      data: {
        pkEntity: preview.pk_entity
      }
    });
  }


  startCreate(classAndTypePk: ClassAndTypePk) {
    this.p.getClassConfig(classAndTypePk.pkClass)
      .pipe(first(d => !!d), takeUntil(this.destroy$)).subscribe(classConfig => {

        this.p.addTab({
          active: true,
          component: 'entity-detail',
          icon: classConfig.subclassOf === 'peIt' ? 'persistent-entity' : 'temporal-entity',
          pathSegment: 'entityDetails',
          data: {
            classAndTypePk
          }
        });

      })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
