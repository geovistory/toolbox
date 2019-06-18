import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IAppState, Panel, ProjectDetail, PropertyList, SysConfig, U } from 'app/core';
import { AddOrCreateEntityModal } from 'app/modules/information/components/add-or-create-entity-modal/add-or-create-entity-modal.component';
import { difference, groupBy, indexBy, path, values, without } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CreateOrAddEntity } from '../../modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';
import { DatSelector } from '../dat/dat.service';
import { InfSelector } from '../inf/inf.service';
import { DatNamespace, DfhProperty, InfPersistentItem, InfRole, InfTemporalEntity, ProDfhClassProjRel, ProInfoProjRel, ProProject, ProQuery, ProVisual } from '../sdk';
import { LoopBackConfig } from '../sdk/lb.config';
import { EntityPreviewSocket } from '../sockets/sockets.module';
import { EntityPreview } from '../state/models';
import { ActiveProjectActions } from './active-project.action';
import { ClassConfig, ClassConfigList, EntityVersionsByPk, HasTypePropertyList, ListType, ProjectCrm, Tab, TabData, TypePeIt, TypePreview, TypePreviewsByClass, TypesByPk } from './active-project.models';
import { ProSelector } from 'app/core/pro/pro.service';



@Injectable()
export class ActiveProjectService {
  project: ProProject;

  public activeProject$: Observable<ProjectDetail>;
  public pkProject$: Observable<number>;
  public panels$: Observable<Panel[]>
  public uiIdSerial$: Observable<number>;
  public panelSerial$: Observable<number>;
  public focusedPanel$: Observable<number>;
  public crm$: Observable<ProjectCrm>
  public classes$: Observable<ClassConfigList>
  public hasTypeProperties$: Observable<HasTypePropertyList>
  public list$: Observable<ListType>; // type of list displayed in left panel
  public creatingMentioning$: Observable<boolean>;
  public typesByPk$: Observable<TypesByPk>
  public comQueryVersionsByPk$: Observable<EntityVersionsByPk<ProQuery>>
  public comQueryLoading$: Observable<boolean>
  public comVisualVersionsByPk$: Observable<EntityVersionsByPk<ProVisual>>
  public comVisualLoading$: Observable<boolean>
  public datNamespaces$: Observable<DatNamespace[]>

  // emits true if no toolbox panel is opened
  public dashboardVisible$: Observable<boolean>;

  get state(): ProjectDetail {
    return this.ngRedux.getState().activeProject;
  }

  classPksEnabledInEntities$: Observable<number[]>

  inf$: InfSelector;
  dat$: DatSelector;
  pro$: ProSelector;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private entityPreviewSocket: EntityPreviewSocket,
    public dialog: MatDialog
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.activeProject$ = ngRedux.select<ProjectDetail>(['activeProject']);
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']).filter(p => p !== undefined);
    this.panels$ = ngRedux.select<Panel[]>(['activeProject', 'panels']);
    this.uiIdSerial$ = ngRedux.select<number>(['activeProject', 'uiIdSerial']);
    this.panelSerial$ = ngRedux.select<number>(['activeProject', 'panelSerial']);
    this.focusedPanel$ = ngRedux.select<number>(['activeProject', 'focusedPanel']);
    this.crm$ = ngRedux.select<ProjectCrm>(['activeProject', 'crm']);
    this.hasTypeProperties$ = ngRedux.select<HasTypePropertyList>(['activeProject', 'crm', 'hasTypeProperties']);
    this.classes$ = ngRedux.select<ClassConfigList>(['activeProject', 'crm', 'classes']);
    this.list$ = ngRedux.select<ListType>(['activeProject', 'list']);
    this.typesByPk$ = ngRedux.select<TypesByPk>(['activeProject', 'typesByPk']);
    this.comQueryVersionsByPk$ = ngRedux.select<EntityVersionsByPk<ProQuery>>(['activeProject', 'comQueryVersionsByPk']);
    this.comQueryLoading$ = ngRedux.select<boolean>(['activeProject', 'comQueryLoading']);
    this.comVisualVersionsByPk$ = ngRedux.select<EntityVersionsByPk<ProVisual>>(['activeProject', 'comVisualVersionsByPk']);
    this.comVisualLoading$ = ngRedux.select<boolean>(['activeProject', 'comVisualLoading']);

    this.creatingMentioning$ = ngRedux.select<boolean>(['activeProject', 'creatingMentioning']);


    this.inf$ = new InfSelector(ngRedux, this.pkProject$);
    this.dat$ = new DatSelector(ngRedux);
    this.pro$ = new ProSelector(ngRedux);

    this.classPksEnabledInEntities$ = this.crm$.pipe(
      first(d => !!d),
      map(crm => {
        const classPksEnabledInEntities: number[] = []
        for (const key in crm.classes) {
          if (crm.classes[key] && crm.classes[key].isInProject) {
            classPksEnabledInEntities.push(crm.classes[key].dfh_pk_class);
          }
        }
        return classPksEnabledInEntities;
      })
    )

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
    this.classPksEnabledInEntities$.pipe(first(([classes]) => !!classes))
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
  * Change Project Relations
  ************************************************************************************/
  changeClassProjRel(projRel: ProDfhClassProjRel, dfh_pk_class: number) {
    this.ngRedux.dispatch(this.actions.upsertClassProjRel(projRel, dfh_pk_class))
  }

  removePeIt(pk_entity: number) {
    this.pkProject$.pipe(first(pk => !!pk)).subscribe(fk_project => {

      const epr: ProInfoProjRel = {
        fk_project,
        fk_entity: pk_entity,
        is_in_project: false,
        ...{} as any
      }

      this.ngRedux.dispatch(this.actions.upsertEntityProjRel(epr))

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
    return this.ngRedux.select<string>([...['activeProject', 'tabLayouts', path[2]], 'tabTitle']);
  }
  getTabLoading(path: string[]): Observable<boolean> {
    return this.ngRedux.select<boolean>([...['activeProject', 'tabLayouts', path[2]], 'loading']);
  }

  addEntityTab(preview: EntityPreview) {
    if (preview.entity_type === 'peIt') {
      this.addEntityPeItTab(preview.pk_entity)
    } else {
      this.addEntityTeEnTab(preview.pk_entity)
    }
  }

  addSourceTab(pkEntity: number) {
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

  addSourceExpressionPortionTab(pkEntity: number) {
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

  addEntityPeItTab(pkEntity: number) {

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
            showMap: true,
            showMapToggle: true,
            showTimeline: true,
            showTimelineToggle: true,
            showSources: false,
            showSourcesToggle: true
          }
        }

      }
    })


  }


  addEntityTeEnTab(pkEntity: number) {
    this.addTab({
      active: true,
      component: 'te-en-detail',
      icon: 'temporal-entity',
      pathSegment: 'teEnDetails',
      data: {
        pkEntity: pkEntity,
        teEntDetailConfig: {
          teEntDetail: {
            showRightArea: false
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
  openModalCreateOrAddEntity(config: CreateOrAddEntity) {
    const observable = new Subject();

    this.ngRedux.dispatch(this.actions.openAddForm(config));

    const dialogRef = this.dialog.open(AddOrCreateEntityModal, {
      height: '90%',
      width: '90%',
      data: { basePath: ['activeProject', 'addModal'] }
    }).afterClosed().subscribe(result => {
      this.ngRedux.dispatch(this.actions.closeAddForm());
      if (result) observable.next(result)
    });

    return observable;
  }

}
