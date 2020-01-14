
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProSelector } from 'app/core/pro/pro.service';
import { AddOrCreateEntityModal, AddOrCreateEntityModalData } from 'app/modules/information/components/add-or-create-entity-modal/add-or-create-entity-modal.component';
import { CreateOrAddEntityEvent } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.component';
import { cache } from 'app/shared';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData } from 'app/shared/components/progress-dialog/progress-dialog.component';
import { difference, equals, groupBy, indexBy, path, values, without } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of as observableOf, Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SysConfig } from '../../../../../src/common/config/sys-config';
import { environment } from '../../../environments/environment';
import { DatSelector } from '../dat/dat.service';
import { DfhSelector } from '../dfh/dfh.service';
import { InfActions } from '../inf/inf.actions';
import { InfSelector } from '../inf/inf.service';
import { DatNamespace, InfLanguage, InfPersistentItem, InfPersistentItemApi, InfTemporalEntity, ProProject } from '../sdk';
import { LoopBackConfig } from '../sdk/lb.config';
import { ShouldPauseService } from '../services/should-pause.service';
import { EntityPreviewSocket } from '../sockets/sockets.module';
import { EntityPreview, EntityType } from '../state/models';
import { SucceedActionMeta } from '../store/actions';
import { IAppState, SchemaObject } from '../store/model';
import { SystemSelector } from '../sys/sys.service';
import { ActiveProjectActions } from './active-project.action';
import { ListType, Panel, ProjectDetail, Tab, TypePeIt, TypePreview, TypePreviewsByClass, TypesByPk } from './active-project.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';



@Injectable()
export class ActiveProjectService {
  project: ProProject;

  public activeProject$: Observable<ProjectDetail>;
  public defaultLanguage$: Observable<InfLanguage>;
  public pkProject$: Observable<number>;
  public panels$: Observable<Panel[]>
  public uiIdSerial$: Observable<number>;
  public panelSerial$: Observable<number>;
  public focusedPanel$: Observable<number>;
  public list$: Observable<ListType>; // type of list displayed in left panel
  public creatingMentioning$: Observable<boolean>;
  public typesByPk$: Observable<TypesByPk>
  // public comQueryVersionsByPk$: Observable<EntityVersionsByPk<ProQuery>>
  // public comQueryLoading$: Observable<boolean>
  // public comVisualVersionsByPk$: Observable<EntityVersionsByPk<ProVisual>>
  // public comVisualLoading$: Observable<boolean>
  public datNamespaces$: Observable<DatNamespace[]>
  public initializingProject$: Observable<boolean>;

  // emits true if no toolbox panel is opened
  public dashboardVisible$: Observable<boolean>;

  get state(): ProjectDetail {
    return this.ngRedux.getState().activeProject;
  }

  // classPksEnabledInEntities$: Observable<number[]>

  // object with pk_entity as key of classes where projRel is changing
  changingClassProjRel: { [key: number]: boolean } = {}
  changingSystemRelevantClass: { [key: number]: boolean } = {}

  inf$: InfSelector;
  dat$: DatSelector;
  pro$: ProSelector;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private entityPreviewSocket: EntityPreviewSocket,
    public dialog: MatDialog,
    public dfh$: DfhSelector,
    public sys$: SystemSelector,
    public inf: InfActions,
    private peItApi: InfPersistentItemApi,
    public shouldPause: ShouldPauseService,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.activeProject$ = ngRedux.select<ProjectDetail>(['activeProject']);
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']).pipe(filter(p => p !== undefined));
    this.initializingProject$ = ngRedux.select<boolean>(['activeProject', 'initializingProject']);
    this.defaultLanguage$ = ngRedux.select<InfLanguage>(['activeProject', 'default_language']);
    this.panels$ = ngRedux.select<Panel[]>(['activeProject', 'panels']);
    this.uiIdSerial$ = ngRedux.select<number>(['activeProject', 'uiIdSerial']);
    this.panelSerial$ = ngRedux.select<number>(['activeProject', 'panelSerial']);
    this.focusedPanel$ = ngRedux.select<number>(['activeProject', 'focusedPanel']);
    this.list$ = ngRedux.select<ListType>(['activeProject', 'list']);
    this.typesByPk$ = ngRedux.select<TypesByPk>(['activeProject', 'typesByPk']);
    // this.comQueryVersionsByPk$ = ngRedux.select<EntityVersionsByPk<ProQuery>>(['activeProject', 'comQueryVersionsByPk']);
    // this.comQueryLoading$ = ngRedux.select<boolean>(['activeProject', 'comQueryLoading']);
    // this.comVisualVersionsByPk$ = ngRedux.select<EntityVersionsByPk<ProVisual>>(['activeProject', 'comVisualVersionsByPk']);
    // this.comVisualLoading$ = ngRedux.select<boolean>(['activeProject', 'comVisualLoading']);

