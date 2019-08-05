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
import { DfhClass } from '../../models/DfhClass';
import { SocketConnection } from '../../sockets/socket.connections';
import { DfhProperty } from '../../models/DfhProperty';
import { DfhLabel } from '../../models/DfhLabel';
import { DfhTextProperty } from '../../models/DfhTextProperty';
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { ProClassFieldConfig } from '../../models/ProClassFieldConfig';
import { SysClassField } from '../../models/SysClassField';
import { ProDfhClassProjRel } from '../../models/ProDfhClassProjRel';
import { InfPersistentItem } from '../../models/InfPersistentItem';


/**
 * Api services for the `DfhClass` model.
 */
@Injectable()
export class DfhClassApi extends BaseLoopBackApi {

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
   * Get all classes that are selected by at least one of the profiles used by the given project.
   *
   * @param {number} pkProject Project pk
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DfhClass` object.)
   * </em>
   */
  public classesOfProjectProfiles(pkProject: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhClasses/classes-of-project-profiles";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get all classes that are selected by the profile of the specified primary-key.
   *
   * @param {number} dfh_pk_profile Profile id
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DfhClass` object.)
   * </em>
   */
  public classesOfProfile(dfh_pk_profile: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhClasses/selected-classes-of-profile";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof dfh_pk_profile !== 'undefined' && dfh_pk_profile !== null) _urlParams.dfh_pk_profile = dfh_pk_profile;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get ingoing and outgoing properties and ui elements of class
   *
   * @param {number} pk_class Provide the dfh_pk_class to query one specific class
   *
   * @param {number} pk_app_context Provide the pk_entity of the app_context to query
   *
   * @param {number} pk_project Provide a pk_project for loading the settings of a project or leaf it blank to query the default settings.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `DfhClass` object.)
   * </em>
   */
  public propertiesAndUiElements(pk_class: any, pk_app_context: any, pk_project: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhClasses/properties-and-ui-elements";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof pk_class !== 'undefined' && pk_class !== null) _urlParams.pk_class = pk_class;
    if (typeof pk_app_context !== 'undefined' && pk_app_context !== null) _urlParams.pk_app_context = pk_app_context;
    if (typeof pk_project !== 'undefined' && pk_project !== null) _urlParams.pk_project = pk_project;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
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
   * This usually means the response is a `DfhClass` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<DfhClass[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/DfhClasses/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<DfhClass>) =>
        instances.map((instance: DfhClass) => new DfhClass(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhClass`.
   */
  public getModelName() {
    return "DfhClass";
  }
}
