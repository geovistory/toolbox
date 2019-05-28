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
import { DatDigital } from '../../models/DatDigital';
import { SocketConnection } from '../../sockets/socket.connections';
import { DatChunk } from '../../models/DatChunk';
import { DatNamespace } from '../../models/DatNamespace';


/**
 * Api services for the `DatDigital` model.
 */
@Injectable()
export class DatDigitalApi extends BaseLoopBackApi {

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
   * Creates or updates instances of DatDigital.
   *
   * @param {number} pkNamespace Namespace
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{DatDigital}` - Array DatDigital
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DatDigital` object.)
   * </em>
   */
  public bulkUpsert(pkNamespace: any, data: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DatDigitals/bulk-upsert";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pkNamespace !== 'undefined' && pkNamespace !== null) _urlParams.pkNamespace = pkNamespace;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Deletes instances of DatDigital.
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
   * This usually means the response is a `DatDigital` object.)
   * </em>
   */
  public bulkDelete(pks: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DatDigitals/delete-delete";
    let _routeParams: any = {};
    let _postBody: any = {
      pks: pks
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Finds the version of given digital. If no version specified, latest is returned.
   *
   * @param {number} pkEntity Primary Key of the digital object (pk_entity)
   *
   * @param {number} entityVersion Primary Key of the digital object (entity_version)
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DatDigital` object.)
   * </em>
   */
  public getVersion(pkEntity: any, entityVersion: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DatDigitals/get-version";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    if (typeof entityVersion !== 'undefined' && entityVersion !== null) _urlParams.entityVersion = entityVersion;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `DatDigital`.
   */
  public getModelName() {
    return "DatDigital";
  }
}
