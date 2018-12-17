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
import { InfDataUnitPreview } from '../../models/InfDataUnitPreview';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `InfDataUnitPreview` model.
 */
@Injectable()
export class InfDataUnitPreviewApi extends BaseLoopBackApi {

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
   * Find data unit previews.
   *
   * @param {number} pkProject pkProject, if none provided, searches in repo
   *
   * @param {string} searchString Search String
   *
   * @param {any} pkClasses Classes for which the search will be performed.
   *
   * @param {string} entityType Type of DataUnit: 'teEn' or 'peIt'.
   *
   * @param {number} limit Max. number of results per page [default=10; max=200]
   *
   * @param {number} page Page of pagination
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfDataUnitPreview` object.)
   * </em>
   */
  public search(pkProject: any = {}, searchString: any = {}, pkClasses: any = {}, entityType: any = {}, limit: any = {}, page: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfDataUnitPreviews/search";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof searchString !== 'undefined' && searchString !== null) _urlParams.searchString = searchString;
    if (typeof pkClasses !== 'undefined' && pkClasses !== null) _urlParams.pkClasses = pkClasses;
    if (typeof entityType !== 'undefined' && entityType !== null) _urlParams.entityType = entityType;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof page !== 'undefined' && page !== null) _urlParams.page = page;
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
   * This usually means the response is a `InfDataUnitPreview` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<InfDataUnitPreview[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfDataUnitPreviews/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfDataUnitPreview>) =>
        instances.map((instance: InfDataUnitPreview) => new InfDataUnitPreview(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfDataUnitPreview`.
   */
  public getModelName() {
    return "InfDataUnitPreview";
  }
}
