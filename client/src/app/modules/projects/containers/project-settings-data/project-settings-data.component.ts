import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, ProjectDetail, DfhClassProfileView } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ProjectSettingsData, ClassItemI, DataUnitType } from './api/project-settings-data.models';
import { ProjectSettingsDataAPIEpics } from './api/project-settings-data.epics';
import { projectSettingsDataReducer } from './api/project-settings-data.reducer';
import { ProjectSettingsDataAPIActions } from './api/project-settings-data.actions';
import { map, first, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HighlightPipe } from 'app/shared/pipes/highlight/highlight.pipe';
import { DfhProjRel } from '../../../../core/sdk/models/DfhProjRel';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: projectSettingsDataReducer
})
@Component({
  selector: 'gv-project-settings-data',
  templateUrl: './project-settings-data.component.html',
  styleUrls: ['./project-settings-data.component.css'],
  providers: [HighlightPipe]
})
export class ProjectSettingsDataComponent extends ProjectSettingsDataAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ProjectSettingsData>;

  // path to the substore
  @Input() basePath = ['activeProject', 'dataSettings'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<ClassItemI[]>;

  // filtered ClassItems
  filteredItems$ = new Subject<ClassItemI[]>();

  // search string observable
  text$ = new BehaviorSubject<string>('');
  debouncedText$: Observable<string>;

  // Data unit type Filter
  typeOptions = [
    { value: undefined, label: 'All' },
    { value: 'teEnt', label: '<i class="gv-icon gv-icon-entity"></i> Entity Classes' },
    { value: 'peIt', label: '<i class="fa fa-star-o"></i> Phenomenon Classes' }
  ]
  selectedType: { value: any, label: string } = this.typeOptions[0];
  dataUnitType$ = new BehaviorSubject<DataUnitType>(undefined);

  // Status Filter
  statusOptions = [
    { value: undefined, label: 'All' },
    { value: true, label: 'Enabled Classes' },
    { value: false, label: 'Disabled Classes' }
  ]
  selectedStatus: { value: any, label: string } = this.statusOptions[0];
  status$ = new BehaviorSubject<boolean>(undefined);


  // Profile Filter
  profileOptions = [
    { value: undefined, label: 'All' }
  ]
  selectedProfile: { value: any, label: string } = this.profileOptions[0];
  profile$ = new BehaviorSubject<number>(undefined);


  project: ProjectDetail;
  projectLabel: string;

  constructor(
    protected rootEpics: RootEpics,
    private epics: ProjectSettingsDataAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    private highilghtPipe: HighlightPipe
  ) {
    super();
    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)


  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, projectSettingsDataReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    // load the class list as soon as the pk_project is available
    this.ngRedux.select<ProjectDetail>(['activeProject', 'pk_project']).takeUntil(this.destroy$).subscribe(pk => {
      if (pk) this.load();
    })

    // load the profile Options as soon as the profiles are available
    this.ngRedux.select<DfhClassProfileView[]>(['activeProject', 'dataSettings', 'profiles']).takeUntil(this.destroy$).subscribe(profiles => {
      if (profiles) {
        this.profileOptions = [...this.profileOptions, ...profiles.map((p) => ({
          value: p.dfh_fk_profile,
          label: p.dfh_profile_label
        }))]
      }
    })

    this.initFilter();

  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  initFilter = () => {

    this.debouncedText$ = this.text$.pipe(debounceTime(200), distinctUntilChanged());

    const sortFn = (a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      // names are equal
      return 0;
    };

    combineLatest(this.debouncedText$, this.items$, this.dataUnitType$, this.status$, this.profile$).subscribe((d) => {
      const text = d[0], items = d[1], dataUnitType = d[2], status = d[3], profile = d[4];

      if (items && items.length) {

        this.filteredItems$.next(
          (text === '' && dataUnitType === undefined && status === undefined && profile === undefined) ? items.sort(sortFn) :
            items.filter(item => (
              // filter for search term
              (text === '' || item.scopeNote.toLowerCase().indexOf(text.toLowerCase()) > -1)
              // filter for dataUnitType
              && (dataUnitType === undefined || item.dataUnitType === dataUnitType)
              // filter for status
              && (status === undefined || status === (!item.projRel ? false : item.projRel.is_in_project))
              // filter for profiles
              && (profile === undefined || item.profilePks.indexOf(profile) > -1)
            ))
              .sort(sortFn)
              // highlighting
              .map((item) => ({
                ...item,
                title: this.highilghtPipe.transform(item.title, text),
                scopeNote: this.highilghtPipe.transform(item.scopeNote, text)
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
  dataUnitTypeChange(type) {
    this.selectedType = type;
    this.dataUnitType$.next(type.value)
  }

  /**
 * Called when user changes to see only enabled / disabled or all classes
 */
  dataUnitStatusChange(status) {
    this.selectedStatus = status;
    this.status$.next(status.value)
  }

  /**
   * Called when user changes the profile filter
   */
  dataUnitProfileChange(profile) {
    this.selectedProfile = profile;
    this.profile$.next(profile.value)
  }

  /**
   * Called when user enables class
   */
  enableClass(classItem: ClassItemI) {
    const projRel = new DfhProjRel({
      pk_entity: !classItem.projRel ? undefined : classItem.projRel.pk_entity,
      fk_entity: classItem.pkEntity,
      fk_project: this.project.pk_project,
      is_in_project: true
    })

    this.changeClassProjRel(projRel);
  }

  /**
   * Called when user disables class
   */
  disableClass(classItem: ClassItemI) {
    const projRel = new DfhProjRel({
      pk_entity: classItem.projRel.pk_entity,
      fk_entity: classItem.pkEntity,
      fk_project: this.project.pk_project,
      is_in_project: false
    })

    this.changeClassProjRel(projRel);
  }
}
