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
import { SchemaObject } from '../../models/SchemaObject';
import { SocketConnection } from '../../sockets/socket.connections';


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
    super(http,  connection,  models, auth, errorHandler);
  }

  /**
   * Get the schema object for the ram list.
   *
   * @param {number} pkProject Primary key of the project
   *
   * @param {number} pkEntity Primary key of the entity
   *
   * @param {number} pkProperty Key of the property (1218, 1334, 117)
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `SchemaObject` object.)
   * </em>
   */
  public getRamList(pkProject: any, pkEntity: any, pkProperty: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/SchemaObjects/ram-list";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    if (typeof pkProperty !== 'undefined' && pkProperty !== null) _urlParams.pkProperty = pkProperty;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get SchemaObject with everything needed to build the tree of the content of an F2 Expression.
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
   * This usually means the response is a `SchemaObject` object.)
   * </em>
   */
  public contentTree(pkProject: any = {}, pkExpressionEntity: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/SchemaObjects/content-tree";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkExpressionEntity !== 'undefined' && pkExpressionEntity !== null) _urlParams.pkExpressionEntity = pkExpressionEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `SchemaObject`.
   */
  public getModelName() {
    return "SchemaObject";
  }
}
