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
var CustomQueryEncoderHelper = /** @class */ (function () {
    function CustomQueryEncoderHelper() {
    }
    CustomQueryEncoderHelper.prototype.encodeKey = function (k) {
        return encodeURIComponent(k);
    };
    CustomQueryEncoderHelper.prototype.encodeValue = function (v) {
        return encodeURIComponent(v);
    };
    CustomQueryEncoderHelper.prototype.decodeKey = function (k) {
        return decodeURIComponent(k);
    };
    CustomQueryEncoderHelper.prototype.decodeValue = function (v) {
        return decodeURIComponent(v);
    };
    return CustomQueryEncoderHelper;
}());
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
var BaseLoopBackApi = /** @class */ (function () {
    function BaseLoopBackApi(http, connection, models, auth, errorHandler) {
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
    BaseLoopBackApi.prototype.request = function (method, url, routeParams, urlParams, postBody, pubsub, customHeaders) {
        var _this = this;
        if (routeParams === void 0) { routeParams = {}; }
        if (urlParams === void 0) { urlParams = {}; }
        if (postBody === void 0) { postBody = {}; }
        if (pubsub === void 0) { pubsub = false; }
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach(function (key) {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                var arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            var event_1 = ("[" + method + "]" + url).replace(/\?/, '');
            var subject_1 = new Subject();
            this.connection.on(event_1, function (res) { return subject_1.next(res); });
            return subject_1.asObservable();
        }
        else {
            var httpParams_1 = new HttpParams({ encoder: new CustomQueryEncoderHelper() });
            // Headers to be sent
            var headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            // Authenticate request
            headers = this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            var body = void 0;
            var postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            var queryString = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (LoopBackConfig.isHeadersFilteringSet()) {
                    headers = headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    queryString = "?filter=" + encodeURIComponent(JSON.stringify(urlParams.filter));
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
                    queryString = "?where=" + encodeURIComponent(JSON.stringify(urlParams.where));
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
            Object.keys(urlParams).forEach(function (paramKey) {
                var paramValue = urlParams[paramKey];
                paramValue = typeof paramValue === 'object' ? JSON.stringify(paramValue) : paramValue;
                httpParams_1 = httpParams_1.append(paramKey, paramValue);
            });
            var request = new HttpRequest(method, "" + url + queryString, body, {
                headers: headers,
                params: httpParams_1,
                withCredentials: LoopBackConfig.getRequestOptionsCredentials()
            });
            return this.http.request(request).pipe(filter(function (event) { return event instanceof HttpResponse; }), map(function (res) { return res.body; }), catchError(function (e) { return _this.errorHandler.handleError(e); }));
        }
    };
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
    BaseLoopBackApi.prototype.authenticate = function (url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers = headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
        return headers;
    };
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    BaseLoopBackApi.prototype.create = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub oncreate many method
     */
    BaseLoopBackApi.prototype.onCreate = function (data) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .pipe(map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
    };
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.createMany = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
    };
    /**
     * @method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.onCreateMany = function (data) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .pipe(map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
    };
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    BaseLoopBackApi.prototype.findById = function (id, filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, _urlParams, undefined, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    BaseLoopBackApi.prototype.find = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .pipe(map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
    };
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    BaseLoopBackApi.prototype.exists = function (id, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders);
    };
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    BaseLoopBackApi.prototype.findOne = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    BaseLoopBackApi.prototype.updateAll = function (where, data, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders);
    };
    /**
     * @method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub onUpdateAll method
     */
    BaseLoopBackApi.prototype.onUpdateAll = function (where, data) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, true);
    };
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    BaseLoopBackApi.prototype.deleteById = function (id, customHeaders) {
        var _this = this;
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onDeleteById method
     */
    BaseLoopBackApi.prototype.onDeleteById = function (id) {
        var _this = this;
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    BaseLoopBackApi.prototype.count = function (where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    };
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    BaseLoopBackApi.prototype.updateAttributes = function (id, data, customHeaders) {
        var _this = this;
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onUpdateAttributes method
     */
    BaseLoopBackApi.prototype.onUpdateAttributes = function (id, data) {
        var _this = this;
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    BaseLoopBackApi.prototype.upsert = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsert method
     */
    BaseLoopBackApi.prototype.onUpsert = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    BaseLoopBackApi.prototype.upsertPatch = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertPatch method using patch http method
     */
    BaseLoopBackApi.prototype.onUpsertPatch = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    BaseLoopBackApi.prototype.upsertWithWhere = function (where, data, customHeaders) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertWithWhere method
     */
    BaseLoopBackApi.prototype.onUpsertWithWhere = function (where, data) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    BaseLoopBackApi.prototype.replaceOrCreate = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceOrCreate method
     */
    BaseLoopBackApi.prototype.onReplaceOrCreate = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    BaseLoopBackApi.prototype.replaceById = function (id, data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceById method
     */
    BaseLoopBackApi.prototype.onReplaceById = function (id, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, true)
            .pipe(map(function (data) { return _this.model.factory(data); }));
    };
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    BaseLoopBackApi.prototype.createChangeStream = function () {
        var subject = new Subject();
        if (typeof EventSource !== 'undefined') {
            var emit = function (msg) { return subject.next(JSON.parse(msg.data)); };
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
    };
    BaseLoopBackApi.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
        { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
        { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
        { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
    ]; };
    BaseLoopBackApi = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__param(1, Inject(SocketConnection)),
        tslib_1.__param(2, Inject(SDKModels)),
        tslib_1.__param(3, Inject(LoopBackAuth)),
        tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
    ], BaseLoopBackApi);
    return BaseLoopBackApi;
}());
export { BaseLoopBackApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jb3JlL2Jhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTFILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3BFO0lBQUE7SUFnQkEsQ0FBQztJQWZDLDRDQUFTLEdBQVQsVUFBVSxDQUFTO1FBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsOENBQVcsR0FBWCxVQUFZLENBQVM7UUFDakIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsNENBQVMsR0FBVCxVQUFVLENBQVM7UUFDZixPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCw4Q0FB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QVUsRUFBRTtRQU9SLG1CQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQixtQkFBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4QixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDakIsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO09BVmYsZUFBZSxDQWltQnBDO0lBQUQsc0JBQUM7Q0FBQSxBQWptQkQsSUFpbUJDO1NBam1CcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlcXVlc3QsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSwgSHR0cFBhcmFtZXRlckNvZGVjIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgQWNjZXNzVG9rZW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuLi9jdXN0b20vU0RLTW9kZWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcbi8vIE1ha2luZyBTdXJlIEV2ZW50U291cmNlIFR5cGUgaXMgYXZhaWxhYmxlIHRvIGF2b2lkIGNvbXBpbGF0aW9uIGlzc3Vlcy5cbmRlY2xhcmUgdmFyIEV2ZW50U291cmNlOiBhbnk7XG5jbGFzcyBDdXN0b21RdWVyeUVuY29kZXJIZWxwZXIgaW1wbGVtZW50cyBIdHRwUGFyYW1ldGVyQ29kZWMge1xuICBlbmNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoayk7XG4gIH1cblxuICBlbmNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgfVxuXG4gIGRlY29kZUtleShrOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChrKTtcbiAgfVxuXG4gIGRlY29kZVZhbHVlKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuICB9XG59XG4vKipcbiogQG1vZHVsZSBCYXNlTG9vcEJhY2tBcGlcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1Yjpqb25hdGhhbi1jYXNhcnJ1Ymlhcz5cbiogQGF1dGhvciBOaWtvbGF5IE1hdGl1c2hlbmtvdiA8aHR0cHM6Ly9naXRodWIuY29tL21udng+XG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogQWJzdHJhY3QgY2xhc3MgdGhhdCB3aWxsIGJlIGltcGxlbWVudGVkIGluIGV2ZXJ5IGN1c3RvbSBzZXJ2aWNlIGF1dG9tYXRpY2FsbHkgYnVpbHRcbiogYnkgdGhlIHNkayBidWlsZGVyLlxuKiBJdCBwcm92aWRlcyB0aGUgY29yZSBmdW5jdGlvbmFsbGl0eSBmb3IgZXZlcnkgQVBJIGNhbGwsIGVpdGhlciBieSBIVFRQIENhbGxzIG9yIGJ5XG4qIFdlYlNvY2tldHMuXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIHByb3RlY3RlZCBwYXRoOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBtb2RlbDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwcm90ZWN0ZWQgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWxzLmdldCh0aGlzLmdldE1vZGVsTmFtZSgpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZXF1ZXN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgbWV0aG9kICAgICAgUmVxdWVzdCBtZXRob2QgKEdFVCwgUE9TVCwgUFVUKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gIHVybCAgICAgICAgIFJlcXVlc3QgdXJsIChteS1ob3N0L215LXVybC86aWQpXG4gICAqIEBwYXJhbSB7YW55fSAgICAgcm91dGVQYXJhbXMgVmFsdWVzIG9mIHVybCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7YW55fSAgICAgdXJsUGFyYW1zICAgUGFyYW1ldGVycyBmb3IgYnVpbGRpbmcgdXJsIChmaWx0ZXIgYW5kIG90aGVyKVxuICAgKiBAcGFyYW0ge2FueX0gICAgIHBvc3RCb2R5ICAgIFJlcXVlc3QgcG9zdEJvZHlcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBpcyBhIGNvcmUgbWV0aG9kLCBldmVyeSBIVFRQIENhbGwgd2lsbCBiZSBkb25lIGZyb20gaGVyZSwgZXZlcnkgQVBJIFNlcnZpY2Ugd2lsbFxuICAgKiBleHRlbmQgdGhpcyBjbGFzcyBhbmQgdXNlIHRoaXMgbWV0aG9kIHRvIGdldCBSRVNUZnVsIGNvbW11bmljYXRpb24uXG4gICAqKi9cbiAgcHVibGljIHJlcXVlc3QoXG4gICAgbWV0aG9kICAgICAgICAgOiBzdHJpbmcsXG4gICAgdXJsICAgICAgICAgICAgOiBzdHJpbmcsXG4gICAgcm91dGVQYXJhbXMgICAgOiBhbnkgPSB7fSxcbiAgICB1cmxQYXJhbXMgICAgICA6IGFueSA9IHt9LFxuICAgIHBvc3RCb2R5ICAgICAgIDogYW55ID0ge30sXG4gICAgcHVic3ViICAgICAgICAgOiBib29sZWFuID0gZmFsc2UsXG4gICAgY3VzdG9tSGVhZGVycz8gOiBGdW5jdGlvblxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIFRyYW5zcGlsZSByb3V0ZSB2YXJpYWJsZXMgdG8gdGhlIGFjdHVhbCByZXF1ZXN0IFZhbHVlc1xuICAgIE9iamVjdC5rZXlzKHJvdXRlUGFyYW1zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdXJsID0gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cChcIjpcIiArIGtleSArIFwiKFxcL3wkKVwiLCBcImdcIiksIHJvdXRlUGFyYW1zW2tleV0gKyBcIiQxXCIpXG4gICAgfSk7XG4gICAgaWYgKHB1YnN1Yikge1xuICAgICAgaWYgKHVybC5tYXRjaCgvZmsvKSkge1xuICAgICAgICBsZXQgYXJyID0gdXJsLnNwbGl0KCcvJyk7IGFyci5wb3AoKTtcbiAgICAgICAgdXJsID0gYXJyLmpvaW4oJy8nKTtcbiAgICAgIH1cbiAgICAgIGxldCBldmVudDogc3RyaW5nID0gKGBbJHttZXRob2R9XSR7dXJsfWApLnJlcGxhY2UoL1xcPy8sICcnKTtcbiAgICAgIGxldCBzdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24ub24oZXZlbnQsIChyZXM6IGFueSkgPT4gc3ViamVjdC5uZXh0KHJlcykpO1xuICAgICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoeyBlbmNvZGVyOiBuZXcgQ3VzdG9tUXVlcnlFbmNvZGVySGVscGVyKCkgfSk7XG4gICAgICAvLyBIZWFkZXJzIHRvIGJlIHNlbnRcbiAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgLy8gQXV0aGVudGljYXRlIHJlcXVlc3RcbiAgICAgIGhlYWRlcnMgPSB0aGlzLmF1dGhlbnRpY2F0ZSh1cmwsIGhlYWRlcnMpO1xuICAgICAgLy8gQm9keSBmaXggZm9yIGJ1aWx0IGluIHJlbW90ZSBtZXRob2RzIHVzaW5nIFwiZGF0YVwiLCBcIm9wdGlvbnNcIiBvciBcImNyZWRlbnRpYWxzXG4gICAgICAvLyB0aGF0IGFyZSB0aGUgYWN0dWFsIGJvZHksIEN1c3RvbSByZW1vdGUgbWV0aG9kIHByb3BlcnRpZXMgYXJlIGRpZmZlcmVudCBhbmQgbmVlZFxuICAgICAgLy8gdG8gYmUgd3JhcHBlZCBpbnRvIGEgYm9keSBvYmplY3RcbiAgICAgIGxldCBib2R5OiBhbnk7XG4gICAgICBsZXQgcG9zdEJvZHlLZXlzID0gdHlwZW9mIHBvc3RCb2R5ID09PSAnb2JqZWN0JyA/IE9iamVjdC5rZXlzKHBvc3RCb2R5KSA6IFtdXG4gICAgICBpZiAocG9zdEJvZHlLZXlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBib2R5ID0gcG9zdEJvZHlbcG9zdEJvZHlLZXlzLnNoaWZ0KCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9keSA9IHBvc3RCb2R5O1xuICAgICAgfVxuICAgICAgXG4gICAgICBsZXQgcXVlcnlTdHJpbmc6IHN0cmluZyA9ICcnO1xuXG4gICAgICAvLyBTZXBhcmF0ZSBmaWx0ZXIgb2JqZWN0IGZyb20gdXJsIHBhcmFtcyBhbmQgYWRkIHRvIHNlYXJjaCBxdWVyeVxuICAgICAgaWYgKHVybFBhcmFtcy5maWx0ZXIpIHtcbiAgICAgICAgaWYgKExvb3BCYWNrQ29uZmlnLmlzSGVhZGVyc0ZpbHRlcmluZ1NldCgpKSB7XG4gICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKCdmaWx0ZXInLCBKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMuZmlsdGVyKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVlcnlTdHJpbmcgPSBgP2ZpbHRlcj0ke2VuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMuZmlsdGVyKSl9YDtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdXJsUGFyYW1zLmZpbHRlcjtcbiAgICAgIH1cblxuICAgICAgLy8gU2VwYXJhdGUgd2hlcmUgb2JqZWN0IGZyb20gdXJsIHBhcmFtcyBhbmQgYWRkIHRvIHNlYXJjaCBxdWVyeVxuICAgICAgaWYgKHVybFBhcmFtcy53aGVyZSkge1xuICAgICAgICBpZiAoTG9vcEJhY2tDb25maWcuaXNIZWFkZXJzV2hlcmVTZXQoKSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgIENPREUgQkVMT1cgV0lMTCBHRU5FUkFURSBUSEUgRk9MTE9XSU5HIElTU1VFUzpcbiAgICAgICAgICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9tZWFuLWV4cGVydC1vZmZpY2lhbC9sb29wYmFjay1zZGstYnVpbGRlci9pc3N1ZXMvMzU2XG4gICAgICAgICAgLSBodHRwczovL2dpdGh1Yi5jb20vbWVhbi1leHBlcnQtb2ZmaWNpYWwvbG9vcGJhY2stc2RrLWJ1aWxkZXIvaXNzdWVzLzMyOCBcbiAgICAgICAgICAqKi9cbiAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoJ3doZXJlJywgSlNPTi5zdHJpbmdpZnkodXJsUGFyYW1zLndoZXJlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVlcnlTdHJpbmcgPSBgP3doZXJlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHVybFBhcmFtcy53aGVyZSkpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHVybFBhcmFtcy53aGVyZTtcbiAgICAgIH1cbiAgICBcbiAgICAgIGlmICh0eXBlb2YgY3VzdG9tSGVhZGVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoZWFkZXJzID0gY3VzdG9tSGVhZGVycyhoZWFkZXJzKTtcbiAgICAgIH1cbi8qIGVuaGFuY2VtZW50L2NvbmZpZ3VyZS13aGVyZS1oZWFkZXJzXG4gICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zZXRKU09OKHVybFBhcmFtcyk7XG4gICAgICBsZXQgcmVxdWVzdDogUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KFxuICAgICAgICBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgICAgIGhlYWRlcnMgICAgICAgIDogaGVhZGVycyxcbiAgICAgICAgICBtZXRob2QgICAgICAgICA6IG1ldGhvZCxcbiAgICAgICAgICB1cmwgICAgICAgICAgICA6IGAke3VybH0ke3F1ZXJ5U3RyaW5nfWAsXG4gICAgICAgICAgc2VhcmNoICAgICAgICAgOiBPYmplY3Qua2V5cyh1cmxQYXJhbXMpLmxlbmd0aCA+IDAgPyB0aGlzLnNlYXJjaFBhcmFtcy5nZXRVUkxTZWFyY2hQYXJhbXMoKSA6IG51bGwsXG4gICAgICAgICAgYm9keSAgICAgICAgICAgOiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBMb29wQmFja0NvbmZpZy5nZXRSZXF1ZXN0T3B0aW9uc0NyZWRlbnRpYWxzKClcbiAgICAgICAgfSlcbiAgICAgICk7XG5UT0RPIEZpeCBNZXJnZSBDb25mbGljdCAqL1xuICAgICAgT2JqZWN0LmtleXModXJsUGFyYW1zKS5mb3JFYWNoKHBhcmFtS2V5ID0+IHtcbiAgICAgICAgbGV0IHBhcmFtVmFsdWUgPSB1cmxQYXJhbXNbcGFyYW1LZXldO1xuICAgICAgICBwYXJhbVZhbHVlID0gdHlwZW9mIHBhcmFtVmFsdWUgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkocGFyYW1WYWx1ZSkgOiBwYXJhbVZhbHVlO1xuICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQocGFyYW1LZXksIHBhcmFtVmFsdWUpO1xuICAgICAgfSk7XG4gICAgICBsZXQgcmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdChtZXRob2QsIGAke3VybH0ke3F1ZXJ5U3RyaW5nfWAsIGJvZHksIHtcbiAgICAgICAgaGVhZGVycyAgICAgICAgOiBoZWFkZXJzLFxuICAgICAgICBwYXJhbXMgICAgICAgICA6IGh0dHBQYXJhbXMsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogTG9vcEJhY2tDb25maWcuZ2V0UmVxdWVzdE9wdGlvbnNDcmVkZW50aWFscygpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KS5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpLFxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHJlcy5ib2R5KSxcbiAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4gdGhpcy5lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZSkpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBhdXRoZW50aWNhdGVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFNlcnZlciBVUkxcbiAgICogQHBhcmFtIHtIZWFkZXJzfSBoZWFkZXJzIEhUVFAgSGVhZGVyc1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCB0cnkgdG8gYXV0aGVudGljYXRlIHVzaW5nIGVpdGhlciBhbiBhY2Nlc3NfdG9rZW4gb3IgYmFzaWMgaHR0cCBhdXRoXG4gICAqL1xuICBwdWJsaWMgYXV0aGVudGljYXRlPFQ+KHVybDogc3RyaW5nLCBoZWFkZXJzOiBIdHRwSGVhZGVycyk6IEh0dHBIZWFkZXJzIHtcbiAgICBpZiAodGhpcy5hdXRoLmdldEFjY2Vzc1Rva2VuSWQoKSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFxuICAgICAgICAnQXV0aG9yaXphdGlvbicsXG4gICAgICAgIExvb3BCYWNrQ29uZmlnLmdldEF1dGhQcmVmaXgoKSArIHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbklkKClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHBhcmFtIHtUfSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGNyZWF0ZSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBjcmVhdGU8VD4oZGF0YTogVCwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBvbkNyZWF0ZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7VFtdfSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlIGFycmF5XG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgcHVic3ViIG9uY3JlYXRlIG1hbnkgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25DcmVhdGU8VD4oZGF0YTogVFtdKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgdHJ1ZSlcbiAgICAucGlwZShtYXAoKGRhdHVtOiBUW10pID0+IGRhdHVtLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNyZWF0ZU1hbnlcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcGFyYW0ge1RbXX0gZGF0YSBHZW5lcmljIGRhdGEgdHlwZSBhcnJheVxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGNyZWF0ZSBtYW55IG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGNyZWF0ZU1hbnk8VD4oZGF0YTogVFtdLCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0dW06IFRbXSkgPT4gZGF0dW0ubWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25DcmVhdGVNYW55XG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHBhcmFtIHtUW119IGRhdGEgR2VuZXJpYyBkYXRhIHR5cGUgYXJyYXlcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBjcmVhdGUgbWFueSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvbkNyZWF0ZU1hbnk8VD4oZGF0YTogVFtdKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgdHJ1ZSlcbiAgICAucGlwZShtYXAoKGRhdHVtOiBUW10pID0+IGRhdHVtLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpbmRCeUlkXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHBhcmFtIHthbnl9IGRhdGEgR2VuZXJpYyBkYXRhIHR5cGVcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgZmluZEJ5SWQgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQ8VD4oaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlcikgX3VybFBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCBfdXJsUGFyYW1zLCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBmaW5kXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUWys+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBmaW5kIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGZpbmQ8VD4oZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHsgZmlsdGVyIH0sIHVuZGVmaW5lZCwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdHVtOiBUW10pID0+IGRhdHVtLm1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGV4aXN0c1xuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgZXhpc3RzIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGV4aXN0czxUPihpZDogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnOmlkL2V4aXN0cydcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZmluZE9uZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGZpbmRPbmUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgZmluZE9uZTxUPihmaWx0ZXI6IExvb3BCYWNrRmlsdGVyID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICdmaW5kT25lJ1xuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHsgZmlsdGVyIH0sIHVuZGVmaW5lZCwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZUFsbFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgdXBkYXRlQWxsIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbDxUPih3aGVyZTogYW55ID0ge30sIGRhdGE6IFQsIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8eyBjb3VudDogJ251bWJlcicgfT4ge1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUpIF91cmxQYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJ3VwZGF0ZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCBfdXJsUGFyYW1zLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25VcGRhdGVBbGxcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHB1YnN1YiBvblVwZGF0ZUFsbCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvblVwZGF0ZUFsbDxUPih3aGVyZTogYW55ID0ge30sIGRhdGE6IFQpOiBPYnNlcnZhYmxlPHsgY291bnQ6ICdudW1iZXInIH0+IHtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICd1cGRhdGUnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIHRydWUpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlbGV0ZUJ5SWRcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBkZWxldGVCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQ8VD4oaWQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uRGVsZXRlQnlJZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHB1YnN1YiBvbkRlbGV0ZUJ5SWQgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25EZWxldGVCeUlkPFQ+KGlkOiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdERUxFVEUnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnOmlkJ1xuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgY291bnRcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHsgY291bnQ6IG51bWJlciB9Pn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgY291bnQgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPHsgY291bnQ6IG51bWJlciB9PiB7XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICdjb3VudCdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCBfdXJsUGFyYW1zLCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZUF0dHJpYnV0ZXNcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyB1cGRhdGVBdHRyaWJ1dGVzIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUF0dHJpYnV0ZXM8VD4oaWQ6IGFueSwgZGF0YTogVCwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25VcGRhdGVBdHRyaWJ1dGVzXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgb25VcGRhdGVBdHRyaWJ1dGVzIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIG9uVXBkYXRlQXR0cmlidXRlczxUPihpZDogYW55LCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBzZXJ0XG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgdXBzZXJ0IG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHVwc2VydDxUPihkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBvblVwc2VydFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHB1YnN1YiBvblVwc2VydCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvblVwc2VydDxUPihkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBzZXJ0UGF0Y2hcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyB1cHNlcnQgbWV0aG9kIHVzaW5nIHBhdGNoIGh0dHAgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0UGF0Y2g8VD4oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBvblVwc2VydFBhdGNoXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgcHVic3ViIG9uVXBzZXJ0UGF0Y2ggbWV0aG9kIHVzaW5nIHBhdGNoIGh0dHAgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgb25VcHNlcnRQYXRjaDxUPihkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCB1cHNlcnRXaXRoV2hlcmVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyB1cHNlcnRXaXRoV2hlcmUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0V2l0aFdoZXJlPFQ+KHdoZXJlOiBhbnkgPSB7fSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUpIF91cmxQYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJ3Vwc2VydFdpdGhXaGVyZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCBfdXJsUGFyYW1zLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uVXBzZXJ0V2l0aFdoZXJlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgcHVic3ViIG9uVXBzZXJ0V2l0aFdoZXJlIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIG9uVXBzZXJ0V2l0aFdoZXJlPFQ+KHdoZXJlOiBhbnkgPSB7fSwgZGF0YTogYW55ID0ge30pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICd1cHNlcnRXaXRoV2hlcmUnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIHRydWUpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZXBsYWNlT3JDcmVhdGVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyByZXBsYWNlT3JDcmVhdGUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgcmVwbGFjZU9yQ3JlYXRlPFQ+KGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJ3JlcGxhY2VPckNyZWF0ZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25SZXBsYWNlT3JDcmVhdGVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBvblJlcGxhY2VPckNyZWF0ZSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvblJlcGxhY2VPckNyZWF0ZTxUPihkYXRhOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAncmVwbGFjZU9yQ3JlYXRlJ1xuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIHRydWUpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZXBsYWNlQnlJZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHJlcGxhY2VCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHJlcGxhY2VCeUlkPFQ+KGlkOiBhbnksIGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCcsICdyZXBsYWNlJ1xuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBvblJlcGxhY2VCeUlkXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgb25SZXBsYWNlQnlJZCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBvblJlcGxhY2VCeUlkPFQ+KGlkOiBhbnksIGRhdGE6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnLCAncmVwbGFjZSdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHsgZGF0YSB9LCB0cnVlKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlQ2hhbmdlU3RyZWFtXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBjcmVhdGVDaGFuZ2VTdHJlYW0gbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ2hhbmdlU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgIGlmICh0eXBlb2YgRXZlbnRTb3VyY2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBsZXQgZW1pdCAgID0gKG1zZzogYW55KSA9PiBzdWJqZWN0Lm5leHQoSlNPTi5wYXJzZShtc2cuZGF0YSkpO1xuICAgICAgdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZShbXG4gICAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAgICdjaGFuZ2Utc3RyZWFtJ1xuICAgICAgXS5qb2luKCcvJykpO1xuICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2RhdGEnLCBlbWl0KTtcbiAgICAgIHNvdXJjZS5vbmVycm9yID0gZW1pdDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdTREsgQnVpbGRlcjogRXZlbnRTb3VyY2UgaXMgbm90IHN1cHBvcnRlZCcpOyBcbiAgICB9XG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0TW9kZWxOYW1lXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQWJzdHJhY3QgZ2V0TW9kZWxOYW1lIG1ldGhvZFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TW9kZWxOYW1lKCk6IHN0cmluZztcbn1cbiJdfQ==