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
   * Run analysis by sending all the necessary information to the api (no persisted analysis settings involved)
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
   * Find analysis of project, pk and version. If version is omitted, finds the latest version. If pkEntity omitted, finds all analyses of project, in latest version.
   *
   * @param {number} pkProject Pk of the project
   *
   * @param {number} pkEntity Pk of the visual
   *
   * @param {number} version Entity version
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
  public findPerIdAndVersionAndProject(pkProject: any, pkEntity: any = {}, version: any = {}, customHeaders?: Function): Observable<ProAnalysis[]> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProAnalyses/find-per-id-and-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    if (typeof version !== 'undefined' && version !== null) _urlParams.version = version;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<ProAnalysis>) =>
        instances.map((instance: ProAnalysis) => new ProAnalysis(instance))
    ));
  }

  /**
   * Creates or updates instances of ProAnalysis.
   *
   * @param {number} pkProject Project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{ProAnalysis}` - Array ProAnalysis
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProAnalysis` object.)
   * </em>
   */
  public bulkUpsert(pkProject: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProAnalyses/bulk-upsert";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Deletes instances of ProAnalysis.
   *
   * @param {number} pkProject Project to which the ProAnalyses belong
   *
   * @param {object} data Request data.
   *
   *  - `pks` – `{number}` - Array of Primary Key of DatDigitals
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProAnalysis` object.)
   * </em>
   */
  public bulkDelete(pks: any, pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProAnalyses/bulk-delete";
    let _routeParams: any = {};
    let _postBody: any = {
      pks: pks
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
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
