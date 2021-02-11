import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { map } from 'rxjs/operators';
import { InfStatement } from '../../models/InfStatement';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfStatement` model.
 */
let InfStatementApi = class InfStatementApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get a flat object of entity previews, that are target of a list.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the entity previews, that are target of a list are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the entity previews, that are target of a list.
     *
     * @param {number} pkTargetClass Fk class of the target entity previews, that are target of a list.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned entity previews, that are target of a list.
     *
     * @param {number} offset offset of the segment of returned entity previews, that are target of a list.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    paginatedListTargetingEntityPreviews(pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/paginated-list-targeting-entity-previews";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkSourceEntity !== 'undefined' && pkSourceEntity !== null)
            _urlParams.pkSourceEntity = pkSourceEntity;
        if (typeof pkProperty !== 'undefined' && pkProperty !== null)
            _urlParams.pkProperty = pkProperty;
        if (typeof pkTargetClass !== 'undefined' && pkTargetClass !== null)
            _urlParams.pkTargetClass = pkTargetClass;
        if (typeof isOutgoing !== 'undefined' && isOutgoing !== null)
            _urlParams.isOutgoing = isOutgoing;
        if (typeof limit !== 'undefined' && limit !== null)
            _urlParams.limit = limit;
        if (typeof offset !== 'undefined' && offset !== null)
            _urlParams.offset = offset;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find or create information statement.
     *
     * @param {number} pk_project Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfStatement}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    findOrCreateInfStatements(pk_project, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/find-or-create-many";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfStatement(instance))));
    }
    /**
     * Get statements (with children) of given fkProperty and fkEntity from Repo that are not in project of given projectId.
     *
     * @param {number} entityPk Key of the persistent item (fk_object_info)
     *
     * @param {number} propertyPk Key of the property (fk_property)
     *
     * @param {number} pkProject Id of the the current project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    alternativesNotInProjectByEntityPk(entityPk, propertyPk, pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/alternatives-not-in-project-by-entity-pk";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof entityPk !== 'undefined' && entityPk !== null)
            _urlParams.entityPk = entityPk;
        if (typeof propertyPk !== 'undefined' && propertyPk !== null)
            _urlParams.propertyPk = propertyPk;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get statements (with children) of given propertyPk and teEntPk from Repo that are not in project of given projectId.
     *
     * @param {number} teEntPk Key of the temporal entity (fk_subject_info)
     *
     * @param {number} propertyPk Key of the property (fk_property)
     *
     * @param {number} pkProject Id of the the current project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    alternativesNotInProjectByTeEntPk(teEntPk, propertyPk, pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/alternatives-not-in-project-by-te-ent-pk";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof teEntPk !== 'undefined' && teEntPk !== null)
            _urlParams.teEntPk = teEntPk;
        if (typeof propertyPk !== 'undefined' && propertyPk !== null)
            _urlParams.propertyPk = propertyPk;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get an nested object of statement with everything needed to display the links made from an entity towards sources and digitals.
     *
     * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
     *
     * @param {number} pkProject Primary Key of the Project.
     *
     * @param {number} pkEntity Primary Key of the entity for which the sources links are needed.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    sourcesAndDigitalsOfEntity(ofProject, pkProject = {}, pkEntity = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/sources-and-digitals-of-entity";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof ofProject !== 'undefined' && ofProject !== null)
            _urlParams.ofProject = ofProject;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find statements by params.
     *
     * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
     *
     * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
     *
     * @param {number} pkEntity Primary Key of the statement (pk_entity)
     *
     * @param {number} pkInfoRange Foreign Key of the statement pointing to the range entity (fk_object_info)
     *
     * @param {number} pkInfoDomain Foreign Key of the statement pointing to the domain entity (fk_subject_info)
     *
     * @param {number} pkProperty Foreign Key of the statement pointing to the property (fk_property)
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    queryByParams(ofProject, pkProject = {}, pkEntity = {}, pkInfoRange = {}, pkInfoDomain = {}, pkProperty = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/find-by-params";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof ofProject !== 'undefined' && ofProject !== null)
            _urlParams.ofProject = ofProject;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        if (typeof pkInfoRange !== 'undefined' && pkInfoRange !== null)
            _urlParams.pkInfoRange = pkInfoRange;
        if (typeof pkInfoDomain !== 'undefined' && pkInfoDomain !== null)
            _urlParams.pkInfoDomain = pkInfoDomain;
        if (typeof pkProperty !== 'undefined' && pkProperty !== null)
            _urlParams.pkProperty = pkProperty;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    getModelName() {
        return "InfStatement";
    }
};
InfStatementApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfStatementApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], InfStatementApi);
export { InfStatementApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mU3RhdGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jdXN0b20vSW5mU3RhdGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQWNwRTs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsZUFBZTtJQUVsRCxZQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUV0RSxLQUFLLENBQUMsSUFBSSxFQUFHLFVBQVUsRUFBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBTnhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2Qs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LENBQUE7SUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7R0FQeEIsZUFBZSxDQTBPM0I7U0ExT1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZTdGF0ZW1lbnQnO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcbmltcG9ydCB7IFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1Byb0luZm9Qcm9qUmVsJztcbmltcG9ydCB7IEluZlRlbXBvcmFsRW50aXR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRlbXBvcmFsRW50aXR5JztcbmltcG9ydCB7IERhdERpZ2l0YWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0RGlnaXRhbCc7XG5pbXBvcnQgeyBEYXRDaHVuayB9IGZyb20gJy4uLy4uL21vZGVscy9EYXRDaHVuayc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZBcHBlbGxhdGlvbic7XG5pbXBvcnQgeyBJbmZMYW5nU3RyaW5nIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZkxhbmdTdHJpbmcnO1xuaW1wb3J0IHsgSW5mRGltZW5zaW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZkRpbWVuc2lvbic7XG5pbXBvcnQgeyBJbmZMYW5ndWFnZSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZMYW5ndWFnZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZQZXJzaXN0ZW50SXRlbSc7XG5pbXBvcnQgeyBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRpbWVQcmltaXRpdmUnO1xuaW1wb3J0IHsgSW5mUGxhY2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mUGxhY2UnO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYEluZlN0YXRlbWVudGAgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZTdGF0ZW1lbnRBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZmxhdCBvYmplY3Qgb2YgZW50aXR5IHByZXZpZXdzLCB0aGF0IGFyZSB0YXJnZXQgb2YgYSBsaXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFBrIG9mIHRoZSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtTb3VyY2VFbnRpdHkgUGsgb2YgdGhlIHNvdXJjZSBlbnRpdHkgdG8gd2hpY2ggdGhlIGVudGl0eSBwcmV2aWV3cywgdGhhdCBhcmUgdGFyZ2V0IG9mIGEgbGlzdCBhcmUgcmVsYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvcGVydHkgUGsgb2YgdGhlIHByb3BlcnR5IGxlYWRpbmcgZnJvbSBzb3VyY2UgZW50aXR5IHRvIHRoZSBlbnRpdHkgcHJldmlld3MsIHRoYXQgYXJlIHRhcmdldCBvZiBhIGxpc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1RhcmdldENsYXNzIEZrIGNsYXNzIG9mIHRoZSB0YXJnZXQgZW50aXR5IHByZXZpZXdzLCB0aGF0IGFyZSB0YXJnZXQgb2YgYSBsaXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3V0Z29pbmcgSWYgdHJ1ZSwgdGhlIHNvdXJjZSBlbnRpdHkgaXMgZG9tYWluLCBlbHNlIHJhbmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgbnVtYmVyIG9mIHJldHVybmVkIGVudGl0eSBwcmV2aWV3cywgdGhhdCBhcmUgdGFyZ2V0IG9mIGEgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBvZmZzZXQgb2YgdGhlIHNlZ21lbnQgb2YgcmV0dXJuZWQgZW50aXR5IHByZXZpZXdzLCB0aGF0IGFyZSB0YXJnZXQgb2YgYSBsaXN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlN0YXRlbWVudGAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBwYWdpbmF0ZWRMaXN0VGFyZ2V0aW5nRW50aXR5UHJldmlld3MocGtQcm9qZWN0OiBhbnksIHBrU291cmNlRW50aXR5OiBhbnksIHBrUHJvcGVydHk6IGFueSwgcGtUYXJnZXRDbGFzczogYW55LCBpc091dGdvaW5nOiBhbnksIGxpbWl0OiBhbnksIG9mZnNldDogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mU3RhdGVtZW50cy9wYWdpbmF0ZWQtbGlzdC10YXJnZXRpbmctZW50aXR5LXByZXZpZXdzXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtTb3VyY2VFbnRpdHkgIT09ICd1bmRlZmluZWQnICYmIHBrU291cmNlRW50aXR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrU291cmNlRW50aXR5ID0gcGtTb3VyY2VFbnRpdHk7XG4gICAgaWYgKHR5cGVvZiBwa1Byb3BlcnR5ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb3BlcnR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvcGVydHkgPSBwa1Byb3BlcnR5O1xuICAgIGlmICh0eXBlb2YgcGtUYXJnZXRDbGFzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtUYXJnZXRDbGFzcyAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1RhcmdldENsYXNzID0gcGtUYXJnZXRDbGFzcztcbiAgICBpZiAodHlwZW9mIGlzT3V0Z29pbmcgIT09ICd1bmRlZmluZWQnICYmIGlzT3V0Z29pbmcgIT09IG51bGwpIF91cmxQYXJhbXMuaXNPdXRnb2luZyA9IGlzT3V0Z29pbmc7XG4gICAgaWYgKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgIT09IG51bGwpIF91cmxQYXJhbXMubGltaXQgPSBsaW1pdDtcbiAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb2Zmc2V0ICE9PSBudWxsKSBfdXJsUGFyYW1zLm9mZnNldCA9IG9mZnNldDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb3IgY3JlYXRlIGluZm9ybWF0aW9uIHN0YXRlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrX3Byb2plY3QgSWQgb2YgdGhlIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgZGF0YWAg4oCTIGB7SW5mU3RhdGVtZW50fWAgLSBkYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZTdGF0ZW1lbnRgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZE9yQ3JlYXRlSW5mU3RhdGVtZW50cyhwa19wcm9qZWN0OiBhbnksIGRhdGE6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlN0YXRlbWVudHMvZmluZC1vci1jcmVhdGUtbWFueVwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrX3Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrX3Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtfcHJvamVjdCA9IHBrX3Byb2plY3Q7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdC5waXBlKG1hcCgoaW5zdGFuY2VzOiBBcnJheTxJbmZTdGF0ZW1lbnQ+KSA9PlxuICAgICAgICBpbnN0YW5jZXMubWFwKChpbnN0YW5jZTogSW5mU3RhdGVtZW50KSA9PiBuZXcgSW5mU3RhdGVtZW50KGluc3RhbmNlKSlcbiAgICApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc3RhdGVtZW50cyAod2l0aCBjaGlsZHJlbikgb2YgZ2l2ZW4gZmtQcm9wZXJ0eSBhbmQgZmtFbnRpdHkgZnJvbSBSZXBvIHRoYXQgYXJlIG5vdCBpbiBwcm9qZWN0IG9mIGdpdmVuIHByb2plY3RJZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGVudGl0eVBrIEtleSBvZiB0aGUgcGVyc2lzdGVudCBpdGVtIChma19vYmplY3RfaW5mbylcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb3BlcnR5UGsgS2V5IG9mIHRoZSBwcm9wZXJ0eSAoZmtfcHJvcGVydHkpXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgSWQgb2YgdGhlIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlN0YXRlbWVudGAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBhbHRlcm5hdGl2ZXNOb3RJblByb2plY3RCeUVudGl0eVBrKGVudGl0eVBrOiBhbnksIHByb3BlcnR5UGs6IGFueSwgcGtQcm9qZWN0OiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZTdGF0ZW1lbnRzL2FsdGVybmF0aXZlcy1ub3QtaW4tcHJvamVjdC1ieS1lbnRpdHktcGtcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBlbnRpdHlQayAhPT0gJ3VuZGVmaW5lZCcgJiYgZW50aXR5UGsgIT09IG51bGwpIF91cmxQYXJhbXMuZW50aXR5UGsgPSBlbnRpdHlQaztcbiAgICBpZiAodHlwZW9mIHByb3BlcnR5UGsgIT09ICd1bmRlZmluZWQnICYmIHByb3BlcnR5UGsgIT09IG51bGwpIF91cmxQYXJhbXMucHJvcGVydHlQayA9IHByb3BlcnR5UGs7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc3RhdGVtZW50cyAod2l0aCBjaGlsZHJlbikgb2YgZ2l2ZW4gcHJvcGVydHlQayBhbmQgdGVFbnRQayBmcm9tIFJlcG8gdGhhdCBhcmUgbm90IGluIHByb2plY3Qgb2YgZ2l2ZW4gcHJvamVjdElkLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGVFbnRQayBLZXkgb2YgdGhlIHRlbXBvcmFsIGVudGl0eSAoZmtfc3ViamVjdF9pbmZvKVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcHJvcGVydHlQayBLZXkgb2YgdGhlIHByb3BlcnR5IChma19wcm9wZXJ0eSlcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBJZCBvZiB0aGUgdGhlIGN1cnJlbnQgcHJvamVjdFxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mU3RhdGVtZW50YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGFsdGVybmF0aXZlc05vdEluUHJvamVjdEJ5VGVFbnRQayh0ZUVudFBrOiBhbnksIHByb3BlcnR5UGs6IGFueSwgcGtQcm9qZWN0OiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZTdGF0ZW1lbnRzL2FsdGVybmF0aXZlcy1ub3QtaW4tcHJvamVjdC1ieS10ZS1lbnQtcGtcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiB0ZUVudFBrICE9PSAndW5kZWZpbmVkJyAmJiB0ZUVudFBrICE9PSBudWxsKSBfdXJsUGFyYW1zLnRlRW50UGsgPSB0ZUVudFBrO1xuICAgIGlmICh0eXBlb2YgcHJvcGVydHlQayAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvcGVydHlQayAhPT0gbnVsbCkgX3VybFBhcmFtcy5wcm9wZXJ0eVBrID0gcHJvcGVydHlQaztcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBuZXN0ZWQgb2JqZWN0IG9mIHN0YXRlbWVudCB3aXRoIGV2ZXJ5dGhpbmcgbmVlZGVkIHRvIGRpc3BsYXkgdGhlIGxpbmtzIG1hZGUgZnJvbSBhbiBlbnRpdHkgdG93YXJkcyBzb3VyY2VzIGFuZCBkaWdpdGFscy5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBvZlByb2plY3QgaWYgdHJ1ZSwgZmluZHMgcHJvamVjdCB2ZXJzaW9uLiBpZiBmYWxzZSwgZmluZHMgcmVwbyB2ZXJzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFByaW1hcnkgS2V5IG9mIHRoZSBQcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtFbnRpdHkgUHJpbWFyeSBLZXkgb2YgdGhlIGVudGl0eSBmb3Igd2hpY2ggdGhlIHNvdXJjZXMgbGlua3MgYXJlIG5lZWRlZC5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlN0YXRlbWVudGAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBzb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eShvZlByb2plY3Q6IGFueSwgcGtQcm9qZWN0OiBhbnkgPSB7fSwgcGtFbnRpdHk6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mU3RhdGVtZW50cy9zb3VyY2VzLWFuZC1kaWdpdGFscy1vZi1lbnRpdHlcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBvZlByb2plY3QgIT09ICd1bmRlZmluZWQnICYmIG9mUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5vZlByb2plY3QgPSBvZlByb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa0VudGl0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtFbnRpdHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtFbnRpdHkgPSBwa0VudGl0eTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgc3RhdGVtZW50cyBieSBwYXJhbXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb2ZQcm9qZWN0IGlmIHRydWUsIGZpbmRzIHByb2plY3QgdmVyc2lvbi4gaWYgZmFsc2UsIGZpbmRzIHJlcG8gdmVyc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBQcmltYXJ5IEtleSBvZiB0aGUgUHJvamVjdC4gSWYgcHJvdmlkZWQgYW5kIG9mUHJvamVjdD1mYWxzZSwgbWFrZXMgYSBsZWZ0IGpvaW4gd2l0aCBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa0VudGl0eSBQcmltYXJ5IEtleSBvZiB0aGUgc3RhdGVtZW50IChwa19lbnRpdHkpXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa0luZm9SYW5nZSBGb3JlaWduIEtleSBvZiB0aGUgc3RhdGVtZW50IHBvaW50aW5nIHRvIHRoZSByYW5nZSBlbnRpdHkgKGZrX29iamVjdF9pbmZvKVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtJbmZvRG9tYWluIEZvcmVpZ24gS2V5IG9mIHRoZSBzdGF0ZW1lbnQgcG9pbnRpbmcgdG8gdGhlIGRvbWFpbiBlbnRpdHkgKGZrX3N1YmplY3RfaW5mbylcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvcGVydHkgRm9yZWlnbiBLZXkgb2YgdGhlIHN0YXRlbWVudCBwb2ludGluZyB0byB0aGUgcHJvcGVydHkgKGZrX3Byb3BlcnR5KVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mU3RhdGVtZW50YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHF1ZXJ5QnlQYXJhbXMob2ZQcm9qZWN0OiBhbnksIHBrUHJvamVjdDogYW55ID0ge30sIHBrRW50aXR5OiBhbnkgPSB7fSwgcGtJbmZvUmFuZ2U6IGFueSA9IHt9LCBwa0luZm9Eb21haW46IGFueSA9IHt9LCBwa1Byb3BlcnR5OiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlN0YXRlbWVudHMvZmluZC1ieS1wYXJhbXNcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBvZlByb2plY3QgIT09ICd1bmRlZmluZWQnICYmIG9mUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5vZlByb2plY3QgPSBvZlByb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa0VudGl0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtFbnRpdHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtFbnRpdHkgPSBwa0VudGl0eTtcbiAgICBpZiAodHlwZW9mIHBrSW5mb1JhbmdlICE9PSAndW5kZWZpbmVkJyAmJiBwa0luZm9SYW5nZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa0luZm9SYW5nZSA9IHBrSW5mb1JhbmdlO1xuICAgIGlmICh0eXBlb2YgcGtJbmZvRG9tYWluICE9PSAndW5kZWZpbmVkJyAmJiBwa0luZm9Eb21haW4gIT09IG51bGwpIF91cmxQYXJhbXMucGtJbmZvRG9tYWluID0gcGtJbmZvRG9tYWluO1xuICAgIGlmICh0eXBlb2YgcGtQcm9wZXJ0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9wZXJ0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb3BlcnR5ID0gcGtQcm9wZXJ0eTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mU3RhdGVtZW50YC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mU3RhdGVtZW50XCI7XG4gIH1cbn1cbiJdfQ==