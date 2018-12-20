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
import { ComClassField } from '../../models/ComClassField';
import { SocketConnection } from '../../sockets/socket.connections';
import { ComUiContextConfig } from '../../models/ComUiContextConfig';
import { DfhClass } from '../../models/DfhClass';
import { ComLabel } from '../../models/ComLabel';
import { ComClassFieldPropertyRel } from '../../models/ComClassFieldPropertyRel';


/**
 * Api services for the `ComClassField` model.
 */
@Injectable()
export class ComClassFieldApi extends BaseLoopBackApi {

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
   * This usually means the response is a `ComClassField` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<ComClassField[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComClassFields/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<ComClassField>) =>
        instances.map((instance: ComClassField) => new ComClassField(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ComClassField`.
   */
  public getModelName() {
    return "ComClassField";
  }
}
