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
import { ComProject } from '../../models/ComProject';
import { SocketConnection } from '../../sockets/socket.connections';
import { ComLabel } from '../../models/ComLabel';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { PubAccount } from '../../models/PubAccount';
import { ComLanguage } from '../../models/ComLanguage';
import { ComTextProperty } from '../../models/ComTextProperty';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfNamespace } from '../../models/InfNamespace';


/**
 * Api services for the `ComProject` model.
 */
@Injectable()
export class ComProjectApi extends BaseLoopBackApi {

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
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public createWithLabelAndDescription(accountId: any, pkLanguage: any, label: any, textProperty: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/create-with-label-and-description";
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
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public getBasics(pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/get-basics";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Classes and Properties of this Project
   *
   * @param {number} pkProject Pk of project
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
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public getReferenceModel(pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/get-reference-model";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ComProject`.
   */
  public getModelName() {
    return "ComProject";
  }
}
