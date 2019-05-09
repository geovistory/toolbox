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
import { InfTextProperty } from '../../models/InfTextProperty';
import { SocketConnection } from '../../sockets/socket.connections';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfLanguage } from '../../models/InfLanguage';
import { SysClassField } from '../../models/SysClassField';


/**
 * Api services for the `InfTextProperty` model.
 */
@Injectable()
export class InfTextPropertyApi extends BaseLoopBackApi {

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
   * Find or create a InfTextProperty and update the project relation if needed.
   *
   * @param {number} pkProject Pk of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfTextProperty}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfTextProperty` object.)
   * </em>
   */
  public findOrCreateInfTextProperty(pkProject: any, data: any, customHeaders?: Function): Observable<InfTextProperty[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfTextProperties/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfTextProperty>) =>
        instances.map((instance: InfTextProperty) => new InfTextProperty(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfTextProperty`.
   */
  public getModelName() {
    return "InfTextProperty";
  }
}
