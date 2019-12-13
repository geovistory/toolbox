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
import { DfhProfile } from '../../models/DfhProfile';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `DfhProfile` model.
 */
@Injectable()
export class DfhProfileApi extends BaseLoopBackApi {

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
   * Pulls profile data including classes and properties from OntoMe and adds profile to project.
   *
   * @param {number} pkProfile OntoMe profile that should be added
   *
   * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DfhProfile` object.)
   * </em>
   */
  public update(pkProfile: any, requestedLanguage: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhProfiles/update";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProfile !== 'undefined' && pkProfile !== null) _urlParams.pkProfile = pkProfile;
    if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null) _urlParams.requestedLanguage = requestedLanguage;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Pulls profile data including classes and properties from OntoMe and adds profile to project.
   *
   * @param {number} pkProject Geovistory project to which the OntoMe profile should be added
   *
   * @param {number} pkProfile OntoMe profile that should be added
   *
   * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DfhProfile` object.)
   * </em>
   */
  public updateAndAddToProject(pkProject: any, pkProfile: any, requestedLanguage: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhProfiles/update-and-add-to-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkProfile !== 'undefined' && pkProfile !== null) _urlParams.pkProfile = pkProfile;
    if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null) _urlParams.requestedLanguage = requestedLanguage;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhProfile`.
   */
  public getModelName() {
    return "DfhProfile";
  }
}
