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
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { SocketConnection } from '../../sockets/socket.connections';
import { DfhClass } from '../../models/DfhClass';
import { DfhProjRel } from '../../models/DfhProjRel';


/**
 * Api services for the `DfhClassProfileView` model.
 */
@Injectable()
export class DfhClassProfileViewApi extends BaseLoopBackApi {

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
   * This usually means the response is a `DfhClassProfileView` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<DfhClassProfileView[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhClassProfileViews/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<DfhClassProfileView>) =>
        instances.map((instance: DfhClassProfileView) => new DfhClassProfileView(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhClassProfileView`.
   */
  public getModelName() {
    return "DfhClassProfileView";
  }
}
