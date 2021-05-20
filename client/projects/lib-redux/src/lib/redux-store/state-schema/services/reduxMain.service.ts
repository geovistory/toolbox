import { Injectable } from '@angular/core';
import { ProInfoProjRel, ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { AccountDataService, DataModelService, GvFieldPageReq, GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier, InfResourceWithRelations, InfStatementWithRelations, ProjectConfigurationService, ProjectDataService, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private schemaActions: GvSchemaActions,
    private projectDataApi: ProjectDataService,
    private projectConfigApi: ProjectConfigurationService,
    private dataModelApi: DataModelService,
    private accountDataApi: AccountDataService,
    private pag: SubfieldPageControllerService,
    private proInfoProjRelApi: ProInfoProjRelApi
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
  removeInfEntitiesFromProject(pkEntities: number[], pkProject: number): Observable<GvPositiveSchemaObject> {
    const call$ = this.proInfoProjRelApi.bulkUpdateEprAttributes(
      pkProject,
      pkEntities.map((pk) => ({ fk_entity: pk, is_in_project: false }))
    ) as Observable<ProInfoProjRel[]>
    return this.schemaActions.loadGvSchemaObject(call$.pipe(map(x => ({ pro: { info_proj_rel: x } }))))
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

  upsertInfStatementsWithRelations(pkProject: number, infStatementWithRelations: InfStatementWithRelations[])
    : Observable<GvSchemaModifier> {
    const call$ = this.projectDataApi.createProjectDataControllerUpsertStatements(
      pkProject,
      infStatementWithRelations
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadProjectsOfAccount(): Observable<GvPositiveSchemaObject> {
    const call$ = this.accountDataApi.findAccountDataControllerGetProjetcsOfAccount()
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

  loadProjectConfiguration(pkProject: number): Observable<GvSchemaModifier> {
    const call$ = this.projectConfigApi.findProjectConfigControllerGetAllConfigsOfProject(
      pkProject,
    )
    return this.schemaActions.loadGvSchemaModifier(call$)
  }

  loadFieldPage(req: GvFieldPageReq): Observable<GvPaginationObject> {
    const call$ = this.pag.subfieldPageControllerLoadSubfieldPage(req)
    return this.schemaActions.loadGvPaginationObject(call$)
  }
}
