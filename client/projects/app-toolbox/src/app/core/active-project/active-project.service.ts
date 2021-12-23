
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, DatSelector, DfhSelector, InfSelector, ProSelector, ShouldPauseService, SysSelector, TabSelector } from '@kleiolab/lib-queries';
import { ActiveProjectActions, EntityDetail, IAppState, InfActions, ListType, Panel, PanelTab, ProjectDetail, RamSource, ReduxMainService, SchemaService } from '@kleiolab/lib-redux';
import { DatNamespace, InfLanguage, LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { GvPositiveSchemaObject, ProProject } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData } from 'projects/app-toolbox/src/app/shared/components/progress-dialog/progress-dialog.component';
import { values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';






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
  // public typesByPk$: Observable<TypesByPk>
  public datNamespaces$: Observable<DatNamespace[]>
  public initializingProject$: Observable<boolean>;

  // emits true if no toolbox panel is opened
  public dashboardVisible$: Observable<boolean>;


  // classPksEnabledInEntities$: Observable<number[]>

  // object with pk_entity as key of classes where projRel is changing
  changingClassProjRel: { [key: number]: boolean } = {}
  changingSystemRelevantClass: { [key: number]: boolean } = {}

  inf$: InfSelector;
  dat$: DatSelector;
  tab$: TabSelector;
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

  get state(): ProjectDetail {
    return this.ngRedux.getState().activeProject;
  }
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private entityPreviewSocket: EntityPreviewSocket,
    private ap: ActiveProjectPipesService,
    public dialog: MatDialog,
    public dfh$: DfhSelector,
    public sys$: SysSelector,
    public inf: InfActions,
    public shouldPause: ShouldPauseService,
    private s: SchemaService,
    private dataService: ReduxMainService
  ) {
    LoopBackConfig.setBaseURL(environment.apiUrl);
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
    // this.typesByPk$ = ngRedux.select<TypesByPk>(['activeProject', 'typesByPk']);
    this.creatingMentioning$ = ngRedux.select<boolean>(['activeProject', 'creatingMentioning']);


    this.inf$ = new InfSelector(ngRedux, this.pkProject$);
    this.dat$ = new DatSelector(ngRedux);
    this.pro$ = new ProSelector(ngRedux);
    this.tab$ = new TabSelector(ngRedux);

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
      this.dataService.loadProjectConfiguration(id)
      // this.ngRedux.dispatch(this.actions.loadProjectConfig(id))
    }
  }

  closeProject() {
    this.entityPreviewSocket.emit('leaveProjectRoom');
    this.ngRedux.dispatch(this.actions.destroy())
  }


  /************************************************************************************
  * Change Project Relations
  ************************************************************************************/

  removeEntityFromProject(pkEntity: number, cb?: (schemaObject: GvPositiveSchemaObject) => any) {
    this.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)

      // this.s.store(this.s.api.removeEntityFromProject(pkProject, pkEntity), pkProject)
      const call$ = this.dataService.removeEntityFromProject(pkProject, pkEntity);
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {
          title: 'Removing entity from your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: GvPositiveSchemaObject) => {
          if (cb) cb(schemaObject)
          if (dialogRef) dialogRef.close()
        }
      )
    })
  }

  addEntityToProject(pkEntity: number, cb?: (schemaObject: GvPositiveSchemaObject) => any): Observable<GvPositiveSchemaObject> {
    const s$ = new Subject<GvPositiveSchemaObject>()
    this.pkProject$.pipe(first()).subscribe(pkProject => {
      const timer$ = timer(200)
      // const call$ = this.s.store(this.s.api.addEntityToProject(pkProject, pkEntity), pkProject)
      const call$ = this.dataService.addEntityToProject(pkProject, pkEntity);
      let dialogRef;
      timer$.pipe(takeUntil(call$)).subscribe(() => {
        const data: ProgressDialogData = {
          title: 'Adding entity to your project',
          hideValue: true, mode$: new BehaviorSubject('indeterminate'), value$: new BehaviorSubject(0)
        }
        dialogRef = this.dialog.open(ProgressDialogComponent, { data, disableClose: true })
      })
      call$.subscribe(
        (schemaObject: GvPositiveSchemaObject) => {
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

  // mentioningsFocusedInText(pks: number[]) {
  //   this.ngRedux.dispatch(this.actions.setMentioningsFocusedInText(pks))
  // }

  // mentioningsFocusedInTable(pks: number[]) {
  //   this.ngRedux.dispatch(this.actions.setMentioningsFocusedInTable(pks))
  // }

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
  addTab<D>(tab: PanelTab<D>) {
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
  addEntityTabWithoutClass(pkEntity: number) {
    this.ap.streamEntityPreview(pkEntity).pipe(first(x => !!x)).subscribe(x => {
      this.addEntityTab(x.pk_entity, x.fk_class)
    })
  }
  addEntityTab(pkEntity: number, pkClass: number) {

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
        'content-tree',
        'linked-sources',
        'linked-digitals'
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
        'content-tree',
        'linked-sources',
        'linked-digitals'
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


  addTableTab(pkEntity: number, fkRow?: number) {
    this.addTab({
      active: true,
      component: 'table-detail',
      icon: 'table',
      data: {
        pkEntity: pkEntity,
        filterOnRow: fkRow
      },
      pathSegment: 'tableDetails'
    })
  }

  /************************************************************************************
  * Layout -- Modals
  ************************************************************************************/

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
          this.dataService.removeEntityFromProject(pkProject, pkEntity)
            .pipe(first(success => !!success)).subscribe(() => {
              s.next()
            })
        }
      })
    })

    return s;
  }

}
