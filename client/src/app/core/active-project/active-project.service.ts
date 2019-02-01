import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Params, Router, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { ComConfig, IAppState, InfChunk, ProjectDetail, PropertyList, U, Panel } from 'app/core';
import { without } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { first, map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DfhProperty, InfPersistentItem, InfRole, InfTemporalEntity } from '../sdk';
import { LoopBackConfig } from '../sdk/lb.config';
import { ComProject } from '../sdk/models/ComProject';
import { EntityPreviewSocket } from '../sockets/sockets.module';
import { EntityPreview } from '../state/models';
import { ActiveProjectActions } from './active-project.action';
import { ProjectCrm, Tab, ClassConfig } from './active-project.models';



@Injectable()
export class ActiveProjectService {
  project: ComProject;

  public activeProject$: Observable<ProjectDetail>;
  public pkProject$: Observable<number>;
  public panels$: Observable<Panel[]>
  public crm$: Observable<ProjectCrm>
  public focusedPanel$: Observable<boolean>;

  // emits true if no toolbox panel is opened
  public dashboardVisible$: Observable<boolean>;


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private router: Router,
    private entityPreviewSocket: EntityPreviewSocket
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.activeProject$ = ngRedux.select<ProjectDetail>(['activeProject']);
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']);
    this.panels$ = ngRedux.select<Panel[]>(['activeProject', 'panels']);
    this.crm$ = ngRedux.select<ProjectCrm>(['activeProject', 'crm']);

    this.focusedPanel$ = ngRedux.select<boolean>(['activeProject', 'focusedPanel']);

    // emits true if no toolbox panel is opened
    this.dashboardVisible$ = combineLatest(
      ngRedux.select<ProjectDetail>(['information']),
      ngRedux.select<ProjectDetail>(['sources'])
    ).pipe(
      map(items => items.filter(item => (!!item && Object.keys(item).length > 0)).length === 0),
      distinctUntilChanged()
    )


    this.entityPreviewSocket.fromEvent<EntityPreview>('entityPreview').subscribe(data => {
      console.log(data)
      // dispatch a method to put the DataUnitPreview to the store
      this.ngRedux.dispatch(this.actions.loadEntityPreviewSucceeded(data))
    })

    this.entityPreviewSocket.fromEvent('reconnect').subscribe(disconnect => {
      // get all DataUnitPreview keys from state and send them to the
      // server so that they will be streamed. This is important for
      // when connection was lost.
      combineLatest(this.pkProject$, this.activeProject$).pipe(first(items => items.filter(item => !item).length === 0))
        .subscribe(([pkProject, activeProject]) => {
          this.entityPreviewSocket.emit('addToStrem', {
            pk_project: pkProject,
            pks: Object.keys(activeProject.entityPreviews)
          })
        })
    })

  }

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
      this.ngRedux.dispatch(this.actions.loadProject(id))
    }
  }

  /**
   * Initialize the project crm
   *
   * @param id pk_project
   */
  initProjectCrm(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id || !state.activeProject.crm) {
      this.ngRedux.dispatch(this.actions.activeProjectLoadCrm(id))
    }
  }

  closeProject() {
    this.entityPreviewSocket.emit('leaveProjectRoom');
    this.ngRedux.dispatch(this.actions.destroy())
  }


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
        const pkUiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;

        this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
      })
    }

    return this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', pkEntity])
      .filter(prev => (!!prev))

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
    if (!pkEntities || pkEntities.length == 0) return Observable.of([]);

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
    ).filter(items => items.filter(item => !item).length === 0)

  }

  /**
     * Loads a teEn-Graph, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param pkEntities
     * @param forceReload
     */
  loadTeEnGraphs(pkEntities: number[], forceReload?: boolean): Observable<InfTemporalEntity[]> {
    if (!pkEntities || pkEntities.length == 0) return Observable.of([]);


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
    ).filter(items => items.filter(item => !item).length === 0)

  }

  /**
   * Loads a DataUnit Detail (PeItDetail or TeEnDetail) in cache for display in Modals
   *
   * @param pkEntity
   * @param forceReload
   */
  loadDataUnitDetailForModal(pkEntity: number, forceReload = true, pkUiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE) {
    const state = this.ngRedux.getState();
    if (!(((state || {}).activeProject || {}).peItModals || {})[pkEntity] || forceReload) {
      this.ngRedux.dispatch(this.actions.loadDataUnitDetailForModal(state.activeProject.pk_project, pkEntity, pkUiContext))
    }
  }


  getClassConfig(pkClass): Observable<ClassConfig> {
    return this.ngRedux.select<ClassConfig>(['activeProject', 'crm', 'classes', pkClass])
  }

  /**
   * Filters a given array of InfRoles by a filter function that applies to DfhProperty
   */
  filterRolesByPropertyFilter = (roles: InfRole[], propFilterFn: (prop: DfhProperty) => boolean): Observable<InfRole[]> => {

    const pks$ = this.ngRedux.select<PropertyList>(['activeProject', 'crm', 'properties']).pipe(
      map((propList) => U.obj2Arr(propList)),
      map(prps => prps.filter(prop => propFilterFn(prop))),
      map(prps => prps.map(prop => prop.dfh_pk_property))
    )

    return pks$.map(pks => roles.filter(role => pks.includes(role.fk_property)))
  }


  updateSelectedChunk(c: InfChunk) {
    this.ngRedux.dispatch(this.actions.updateSelectedChunk(c))
  }

  setRefiningChunk(bool: boolean) {
    this.ngRedux.dispatch(this.actions.setRefiningChunk(bool))
  }

  mentioningsFocusedInText(pks: number[]) {
    this.ngRedux.dispatch(this.actions.setMentioningsFocusedInText(pks))
  }

  mentioningsFocusedInTable(pks: number[]) {
    this.ngRedux.dispatch(this.actions.setMentioningsFocusedInTable(pks))
  }

  /************************************************************************************
  * Layout
  ************************************************************************************/

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
  addTab(tab: Tab) {
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
    return this.ngRedux.select<string>([...path, 'tabTitle']);
  }
  getTabLoading(path: string[]): Observable<boolean> {
    return this.ngRedux.select<boolean>([...path, 'loading']);
  }
}
