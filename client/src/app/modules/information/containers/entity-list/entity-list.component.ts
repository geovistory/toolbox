import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveProjectService, EntityPreview, IAppState, SubstoreComponent, SysConfig, InfPersistentItem, InfTemporalEntity } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { InformationAPIActions } from './api/entity-list.actions';
import { InformationAPIEpics } from './api/entity-list.epics';
import { Information } from './api/entity-list.models';
import { informationReducer } from './api/entity-list.reducer';
import { ClassAndTypePk } from '../create-or-add-entity/create-or-add-entity.component';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: informationReducer
})
@Component({
  selector: 'gv-information',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
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

  pkAllowedClasses$ = this.c.pipeClassesEnabledInEntities();

  constructor(
    protected rootEpics: RootEpics,
    private epics: InformationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public p: ActiveProjectService,
    public c: ConfigurationPipesService
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }


  openEntity(preview: EntityPreview) {
    this.p.addEntityTab(preview)
  }


  startCreate(classAndTypePk: ClassAndTypePk) {
    this.p.dfh$.class$.by_pk_class$.key(classAndTypePk.pkClass)
      .pipe(first(d => !!d), takeUntil(this.destroy$)).subscribe(klass => {

        this.p.setListType('')

        this.p.openModalCreateOrAddEntity({
          alreadyInProjectBtnText: 'Open',
          notInProjectClickBehavior: 'addToProject',
          notInProjectBtnText: 'Add and Open',
          classAndTypePk,
          pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
        }).subscribe(result => {
          if (klass.basic_type === 8) {
            this.p.addEntityPeItTab(result.pkEntity)
          } else {
            this.p.addEntityTeEnTab(result.pkEntity)
          }
        })

      })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
