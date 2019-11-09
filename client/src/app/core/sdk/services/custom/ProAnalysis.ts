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
import { ProAnalysis } from '../../models/ProAnalysis';
import { SocketConnection } from '../../sockets/socket.connections';
import { PubAccount } from '../../models/PubAccount';
import { ProProject } from '../../models/ProProject';


/**
 * Api services for the `ProAnalysis` model.
 */
@Injectable()
export class ProAnalysisApi extends BaseLoopBackApi {

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
   * Run analysis
   *
   * @param {number} pkProject Pk of the project.
   *
   * @param {number} analysisType Pk of the analysis type.
   *
   * @param {object} data Request data.
   *
   *  - `analysisDefinition` – `{object}` - analysisDefinition object.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProAnalysis` object.)
   * </em>
   */
  public run(pkProject: any, analysisType: any, analysisDefinition: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProAnalyses/run";
    let _routeParams: any = {};
    let _postBody: any = {
      analysisDefinition: analysisDefinition
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof analysisType !== 'undefined' && analysisType !== null) _urlParams.analysisType = analysisType;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ProAnalysis`.
   */
  public getModelName() {
    return "ProAnalysis";
  }
}
