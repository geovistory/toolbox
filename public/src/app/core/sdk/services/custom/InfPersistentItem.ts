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
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { SocketConnection } from '../../sockets/socket.connections';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { InfStatement } from '../../models/InfStatement';
import { DfhClass } from '../../models/DfhClass';
import { InfTextProperty } from '../../models/InfTextProperty';


/**
 * Api services for the `InfPersistentItem` model.
 */
@Injectable()
export class InfPersistentItemApi extends BaseLoopBackApi {

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
   * Find or create many information persistent items.
   *
   * @param {number} pk_project Pk of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfPersistentItem}` - data
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPersistentItem` object.)
   * </em>
   */
  public findOrCreateInfPersistentItems(pk_project: any, data: any, customHeaders?: Function): Observable<InfPersistentItem[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/find-or-create-many";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfPersistentItem>) =>
        instances.map((instance: InfPersistentItem) => new InfPersistentItem(instance))
    ));
  }

  /**
   * Get only miminal properties of persistent item.
   *
   * @param {number} pkProject Pk of the project.
   *
   * @param {number} pkEntity Pk of the entity.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPersistentItem` object.)
   * </em>
   */
  public ownProperties(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/own-properties";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get a minimal nested object of all types in the project.
   *
   * @param {number} pkProject Pk of the project.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPersistentItem` object.)
   * </em>
   */
  public typesOfProject(pkProject: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/types-of-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find types of typed class and project. E.g. get the types for the class 'histC8 Geographical Place' (pk_typed_class=363) used in project (pk_project=123)
   *
   * @param {number} pk_project Primary Key of Project
   *
   * @param {number} pk_typed_classes Primary Keyes of Typed Classes (e.g. pk of Geographical Place to get Geographical Place Types)
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPersistentItem` object.)
   * </em>
   */
  public typesOfClassesAndProject(pk_project: any, pk_typed_classes: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/types-of-classes-and-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    if (typeof pk_typed_classes !== 'undefined' && pk_typed_classes !== null) _urlParams.pk_typed_classes = pk_typed_classes;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find one type by pk_entity with appellations and text properties.
   *
   * @param {number} pk_project Primary Key of Project
   *
   * @param {number} pk_entity Primary Key of the type. Provide this if you want to query one specific type.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfPersistentItem` object.)
   * </em>
   */
  public typeNested(pk_project: any, pk_entity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/type-nested";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    if (typeof pk_entity !== 'undefined' && pk_entity !== null) _urlParams.pk_entity = pk_entity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfPersistentItem`.
   */
  public getModelName() {
    return "InfPersistentItem";
  }
}
