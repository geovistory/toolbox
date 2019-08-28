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
import { InfRole } from '../../models/InfRole';
import { DfhClass } from '../../models/DfhClass';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
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
   * Get a flat object of entity.
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
  public flatObjectOfProject(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/flat-object";
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
   * Get e nested object of all information about the persistent in the project version.
   *
   * @param {number} pkProject Pk of the project.
   *
   * @param {object} data Request data.
   *
   *  - `pkEntities` – `{any}` - Primary Keys of the persistent items (array of pk_entity)
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
  public graphsOfProject(pkProject: any, pkEntities: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/graphs-of-project";
    let _routeParams: any = {};
    let _postBody: any = {
      pkEntities: pkEntities
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get e nested object of all information about the persistent item with the community favorites.
   *
   * @param {object} data Request data.
   *
   *  - `pkEntities` – `{any}` - Primary Keys of the persistent items (array of pk_entity)
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
  public graphsOfRepo(pkEntities: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/graphs-of-repo";
    let _routeParams: any = {};
    let _postBody: any = {
      pkEntities: pkEntities
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get e nested object of all information about the persistent item of the project.
   *
   * @param {number} pkProject Project id
   *
   * @param {number} pkEntity Primary Key of the persistent item (pk_entity)
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
  public nestedObjectOfProject(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/nested-object-of-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find or create a InfPersistentItem.
   *
   * @param {number} pkProject Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfPersistentItem}` - data
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
  public findOrCreatePeIt(pkProject: any, data: any, customHeaders?: Function): Observable<InfPersistentItem[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfPersistentItem>) =>
        instances.map((instance: InfPersistentItem) => new InfPersistentItem(instance))
    ));
  }

  /**
   * Get e nested object of all information about the persistent item with the community favorites.
   *
   * @param {number} pkEntity Primary Key of the persistent item (pk_entity)
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
  public nestedObjectOfRepo(pkEntity: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/nested-object-of-repo";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find types of given namespace, class and project.
   *
   * @param {string} pk_namespace Primary Key of Namespace
   *
   * @param {number} pk_project Primary Key of Project
   *
   * @param {number} pk_typed_class Primary Key of Typed Class (e.g. pk of Geographical Place to get Geographical Place Types)
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
  public typesOfNamespaceClassAndProject(pk_namespace: any, pk_project: any, pk_typed_class: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/types-of-namespace-class-and-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_namespace !== 'undefined' && pk_namespace !== null) _urlParams.pk_namespace = pk_namespace;
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    if (typeof pk_typed_class !== 'undefined' && pk_typed_class !== null) _urlParams.pk_typed_class = pk_typed_class;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find types by class and project. E.g. get the types for the class 'histC9 Geographical place type' (pk_class=364) used in project (pk_project=123)
   *
   * @param {number} pk_project Primary Key of Project
   *
   * @param {number} pk_class Primary Key of the Type Class (e.g. pk of Geographical Place Type)
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
  public typesByClassAndProject(pk_project: any, pk_class: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/types-by-class-and-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    if (typeof pk_class !== 'undefined' && pk_class !== null) _urlParams.pk_class = pk_class;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find types of typed class and project. E.g. get the types for the class 'histC8 Geographical Place' (pk_typed_class=363) used in project (pk_project=123)
   *
   * @param {number} pk_project Primary Key of Project
   *
   * @param {number} pk_typed_class Primary Key of Typed Class (e.g. pk of Geographical Place to get Geographical Place Types)
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
  public typesOfClassAndProject(pk_project: any, pk_typed_class: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/types-of-class-and-project";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    if (typeof pk_typed_class !== 'undefined' && pk_typed_class !== null) _urlParams.pk_typed_class = pk_typed_class;
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
   * Find types of given namespace, class and project.
   *
   * @param {string} pk_namespace Primary Key of Namespace
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
  public typesOfNamespaceNested(pk_namespace: any, pk_project: any, pk_entity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/types-of-namespace-nested";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_namespace !== 'undefined' && pk_namespace !== null) _urlParams.pk_namespace = pk_namespace;
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    if (typeof pk_entity !== 'undefined' && pk_entity !== null) _urlParams.pk_entity = pk_entity;
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
   * Add a persistent item with its related elements to a project.
   *
   * @param {number} pk_project Primary Key of Project
   *
   * @param {number} pk_entity Primary Key of the persistent item to add.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
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
  public addToProject(pk_project: any, pk_entity: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfPersistentItems/add-to-project";
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
