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
var InfStatementApi = /** @class */ (function (_super) {
    tslib_1.__extends(InfStatementApi, _super);
    function InfStatementApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
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
    InfStatementApi.prototype.paginatedListTargetingEntityPreviews = function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/paginated-list-targeting-entity-previews";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
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
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
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
    InfStatementApi.prototype.findOrCreateInfStatements = function (pk_project, data, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/find-or-create-many";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map(function (instances) {
            return instances.map(function (instance) { return new InfStatement(instance); });
        }));
    };
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
    InfStatementApi.prototype.alternativesNotInProjectByEntityPk = function (entityPk, propertyPk, pkProject, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/alternatives-not-in-project-by-entity-pk";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof entityPk !== 'undefined' && entityPk !== null)
            _urlParams.entityPk = entityPk;
        if (typeof propertyPk !== 'undefined' && propertyPk !== null)
            _urlParams.propertyPk = propertyPk;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
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
    InfStatementApi.prototype.alternativesNotInProjectByTeEntPk = function (teEntPk, propertyPk, pkProject, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/alternatives-not-in-project-by-te-ent-pk";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof teEntPk !== 'undefined' && teEntPk !== null)
            _urlParams.teEntPk = teEntPk;
        if (typeof propertyPk !== 'undefined' && propertyPk !== null)
            _urlParams.propertyPk = propertyPk;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
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
    InfStatementApi.prototype.sourcesAndDigitalsOfEntity = function (ofProject, pkProject, pkEntity, customHeaders) {
        if (pkProject === void 0) { pkProject = {}; }
        if (pkEntity === void 0) { pkEntity = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/sources-and-digitals-of-entity";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof ofProject !== 'undefined' && ofProject !== null)
            _urlParams.ofProject = ofProject;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
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
    InfStatementApi.prototype.queryByParams = function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty, customHeaders) {
        if (pkProject === void 0) { pkProject = {}; }
        if (pkEntity === void 0) { pkEntity = {}; }
        if (pkInfoRange === void 0) { pkInfoRange = {}; }
        if (pkInfoDomain === void 0) { pkInfoDomain = {}; }
        if (pkProperty === void 0) { pkProperty = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/find-by-params";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
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
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    InfStatementApi.prototype.getModelName = function () {
        return "InfStatement";
    };
    InfStatementApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    InfStatementApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], InfStatementApi);
    return InfStatementApi;
}(BaseLoopBackApi));
export { InfStatementApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mU3RhdGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic2VydmljZXMvY3VzdG9tL0luZlN0YXRlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFjcEU7O0dBRUc7QUFFSDtJQUFxQywyQ0FBZTtJQUVsRCx5QkFDZ0MsSUFBZ0IsRUFDVixVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFMeEUsWUFPRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLFNBQ3REO1FBUCtCLFVBQUksR0FBSixJQUFJLENBQVk7UUFDVixnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDbkMsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFVBQUksR0FBSixJQUFJLENBQWM7UUFDTixrQkFB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VUFBVSxFQUFFO1FBSVIsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xCLG1CQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7T0FQeEIsZUFBZSxDQTBPM0I7SUFBRCxzQkFBQztDQUFBLEFBMU9ELENBQXFDLGVBQWUsR0EwT25EO1NBMU9ZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mU3RhdGVtZW50JztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbCB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9JbmZvUHJvalJlbCc7XG5pbXBvcnQgeyBJbmZUZW1wb3JhbEVudGl0eSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZUZW1wb3JhbEVudGl0eSc7XG5pbXBvcnQgeyBEYXREaWdpdGFsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RhdERpZ2l0YWwnO1xuaW1wb3J0IHsgRGF0Q2h1bmsgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0Q2h1bmsnO1xuaW1wb3J0IHsgSW5mQXBwZWxsYXRpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mQXBwZWxsYXRpb24nO1xuaW1wb3J0IHsgSW5mTGFuZ1N0cmluZyB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZMYW5nU3RyaW5nJztcbmltcG9ydCB7IEluZkRpbWVuc2lvbiB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZEaW1lbnNpb24nO1xuaW1wb3J0IHsgSW5mTGFuZ3VhZ2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mTGFuZ3VhZ2UnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW0gfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mUGVyc2lzdGVudEl0ZW0nO1xuaW1wb3J0IHsgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZUaW1lUHJpbWl0aXZlJztcbmltcG9ydCB7IEluZlBsYWNlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlBsYWNlJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBJbmZTdGF0ZW1lbnRgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5mU3RhdGVtZW50QXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGZsYXQgb2JqZWN0IG9mIGVudGl0eSBwcmV2aWV3cywgdGhhdCBhcmUgdGFyZ2V0IG9mIGEgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBQayBvZiB0aGUgcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrU291cmNlRW50aXR5IFBrIG9mIHRoZSBzb3VyY2UgZW50aXR5IHRvIHdoaWNoIHRoZSBlbnRpdHkgcHJldmlld3MsIHRoYXQgYXJlIHRhcmdldCBvZiBhIGxpc3QgYXJlIHJlbGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb3BlcnR5IFBrIG9mIHRoZSBwcm9wZXJ0eSBsZWFkaW5nIGZyb20gc291cmNlIGVudGl0eSB0byB0aGUgZW50aXR5IHByZXZpZXdzLCB0aGF0IGFyZSB0YXJnZXQgb2YgYSBsaXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtUYXJnZXRDbGFzcyBGayBjbGFzcyBvZiB0aGUgdGFyZ2V0IGVudGl0eSBwcmV2aWV3cywgdGhhdCBhcmUgdGFyZ2V0IG9mIGEgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpc091dGdvaW5nIElmIHRydWUsIHRoZSBzb3VyY2UgZW50aXR5IGlzIGRvbWFpbiwgZWxzZSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IG51bWJlciBvZiByZXR1cm5lZCBlbnRpdHkgcHJldmlld3MsIHRoYXQgYXJlIHRhcmdldCBvZiBhIGxpc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgb2Zmc2V0IG9mIHRoZSBzZWdtZW50IG9mIHJldHVybmVkIGVudGl0eSBwcmV2aWV3cywgdGhhdCBhcmUgdGFyZ2V0IG9mIGEgbGlzdC5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZTdGF0ZW1lbnRgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgcGFnaW5hdGVkTGlzdFRhcmdldGluZ0VudGl0eVByZXZpZXdzKHBrUHJvamVjdDogYW55LCBwa1NvdXJjZUVudGl0eTogYW55LCBwa1Byb3BlcnR5OiBhbnksIHBrVGFyZ2V0Q2xhc3M6IGFueSwgaXNPdXRnb2luZzogYW55LCBsaW1pdDogYW55LCBvZmZzZXQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlN0YXRlbWVudHMvcGFnaW5hdGVkLWxpc3QtdGFyZ2V0aW5nLWVudGl0eS1wcmV2aWV3c1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrU291cmNlRW50aXR5ICE9PSAndW5kZWZpbmVkJyAmJiBwa1NvdXJjZUVudGl0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1NvdXJjZUVudGl0eSA9IHBrU291cmNlRW50aXR5O1xuICAgIGlmICh0eXBlb2YgcGtQcm9wZXJ0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9wZXJ0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb3BlcnR5ID0gcGtQcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIHBrVGFyZ2V0Q2xhc3MgIT09ICd1bmRlZmluZWQnICYmIHBrVGFyZ2V0Q2xhc3MgIT09IG51bGwpIF91cmxQYXJhbXMucGtUYXJnZXRDbGFzcyA9IHBrVGFyZ2V0Q2xhc3M7XG4gICAgaWYgKHR5cGVvZiBpc091dGdvaW5nICE9PSAndW5kZWZpbmVkJyAmJiBpc091dGdvaW5nICE9PSBudWxsKSBfdXJsUGFyYW1zLmlzT3V0Z29pbmcgPSBpc091dGdvaW5nO1xuICAgIGlmICh0eXBlb2YgbGltaXQgIT09ICd1bmRlZmluZWQnICYmIGxpbWl0ICE9PSBudWxsKSBfdXJsUGFyYW1zLmxpbWl0ID0gbGltaXQ7XG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCAhPT0gbnVsbCkgX3VybFBhcmFtcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIG9yIGNyZWF0ZSBpbmZvcm1hdGlvbiBzdGF0ZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa19wcm9qZWN0IElkIG9mIHRoZSBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYGRhdGFgIOKAkyBge0luZlN0YXRlbWVudH1gIC0gZGF0YVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mU3RhdGVtZW50YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPckNyZWF0ZUluZlN0YXRlbWVudHMocGtfcHJvamVjdDogYW55LCBkYXRhOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZTdGF0ZW1lbnRzL2ZpbmQtb3ItY3JlYXRlLW1hbnlcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa19wcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa19wcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrX3Byb2plY3QgPSBwa19wcm9qZWN0O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQucGlwZShtYXAoKGluc3RhbmNlczogQXJyYXk8SW5mU3RhdGVtZW50PikgPT5cbiAgICAgICAgaW5zdGFuY2VzLm1hcCgoaW5zdGFuY2U6IEluZlN0YXRlbWVudCkgPT4gbmV3IEluZlN0YXRlbWVudChpbnN0YW5jZSkpXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHN0YXRlbWVudHMgKHdpdGggY2hpbGRyZW4pIG9mIGdpdmVuIGZrUHJvcGVydHkgYW5kIGZrRW50aXR5IGZyb20gUmVwbyB0aGF0IGFyZSBub3QgaW4gcHJvamVjdCBvZiBnaXZlbiBwcm9qZWN0SWQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlbnRpdHlQayBLZXkgb2YgdGhlIHBlcnNpc3RlbnQgaXRlbSAoZmtfb2JqZWN0X2luZm8pXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9wZXJ0eVBrIEtleSBvZiB0aGUgcHJvcGVydHkgKGZrX3Byb3BlcnR5KVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IElkIG9mIHRoZSB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZTdGF0ZW1lbnRgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgYWx0ZXJuYXRpdmVzTm90SW5Qcm9qZWN0QnlFbnRpdHlQayhlbnRpdHlQazogYW55LCBwcm9wZXJ0eVBrOiBhbnksIHBrUHJvamVjdDogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mU3RhdGVtZW50cy9hbHRlcm5hdGl2ZXMtbm90LWluLXByb2plY3QtYnktZW50aXR5LXBrXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgZW50aXR5UGsgIT09ICd1bmRlZmluZWQnICYmIGVudGl0eVBrICE9PSBudWxsKSBfdXJsUGFyYW1zLmVudGl0eVBrID0gZW50aXR5UGs7XG4gICAgaWYgKHR5cGVvZiBwcm9wZXJ0eVBrICE9PSAndW5kZWZpbmVkJyAmJiBwcm9wZXJ0eVBrICE9PSBudWxsKSBfdXJsUGFyYW1zLnByb3BlcnR5UGsgPSBwcm9wZXJ0eVBrO1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHN0YXRlbWVudHMgKHdpdGggY2hpbGRyZW4pIG9mIGdpdmVuIHByb3BlcnR5UGsgYW5kIHRlRW50UGsgZnJvbSBSZXBvIHRoYXQgYXJlIG5vdCBpbiBwcm9qZWN0IG9mIGdpdmVuIHByb2plY3RJZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRlRW50UGsgS2V5IG9mIHRoZSB0ZW1wb3JhbCBlbnRpdHkgKGZrX3N1YmplY3RfaW5mbylcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb3BlcnR5UGsgS2V5IG9mIHRoZSBwcm9wZXJ0eSAoZmtfcHJvcGVydHkpXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgSWQgb2YgdGhlIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlN0YXRlbWVudGAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBhbHRlcm5hdGl2ZXNOb3RJblByb2plY3RCeVRlRW50UGsodGVFbnRQazogYW55LCBwcm9wZXJ0eVBrOiBhbnksIHBrUHJvamVjdDogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mU3RhdGVtZW50cy9hbHRlcm5hdGl2ZXMtbm90LWluLXByb2plY3QtYnktdGUtZW50LXBrXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgdGVFbnRQayAhPT0gJ3VuZGVmaW5lZCcgJiYgdGVFbnRQayAhPT0gbnVsbCkgX3VybFBhcmFtcy50ZUVudFBrID0gdGVFbnRQaztcbiAgICBpZiAodHlwZW9mIHByb3BlcnR5UGsgIT09ICd1bmRlZmluZWQnICYmIHByb3BlcnR5UGsgIT09IG51bGwpIF91cmxQYXJhbXMucHJvcGVydHlQayA9IHByb3BlcnR5UGs7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gbmVzdGVkIG9iamVjdCBvZiBzdGF0ZW1lbnQgd2l0aCBldmVyeXRoaW5nIG5lZWRlZCB0byBkaXNwbGF5IHRoZSBsaW5rcyBtYWRlIGZyb20gYW4gZW50aXR5IHRvd2FyZHMgc291cmNlcyBhbmQgZGlnaXRhbHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb2ZQcm9qZWN0IGlmIHRydWUsIGZpbmRzIHByb2plY3QgdmVyc2lvbi4gaWYgZmFsc2UsIGZpbmRzIHJlcG8gdmVyc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBQcmltYXJ5IEtleSBvZiB0aGUgUHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrRW50aXR5IFByaW1hcnkgS2V5IG9mIHRoZSBlbnRpdHkgZm9yIHdoaWNoIHRoZSBzb3VyY2VzIGxpbmtzIGFyZSBuZWVkZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZTdGF0ZW1lbnRgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgc291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHkob2ZQcm9qZWN0OiBhbnksIHBrUHJvamVjdDogYW55ID0ge30sIHBrRW50aXR5OiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlN0YXRlbWVudHMvc291cmNlcy1hbmQtZGlnaXRhbHMtb2YtZW50aXR5XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2Ygb2ZQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBvZlByb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMub2ZQcm9qZWN0ID0gb2ZQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtFbnRpdHkgIT09ICd1bmRlZmluZWQnICYmIHBrRW50aXR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrRW50aXR5ID0gcGtFbnRpdHk7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHN0YXRlbWVudHMgYnkgcGFyYW1zLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9mUHJvamVjdCBpZiB0cnVlLCBmaW5kcyBwcm9qZWN0IHZlcnNpb24uIGlmIGZhbHNlLCBmaW5kcyByZXBvIHZlcnNpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgUHJpbWFyeSBLZXkgb2YgdGhlIFByb2plY3QuIElmIHByb3ZpZGVkIGFuZCBvZlByb2plY3Q9ZmFsc2UsIG1ha2VzIGEgbGVmdCBqb2luIHdpdGggcHJvamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtFbnRpdHkgUHJpbWFyeSBLZXkgb2YgdGhlIHN0YXRlbWVudCAocGtfZW50aXR5KVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtJbmZvUmFuZ2UgRm9yZWlnbiBLZXkgb2YgdGhlIHN0YXRlbWVudCBwb2ludGluZyB0byB0aGUgcmFuZ2UgZW50aXR5IChma19vYmplY3RfaW5mbylcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrSW5mb0RvbWFpbiBGb3JlaWduIEtleSBvZiB0aGUgc3RhdGVtZW50IHBvaW50aW5nIHRvIHRoZSBkb21haW4gZW50aXR5IChma19zdWJqZWN0X2luZm8pXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb3BlcnR5IEZvcmVpZ24gS2V5IG9mIHRoZSBzdGF0ZW1lbnQgcG9pbnRpbmcgdG8gdGhlIHByb3BlcnR5IChma19wcm9wZXJ0eSlcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlN0YXRlbWVudGAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBxdWVyeUJ5UGFyYW1zKG9mUHJvamVjdDogYW55LCBwa1Byb2plY3Q6IGFueSA9IHt9LCBwa0VudGl0eTogYW55ID0ge30sIHBrSW5mb1JhbmdlOiBhbnkgPSB7fSwgcGtJbmZvRG9tYWluOiBhbnkgPSB7fSwgcGtQcm9wZXJ0eTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZTdGF0ZW1lbnRzL2ZpbmQtYnktcGFyYW1zXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2Ygb2ZQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBvZlByb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMub2ZQcm9qZWN0ID0gb2ZQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtFbnRpdHkgIT09ICd1bmRlZmluZWQnICYmIHBrRW50aXR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrRW50aXR5ID0gcGtFbnRpdHk7XG4gICAgaWYgKHR5cGVvZiBwa0luZm9SYW5nZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtJbmZvUmFuZ2UgIT09IG51bGwpIF91cmxQYXJhbXMucGtJbmZvUmFuZ2UgPSBwa0luZm9SYW5nZTtcbiAgICBpZiAodHlwZW9mIHBrSW5mb0RvbWFpbiAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtJbmZvRG9tYWluICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrSW5mb0RvbWFpbiA9IHBrSW5mb0RvbWFpbjtcbiAgICBpZiAodHlwZW9mIHBrUHJvcGVydHkgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvcGVydHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9wZXJ0eSA9IHBrUHJvcGVydHk7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlN0YXRlbWVudGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZlN0YXRlbWVudFwiO1xuICB9XG59XG4iXX0=