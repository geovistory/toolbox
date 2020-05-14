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
import { PaginationObject } from '../../models/PaginationObject';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `PaginationObject` model.
 */
@Injectable()
export class PaginationObjectApi extends BaseLoopBackApi {

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
   * Get PaginationObject to build a list of leaf items not (yet) in project.
   *
   * @param {number} pkProject Primary Key of the Project.
   *
   * @param {number} limit number of returned items.
   *
   * @param {number} offset offset of the segment of returned items.
   *
   * @param {object} data Request data.
   *
   *  - `filterObject` – `{object}` - Object to filter the statements
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `PaginationObject` object.)
   * </em>
   */
  public listAlternativeLeafItems(pkProject: any, filterObject: any, limit: any, offset: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/PaginationObjects/list-alternative-leaf-items";
    let _routeParams: any = {};
    let _postBody: any = {
      filterObject: filterObject
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
   * i.e. `PaginationObject`.
   */
  public getModelName() {
    return "PaginationObject";
  }
}
