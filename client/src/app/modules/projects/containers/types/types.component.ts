import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, DfhClass, ProjectDetail, InfPersistentItem, InfNamespace, U, ComConfig } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Types } from './api/types.models';
import { TypesAPIEpics } from './api/types.epics';
import { TypesAPIActions } from './api/types.actions';
import { typesReducer } from './api/types.reducer';
import { DfhConfig } from '../../../information/shared/dfh-config';
import { AppellationLabel } from '../../../information/shared/appellation-label';
import { VocabularyItem } from '../class-settings/api/class-settings.models';
import { ActivatedRoute } from '@angular/router';
import * as  Config from '../../../../../../../common/config/Config';
import { first } from 'rxjs/operators';

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

  // active project
  projec$: Observable<ProjectDetail>;
  projecPk$: Observable<number>;
  project: ProjectDetail;
  projectLabel: string;

  // active namespace
  pkNamespace: number;
  namespaceLabel: string;

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
    this.pkNamespace = parseInt(this.activatedRoute.snapshot.params['pk_namespace'], 10);

    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p);
    this.projecPk$ = this.ngRedux.select<number>(['activeProject', 'pk_project']);
    this.class$ = this.ngRedux.select<DfhClass>(['activeProject', 'classSettings', 'dfhClass'])
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)

    this.namespace$.pipe(first(n => !!n)).subscribe((n) => {
      if (n.pk_entity === Config.PK_NAMESPACE__GEOVISTORY_ONGOING) {
        this.namespaceLabel = 'All Types of your project'
      } else {
        this.namespaceLabel = n.standard_label
      }
    })

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
        this.load()
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
  added(type: InfPersistentItem) {
    this.createSucceeded(type);
  }

  getLabel = (peIt: InfPersistentItem) => U.stringForPeIt(peIt);

  addOrCreate() {
    this.openAddForm({
      classAndTypePk: {
        pkClass: this.localStore.getState().class.dfh_pk_class,
        pkType: undefined
      },
      pkUiContext: ComConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE,
      pkNamespace: this.pkNamespace
    })
  }
}
