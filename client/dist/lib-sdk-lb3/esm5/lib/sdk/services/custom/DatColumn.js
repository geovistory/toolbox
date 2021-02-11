import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `DatColumn` model.
 */
var DatColumnApi = /** @class */ (function (_super) {
    tslib_1.__extends(DatColumnApi, _super);
    function DatColumnApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Get the columns related to the digital (table).
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkDigital Primary key of the digital
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatColumn` object.)
     * </em>
     */
    DatColumnApi.prototype.ofDigital = function (pkProject, pkDigital, customHeaders) {
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatColumns/of-digital";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkDigital !== 'undefined' && pkDigital !== null)
            _urlParams.pkDigital = pkDigital;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    DatColumnApi.prototype.getModelName = function () {
        return "DatColumn";
    };
    DatColumnApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    DatColumnApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], DatColumnApi);
    return DatColumnApi;
}(BaseLoopBackApi));
export { DatColumnApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jdXN0b20vRGF0Q29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJcEU7O0dBRUc7QUFFSDtJQUFrQyx3Q0FBZTtJQUUvQyxzQkFDZ0MsSUFBZ0IsRUFDVixVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFMeEUsWUFPRSxrQkFBTSxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLFNBQ3REO1FBUCtCLFVBQUksR0FBSixJQUFJLENBQVk7UUFDVixnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDbkMsWUFBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFVBQUksR0FBSixJQUFJLENBQWM7UUFDTixrQkFBWSxHQUFaLFlBQVksQ0FBYzs7SUFHeEUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNJLGdDQUFTLEdBQWhCLFVBQWlCLFNBQWMsRUFBRSxTQUFjLEVBQUUsYUFBd0I7UUFDdkUsSUFBSSxPQUFPLEdBQVcsS0FBSyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFXLGNBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRix3QkFBd0IsQ0FBQztRQUN6QixJQUFJLFlBQVksR0FBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssSUFBSTtZQUFFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdGLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsS0FBSyxJQUFJO1lBQUUsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDN0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQVksR0FBbkI7UUFDRSxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOztnQkE1Q3FDLFVBQVUsdUJBQTdDLE1BQU0sU0FBQyxVQUFVO2dCQUM4QixnQkFBZ0IsdUJBQS9ELE1BQU0sU0FBQyxnQkFBZ0I7Z0JBQ2EsU0FBUyx1QkFBN0MsTUFBTSxTQUFDLFNBQVM7Z0JBQ3FCLFlBQVksdUJBQWpELE1BQU0sU0FBQyxZQUFZO2dCQUNzQyxZQUFZLHVCQUFyRSxRQUFRLFlBQUksTUFBTSxTQUFDLFlBQVk7O0lBUHZCLFlBQVk7UUFEeEIsVUFBVSxFQUFFO1FBSVIsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xCLG1CQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7T0FQeEIsWUFBWSxDQWdEeEI7SUFBRCxtQkFBQztDQUFBLEFBaERELENBQWtDLGVBQWUsR0FnRGhEO1NBaERZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRDb2x1bW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0Q29sdW1uJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBEYXROYW1lc3BhY2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0TmFtZXNwYWNlJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBEYXRDb2x1bW5gIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0Q29sdW1uQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBjb25uZWN0aW9uLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sdW1ucyByZWxhdGVkIHRvIHRoZSBkaWdpdGFsICh0YWJsZSkuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgUHJpbWFyeSBrZXkgb2YgdGhlIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrRGlnaXRhbCBQcmltYXJ5IGtleSBvZiB0aGUgZGlnaXRhbFxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgRGF0Q29sdW1uYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIG9mRGlnaXRhbChwa1Byb2plY3Q6IGFueSwgcGtEaWdpdGFsOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9EYXRDb2x1bW5zL29mLWRpZ2l0YWxcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa0RpZ2l0YWwgIT09ICd1bmRlZmluZWQnICYmIHBrRGlnaXRhbCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa0RpZ2l0YWwgPSBwa0RpZ2l0YWw7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYERhdENvbHVtbmAuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRhdENvbHVtblwiO1xuICB9XG59XG4iXX0=