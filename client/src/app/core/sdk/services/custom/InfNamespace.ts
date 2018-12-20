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
import { InfNamespace } from '../../models/InfNamespace';
import { SocketConnection } from '../../sockets/socket.connections';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';


/**
 * Api services for the `InfNamespace` model.
 */
@Injectable()
export class InfNamespaceApi extends BaseLoopBackApi {

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
   * Find Namespaces that have at least one type instance that is used to type the given class or where the Namespace belongs to the given project. Root Namespaces are excluded. Geovistory Ongoing is allways included.
   *
   * @param {number} pk_class Primary Key of the typed class (e.g. of Group for Group Types)
   *
   * @param {number} pk_project Primary Key of the the current project
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfNamespace` object.)
   * </em>
   */
  public findWhereProjectOrHasTypes(pk_class: any, pk_project: any, customHeaders?: Function): Observable<InfNamespace[]> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfNamespaces/find-where-project-or-has-types";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_class !== 'undefined' && pk_class !== null) _urlParams.pk_class = pk_class;
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfNamespace>) =>
        instances.map((instance: InfNamespace) => new InfNamespace(instance))
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
   * This usually means the response is a `InfNamespace` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<InfNamespace[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfNamespaces/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfNamespace>) =>
        instances.map((instance: InfNamespace) => new InfNamespace(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfNamespace`.
   */
  public getModelName() {
    return "InfNamespace";
  }
}
