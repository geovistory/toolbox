import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse, HttpParameterCodec } from '@angular/common/http';
import { ErrorHandler } from './error.service';
import { LoopBackAuth } from './auth.service';
import { LoopBackConfig } from '../../lb.config';
import { SDKModels } from '../custom/SDKModels';
import { Subject } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { SocketConnection } from '../../sockets/socket.connections';
class CustomQueryEncoderHelper {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
let BaseLoopBackApi = class BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    request(method, url, routeParams = {}, urlParams = {}, postBody = {}, pubsub = false, customHeaders) {
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach((key) => {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                let arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            let event = (`[${method}]${url}`).replace(/\?/, '');
            let subject = new Subject();
            this.connection.on(event, (res) => subject.next(res));
            return subject.asObservable();
        }
        else {
            let httpParams = new HttpParams({ encoder: new CustomQueryEncoderHelper() });
            // Headers to be sent
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            // Authenticate request
            headers = this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            let body;
            let postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            let queryString = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (LoopBackConfig.isHeadersFilteringSet()) {
                    headers = headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    queryString = `?filter=${encodeURIComponent(JSON.stringify(urlParams.filter))}`;
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            if (urlParams.where) {
                if (LoopBackConfig.isHeadersWhereSet()) {
                    /**
                    CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
                    - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
                    - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
                    **/
                    headers = headers.append('where', JSON.stringify(urlParams.where));
                }
                else {
                    queryString = `?where=${encodeURIComponent(JSON.stringify(urlParams.where))}`;
                }
                delete urlParams.where;
            }
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            /* enhancement/configure-where-headers
                  this.searchParams.setJSON(urlParams);
                  let request: Request = new Request(
                    new RequestOptions({
                      headers        : headers,
                      method         : method,
                      url            : `${url}${queryString}`,
                      search         : Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                      body           : body ? JSON.stringify(body) : undefined,
                      withCredentials: LoopBackConfig.getRequestOptionsCredentials()
                    })
                  );
            TODO Fix Merge Conflict */
            Object.keys(urlParams).forEach(paramKey => {
                let paramValue = urlParams[paramKey];
                paramValue = typeof paramValue === 'object' ? JSON.stringify(paramValue) : paramValue;
                httpParams = httpParams.append(paramKey, paramValue);
            });
            let request = new HttpRequest(method, `${url}${queryString}`, body, {
                headers: headers,
                params: httpParams,
                withCredentials: LoopBackConfig.getRequestOptionsCredentials()
            });
            return this.http.request(request).pipe(filter(event => event instanceof HttpResponse), map((res) => res.body), catchError((e) => this.errorHandler.handleError(e)));
        }
    }
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    authenticate(url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers = headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
        return headers;
    }
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    create(data, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub oncreate many method
     */
    onCreate(data) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    createMany(data, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    onCreateMany(data) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    findById(id, filter = {}, customHeaders) {
        let _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, _urlParams, undefined, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    find(filter = {}, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    exists(id, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id }, undefined, undefined, null, customHeaders);
    }
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    findOne(filter = {}, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    updateAll(where = {}, data, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders);
    }
    /**
     * @method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub onUpdateAll method
     */
    onUpdateAll(where = {}, data) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, true);
    }
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    deleteById(id, customHeaders) {
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onDeleteById method
     */
    onDeleteById(id) {
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    count(where = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    }
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    updateAttributes(id, data, customHeaders) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onUpdateAttributes method
     */
    onUpdateAttributes(id, data) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    upsert(data = {}, customHeaders) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsert method
     */
    onUpsert(data = {}) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    upsertPatch(data = {}, customHeaders) {
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertPatch method using patch http method
     */
    onUpsertPatch(data = {}) {
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    upsertWithWhere(where = {}, data = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertWithWhere method
     */
    onUpsertWithWhere(where = {}, data = {}) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    replaceOrCreate(data = {}, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceOrCreate method
     */
    onReplaceOrCreate(data = {}) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    replaceById(id, data = {}, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceById method
     */
    onReplaceById(id, data = {}) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    createChangeStream() {
        let subject = new Subject();
        if (typeof EventSource !== 'undefined') {
            let emit = (msg) => subject.next(JSON.parse(msg.data));
            var source = new EventSource([
                LoopBackConfig.getPath(),
                LoopBackConfig.getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    }
};
BaseLoopBackApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
BaseLoopBackApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], BaseLoopBackApi);
export { BaseLoopBackApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUxSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxNQUFNLHdCQUF3QjtJQUM1QixTQUFTLENBQUMsQ0FBUztRQUNmLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFTO1FBQ2pCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFNBQVMsQ0FBQyxDQUFTO1FBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsV0FBVyxDQUFDLENBQVM7UUFDakIsT0FBTyxrQkFBa0Is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aW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXF1ZXN0LCBIdHRwUGFyYW1zLCBIdHRwUmVzcG9uc2UsIEh0dHBQYXJhbWV0ZXJDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsIEFjY2Vzc1Rva2VuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi4vY3VzdG9tL1NES01vZGVscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG4vLyBNYWtpbmcgU3VyZSBFdmVudFNvdXJjZSBUeXBlIGlzIGF2YWlsYWJsZSB0byBhdm9pZCBjb21waWxhdGlvbiBpc3N1ZXMuXG5kZWNsYXJlIHZhciBFdmVudFNvdXJjZTogYW55O1xuY2xhc3MgQ3VzdG9tUXVlcnlFbmNvZGVySGVscGVyIGltcGxlbWVudHMgSHR0cFBhcmFtZXRlckNvZGVjIHtcbiAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGspO1xuICB9XG5cbiAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodik7XG4gIH1cblxuICBkZWNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoayk7XG4gIH1cblxuICBkZWNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgfVxufVxuLyoqXG4qIEBtb2R1bGUgQmFzZUxvb3BCYWNrQXBpXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPEBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6am9uYXRoYW4tY2FzYXJydWJpYXM+XG4qIEBhdXRob3IgTmlrb2xheSBNYXRpdXNoZW5rb3YgPGh0dHBzOi8vZ2l0aHViLmNvbS9tbnZ4PlxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIEFic3RyYWN0IGNsYXNzIHRoYXQgd2lsbCBiZSBpbXBsZW1lbnRlZCBpbiBldmVyeSBjdXN0b20gc2VydmljZSBhdXRvbWF0aWNhbGx5IGJ1aWx0XG4qIGJ5IHRoZSBzZGsgYnVpbGRlci5cbiogSXQgcHJvdmlkZXMgdGhlIGNvcmUgZnVuY3Rpb25hbGxpdHkgZm9yIGV2ZXJ5IEFQSSBjYWxsLCBlaXRoZXIgYnkgSFRUUCBDYWxscyBvciBieVxuKiBXZWJTb2NrZXRzLlxuKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBwcm90ZWN0ZWQgcGF0aDogc3RyaW5nO1xuICBwcm90ZWN0ZWQgbW9kZWw6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU29ja2V0Q29ubmVjdGlvbikgcHJvdGVjdGVkIGNvbm5lY3Rpb246IFNvY2tldENvbm5lY3Rpb24sXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodGhpcy5nZXRNb2RlbE5hbWUoKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVxdWVzdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gIG1ldGhvZCAgICAgIFJlcXVlc3QgbWV0aG9kIChHRVQsIFBPU1QsIFBVVClcbiAgICogQHBhcmFtIHtzdHJpbmd9ICB1cmwgICAgICAgICBSZXF1ZXN0IHVybCAobXktaG9zdC9teS11cmwvOmlkKVxuICAgKiBAcGFyYW0ge2FueX0gICAgIHJvdXRlUGFyYW1zIFZhbHVlcyBvZiB1cmwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge2FueX0gICAgIHVybFBhcmFtcyAgIFBhcmFtZXRlcnMgZm9yIGJ1aWxkaW5nIHVybCAoZmlsdGVyIGFuZCBvdGhlcilcbiAgICogQHBhcmFtIHthbnl9ICAgICBwb3N0Qm9keSAgICBSZXF1ZXN0IHBvc3RCb2R5XG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgaXMgYSBjb3JlIG1ldGhvZCwgZXZlcnkgSFRUUCBDYWxsIHdpbGwgYmUgZG9uZSBmcm9tIGhlcmUsIGV2ZXJ5IEFQSSBTZXJ2aWNlIHdpbGxcbiAgICogZXh0ZW5kIHRoaXMgY2xhc3MgYW5kIHVzZSB0aGlzIG1ldGhvZCB0byBnZXQgUkVTVGZ1bCBjb21tdW5pY2F0aW9uLlxuICAgKiovXG4gIHB1YmxpYyByZXF1ZXN0KFxuICAgIG1ldGhvZCAgICAgICAgIDogc3RyaW5nLFxuICAgIHVybCAgICAgICAgICAgIDogc3RyaW5nLFxuICAgIHJvdXRlUGFyYW1zICAgIDogYW55ID0ge30sXG4gICAgdXJsUGFyYW1zICAgICAgOiBhbnkgPSB7fSxcbiAgICBwb3N0Qm9keSAgICAgICA6IGFueSA9IHt9LFxuICAgIHB1YnN1YiAgICAgICAgIDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGN1c3RvbUhlYWRlcnM/IDogRnVuY3Rpb25cbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyBUcmFuc3BpbGUgcm91dGUgdmFyaWFibGVzIHRvIHRoZSBhY3R1YWwgcmVxdWVzdCBWYWx1ZXNcbiAgICBPYmplY3Qua2V5cyhyb3V0ZVBhcmFtcykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoXCI6XCIgKyBrZXkgKyBcIihcXC98JClcIiwgXCJnXCIpLCByb3V0ZVBhcmFtc1trZXldICsgXCIkMVwiKVxuICAgIH0pO1xuICAgIGlmIChwdWJzdWIpIHtcbiAgICAgIGlmICh1cmwubWF0Y2goL2ZrLykpIHtcbiAgICAgICAgbGV0IGFyciA9IHVybC5zcGxpdCgnLycpOyBhcnIucG9wKCk7XG4gICAgICAgIHVybCA9IGFyci5qb2luKCcvJyk7XG4gICAgICB9XG4gICAgICBsZXQgZXZlbnQ6IHN0cmluZyA9IChgWyR7bWV0aG9kfV0ke3VybH1gKS5yZXBsYWNlKC9cXD8vLCAnJyk7XG4gICAgICBsZXQgc3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgdGhpcy5jb25uZWN0aW9uLm9uKGV2ZW50LCAocmVzOiBhbnkpID0+IHN1YmplY3QubmV4dChyZXMpKTtcbiAgICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHsgZW5jb2RlcjogbmV3IEN1c3RvbVF1ZXJ5RW5jb2RlckhlbHBlcigpIH0pO1xuICAgICAgLy8gSGVhZGVycyB0byBiZSBzZW50XG4gICAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIC8vIEF1dGhlbnRpY2F0ZSByZXF1ZXN0XG4gICAgICBoZWFkZXJzID0gdGhpcy5hdXRoZW50aWNhdGUodXJsLCBoZWFkZXJzKTtcbiAgICAgIC8vIEJvZHkgZml4IGZvciBidWlsdCBpbiByZW1vdGUgbWV0aG9kcyB1c2luZyBcImRhdGFcIiwgXCJvcHRpb25zXCIgb3IgXCJjcmVkZW50aWFsc1xuICAgICAgLy8gdGhhdCBhcmUgdGhlIGFjdHVhbCBib2R5LCBDdXN0b20gcmVtb3RlIG1ldGhvZCBwcm9wZXJ0aWVzIGFyZSBkaWZmZXJlbnQgYW5kIG5lZWRcbiAgICAgIC8vIHRvIGJlIHdyYXBwZWQgaW50byBhIGJvZHkgb2JqZWN0XG4gICAgICBsZXQgYm9keTogYW55O1xuICAgICAgbGV0IHBvc3RCb2R5S2V5cyA9IHR5cGVvZiBwb3N0Qm9keSA9PT0gJ29iamVjdCcgPyBPYmplY3Qua2V5cyhwb3N0Qm9keSkgOiBbXVxuICAgICAgaWYgKHBvc3RCb2R5S2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYm9keSA9IHBvc3RCb2R5W3Bvc3RCb2R5S2V5cy5zaGlmdCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkgPSBwb3N0Qm9keTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSAnJztcblxuICAgICAgLy8gU2VwYXJhdGUgZmlsdGVyIG9iamVjdCBmcm9tIHVybCBwYXJhbXMgYW5kIGFkZCB0byBzZWFyY2ggcXVlcnlcbiAgICAgIGlmICh1cmxQYXJhbXMuZmlsdGVyKSB7XG4gICAgICAgIGlmIChMb29wQmFja0NvbmZpZy5pc0hlYWRlcnNGaWx0ZXJpbmdTZXQoKSkge1xuICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZCgnZmlsdGVyJywgSlNPTi5zdHJpbmdpZnkodXJsUGFyYW1zLmZpbHRlcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gYD9maWx0ZXI9JHtlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodXJsUGFyYW1zLmZpbHRlcikpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHVybFBhcmFtcy5maWx0ZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcGFyYXRlIHdoZXJlIG9iamVjdCBmcm9tIHVybCBwYXJhbXMgYW5kIGFkZCB0byBzZWFyY2ggcXVlcnlcbiAgICAgIGlmICh1cmxQYXJhbXMud2hlcmUpIHtcbiAgICAgICAgaWYgKExvb3BCYWNrQ29uZmlnLmlzSGVhZGVyc1doZXJlU2V0KCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICBDT0RFIEJFTE9XIFdJTEwgR0VORVJBVEUgVEhFIEZPTExPV0lORyBJU1NVRVM6XG4gICAgICAgICAgLSBodHRwczovL2dpdGh1Yi5jb20vbWVhbi1leHBlcnQtb2ZmaWNpYWwvbG9vcGJhY2stc2RrLWJ1aWxkZXIvaXNzdWVzLzM1NlxuICAgICAgICAgIC0gaHR0cHM6Ly9naXRodWIuY29tL21lYW4tZXhwZXJ0LW9mZmljaWFsL2xvb3BiYWNrLXNkay1idWlsZGVyL2lzc3Vlcy8zMjggXG4gICAgICAgICAgKiovXG4gICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKCd3aGVyZScsIEpTT04uc3RyaW5naWZ5KHVybFBhcmFtcy53aGVyZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gYD93aGVyZT0ke2VuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMud2hlcmUpKX1gO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB1cmxQYXJhbXMud2hlcmU7XG4gICAgICB9XG4gICAgXG4gICAgICBpZiAodHlwZW9mIGN1c3RvbUhlYWRlcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGVhZGVycyA9IGN1c3RvbUhlYWRlcnMoaGVhZGVycyk7XG4gICAgICB9XG4vKiBlbmhhbmNlbWVudC9jb25maWd1cmUtd2hlcmUtaGVhZGVyc1xuICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuc2V0SlNPTih1cmxQYXJhbXMpO1xuICAgICAgbGV0IHJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdChcbiAgICAgICAgbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgICAgICBoZWFkZXJzICAgICAgICA6IGhlYWRlcnMsXG4gICAgICAgICAgbWV0aG9kICAgICAgICAgOiBtZXRob2QsXG4gICAgICAgICAgdXJsICAgICAgICAgICAgOiBgJHt1cmx9JHtxdWVyeVN0cmluZ31gLFxuICAgICAgICAgIHNlYXJjaCAgICAgICAgIDogT2JqZWN0LmtleXModXJsUGFyYW1zKS5sZW5ndGggPiAwID8gdGhpcy5zZWFyY2hQYXJhbXMuZ2V0VVJMU2VhcmNoUGFyYW1zKCkgOiBudWxsLFxuICAgICAgICAgIGJvZHkgICAgICAgICAgIDogYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogTG9vcEJhY2tDb25maWcuZ2V0UmVxdWVzdE9wdGlvbnNDcmVkZW50aWFscygpXG4gICAgICAgIH0pXG4gICAgICApO1xuVE9ETyBGaXggTWVyZ2UgQ29uZmxpY3QgKi9cbiAgICAgIE9iamVjdC5rZXlzKHVybFBhcmFtcykuZm9yRWFjaChwYXJhbUtleSA9PiB7XG4gICAgICAgIGxldCBwYXJhbVZhbHVlID0gdXJsUGFyYW1zW3BhcmFtS2V5XTtcbiAgICAgICAgcGFyYW1WYWx1ZSA9IHR5cGVvZiBwYXJhbVZhbHVlID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHBhcmFtVmFsdWUpIDogcGFyYW1WYWx1ZTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKHBhcmFtS2V5LCBwYXJhbVZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCBgJHt1cmx9JHtxdWVyeVN0cmluZ31gLCBib2R5LCB7XG4gICAgICAgIGhlYWRlcnMgICAgICAgIDogaGVhZGVycyxcbiAgICAgICAgcGFyYW1zICAgICAgICAgOiBodHRwUGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IExvb3BCYWNrQ29uZmlnLmdldFJlcXVlc3RPcHRpb25zQ3JlZGVudGlhbHMoKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdCkucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSxcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiByZXMuYm9keSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGUpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgYXV0aGVudGljYXRlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBTZXJ2ZXIgVVJMXG4gICAqIEBwYXJhbSB7SGVhZGVyc30gaGVhZGVycyBIVFRQIEhlYWRlcnNcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgdHJ5IHRvIGF1dGhlbnRpY2F0ZSB1c2luZyBlaXRoZXIgYW4gYWNjZXNzX3Rva2VuIG9yIGJhc2ljIGh0dHAgYXV0aFxuICAgKi9cbiAgcHVibGljIGF1dGhlbnRpY2F0ZTxUPih1cmw6IHN0cmluZywgaGVhZGVyczogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XG4gICAgaWYgKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbklkKCkpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICBMb29wQmFja0NvbmZpZy5nZXRBdXRoUHJlZml4KCkgKyB0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7VH0gZGF0YSBHZW5lcmljIGRhdGEgdHlwZVxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBjcmVhdGUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlPFQ+KGRhdGE6IFQsIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25DcmVhdGVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcGFyYW0ge1RbXX0gZGF0YSBHZW5lcmljIGRhdGEgdHlwZSBhcnJheVxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHB1YnN1YiBvbmNyZWF0ZSBtYW55IG1ldGhvZFxuICAgKi9cbiAgcHVibGljIG9uQ3JlYXRlPFQ+KGRhdGE6IFRbXSk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpXG4gICAgLnBpcGUobWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBjcmVhdGVNYW55XG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHBhcmFtIHtUW119IGRhdGEgR2VuZXJpYyBkYXRhIHR5cGUgYXJyYXlcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBjcmVhdGUgbWFueSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVNYW55PFQ+KGRhdGE6IFRbXSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdHVtOiBUW10pID0+IGRhdHVtLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uQ3JlYXRlTWFueVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7VFtdfSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlIGFycmF5XG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgY3JlYXRlIG1hbnkgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25DcmVhdGVNYW55PFQ+KGRhdGE6IFRbXSk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpXG4gICAgLnBpcGUobWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBmaW5kQnlJZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGZpbmRCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkPFQ+KGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIpIF91cmxQYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgX3VybFBhcmFtcywgdW5kZWZpbmVkLCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZmluZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFsrPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgZmluZCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBmaW5kPFQ+KGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB7IGZpbHRlciB9LCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBleGlzdHNcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGV4aXN0cyBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBleGlzdHM8VD4oaWQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZC9leGlzdHMnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpbmRPbmVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBmaW5kT25lIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGZpbmRPbmU8VD4oZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnZmluZE9uZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB7IGZpbHRlciB9LCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVBbGxcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHVwZGF0ZUFsbCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGw8VD4od2hlcmU6IGFueSA9IHt9LCBkYXRhOiBULCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPHsgY291bnQ6ICdudW1iZXInIH0+IHtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICd1cGRhdGUnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uVXBkYXRlQWxsXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBwdWJzdWIgb25VcGRhdGVBbGwgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25VcGRhdGVBbGw8VD4od2hlcmU6IGFueSA9IHt9LCBkYXRhOiBUKTogT2JzZXJ2YWJsZTx7IGNvdW50OiAnbnVtYmVyJyB9PiB7XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAndXBkYXRlJ1xuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIF91cmxQYXJhbXMsIHsgZGF0YSB9LCB0cnVlKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBkZWxldGVCeUlkXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgZGVsZXRlQnlJZCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkPFQ+KGlkOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBvbkRlbGV0ZUJ5SWRcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBwdWJzdWIgb25EZWxldGVCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIG9uRGVsZXRlQnlJZDxUPihpZDogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvdW50XG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTx7IGNvdW50OiBudW1iZXIgfT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGNvdW50IG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGNvdW50KHdoZXJlOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTx7IGNvdW50OiBudW1iZXIgfT4ge1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUpIF91cmxQYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnY291bnQnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgdW5kZWZpbmVkLCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVBdHRyaWJ1dGVzXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgdXBkYXRlQXR0cmlidXRlcyBtZXRob2RcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzPFQ+KGlkOiBhbnksIGRhdGE6IFQsIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uVXBkYXRlQXR0cmlidXRlc1xuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIG9uVXBkYXRlQXR0cmlidXRlcyBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvblVwZGF0ZUF0dHJpYnV0ZXM8VD4oaWQ6IGFueSwgZGF0YTogVCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgdHJ1ZSlcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwc2VydFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHVwc2VydCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyB1cHNlcnQ8VD4oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25VcHNlcnRcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBwdWJzdWIgb25VcHNlcnQgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25VcHNlcnQ8VD4oZGF0YTogYW55ID0ge30pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQVVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgdHJ1ZSlcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwc2VydFBhdGNoXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgdXBzZXJ0IG1ldGhvZCB1c2luZyBwYXRjaCBodHRwIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHVwc2VydFBhdGNoPFQ+KGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQQVRDSCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25VcHNlcnRQYXRjaFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHB1YnN1YiBvblVwc2VydFBhdGNoIG1ldGhvZCB1c2luZyBwYXRjaCBodHRwIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIG9uVXBzZXJ0UGF0Y2g8VD4oZGF0YTogYW55ID0ge30pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQQVRDSCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBzZXJ0V2l0aFdoZXJlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgdXBzZXJ0V2l0aFdoZXJlIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHVwc2VydFdpdGhXaGVyZTxUPih3aGVyZTogYW55ID0ge30sIGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICd1cHNlcnRXaXRoV2hlcmUnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBvblVwc2VydFdpdGhXaGVyZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHB1YnN1YiBvblVwc2VydFdpdGhXaGVyZSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvblVwc2VydFdpdGhXaGVyZTxUPih3aGVyZTogYW55ID0ge30sIGRhdGE6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAndXBzZXJ0V2l0aFdoZXJlJ1xuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIF91cmxQYXJhbXMsIHsgZGF0YSB9LCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVwbGFjZU9yQ3JlYXRlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgcmVwbGFjZU9yQ3JlYXRlIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHJlcGxhY2VPckNyZWF0ZTxUPihkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICdyZXBsYWNlT3JDcmVhdGUnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uUmVwbGFjZU9yQ3JlYXRlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgb25SZXBsYWNlT3JDcmVhdGUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25SZXBsYWNlT3JDcmVhdGU8VD4oZGF0YTogYW55ID0ge30pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJ3JlcGxhY2VPckNyZWF0ZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVwbGFjZUJ5SWRcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyByZXBsYWNlQnlJZCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyByZXBsYWNlQnlJZDxUPihpZDogYW55LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnLCAncmVwbGFjZSdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25SZXBsYWNlQnlJZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIG9uUmVwbGFjZUJ5SWQgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25SZXBsYWNlQnlJZDxUPihpZDogYW55LCBkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnOmlkJywgJ3JlcGxhY2UnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgdHJ1ZSlcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNyZWF0ZUNoYW5nZVN0cmVhbVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgY3JlYXRlQ2hhbmdlU3RyZWFtIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNoYW5nZVN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICBpZiAodHlwZW9mIEV2ZW50U291cmNlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbGV0IGVtaXQgICA9IChtc2c6IGFueSkgPT4gc3ViamVjdC5uZXh0KEpTT04ucGFyc2UobXNnLmRhdGEpKTtcbiAgICAgIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoW1xuICAgICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgICAnY2hhbmdlLXN0cmVhbSdcbiAgICAgIF0uam9pbignLycpKTtcbiAgICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdkYXRhJywgZW1pdCk7XG4gICAgICBzb3VyY2Uub25lcnJvciA9IGVtaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignU0RLIEJ1aWxkZXI6IEV2ZW50U291cmNlIGlzIG5vdCBzdXBwb3J0ZWQnKTsgXG4gICAgfVxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldE1vZGVsTmFtZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFic3RyYWN0IGdldE1vZGVsTmFtZSBtZXRob2RcbiAgICovXG4gIGFic3RyYWN0IGdldE1vZGVsTmFtZSgpOiBzdHJpbmc7XG59XG4iXX0=