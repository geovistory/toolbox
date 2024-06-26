import { Injectable } from '@angular/core';
import { AccountDataService, AnalysisService, ColumnNames, ContentTreeService, DataModelService, FactoidControllerService, GvFieldPageReq, GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier, InfData, InfResourceWithRelations, InfStatementWithRelations, MapColumnBody, ProAnalysis, ProClassFieldConfig, ProDfhClassProjRel, ProInfoProjRel, ProjectConfigurationService, ProjectDataService, ProTextProperty, SubfieldPageControllerService, TableService, UnmapColumnBody } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { Store } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IAppState } from '../state.model';
import { LoadActionMeta } from './_lib/crud-actions-factory';
import { DatFacade } from './dat/dat.facade';
import { paginationObjectActions, schemaModifierActions, schemaObjectActions } from './data.actions';
import { getProjectLangugage, getProjectLangugageLabel } from './data.selectors';
import { DfhFacade } from './dfh/dfh.facade';
import { InfFacade } from './inf/inf.facade';
import { ProFacade } from './pro/pro.facade';
import { SysFacade } from './sys/sys.facade';
import { TabFacade } from './tab/tab.facade';
import { WarFacade } from './war/war.facade';

export type GvSchemaObjectAction = FluxStandardAction<Observable<GvPositiveSchemaObject>, LoadActionMeta>;
export type GvSchemaModifierAction = FluxStandardAction<Observable<GvSchemaModifier>, LoadActionMeta>;
export type GvPaginationObjectAction = FluxStandardAction<Observable<GvPaginationObject>, LoadActionMeta>;


/**
 * Class for actions that handle the loading of data.
 */
@Injectable({
  providedIn: 'root'
})
export class DataFacade {

  constructor(
    public inf: InfFacade,
    public dfh: DfhFacade,
    public pro: ProFacade,
    public dat: DatFacade,
    public war: WarFacade,
    public sys: SysFacade,
    public tab: TabFacade,
    private projectDataApi: ProjectDataService,
    private projectConfigApi: ProjectConfigurationService,
    private analysisApi: AnalysisService,
    private dataModelApi: DataModelService,
    private accountDataApi: AccountDataService,
    private factoidApi: FactoidControllerService,
    private tableApi: TableService,
    private contentTree: ContentTreeService,
    private pag: SubfieldPageControllerService,
    private store: Store<IAppState>
  ) { }


  /**
   *
   * Sends rest api request to update ProInfoProjRel between pkProjeck and each entity in PkEntities,
   * to set is_in_project = false
   *
   * Merges returned GvSchmeObject into redux store.
   *
   * @param pkEntities
   * @param pkProject
   */
  removeInfEntitiesFromProject(pkEntities: number[], pkProject: number) {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertInfoProjectRelations(
      pkProject,
      pkEntities.map((pk) => ({ fk_entity: pk, fk_project: pkProject, is_in_project: false }))
    )
    return this.loadGvSchemaModifier(call$)
  }

  loadDatChunksOfDigital(pkDigital: number, pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.findProjectDataControllerGetChunksOfDigital(
      pkProject,
      pkDigital
    )
    return this.loadGvSchemaObject(call$)
  }

  loadInfResource(pkResource: number, pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.findProjectDataControllerGetResource(
      pkProject,
      pkResource
    )
    return this.loadGvSchemaObject(call$)
  }

  loadAllTypesOfProject(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.findProjectDataControllerGetTypesOfProject(
      pkProject
    )
    return this.loadGvSchemaObject(call$)
  }

  upsertInfResourcesWithRelations(pkProject: number, infResourceWithRelations: InfResourceWithRelations[]) {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertResources(
      pkProject,
      infResourceWithRelations
    )
    return this.loadGvSchemaModifier(call$)
  }

  upsertInfData(pkProject: number, infData: InfData) {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertData(
      pkProject,
      infData
    )
    return this.loadGvSchemaModifier(call$)
  }

  upsertInfStatementsWithRelations(pkProject: number, infStatementWithRelations: InfStatementWithRelations[])
    : Observable<GvSchemaModifier> {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertStatements(
      pkProject,
      infStatementWithRelations
    )
    return this.loadGvSchemaModifier(call$)
  }

  loadProjectsOfAccount(): Observable<GvPositiveSchemaObject> {
    const call$ = this.accountDataApi.accountDataControllerGetProjetcsOfAccount()
    return this.loadGvSchemaObject(call$)
  }

  loadDfhProfilesOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.findDataModelControllerDfhProfilesOfProject(
      pkProject,
    )
    return this.loadGvSchemaModifier(call$)
  }

  loadDfhPropertiesOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.dfhPropertyControllerOfProject(
      pkProject,
    )
    return this.loadGvSchemaModifier(call$)
  }
  loadDfhClassesOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.findDataModelControllerDfhClassesOfProject(
      pkProject,
    )
    return this.loadGvSchemaModifier(call$)
  }
  loadDfhLabelsOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.findDataModelControllerDfhLabelsOfProject(
      pkProject,
    )
    return this.loadGvSchemaModifier(call$)
  }

  loadProjectBasics(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.projectConfigApi.findProjectConfigControllerGetBasics(
      pkProject,
    )
    return this.loadGvSchemaModifier(call$)
  }

  loadProjectConfiguration(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.projectConfigApi.findProjectConfigControllerGetAllConfigsOfProject(
      pkProject,
    )
    return this.loadGvSchemaModifier(call$)
  }

  loadFieldPage(reqs: GvFieldPageReq[]): Observable<GvPaginationObject> {
    const call$ = this.pag.subfieldPageControllerLoadSubfieldPages(reqs)
    return this.loadGvPaginationObject(call$)
  }

  loadContentTree(pkProject: number, pkTreeRootEntity: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.contentTree.contentTreeControllerGetContentTree(pkProject, pkTreeRootEntity)
    return this.loadGvSchemaObject(call$)
  }

  addEntityToProject(pkProject: number, pkEntity: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.addOrRemoveEntityControllerAddEntityToProject(pkProject, pkEntity)
    return this.loadGvSchemaObject(call$)
  }

  removeEntityFromProject(pkProject: number, pkEntity: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.addOrRemoveEntityControllerRemoveEntityFromProject(pkProject, pkEntity)
    return this.loadGvSchemaObject(call$)
  }

  upsertInfoProjectRelations(pkProject: number, infoProjectRelations: Partial<ProInfoProjRel>[]): Observable<GvSchemaModifier> {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertInfoProjectRelations(pkProject, infoProjectRelations)
    return this.loadGvSchemaModifier(call$)
  }

  upsertClassFieldConfig(pkProject: number, proClassFieldConfigs: Partial<ProClassFieldConfig>[]): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectConfigApi.createProjectConfigControllerUpsertClassFieldConfigs(pkProject, proClassFieldConfigs)
    return this.loadGvSchemaObject(call$)
  }

  loadProjectClassRelations(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.dataModelApi.findDataModelControllerClassProjectRelations(pkProject)
    return this.loadGvSchemaObject(call$)
  }

  upsertProjectClassRelations(pkProject: number, proDfhClassProjRel: ProDfhClassProjRel[]): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectConfigApi.createProjectConfigControllerUpsertProjectClassRelations(pkProject, proDfhClassProjRel)
    return this.loadGvSchemaObject(call$)
  }

  loadProjectProfileRelations(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.dataModelApi.findDataModelControllerProfileProjectRelations(pkProject)
    return this.loadGvSchemaObject(call$)
  }

  upsertProjectTextProperties(pkProject: number, proTextProperties: ProTextProperty[]): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectConfigApi.createProjectConfigControllerPostTextProperties(pkProject, proTextProperties)
    return this.loadGvSchemaObject(call$)
  }

  deleteProjectTextProperties(pkProject: number, proTextProperties: ProTextProperty[]): Observable<GvSchemaModifier> {
    const call$ = this.projectConfigApi.createProjectConfigControllerDeleteTextProperties(pkProject, proTextProperties)
    return this.loadGvSchemaModifier(call$)
  }

  deleteProjectAnalisis(pkProject: number, pkEntities: number[]): Observable<GvSchemaModifier> {
    const call$ = this.analysisApi.analysisControllerBulkDelete(pkProject, pkEntities)
    return this.loadGvSchemaModifier(call$)
  }

  upsertProjectAnalisis(pkProject: number, proAnalysis: ProAnalysis[]): Observable<GvPositiveSchemaObject> {
    const call$ = this.analysisApi.analysisControllerBulkUpsert(pkProject, proAnalysis)
    return this.loadGvSchemaObject(call$)
  }

  getProjectAnalisis(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.analysisApi.analysisControllerOfProject(pkProject)
    return this.loadGvSchemaObject(call$)
  }

  getFactoids(pkProject: number, pkEntity: number, pageSize: number, pageIndex: number) {
    const call$ = this.factoidApi.factoidControllerFactoidsFromEntity(pkProject + '', pkEntity + '', pageSize + '', pageIndex + '')
    return this.loadGvSchemaWithMapper(call$, (data) => ({ positive: data.schemaObject }))
  }

  unmapTableColumn(namespaceId: number, config: UnmapColumnBody) {
    const call$ = this.tableApi.tableControllerUnMapColumn(namespaceId, config)
    return this.loadGvSchemaModifier(call$)
  }

  mapTableColumn(namespaceId: number, config: MapColumnBody) {
    const call$ = this.tableApi.tableControllerMapColumn(namespaceId, config)
    return this.loadGvSchemaObject(call$)
  }

  getTableColumns(pkProject: number, pkDigital: number) {
    const call$ = this.tableApi.tableControllerGetTableColumns(pkProject, pkDigital)
    return this.loadGvSchemaObject(call$)
  }

  getTableConfig(pkProject: number, pkDataEntity: number) {
    const call$ = this.tableApi.tableControllerGetTableConfig(pkProject, pkDataEntity)
    return this.loadGvSchemaModifier(call$)
  }

  updateTableColumn(pkProject: number, pkDigital: number, accountId?: number, fkLanguage?: number, columnNames?: ColumnNames) {
    const call$ = this.tableApi.tableControllerUpdateColumn(pkProject, pkDigital, accountId, fkLanguage, columnNames)
    return this.loadGvSchemaModifier(call$)
  }

  /**
   * Dispatch action to load GvSchemaObject from external Api
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
  private loadGvSchemaObject(
    apiCall$: Observable<GvPositiveSchemaObject>
  ) {
    const addPending = U.uuid()
    const $ = apiCall$.pipe(shareReplay())
    this.store.dispatch(schemaObjectActions.load({
      meta: { addPending },
      payload: $,
    }))
    return $
  }

  /**
 * Dispatch action to load data from external Api. The returned data can be of any
 * format. As a second parameter, pass in a mapper function, that maps the returned
 * data to a GvSchemaModifier which can be reduced into data state.
 *
 * @param data$ Pass in the api call. Don't subscribe to the call, since otherwise
 *                we'll end up with two subscriptions and thus two api calls
 * @param mapper function mapping the returned data to a GvSchemaModifier
 */
  private loadGvSchemaWithMapper<M>(
    data$: Observable<M>,
    mapper: (data: M) => GvSchemaModifier
  ) {
    const addPending = U.uuid()
    const $ = data$.pipe(shareReplay())
    this.store.dispatch(schemaModifierActions.loadWithMapper({
      meta: { addPending },
      data$: $,
      mapper
    }))
    return $
  }

  /**
   * Dispatch action to load GvSchemaModifier from external Api
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
  private loadGvSchemaModifier(
    apiCall$: Observable<GvSchemaModifier>
  ) {
    const addPending = U.uuid()
    const $ = apiCall$.pipe(shareReplay())
    this.store.dispatch(schemaModifierActions.load({
      meta: { addPending },
      payload: $,
    }))
    return $
  }

  /**
   * Dispatch action to load GvPaginationObject from external Api
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
  private loadGvPaginationObject(
    apiCall$: Observable<GvPaginationObject>
  ) {
    const addPending = U.uuid()
    const $ = apiCall$.pipe(shareReplay())
    this.store.dispatch(paginationObjectActions.load({
      meta: { addPending },
      payload: $
    }))
    return $
  }

  getProjectLanguage(projectId: number) {
    return this.store.select(getProjectLangugage(projectId));
  }

  getProjectLanguageLabel(projectId: number) {
    return this.store.select(getProjectLangugageLabel(projectId));
  }


  /**
   * For testing purposes only!
   *
   * This function will dispatch the action, that will
   * trigger the reducer to add the given GvSchemaModifier
   * to the state.
   *
   * In production, this action should only be dispached
   * by data.effects.ts.
   *
   * @param payload
   */
  addSchemaModifier(payload: GvSchemaModifier) {
    this.store.dispatch(schemaModifierActions.succeeded({ payload }),)
  }

}
