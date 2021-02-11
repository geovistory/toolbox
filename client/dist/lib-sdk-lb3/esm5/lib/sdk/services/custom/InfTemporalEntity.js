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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGVtcG9yYWxFbnRpdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NlcnZpY2VzL2N1c3RvbS9JbmZUZW1wb3JhbEVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU1wRTs7R0FFRztBQUVIO0lBQTBDLGdEQUFlO0lBRXZELDhCQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUx4RSxZQU9FLGtCQUFNLElBQUksRUFBRyxVQUFVLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsU0FDdEQ7UUFQK0IsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUNWLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxZQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsVUFBSSxHQUFK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QVksQ0FBQyxDQUFBO09BUHhCLG9CQUFvQixDQStPaEM7SUFBRCwyQkFBQztDQUFBLEFBL09ELENBQTBDLGVBQWUsR0ErT3hEO1NBL09ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluZlRlbXBvcmFsRW50aXR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRlbXBvcmFsRW50aXR5JztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbCB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9JbmZvUHJvalJlbCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mU3RhdGVtZW50JztcbmltcG9ydCB7IEluZlRleHRQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZUZXh0UHJvcGVydHknO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYEluZlRlbXBvcmFsRW50aXR5YCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZlRlbXBvcmFsRW50aXR5QXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb3IgY3JlYXRlIG1hbnkgaW5mb3JtYXRpb24gdGVtcG9yYWwgZW50aXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa19wcm9qZWN0IFBrIG9mIHRoZSBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYGRhdGFgIOKAkyBge0luZlRlbXBvcmFsRW50aXR5fWAgLSBkYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZW1wb3JhbEVudGl0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT3JDcmVhdGVJbmZUZW1wb3JhbEVudGl0aWVzKHBrX3Byb2plY3Q6IGFueSwgZGF0YTogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPEluZlRlbXBvcmFsRW50aXR5W10+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZUZW1wb3JhbEVudGl0aWVzL2ZpbmQtb3ItY3JlYXRlLW1hbnlcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa19wcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa19wcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrX3Byb2plY3QgPSBwa19wcm9qZWN0O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQucGlwZShtYXAoKGluc3RhbmNlczogQXJyYXk8SW5mVGVtcG9yYWxFbnRpdHk+KSA9PlxuICAgICAgICBpbnN0YW5jZXMubWFwKChpbnN0YW5jZTogSW5mVGVtcG9yYWxFbnRpdHkpID0+IG5ldyBJbmZUZW1wb3JhbEVudGl0eShpbnN0YW5jZSkpXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZmxhdCBvYmplY3Qgb2YgdGVtcG9yYWwgZW50aXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgUGsgb2YgdGhlIHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1NvdXJjZUVudGl0eSBQayBvZiB0aGUgc291cmNlIGVudGl0eSB0byB3aGljaCB0aGUgdGVtcG9yYWwgZW50aXRpZXMgYXJlIHJlbGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb3BlcnR5IFBrIG9mIHRoZSBwcm9wZXJ0eSBsZWFkaW5nIGZyb20gc291cmNlIGVudGl0eSB0byB0aGUgdGVtcG9yYWwgZW50aXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1RhcmdldENsYXNzIEZrIGNsYXNzIG9mIHRoZSB0YXJnZXQgdGVtcG9yYWwgZW50aXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNPdXRnb2luZyBJZiB0cnVlLCB0aGUgc291cmNlIGVudGl0eSBpcyBkb21haW4sIGVsc2UgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCBudW1iZXIgb2YgcmV0dXJuZWQgdGVtcG9yYWwgZW50aXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgb2Zmc2V0IG9mIHRoZSBzZWdtZW50IG9mIHJldHVybmVkIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlRlbXBvcmFsRW50aXR5YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGFsdGVybmF0aXZlVGVtcG9yYWxFbnRpdHlMaXN0KHBrUHJvamVjdDogYW55LCBwa1NvdXJjZUVudGl0eTogYW55LCBwa1Byb3BlcnR5OiBhbnksIHBrVGFyZ2V0Q2xhc3M6IGFueSwgaXNPdXRnb2luZzogYW55LCBsaW1pdDogYW55LCBvZmZzZXQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRlbXBvcmFsRW50aXRpZXMvcGFnaW5hdGVkLWxpc3QtYWx0ZXJuYXRpdmVzXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtTb3VyY2VFbnRpdHkgIT09ICd1bmRlZmluZWQnICYmIHBrU291cmNlRW50aXR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrU291cmNlRW50aXR5ID0gcGtTb3VyY2VFbnRpdHk7XG4gICAgaWYgKHR5cGVvZiBwa1Byb3BlcnR5ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb3BlcnR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvcGVydHkgPSBwa1Byb3BlcnR5O1xuICAgIGlmICh0eXBlb2YgcGtUYXJnZXRDbGFzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtUYXJnZXRDbGFzcyAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1RhcmdldENsYXNzID0gcGtUYXJnZXRDbGFzcztcbiAgICBpZiAodHlwZW9mIGlzT3V0Z29pbmcgIT09ICd1bmRlZmluZWQnICYmIGlzT3V0Z29pbmcgIT09IG51bGwpIF91cmxQYXJhbXMuaXNPdXRnb2luZyA9IGlzT3V0Z29pbmc7XG4gICAgaWYgKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgIT09IG51bGwpIF91cmxQYXJhbXMubGltaXQgPSBsaW1pdDtcbiAgICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb2Zmc2V0ICE9PSBudWxsKSBfdXJsUGFyYW1zLm9mZnNldCA9IG9mZnNldDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGZsYXQgb2JqZWN0IG9mIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFBrIG9mIHRoZSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtTb3VyY2VFbnRpdHkgUGsgb2YgdGhlIHNvdXJjZSBlbnRpdHkgdG8gd2hpY2ggdGhlIHRlbXBvcmFsIGVudGl0aWVzIGFyZSByZWxhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9wZXJ0eSBQayBvZiB0aGUgcHJvcGVydHkgbGVhZGluZyBmcm9tIHNvdXJjZSBlbnRpdHkgdG8gdGhlIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtUYXJnZXRDbGFzcyBGayBjbGFzcyBvZiB0aGUgdGFyZ2V0IHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3V0Z29pbmcgSWYgdHJ1ZSwgdGhlIHNvdXJjZSBlbnRpdHkgaXMgZG9tYWluLCBlbHNlIHJhbmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgbnVtYmVyIG9mIHJldHVybmVkIHRlbXBvcmFsIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IG9mZnNldCBvZiB0aGUgc2VnbWVudCBvZiByZXR1cm5lZCB0ZW1wb3JhbCBlbnRpdGllcy5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZW1wb3JhbEVudGl0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB0ZW1wb3JhbEVudGl0eUxpc3QocGtQcm9qZWN0OiBhbnksIHBrU291cmNlRW50aXR5OiBhbnksIHBrUHJvcGVydHk6IGFueSwgcGtUYXJnZXRDbGFzczogYW55LCBpc091dGdvaW5nOiBhbnksIGxpbWl0OiBhbnksIG9mZnNldDogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mVGVtcG9yYWxFbnRpdGllcy9wYWdpbmF0ZWQtbGlzdFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrU291cmNlRW50aXR5ICE9PSAndW5kZWZpbmVkJyAmJiBwa1NvdXJjZUVudGl0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1NvdXJjZUVudGl0eSA9IHBrU291cmNlRW50aXR5O1xuICAgIGlmICh0eXBlb2YgcGtQcm9wZXJ0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9wZXJ0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb3BlcnR5ID0gcGtQcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIHBrVGFyZ2V0Q2xhc3MgIT09ICd1bmRlZmluZWQnICYmIHBrVGFyZ2V0Q2xhc3MgIT09IG51bGwpIF91cmxQYXJhbXMucGtUYXJnZXRDbGFzcyA9IHBrVGFyZ2V0Q2xhc3M7XG4gICAgaWYgKHR5cGVvZiBpc091dGdvaW5nICE9PSAndW5kZWZpbmVkJyAmJiBpc091dGdvaW5nICE9PSBudWxsKSBfdXJsUGFyYW1zLmlzT3V0Z29pbmcgPSBpc091dGdvaW5nO1xuICAgIGlmICh0eXBlb2YgbGltaXQgIT09ICd1bmRlZmluZWQnICYmIGxpbWl0ICE9PSBudWxsKSBfdXJsUGFyYW1zLmxpbWl0ID0gbGltaXQ7XG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCAhPT0gbnVsbCkgX3VybFBhcmFtcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZSBzY2hlbWEgb2JqZWN0IG9mIG93biBwcm9wZXJ0aWVzIG9mIHRoZSB0ZW1wb3JhbCBlbnRpdHkgaW4gcHJvamVjdCB2ZXJzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFBrIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrRW50aXR5IFByaW1hcnkgS2V5IG9mIHRoZSB0ZW1wb3JhbCBlbnRpdHkgKHBrX2VudGl0eSlcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZW1wb3JhbEVudGl0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBvd25Qcm9wZXJ0aWVzKHBrUHJvamVjdDogYW55LCBwa0VudGl0eTogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvSW5mVGVtcG9yYWxFbnRpdGllcy9vd24tcHJvcGVydGllc1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrRW50aXR5ICE9PSAndW5kZWZpbmVkJyAmJiBwa0VudGl0eSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa0VudGl0eSA9IHBrRW50aXR5O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBvciBjcmVhdGUgYSB0ZW1wb3JhbCBlbnRpdHkgdmVyc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBJZCBvZiB0aGUgcHJvamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBkYXRhYCDigJMgYHtJbmZUZW1wb3JhbEVudGl0eX1gIC0gZGF0YVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlRlbXBvcmFsRW50aXR5YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPckNyZWF0ZUluZlRlbXBvcmFsRW50aXR5KHBrUHJvamVjdDogYW55LCBkYXRhOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8SW5mVGVtcG9yYWxFbnRpdHlbXT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRlbXBvcmFsRW50aXRpZXMvZmluZE9yQ3JlYXRlXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH07XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQucGlwZShtYXAoKGluc3RhbmNlczogQXJyYXk8SW5mVGVtcG9yYWxFbnRpdHk+KSA9PlxuICAgICAgICBpbnN0YW5jZXMubWFwKChpbnN0YW5jZTogSW5mVGVtcG9yYWxFbnRpdHkpID0+IG5ldyBJbmZUZW1wb3JhbEVudGl0eShpbnN0YW5jZSkpXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVsYXRlIGEgbmVzdGVkIG9iamVjdCBvZiBhIEluZlRlbXBvcmFsRW50aXR5IHRvIHRoZSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IElkIG9mIHRoZSBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNJblByb2plY3QgSW5jbHVkZSBvciBleGNsdWRlIGZyb20gcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgZGF0YWAg4oCTIGB7SW5mVGVtcG9yYWxFbnRpdHl9YCAtIGRhdGFcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZW1wb3JhbEVudGl0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VUZUVudFByb2plY3RSZWxhdGlvbihwa1Byb2plY3Q6IGFueSwgaXNJblByb2plY3Q6IGFueSwgZGF0YTogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRlbXBvcmFsRW50aXRpZXMvY2hhbmdlLXByb2plY3QtcmVsYXRpb25cIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBpc0luUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNJblByb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMuaXNJblByb2plY3QgPSBpc0luUHJvamVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mVGVtcG9yYWxFbnRpdHlgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZUZW1wb3JhbEVudGl0eVwiO1xuICB9XG59XG4iXX0=