import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, DfhClass, ProjectDetail, InfPersistentItem, InfNamespace } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Types } from './api/types.models';
import { TypesAPIEpics } from './api/types.epics';
import { TypesAPIActions } from './api/types.actions';
import { typesReducer } from './api/types.reducer';
import { DfhConfig } from '../../../information/shared/dfh-config';
import { AppellationLabel } from '../../../information/shared/appellation-label';
import { VocabularyItem } from '../class-settings/api/class-settings.models';
import { ActivatedRoute } from '@angular/router';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typesReducer
})
@Component({
  selector: 'gv-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent extends TypesAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Types>;

  // path to the substore
  basePath = ['activeProject', 'classSettings', 'types'];

  //  class
  class$: Observable<DfhClass>;
  cla: DfhClass;
  classLabel: string;

  // type class
  typeClass: DfhClass;
  typeClassLabel: string;

  // active project
  projec$: Observable<ProjectDetail>;
  projecPk$: Observable<number>;
  project: ProjectDetail;
  projectLabel: string;

  // active namespace
  pkNamespace: number;

  // types
  @select() items$: Observable<{ [key: string]: InfPersistentItem }>;
  @select() namespace$: Observable<InfNamespace>;

  // if true, the list / tree of types is visible
  listVisible: boolean;

  // flag indicatig if add form is visible
  @select() add$: Observable<boolean>;

  // object containing data for edit form. If truthy, edit form is visible.
  @select() edit$: Observable<InfPersistentItem>;

  // flag indicatig if loaing info is visible
  @select() loading$: Observable<boolean>;



  constructor(
    protected rootEpics: RootEpics,
    private epics: TypesAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    this.pkNamespace = this.activatedRoute.snapshot.params['pk_namespace'];

    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p);
    this.projecPk$ = this.ngRedux.select<number>(['activeProject', 'pk_project']);
    this.class$ = this.ngRedux.select<DfhClass>(['activeProject', 'classSettings', 'dfhClass'])
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)

    // if one of the observables returns truthy, list is not visible
    combineLatest(this.loading$, this.add$, this.edit$).takeUntil(this.destroy$).subscribe(d => {
      this.listVisible = !d.find(item => !!(item));
    })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typesReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    combineLatest(this.class$, this.projecPk$).takeUntil(this.destroy$).subscribe(d => {
      const c = d[0], p = d[1];
      if (c && p && !this.cla) {
        this.cla = c;
        this.classLabel = c.dfh_standard_label;
        this.load(this.pkNamespace, p, c.dfh_pk_class)
      }
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * called when user creates a new type
   */
  createType(type: InfPersistentItem) {
    this.create(type);
  }

  getLabel(peIt: InfPersistentItem) {

    return !peIt.pi_roles ? '' :
      peIt.pi_roles
        .filter(r => r.temporal_entity.fk_class === DfhConfig.CLASS_PK_APPELLATION_USE)
        .map(pir => pir.temporal_entity.te_roles.filter(ter => (ter && Object.keys((ter.appellation || {})).length))
          .map(r => {
            return new AppellationLabel(r.appellation.appellation_label).getString()
          })[0]).join(', ')

  }

}
