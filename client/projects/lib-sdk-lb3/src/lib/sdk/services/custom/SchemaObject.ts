/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { SocketConnection } from '../../sockets/socket.connections';
import { LoopBackAuth } from '../core/auth.service';
import { BaseLoopBackApi } from '../core/base.service';
import { ErrorHandler } from '../core/error.service';
import { SDKModels } from './SDKModels';


/**
 * Api services for the `SchemaObject` model.
 */
@Injectable()
export class SchemaObjectApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http, connection, models, auth, errorHandler);
  }


  // /**
  //  * Remove entity with outgoing statements and namings from project.
  //  *
  //  * @param {number} pkProject Primary key of the project
  //  *
  //  * @param {number} pkEntity Primary key of the entity
  //  *
  //  * @returns {object[]} An empty reference that will be
  //  *   populated with the actual data once the response is returned
  //  *   from the server.
  //  *
  //  * <em>
  //  * (The remote method definition does not provide any description.
  //  * This usually means the response is a `SchemaObject` object.)
  //  * </em>
  //  */
  // public removeEntityFromProject(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any> {
  //   let _method: string = "GET";
  //   let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
  //     "/SchemaObjects/remove-entity-from-project";
  //   let _routeParams: any = {};
  //   let _postBody: any = {};
  //   let _urlParams: any = {};
  //   if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
  //   if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
  //   let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
  //   return result;
  // }

  // /**
  //  * Add entity with outgoing statements and namings to project.
  //  *
  //  * @param {number} pkProject Primary key of the project
  //  *
  //  * @param {number} pkEntity Primary key of the entity
  //  *
  //  * @returns {object[]} An empty reference that will be
  //  *   populated with the actual data once the response is returned
  //  *   from the server.
  //  *
  //  * <em>
  //  * (The remote method definition does not provide any description.
  //  * This usually means the response is a `SchemaObject` object.)
  //  * </em>
  //  */
  // public addEntityToProject(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any> {
  //   let _method: string = "GET";
  //   let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
  //     "/SchemaObjects/add-entity-to-project";
  //   let _routeParams: any = {};
  //   let _postBody: any = {};
  //   let _urlParams: any = {};
  //   if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
  //   if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
  //   let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
  //   return result;
  // }

  // /**
  //  * Get a object containing apllations and definition of a type (project variant).
  //  *
  //  * @param {number} pkProject Pk of the project.
  //  *
  //  * @param {number} pkType Pk of the type.
  //  *
  //  * @returns {object} An empty reference that will be
  //  *   populated with the actual data once the response is returned
  //  *   from the server.
  //  *
  //  * <em>
  //  * (The remote method definition does not provide any description.
  //  * This usually means the response is a `SchemaObject` object.)
  //  * </em>
  //  */
  // public typeOfProject(pkProject: any, pkType: any, customHeaders?: Function): Observable<any> {
  //   let _method: string = "GET";
  //   let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
  //     "/SchemaObjects/type-of-project";
  //   let _routeParams: any = {};
  //   let _postBody: any = {};
  //   let _urlParams: any = {};
  //   if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
  //   if (typeof pkType !== 'undefined' && pkType !== null) _urlParams.pkType = pkType;
  //   let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
  //   return result;
  // }

  /**
   * The name of the model represented by this $resource,
   * i.e. `SchemaObject`.
   */
  public getModelName() {
    return "SchemaObject";
  }
}
