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
import { ComProject } from '../../models/ComProject';
import { SocketConnection } from '../../sockets/socket.connections';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { PubAccount } from '../../models/PubAccount';
import { ComLanguage } from '../../models/ComLanguage';
import { ComLabel } from '../../models/ComLabel';
import { ComTextProperty } from '../../models/ComTextProperty';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfNamespace } from '../../models/InfNamespace';


/**
 * Api services for the `ComProject` model.
 */
@Injectable()
export class ComProjectApi extends BaseLoopBackApi {

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
   * Zugehöriges Element nach ID für accounts hinzufügen.
   *
   * @param {any} id ComProject id
   *
   * @param {any} fk Fremdschlüssel für accounts
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public linkAccounts(id: any, fk: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/:id/accounts/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * accounts-Beziehung zu einem Element nach ID entfernen.
   *
   * @param {any} id ComProject id
   *
   * @param {any} fk Fremdschlüssel für accounts
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public unlinkAccounts(id: any, fk: any, customHeaders?: Function): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/:id/accounts/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Vorhandensein von accounts-Beziehung zu einem Element nach ID prüfen.
   *
   * @param {any} id ComProject id
   *
   * @param {any} fk Fremdschlüssel für accounts
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public existsAccounts(id: any, fk: any, customHeaders?: Function): Observable<any> {
    let _method: string = "HEAD";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/:id/accounts/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Zugehöriges Element nach ID für persistent_item_versions hinzufügen.
   *
   * @param {any} id ComProject id
   *
   * @param {any} fk Fremdschlüssel für persistent_item_versions
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public linkPersistent_item_versions(id: any, fk: any, data: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/:id/persistent_item_versions/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * persistent_item_versions-Beziehung zu einem Element nach ID entfernen.
   *
   * @param {any} id ComProject id
   *
   * @param {any} fk Fremdschlüssel für persistent_item_versions
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public unlinkPersistent_item_versions(id: any, fk: any, customHeaders?: Function): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/:id/persistent_item_versions/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Vorhandensein von persistent_item_versions-Beziehung zu einem Element nach ID prüfen.
   *
   * @param {any} id ComProject id
   *
   * @param {any} fk Fremdschlüssel für persistent_item_versions
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public existsPersistent_item_versions(id: any, fk: any, customHeaders?: Function): Observable<any> {
    let _method: string = "HEAD";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/:id/persistent_item_versions/rel/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Create a new project with a label and a description.
   *
   * @param {number} accountId Id of account to associate the persistent item with.
   *
   * @param {string} pkLanguage Default language of the project, language of the label and the text property.
   *
   * @param {string} label Label of the project.
   *
   * @param {string} textProperty Description of the project.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public createWithLabelAndDescription(accountId: any, pkLanguage: any, label: any, textProperty: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/create-with-label-and-description";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof accountId !== 'undefined' && accountId !== null) _urlParams.accountId = accountId;
    if (typeof pkLanguage !== 'undefined' && pkLanguage !== null) _urlParams.pkLanguage = pkLanguage;
    if (typeof label !== 'undefined' && label !== null) _urlParams.label = label;
    if (typeof textProperty !== 'undefined' && textProperty !== null) _urlParams.textProperty = textProperty;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Classes and Properties of this Project
   *
   * @param {number} pk_project Pk of project
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public getReferenceModel(pk_project: any, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/get-reference-model";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
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
   * This usually means the response is a `ComProject` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<ComProject[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/ComProjects/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<ComProject>) =>
        instances.map((instance: ComProject) => new ComProject(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `ComProject`.
   */
  public getModelName() {
    return "ComProject";
  }
}
