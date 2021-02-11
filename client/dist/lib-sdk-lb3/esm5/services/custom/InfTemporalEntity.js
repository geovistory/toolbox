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
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfTemporalEntity` model.
 */
var InfTemporalEntityApi = /** @class */ (function (_super) {
    tslib_1.__extends(InfTemporalEntityApi, _super);
    function InfTemporalEntityApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find or create many information temporal entities.
     *
     * @param {number} pk_project Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    InfTemporalEntityApi.prototype.findOrCreateInfTemporalEntities = function (pk_project, data, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/find-or-create-many";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map(function (instances) {
            return instances.map(function (instance) { return new InfTemporalEntity(instance); });
        }));
    };
    /**
     * Get a flat object of temporal entities.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
     *
     * @param {number} pkTargetClass Fk class of the target temporal entities.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned temporal entities.
     *
     * @param {number} offset offset of the segment of returned temporal entities.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    InfTemporalEntityApi.prototype.alternativeTemporalEntityList = function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/paginated-list-alternatives";
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
     * Get a flat object of temporal entities.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
     *
     * @param {number} pkTargetClass Fk class of the target temporal entities.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned temporal entities.
     *
     * @param {number} offset offset of the segment of returned temporal entities.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    InfTemporalEntityApi.prototype.temporalEntityList = function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/paginated-list";
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
     * Get e schema object of own properties of the temporal entity in project version.
     *
     * @param {number} pkProject Pk project
     *
     * @param {number} pkEntity Primary Key of the temporal entity (pk_entity)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    InfTemporalEntityApi.prototype.ownProperties = function (pkProject, pkEntity, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/own-properties";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Find or create a temporal entity version.
     *
     * @param {number} pkProject Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    InfTemporalEntityApi.prototype.findOrCreateInfTemporalEntity = function (pkProject, data, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/findOrCreate";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map(function (instances) {
            return instances.map(function (instance) { return new InfTemporalEntity(instance); });
        }));
    };
    /**
     * Relate a nested object of a InfTemporalEntity to the project.
     *
     * @param {number} pkProject Id of the project
     *
     * @param {boolean} isInProject Include or exclude from project.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    InfTemporalEntityApi.prototype.changeTeEntProjectRelation = function (pkProject, isInProject, data, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/change-project-relation";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof isInProject !== 'undefined' && isInProject !== null)
            _urlParams.isInProject = isInProject;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTemporalEntity`.
     */
    InfTemporalEntityApi.prototype.getModelName = function () {
        return "InfTemporalEntity";
    };
    InfTemporalEntityApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    InfTemporalEntityApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], InfTemporalEntityApi);
    return InfTemporalEntityApi;
}(BaseLoopBackApi));
export { InfTemporalEntityApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGVtcG9yYWxFbnRpdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jdXN0b20vSW5mVGVtcG9yYWxFbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFNcEU7O0dBRUc7QUFFSDtJQUEwQyxnREFBZTtJQUV2RCw4QkFDZ0MsSUFBZ0IsRUFDVixVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFMeEUsWUFPRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLFNBQ3REO1FBUCtCLFVBQUksR0FBSixJQUFJLENBQVk7UUFDVixnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDbkMsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFVBQUksR0FBSixJQUFJLENB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Q0FBQTtPQVB4QixvQkFBb0IsQ0ErT2hDO0lBQUQsMkJBQUM7Q0FBQSxBQS9PRCxDQUEwQyxlQUFlLEdBK094RDtTQS9PWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbmZUZW1wb3JhbEVudGl0eSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZUZW1wb3JhbEVudGl0eSc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvSW5mb1Byb2pSZWwnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlN0YXRlbWVudCc7XG5pbXBvcnQgeyBJbmZUZXh0UHJvcGVydHkgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mVGV4dFByb3BlcnR5JztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBJbmZUZW1wb3JhbEVudGl0eWAgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZUZW1wb3JhbEVudGl0eUFwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KFNvY2tldENvbm5lY3Rpb24pIHByb3RlY3RlZCBjb25uZWN0aW9uOiBTb2NrZXRDb25uZWN0aW9uLFxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIHByb3RlY3RlZCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCAgY29ubmVjdGlvbiwgIG1vZGVscywgYXV0aCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIG9yIGNyZWF0ZSBtYW55IGluZm9ybWF0aW9uIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtfcHJvamVjdCBQayBvZiB0aGUgcHJvamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBkYXRhYCDigJMgYHtJbmZUZW1wb3JhbEVudGl0eX1gIC0gZGF0YVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mVGVtcG9yYWxFbnRpdHlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZE9yQ3JlYXRlSW5mVGVtcG9yYWxFbnRpdGllcyhwa19wcm9qZWN0OiBhbnksIGRhdGE6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxJbmZUZW1wb3JhbEVudGl0eVtdPiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mVGVtcG9yYWxFbnRpdGllcy9maW5kLW9yLWNyZWF0ZS1tYW55XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH07XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtfcHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtfcHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa19wcm9qZWN0ID0gcGtfcHJvamVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobWFwKChpbnN0YW5jZXM6IEFycmF5PEluZlRlbXBvcmFsRW50aXR5PikgPT5cbiAgICAgICAgaW5zdGFuY2VzLm1hcCgoaW5zdGFuY2U6IEluZlRlbXBvcmFsRW50aXR5KSA9PiBuZXcgSW5mVGVtcG9yYWxFbnRpdHkoaW5zdGFuY2UpKVxuICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGZsYXQgb2JqZWN0IG9mIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFBrIG9mIHRoZSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtTb3VyY2VFbnRpdHkgUGsgb2YgdGhlIHNvdXJjZSBlbnRpdHkgdG8gd2hpY2ggdGhlIHRlbXBvcmFsIGVudGl0aWVzIGFyZSByZWxhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9wZXJ0eSBQayBvZiB0aGUgcHJvcGVydHkgbGVhZGluZyBmcm9tIHNvdXJjZSBlbnRpdHkgdG8gdGhlIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtUYXJnZXRDbGFzcyBGayBjbGFzcyBvZiB0aGUgdGFyZ2V0IHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3V0Z29pbmcgSWYgdHJ1ZSwgdGhlIHNvdXJjZSBlbnRpdHkgaXMgZG9tYWluLCBlbHNlIHJhbmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgbnVtYmVyIG9mIHJldHVybmVkIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IG9mZnNldCBvZiB0aGUgc2VnbWVudCBvZiByZXR1cm5lZCB0ZW1wb3JhbCBlbnRpdGllcy5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZW1wb3JhbEVudGl0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBhbHRlcm5hdGl2ZVRlbXBvcmFsRW50aXR5TGlzdChwa1Byb2plY3Q6IGFueSwgcGtTb3VyY2VFbnRpdHk6IGFueSwgcGtQcm9wZXJ0eTogYW55LCBwa1RhcmdldENsYXNzOiBhbnksIGlzT3V0Z29pbmc6IGFueSwgbGltaXQ6IGFueSwgb2Zmc2V0OiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZUZW1wb3JhbEVudGl0aWVzL3BhZ2luYXRlZC1saXN0LWFsdGVybmF0aXZlc1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrU291cmNlRW50aXR5ICE9PSAndW5kZWZpbmVkJyAmJiBwa1NvdXJjZUVudGl0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1NvdXJjZUVudGl0eSA9IHBrU291cmNlRW50aXR5O1xuICAgIGlmICh0eXBlb2YgcGtQcm9wZXJ0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9wZXJ0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb3BlcnR5ID0gcGtQcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIHBrVGFyZ2V0Q2xhc3MgIT09ICd1bmRlZmluZWQnICYmIHBrVGFyZ2V0Q2xhc3MgIT09IG51bGwpIF91cmxQYXJhbXMucGtUYXJnZXRDbGFzcyA9IHBrVGFyZ2V0Q2xhc3M7XG4gICAgaWYgKHR5cGVvZiBpc091dGdvaW5nICE9PSAndW5kZWZpbmVkJyAmJiBpc091dGdvaW5nICE9PSBudWxsKSBfdXJsUGFyYW1zLmlzT3V0Z29pbmcgPSBpc091dGdvaW5nO1xuICAgIGlmICh0eXBlb2YgbGltaXQgIT09ICd1bmRlZmluZWQnICYmIGxpbWl0ICE9PSBudWxsKSBfdXJsUGFyYW1zLmxpbWl0ID0gbGltaXQ7XG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCAhPT0gbnVsbCkgX3VybFBhcmFtcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBmbGF0IG9iamVjdCBvZiB0ZW1wb3JhbCBlbnRpdGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBQayBvZiB0aGUgcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrU291cmNlRW50aXR5IFBrIG9mIHRoZSBzb3VyY2UgZW50aXR5IHRvIHdoaWNoIHRoZSB0ZW1wb3JhbCBlbnRpdGllcyBhcmUgcmVsYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvcGVydHkgUGsgb2YgdGhlIHByb3BlcnR5IGxlYWRpbmcgZnJvbSBzb3VyY2UgZW50aXR5IHRvIHRoZSB0ZW1wb3JhbCBlbnRpdGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrVGFyZ2V0Q2xhc3MgRmsgY2xhc3Mgb2YgdGhlIHRhcmdldCB0ZW1wb3JhbCBlbnRpdGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpc091dGdvaW5nIElmIHRydWUsIHRoZSBzb3VyY2UgZW50aXR5IGlzIGRvbWFpbiwgZWxzZSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IG51bWJlciBvZiByZXR1cm5lZCB0ZW1wb3JhbCBlbnRpdGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBvZmZzZXQgb2YgdGhlIHNlZ21lbnQgb2YgcmV0dXJuZWQgdGVtcG9yYWwgZW50aXRpZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mVGVtcG9yYWxFbnRpdHlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdGVtcG9yYWxFbnRpdHlMaXN0KHBrUHJvamVjdDogYW55LCBwa1NvdXJjZUVudGl0eTogYW55LCBwa1Byb3BlcnR5OiBhbnksIHBrVGFyZ2V0Q2xhc3M6IGFueSwgaXNPdXRnb2luZzogYW55LCBsaW1pdDogYW55LCBvZmZzZXQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRlbXBvcmFsRW50aXRpZXMvcGFnaW5hdGVkLWxpc3RcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa1NvdXJjZUVudGl0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtTb3VyY2VFbnRpdHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtTb3VyY2VFbnRpdHkgPSBwa1NvdXJjZUVudGl0eTtcbiAgICBpZiAodHlwZW9mIHBrUHJvcGVydHkgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvcGVydHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9wZXJ0eSA9IHBrUHJvcGVydHk7XG4gICAgaWYgKHR5cGVvZiBwa1RhcmdldENsYXNzICE9PSAndW5kZWZpbmVkJyAmJiBwa1RhcmdldENsYXNzICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrVGFyZ2V0Q2xhc3MgPSBwa1RhcmdldENsYXNzO1xuICAgIGlmICh0eXBlb2YgaXNPdXRnb2luZyAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNPdXRnb2luZyAhPT0gbnVsbCkgX3VybFBhcmFtcy5pc091dGdvaW5nID0gaXNPdXRnb2luZztcbiAgICBpZiAodHlwZW9mIGxpbWl0ICE9PSAndW5kZWZpbmVkJyAmJiBsaW1pdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5saW1pdCA9IGxpbWl0O1xuICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgIT09IG51bGwpIF91cmxQYXJhbXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGUgc2NoZW1hIG9iamVjdCBvZiBvd24gcHJvcGVydGllcyBvZiB0aGUgdGVtcG9yYWwgZW50aXR5IGluIHByb2plY3QgdmVyc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBQayBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa0VudGl0eSBQcmltYXJ5IEtleSBvZiB0aGUgdGVtcG9yYWwgZW50aXR5IChwa19lbnRpdHkpXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mVGVtcG9yYWxFbnRpdHlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgb3duUHJvcGVydGllcyhwa1Byb2plY3Q6IGFueSwgcGtFbnRpdHk6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRlbXBvcmFsRW50aXRpZXMvb3duLXByb3BlcnRpZXNcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa0VudGl0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtFbnRpdHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtFbnRpdHkgPSBwa0VudGl0eTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb3IgY3JlYXRlIGEgdGVtcG9yYWwgZW50aXR5IHZlcnNpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgSWQgb2YgdGhlIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgZGF0YWAg4oCTIGB7SW5mVGVtcG9yYWxFbnRpdHl9YCAtIGRhdGFcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZW1wb3JhbEVudGl0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT3JDcmVhdGVJbmZUZW1wb3JhbEVudGl0eShwa1Byb2plY3Q6IGFueSwgZGF0YTogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPEluZlRlbXBvcmFsRW50aXR5W10+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZUZW1wb3JhbEVudGl0aWVzL2ZpbmRPckNyZWF0ZVwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobWFwKChpbnN0YW5jZXM6IEFycmF5PEluZlRlbXBvcmFsRW50aXR5PikgPT5cbiAgICAgICAgaW5zdGFuY2VzLm1hcCgoaW5zdGFuY2U6IEluZlRlbXBvcmFsRW50aXR5KSA9PiBuZXcgSW5mVGVtcG9yYWxFbnRpdHkoaW5zdGFuY2UpKVxuICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGF0ZSBhIG5lc3RlZCBvYmplY3Qgb2YgYSBJbmZUZW1wb3JhbEVudGl0eSB0byB0aGUgcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBJZCBvZiB0aGUgcHJvamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzSW5Qcm9qZWN0IEluY2x1ZGUgb3IgZXhjbHVkZSBmcm9tIHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYGRhdGFgIOKAkyBge0luZlRlbXBvcmFsRW50aXR5fWAgLSBkYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mVGVtcG9yYWxFbnRpdHlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY2hhbmdlVGVFbnRQcm9qZWN0UmVsYXRpb24ocGtQcm9qZWN0OiBhbnksIGlzSW5Qcm9qZWN0OiBhbnksIGRhdGE6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZUZW1wb3JhbEVudGl0aWVzL2NoYW5nZS1wcm9qZWN0LXJlbGF0aW9uXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH07XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgaXNJblByb2plY3QgIT09ICd1bmRlZmluZWQnICYmIGlzSW5Qcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLmlzSW5Qcm9qZWN0ID0gaXNJblByb2plY3Q7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlRlbXBvcmFsRW50aXR5YC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mVGVtcG9yYWxFbnRpdHlcIjtcbiAgfVxufVxuIl19