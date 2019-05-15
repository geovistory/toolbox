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
import { SysAppContext } from '../../models/SysAppContext';
import { SocketConnection } from '../../sockets/socket.connections';
import { ProClassFieldConfig } from '../../models/ProClassFieldConfig';


/**
 * Api services for the `SysAppContext` model.
 */
@Injectable()
export class SysAppContextApi extends BaseLoopBackApi {

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
   * Get the App Configuration for classes.
   *
   * @param {number} pk_app_context pk_entity of app_context
   *
   * @param {number} pk_project pk_project of project
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `SysAppContext` object.)
   * </em>
   */
  public appContext(pk_app_context: any = {}, pk_project: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/SysAppContexts/app-context";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_app_context !== 'undefined' && pk_app_context !== null) _urlParams.pk_app_context = pk_app_context;
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `SysAppContext`.
   */
  public getModelName() {
    return "SysAppContext";
  }
}
