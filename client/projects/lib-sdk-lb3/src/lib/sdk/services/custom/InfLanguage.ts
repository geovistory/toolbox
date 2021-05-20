/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { SocketConnection } from '../../sockets/socket.connections';
import { LoopBackAuth } from '../core/auth.service';
import { BaseLoopBackApi } from '../core/base.service';
import { ErrorHandler } from '../core/error.service';
import { SDKModels } from './SDKModels';


/**
 * Api services for the `InfLanguage` model.
 */
@Injectable()
export class InfLanguageApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http, connection, models, auth, errorHandler);
  }

  /**
   * Perform a ranked search on languages by search string.
   *
   * @param {string} queryString
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfLanguage` object.)
   * </em>
   */
  // public queryByString(queryString: any = {}, customHeaders?: Function): Observable<any> {
  //   let _method: string = "GET";
  //   let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
  //   "/InfLanguages/query-by-string";
  //   let _routeParams: any = {};
  //   let _postBody: any = {};
  //   let _urlParams: any = {};
  //   if (typeof queryString !== 'undefined' && queryString !== null) _urlParams.queryString = queryString;
  //   let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
  //   return result;
  // }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfLanguage`.
   */
  public getModelName() {
    return "InfLanguage";
  }
}
