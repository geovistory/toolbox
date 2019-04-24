import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ComConfig, IAppState, InfChunk, Panel, ProjectDetail, PropertyList, U } from 'app/core';
import { groupBy, indexBy, without, flatten, path, difference } from 'ramda';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DfhProperty, InfPersistentItem, InfRole, InfTemporalEntity, ComQuery, ComVisual, DfhProjRel } from '../sdk';
import { LoopBackConfig } from '../sdk/lb.config';
import { ComProject } from '../sdk/models/ComProject';
import { EntityPreviewSocket } from '../sockets/sockets.module';
import { EntityPreview } from '../state/models';
import { ActiveProjectActions } from './active-project.action';
import { ClassConfig, ListType, ProjectCrm, Tab, TypePeIt, TypePreview, TypePreviewsByClass, TypesByPk, ComQueryByPk, EntityByPk, VersionEntity, EntityVersionsByPk } from './active-project.models';



@Injectable()
export class ActiveProjectService {
  project: ComProject;

  public activeProject$: Observable<ProjectDetail>;
  public pkProject$: Observable<number>;
  public panels$: Observable<Panel[]>
  public crm$: Observable<ProjectCrm>
  public focusedPanel$: Observable<boolean>;
  public list$: Observable<ListType>; // type of list displayed in left panel 
  public creatingMentioning$: Observable<boolean>;
  public typesByPk$: Observable<TypesByPk>
  public comQueryVersionsByPk$: Observable<EntityVersionsByPk<ComQuery>>
  public comQueryLoading$: Observable<boolean>
  public comVisualVersionsByPk$: Observable<EntityVersionsByPk<ComVisual>>
  public comVisualLoading$: Observable<boolean>

  // emits true if no toolbox panel is opened
  public dashboardVisible$: Observable<boolean>;

  get state(): ProjectDetail {
    return this.ngRedux.getState().activeProject;
  }

  classesInProject$: Observable<number[]>

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private entityPreviewSocket: EntityPreviewSocket
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.activeProject$ = ngRedux.select<ProjectDetail>(['activeProject']);
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']);
    this.panels$ = ngRedux.select<Panel[]>(['activeProject', 'panels']);
    this.crm$ = ngRedux.select<ProjectCrm>(['activeProject', 'crm']);
    this.list$ = ngRedux.select<ListType>(['activeProject', 'list']);
    this.typesByPk$ = ngRedux.select<TypesByPk>(['activeProject', 'typesByPk']);
    this.comQueryVersionsByPk$ = ngRedux.select<EntityVersionsByPk<ComQuery>>(['activeProject', 'comQueryVersionsByPk']);
    this.comQueryLoading$ = ngRedux.select<boolean>(['activeProject', 'comQueryLoading']);
    this.comVisualVersionsByPk$ = ngRedux.select<EntityVersionsByPk<ComVisual>>(['activeProject', 'comVisualVersionsByPk']);
    this.comVisualLoading$ = ngRedux.select<boolean>(['activeProject', 'comVisualLoading']);


    this.focusedPanel$ = ngRedux.select<boolean>(['activeProject', 'focusedPanel']);
    this.creatingMentioning$ = ngRedux.select<boolean>(['activeProject', 'creatingMentioning']);

    this.classesInProject$ = this.crm$.pipe(
      first(d => !!d),
      map(crm => {
        const pkClassesInProject: number[] = []
        for (const key in crm.classes) {
          if (crm.classes[key] && crm.classes[key].isInProject) {
            pkClassesInProject.push(crm.classes[key].dfh_pk_class);
          }
        }
        return pkClassesInProject;
      })
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
      .pipe(
        filter(prev => (!!prev)),
        tap(test => {
          test;
        })
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
   * Loads a Entity Detail (PeItDetail or TeEnDetail) in cache for display in Modals
   *
   * @param pkEntity
   * @param forceReload
   */
  loadEntityDetailForModal(pkEntity: number, forceReload = true, pkUiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE) {
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
          new BehaviorSubject([])
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

  reloadTypesForClassesInProject() {
    this.classesInProject$.pipe(first(([classes]) => !!classes))
      .subscribe((classesInProject) => {
        this.streamTypePreviewsByClass(classesInProject)
      })
  }

  loadQueries() {
    this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
      this.ngRedux.dispatch(this.actions.loadQueries(pk))
    })
    return this.comQueryVersionsByPk$;
  }

  loadQueryVersion(pkEntity: number, entityVersion: number) {
    const state = this.ngRedux.getState();

    if (
      pkEntity && entityVersion &&
      // if not yet loading
      (!state.activeProject
        || !state.activeProject.comQueryVersionLoading
        || !state.activeProject.comQueryVersionLoading[pkEntity + '_' + entityVersion]
      )) {
      this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
        this.ngRedux.dispatch(this.actions.loadQueryVersion(pk, pkEntity, entityVersion))
      })
    }
    return this.comQueryVersionsByPk$;
  }

  loadVisuals() {
    this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
      this.ngRedux.dispatch(this.actions.loadVisuals(pk))
    })
    return this.comVisualVersionsByPk$;
  }

  /**
   * Loads one specific visual version 
   * @param pkEntity pk_entity of visual
   * @param entityVersion if no entity_version provided, returns latest version
   */
  loadVisualVersion(pkEntity: number, entityVersion: number = null) {
    this.pkProject$.pipe(first(pk => !!pk)).subscribe(pk => {
      this.ngRedux.dispatch(this.actions.loadVisualVersion(pk, pkEntity, entityVersion))
    })
    return this.comVisualVersionsByPk$;
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

  /************************************************************************************
  * CRM
  ************************************************************************************/
  changeClassProjRel(projRel: DfhProjRel, dfh_pk_class: number) {
    this.ngRedux.dispatch(this.actions.changeClassProjRel(projRel, dfh_pk_class))
  }


  /************************************************************************************
  * Mentioning
  ************************************************************************************/

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

  addEntityTab(preview: EntityPreview) {

    // TODO: Add some logic to figure out wheter to open as Source, Section or Entity
    this.addTab({
      active: true,
      component: 'entity-detail',
      icon: preview.entity_type === 'peIt' ? 'persistent-entity' : 'temporal-entity',
      pathSegment: 'entityDetails',
      data: {
        pkEntity: preview.pk_entity
      }
    })
  }
}
