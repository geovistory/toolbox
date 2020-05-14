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
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { SocketConnection } from '../../sockets/socket.connections';
import { InfStatement } from '../../models/InfStatement';
import { InfTextProperty } from '../../models/InfTextProperty';


/**
 * Api services for the `WarEntityPreview` model.
 */
@Injectable()
export class WarEntityPreviewApi extends BaseLoopBackApi {

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
   * @param {string} entityType Type of Entity: 'teEn' or 'peIt'.
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
   * This usually means the response is a `WarEntityPreview` object.)
   * </em>
   */
  public search(pkProject: any = {}, searchString: any = {}, pkClasses: any = {}, entityType: any = {}, limit: any = {}, page: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/WarEntityPreviews/search";
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
   * Find data unit previews, while entities in provided project have priority over repo versions.
   *
   * @param {number} pkProject pkProject
   *
   * @param {string} searchString Search String
   *
   * @param {any} pkClasses Classes for which the search will be performed.
   *
   * @param {string} entityType Type of Entity: 'teEn' or 'peIt'.
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
   * This usually means the response is a `WarEntityPreview` object.)
   * </em>
   */
  public searchExisting(pkProject: any, searchString: any = {}, pkClasses: any = {}, entityType: any = {}, limit: any = {}, page: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/WarEntityPreviews/search-existing";
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
   * Find entity previews with left joined statement.
   *
   * @param {number} pkProject pkProject
   *
   * @param {string} searchString Search String
   *
   * @param {any} pkClasses Classes for which the search will be performed.
   *
   * @param {string} entityType Type of Entity: 'teEn' or 'peIt'.
   *
   * @param {number} limit Max. number of results per page [default=10; max=200]
   *
   * @param {number} page Page of pagination
   *
   * @param {object} relatedStatement Definition about how to join related statements
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `WarEntityPreview` object.)
   * </em>
   */
  public searchExistingWithRelatedStatement(pkProject: any, searchString: any = {}, pkClasses: any = {}, entityType: any = {}, limit: any = {}, page: any, relatedStatement: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/WarEntityPreviews/search-existing-with-related-statement";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof searchString !== 'undefined' && searchString !== null) _urlParams.searchString = searchString;
    if (typeof pkClasses !== 'undefined' && pkClasses !== null) _urlParams.pkClasses = pkClasses;
    if (typeof entityType !== 'undefined' && entityType !== null) _urlParams.entityType = entityType;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof page !== 'undefined' && page !== null) _urlParams.page = page;
    if (typeof relatedStatement !== 'undefined' && relatedStatement !== null) _urlParams.relatedStatement = relatedStatement;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Recreate all entity previews. This may be useful after deployment on a fresh db.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `WarEntityPreview` object.)
   * </em>
   */
  public createAll(customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/WarEntityPreviews/create-all";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Gets ordered and paginated list of entity previews for given pkEntities.
   *
   * @param {number} pkProject pkProject, if none provided, searches in repo
   *
   * @param {number} limit Max. number of results per page [default=10; max=200]
   *
   * @param {number} offset Offset
   *
   * @param {object} data Request data.
   *
   *  - `pkEntities` – `{number}` - Array of pkEntities
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `WarEntityPreview` object.)
   * </em>
   */
  public paginatedListByPks(pkProject: any, pkEntities: any, limit: any, offset: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/WarEntityPreviews/paginated-list-by-pks";
    let _routeParams: any = {};
    let _postBody: any = {
      pkEntities: pkEntities
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof limit !== 'undefined' && limit !== null) _urlParams.limit = limit;
    if (typeof offset !== 'undefined' && offset !== null) _urlParams.offset = offset;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `WarEntityPreview`.
   */
  public getModelName() {
    return "WarEntityPreview";
  }
}
