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
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
import { SocketConnection } from '../../sockets/socket.connections';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfChunk } from '../../models/InfChunk';
import { InfDigitalObject } from '../../models/InfDigitalObject';


/**
 * Api services for the `InfEntityAssociation` model.
 */
@Injectable()
export class InfEntityAssociationApi extends BaseLoopBackApi {

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
   * Find or create an information entity association.
   *
   * @param {number} projectId Id of the project
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{InfEntityAssociation}` - data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfEntityAssociation` object.)
   * </em>
   */
  public findOrCreateInfEntityAssociation(projectId: any, data: any, customHeaders?: Function): Observable<InfEntityAssociation[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfEntityAssociations/findOrCreate";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data
    };
    let _urlParams: any = {};
    if (typeof projectId !== 'undefined' && projectId !== null) _urlParams.projectId = projectId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfEntityAssociation>) =>
        instances.map((instance: InfEntityAssociation) => new InfEntityAssociation(instance))
    ));
  }

  /**
   * Get e nested object of all information about the found entity associations.
   *
   * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
   *
   * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
   *
   * @param {number} pkEntity Primary Key of the entity association (pk_entity)
   *
   * @param {number} pkRangeEntity Foreign Key of the entity association pointing to the range entity (fk_range_entity)
   *
   * @param {number} pkDomainEntity Foreign Key of the entity association pointing to the domain entity (fk_domain_entity)
   *
   * @param {number} pkProperty Foreign Key of the entity association pointing to the property (fk_property)
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfEntityAssociation` object.)
   * </em>
   */
  public nestedObject(ofProject: any, pkProject: any = {}, pkEntity: any = {}, pkRangeEntity: any = {}, pkDomainEntity: any = {}, pkProperty: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfEntityAssociations/nested-object";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    if (typeof pkRangeEntity !== 'undefined' && pkRangeEntity !== null) _urlParams.pkRangeEntity = pkRangeEntity;
    if (typeof pkDomainEntity !== 'undefined' && pkDomainEntity !== null) _urlParams.pkDomainEntity = pkDomainEntity;
    if (typeof pkProperty !== 'undefined' && pkProperty !== null) _urlParams.pkProperty = pkProperty;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find entity associations by params.
   *
   * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
   *
   * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
   *
   * @param {number} pkEntity Primary Key of the entity association (pk_entity)
   *
   * @param {number} pkRangeEntity Foreign Key of the entity association pointing to the range entity (fk_range_entity)
   *
   * @param {number} pkDomainEntity Foreign Key of the entity association pointing to the domain entity (fk_domain_entity)
   *
   * @param {number} pkProperty Foreign Key of the entity association pointing to the property (fk_property)
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfEntityAssociation` object.)
   * </em>
   */
  public queryByParams(ofProject: any, pkProject: any = {}, pkEntity: any = {}, pkRangeEntity: any = {}, pkDomainEntity: any = {}, pkProperty: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfEntityAssociations/find-by-params";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
    if (typeof pkRangeEntity !== 'undefined' && pkRangeEntity !== null) _urlParams.pkRangeEntity = pkRangeEntity;
    if (typeof pkDomainEntity !== 'undefined' && pkDomainEntity !== null) _urlParams.pkDomainEntity = pkDomainEntity;
    if (typeof pkProperty !== 'undefined' && pkProperty !== null) _urlParams.pkProperty = pkProperty;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Get mentionigs of a project and filter by domain or range of 'geovP2 – is mentioned in'. Returns also context information, if the range is a F2 Expression (section), geovC2 Chunk or geovC3 Spot.
   *
   * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
   *
   * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
   *
   * @param {number} pkRangeEntity Foreign Key (fk_range_entity) to the source/section/chunk/spot that mentiones (range of 'geovP2 – is mentioned in')
   *
   * @param {number} pkDomainEntity Foreign Key (fk_domain_entity) to the mentioned entity (domain of 'geovP2 – is mentioned in')
   *
   * @param {number} pkSource Primary Key of the entity association (pk_entity)
   *
   * @param {number} pkExpression Primary Key of the entity association (pk_entity)
   *
   * @param {number} pkChunk Primary Key of the entity association (pk_entity)
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfEntityAssociation` object.)
   * </em>
   */
  public mentionings(ofProject: any, pkProject: any, pkRangeEntity: any = {}, pkDomainEntity: any = {}, pkSource: any = {}, pkExpression: any = {}, pkChunk: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfEntityAssociations/mentionings";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkRangeEntity !== 'undefined' && pkRangeEntity !== null) _urlParams.pkRangeEntity = pkRangeEntity;
    if (typeof pkDomainEntity !== 'undefined' && pkDomainEntity !== null) _urlParams.pkDomainEntity = pkDomainEntity;
    if (typeof pkSource !== 'undefined' && pkSource !== null) _urlParams.pkSource = pkSource;
    if (typeof pkExpression !== 'undefined' && pkExpression !== null) _urlParams.pkExpression = pkExpression;
    if (typeof pkChunk !== 'undefined' && pkChunk !== null) _urlParams.pkChunk = pkChunk;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * Find mentionings of section (F2 Expression).
   *
   * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
   *
   * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
   *
   * @param {number} pkEntity Primary Key of the entity association (pk_entity)
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `InfEntityAssociation` object.)
   * </em>
   */
  public mentioningsOfSection(ofProject: any, pkProject: any, pkEntity: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfEntityAssociations/mentionings-of-section";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof ofProject !== 'undefined' && ofProject !== null) _urlParams.ofProject = ofProject;
    if (typeof pkProject !== 'undefined' && pkProject !== null) _urlParams.pkProject = pkProject;
    if (typeof pkEntity !== 'undefined' && pkEntity !== null) _urlParams.pkEntity = pkEntity;
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
   * This usually means the response is a `InfEntityAssociation` object.)
   * </em>
   */
  public findComplex(filter: LoopBackFilter = {}, customHeaders?: Function): Observable<InfEntityAssociation[]> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/InfEntityAssociations/findComplex";
    let _routeParams: any = {};
    let _postBody: any = {
      filter: filter
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result.pipe(map((instances: Array<InfEntityAssociation>) =>
        instances.map((instance: InfEntityAssociation) => new InfEntityAssociation(instance))
    ));
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `InfEntityAssociation`.
   */
  public getModelName() {
    return "InfEntityAssociation";
  }
}
