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
import { InfRole } from '../../models/InfRole';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
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
   * Get e nested objects of all information about the temporal entities.
   *
   * @param {boolean} ofProject If true, gets project versoin, if false, gets repo version
   *
   * @param {number} pkProject If provided, joins the project, else not.
   *
   * @param {object} data Request data.
   *
   *  - `pkEntities` – `{any}` - Primary Keys of the temporal entities (array of pk_entity)
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
  public graphs(ofProject: any, pkProject: any = {}, pkEntities: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/graphs";
    let _routeParams: any = {};
    let _postBody: any = {
      pkEntities: pkEntities
    };
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get e nested object of all information about the temporal entity with the community favorites.
   *
   * @param {boolean} ofProject If true, gets project versoin, if false, gets repo version
   *
   * @param {number} pkProject If provided, joins the project, else not.
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
  public nestedObject(ofProject: any, pkProject: any = {}, pkEntity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/nested-object";
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
   * Find or create a temporal entity version.
   *
   * @param {number} projectId Id of the project
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
  public findOrCreateInfTemporalEntity(projectId: any, data: any, customHeaders?: Function): Observable<InfTemporalEntity[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof projectId !== 'undefined' && projectId !== null) _urlParams.projectId = projectId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfTemporalEntity>) =>
        instances.map((instance: InfTemporalEntity) => new InfTemporalEntity(instance))
    ));
  }

  /**
   * Relate a nested object of a InfTemporalEntity to the project.
   *
   * @param {number} projectId Id of the project
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
  public changeTeEntProjectRelation(projectId: any, isInProject: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/change-project-relation";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof projectId !== 'undefined' && projectId !== null) _urlParams.projectId = projectId;
    if (typeof isInProject !== 'undefined' && isInProject !== null) _urlParams.isInProject = isInProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
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
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<InfTemporalEntity[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTemporalEntities/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfTemporalEntity>) =>
        instances.map((instance: InfTemporalEntity) => new InfTemporalEntity(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTemporalEntity`.
   */
  public getModelName() {
    return "InfTemporalEntity";
  }
}
