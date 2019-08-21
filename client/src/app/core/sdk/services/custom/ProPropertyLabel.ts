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
import { ProPropertyLabel } from '../../models/ProPropertyLabel';
import { SocketConnection } from '../../sockets/socket.connections';
import { InfLanguage } from '../../models/InfLanguage';


/**
 * Api services for the `ProPropertyLabel` model.
 */
@Injectable()
export class ProPropertyLabelApi extends BaseLoopBackApi {

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
   * Get the default labels for all properties.
   *
   * @param {number} pkProject Pk of the project
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProPropertyLabel` object.)
   * </em>
   */
  public getDefaultLabels(pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProPropertyLabels/get-default-labels";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Inserts or updates items in the array of ProPropertyLabel. If pk_entity is given and existing, an update is done, else an insert
   *
   * @param {number} pkProject Pk of the project
   *
   * @param {object} data Request data.
   *
   *  - `items` – `{ProPropertyLabel}` - Array of ProPropertyLabels
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProPropertyLabel` object.)
   * </em>
   */
  public bulkUpsert(pkProject: any, items: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProPropertyLabels/bulk-upsert";
    let _routeParams: any = {};
    let _postBody: any = {
      items: items
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Dletes items in the array of ProPropertyLabel. Checks for each item if fk_project matches given pkProject 
   *
   * @param {number} pkProject Pk of the project
   *
   * @param {object} data Request data.
   *
   *  - `items` – `{ProPropertyLabel}` - Array of ProPropertyLabels
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProPropertyLabel` object.)
   * </em>
   */
  public bulkDelete(pkProject: any, items: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProPropertyLabels/bulk-delete";
    let _routeParams: any = {};
    let _postBody: any = {
      items: items
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ProPropertyLabel`.
   */
  public getModelName() {
    return "ProPropertyLabel";
  }
}
