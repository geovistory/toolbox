import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { matExpansionAnimations } from '@angular/material/expansion';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProConfig, SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { EntityType, IAppState, ProjectSettingsData, RootEpics } from '@kleiolab/lib-redux';
import { ProDfhClassProjRel, SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { SubstoreComponent } from 'projects/app-toolbox/src/app/core/basic/basic.module';
import { Utils } from 'projects/app-toolbox/src/app/core/util/util';
import { ClassConfigDialogComponent, ClassConfigDialogData } from 'projects/app-toolbox/src/app/modules/class-config/components/class-config-dialog/class-config-dialog.component';
import { DetailContentComponent } from 'projects/app-toolbox/src/app/shared/components/detail-content/detail-content.component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { HighlightPipe } from 'projects/app-toolbox/src/app/shared/pipes/highlight/highlight.pipe';
import { equals, indexBy, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ProjectSettingsDataAPIActions } from './api/project-settings-data.actions';
import { projectSettingsDataReducer } from './api/project-settings-data.reducer';

interface Profile {
  label: string,
  fkProfile: number,
  removedFromApi: boolean
}
export interface ClassItem {
  pkClass: number;

  label: string;
  // dfh_standard_label: string;
  scopeNote: string;
  profilePks: number[];


  projRel?: ProDfhClassProjRel;

  systemRelevantClass: SysSystemRelevantClass,

  subclassOf?: 'peIt' | 'teEnt' | 'other'; // to distinguish TeEnts from PeIts

  subclassOfType?: boolean; // true if subclass of E55 Type
  identifier_in_namespace: string;

  required_by_sources?: boolean
  required_by_entities?: boolean
  required_by_basics?: boolean
  excluded_from_entities?: boolean

  profiles: Profile[]

  removedFromAllProfiles: boolean

  changingProjRel?: boolean

}





@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: projectSettingsDataReducer
})
@Component({
  selector: 'gv-project-settings-data',
  templateUrl: './project-settings-data.component.html',
  styleUrls: ['./project-settings-data.component.scss'],
  providers: [HighlightPipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    matExpansionAnimations.indicatorRotate,
  ],
})
export class ProjectSettingsDataComponent extends ProjectSettingsDataAPIActions implements OnInit, OnDestroy, SubstoreComponent {
  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(DetailContentComponent, { static: true }) detailContentComponent: DetailContentComponent;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ProjectSettingsData>;

  // path to the substore
  @Input() basePath;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  items$: Observable<ClassItem[]>;

  // columns of the table
  displayedColumns: string[] = [];

  // expanded element (row) of the table
  expandedElement: ClassItem | null;

  // dataSource
  dataSource = new MatTableDataSource();

  // filtered ClassItems
  filteredItems$ = new Subject<ClassItem[]>();

  // search string observable
  text$ = new BehaviorSubject<string>('');
  debouncedText$: Observable<string>;

  // Entity type Filter
  typeOptions = [
    { value: undefined, label: 'All' },
    { value: 'peIt', label: '<i class="gv-icon gv-icon-persistent-entity"></i> Persistent Entity Classes' },
    { value: 'teEnt', label: '<i class="fa fa-star-o"></i> Temporal Entity Classes' }
  ]
  selectedType: { value: any, label: string } = this.typeOptions[0];
  subclassOf$ = new BehaviorSubject<EntityType>(undefined);

  // Status Filter
  statusOptions = [
    { value: undefined, label: 'All' },
    { value: true, label: 'Enabled Classes' },
    { value: false, label: 'Disabled Classes' }
  ]
  selectedStatus: { value: any, label: string } = this.statusOptions[0];
  status$ = new BehaviorSubject<boolean>(undefined);

  // Basic Classes Filter
  showBasicClasses$ = new BehaviorSubject<boolean>(false);

  // Profile Filter
  profileOptions = [
    { value: undefined, label: 'All' }
  ]
  selectedProfile: { value: any, label: string } = this.profileOptions[0];
  profile$ = new BehaviorSubject<number>(undefined);

  // Sort Settings
  sorting$ = new BehaviorSubject<Sort>({ active: 'label', direction: 'asc' });

  // project: ProjectDetail;
  // projectLabel: string;

  t: TabLayout;

  ontomeURL = SysConfig.ONTOME_URL;

