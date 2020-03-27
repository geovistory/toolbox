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
import { InfLangString } from '../../models/InfLangString';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { DatChunk } from '../../models/DatChunk';
import { DatDigital } from '../../models/DatDigital';
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
   * Get a flat object of entity previews, that are target of a list.
   *
   * @param {number} pkProject Pk of the project.
   *
   * @param {number} pkSourceEntity Pk of the source entity to which the entity previews, that are target of a list are related.
   *
   * @param {number} pkProperty Pk of the property leading from source entity to the entity previews, that are target of a list.
   *
   * @param {number} pkTargetClass Fk class of the target entity previews, that are target of a list.
   *
   * @param {boolean} isOutgoing If true, the source entity is domain, else range.
   *
   * @param {number} limit number of returned entity previews, that are target of a list.
   *
   * @param {number} offset offset of the segment of returned entity previews, that are target of a list.
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
  public paginatedListTargetingEntityPreviews(pkProject: any, pkSourceEntity: any, pkProperty: any, pkTargetClass: any, isOutgoing: any, limit: any, offset: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/paginated-list-targeting-entity-previews";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkSourceEntity !== 'undefined' && pkSourceEntity !== null) _urlParams.pkSourceEntity = pkSourceEntity;
    if (typeof pkProperty !== 'undefined' && pkProperty !== null) _urlParams.pkProperty = pkProperty;
    if (typeof pkTargetClass !== 'undefined' && pkTargetClass !== null) _urlParams.pkTargetClass = pkTargetClass;
    if (typeof isOutgoing !== 'undefined' && isOutgoing !== null) _urlParams.isOutgoing = isOutgoing;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof offset !== 'undefined' && offset !== null) _urlParams.offset = offset;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
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
   * Get an array of role that build the tree of the content of an F2 Expression.
   *
   * @param {number} pkProject Primary Key of the Project.
   *
   * @param {number} pkExpressionEntity Primary Key of the F2 Expression entity for which the content tree is needed.
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
  public contentTree(pkProject: any = {}, pkExpressionEntity: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/content-tree";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkExpressionEntity !== 'undefined' && pkExpressionEntity !== null) _urlParams.pkExpressionEntity = pkExpressionEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get an nested object of role with everything needed to display the links made from an entity towards sources and digitals.
   *
   * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
   *
   * @param {number} pkProject Primary Key of the Project.
   *
   * @param {number} pkEntity Primary Key of the entity for which the sources links are needed.
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
  public sourcesAndDigitalsOfEntity(ofProject: any, pkProject: any = {}, pkEntity: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/sources-and-digitals-of-entity";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find roles by params.
   *
   * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
   *
   * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
   *
   * @param {number} pkEntity Primary Key of the role (pk_entity)
   *
   * @param {number} pkInfoRange Foreign Key of the role pointing to the range entity (fk_entity)
   *
   * @param {number} pkInfoDomain Foreign Key of the role pointing to the domain entity (fk_temporal_entity)
   *
   * @param {number} pkProperty Foreign Key of the role pointing to the property (fk_property)
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
  public queryByParams(ofProject: any, pkProject: any = {}, pkEntity: any = {}, pkInfoRange: any = {}, pkInfoDomain: any = {}, pkProperty: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfRoles/find-by-params";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    if (typeof pkInfoRange !== 'undefined' && pkInfoRange !== null) _urlParams.pkInfoRange = pkInfoRange;
    if (typeof pkInfoDomain !== 'undefined' && pkInfoDomain !== null) _urlParams.pkInfoDomain = pkInfoDomain;
    if (typeof pkProperty !== 'undefined' && pkProperty !== null) _urlParams.pkProperty = pkProperty;
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
