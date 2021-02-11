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
import { InfTextProperty } from '../../models/InfTextProperty';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfTextProperty` model.
 */
var InfTextPropertyApi = /** @class */ (function (_super) {
    tslib_1.__extends(InfTextPropertyApi, _super);
    function InfTextPropertyApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find or create information text properties.
     *
     * @param {number} pk_project Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTextProperty}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTextProperty` object.)
     * </em>
     */
    InfTextPropertyApi.prototype.findOrCreateInfTextProperties = function (pk_project, data, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTextProperties/find-or-create-many";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map(function (instances) {
            return instances.map(function (instance) { return new InfTextProperty(instance); });
        }));
    };
    /**
     * Find or create a InfTextProperty and update the project relation if needed.
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTextProperty}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTextProperty` object.)
     * </em>
     */
    InfTextPropertyApi.prototype.findOrCreateInfTextProperty = function (pkProject, data, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTextProperties/findOrCreate";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map(function (instances) {
            return instances.map(function (instance) { return new InfTextProperty(instance); });
        }));
    };
    /**
     * Find all InfTextProperties that are not yet added to the given project.
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {number} pkEntity fk of the concerned entity
     *
     * @param {number} pkClassField fk of the class field
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
     * This usually means the response is a `InfTextProperty` object.)
     * </em>
     */
    InfTextPropertyApi.prototype.findAlternativeTextProperties = function (pkProject, pkEntity, pkClassField, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTextProperties/findAlternativeTextProperties";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        if (typeof pkClassField !== 'undefined' && pkClassField !== null)
            _urlParams.pkClassField = pkClassField;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map(function (instances) {
            return instances.map(function (instance) { return new InfTextProperty(instance); });
        }));
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    InfTextPropertyApi.prototype.getModelName = function () {
        return "InfTextProperty";
    };
    InfTextPropertyApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    InfTextPropertyApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], InfTextPropertyApi);
    return InfTextPropertyApi;
}(BaseLoopBackApi));
export { InfTextPropertyApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jdXN0b20vSW5mVGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVFwRTs7R0FFRztBQUVIO0lBQXdDLDhDQUFlO0lBRXJELDRCQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUx4RSxZQU9FLGtCQUFNLElBQUksRUFBRyxVQUFVLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsU0FDdEQ7UUFQK0IsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUNWLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxZQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsVUFBSSxHQUFKLElBQUks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QTtRQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7T0FQeEIsa0JBQWtCLENBNkg5QjtJQUFELHlCQUFDO0NBQUEsQUE3SEQsQ0FBd0MsZUFBZSxHQTZIdEQ7U0E3SFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4vU0RLTW9kZWxzJztcbmltcG9ydCB7IEJhc2VMb29wQmFja0FwaSB9IGZyb20gJy4uL2NvcmUvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4uL2NvcmUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCAgfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9jb3JlL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5mVGV4dFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvSW5mb1Byb2pSZWwnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW0gfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mUGVyc2lzdGVudEl0ZW0nO1xuaW1wb3J0IHsgSW5mVGVtcG9yYWxFbnRpdHkgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mVGVtcG9yYWxFbnRpdHknO1xuaW1wb3J0IHsgSW5mTGFuZ3VhZ2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mTGFuZ3VhZ2UnO1xuaW1wb3J0IHsgU3lzQ2xhc3NGaWVsZCB9IGZyb20gJy4uLy4uL21vZGVscy9TeXNDbGFzc0ZpZWxkJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBJbmZUZXh0UHJvcGVydHlgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5mVGV4dFByb3BlcnR5QXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb3IgY3JlYXRlIGluZm9ybWF0aW9uIHRleHQgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrX3Byb2plY3QgSWQgb2YgdGhlIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgZGF0YWAg4oCTIGB7SW5mVGV4dFByb3BlcnR5fWAgLSBkYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBJbmZUZXh0UHJvcGVydHlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZE9yQ3JlYXRlSW5mVGV4dFByb3BlcnRpZXMocGtfcHJvamVjdDogYW55LCBkYXRhOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8SW5mVGV4dFByb3BlcnR5W10+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9JbmZUZXh0UHJvcGVydGllcy9maW5kLW9yLWNyZWF0ZS1tYW55XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH07XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtfcHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtfcHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa19wcm9qZWN0ID0gcGtfcHJvamVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobWFwKChpbnN0YW5jZXM6IEFycmF5PEluZlRleHRQcm9wZXJ0eT4pID0+XG4gICAgICAgIGluc3RhbmNlcy5tYXAoKGluc3RhbmNlOiBJbmZUZXh0UHJvcGVydHkpID0+IG5ldyBJbmZUZXh0UHJvcGVydHkoaW5zdGFuY2UpKVxuICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb3IgY3JlYXRlIGEgSW5mVGV4dFByb3BlcnR5IGFuZCB1cGRhdGUgdGhlIHByb2plY3QgcmVsYXRpb24gaWYgbmVlZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFBrIG9mIHRoZSBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYGRhdGFgIOKAkyBge0luZlRleHRQcm9wZXJ0eX1gIC0gZGF0YVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYEluZlRleHRQcm9wZXJ0eWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT3JDcmVhdGVJbmZUZXh0UHJvcGVydHkocGtQcm9qZWN0OiBhbnksIGRhdGE6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxJbmZUZXh0UHJvcGVydHlbXT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRleHRQcm9wZXJ0aWVzL2ZpbmRPckNyZWF0ZVwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobWFwKChpbnN0YW5jZXM6IEFycmF5PEluZlRleHRQcm9wZXJ0eT4pID0+XG4gICAgICAgIGluc3RhbmNlcy5tYXAoKGluc3RhbmNlOiBJbmZUZXh0UHJvcGVydHkpID0+IG5ldyBJbmZUZXh0UHJvcGVydHkoaW5zdGFuY2UpKVxuICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIEluZlRleHRQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCB5ZXQgYWRkZWQgdG8gdGhlIGdpdmVuIHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgUGsgb2YgdGhlIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrRW50aXR5IGZrIG9mIHRoZSBjb25jZXJuZWQgZW50aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa0NsYXNzRmllbGQgZmsgb2YgdGhlIGNsYXNzIGZpZWxkXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgYWNjZXB0IGFueSBkYXRhLiBTdXBwbHkgYW4gZW1wdHkgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgSW5mVGV4dFByb3BlcnR5YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzKHBrUHJvamVjdDogYW55LCBwa0VudGl0eTogYW55LCBwa0NsYXNzRmllbGQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxJbmZUZXh0UHJvcGVydHlbXT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0luZlRleHRQcm9wZXJ0aWVzL2ZpbmRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtFbnRpdHkgIT09ICd1bmRlZmluZWQnICYmIHBrRW50aXR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrRW50aXR5ID0gcGtFbnRpdHk7XG4gICAgaWYgKHR5cGVvZiBwa0NsYXNzRmllbGQgIT09ICd1bmRlZmluZWQnICYmIHBrQ2xhc3NGaWVsZCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa0NsYXNzRmllbGQgPSBwa0NsYXNzRmllbGQ7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdC5waXBlKG1hcCgoaW5zdGFuY2VzOiBBcnJheTxJbmZUZXh0UHJvcGVydHk+KSA9PlxuICAgICAgICBpbnN0YW5jZXMubWFwKChpbnN0YW5jZTogSW5mVGV4dFByb3BlcnR5KSA9PiBuZXcgSW5mVGV4dFByb3BlcnR5KGluc3RhbmNlKSlcbiAgICApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlRleHRQcm9wZXJ0eWAuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZlRleHRQcm9wZXJ0eVwiO1xuICB9XG59XG4iXX0=