import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, ProjectDetail, DfhClass, InfNamespace, U } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ClassSettings, VocabularyItem } from './api/class-settings.models';
import { ClassSettingsAPIEpics } from './api/class-settings.epics';
import { classSettingsReducer } from './api/class-settings.reducer';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ClassSettingsAPIActions } from './api/class-settings.actions';
import { filter, takeUntil, map, first } from 'rxjs/operators';
import * as  Config from '../../../../../../../common/config/Config';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classSettingsReducer
})
@Component({
  selector: 'gv-class-settings',
  templateUrl: './class-settings.component.html',
  styleUrls: ['./class-settings.component.css']
})
export class ClassSettingsComponent extends ClassSettingsAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ClassSettings>;

  // path to the substore
  basePath = ['activeProject', 'classSettings'];

  // select observables of substore properties
  @select() dfhClass$: Observable<DfhClass>;
  @select() namespaces$: Observable<InfNamespace[]>;

  // class
  class: DfhClass;
  classLabel: string;

  // active project
  project$: Observable<ProjectDetail>;
  project: ProjectDetail;
  projectLabel: string;

  // child route active
  childRouteActive = false;

  // if true, for this class we give the possibility to add types
  hasTypes = false;

  // Vocabularies
  enabledVocabulary: VocabularyItem;
  disabledVocabularies: VocabularyItem[];

  constructor(
    protected rootEpics: RootEpics,
    private epics: ClassSettingsAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public activatedRoute: ActivatedRoute,
    public router: Router

  ) {
    super();

    this.project$ = this.ngRedux.select<ProjectDetail>('activeProject')
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)

    // observe the activated route and update childRouteActive flag
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        takeUntil(this.destroy$)
      ).subscribe((route) => {
        this.childRouteActive = (route.firstChild ? true : false);
      })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    const pkClass = this.activatedRoute.snapshot.params['id'];


    this.localStore = this.ngRedux.configureSubStore(this.basePath, classSettingsReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.project$.pipe(first(p => (p ? true : false), takeUntil(this.destroy$)))
      .subscribe(p => {
        this.project = p;
        this.initHasTypes(pkClass);
        this.load(pkClass);
      })

    this.dfhClass$.takeUntil(this.destroy$).subscribe(c => {
      if (c) this.classLabel = c.dfh_standard_label;
    })

  }

  /**
   * Checks if the current class can have types and inits the
   * peopert hasTypes. Sets true if yes, false if no.
   *
   * @param pkClass Primary key of the current class
   */
  initHasTypes(pkClass: number): void {
    this.hasTypes = Config.PK_CLASS_PK_HAS_TYPE_MAP[pkClass] ? true : false;
    if (this.hasTypes) {
      this.initNamespaces();
    }
  }

  /**
   * Initializes the variables
   * - enabledVocabulary
   * - disabledVocabularies
   */
  private initNamespaces() {
    this.namespaces$.pipe(first(n => !(!n)), takeUntil(this.destroy$)).subscribe(nmsps => {
      const namespaceInProject: InfNamespace = nmsps.find((nmsp) => (U.entityIsInProject(nmsp)));
      if (namespaceInProject) {
        this.enabledVocabulary = {
          pk_entity: namespaceInProject.pk_entity,
          label: namespaceInProject.standard_label
        };
      } else {
        const geovistoryOngoing: InfNamespace = nmsps.find((nmsp) => nmsp.pk_entity === Config.PK_NAMESPACE__GEOVISTORY_ONGOING);
        this.enabledVocabulary = {
          pk_entity: geovistoryOngoing.pk_entity,
          label: 'Custom Vocabulary of project: ' + this.projectLabel
        };
      }
      this.disabledVocabularies = nmsps.filter((nsmp) => nsmp.pk_entity !== this.enabledVocabulary.pk_entity).map(nmsp => ({
        pk_entity: nmsp.pk_entity,
        label: nmsp.standard_label
      }));
    });
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCustomizeVocabulary(vocab: VocabularyItem) {
    this.router.navigate(['types', vocab.pk_entity], { relativeTo: this.activatedRoute });
  }

  /**
   * Verifies if project is allowed to customize
   * fk_project of namespace must be activeProject.pk_project
   * or namespace is Geovistory Ongoing
   */
  authorizedForCustomization(vocab: VocabularyItem) {
    if (vocab.pk_entity === Config.PK_NAMESPACE__GEOVISTORY_ONGOING) return true;

    const fk_project = this.localStore.getState().namespaces.find((nsp) => nsp.pk_entity === vocab.pk_entity).fk_project;
    return this.ngRedux.getState().activeProject.pk_project === fk_project;
  }
}
