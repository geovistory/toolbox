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
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `ProInfoProjRel` model.
 */
@Injectable()
export class ProInfoProjRelApi extends BaseLoopBackApi {

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
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - Model instance data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProInfoProjRel` object.)
   * </em>
   */
  public patchOrCreate(data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "PATCH";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProInfoProjRels";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Updates the ProInfoProjRel found by fk_project and fk_entity.
   *
   * @param {number} pkProject fk_project
   *
   * @param {number} pkEntity fk_entity
   *
   * @param {object} data Request data.
   *
   *  - `eprAttributes` – `{ProInfoProjRel}` - Instance of ProInfoProjRel (fk_project and fk_entity will be ignored)
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProInfoProjRel` object.)
   * </em>
   */
  public updateEprAttributes(pkProject: any, pkEntity: any, eprAttributes: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProInfoProjRels/updateEprAttributes";
    let _routeParams: any = {};
    let _postBody: any = {
      eprAttributes: eprAttributes
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Updates the ProInfoProjRel of all found by fk_project and fk_entity.
   *
   * @param {number} pkProject fk_project
   *
   * @param {object} data Request data.
   *
   *  - `items` – `{ProInfoProjRel}` - Array of ProInfoProjRel (fk_project must be equal to pkProject)
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ProInfoProjRel` object.)
   * </em>
   */
  public bulkUpdateEprAttributes(pkProject: any, items: any, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ProInfoProjRels/bulk-update-attributes";
    let _routeParams: any = {};
    let _postBody: any = {
      items: items
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ProInfoProjRel`.
   */
  public getModelName() {
    return "ProInfoProjRel";
  }
}
