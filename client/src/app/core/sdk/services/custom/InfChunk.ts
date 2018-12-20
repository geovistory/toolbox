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
import { InfChunk } from '../../models/InfChunk';
import { SocketConnection } from '../../sockets/socket.connections';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
import { InfDigitalObject } from '../../models/InfDigitalObject';


/**
 * Api services for the `InfChunk` model.
 */
@Injectable()
export class InfChunkApi extends BaseLoopBackApi {

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
   * Find or create a InfChunk and update the project relation if needed.
   *
   * @param {number} projectId Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfChunk}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfChunk` object.)
   * </em>
   */
  public findOrCreateChunk(projectId: any, data: any, customHeaders?: Function): Observable<InfChunk[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfChunks/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof projectId !== 'undefined' && projectId !== null) _urlParams.projectId = projectId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfChunk>) =>
        instances.map((instance: InfChunk) => new InfChunk(instance))
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
   * This usually means the response is a `InfChunk` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<InfChunk[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfChunks/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfChunk>) =>
        instances.map((instance: InfChunk) => new InfChunk(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfChunk`.
   */
  public getModelName() {
    return "InfChunk";
  }
}
