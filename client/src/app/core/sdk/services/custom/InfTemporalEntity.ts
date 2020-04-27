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
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { SocketConnection } from '../../sockets/socket.connections';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { InfRole } from '../../models/InfRole';
import { InfTextProperty } from '../../models/InfTextProperty';


/**
 * Api services for the `InfTemporalEntity` model.
 */
@Injectable()
export class InfTemporalEntityApi extends BaseLoopBackApi {

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
   * Find or create many information temporal entities.
   *
   * @param {number} pk_project Pk of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfTemporalEntity}` - data
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTemporalEntity` object.)
   * </em>
   */
  public findOrCreateInfTemporalEntities(pk_project: any, data: any, customHeaders?: Function): Observable<InfTemporalEntity[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/find-or-create-many";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfTemporalEntity>) =>
        instances.map((instance: InfTemporalEntity) => new InfTemporalEntity(instance))
    ));
  }

  /**
   * Get a flat object of temporal entities.
   *
   * @param {number} pkProject Pk of the project.
   *
   * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
   *
   * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
   *
   * @param {number} pkTargetClass Fk class of the target temporal entities.
   *
   * @param {boolean} isOutgoing If true, the source entity is domain, else range.
   *
   * @param {number} limit number of returned temporal entities.
   *
   * @param {number} offset offset of the segment of returned temporal entities.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTemporalEntity` object.)
   * </em>
   */
  public alternativeTemporalEntityList(pkProject: any, pkSourceEntity: any, pkProperty: any, pkTargetClass: any, isOutgoing: any, limit: any, offset: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/paginated-list-alternatives";
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
   * Get a flat object of temporal entities.
   *
   * @param {number} pkProject Pk of the project.
   *
   * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
   *
   * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
   *
   * @param {number} pkTargetClass Fk class of the target temporal entities.
   *
   * @param {boolean} isOutgoing If true, the source entity is domain, else range.
   *
   * @param {number} limit number of returned temporal entities.
   *
   * @param {number} offset offset of the segment of returned temporal entities.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTemporalEntity` object.)
   * </em>
   */
  public temporalEntityList(pkProject: any, pkSourceEntity: any, pkProperty: any, pkTargetClass: any, isOutgoing: any, limit: any, offset: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/paginated-list";
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
   * Get e schema object of own properties of the temporal entity in project version.
   *
   * @param {number} pkProject Pk project
   *
   * @param {number} pkEntity Primary Key of the temporal entity (pk_entity)
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTemporalEntity` object.)
   * </em>
   */
  public ownProperties(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/own-properties";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find or create a temporal entity version.
   *
   * @param {number} pkProject Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfTemporalEntity}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTemporalEntity` object.)
   * </em>
   */
  public findOrCreateInfTemporalEntity(pkProject: any, data: any, customHeaders?: Function): Observable<InfTemporalEntity[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfTemporalEntity>) =>
        instances.map((instance: InfTemporalEntity) => new InfTemporalEntity(instance))
    ));
  }

  /**
   * Relate a nested object of a InfTemporalEntity to the project.
   *
   * @param {number} pkProject Id of the project
   *
   * @param {boolean} isInProject Include or exclude from project.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfTemporalEntity}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTemporalEntity` object.)
   * </em>
   */
  public changeTeEntProjectRelation(pkProject: any, isInProject: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/change-project-relation";
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
   * The name of the model represented by this $resource,
   * i.e. `InfTemporalEntity`.
   */
  public getModelName() {
    return "InfTemporalEntity";
  }
}
