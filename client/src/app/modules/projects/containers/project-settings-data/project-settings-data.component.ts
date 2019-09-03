import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DfhClassProfileView, IAppState, ProjectDetail, ActiveProjectService, U, ClassConfig } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { RootEpics } from 'app/core/store/epics';
import { HighlightPipe } from 'app/shared/pipes/highlight/highlight.pipe';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, first, takeWhile, takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, MatTableDataSource, Sort, matExpansionAnimations, MatDialog } from '@angular/material';
import { ProDfhClassProjRel } from '../../../../core/sdk/models/ProDfhClassProjRel';
import { ProjectSettingsDataAPIActions } from './api/project-settings-data.actions';
import { ProjectSettingsDataAPIEpics } from './api/project-settings-data.epics';
import { EntityType, ProjectSettingsData } from './api/project-settings-data.models';
import { projectSettingsDataReducer } from './api/project-settings-data.reducer';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { DetailContentComponent } from '../../../../shared/components/detail-content/detail-content.component';
import { ClassConfigDialogComponent, ClassConfigDialogData } from '../../../class-config/components/class-config-dialog/class-config-dialog.component';
import { equals } from 'ramda';
import * as Config from '../../../../../../../common/config/Config';

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

  items$: Observable<ClassConfig[]>;

  // columns of the table
  displayedColumns: string[] = [];

  // expanded element (row) of the table
  expandedElement: ClassConfig | null;

  // dataSource
  dataSource = new MatTableDataSource();

  // filtered ClassItems
  filteredItems$ = new Subject<ClassConfig[]>();

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


  constructor(
    protected rootEpics: RootEpics,
    private epics: ProjectSettingsDataAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    private highilghtPipe: HighlightPipe,
    private p: ActiveProjectService,
    private router: Router,
    private route: ActivatedRoute,
    public ref: ChangeDetectorRef,
    private dialog: MatDialog
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
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$)

    // // load the class list as soon as the pk_project is available
    // this.ngRedux.select<ProjectDetail>(['activeProject', 'pk_project']).takeUntil(this.destroy$).subscribe(pk => {
    //   if (pk) this.load();
    // })

    this.items$ = this.p.crm$.pipe(filter((crm) => !!crm && !!crm.classes), map(crm => U.objNr2Arr(crm.classes)))

    // // load the profile Options as soon as the profiles are available
    // this.ngRedux.select<DfhClassProfileView[]>(['activeProject', 'dataSettings', 'profiles']).takeUntil(this.destroy$).subscribe(profiles => {
    //   if (profiles) {
    //     this.profileOptions = [...this.profileOptions, ...profiles.map((p) => ({
    //       value: p.dfh_fk_profile,
    //       label: p.dfh_profile_label
    //     }))]
    //   }
    // })

    this.initFilter();

    this.t.setTabTitle('Settings > Classes')

    // This is needed to keep the table scrollable
    // this.t.activated$.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   this.detailContentComponent.fh = this.detailContentComponent.scroll = false;
    //   this.ref.detectChanges()
    //   setTimeout(() => {
    //     this.detailContentComponent.fh = this.detailContentComponent.scroll = true;
    //     this.ref.detectChanges()
    //   })
    // })

    this.dataSource.sort = this.sort;

    combineLatest(this.showBasicClasses$, this.p.pkProject$).pipe(takeUntil(this.destroy$)).subscribe(([showBasicClasses, pkProject]) => {

      if (showBasicClasses) this.displayedColumns = [
        'enabled_in_entities',
        'required_by_sources',
        'required_by_basics',
        'label',
        'subclassOf',
        'dfh_standard_label',
        'subclassOfType',

      ];
      else this.displayedColumns = [
        'enabled_in_entities',
        'required_by_sources',
        'label',
        'subclassOf',
        'dfh_standard_label',
        'subclassOfType',
      ];

      if (pkProject === Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT) {
        this.displayedColumns.push('classConfig')
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
          items: ClassConfig[] = d[1],
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
            dfh_standard_label: i.dfh_standard_label + ' – ' + i.dfh_identifier_in_namespace
          }))

          this.filteredItems$.next(
            (text === '' && subclassOf === undefined && status === undefined && profile === undefined && showBasicClasses === true) ?
              mapped.sort(sortFn) :
              mapped.filter(item => (
                // filter for show basic classes
                (showBasicClasses || !item.required_by_basics)
                // filter for search term
                && (text === '' ||
                  (item.label + ' ' + item.dfh_standard_label + ' ' + item.scopeNote)
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
                  dfh_standard_label: this.highilghtPipe.transform(item.dfh_standard_label, text),
                  scopeNote: this.highilghtPipe.transform(item.scopeNote, text),
                }))
          )
        }


      })

  }

  /**
   * Called when user types something in the search filter
   */
  textFilter(text: string) {
    this.text$.next(text);
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
  enableClass(classItem: ClassConfig) {
    const projRel = new ProDfhClassProjRel({
      pk_entity: !classItem.projRel ? undefined : classItem.projRel.pk_entity,
      fk_entity: classItem.pkEntity,
      fk_project: this.p.state.pk_project,
      enabled_in_entities: true
    })

    this.p.changeClassProjRel(projRel, classItem.dfh_pk_class);
  }

  /**
   * Called when user disables class
   */
  disableClass(classItem: ClassConfig) {
    const projRel = new ProDfhClassProjRel({
      pk_entity: classItem.projRel.pk_entity,
      fk_entity: classItem.pkEntity,
      fk_project: this.p.state.pk_project,
      enabled_in_entities: false
    })

    this.p.changeClassProjRel(projRel, classItem.dfh_pk_class);
  }

  /**
   * Called when user clicks on customize
   */
  customizeClass(classItem: ClassConfig) {
    this.router.navigate([classItem.dfh_pk_class], { relativeTo: this.route })
  }

  openControlledVocab(classItem: ClassConfig) {
    this.p.hasTypeProperties$.pipe(first((d) => (!!d)), takeUntil(this.destroy$)).subscribe((hasTypeProperties) => {

      const pkProperty = U.objNr2Arr(hasTypeProperties).find(p => p.pk_type_class === classItem.dfh_pk_class).dfh_pk_property;

      this.p.addTab({
        active: true,
        component: 'contr-vocab-settings',
        icon: 'settings',
        pathSegment: 'contrVocabSettings',
        data: { pkProperty }
      })

    })
  }

  openClassConfig(classItem: ClassConfig) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(fkProject => {
      const data: ClassConfigDialogData = {
        fkAppContext: 45,
        fkClass: classItem.dfh_pk_class,
        fkProject
      }
      this.dialog.open(ClassConfigDialogComponent, { data })
    })
  }
}

