import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { matExpansionAnimations } from '@angular/material/expansion';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { ProDfhClassProjRel, SysConfigClassCategoryBelonging, SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from '../../../../core/active-project/active-project.service';
import { ClassConfigDialogComponent, ClassConfigDialogData } from '../../../../modules/class-config/components/class-config-dialog/class-config-dialog.component';
import { DetailContentComponent } from '../../../../shared/components/detail-content/detail-content.component';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { HighlightPipe } from '../../../../shared/pipes/highlight/highlight.pipe';
import { equals, indexBy, keys, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { TabLayoutComponentInterface } from '../../directives/on-activate-tab.directive';

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

  // systemRelevantClass: SysSystemRelevantClass,

  subclassOf?: 'peIt' | 'teEnt' | 'other'; // to distinguish TeEnts from PeIts

  subclassOfType?: boolean; // true if subclass of E55 Type
  identifier_in_namespace: string;

  restrictedToOtherProjects: boolean
  belongsToCategory: SysConfigClassCategoryBelonging;
  showInAddMenu: boolean
  categoryLabel: string
  categoryKey: keyof SysConfigClassCategoryBelonging
  // required_by_sources?: boolean
  // required_by_entities?: boolean
  // required_by_basics?: boolean
  // excluded_from_entities?: boolean

  profiles: Profile[]

  removedFromAllProfiles: boolean

  changingProjRel?: boolean
  enabled_in_entities?: boolean
}

export type EntityType = 'teEnt' | 'peIt' | 'other';

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
export class ProjectSettingsDataComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  @HostBinding('class.gv-flex-fh') flexFh = true;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(DetailContentComponent, { static: true }) detailContentComponent: DetailContentComponent;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // path to the substore
  @Input() basePath;

  // select observables of substore properties
  loading$: Observable<boolean>;

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
    public state: StateFacade,
    private highilghtPipe: HighlightPipe,
    public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private c: ConfigurationPipesService,
    public tabLayout: TabLayoutService,
  ) {
    this.filteredItems$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.dataSource.data = items;
    })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {

    this.t = this.tabLayout.t;
    this.state.data.loadProjectProfileRelations(this.state.pkProject);

    const classesEnabledByProfiles$ = this.c.pipeClassesEnabledByProjectProfiles()

    this.items$ = combineLatest([
      classesEnabledByProfiles$,
      this.state.data.dfh.label.dfhLabelByProfile$,
      this.c.pipeProfilesEnabledByProject(),
      this.c.pipeTypeClassesEnabledByProjectProfiles(),
      this.state.data.sys.config.sysConfig$
    ])
      .pipe(
        switchMap(([
          dfhClasses, profileLabels, enabledProfiles, typeClasses, sysConfig
        ]) => {
          return combineLatestOrEmpty(
            // Pipe all related informations for each class
            dfhClasses.map(dfhClass => combineLatest([
              this.c.pipeClassLabel(dfhClass.pk_class),
              this.state.data.pro.dfhClassProjRel.getDfhClassProjRel.byFkProjectFkClass$(this.state.pkProject, dfhClass.pk_class),

            ])
              .pipe(
                map(([label, projRel]) => {

                  const typeClassMap = indexBy((c) => c.dfhClass.pk_class.toString(), typeClasses)

                  const {
                    pk_class,
                    identifier_in_namespace
                  } = dfhClass;

                  const belongsToCategory = getClassCategoryBelonging(sysConfig, dfhClass.pk_class, dfhClass.basic_type)
                  const categoryKey = keys(belongsToCategory)?.[0]
                  const categoryLabel = belongsToCategory.digitals ? 'digitals' :
                    belongsToCategory.entities ? 'entities' :
                      belongsToCategory.sources ? 'sources' :
                        belongsToCategory.stories ? 'stories' : 'other';
                  const showInAddMenu = values(belongsToCategory)?.[0].showInAddMenu

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
                    restrictedToOtherProjects: typeClassMap[pk_class]?.restrictedToOtherProjects,
                    label,
                    projRel,
                    belongsToCategory,
                    showInAddMenu,
                    categoryLabel,
                    categoryKey,
                    subclassOfType: !!typeClassMap[dfhClass.pk_class],
                    subclassOf: (dfhClass.basic_type === 8 || dfhClass.basic_type === 30) ? 'peIt' : dfhClass.basic_type === 9 ? 'teEnt' : 'other',

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

    this.displayedColumns = [
      'categoryLabel',
      'enabled',
      'label',
      'subclassOf',
      'identifier_in_namespace',
      'profiles',
      'subclassOfType',
      'classConfig'
    ];

    // combineLatest(this.showBasicClasses$, this.p.pkProject$).pipe(takeUntil(this.destroy$)).subscribe(([showBasicClasses, pkProject]) => {

    // if (pkProject === ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT) {
    //   this.displayedColumns = [
    //     ...this.displayedColumns,
    //     'edit_required_by_basics',
    //     'edit_required_by_sources',
    //     // 'edit_required_by_entities',
    //     'edit_excluded_from_entities',
    //   ]
    // }
    // })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  initFilter = () => {

    this.debouncedText$ = this.text$.pipe(debounceTime(200), distinctUntilChanged());



    combineLatest([
      this.debouncedText$,
      this.items$,
      this.subclassOf$,
      this.status$,
      this.profile$,
      this.sorting$,
      this.showBasicClasses$
    ]).pipe(
      distinctUntilChanged(equals)
    ).subscribe((d) => {
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
            mapped.filter(item => {
              if (!showBasicClasses && values(item.belongsToCategory)?.[0].showInAddMenu === false) return false;

              if (
                text !== '' &&
                ((item.label + ' ' + item.identifier_in_namespace + ' ' + item.scopeNote)
                  .toLowerCase().indexOf(text.toLowerCase()) === -1)) return false


              return true

              // // filter for subclassOf
              // && (subclassOf === undefined || item.subclassOf === subclassOf)
              // // filter for status
              // && (status === undefined || status === (!item.projRel ? false : item.projRel.enabled_in_entities))
              // // filter for profiles
              // && (profile === undefined || item.profilePks.indexOf(profile) > -1)

            })
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
    this.state.ui.activeProject.setChangingClassProjRel(classItem.pkClass, true)

    const projRel: ProDfhClassProjRel = {
      pk_entity: (classItem.projRel || { pk_entity: undefined }).pk_entity,
      fk_class: classItem.pkClass,
      fk_project: this.state.pkProject,
      enabled_in_entities: enabledInEntities
    }
    this.state.data.upsertProjectClassRelations(this.state.pkProject, [projRel])
      .pipe(takeUntil(this.destroy$)).subscribe(resolved => {
        if (resolved) this.state.ui.activeProject.setChangingClassProjRel(classItem.pkClass, false)
      })
  }


  openControlledVocab(classItem: ClassItem) {
    this.state.ui.activeProject.addTab({
      active: true,
      component: 'contr-vocab-settings',
      icon: 'settings',
      pathSegment: 'contrVocabSettings',
      data: { pkClass: classItem.pkClass }
    })
  }

  openClassConfig(classItem: ClassItem) {
    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(fkProject => {
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

}




function getClassCategoryBelonging(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): SysConfigClassCategoryBelonging {
  return sysConfig?.classes?.[pkClass]?.belongsToCategory ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.belongsToCategory ??
    sysConfig?.classesDefault?.belongsToCategory ??
    { entities: { showInAddMenu: true } };
}