  constructor(
    protected rootEpics: RootEpics,
    // private epics: ProjectSettingsDataAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    private highilghtPipe: HighlightPipe,
    public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private c: ConfigurationPipesService
  ) {
    super();
    // this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    // this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)

    this.filteredItems$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.dataSource.data = items;
    })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, projectSettingsDataReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

    this.p.pro$.dfh_profile_proj_rel.loadOfProject(this.p.state.pk_project);

    const classesEnabledByProfiles$ = this.c.pipeClassesEnabledByProjectProfiles()

    this.items$ = classesEnabledByProfiles$
      .pipe(
        switchMap((dfhClasses) => {
          return combineLatestOrEmpty(
            // Pipe all related informations for each class
            dfhClasses.map(dfhClass => combineLatest(
              this.c.pipeClassLabel(dfhClass.pk_class),
              this.p.pro$.dfh_class_proj_rel$.by_fk_project__fk_class$
                .key(this.p.state.pk_project + '_' + dfhClass.pk_class),
              this.p.sys$.system_relevant_class$.by_fk_class$
                .key(dfhClass.pk_class),
              this.p.dfh$.label$.by_fk_profile__type$.all$,
              this.c.pipeProfilesEnabledByProject(),
              this.c.pipeTypeClassesEnabledByProjectProfiles()
            )
              .pipe(
                map(([label, projRel, sysClass, profileLabels, enabledProfiles, typeClasses]) => {

                  const typeClassMap = indexBy((c) => c.pk_class.toString(), typeClasses)

                  const {
                    pk_class,
                    identifier_in_namespace
                  } = dfhClass;


                  const systemRelevantClass = Utils.firstItemInObject(sysClass);
                  const {
                    excluded_from_entities,
                    required_by_basics,
                    required_by_entities,
                    required_by_sources
                  } = systemRelevantClass || {} as SysSystemRelevantClass;

                  const profiles: Profile[] = []

                  dfhClass.profiles.forEach(p => {
                    if (enabledProfiles.includes(p.fk_profile)) {
                      const profile: Profile = {
                        label: !profileLabels ?
                          '* label missing *' :
                          (values(profileLabels[p.fk_profile + '_label']) || [{ label: '* label missing *' }])[0].label,
                        removedFromApi: p.removed_from_api,
                        fkProfile: p.fk_profile,
                      }
                      profiles.push(profile)
                    }
                  })

                  const item: ClassItem = {
                    pkClass: pk_class,
                    identifier_in_namespace,

                    scopeNote: '', // TODO

                    label,
                    projRel,
                    systemRelevantClass,

                    subclassOfType: !!typeClassMap[dfhClass.pk_class],
                    subclassOf: (dfhClass.basic_type === 8 || dfhClass.basic_type === 30) ? 'peIt' : dfhClass.basic_type === 9 ? 'teEnt' : 'other',

                    excluded_from_entities,
                    required_by_basics,
                    required_by_entities,
                    required_by_sources,

                    removedFromAllProfiles: !dfhClass.profiles.some(p => p.removed_from_api === false),
                    profiles,
                    profilePks: dfhClass.profiles.map(p => p.fk_profile)
                  }
                  return item
                })
              )
            )
          )
        })
      )


    this.initFilter();

    this.t.setTabTitle('Settings > Classes')

    this.dataSource.sort = this.sort;

    combineLatest(this.showBasicClasses$, this.p.pkProject$).pipe(takeUntil(this.destroy$)).subscribe(([showBasicClasses, pkProject]) => {

      if (showBasicClasses) {
        this.displayedColumns = [
          'enabled_in_entities',
          'required_by_sources',
          'required_by_basics',
          'label',
          'subclassOf',
          'identifier_in_namespace',
          'profiles',
          'subclassOfType',
          'classConfig'
        ];
      }
      else {
        this.displayedColumns = [
          'enabled_in_entities',
          'required_by_sources',
          'label',
          'subclassOf',
          'identifier_in_namespace',
          'profiles',
          'subclassOfType',
          'classConfig'
        ];
      }

      if (pkProject === ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT) {
        this.displayedColumns = [
          ...this.displayedColumns,
          'edit_required_by_basics',
          'edit_required_by_sources',
          // 'edit_required_by_entities',
          'edit_excluded_from_entities',
        ]
      }
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  initFilter = () => {

    this.debouncedText$ = this.text$.pipe(debounceTime(200), distinctUntilChanged());



    combineLatest<any>(
      this.debouncedText$,
      this.items$,
      this.subclassOf$,
      this.status$,
      this.profile$,
      this.sorting$,
      this.showBasicClasses$
    ).pipe(
      distinctUntilChanged(equals)
    )
      .subscribe((d) => {
        const text: string = d[0],
          items: ClassItem[] = d[1],
          subclassOf: string = d[2],
          status: boolean = d[3],
          profile: number = d[4],
          sorting: Sort = d[5],
          showBasicClasses: boolean = d[6];

        const sortFn = (a, b) => {
          let nameA;
          let nameB;
          if (typeof a[sorting.active] === 'string') {
            nameA = a[sorting.active].toUpperCase(); // ignore upper and lowercase
            nameB = b[sorting.active].toUpperCase(); // ignore upper and lowercase
          } else if (typeof a[sorting.active] === 'boolean') {
            nameA = a[sorting.active] ? 0 : 1;
            nameB = b[sorting.active] ? 0 : 1;
          }
          if (nameA < nameB) return sorting.direction === 'asc' ? -1 : 1;
          if (nameA > nameB) return sorting.direction === 'asc' ? 1 : -1;
          // names are equal
          return 0;
        };

        if (items && items.length) {

          const mapped = items.map(i => ({
            ...i,
            enabled_in_entities: (!i.projRel ? false : i.projRel.enabled_in_entities),
            subclassOf: (i.subclassOf || 'other'),
            // dfh_standard_label: i.dfh_standard_label + ' – ' + i.identifier_in_namespace
          }))

          this.filteredItems$.next(
            (text === '' && subclassOf === undefined && status === undefined && profile === undefined && showBasicClasses === true) ?
              mapped.sort(sortFn) :
              mapped.filter(item => (
                // filter for show basic classes
                (showBasicClasses || !item.required_by_basics)
                // filter for search term
                && (text === '' ||
                  (item.label + ' ' + item.identifier_in_namespace + ' ' + item.scopeNote)
                    .toLowerCase().indexOf(text.toLowerCase()) > -1)
                // filter for subclassOf
                && (subclassOf === undefined || item.subclassOf === subclassOf)
                // filter for status
                && (status === undefined || status === (!item.projRel ? false : item.projRel.enabled_in_entities))
                // filter for profiles
                && (profile === undefined || item.profilePks.indexOf(profile) > -1)
              ))
                .sort(sortFn)
                // highlighting
                .map((item) => ({
                  ...item,
                  label: this.highilghtPipe.transform(item.label, text),
                  identifier_in_namespace: this.highilghtPipe.transform(item.identifier_in_namespace, text),
                  // dfh_standard_label: this.highilghtPipe.transform(item.dfh_standard_label, text),
                  scopeNote: this.highilghtPipe.transform(item.scopeNote, text),
                }))
          )
        }


      })

  }

  /**
   * Called when user types something in the search filter
   */
  textFilter(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement
    this.text$.next(target.value);
  }

  /**
   * Called when user changes to see only teEnt / peIt or all classes
   */
  subclassOfChange(type) {
    this.selectedType = type;
    this.subclassOf$.next(type.value)
  }

  /**
 * Called when user changes to see only enabled / disabled or all classes
 */
  entityStatusChange(status) {
    this.selectedStatus = status;
    this.status$.next(status.value)
  }

  /**
   * Called when user changes the profile filter
   */
  entityProfileChange(profile) {
    this.selectedProfile = profile;
    this.profile$.next(profile.value)
  }

  /**
   * Called when user changes the sorting of the table data
   */
  sortData(sort: Sort) {
    this.sorting$.next(sort)
  }

  /**
   * Called when user enables class
   */
  enableClass(classItem: ClassItem) {
    this.toggleClass(classItem, true)
  }

  /**
   * Called when user disables class
   */
  disableClass(classItem: ClassItem) {
    this.toggleClass(classItem, false)
  }

  private toggleClass(classItem: ClassItem, enabledInEntities: boolean) {
    this.p.changingClassProjRel[classItem.pkClass] = true;

    const projRel: ProDfhClassProjRel = {
      pk_entity: (classItem.projRel || { pk_entity: undefined }).pk_entity,
      fk_class: classItem.pkClass,
      fk_project: this.p.state.pk_project,
      enabled_in_entities: enabledInEntities
    }

    this.p.pro$.dfh_class_proj_rel.upsert([projRel], this.p.state.pk_project)
      .resolved$.pipe(takeUntil(this.destroy$)).subscribe(resolved => {
        if (resolved) this.p.changingClassProjRel[classItem.pkClass] = false;
      })
  }


  openControlledVocab(classItem: ClassItem) {
    this.p.addTab({
      active: true,
      component: 'contr-vocab-settings',
      icon: 'settings',
      pathSegment: 'contrVocabSettings',
      data: { pkClass: classItem.pkClass }
    })
    // this.c.pipeTypeClassOfTypedClass(classItem.pkClass)
    //   .pipe(first((d) => (!!d)), takeUntil(this.destroy$)).subscribe((pkClass) => {

    //     this.p.addTab({
    //       active: true,
    //       component: 'contr-vocab-settings',
    //       icon: 'settings',
    //       pathSegment: 'contrVocabSettings',
    //       data: { pkClass }
    //     })

    //   })
  }

  openClassConfig(classItem: ClassItem) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(fkProject => {
      const data: ClassConfigDialogData = {
        fkAppContext: 45,
        fkClass: classItem.pkClass,
        fkProject
      }
      this.dialog.open(ClassConfigDialogComponent, {
        data,
        height: 'calc(100% - 30px)',
        width: '850px',
        maxWidth: '100%',
        // maxHeight: '100%'
      })
    })
  }

  toggleSystemRelevantClassBool(classItem: ClassItem, col: string) {
    this.p.changingSystemRelevantClass[classItem.pkClass] = true;

    this.p.sys$.system_relevant_class.upsert([
      {
        ...classItem.systemRelevantClass,
        fk_class: classItem.pkClass,
        [col]: !classItem.systemRelevantClass ? true : !classItem.systemRelevantClass[col]
      }
    ]).resolved$.pipe(takeUntil(this.destroy$)).subscribe((resolved) => {
      if (resolved) this.p.changingSystemRelevantClass[classItem.pkClass] = false;
    });
  }
}

