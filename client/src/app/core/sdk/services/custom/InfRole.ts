/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { ErrorHandler } from '../core/error.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfRole } from '../../models/InfRole';
import { SocketConnection } from '../../sockets/socket.connections';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfAppellation } from '../../models/InfAppellation';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { InfPlace } from '../../models/InfPlace';


/**
 * Api services for the `InfRole` model.
 */
@Injectable()
export class InfRoleApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, errorHandler);
  }

  /**
   * Find or create information role.
   *
   * @param {number} pk_project Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfRole}` - data
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public findOrCreateInfRoles(pk_project: any, data: any, customHeaders?: Function): Observable<InfRole[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/find-or-create-many";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfRole>) =>
        instances.map((instance: InfRole) => new InfRole(instance))
    ));
  }

  /**
   * Get roles (with children) of given fkProperty and fkEntity from Repo that are not in project of given projectId.
   *
   * @param {number} entityPk Key of the persistent item (fk_entity)
   *
   * @param {number} propertyPk Key of the property (fk_property)
   *
   * @param {number} pkProject Id of the the current project
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public alternativesNotInProjectByEntityPk(entityPk: any, propertyPk: any, pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/alternatives-not-in-project-by-entity-pk";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof entityPk !== 'undefined' && entityPk !== null) _urlParams.entityPk = entityPk;
    if (typeof propertyPk !== 'undefined' && propertyPk !== null) _urlParams.propertyPk = propertyPk;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get roles (with children) of given propertyPk and teEntPk from Repo that are not in project of given projectId.
   *
   * @param {number} teEntPk Key of the temporal entity (fk_temporal_entity)
   *
   * @param {number} propertyPk Key of the property (fk_property)
   *
   * @param {number} pkProject Id of the the current project
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public alternativesNotInProjectByTeEntPk(teEntPk: any, propertyPk: any, pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/alternatives-not-in-project-by-te-ent-pk";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof teEntPk !== 'undefined' && teEntPk !== null) _urlParams.teEntPk = teEntPk;
    if (typeof propertyPk !== 'undefined' && propertyPk !== null) _urlParams.propertyPk = propertyPk;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Relate a nested object of a InfRole to the project.
   *
   * @param {number} pkProject Id of the project
   *
   * @param {boolean} isInProject Include or exclude from project.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfRole}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public changeRoleProjectRelation(pkProject: any, isInProject: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/change-project-relation";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof isInProject !== 'undefined' && isInProject !== null) _urlParams.isInProject = isInProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Add roles with their associated temporal entity to the project.
   *
   * @param {number} pk_project Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `pk_roles` – `{any}` - Array of primary keys of roles (array of pk_entity).
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public addToProjectWithTeEnt(pk_project: any, pk_roles: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/add-to-project-with-temporal-entity";
    let _routeParams: any = {};
    let _postBody: any = {
      pk_roles: pk_roles
    };
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Remove roles with their associated temporal entity from the project.
   *
   * @param {number} pk_project Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `pk_roles` – `{any}` - Array of primary keys of roles (array of pk_entity).
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public removeFromProjectWithTeEnt(pk_project: any, pk_roles: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/remove-from-project-with-temporal-entity";
    let _routeParams: any = {};
    let _postBody: any = {
      pk_roles: pk_roles
    };
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Add roles without any related entities to the project.
   *
   * @param {number} pk_project Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `pk_roles` – `{any}` - Array of primary keys of roles (array of pk_entity).
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfRole` object.)
   * </em>
   */
  public addToProject(pk_project: any, pk_roles: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/add-to-project";
    let _routeParams: any = {};
    let _postBody: any = {
      pk_roles: pk_roles
    };
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfRole`.
   */
  public getModelName() {
    return "InfRole";
  }
}
