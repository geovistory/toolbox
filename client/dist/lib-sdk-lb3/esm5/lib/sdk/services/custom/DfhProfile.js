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
 * Api services for the `DfhProfile` model.
 */
var DfhProfileApi = /** @class */ (function (_super) {
    tslib_1.__extends(DfhProfileApi, _super);
    function DfhProfileApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Get all profiles that are used by the given project.
     *
     * @param {number} pkProject Project pk
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    DfhProfileApi.prototype.ofProject = function (pkProject, customHeaders) {
        if (pkProject === void 0) { pkProject = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/of-project";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Pulls profile data including classes and properties from OntoMe and updates profile data in geovistory.
     *
     * @param {number} pkProfile OntoMe profile that should be added
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    DfhProfileApi.prototype.updateFromOntoMe = function (pkProfile, requestedLanguage, customHeaders) {
        if (requestedLanguage === void 0) { requestedLanguage = {}; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/update-from-ontome";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Pulls profile data including classes and properties from OntoMe and adds profile to project.
     *
     * @param {number} pkProject Geovistory project to which the OntoMe profile should be added
     *
     * @param {number} pkProfile OntoMe profile that should be added
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    DfhProfileApi.prototype.updateAndAddToProject = function (pkProject, pkProfile, requestedLanguage, customHeaders) {
        if (requestedLanguage === void 0) { requestedLanguage = {}; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/update-from-ontome-and-add-to-project";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates an activation report for the given OntoMe profile and the given Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the activation report should be created
     *
     * @param {number} pkProfile OntoMe profile for which the activation report should be created
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    DfhProfileApi.prototype.getActivationReport = function (pkProject, pkProfile, requestedLanguage, customHeaders) {
        if (requestedLanguage === void 0) { requestedLanguage = {}; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/get-activation-report";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates an deactivation report for the given OntoMe profile and the given Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the deactivation report should be created
     *
     * @param {number} pkProfile OntoMe profile for which the deactivation report should be created
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    DfhProfileApi.prototype.getDeactivationReport = function (pkProject, pkProfile, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/get-deactivation-report";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deavtivates an OntoMe profile for a Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the profile should be deactivated
     *
     * @param {number} pkProfile OntoMe profile to deactivate for the given Geovistory project
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    DfhProfileApi.prototype.deactivateProfileForProject = function (pkProject, pkProfile, customHeaders) {
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/deactivate-ontome-profile-for-geovistory-project";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    DfhProfileApi.prototype.getModelName = function () {
        return "DfhProfile";
    };
    DfhProfileApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    DfhProfileApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], DfhProfileApi);
    return DfhProfileApi;
}(BaseLoopBackApi));
export { DfhProfileApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvc2VydmljZXMvY3VzdG9tL0RmaFByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRTs7R0FFRztBQUVIO0lBQW1DLHlDQUFlO0lBRWhELHVCQUNnQyxJQUFnQixFQUNWLFVBQTRCLEVBQ25DLE1BQWlCLEVBQ2QsSUFBa0IsRUFDTixZQUEwQjtRQUx4RSxZQU9FLGtCQUFNLElBQUksRUFBRyxVQUFVLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsU0FDdEQ7UUFQK0IsVUFBSSxHQUFKLElBQUksQ0FBWTtRQUNWLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUNuQyxZQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsVUFBSSxHQUFKLElBQUksQ0FBYztRQUNOLGtCQUFZLEdBQVosWUFBWSxDQUFjOztJQUd4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNJLGlDQUFTLEdBQWhCLFVBQWlCLFNBQW1CLEVB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QUUsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDN0YsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxLQUFLLElBQUk7WUFBRSxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3RixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxvQ0FBWSxHQUFuQjtRQUNFLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7O2dCQXBOcUMsVUFBVSx1QkFBN0MsTUFBTSxTQUFDLFVBQVU7Z0JBQzhCLGdCQUFnQix1QkFBL0QsTUFBTSxTQUFDLGdCQUFnQjtnQkFDYSxTQUFTLHVCQUE3QyxNQUFNLFNBQUMsU0FBUztnQkFDcUIsWUFBWSx1QkFBakQsTUFBTSxTQUFDLFlBQVk7Z0JBQ3NDLFlBQVksdUJBQXJFLFFBQVEsWUFBSSxNQUFNLFNBQUMsWUFBWTs7SUFQdkIsYUFBYTtRQUR6QixVQUFVLEVBQUU7UUFJUixtQkFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbEIsbUJBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDeEIsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2pCLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQixtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtPQVB4QixhQUFhLENBd056QjtJQUFELG9CQUFDO0NBQUEsQUF4TkQsQ0FBbUMsZUFBZSxHQXdOakQ7U0F4TlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERmaFByb2ZpbGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGZoUHJvZmlsZSc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYERmaFByb2ZpbGVgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGZoUHJvZmlsZUFwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KFNvY2tldENvbm5lY3Rpb24pIHByb3RlY3RlZCBjb25uZWN0aW9uOiBTb2NrZXRDb25uZWN0aW9uLFxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIHByb3RlY3RlZCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCAgY29ubmVjdGlvbiwgIG1vZGVscywgYXV0aCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHByb2ZpbGVzIHRoYXQgYXJlIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgUHJvamVjdCBwa1xuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgRGZoUHJvZmlsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBvZlByb2plY3QocGtQcm9qZWN0OiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0RmaFByb2ZpbGVzL29mLXByb2plY3RcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWxscyBwcm9maWxlIGRhdGEgaW5jbHVkaW5nIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMgZnJvbSBPbnRvTWUgYW5kIHVwZGF0ZXMgcHJvZmlsZSBkYXRhIGluIGdlb3Zpc3RvcnkuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2ZpbGUgT250b01lIHByb2ZpbGUgdGhhdCBzaG91bGQgYmUgYWRkZWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZExhbmd1YWdlIExhbmd1YWdlIElTTyBDb2RlIGZvciB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGxhYmVscyBhbmQgZGVzY3JpcHRpb25zIHRvIGJlIGxvYWRlZC4gRGVmYXVsdCBsYW5ndWFnZSBpcyAnZW4nLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGFjY2VwdCBhbnkgZGF0YS4gU3VwcGx5IGFuIGVtcHR5IG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYERmaFByb2ZpbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRnJvbU9udG9NZShwa1Byb2ZpbGU6IGFueSwgcmVxdWVzdGVkTGFuZ3VhZ2U6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0RmaFByb2ZpbGVzL3VwZGF0ZS1mcm9tLW9udG9tZVwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvZmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9maWxlICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvZmlsZSA9IHBrUHJvZmlsZTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RlZExhbmd1YWdlICE9PSAndW5kZWZpbmVkJyAmJiByZXF1ZXN0ZWRMYW5ndWFnZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5yZXF1ZXN0ZWRMYW5ndWFnZSA9IHJlcXVlc3RlZExhbmd1YWdlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUHVsbHMgcHJvZmlsZSBkYXRhIGluY2x1ZGluZyBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzIGZyb20gT250b01lIGFuZMKgYWRkcyBwcm9maWxlIHRvIHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgR2VvdmlzdG9yeSBwcm9qZWN0IHRvIHdoaWNoIHRoZSBPbnRvTWUgcHJvZmlsZSBzaG91bGQgYmUgYWRkZWRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvZmlsZSBPbnRvTWUgcHJvZmlsZSB0aGF0IHNob3VsZCBiZSBhZGRlZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkTGFuZ3VhZ2UgTGFuZ3VhZ2UgSVNPIENvZGUgZm9yIHRoZSBwcmVmZXJyZWQgbGFuZ3VhZ2Ugb2YgbGFiZWxzIGFuZCBkZXNjcmlwdGlvbnMgdG8gYmUgbG9hZGVkLiBEZWZhdWx0IGxhbmd1YWdlIGlzICdlbicuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgYWNjZXB0IGFueSBkYXRhLiBTdXBwbHkgYW4gZW1wdHkgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgRGZoUHJvZmlsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbmRBZGRUb1Byb2plY3QocGtQcm9qZWN0OiBhbnksIHBrUHJvZmlsZTogYW55LCByZXF1ZXN0ZWRMYW5ndWFnZTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvRGZoUHJvZmlsZXMvdXBkYXRlLWZyb20tb250b21lLWFuZC1hZGQtdG8tcHJvamVjdFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrUHJvZmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9maWxlICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvZmlsZSA9IHBrUHJvZmlsZTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RlZExhbmd1YWdlICE9PSAndW5kZWZpbmVkJyAmJiByZXF1ZXN0ZWRMYW5ndWFnZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5yZXF1ZXN0ZWRMYW5ndWFnZSA9IHJlcXVlc3RlZExhbmd1YWdlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhY3RpdmF0aW9uIHJlcG9ydCBmb3IgdGhlIGdpdmVuIE9udG9NZSBwcm9maWxlIGFuZCB0aGUgZ2l2ZW4gR2VvdmlzdG9yeSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IEdlb3Zpc3RvcnkgcHJvamVjdCBmb3Igd2hpY2ggdGhlIGFjdGl2YXRpb24gcmVwb3J0IHNob3VsZCBiZSBjcmVhdGVkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2ZpbGUgT250b01lIHByb2ZpbGUgZm9yIHdoaWNoIHRoZSBhY3RpdmF0aW9uIHJlcG9ydCBzaG91bGQgYmUgY3JlYXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkTGFuZ3VhZ2UgTGFuZ3VhZ2UgSVNPIENvZGUgZm9yIHRoZSBwcmVmZXJyZWQgbGFuZ3VhZ2Ugb2YgbGFiZWxzIGFuZCBkZXNjcmlwdGlvbnMgdG8gYmUgbG9hZGVkLiBEZWZhdWx0IGxhbmd1YWdlIGlzICdlbicuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgYWNjZXB0IGFueSBkYXRhLiBTdXBwbHkgYW4gZW1wdHkgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgRGZoUHJvZmlsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBnZXRBY3RpdmF0aW9uUmVwb3J0KHBrUHJvamVjdDogYW55LCBwa1Byb2ZpbGU6IGFueSwgcmVxdWVzdGVkTGFuZ3VhZ2U6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0RmaFByb2ZpbGVzL2dldC1hY3RpdmF0aW9uLXJlcG9ydFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrUHJvZmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9maWxlICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvZmlsZSA9IHBrUHJvZmlsZTtcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RlZExhbmd1YWdlICE9PSAndW5kZWZpbmVkJyAmJiByZXF1ZXN0ZWRMYW5ndWFnZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5yZXF1ZXN0ZWRMYW5ndWFnZSA9IHJlcXVlc3RlZExhbmd1YWdlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBkZWFjdGl2YXRpb24gcmVwb3J0IGZvciB0aGUgZ2l2ZW4gT250b01lIHByb2ZpbGUgYW5kIHRoZSBnaXZlbiBHZW92aXN0b3J5IHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgR2VvdmlzdG9yeSBwcm9qZWN0IGZvciB3aGljaCB0aGUgZGVhY3RpdmF0aW9uIHJlcG9ydCBzaG91bGQgYmUgY3JlYXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9maWxlIE9udG9NZSBwcm9maWxlIGZvciB3aGljaCB0aGUgZGVhY3RpdmF0aW9uIHJlcG9ydCBzaG91bGQgYmUgY3JlYXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGFjY2VwdCBhbnkgZGF0YS4gU3VwcGx5IGFuIGVtcHR5IG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYERmaFByb2ZpbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZ2V0RGVhY3RpdmF0aW9uUmVwb3J0KHBrUHJvamVjdDogYW55LCBwa1Byb2ZpbGU6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9EZmhQcm9maWxlcy9nZXQtZGVhY3RpdmF0aW9uLXJlcG9ydFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrUHJvZmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9maWxlICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvZmlsZSA9IHBrUHJvZmlsZTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlYXZ0aXZhdGVzIGFuIE9udG9NZSBwcm9maWxlIGZvciBhIEdlb3Zpc3RvcnkgcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBHZW92aXN0b3J5IHByb2plY3QgZm9yIHdoaWNoIHRoZSBwcm9maWxlIHNob3VsZCBiZSBkZWFjdGl2YXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9maWxlIE9udG9NZSBwcm9maWxlIHRvIGRlYWN0aXZhdGUgZm9yIHRoZSBnaXZlbiBHZW92aXN0b3J5IHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhY2NlcHQgYW55IGRhdGEuIFN1cHBseSBhbiBlbXB0eSBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBEZmhQcm9maWxlYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlYWN0aXZhdGVQcm9maWxlRm9yUHJvamVjdChwa1Byb2plY3Q6IGFueSwgcGtQcm9maWxlOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvRGZoUHJvZmlsZXMvZGVhY3RpdmF0ZS1vbnRvbWUtcHJvZmlsZS1mb3ItZ2VvdmlzdG9yeS1wcm9qZWN0XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtQcm9maWxlICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2ZpbGUgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9maWxlID0gcGtQcm9maWxlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEZmhQcm9maWxlYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGZoUHJvZmlsZVwiO1xuICB9XG59XG4iXX0=