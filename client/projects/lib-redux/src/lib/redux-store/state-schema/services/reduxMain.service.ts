import { Injectable } from '@angular/core';
import { ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { GvSchemaActions } from '../../public-api';

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
    )
    return this.schemaActions.loadGvSchemaObject(call$)
  }
}
