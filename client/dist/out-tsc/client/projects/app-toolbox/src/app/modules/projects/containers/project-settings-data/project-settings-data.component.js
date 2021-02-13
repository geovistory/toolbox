import * as tslib_1 from "tslib";
import { select, WithSubStore } from '@angular-redux/store';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import { matExpansionAnimations } from '@angular/material/expansion';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { ClassConfigDialogComponent } from 'projects/app-toolbox/src/app/modules/class-config/components/class-config-dialog/class-config-dialog.component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { HighlightPipe } from 'projects/app-toolbox/src/app/shared/pipes/highlight/highlight.pipe';
import { equals, indexBy, values } from 'ramda';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import * as Config from '../../../../../../../../../server/lb3app/common/config/Config';
import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb3';
import { DetailContentComponent } from 'projects/app-toolbox/src/app/shared/components/detail-content/detail-content.component';
import { ProjectSettingsDataAPIActions } from './api/project-settings-data.actions';
import { projectSettingsDataReducer } from './api/project-settings-data.reducer';
let ProjectSettingsDataComponent = class ProjectSettingsDataComponent extends ProjectSettingsDataAPIActions {
    constructor(rootEpics, 
    // private epics: ProjectSettingsDataAPIEpics,
    ngRedux, highilghtPipe, p, ref, dialog, c) {
        super();
        this.rootEpics = rootEpics;
        this.ngRedux = ngRedux;
        this.highilghtPipe = highilghtPipe;
        this.p = p;
        this.ref = ref;
        this.dialog = dialog;
        this.c = c;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // columns of the table
        this.displayedColumns = [];
        // dataSource
        this.dataSource = new MatTableDataSource();
        // filtered ClassItems
        this.filteredItems$ = new Subject();
        // search string observable
        this.text$ = new BehaviorSubject('');
        // Entity type Filter
        this.typeOptions = [
            { value: undefined, label: 'All' },
            { value: 'peIt', label: '<i class="gv-icon gv-icon-persistent-entity"></i> Persistent Entity Classes' },
            { value: 'teEnt', label: '<i class="fa fa-star-o"></i> Temporal Entity Classes' }
        ];
        this.selectedType = this.typeOptions[0];
        this.subclassOf$ = new BehaviorSubject(undefined);
        // Status Filter
        this.statusOptions = [
            { value: undefined, label: 'All' },
            { value: true, label: 'Enabled Classes' },
            { value: false, label: 'Disabled Classes' }
        ];
        this.selectedStatus = this.statusOptions[0];
        this.status$ = new BehaviorSubject(undefined);
        // Basic Classes Filter
        this.showBasicClasses$ = new BehaviorSubject(false);
        // Profile Filter
        this.profileOptions = [
            { value: undefined, label: 'All' }
        ];
        this.selectedProfile = this.profileOptions[0];
        this.profile$ = new BehaviorSubject(undefined);
        // Sort Settings
        this.sorting$ = new BehaviorSubject({ active: 'label', direction: 'asc' });
        this.getBasePath = () => this.basePath;
        this.initFilter = () => {
            this.debouncedText$ = this.text$.pipe(debounceTime(200), distinctUntilChanged());
            combineLatest(this.debouncedText$, this.items$, this.subclassOf$, this.status$, this.profile$, this.sorting$, this.showBasicClasses$).pipe(distinctUntilChanged(equals))
                .subscribe((d) => {
                const text = d[0], items = d[1], subclassOf = d[2], status = d[3], profile = d[4], sorting = d[5], showBasicClasses = d[6];
                const sortFn = (a, b) => {
                    let nameA;
                    let nameB;
                    if (typeof a[sorting.active] === 'string') {
                        nameA = a[sorting.active].toUpperCase(); // ignore upper and lowercase
                        nameB = b[sorting.active].toUpperCase(); // ignore upper and lowercase
                    }
                    else if (typeof a[sorting.active] === 'boolean') {
                        nameA = a[sorting.active] ? 0 : 1;
                        nameB = b[sorting.active] ? 0 : 1;
                    }
                    if (nameA < nameB)
                        return sorting.direction === 'asc' ? -1 : 1;
                    if (nameA > nameB)
                        return sorting.direction === 'asc' ? 1 : -1;
                    // names are equal
                    return 0;
                };
                if (items && items.length) {
                    const mapped = items.map(i => (Object.assign({}, i, { enabled_in_entities: (!i.projRel ? false : i.projRel.enabled_in_entities), subclassOf: (i.subclassOf || 'other') })));
                    this.filteredItems$.next((text === '' && subclassOf === undefined && status === undefined && profile === undefined && showBasicClasses === true) ?
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
                            && (profile === undefined || item.profilePks.indexOf(profile) > -1)))
                            .sort(sortFn)
                            // highlighting
                            .map((item) => (Object.assign({}, item, { label: this.highilghtPipe.transform(item.label, text), identifier_in_namespace: this.highilghtPipe.transform(item.identifier_in_namespace, text), 
                            // dfh_standard_label: this.highilghtPipe.transform(item.dfh_standard_label, text),
                            scopeNote: this.highilghtPipe.transform(item.scopeNote, text) }))));
                }
            });
        };
        // this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
        // this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
        this.filteredItems$.pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.dataSource.data = items;
        });
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, projectSettingsDataReducer);
        // this.rootEpics.addEpic(this.epics.createEpics(this));
        this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
        this.p.pro$.dfh_profile_proj_rel.loadOfProject(this.p.state.pk_project);
        const classesEnabledByProfiles$ = this.c.pipeClassesEnabledByProjectProfiles();
        this.items$ = classesEnabledByProfiles$
            .pipe(switchMap((dfhClasses) => {
            return combineLatestOrEmpty(
            // Pipe all related informations for each class
            dfhClasses.map(dfhClass => combineLatest(this.c.pipeClassLabel(dfhClass.pk_class), this.p.pro$.dfh_class_proj_rel$.by_fk_project__fk_class$
                .key(this.p.state.pk_project + '_' + dfhClass.pk_class), this.p.sys$.system_relevant_class$.by_fk_class$
                .key(dfhClass.pk_class), this.p.dfh$.label$.by_fk_profile__type$.all$, this.c.pipeProfilesEnabledByProject(), this.c.pipeTypeClassesEnabledByProjectProfiles())
                .pipe(map(([label, projRel, sysClass, profileLabels, enabledProfiles, typeClasses]) => {
                const typeClassMap = indexBy((c) => c.pk_class.toString(), typeClasses);
                const { pk_class, identifier_in_namespace } = dfhClass;
                const systemRelevantClass = U.firstItemInObject(sysClass);
                const { excluded_from_entities, required_by_basics, required_by_entities, required_by_sources } = systemRelevantClass || {};
                const profiles = [];
                dfhClass.profiles.forEach(p => {
                    if (enabledProfiles.includes(p.fk_profile)) {
                        const profile = {
                            label: !profileLabels ?
                                '* label missing *' :
                                (values(profileLabels[p.fk_profile + '_label']) || [{ label: '* label missing *' }])[0].label,
                            removedFromApi: p.removed_from_api,
                            fkProfile: p.fk_profile,
                        };
                        profiles.push(profile);
                    }
                });
                const item = {
                    pkClass: pk_class,
                    identifier_in_namespace,
                    scopeNote: '',
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
                };
                return item;
            }))));
        }));
        this.initFilter();
        this.t.setTabTitle('Settings > Classes');
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
            if (pkProject === Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT) {
                this.displayedColumns = [
                    ...this.displayedColumns,
                    'edit_required_by_basics',
                    'edit_required_by_sources',
                    // 'edit_required_by_entities',
                    'edit_excluded_from_entities',
                ];
            }
        });
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    /**
     * Called when user types something in the search filter
     */
    textFilter(text) {
        this.text$.next(text);
    }
    /**
     * Called when user changes to see only teEnt / peIt or all classes
     */
    subclassOfChange(type) {
        this.selectedType = type;
        this.subclassOf$.next(type.value);
    }
    /**
   * Called when user changes to see only enabled / disabled or all classes
   */
    entityStatusChange(status) {
        this.selectedStatus = status;
        this.status$.next(status.value);
    }
    /**
     * Called when user changes the profile filter
     */
    entityProfileChange(profile) {
        this.selectedProfile = profile;
        this.profile$.next(profile.value);
    }
    /**
     * Called when user changes the sorting of the table data
     */
    sortData(sort) {
        this.sorting$.next(sort);
    }
    /**
     * Called when user enables class
     */
    enableClass(classItem) {
        this.toggleClass(classItem, true);
    }
    /**
     * Called when user disables class
     */
    disableClass(classItem) {
        this.toggleClass(classItem, false);
    }
    toggleClass(classItem, enabledInEntities) {
        this.p.changingClassProjRel[classItem.pkClass] = true;
        const projRel = new ProDfhClassProjRel({
            pk_entity: (classItem.projRel || { pk_entity: undefined }).pk_entity,
            fk_class: classItem.pkClass,
            fk_project: this.p.state.pk_project,
            enabled_in_entities: enabledInEntities
        });
        this.p.pro$.dfh_class_proj_rel.upsert([projRel], this.p.state.pk_project)
            .resolved$.pipe(takeUntil(this.destroy$)).subscribe(resolved => {
            if (resolved)
                this.p.changingClassProjRel[classItem.pkClass] = false;
        });
    }
    openControlledVocab(classItem) {
        this.p.addTab({
            active: true,
            component: 'contr-vocab-settings',
            icon: 'settings',
            pathSegment: 'contrVocabSettings',
            data: { pkClass: classItem.pkClass }
        });
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
    openClassConfig(classItem) {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(fkProject => {
            const data = {
                fkAppContext: 45,
                fkClass: classItem.pkClass,
                fkProject
            };
            this.dialog.open(ClassConfigDialogComponent, {
                data,
                height: 'calc(100% - 30px)',
                width: '850px',
                maxWidth: '100%',
            });
        });
    }
    toggleSystemRelevantClassBool(classItem, col) {
        this.p.changingSystemRelevantClass[classItem.pkClass] = true;
        this.p.sys$.system_relevant_class.upsert([
            Object.assign({}, classItem.systemRelevantClass, { fk_class: classItem.pkClass, [col]: !classItem.systemRelevantClass ? true : !classItem.systemRelevantClass[col] })
        ]).resolved$.pipe(takeUntil(this.destroy$)).subscribe((resolved) => {
            if (resolved)
                this.p.changingSystemRelevantClass[classItem.pkClass] = false;
        });
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], ProjectSettingsDataComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], ProjectSettingsDataComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(DetailContentComponent, { static: true })
], ProjectSettingsDataComponent.prototype, "detailContentComponent", void 0);
tslib_1.__decorate([
    Input()
], ProjectSettingsDataComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    select()
], ProjectSettingsDataComponent.prototype, "loading$", void 0);
ProjectSettingsDataComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: projectSettingsDataReducer
    }),
    Component({
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
], ProjectSettingsDataComponent);
export { ProjectSettingsDataComponent };
//# sourceMappingURL=project-settings-data.component.js.map