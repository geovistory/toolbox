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
 * Api services for the `SchemaObject` model.
 */
let SchemaObjectApi = class SchemaObjectApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Remove entity with outgoing statements and namings from project.
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkEntity Primary key of the entity
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SchemaObject` object.)
     * </em>
     */
    removeEntityFromProject(pkProject, pkEntity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SchemaObjects/remove-entity-from-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Add entity with outgoing statements and namings to project.
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkEntity Primary key of the entity
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SchemaObject` object.)
     * </em>
     */
    addEntityToProject(pkProject, pkEntity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SchemaObjects/add-entity-to-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get a object containing apllations and definition of a type (project variant).
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkType Pk of the type.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SchemaObject` object.)
     * </em>
     */
    typeOfProject(pkProject, pkType, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SchemaObjects/type-of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkType !== 'undefined' && pkType !== null)
            _urlParams.pkType = pkType;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SchemaObject`.
     */
    getModelName() {
        return "SchemaObject";
    }
};
SchemaObjectApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SchemaObjectApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], SchemaObjectApi);
export { SchemaObjectApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jdXN0b20vU2NoZW1hT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHcEU7O0dBRUc7QUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLGVBQWU7SUFFbEQsWUFDZ0MsSUFBZ0IsRUFDVixVQUE0QixFQUNuQyxNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFFdEUsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQU50QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFDTixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUd4RSxDQUFDO0lBR0Q7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0ks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LFlBQVk7UUFDakIsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7O1lBeEd1QyxVQUFVLHVCQUE3QyxNQUFNLFNBQUMsVUFBVTtZQUM4QixnQkFBZ0IsdUJBQS9ELE1BQU0sU0FBQyxnQkFBZ0I7WUFDYSxTQUFTLHVCQUE3QyxNQUFNLFNBQUMsU0FBUztZQUNxQixZQUFZLHVCQUFqRCxNQUFNLFNBQUMsWUFBWTtZQUNzQyxZQUFZLHVCQUFyRSxRQUFRLFlBQUksTUFBTSxTQUFDLFlBQVk7O0FBUHZCLGVBQWU7SUFEM0IsVUFBVSxFQUFFO0lBSVIsbUJBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xCLG1CQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNqQixtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7R0FQeEIsZUFBZSxDQTJHM0I7U0EzR1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9jb3JlL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL1NjaGVtYU9iamVjdCc7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYFNjaGVtYU9iamVjdGAgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY2hlbWFPYmplY3RBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgY29ubmVjdGlvbiwgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cblxuICAvKipcbiAgICogUmVtb3ZlIGVudGl0eSB3aXRoIG91dGdvaW5nIHN0YXRlbWVudHMgYW5kIG5hbWluZ3MgZnJvbSBwcm9qZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcGtQcm9qZWN0IFByaW1hcnkga2V5IG9mIHRoZSBwcm9qZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa0VudGl0eSBQcmltYXJ5IGtleSBvZiB0aGUgZW50aXR5XG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBTY2hlbWFPYmplY3RgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlRW50aXR5RnJvbVByb2plY3QocGtQcm9qZWN0OiBhbnksIHBrRW50aXR5OiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICAgIFwiL1NjaGVtYU9iamVjdHMvcmVtb3ZlLWVudGl0eS1mcm9tLXByb2plY3RcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBwa1Byb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHBrUHJvamVjdCAhPT0gbnVsbCkgX3VybFBhcmFtcy5wa1Byb2plY3QgPSBwa1Byb2plY3Q7XG4gICAgaWYgKHR5cGVvZiBwa0VudGl0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGtFbnRpdHkgIT09IG51bGwpIF91cmxQYXJhbXMucGtFbnRpdHkgPSBwa0VudGl0eTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBlbnRpdHkgd2l0aCBvdXRnb2luZyBzdGF0ZW1lbnRzIGFuZCBuYW1pbmdzIHRvIHByb2plY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwa1Byb2plY3QgUHJpbWFyeSBrZXkgb2YgdGhlIHByb2plY3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrRW50aXR5IFByaW1hcnkga2V5IG9mIHRoZSBlbnRpdHlcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFNjaGVtYU9iamVjdGAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBhZGRFbnRpdHlUb1Byb2plY3QocGtQcm9qZWN0OiBhbnksIHBrRW50aXR5OiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICAgIFwiL1NjaGVtYU9iamVjdHMvYWRkLWVudGl0eS10by1wcm9qZWN0XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtFbnRpdHkgIT09ICd1bmRlZmluZWQnICYmIHBrRW50aXR5ICE9PSBudWxsKSBfdXJsUGFyYW1zLnBrRW50aXR5ID0gcGtFbnRpdHk7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBvYmplY3QgY29udGFpbmluZyBhcGxsYXRpb25zIGFuZCBkZWZpbml0aW9uIG9mIGEgdHlwZSAocHJvamVjdCB2YXJpYW50KS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrUHJvamVjdCBQayBvZiB0aGUgcHJvamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBrVHlwZSBQayBvZiB0aGUgdHlwZS5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBTY2hlbWFPYmplY3RgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdHlwZU9mUHJvamVjdChwa1Byb2plY3Q6IGFueSwgcGtUeXBlOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICAgIFwiL1NjaGVtYU9iamVjdHMvdHlwZS1vZi1wcm9qZWN0XCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgcGtQcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwa1Byb2plY3QgIT09IG51bGwpIF91cmxQYXJhbXMucGtQcm9qZWN0ID0gcGtQcm9qZWN0O1xuICAgIGlmICh0eXBlb2YgcGtUeXBlICE9PSAndW5kZWZpbmVkJyAmJiBwa1R5cGUgIT09IG51bGwpIF91cmxQYXJhbXMucGtUeXBlID0gcGtUeXBlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTY2hlbWFPYmplY3RgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTY2hlbWFPYmplY3RcIjtcbiAgfVxufVxuIl19