
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProSelector } from 'app/core/pro/pro.service';
import { AddOrCreateEntityDialogComponent, AddOrCreateEntityDialogData, CreateOrAddEntityEvent } from 'app/modules/base/components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { cache } from 'app/shared';
import { ConfirmDialogComponent, ConfirmDialogData } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData } from 'app/shared/components/progress-dialog/progress-dialog.component';
import { difference, equals, groupBy, indexBy, path, values, without } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of as observableOf, ReplaySubject, Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { SysConfig } from '../../../../../server/lb3app/src/common/config/sys-config';
import { environment } from '../../../environments/environment';
import { DatSelector } from '../dat/dat.service';
import { DfhSelector } from '../dfh/dfh.service';
import { InfActions } from '../inf/inf.actions';
import { InfSelector } from '../inf/inf.service';
import { DatNamespace, InfLanguage, InfPersistentItem, InfTemporalEntity, ProProject, WarEntityPreview } from '../sdk';
import { LoopBackConfig } from '../sdk/lb.config';
import { ShouldPauseService } from '../services/should-pause.service';
import { EntityPreviewSocket } from '../sockets/sockets.module';
import { EntityDetail, EntityPreview, EntityType } from '../state/models';
import { IAppState, SchemaObject } from '../store/model';
import { SchemaObjectService } from '../store/schema-object.service';
import { SystemSelector } from '../sys/sys.service';
import { WarActions } from '../war/war.actions';
import { ActiveProjectActions } from './active-project.action';
import { ListType, Panel, ProjectDetail, RamSource, Tab, TypePeIt, TypePreview, TypePreviewsByClass, TypesByPk } from './active-project.models';



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

  /***************************************************************
   * Ram (Refers to, Annotated in, Mentioned in)
   ***************************************************************/
  ramOpen$ = new BehaviorSubject(false);
  ramSource$ = new ReplaySubject<RamSource>();
  ramProperty$ = new ReplaySubject<number>()
  ramTarget$ = new ReplaySubject<number>();
  ramTitle$ = new ReplaySubject<string>();
  ramTitlePart2$ = new ReplaySubject<string>();
  ramBoxLeft$ = new ReplaySubject<'select-text' | 'drag-source-or-section'>();
  ramBoxCenter$ = new ReplaySubject<boolean>();
  ramBoxRight$ = new ReplaySubject<boolean>();
  ramTargetIsFix$ = new BehaviorSubject<boolean>(false);


  requestedEntityPreviews: { [pkEntity: number]: boolean } = {}

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private warActions: WarActions,
    private entityPreviewSocket: EntityPreviewSocket,
    public dialog: MatDialog,
    public dfh$: DfhSelector,
    public sys$: SystemSelector,
    public inf: InfActions,
    public shouldPause: ShouldPauseService,
    private s: SchemaObjectService,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.activeProject$ = ngRedux.select<ProjectDetail>(['activeProject']);
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']).pipe(
      filter(p => p !== undefined),
      distinctUntilChanged((x, y) => {
        return x === y
      })
    );
    this.initializingProject$ = ngRedux.select<boolean>(['activeProject', 'initializingProject']);
    this.defaultLanguage$ = ngRedux.select<InfLanguage>(['activeProject', 'default_language']);
    this.panels$ = ngRedux.select<Panel[]>(['activeProject', 'panels']);
    this.uiIdSerial$ = ngRedux.select<number>(['activeProject', 'uiIdSerial']);
    this.panelSerial$ = ngRedux.select<number>(['activeProject', 'panelSerial']);
    this.focusedPanel$ = ngRedux.select<number>(['activeProject', 'focusedPanel']);
    this.list$ = ngRedux.select<ListType>(['activeProject', 'list']);
    this.typesByPk$ = ngRedux.select<TypesByPk>(['activeProject', 'typesByPk']);
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


    this.entityPreviewSocket.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      // dispatch a method to put the EntityPreview to the store
      this.warActions.entity_preview.loadSucceeded([data], '')
    })

    this.entityPreviewSocket.fromEvent('reconnect').subscribe(disconnect => {
      // get all EntityPreview keys from state and send them to the
      // server so that they will be streamed. This is important for
      // when connection was lost.
      this.pkProject$.pipe(first())
        .subscribe((pkProject) => {
          const pks = Object.keys({
            ...this.ngRedux.getState().war.entity_preview,
            ...this.requestedEntityPreviews
          });
          if (pks.length) {
            this.entityPreviewSocket.emit('addToStream', {
              pkProject,
              pks
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

    if (
      (
        !(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
        !this.requestedEntityPreviews[pkEntity]
      ) || forceReload) {
      this.pkProject$.pipe(first(pk => !!pk)).subscribe(pkProject => {

        this.entityPreviewSocket.emit('addToStream', {
          pkProject,
          pks: [pkEntity]
        })
        // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;

        // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
        this.requestedEntityPreviews[pkEntity] = true;
      })
    }

    return this.ngRedux.select<EntityPreview>(['war', 'entity_preview', 'by_pk_entity', pkEntity])
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
      })
    );
    const previews$: Observable<EntityPreview[]> = types$.pipe(
      filter(typess => !!typess),
      mergeMap(types => {
        return types.length ?
          combineLatest(types.map(type => this.streamEntityPreview(type.pk_entity))) :
          new BehaviorSubject<EntityPreview[]>([])
      }),
      filter(pre => !pre.find(p => !(p.pk_entity)))
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

  /************************************************************************************
  * Change Project Relations
  ************************************************************************************/

  removeEntityFromProject(pkEntity: number, cb?: (schemaObject: SchemaObject) => any) {
    this.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)
      const call$ = this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject)
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {
          title: 'Removing entity from your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: SchemaObject) => {
          if (cb) cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
  }

  addEntityToProject(pkEntity: number, cb?: (schemaObject: SchemaObject) => any): Observable<SchemaObject> {
    const s$ = new Subject<SchemaObject>()
    this.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)
      const call$ = this.s.store(this.s.api.addEntityToProject(pkProject, pkEntity), pkProject)
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
          s$.next(schemaObject)
          if (cb) cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
    return s$;
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

  ramReset() {
    this.ramOpen$.next(false);
    this.ramSource$.next();
    this.ramTarget$.next();
    this.ramProperty$.next()
    this.ramTitle$.next()
    this.ramTitlePart2$.next()
    this.ramBoxLeft$.next()
    this.ramBoxCenter$.next(false)
    this.ramBoxRight$.next(false)
    this.ramTargetIsFix$.next(false)
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
    // if (entityType === 'teEn') {
    //   this.addEntityTeEnTab(pkEntity)
    // }
    // else
    if (pkClass === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
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

    const peItDetail = new EntityDetail({
      showHeader: true,
      showProperties: true,
      showRightArea: false,
      rightPanelTabs: [
        'content-tree'
      ],
      rightPanelActiveTab: 0
    })

    this.addTab({
      active: true,
      component: 'entity-detail',
      icon: 'source',
      pathSegment: 'peItDetails',
      data: {
        pkEntity: pkEntity,
        peItDetailConfig: {
          peItDetail
        }
      }
    });
  }

  private addSourceExpressionPortionTab(pkEntity: number) {
    const peItDetail = new EntityDetail({
      showHeader: true,
      showProperties: true,
      showRightArea: false,
      rightPanelTabs: [
        'content-tree'
      ],
      rightPanelActiveTab: 0
    })

    this.addTab({
      active: true,
      component: 'entity-detail',
      icon: 'expression-portion',
      data: {
        pkEntity: pkEntity,
        peItDetailConfig: {
          peItDetail
        }
      },
      pathSegment: 'peItDetails'
    })
  }

  private addEntityPeItTab(pkEntity: number) {
    const peItDetail = new EntityDetail({
      showHeader: true,
      showProperties: true,
      showRightArea: false,
      rightPanelTabs: [
        'linked-sources',
        'linked-digitals'
      ],
      rightPanelActiveTab: 0
    })

    this.addTab({
      active: true,
      component: 'entity-detail',
      icon: 'persistent-entity',
      pathSegment: 'peItDetails',
      data: {
        pkEntity: pkEntity,
        peItDetailConfig: {
          peItDetail
        }
      }
    })


  }

  // private addEntityTeEnTab(pkEntity: number) {
  //   this.addTab({
  //     active: true,
  //     component: 'te-en-detail',
  //     icon: 'temporal-entity',
  //     pathSegment: 'teEnDetails',
  //     data: {
  //       pkEntity: pkEntity,
  //       teEntDetailConfig: {
  //         teEntDetail: {
  //           showRightArea: false,
  //           showSources: true,
  //           showSourcesToggle: true,
  //           showDigitals: false,
  //           showDigitalsToggle: true,
  //         }
  //       }
  //     }
  //   })
  // }

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


  addTableTab(pkEntity: number) {
    this.addTab({
      active: true,
      component: 'table-detail',
      icon: 'table',
      data: {
        pkEntity: pkEntity
      },
      pathSegment: 'tableDetails'
    })
  }

  /************************************************************************************
  * Layout -- Modals
  ************************************************************************************/

  /**
   * Returns an observable that emits the added entity
   */
  openModalCreateOrAddEntity(config: AddOrCreateEntityDialogData) {
    const observable = new Subject<CreateOrAddEntityEvent>();

    // this.ngRedux.dispatch(this.actions.openAddForm(config));

    this.dialog.open<AddOrCreateEntityDialogComponent, AddOrCreateEntityDialogData, CreateOrAddEntityEvent>(
      AddOrCreateEntityDialogComponent,
      {
        // height: '90%',
        // width: '90%',
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
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
   * entity from project. If user confirms, the dialog
   * removes entity and closes
   */
  openRemoveEntityDialog(entityLabel: string, pkEntity: number) {
    const s = new Subject<void>();

    const data: ConfirmDialogData = {
      noBtnText: 'Cancel',
      yesBtnText: 'Remove',
      yesBtnColor: 'warn',
      title: 'Remove ' + entityLabel,
      paragraphs: ['Are you sure?'],

    }
    this.pkProject$.pipe(first()).subscribe(pkProject => {
      const dialog = this.dialog.open(ConfirmDialogComponent, { data })

      dialog.afterClosed().pipe(first()).subscribe(confirmed => {
        if (confirmed) {
          this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject)
            .pipe(first(success => !!success)).subscribe(() => {
              s.next()
            })
        }
      })
    })

    return s;
  }



}
