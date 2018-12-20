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
import { InfPlace } from '../../models/InfPlace';
import { SocketConnection } from '../../sockets/socket.connections';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';


/**
 * Api services for the `InfPlace` model.
 */
@Injectable()
export class InfPlaceApi extends BaseLoopBackApi {

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
   * Find or create a InfPlace and update the project relation if needed.
   *
   * @param {number} projectId Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfPlace}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPlace` object.)
   * </em>
   */
  public findOrCreatePlace(projectId: any, data: any, customHeaders?: Function): Observable<InfPlace[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPlaces/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof projectId !== 'undefined' && projectId !== null) _urlParams.projectId = projectId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfPlace>) =>
        instances.map((instance: InfPlace) => new InfPlace(instance))
    ));
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPlace` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<InfPlace[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPlaces/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfPlace>) =>
        instances.map((instance: InfPlace) => new InfPlace(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfPlace`.
   */
  public getModelName() {
    return "InfPlace";
  }
}