    this.creatingMentioning$ = ngRedux.select<boolean>(['activeProject', 'creatingMentioning']);


    this.inf$ = new InfSelector(ngRedux, this.pkProject$);
    this.dat$ = new DatSelector(ngRedux);
    this.pro$ = new ProSelector(ngRedux);

    this.initializingProject$.subscribe(bool => {
      this.shouldPause.shouldPause$.next(bool)
    })

    this.datNamespaces$ = this.pkProject$.pipe(
      mergeMap(pro => this.dat$.namespace$.by_fk_project$.key(pro)),
      map(byPk => values(byPk))
    )

    // emits true if no toolbox panel is opened
    this.dashboardVisible$ = combineLatest(
      ngRedux.select<ProjectDetail>(['information']),
      ngRedux.select<ProjectDetail>(['sources'])
    ).pipe(
      map(items => items.filter(item => (!!item && Object.keys(item).length > 0)).length === 0),
      distinctUntilChanged()
    )


    this.entityPreviewSocket.fromEvent<EntityPreview>('entityPreview').subscribe(data => {
      // dispatch a method to put the EntityPreview to the store
      this.ngRedux.dispatch(this.actions.loadEntityPreviewSucceeded(data))
    })

    this.entityPreviewSocket.fromEvent('reconnect').subscribe(disconnect => {
      // get all EntityPreview keys from state and send them to the
      // server so that they will be streamed. This is important for
      // when connection was lost.
      combineLatest(this.pkProject$, this.activeProject$).pipe(first(items => items.filter(item => !item).length === 0))
        .subscribe(([pkProject, activeProject]) => {
          if (activeProject.entityPreviews) {
            this.entityPreviewSocket.emit('addToStrem', {
              pk_project: pkProject,
              pks: Object.keys(activeProject.entityPreviews)
            })
          }
        })
    })

  }

  @cache({ refCount: false }) pipeActiveProject(): Observable<ProProject> {
    return this.pkProject$.pipe(
      switchMap(pkProject => this.pro$.project$.by_pk_entity$.key(pkProject.toString()))
    ).pipe(filter(l => !!l))
  }
  @cache({ refCount: false }) pipeActiveDefaultLanguage(): Observable<InfLanguage> {
    return this.pipeActiveProject().pipe(
      filter(p => !!p),
      switchMap(project => this.inf$.language$.by_pk_entity$.key(project.fk_language.toString()))
    ).pipe(filter(l => !!l))
  }


  /************************************************************************************
  * ActiveProject init and destroy
  ************************************************************************************/

  /**
   * Initialize the project in state, if the activeProject is not yet
   * in state or if the pk_project of the activeProject in state
   * is not the one provided
   *
   * @param id pk_project
   */
  initProject(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id) {
      this.ngRedux.dispatch(this.actions.loadProjectBasics(id))
    }
  }

  /**
   * Initialize the project configuration data
   * this will load all the classes, properties, system configs, etc.
   * needed to edit a project in the toolbox
   *
   * @param id pk_project
   */
  initProjectConfigData(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id || !state.activeProject.configDataInitialized) {
      this.ngRedux.dispatch(this.actions.loadProjectConfig(id))
    }
  }

  closeProject() {
    this.entityPreviewSocket.emit('leaveProjectRoom');
    this.ngRedux.dispatch(this.actions.destroy())
  }

  /************************************************************************************
  * Load Information
  ************************************************************************************/


  /**
   * Loads a data unit preview, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntity
   * @param forceReload
   */
  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<EntityPreview> {
    const state = this.ngRedux.getState();

    if (!(((state || {}).activeProject || {}).entityPreviews || {})[pkEntity] || forceReload) {
      this.pkProject$.pipe(first(pk => !!pk)).subscribe(pkProject => {

        this.entityPreviewSocket.emit('addToStrem', {
          pk_project: pkProject,
          pks: [pkEntity]
        })
        const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;

        this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
      })
    }

    return this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', pkEntity])
      .pipe(
        distinctUntilChanged<EntityPreview>(equals),
        filter(prev => (!!prev))
      )
  }



  /**
   * Loads a chunk, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntity
   * @param forceReload
   */
  loadChunk(pkEntity: number, forceReload?: boolean) {
    const state = this.ngRedux.getState();
    if (!(((state || {}).activeProject || {}).chunks || {})[pkEntity] || forceReload) {
      this.ngRedux.dispatch(this.actions.loadChunk(state.activeProject.pk_project, pkEntity))
    }
  }





  /**
   * Loads a peIt-Graph, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntities
   * @param forceReload
   */
  loadPeItGraphs(pkEntities: number[], forceReload?: boolean): Observable<InfPersistentItem[]> {
    if (!pkEntities || pkEntities.length == 0) return observableOf([]);

    let pkEntitiesToReload = pkEntities;

    if (!forceReload) {
      const state = this.ngRedux.getState();
      const keys = Object.keys(((state.activeProject || {}).peItGraphs || {})).map(key => parseInt(key, 10));
      pkEntitiesToReload = without(keys, pkEntities);
    }

    if (pkEntitiesToReload && pkEntitiesToReload.length) {
      this.ngRedux.select<number>(['activeProject', 'pk_project']).pipe(first(pkProject => !!pkProject)).subscribe(pkProject => {
        this.ngRedux.dispatch(this.actions.loadPeItGraphs(pkProject, pkEntitiesToReload))
      })
    }

    return combineLatest(
      pkEntities.map(pk => this.ngRedux.select<InfPersistentItem>(['activeProject', 'peItGraphs', pk]))
    ).pipe(
      filter(items => items.filter(item => !item).length === 0)
    )

  }

  /**
     * Loads a teEn-Graph, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param pkEntities
     * @param forceReload
     */
  loadTeEnGraphs(pkEntities: number[], forceReload?: boolean): Observable<InfTemporalEntity[]> {
    if (!pkEntities || pkEntities.length == 0) return observableOf([]);


    let pkEntitiesToReload = pkEntities;

    if (!forceReload) {
      const state = this.ngRedux.getState();
      const keys = Object.keys(((state.activeProject || {}).teEnGraphs || {})).map(key => parseInt(key, 10));
      pkEntitiesToReload = without(keys, pkEntities);
    }

    if (pkEntitiesToReload && pkEntitiesToReload.length) {
      this.ngRedux.select<number>(['activeProject', 'pk_project']).pipe(first(pkProject => !!pkProject)).subscribe(pkProject => {
        this.ngRedux.dispatch(this.actions.loadTeEnGraphs(pkProject, pkEntitiesToReload))
      })
    }

    return combineLatest(
      pkEntities.map(pk => this.ngRedux.select<InfTemporalEntity>(['activeProject', 'teEnGraphs', pk]))
    ).pipe(filter(items => items.filter(item => !item).length === 0))

  }

  /**
   * Loads a Entity Detail (PeItDetail or TeEnDetail) in cache for display in Modals
   *
   * @param pkEntity
   * @param forceReload
   */
  loadEntityDetailForModal(pkEntity: number, forceReload = true, pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE) {
    const state = this.ngRedux.getState();
    if (!(((state || {}).activeProject || {}).peItModals || {})[pkEntity] || forceReload) {
      this.ngRedux.dispatch(this.actions.loadEntityDetailForModal(state.activeProject.pk_project, pkEntity, pkUiContext))
    }
  }

  /**
   * Loads inits a request to get all types for given classes
   * @returns Observable for an object containing array of TypePreview grouped
   *          by the pk of the typed class
   */
  streamTypePreviewsByClass(pkClasses: number[], forceReload = false): Observable<TypePreviewsByClass> {

    if (!pkClasses || pkClasses.length === 0) return new BehaviorSubject({});

    if (forceReload) {
      this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
        this.ngRedux.dispatch(this.actions.loadTypes(pk, pkClasses))
      })
    } else {
      // if there are classes that are not yet loaded
      const state = this.ngRedux.getState();
      const loadedPks = Object.keys(path(['activeProject', 'typesByClass'], state) || {}).map(pk => parseInt(pk, 10));
      const toLoad = difference(pkClasses, loadedPks);
      if (toLoad.length) {
        this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
          this.ngRedux.dispatch(this.actions.loadTypes(pk, toLoad))
        })
      }

    }

    const types$ = combineLatest(pkClasses.map(pkClass => this.ngRedux.select<TypePeIt[]>(['activeProject', 'typesByClass', pkClass]))).pipe(
      map(typess => {
        const ts: TypePeIt[] = [];
        (typess || []).forEach(types => (types || []).forEach(type => ts.push(type)))
        return ts;
      }),
      tap(test => {
        test;
      })
    );
    const previews$: Observable<EntityPreview[]> = types$.pipe(
      filter(typess => !!typess),
      mergeMap(types => {
        return types.length ?
          combineLatest(types.map(type => this.streamEntityPreview(type.pk_entity))) :
          new BehaviorSubject<EntityPreview[]>([])
      }),
      filter(pre => !pre.find(p => !(p.pk_entity))),
      tap(test => {
        test;
      })
    )


    return combineLatest(previews$, types$).pipe(
      filter(([previews, types]) => (previews.length === types.length)),
      map(([previews, types]) => {
        const previewsByPk = indexBy((e) => e.pk_entity.toString(), previews)

        const a = types
          .filter(t => !!previewsByPk[t.pk_entity.toString()])
          .map(type => ({
            fk_typed_class: type.fk_typed_class,
            ...previewsByPk[type.pk_entity.toString()]
          } as TypePreview))

        return groupBy((t) => t.fk_typed_class.toString(), a);
      })
    );
  }

  // reloadTypesForClassesInProject() {
  //   this.classPksEnabledInEntities$.pipe(first(([classes]) => !!classes))
  //     .subscribe((classesInProject) => {
  //       this.streamTypePreviewsByClass(classesInProject)
  //     })
  // }

  // loadQueries() {
  //   this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
  //     this.ngRedux.dispatch(this.actions.loadQueries(pk))
  //   })
  //   return this.comQueryVersionsByPk$;
  // }

  // loadQueryVersion(pkEntity: number, entityVersion: number) {
  //   const state = this.ngRedux.getState();

  //   if (
  //     pkEntity && entityVersion &&
  //     // if not yet loading
  //     (!state.activeProject
  //       || !state.activeProject.comQueryVersionLoading
  //       || !state.activeProject.comQueryVersionLoading[pkEntity + '_' + entityVersion]
  //     )) {
  //     this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
  //       this.ngRedux.dispatch(this.actions.loadQueryVersion(pk, pkEntity, entityVersion))
  //     })
  //   }
  //   return this.comQueryVersionsByPk$;
  // }

  // loadVisuals() {
  //   this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
  //     this.ngRedux.dispatch(this.actions.loadVisuals(pk))
  //   })
  //   return this.comVisualVersionsByPk$;
  // }

  // /**
  //  * Loads one specific visual version
  //  * @param pkEntity pk_entity of visual
  //  * @param entityVersion if no entity_version provided, returns latest version
  //  */
  // loadVisualVersion(pkEntity: number, entityVersion: number = null) {
  //   this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
  //     this.ngRedux.dispatch(this.actions.loadVisualVersion(pk, pkEntity, entityVersion))
  //   })
  //   return this.comVisualVersionsByPk$;
  // }

  /************************************************************************************
  * Change Project Relations
  ************************************************************************************/
  // changeClassProjRel(projRel: ProDfhClassProjRel, dfh_pk_class: number) {
  //   this.ngRedux.dispatch(this.actions.upsertClassProjRel(projRel, dfh_pk_class))
  // }

  removePeIt(pk_entity: number) {
    const s = new Subject<SucceedActionMeta<InfPersistentItem>>();
    combineLatest(
      this.inf$.persistent_item$.by_pk_entity$.key(pk_entity).pipe(filter(x => !!x)),
      this.pkProject$,
    )
      .pipe(first())
      .subscribe(([persistentItem, pkProject]) => {
        this.inf.persistent_item.remove([persistentItem], pkProject)
          .resolved$
          .pipe()
          .subscribe(res => s.next(res))
      })
    return s;
  }

  addPeItToProject(pkEntity: number, cb: (schemaObject: SchemaObject) => any) {
    this.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)
      const call$ = this.peItApi.addToProject(pkProject, pkEntity)
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {

          title: 'Adding entity to your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: SchemaObject) => {
          cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
  }


  /************************************************************************************
  * Mentioning
  ************************************************************************************/

  // updateSelectedChunk(c: DatChunk) {
  //   this.ngRedux.dispatch(this.actions.updateSelectedChunk(c))
  // }

  // setRefiningChunk(bool: boolean) {
  //   this.ngRedux.dispatch(this.actions.setRefiningChunk(bool))
  // }

  mentioningsFocusedInText(pks: number[]) {
    this.ngRedux.dispatch(this.actions.setMentioningsFocusedInText(pks))
  }

  mentioningsFocusedInTable(pks: number[]) {
    this.ngRedux.dispatch(this.actions.setMentioningsFocusedInTable(pks))
  }

  /************************************************************************************
  * Layout -- Tabs
  ************************************************************************************/
  setPanels(panels: Panel[], uiIdSerial: number, panelSerial: number, focusedPanel: number) {
    this.ngRedux.dispatch(this.actions.setPanels(panels, uiIdSerial, panelSerial, focusedPanel))
  }
  // List (left panel) modifications
  setListType(list: ListType) {
    this.ngRedux.dispatch(this.actions.setListType(list))
  }
  // Tab modifications
  activateTab(panelIndex: number, tabIndex: number) {
    this.ngRedux.dispatch(this.actions.activateTab(panelIndex, tabIndex))
  }
  moveTab(previousPanelIndex: number, currentPanelIndex: number, previousTabIndex: number, currentTabIndex: number) {
    this.ngRedux.dispatch(this.actions.moveTab(previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex))
  }
  closeTab(panelIndex: number, tabIndex: number) {
    this.ngRedux.dispatch(this.actions.closeTab(panelIndex, tabIndex))
  }
  addTab<D>(tab: Tab<D>) {
    this.ngRedux.dispatch(this.actions.addTab(tab))
  }
  focusPanel(panelIndex: number) {
    this.ngRedux.dispatch(this.actions.focusPanel(panelIndex))
  }
  splitPanel(previousPanelIndex: number, tabIndex: number, currentPanelIndex: number) {
    this.ngRedux.dispatch(this.actions.splitPanel(previousPanelIndex, tabIndex, currentPanelIndex))
  }

  // Tab data selections
  getTabTitle(path: string[]): Observable<string> {
    return this.ngRedux.select<string>([...['activeProject', 'tabLayouts', path[2]], 'tabTitle']);
  }
  getTabTooltip(path: string[]): Observable<string> {
    return this.ngRedux.select<string>([...['activeProject', 'tabLayouts', path[2]], 'tabTooltip']);
  }
  getTabLoading(path: string[]): Observable<boolean> {
    return this.ngRedux.select<boolean>([...['activeProject', 'tabLayouts', path[2]], 'loading']);
  }

  addEntityTab(pkEntity: number, pkClass: number, entityType: EntityType) {
    if (entityType === 'teEn') {
      this.addEntityTeEnTab(pkEntity)
    }
    else if (pkClass === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
      this.addSourceExpressionPortionTab(pkEntity)
    }
    else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(pkClass)) {
      this.addSourceTab(pkEntity)
    }
    else {
      this.addEntityPeItTab(pkEntity)
    }
  }

  private addSourceTab(pkEntity: number) {
    this.addTab({
      active: true,
      component: 'pe-it-detail',
      icon: 'source',
      pathSegment: 'peItDetails',
      data: {
        pkEntity: pkEntity,
        peItDetailConfig: {
          peItDetail: {

            showMentionedEntities: true,
            showMentionedEntitiesToggle: true,

            showAssertions: false,
            showAssertionsToggle: false,

            showSectionList: true,
            showSectionListToggle: true,

            showProperties: true,
            showPropertiesToggle: true,

            showPropertiesHeader: true,
            // showAddAPropertyButton: false,

          },
          stateSettings: {
            pkUiContext: SysConfig.PK_UI_CONTEXT_SOURCES_EDITABLE
          }
        }
      }
    });
  }

  private addSourceExpressionPortionTab(pkEntity: number) {
    this.addTab({
      active: true,
      component: 'pe-it-detail',
      icon: 'expression-portion',
      data: {
        pkEntity: pkEntity,
        peItDetailConfig: {
          peItDetail: {
            showSectionList: true,
            showSectionListToggle: true,
            showProperties: true,
            showPropertiesToggle: true,
            showMap: false,
            showMapToggle: false,
            showTimeline: false,
            showTimelineToggle: false,
            showSources: false,
            showSourcesToggle: false
          }
        }
      },
      pathSegment: 'peItDetails'
    })
  }

  private addEntityPeItTab(pkEntity: number) {

    this.addTab({
      active: true,
      component: 'pe-it-detail',
      icon: 'persistent-entity',
      pathSegment: 'peItDetails',
      data: {
        pkEntity: pkEntity,
        peItDetailConfig: {
          peItDetail: {
            showProperties: true,
            showPropertiesToggle: true,
            showMap: false,
            showMapToggle: false,
            showTimeline: false,
            showTimelineToggle: false,
            showSources: true,
            showSourcesToggle: true,
            showRightArea: false

          }
        }

      }
    })


  }

  private addEntityTeEnTab(pkEntity: number) {
    this.addTab({
      active: true,
      component: 'te-en-detail',
      icon: 'temporal-entity',
      pathSegment: 'teEnDetails',
      data: {
        pkEntity: pkEntity,
        teEntDetailConfig: {
          teEntDetail: {
            showRightArea: false,
            showSources: true,
            showSourcesToggle: true,
          }
        }
      }
    })
  }

  addTextTab(pkEntity: number) {
    this.addTab({
      active: true,
      component: 'text-detail',
      icon: 'text',
      data: {
        pkEntity: pkEntity
      },
      pathSegment: 'textDetails'
    })
  }

  /************************************************************************************
  * Layout -- Modals
  ************************************************************************************/

  /**
   * Returns an observable that emits the added entity
   */
  openModalCreateOrAddEntity(config: AddOrCreateEntityModalData) {
    const observable = new Subject<CreateOrAddEntityEvent>();

    // this.ngRedux.dispatch(this.actions.openAddForm(config));

    this.dialog.open<AddOrCreateEntityModal, AddOrCreateEntityModalData, CreateOrAddEntityEvent>(
      AddOrCreateEntityModal,
      {
        height: '90%',
        width: '90%',
        data: config
      })
      .afterClosed().pipe(first()).subscribe(result => {
        // this.ngRedux.dispatch(this.actions.closeAddForm());
        if (result) observable.next(result)
      });

    return observable;
  }
  /**
   * Opens dialog to get confirmation before removing
   * peIt from project. If user confirms, the dialog
   * removes peIt and closes
   */
  openRemovePeItDialog(entityLabel: string, pkEntity: number) {
    const s = new Subject<void>();

    const data: ConfirmDialogData = {
      noBtnText: 'Cancel',
      yesBtnText: 'Remove',
      yesBtnColor: 'warn',
      title: 'Remove ' + entityLabel,
      paragraphs: ['Are you sure?'],

    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data })
    dialog.afterClosed().pipe(first()).subscribe(confirmed => {
      if (confirmed) {
        this.removePeIt(pkEntity).pipe(first(success => !!success)).subscribe(() => {
          // removed
          s.next()
        })
      }
    })

    return s;
  }



}
