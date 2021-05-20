/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { LoopBackConfig } from '../../lb.config';
import { SocketConnection } from '../../sockets/socket.connections';
import { LoopBackAuth } from '../core/auth.service';
import { BaseLoopBackApi } from '../core/base.service';
import { ErrorHandler } from '../core/error.service';
import { SDKModels } from './SDKModels';


/**
 * Api services for the `ProProject` model.
 */
@Injectable()
export class ProProjectApi extends BaseLoopBackApi {

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
   * Get the projects of account.
   *
   * @param {number} accountId Id of the account
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProProject` object.)
   * </em>
   */
  public ofAccount(accountId: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/ProProjects/of-account";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof accountId !== 'undefined' && accountId !== null) _urlParams.accountId = accountId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Create a new project with a label and a description.
   *
   * @param {number} accountId Id of account to associate the persistent item with.
   *
   * @param {string} pkLanguage Default language of the project, language of the label and the text property.
   *
   * @param {string} label Label of the project.
   *
   * @param {string} textProperty Description of the project.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProProject` object.)
   * </em>
   */
  public createWithLabelAndDescription(accountId: any, pkLanguage: any, label: any, textProperty: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/ProProjects/create-with-label-and-description";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof accountId !== 'undefined' && accountId !== null) _urlParams.accountId = accountId;
    if (typeof pkLanguage !== 'undefined' && pkLanguage !== null) _urlParams.pkLanguage = pkLanguage;
    if (typeof label !== 'undefined' && label !== null) _urlParams.label = label;
    if (typeof textProperty !== 'undefined' && textProperty !== null) _urlParams.textProperty = textProperty;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get basic information about the project (language, name)
   *
   * @param {number} pkProject Pk of project
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProProject` object.)
   * </em>
   */
  public getBasics(pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
      "/ProProjects/get-basics";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ProProject`.
   */
  public getModelName() {
    return "ProProject";
  }
}
