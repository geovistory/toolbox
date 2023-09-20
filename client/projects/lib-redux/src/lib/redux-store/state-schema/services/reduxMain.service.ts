import { Injectable } from '@angular/core';
import { AccountDataService, ContentTreeService, DataModelService, GvFieldPageReq, GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier, InfData, InfResourceWithRelations, InfStatementWithRelations, ProClassFieldConfig, ProDfhClassProjRel, ProInfoProjRel, ProjectConfigurationService, ProjectDataService, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { GvSchemaActions } from '../actions/schema.actions';

@Injectable({
  providedIn: 'root'
})
/**
 * Public API for all api calls returning
 * GvSchemaObject, GvNegativeSchemaObject, GvSchemaModifier
 */
export class ReduxMainService {

  constructor(
    protected schemaActions: GvSchemaActions,
    protected projectDataApi: ProjectDataService,
    protected projectConfigApi: ProjectConfigurationService,
    protected dataModelApi: DataModelService,
    protected accountDataApi: AccountDataService,
    protected contentTree: ContentTreeService,
    protected pag: SubfieldPageControllerService,
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
    // bulkUpdateEprAttributes(
    //   pkProject,
    //   pkEntities.map((pk) => ({ fk_entity: pk, is_in_project: false }))
    // ) as Observable<ProInfoProjRel[]>
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadDatChunksOfDigital(pkDigital: number, pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.findProjectDataControllerGetChunksOfDigital(
      pkProject,
      pkDigital
    )
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  loadInfResource(pkResource: number, pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.findProjectDataControllerGetResource(
      pkProject,
      pkResource
    )
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  loadAllTypesOfProject(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.findProjectDataControllerGetTypesOfProject(
      pkProject
    )
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  upsertInfResourcesWithRelations(pkProject: number, infResourceWithRelations: InfResourceWithRelations[]) {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertResources(
      pkProject,
      infResourceWithRelations
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  upsertInfData(pkProject: number, infData: InfData) {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertData(
      pkProject,
      infData
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  upsertInfStatementsWithRelations(pkProject: number, infStatementWithRelations: InfStatementWithRelations[])
    : Observable<GvSchemaModifier> {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertStatements(
      pkProject,
      infStatementWithRelations
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadProjectsOfAccount(): Observable<GvPositiveSchemaObject> {
    const call$ = this.accountDataApi.accountDataControllerGetProjetcsOfAccount()
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  loadDfhProfilesOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.findDataModelControllerDfhProfilesOfProject(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadDfhPropertiesOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.dfhPropertyControllerOfProject(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }
  loadDfhClassesOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.findDataModelControllerDfhClassesOfProject(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }
  loadDfhLabelsOfProject(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.dataModelApi.findDataModelControllerDfhLabelsOfProject(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadProjectBasics(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.projectConfigApi.findProjectConfigControllerGetBasics(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadProjectConfiguration(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.projectConfigApi.findProjectConfigControllerGetAllConfigsOfProject(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadFieldPage(reqs: GvFieldPageReq[]): Observable<GvPaginationObject> {
    const call$ = this.pag.subfieldPageControllerLoadSubfieldPages(reqs)
    return this.schemaActions.loadGvPaginationObject(call$)
  }

  loadContentTree(pkProject: number, pkTreeRootEntity: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.contentTree.contentTreeControllerGetContentTree(pkProject, pkTreeRootEntity)
    return this.schemaActions.loadGvSchemaObject(call$)
  }


  addEntityToProject(pkProject: number, pkEntity: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.addOrRemoveEntityControllerAddEntityToProject(pkProject, pkEntity)
    return this.schemaActions.loadGvSchemaObject(call$)
  }
  removeEntityFromProject(pkProject: number, pkEntity: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectDataApi.addOrRemoveEntityControllerRemoveEntityFromProject(pkProject, pkEntity)
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  upsertInfoProjectRelations(pkProject: number, infoProjectRelations: Partial<ProInfoProjRel>[]): Observable<GvSchemaModifier> {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertInfoProjectRelations(pkProject, infoProjectRelations)
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  upsertClassFieldConfig(pkProject: number, proClassFieldConfigs: Partial<ProClassFieldConfig>[]): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectConfigApi.createProjectConfigControllerUpsertClassFieldConfigs(pkProject, proClassFieldConfigs)
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  loadProjectClassRelations(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.dataModelApi.findDataModelControllerClassProjectRelations(pkProject)
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  upsertProjectClassRelations(pkProject: number, proDfhClassProjRel: ProDfhClassProjRel[]): Observable<GvPositiveSchemaObject> {
    const call$ = this.projectConfigApi.createProjectConfigControllerUpsertProjectClassRelations(pkProject, proDfhClassProjRel)
    return this.schemaActions.loadGvSchemaObject(call$)
  }

  loadProjectProfileRelations(pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.dataModelApi.findDataModelControllerProfileProjectRelations(pkProject)
    return this.schemaActions.loadGvSchemaObject(call$)
  }
}
