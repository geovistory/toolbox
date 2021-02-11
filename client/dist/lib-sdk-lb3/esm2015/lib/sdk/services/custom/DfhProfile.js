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
let DfhProfileApi = class DfhProfileApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
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
    ofProject(pkProject = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
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
    updateFromOntoMe(pkProfile, requestedLanguage = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/update-from-ontome";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
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
    updateAndAddToProject(pkProject, pkProfile, requestedLanguage = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/update-from-ontome-and-add-to-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
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
    getActivationReport(pkProject, pkProfile, requestedLanguage = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/get-activation-report";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
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
    getDeactivationReport(pkProject, pkProfile, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/get-deactivation-report";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
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
    deactivateProfileForProject(pkProject, pkProfile, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/deactivate-ontome-profile-for-geovistory-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    getModelName() {
        return "DfhProfile";
    }
};
DfhProfileApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DfhProfileApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], DfhProfileApi);
export { DfhProfileApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvc2VydmljZXMvY3VzdG9tL0RmaFByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRTs7R0FFRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxlQUFlO0lBRWhELFlBQ2dDLElBQWdCLEVBQ1YsVUFBNEIsRUFDbkMsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBRXRFLEtBQUssQ0FBQyxJQUFJLEVBQUcsVUFBVSxFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFOeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNWLGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ04saUJBQVksR0FBWixZQUFZLENBQWM7SUFHeEUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSSxTQUFTLENB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U0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3RixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxZQUFZO1FBQ2pCLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FDRixDQUFBOztZQXJOdUMsVUFBVSx1QkFBN0MsTUFBTSxTQUFDLFVBQVU7WUFDOEIsZ0JBQWdCLHVCQUEvRCxNQUFNLFNBQUMsZ0JBQWdCO1lBQ2EsU0FBUyx1QkFBN0MsTUFBTSxTQUFDLFNBQVM7WUFDcUIsWUFBWSx1QkFBakQsTUFBTSxTQUFDLFlBQVk7WUFDc0MsWUFBWSx1QkFBckUsUUFBUSxZQUFJLE1BQU0sU0FBQyxZQUFZOztBQVB2QixhQUFhO0lBRHpCLFVBQVUsRUFBRTtJQUlSLG1CQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsQixtQkFBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN4QixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDakIsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3BCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0dBUHhCLGFBQWEsQ0F3TnpCO1NBeE5ZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZmhQcm9maWxlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RmaFByb2ZpbGUnO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBEZmhQcm9maWxlYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERmaFByb2ZpbGVBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIGNvbm5lY3Rpb24sICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCBwcm9maWxlcyB0aGF0IGFyZSB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFByb2plY3QgcGtcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYERmaFByb2ZpbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgb2ZQcm9qZWN0KHBrUHJvamVjdDogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9EZmhQcm9maWxlcy9vZi1wcm9qZWN0XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUHVsbHMgcHJvZmlsZSBkYXRhIGluY2x1ZGluZyBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzIGZyb20gT250b01lIGFuZCB1cGRhdGVzIHByb2ZpbGUgZGF0YSBpbiBnZW92aXN0b3J5LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9maWxlIE9udG9NZSBwcm9maWxlIHRoYXQgc2hvdWxkIGJlIGFkZGVkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRMYW5ndWFnZSBMYW5ndWFnZSBJU08gQ29kZSBmb3IgdGhlIHByZWZlcnJlZCBsYW5ndWFnZSBvZiBsYWJlbHMgYW5kIGRlc2NyaXB0aW9ucyB0byBiZSBsb2FkZWQuIERlZmF1bHQgbGFuZ3VhZ2UgaXMgJ2VuJy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhY2NlcHQgYW55IGRhdGEuIFN1cHBseSBhbiBlbXB0eSBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBEZmhQcm9maWxlYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUZyb21PbnRvTWUocGtQcm9maWxlOiBhbnksIHJlcXVlc3RlZExhbmd1YWdlOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9EZmhQcm9maWxlcy91cGRhdGUtZnJvbS1vbnRvbWVcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2ZpbGUgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvZmlsZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2ZpbGUgPSBwa1Byb2ZpbGU7XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0ZWRMYW5ndWFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVxdWVzdGVkTGFuZ3VhZ2UgIT09IG51bGwpIF91cmxQYXJhbXMucmVxdWVzdGVkTGFuZ3VhZ2UgPSByZXF1ZXN0ZWRMYW5ndWFnZTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFB1bGxzIHByb2ZpbGUgZGF0YSBpbmNsdWRpbmcgY2xhc3NlcyBhbmQgcHJvcGVydGllcyBmcm9tIE9udG9NZSBhbmTCoGFkZHMgcHJvZmlsZSB0byBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IEdlb3Zpc3RvcnkgcHJvamVjdCB0byB3aGljaCB0aGUgT250b01lIHByb2ZpbGUgc2hvdWxkIGJlIGFkZGVkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2ZpbGUgT250b01lIHByb2ZpbGUgdGhhdCBzaG91bGQgYmUgYWRkZWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZExhbmd1YWdlIExhbmd1YWdlIElTTyBDb2RlIGZvciB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGxhYmVscyBhbmQgZGVzY3JpcHRpb25zIHRvIGJlIGxvYWRlZC4gRGVmYXVsdCBsYW5ndWFnZSBpcyAnZW4nLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGFjY2VwdCBhbnkgZGF0YS4gU3VwcGx5IGFuIGVtcHR5IG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYERmaFByb2ZpbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQW5kQWRkVG9Qcm9qZWN0KHBrUHJvamVjdDogYW55LCBwa1Byb2ZpbGU6IGFueSwgcmVxdWVzdGVkTGFuZ3VhZ2U6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0RmaFByb2ZpbGVzL3VwZGF0ZS1mcm9tLW9udG9tZS1hbmQtYWRkLXRvLXByb2plY3RcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2ZpbGUgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvZmlsZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2ZpbGUgPSBwa1Byb2ZpbGU7XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0ZWRMYW5ndWFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVxdWVzdGVkTGFuZ3VhZ2UgIT09IG51bGwpIF91cmxQYXJhbXMucmVxdWVzdGVkTGFuZ3VhZ2UgPSByZXF1ZXN0ZWRMYW5ndWFnZTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYWN0aXZhdGlvbiByZXBvcnQgZm9yIHRoZSBnaXZlbiBPbnRvTWUgcHJvZmlsZSBhbmQgdGhlIGdpdmVuIEdlb3Zpc3RvcnkgcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBHZW92aXN0b3J5IHByb2plY3QgZm9yIHdoaWNoIHRoZSBhY3RpdmF0aW9uIHJlcG9ydCBzaG91bGQgYmUgY3JlYXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9maWxlIE9udG9NZSBwcm9maWxlIGZvciB3aGljaCB0aGUgYWN0aXZhdGlvbiByZXBvcnQgc2hvdWxkIGJlIGNyZWF0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZExhbmd1YWdlIExhbmd1YWdlIElTTyBDb2RlIGZvciB0aGUgcHJlZmVycmVkIGxhbmd1YWdlIG9mIGxhYmVscyBhbmQgZGVzY3JpcHRpb25zIHRvIGJlIGxvYWRlZC4gRGVmYXVsdCBsYW5ndWFnZSBpcyAnZW4nLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGFjY2VwdCBhbnkgZGF0YS4gU3VwcGx5IGFuIGVtcHR5IG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYERmaFByb2ZpbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZ2V0QWN0aXZhdGlvblJlcG9ydChwa1Byb2plY3Q6IGFueSwgcGtQcm9maWxlOiBhbnksIHJlcXVlc3RlZExhbmd1YWdlOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9EZmhQcm9maWxlcy9nZXQtYWN0aXZhdGlvbi1yZXBvcnRcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2ZpbGUgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvZmlsZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2ZpbGUgPSBwa1Byb2ZpbGU7XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0ZWRMYW5ndWFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVxdWVzdGVkTGFuZ3VhZ2UgIT09IG51bGwpIF91cmxQYXJhbXMucmVxdWVzdGVkTGFuZ3VhZ2UgPSByZXF1ZXN0ZWRMYW5ndWFnZTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gZGVhY3RpdmF0aW9uIHJlcG9ydCBmb3IgdGhlIGdpdmVuIE9udG9NZSBwcm9maWxlIGFuZCB0aGUgZ2l2ZW4gR2VvdmlzdG9yeSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IEdlb3Zpc3RvcnkgcHJvamVjdCBmb3Igd2hpY2ggdGhlIGRlYWN0aXZhdGlvbiByZXBvcnQgc2hvdWxkIGJlIGNyZWF0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvZmlsZSBPbnRvTWUgcHJvZmlsZSBmb3Igd2hpY2ggdGhlIGRlYWN0aXZhdGlvbiByZXBvcnQgc2hvdWxkIGJlIGNyZWF0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhY2NlcHQgYW55IGRhdGEuIFN1cHBseSBhbiBlbXB0eSBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBEZmhQcm9maWxlYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGdldERlYWN0aXZhdGlvblJlcG9ydChwa1Byb2plY3Q6IGFueSwgcGtQcm9maWxlOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvRGZoUHJvZmlsZXMvZ2V0LWRlYWN0aXZhdGlvbi1yZXBvcnRcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa1Byb2ZpbGUgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvZmlsZSAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2ZpbGUgPSBwa1Byb2ZpbGU7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWF2dGl2YXRlcyBhbiBPbnRvTWUgcHJvZmlsZSBmb3IgYSBHZW92aXN0b3J5IHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgR2VvdmlzdG9yeSBwcm9qZWN0IGZvciB3aGljaCB0aGUgcHJvZmlsZSBzaG91bGQgYmUgZGVhY3RpdmF0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvZmlsZSBPbnRvTWUgcHJvZmlsZSB0byBkZWFjdGl2YXRlIGZvciB0aGUgZ2l2ZW4gR2VvdmlzdG9yeSBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgYWNjZXB0IGFueSBkYXRhLiBTdXBwbHkgYW4gZW1wdHkgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgRGZoUHJvZmlsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBkZWFjdGl2YXRlUHJvZmlsZUZvclByb2plY3QocGtQcm9qZWN0OiBhbnksIHBrUHJvZmlsZTogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0RmaFByb2ZpbGVzL2RlYWN0aXZhdGUtb250b21lLXByb2ZpbGUtZm9yLWdlb3Zpc3RvcnktcHJvamVjdFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHBrUHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9qZWN0ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvamVjdCA9IHBrUHJvamVjdDtcbiAgICBpZiAodHlwZW9mIHBrUHJvZmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtQcm9maWxlICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrUHJvZmlsZSA9IHBrUHJvZmlsZTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRGZoUHJvZmlsZWAuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRmaFByb2ZpbGVcIjtcbiAgfVxufVxuIl19