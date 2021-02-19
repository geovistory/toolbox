(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-sdk-lb4', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-sdk-lb4'] = {}), global.ng.core, global.ng.common.http));
}(this, (function (exports, core, http) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/configuration.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ConfigurationParameters() { }
    if (false) {
        /**
         * @deprecated Since 5.0. Use credentials instead
         * @type {?|undefined}
         */
        ConfigurationParameters.prototype.apiKeys;
        /** @type {?|undefined} */
        ConfigurationParameters.prototype.username;
        /** @type {?|undefined} */
        ConfigurationParameters.prototype.password;
        /**
         * @deprecated Since 5.0. Use credentials instead
         * @type {?|undefined}
         */
        ConfigurationParameters.prototype.accessToken;
        /** @type {?|undefined} */
        ConfigurationParameters.prototype.basePath;
        /** @type {?|undefined} */
        ConfigurationParameters.prototype.withCredentials;
        /** @type {?|undefined} */
        ConfigurationParameters.prototype.encoder;
        /**
         * The keys are the names in the securitySchemes section of the OpenAPI
         * document. They should map to the value used for authentication
         * minus any standard prefixes such as 'Basic' or 'Bearer'.
         * @type {?|undefined}
         */
        ConfigurationParameters.prototype.credentials;
    }
    var Configuration = /** @class */ (function () {
        function Configuration(configurationParameters) {
            var _this = this;
            if (configurationParameters === void 0) { configurationParameters = {}; }
            this.apiKeys = configurationParameters.apiKeys;
            this.username = configurationParameters.username;
            this.password = configurationParameters.password;
            this.accessToken = configurationParameters.accessToken;
            this.basePath = configurationParameters.basePath;
            this.withCredentials = configurationParameters.withCredentials;
            this.encoder = configurationParameters.encoder;
            if (configurationParameters.credentials) {
                this.credentials = configurationParameters.credentials;
            }
            else {
                this.credentials = {};
            }
            // init default accesstoken credential
            if (!this.credentials['accesstoken']) {
                this.credentials['accesstoken'] = (/**
                 * @return {?}
                 */
                function () {
                    return _this.apiKeys['accesstoken'] || _this.apiKeys['authorization'];
                });
            }
            // init default jwt credential
            if (!this.credentials['jwt']) {
                this.credentials['jwt'] = (/**
                 * @return {?}
                 */
                function () {
                    return typeof _this.accessToken === 'function'
                        ? _this.accessToken()
                        : _this.accessToken;
                });
            }
        }
        /**
         * Select the correct content-type to use for a request.
         * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param contentTypes - the array of content types that are available for selection
         * @returns the selected content-type or <code>undefined</code> if no selection could be made.
         */
        /**
         * Select the correct content-type to use for a request.
         * Uses {\@link Configuration#isJsonMime} to determine the correct content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param {?} contentTypes - the array of content types that are available for selection
         * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
         */
        Configuration.prototype.selectHeaderContentType = /**
         * Select the correct content-type to use for a request.
         * Uses {\@link Configuration#isJsonMime} to determine the correct content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param {?} contentTypes - the array of content types that are available for selection
         * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
         */
        function (contentTypes) {
            var _this = this;
            if (contentTypes.length === 0) {
                return undefined;
            }
            /** @type {?} */
            var type = contentTypes.find((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return _this.isJsonMime(x); }));
            if (type === undefined) {
                return contentTypes[0];
            }
            return type;
        };
        /**
         * Select the correct accept content-type to use for a request.
         * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param accepts - the array of content types that are available for selection.
         * @returns the selected content-type or <code>undefined</code> if no selection could be made.
         */
        /**
         * Select the correct accept content-type to use for a request.
         * Uses {\@link Configuration#isJsonMime} to determine the correct accept content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param {?} accepts - the array of content types that are available for selection.
         * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
         */
        Configuration.prototype.selectHeaderAccept = /**
         * Select the correct accept content-type to use for a request.
         * Uses {\@link Configuration#isJsonMime} to determine the correct accept content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param {?} accepts - the array of content types that are available for selection.
         * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
         */
        function (accepts) {
            var _this = this;
            if (accepts.length === 0) {
                return undefined;
            }
            /** @type {?} */
            var type = accepts.find((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return _this.isJsonMime(x); }));
            if (type === undefined) {
                return accepts[0];
            }
            return type;
        };
        /**
         * Check if the given MIME is a JSON MIME.
         * JSON MIME examples:
         *   application/json
         *   application/json; charset=UTF8
         *   APPLICATION/JSON
         *   application/vnd.company+json
         * @param mime - MIME (Multipurpose Internet Mail Extensions)
         * @return True if the given MIME is JSON, false otherwise.
         */
        /**
         * Check if the given MIME is a JSON MIME.
         * JSON MIME examples:
         *   application/json
         *   application/json; charset=UTF8
         *   APPLICATION/JSON
         *   application/vnd.company+json
         * @param {?} mime - MIME (Multipurpose Internet Mail Extensions)
         * @return {?} True if the given MIME is JSON, false otherwise.
         */
        Configuration.prototype.isJsonMime = /**
         * Check if the given MIME is a JSON MIME.
         * JSON MIME examples:
         *   application/json
         *   application/json; charset=UTF8
         *   APPLICATION/JSON
         *   application/vnd.company+json
         * @param {?} mime - MIME (Multipurpose Internet Mail Extensions)
         * @return {?} True if the given MIME is JSON, false otherwise.
         */
        function (mime) {
            /** @type {?} */
            var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
            return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
        };
        /**
         * @param {?} key
         * @return {?}
         */
        Configuration.prototype.lookupCredential = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var value = this.credentials[key];
            return typeof value === 'function'
                ? value()
                : value;
        };
        return Configuration;
    }());
    if (false) {
        /**
         * @deprecated Since 5.0. Use credentials instead
         * @type {?}
         */
        Configuration.prototype.apiKeys;
        /** @type {?} */
        Configuration.prototype.username;
        /** @type {?} */
        Configuration.prototype.password;
        /**
         * @deprecated Since 5.0. Use credentials instead
         * @type {?}
         */
        Configuration.prototype.accessToken;
        /** @type {?} */
        Configuration.prototype.basePath;
        /** @type {?} */
        Configuration.prototype.withCredentials;
        /** @type {?} */
        Configuration.prototype.encoder;
        /**
         * The keys are the names in the securitySchemes section of the OpenAPI
         * document. They should map to the value used for authentication
         * minus any standard prefixes such as 'Basic' or 'Bearer'.
         * @type {?}
         */
        Configuration.prototype.credentials;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ApiModule = /** @class */ (function () {
        function ApiModule(parentModule, http) {
            if (parentModule) {
                throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
            }
            if (!http) {
                throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                    'See also https://github.com/angular/angular/issues/20575');
            }
        }
        /**
         * @param {?} configurationFactory
         * @return {?}
         */
        ApiModule.forRoot = /**
         * @param {?} configurationFactory
         * @return {?}
         */
        function (configurationFactory) {
            return {
                ngModule: ApiModule,
                providers: [{ provide: Configuration, useFactory: configurationFactory }]
            };
        };
        ApiModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: [],
                        providers: []
                    },] }
        ];
        /** @nocollapse */
        ApiModule.ctorParameters = function () { return [
            { type: ApiModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: http.HttpClient, decorators: [{ type: core.Optional }] }
        ]; };
        return ApiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/encoder.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Custom HttpParameterCodec
     * Workaround for https://github.com/angular/angular/issues/18261
     */
    var /**
     * Custom HttpParameterCodec
     * Workaround for https://github.com/angular/angular/issues/18261
     */
    CustomHttpParameterCodec = /** @class */ (function () {
        function CustomHttpParameterCodec() {
        }
        /**
         * @param {?} k
         * @return {?}
         */
        CustomHttpParameterCodec.prototype.encodeKey = /**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            return encodeURIComponent(k);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        CustomHttpParameterCodec.prototype.encodeValue = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return encodeURIComponent(v);
        };
        /**
         * @param {?} k
         * @return {?}
         */
        CustomHttpParameterCodec.prototype.decodeKey = /**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            return decodeURIComponent(k);
        };
        /**
         * @param {?} v
         * @return {?}
         */
        CustomHttpParameterCodec.prototype.decodeValue = /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            return decodeURIComponent(v);
        };
        return CustomHttpParameterCodec;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/variables.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var BASE_PATH = new core.InjectionToken('basePath');
    /** @type {?} */
    var COLLECTION_FORMATS = {
        'csv': ',',
        'tsv': '   ',
        'ssv': ' ',
        'pipes': '|'
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/account.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AccountService = /** @class */ (function () {
        function AccountService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        AccountService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        AccountService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} email
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AccountService.prototype.accountControllerForgotPassword = /**
         * @param {?} email
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (email, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (email === null || email === undefined) {
                throw new Error('Required parameter email was null or undefined when calling accountControllerForgotPassword.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (email !== undefined && email !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (email)), 'email');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/forgot-password", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} loginRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AccountService.prototype.accountControllerLogin = /**
         * @param {?=} loginRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (loginRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/login", loginRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} resetPasswordRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AccountService.prototype.accountControllerResetPassword = /**
         * @param {?=} resetPasswordRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (resetPasswordRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/reset-password", resetPasswordRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} signupRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AccountService.prototype.accountControllerSignUp = /**
         * @param {?=} signupRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (signupRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/signup", signupRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} accountId
         * @param {?=} verificationToken
         * @param {?=} redirectOnSuccess
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AccountService.prototype.accountControllerVerifyEmail = /**
         * @param {?=} accountId
         * @param {?=} verificationToken
         * @param {?=} redirectOnSuccess
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (accountId, verificationToken, redirectOnSuccess, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (accountId !== undefined && accountId !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (accountId)), 'accountId');
            }
            if (verificationToken !== undefined && verificationToken !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (verificationToken)), 'verificationToken');
            }
            if (redirectOnSuccess !== undefined && redirectOnSuccess !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (redirectOnSuccess)), 'redirectOnSuccess');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/verify-email", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AccountService.prototype.accountControllerWhoAmI = /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/whoAmI", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        AccountService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AccountService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ AccountService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AccountService_Factory() { return new AccountService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: AccountService, providedIn: "root" });
        return AccountService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AccountService.prototype.basePath;
        /** @type {?} */
        AccountService.prototype.defaultHeaders;
        /** @type {?} */
        AccountService.prototype.configuration;
        /** @type {?} */
        AccountService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        AccountService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/analysis.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AnalysisService = /** @class */ (function () {
        function AnalysisService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        AnalysisService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        AnalysisService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} pkProject
         * @param {?=} requestBody
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerBulkDelete = /**
         * @param {?=} pkProject
         * @param {?=} requestBody
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/analysis/bulk-delete", requestBody, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} pkProject
         * @param {?=} proAnalysis
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerBulkUpsert = /**
         * @param {?=} pkProject
         * @param {?=} proAnalysis
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proAnalysis, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/analysis/bulk-upsert", proAnalysis, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} pkProject
         * @param {?=} pkEntity
         * @param {?=} version
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerGetVersion = /**
         * @param {?=} pkProject
         * @param {?=} pkEntity
         * @param {?=} version
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, version, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            if (version !== undefined && version !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (version)), 'version');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/analysis/get-version", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} analysisMapRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerMapRun = /**
         * @param {?=} analysisMapRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (analysisMapRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/analysis/map-run", analysisMapRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerOfProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling analysisControllerOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/analysis/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} analysisTableExportRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerTableExport = /**
         * @param {?=} analysisTableExportRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (analysisTableExportRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/analysis/table-export", analysisTableExportRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} analysisTableRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerTableRun = /**
         * @param {?=} analysisTableRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (analysisTableRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/analysis/table-run", analysisTableRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} analysisTimeChartRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        AnalysisService.prototype.analysisControllerTimeChartRun = /**
         * @param {?=} analysisTimeChartRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (analysisTimeChartRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/analysis/time-chart-run", analysisTimeChartRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        AnalysisService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AnalysisService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ AnalysisService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AnalysisService_Factory() { return new AnalysisService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: AnalysisService, providedIn: "root" });
        return AnalysisService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AnalysisService.prototype.basePath;
        /** @type {?} */
        AnalysisService.prototype.defaultHeaders;
        /** @type {?} */
        AnalysisService.prototype.configuration;
        /** @type {?} */
        AnalysisService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        AnalysisService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/contentTree.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContentTreeService = /** @class */ (function () {
        function ContentTreeService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ContentTreeService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ContentTreeService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkExpressionEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ContentTreeService.prototype.contentTreeControllerGetContentTree = /**
         * @param {?} pkProject
         * @param {?} pkExpressionEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkExpressionEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling contentTreeControllerGetContentTree.');
            }
            if (pkExpressionEntity === null || pkExpressionEntity === undefined) {
                throw new Error('Required parameter pkExpressionEntity was null or undefined when calling contentTreeControllerGetContentTree.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkExpressionEntity !== undefined && pkExpressionEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkExpressionEntity)), 'pkExpressionEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/get-content-tree", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ContentTreeService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ContentTreeService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ContentTreeService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ContentTreeService_Factory() { return new ContentTreeService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ContentTreeService, providedIn: "root" });
        return ContentTreeService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ContentTreeService.prototype.basePath;
        /** @type {?} */
        ContentTreeService.prototype.defaultHeaders;
        /** @type {?} */
        ContentTreeService.prototype.configuration;
        /** @type {?} */
        ContentTreeService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ContentTreeService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/datChunk.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatChunkService = /** @class */ (function () {
        function DatChunkService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DatChunkService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DatChunkService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatChunkService.prototype.datChunkFindById = /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling datChunkFindById.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatChunks/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatChunkService.prototype.datChunkOfDigital = /**
         * @param {?} pkProject
         * @param {?} pkDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkDigital, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling datChunkOfDigital.');
            }
            if (pkDigital === null || pkDigital === undefined) {
                throw new Error('Required parameter pkDigital was null or undefined when calling datChunkOfDigital.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkDigital !== undefined && pkDigital !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkDigital)), 'pkDigital');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatChunks/of-digital", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DatChunkService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DatChunkService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DatChunkService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DatChunkService_Factory() { return new DatChunkService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DatChunkService, providedIn: "root" });
        return DatChunkService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DatChunkService.prototype.basePath;
        /** @type {?} */
        DatChunkService.prototype.defaultHeaders;
        /** @type {?} */
        DatChunkService.prototype.configuration;
        /** @type {?} */
        DatChunkService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DatChunkService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/datChunkController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatChunkControllerService = /** @class */ (function () {
        function DatChunkControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DatChunkControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DatChunkControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatChunkControllerService.prototype.datChunkControllerFindById = /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling datChunkControllerFindById.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/dat-chunks/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DatChunkControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DatChunkControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DatChunkControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DatChunkControllerService_Factory() { return new DatChunkControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DatChunkControllerService, providedIn: "root" });
        return DatChunkControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DatChunkControllerService.prototype.basePath;
        /** @type {?} */
        DatChunkControllerService.prototype.defaultHeaders;
        /** @type {?} */
        DatChunkControllerService.prototype.configuration;
        /** @type {?} */
        DatChunkControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DatChunkControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/datColumn.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatColumnService = /** @class */ (function () {
        function DatColumnService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DatColumnService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DatColumnService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatColumnService.prototype.datColumnOfDigital = /**
         * @param {?} pkProject
         * @param {?} pkDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkDigital, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling datColumnOfDigital.');
            }
            if (pkDigital === null || pkDigital === undefined) {
                throw new Error('Required parameter pkDigital was null or undefined when calling datColumnOfDigital.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkDigital !== undefined && pkDigital !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkDigital)), 'pkDigital');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatColumns/of-digital", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DatColumnService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DatColumnService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DatColumnService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DatColumnService_Factory() { return new DatColumnService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DatColumnService, providedIn: "root" });
        return DatColumnService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DatColumnService.prototype.basePath;
        /** @type {?} */
        DatColumnService.prototype.defaultHeaders;
        /** @type {?} */
        DatColumnService.prototype.configuration;
        /** @type {?} */
        DatColumnService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DatColumnService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/datDigital.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatDigitalService = /** @class */ (function () {
        function DatDigitalService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DatDigitalService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DatDigitalService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} requestBody
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatDigitalService.prototype.datDigitalBulkDelete = /**
         * @param {?} requestBody
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (requestBody === null || requestBody === undefined) {
                throw new Error('Required parameter requestBody was null or undefined when calling datDigitalBulkDelete.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/DatDigitals/delete-delete", requestBody, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkNamespace
         * @param {?} datDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatDigitalService.prototype.datDigitalBulkUpsert = /**
         * @param {?} pkNamespace
         * @param {?} datDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkNamespace, datDigital, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkNamespace === null || pkNamespace === undefined) {
                throw new Error('Required parameter pkNamespace was null or undefined when calling datDigitalBulkUpsert.');
            }
            if (datDigital === null || datDigital === undefined) {
                throw new Error('Required parameter datDigital was null or undefined when calling datDigitalBulkUpsert.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkNamespace !== undefined && pkNamespace !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkNamespace)), 'pkNamespace');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/DatDigitals/bulk-upsert", datDigital, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatDigitalService.prototype.datDigitalFindById = /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling datDigitalFindById.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatDigitals/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} body
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatDigitalService.prototype.datDigitalGetTablePage = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} body
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling datDigitalGetTablePage.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling datDigitalGetTablePage.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/DatDigitals/getTablePage", body, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatDigitalService.prototype.datDigitalGetVersion = /**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkEntity, entityVersion, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling datDigitalGetVersion.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            if (entityVersion !== undefined && entityVersion !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (entityVersion)), 'entityVersion');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatDigitals/get-version", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DatDigitalService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DatDigitalService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DatDigitalService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DatDigitalService_Factory() { return new DatDigitalService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DatDigitalService, providedIn: "root" });
        return DatDigitalService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DatDigitalService.prototype.basePath;
        /** @type {?} */
        DatDigitalService.prototype.defaultHeaders;
        /** @type {?} */
        DatDigitalService.prototype.configuration;
        /** @type {?} */
        DatDigitalService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DatDigitalService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/datNamespace.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatNamespaceService = /** @class */ (function () {
        function DatNamespaceService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DatNamespaceService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DatNamespaceService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatNamespaceService.prototype.datNamespaceByProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling datNamespaceByProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatNamespaces/find-by-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatNamespaceService.prototype.datNamespaceFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatNamespaces", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DatNamespaceService.prototype.datNamespaceFindById = /**
         * @param {?} id
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling datNamespaceFindById.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DatNamespaces/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DatNamespaceService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DatNamespaceService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DatNamespaceService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DatNamespaceService_Factory() { return new DatNamespaceService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DatNamespaceService, providedIn: "root" });
        return DatNamespaceService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DatNamespaceService.prototype.basePath;
        /** @type {?} */
        DatNamespaceService.prototype.defaultHeaders;
        /** @type {?} */
        DatNamespaceService.prototype.configuration;
        /** @type {?} */
        DatNamespaceService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DatNamespaceService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/dfhClassController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfhClassControllerService = /** @class */ (function () {
        function DfhClassControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DfhClassControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DfhClassControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhClassControllerService.prototype.dfhClassControllerOfProject = /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/classes/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DfhClassControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DfhClassControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DfhClassControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DfhClassControllerService_Factory() { return new DfhClassControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DfhClassControllerService, providedIn: "root" });
        return DfhClassControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DfhClassControllerService.prototype.basePath;
        /** @type {?} */
        DfhClassControllerService.prototype.defaultHeaders;
        /** @type {?} */
        DfhClassControllerService.prototype.configuration;
        /** @type {?} */
        DfhClassControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DfhClassControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/dfhLabel.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfhLabelService = /** @class */ (function () {
        function DfhLabelService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DfhLabelService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DfhLabelService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhLabelService.prototype.dfhLabelOfProject = /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DfhLabels/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DfhLabelService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DfhLabelService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DfhLabelService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DfhLabelService_Factory() { return new DfhLabelService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DfhLabelService, providedIn: "root" });
        return DfhLabelService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DfhLabelService.prototype.basePath;
        /** @type {?} */
        DfhLabelService.prototype.defaultHeaders;
        /** @type {?} */
        DfhLabelService.prototype.configuration;
        /** @type {?} */
        DfhLabelService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DfhLabelService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/dfhProfile.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfhProfileService = /** @class */ (function () {
        function DfhProfileService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DfhProfileService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DfhProfileService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhProfileService.prototype.dfhProfileDeactivateProfileForProject = /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkProfile, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileDeactivateProfileForProject.');
            }
            if (pkProfile === null || pkProfile === undefined) {
                throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileDeactivateProfileForProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkProfile !== undefined && pkProfile !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProfile)), 'pkProfile');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/DfhProfiles/deactivate-ontome-profile-for-geovistory-project", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} requestedLanguage
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhProfileService.prototype.dfhProfileGetActivationReport = /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} requestedLanguage
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkProfile, requestedLanguage, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileGetActivationReport.');
            }
            if (pkProfile === null || pkProfile === undefined) {
                throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileGetActivationReport.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkProfile !== undefined && pkProfile !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProfile)), 'pkProfile');
            }
            if (requestedLanguage !== undefined && requestedLanguage !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (requestedLanguage)), 'requestedLanguage');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/DfhProfiles/get-activation-report", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhProfileService.prototype.dfhProfileGetDeactivationReport = /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkProfile, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileGetDeactivationReport.');
            }
            if (pkProfile === null || pkProfile === undefined) {
                throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileGetDeactivationReport.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkProfile !== undefined && pkProfile !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProfile)), 'pkProfile');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/DfhProfiles/get-deactivation-report", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhProfileService.prototype.dfhProfileOfProject = /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/DfhProfiles/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} requestedLanguage
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhProfileService.prototype.dfhProfileUpdateAndAddToProject = /**
         * @param {?} pkProject
         * @param {?} pkProfile
         * @param {?=} requestedLanguage
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkProfile, requestedLanguage, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileUpdateAndAddToProject.');
            }
            if (pkProfile === null || pkProfile === undefined) {
                throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileUpdateAndAddToProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkProfile !== undefined && pkProfile !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProfile)), 'pkProfile');
            }
            if (requestedLanguage !== undefined && requestedLanguage !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (requestedLanguage)), 'requestedLanguage');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/DfhProfiles/update-from-ontome-and-add-to-project", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProfile
         * @param {?=} requestedLanguage
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhProfileService.prototype.dfhProfileUpdateFromOntoMe = /**
         * @param {?} pkProfile
         * @param {?=} requestedLanguage
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProfile, requestedLanguage, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProfile === null || pkProfile === undefined) {
                throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileUpdateFromOntoMe.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProfile !== undefined && pkProfile !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProfile)), 'pkProfile');
            }
            if (requestedLanguage !== undefined && requestedLanguage !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (requestedLanguage)), 'requestedLanguage');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/DfhProfiles/update-from-ontome", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DfhProfileService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DfhProfileService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DfhProfileService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DfhProfileService_Factory() { return new DfhProfileService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DfhProfileService, providedIn: "root" });
        return DfhProfileService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DfhProfileService.prototype.basePath;
        /** @type {?} */
        DfhProfileService.prototype.defaultHeaders;
        /** @type {?} */
        DfhProfileService.prototype.configuration;
        /** @type {?} */
        DfhProfileService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DfhProfileService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/dfhPropertyController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfhPropertyControllerService = /** @class */ (function () {
        function DfhPropertyControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        DfhPropertyControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        DfhPropertyControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        DfhPropertyControllerService.prototype.dfhPropertyControllerOfProject = /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/properties/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        DfhPropertyControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DfhPropertyControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ DfhPropertyControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DfhPropertyControllerService_Factory() { return new DfhPropertyControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DfhPropertyControllerService, providedIn: "root" });
        return DfhPropertyControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DfhPropertyControllerService.prototype.basePath;
        /** @type {?} */
        DfhPropertyControllerService.prototype.defaultHeaders;
        /** @type {?} */
        DfhPropertyControllerService.prototype.configuration;
        /** @type {?} */
        DfhPropertyControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        DfhPropertyControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/factoidController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FactoidControllerService = /** @class */ (function () {
        function FactoidControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        FactoidControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        FactoidControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} factoidNumber
         * @param {?} page
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        FactoidControllerService.prototype.factoidControllerFactoidsFromEntity = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} factoidNumber
         * @param {?} page
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, factoidNumber, page, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling factoidControllerFactoidsFromEntity.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling factoidControllerFactoidsFromEntity.');
            }
            if (factoidNumber === null || factoidNumber === undefined) {
                throw new Error('Required parameter factoidNumber was null or undefined when calling factoidControllerFactoidsFromEntity.');
            }
            if (page === null || page === undefined) {
                throw new Error('Required parameter page was null or undefined when calling factoidControllerFactoidsFromEntity.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            if (factoidNumber !== undefined && factoidNumber !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (factoidNumber)), 'factoidNumber');
            }
            if (page !== undefined && page !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (page)), 'page');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/get-factoids-from-entity", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        FactoidControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        FactoidControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ FactoidControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function FactoidControllerService_Factory() { return new FactoidControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: FactoidControllerService, providedIn: "root" });
        return FactoidControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        FactoidControllerService.prototype.basePath;
        /** @type {?} */
        FactoidControllerService.prototype.defaultHeaders;
        /** @type {?} */
        FactoidControllerService.prototype.configuration;
        /** @type {?} */
        FactoidControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        FactoidControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/importTableController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImportTableControllerService = /** @class */ (function () {
        function ImportTableControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ImportTableControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ImportTableControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} pkNamespace
         * @param {?=} importTable
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ImportTableControllerService.prototype.importTableControllerImportTable = /**
         * @param {?=} pkNamespace
         * @param {?=} importTable
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkNamespace, importTable, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkNamespace !== undefined && pkNamespace !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkNamespace)), 'pkNamespace');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/import-table", importTable, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ImportTableControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ImportTableControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ImportTableControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ImportTableControllerService_Factory() { return new ImportTableControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ImportTableControllerService, providedIn: "root" });
        return ImportTableControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ImportTableControllerService.prototype.basePath;
        /** @type {?} */
        ImportTableControllerService.prototype.defaultHeaders;
        /** @type {?} */
        ImportTableControllerService.prototype.configuration;
        /** @type {?} */
        ImportTableControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ImportTableControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/infLanguage.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InfLanguageService = /** @class */ (function () {
        function InfLanguageService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        InfLanguageService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        InfLanguageService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfLanguageService.prototype.infLanguageFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfLanguages", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} queryString
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfLanguageService.prototype.infLanguageQueryByString = /**
         * @param {?=} queryString
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (queryString, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (queryString !== undefined && queryString !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (queryString)), 'queryString');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfLanguages/query-by-string", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        InfLanguageService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        InfLanguageService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ InfLanguageService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function InfLanguageService_Factory() { return new InfLanguageService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InfLanguageService, providedIn: "root" });
        return InfLanguageService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        InfLanguageService.prototype.basePath;
        /** @type {?} */
        InfLanguageService.prototype.defaultHeaders;
        /** @type {?} */
        InfLanguageService.prototype.configuration;
        /** @type {?} */
        InfLanguageService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        InfLanguageService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/infPersistentItem.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InfPersistentItemService = /** @class */ (function () {
        function InfPersistentItemService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        InfPersistentItemService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        InfPersistentItemService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} infPersistentItem
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPersistentItemService.prototype.infPersistentItemFindOrCreateInfPersistentItems = /**
         * @param {?} pkProject
         * @param {?} infPersistentItem
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, infPersistentItem, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infPersistentItemFindOrCreateInfPersistentItems.');
            }
            if (infPersistentItem === null || infPersistentItem === undefined) {
                throw new Error('Required parameter infPersistentItem was null or undefined when calling infPersistentItemFindOrCreateInfPersistentItems.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pk_project');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfPersistentItems/find-or-create-many", infPersistentItem, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPersistentItemService.prototype.infPersistentItemOwnProperties = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infPersistentItemOwnProperties.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling infPersistentItemOwnProperties.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfPersistentItems/own-properties", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPersistentItemService.prototype.infPersistentItemTypeNested = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infPersistentItemTypeNested.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling infPersistentItemTypeNested.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pk_project');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pk_entity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfPersistentItems/type-nested", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkTypedClasses
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPersistentItemService.prototype.infPersistentItemTypesOfClassesAndProject = /**
         * @param {?} pkProject
         * @param {?} pkTypedClasses
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkTypedClasses, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infPersistentItemTypesOfClassesAndProject.');
            }
            if (pkTypedClasses === null || pkTypedClasses === undefined) {
                throw new Error('Required parameter pkTypedClasses was null or undefined when calling infPersistentItemTypesOfClassesAndProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pk_project');
            }
            if (pkTypedClasses !== undefined && pkTypedClasses !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkTypedClasses)), 'pk_typed_classes');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfPersistentItems/types-of-classes-and-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPersistentItemService.prototype.infPersistentItemTypesOfProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infPersistentItemTypesOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfPersistentItems/types-of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        InfPersistentItemService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        InfPersistentItemService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ InfPersistentItemService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function InfPersistentItemService_Factory() { return new InfPersistentItemService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InfPersistentItemService, providedIn: "root" });
        return InfPersistentItemService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        InfPersistentItemService.prototype.basePath;
        /** @type {?} */
        InfPersistentItemService.prototype.defaultHeaders;
        /** @type {?} */
        InfPersistentItemService.prototype.configuration;
        /** @type {?} */
        InfPersistentItemService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        InfPersistentItemService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/infPlace.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InfPlaceService = /** @class */ (function () {
        function InfPlaceService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        InfPlaceService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        InfPlaceService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPlaceService.prototype.infPlaceFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfPlaces", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} projectId
         * @param {?} infPlace
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfPlaceService.prototype.infPlaceFindOrCreatePlace = /**
         * @param {?} projectId
         * @param {?} infPlace
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (projectId, infPlace, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (projectId === null || projectId === undefined) {
                throw new Error('Required parameter projectId was null or undefined when calling infPlaceFindOrCreatePlace.');
            }
            if (infPlace === null || infPlace === undefined) {
                throw new Error('Required parameter infPlace was null or undefined when calling infPlaceFindOrCreatePlace.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (projectId !== undefined && projectId !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (projectId)), 'projectId');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfPlaces/findOrCreate", infPlace, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        InfPlaceService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        InfPlaceService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ InfPlaceService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function InfPlaceService_Factory() { return new InfPlaceService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InfPlaceService, providedIn: "root" });
        return InfPlaceService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        InfPlaceService.prototype.basePath;
        /** @type {?} */
        InfPlaceService.prototype.defaultHeaders;
        /** @type {?} */
        InfPlaceService.prototype.configuration;
        /** @type {?} */
        InfPlaceService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        InfPlaceService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/infStatement.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InfStatementService = /** @class */ (function () {
        function InfStatementService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        InfStatementService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        InfStatementService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} entityPk
         * @param {?} propertyPk
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfStatementService.prototype.infStatementAlternativesNotInProjectByEntityPk = /**
         * @param {?} entityPk
         * @param {?} propertyPk
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (entityPk, propertyPk, pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (entityPk === null || entityPk === undefined) {
                throw new Error('Required parameter entityPk was null or undefined when calling infStatementAlternativesNotInProjectByEntityPk.');
            }
            if (propertyPk === null || propertyPk === undefined) {
                throw new Error('Required parameter propertyPk was null or undefined when calling infStatementAlternativesNotInProjectByEntityPk.');
            }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infStatementAlternativesNotInProjectByEntityPk.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (entityPk !== undefined && entityPk !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (entityPk)), 'entityPk');
            }
            if (propertyPk !== undefined && propertyPk !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (propertyPk)), 'propertyPk');
            }
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfStatements/alternatives-not-in-project-by-entity-pk", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} teEntPk
         * @param {?} propertyPk
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfStatementService.prototype.infStatementAlternativesNotInProjectByTeEntPk = /**
         * @param {?} teEntPk
         * @param {?} propertyPk
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (teEntPk, propertyPk, pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (teEntPk === null || teEntPk === undefined) {
                throw new Error('Required parameter teEntPk was null or undefined when calling infStatementAlternativesNotInProjectByTeEntPk.');
            }
            if (propertyPk === null || propertyPk === undefined) {
                throw new Error('Required parameter propertyPk was null or undefined when calling infStatementAlternativesNotInProjectByTeEntPk.');
            }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infStatementAlternativesNotInProjectByTeEntPk.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (teEntPk !== undefined && teEntPk !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (teEntPk)), 'teEntPk');
            }
            if (propertyPk !== undefined && propertyPk !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (propertyPk)), 'propertyPk');
            }
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfStatements/alternatives-not-in-project-by-te-ent-pk", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} infStatement
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfStatementService.prototype.infStatementFindOrCreateInfStatements = /**
         * @param {?} pkProject
         * @param {?} infStatement
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, infStatement, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infStatementFindOrCreateInfStatements.');
            }
            if (infStatement === null || infStatement === undefined) {
                throw new Error('Required parameter infStatement was null or undefined when calling infStatementFindOrCreateInfStatements.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pk_project');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfStatements/find-or-create-many", infStatement, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} pkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfStatementService.prototype.infStatementPaginatedListTargetingEntityPreviews = /**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} pkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            if (pkSourceEntity === null || pkSourceEntity === undefined) {
                throw new Error('Required parameter pkSourceEntity was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            if (pkProperty === null || pkProperty === undefined) {
                throw new Error('Required parameter pkProperty was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            if (pkTargetClass === null || pkTargetClass === undefined) {
                throw new Error('Required parameter pkTargetClass was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            if (isOutgoing === null || isOutgoing === undefined) {
                throw new Error('Required parameter isOutgoing was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            if (limit === null || limit === undefined) {
                throw new Error('Required parameter limit was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            if (offset === null || offset === undefined) {
                throw new Error('Required parameter offset was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkSourceEntity !== undefined && pkSourceEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkSourceEntity)), 'pkSourceEntity');
            }
            if (pkProperty !== undefined && pkProperty !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProperty)), 'pkProperty');
            }
            if (pkTargetClass !== undefined && pkTargetClass !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkTargetClass)), 'pkTargetClass');
            }
            if (isOutgoing !== undefined && isOutgoing !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (isOutgoing)), 'isOutgoing');
            }
            if (limit !== undefined && limit !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (limit)), 'limit');
            }
            if (offset !== undefined && offset !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (offset)), 'offset');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfStatements/paginated-list-targeting-entity-previews", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} ofProject
         * @param {?=} pkProject
         * @param {?=} pkEntity
         * @param {?=} pkInfoRange
         * @param {?=} pkInfoDomain
         * @param {?=} pkProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfStatementService.prototype.infStatementQueryByParams = /**
         * @param {?} ofProject
         * @param {?=} pkProject
         * @param {?=} pkEntity
         * @param {?=} pkInfoRange
         * @param {?=} pkInfoDomain
         * @param {?=} pkProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (ofProject === null || ofProject === undefined) {
                throw new Error('Required parameter ofProject was null or undefined when calling infStatementQueryByParams.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (ofProject !== undefined && ofProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (ofProject)), 'ofProject');
            }
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            if (pkInfoRange !== undefined && pkInfoRange !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkInfoRange)), 'pkInfoRange');
            }
            if (pkInfoDomain !== undefined && pkInfoDomain !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkInfoDomain)), 'pkInfoDomain');
            }
            if (pkProperty !== undefined && pkProperty !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProperty)), 'pkProperty');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfStatements/find-by-params", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} ofProject
         * @param {?=} pkProject
         * @param {?=} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfStatementService.prototype.infStatementSourcesAndDigitalsOfEntity = /**
         * @param {?} ofProject
         * @param {?=} pkProject
         * @param {?=} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (ofProject, pkProject, pkEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (ofProject === null || ofProject === undefined) {
                throw new Error('Required parameter ofProject was null or undefined when calling infStatementSourcesAndDigitalsOfEntity.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (ofProject !== undefined && ofProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (ofProject)), 'ofProject');
            }
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfStatements/sources-and-digitals-of-entity", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        InfStatementService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        InfStatementService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ InfStatementService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function InfStatementService_Factory() { return new InfStatementService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InfStatementService, providedIn: "root" });
        return InfStatementService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        InfStatementService.prototype.basePath;
        /** @type {?} */
        InfStatementService.prototype.defaultHeaders;
        /** @type {?} */
        InfStatementService.prototype.configuration;
        /** @type {?} */
        InfStatementService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        InfStatementService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/infTemporalEntity.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InfTemporalEntityService = /** @class */ (function () {
        function InfTemporalEntityService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        InfTemporalEntityService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        InfTemporalEntityService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} pkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityAlternativeTemporalEntityList = /**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} pkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            if (pkSourceEntity === null || pkSourceEntity === undefined) {
                throw new Error('Required parameter pkSourceEntity was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            if (pkProperty === null || pkProperty === undefined) {
                throw new Error('Required parameter pkProperty was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            if (pkTargetClass === null || pkTargetClass === undefined) {
                throw new Error('Required parameter pkTargetClass was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            if (isOutgoing === null || isOutgoing === undefined) {
                throw new Error('Required parameter isOutgoing was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            if (limit === null || limit === undefined) {
                throw new Error('Required parameter limit was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            if (offset === null || offset === undefined) {
                throw new Error('Required parameter offset was null or undefined when calling infTemporalEntityAlternativeTemporalEntityList.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkSourceEntity !== undefined && pkSourceEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkSourceEntity)), 'pkSourceEntity');
            }
            if (pkProperty !== undefined && pkProperty !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProperty)), 'pkProperty');
            }
            if (pkTargetClass !== undefined && pkTargetClass !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkTargetClass)), 'pkTargetClass');
            }
            if (isOutgoing !== undefined && isOutgoing !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (isOutgoing)), 'isOutgoing');
            }
            if (limit !== undefined && limit !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (limit)), 'limit');
            }
            if (offset !== undefined && offset !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (offset)), 'offset');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfTemporalEntities/paginated-list-alternatives", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} isInProject
         * @param {?} infTemporalEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityChangeTeEntProjectRelation = /**
         * @param {?} pkProject
         * @param {?} isInProject
         * @param {?} infTemporalEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, isInProject, infTemporalEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTemporalEntityChangeTeEntProjectRelation.');
            }
            if (isInProject === null || isInProject === undefined) {
                throw new Error('Required parameter isInProject was null or undefined when calling infTemporalEntityChangeTeEntProjectRelation.');
            }
            if (infTemporalEntity === null || infTemporalEntity === undefined) {
                throw new Error('Required parameter infTemporalEntity was null or undefined when calling infTemporalEntityChangeTeEntProjectRelation.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (isInProject !== undefined && isInProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (isInProject)), 'isInProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfTemporalEntities/change-project-relation", infTemporalEntity, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfTemporalEntities", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} infTemporalEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityFindOrCreateInfTemporalEntities = /**
         * @param {?} pkProject
         * @param {?} infTemporalEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, infTemporalEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTemporalEntityFindOrCreateInfTemporalEntities.');
            }
            if (infTemporalEntity === null || infTemporalEntity === undefined) {
                throw new Error('Required parameter infTemporalEntity was null or undefined when calling infTemporalEntityFindOrCreateInfTemporalEntities.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pk_project');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfTemporalEntities/find-or-create-many", infTemporalEntity, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} infTemporalEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityFindOrCreateInfTemporalEntity = /**
         * @param {?} pkProject
         * @param {?} infTemporalEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, infTemporalEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTemporalEntityFindOrCreateInfTemporalEntity.');
            }
            if (infTemporalEntity === null || infTemporalEntity === undefined) {
                throw new Error('Required parameter infTemporalEntity was null or undefined when calling infTemporalEntityFindOrCreateInfTemporalEntity.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfTemporalEntities/findOrCreate", infTemporalEntity, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityOwnProperties = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTemporalEntityOwnProperties.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling infTemporalEntityOwnProperties.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfTemporalEntities/own-properties", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} pkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTemporalEntityService.prototype.infTemporalEntityTemporalEntityList = /**
         * @param {?} pkProject
         * @param {?} pkSourceEntity
         * @param {?} pkProperty
         * @param {?} pkTargetClass
         * @param {?} isOutgoing
         * @param {?} limit
         * @param {?} offset
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            if (pkSourceEntity === null || pkSourceEntity === undefined) {
                throw new Error('Required parameter pkSourceEntity was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            if (pkProperty === null || pkProperty === undefined) {
                throw new Error('Required parameter pkProperty was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            if (pkTargetClass === null || pkTargetClass === undefined) {
                throw new Error('Required parameter pkTargetClass was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            if (isOutgoing === null || isOutgoing === undefined) {
                throw new Error('Required parameter isOutgoing was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            if (limit === null || limit === undefined) {
                throw new Error('Required parameter limit was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            if (offset === null || offset === undefined) {
                throw new Error('Required parameter offset was null or undefined when calling infTemporalEntityTemporalEntityList.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkSourceEntity !== undefined && pkSourceEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkSourceEntity)), 'pkSourceEntity');
            }
            if (pkProperty !== undefined && pkProperty !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProperty)), 'pkProperty');
            }
            if (pkTargetClass !== undefined && pkTargetClass !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkTargetClass)), 'pkTargetClass');
            }
            if (isOutgoing !== undefined && isOutgoing !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (isOutgoing)), 'isOutgoing');
            }
            if (limit !== undefined && limit !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (limit)), 'limit');
            }
            if (offset !== undefined && offset !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (offset)), 'offset');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/InfTemporalEntities/paginated-list", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        InfTemporalEntityService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        InfTemporalEntityService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ InfTemporalEntityService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function InfTemporalEntityService_Factory() { return new InfTemporalEntityService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InfTemporalEntityService, providedIn: "root" });
        return InfTemporalEntityService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        InfTemporalEntityService.prototype.basePath;
        /** @type {?} */
        InfTemporalEntityService.prototype.defaultHeaders;
        /** @type {?} */
        InfTemporalEntityService.prototype.configuration;
        /** @type {?} */
        InfTemporalEntityService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        InfTemporalEntityService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/infTextProperty.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InfTextPropertyService = /** @class */ (function () {
        function InfTextPropertyService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        InfTextPropertyService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        InfTextPropertyService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} pkClassField
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTextPropertyService.prototype.infTextPropertyFindAlternativeTextProperties = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} pkClassField
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, pkClassField, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTextPropertyFindAlternativeTextProperties.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling infTextPropertyFindAlternativeTextProperties.');
            }
            if (pkClassField === null || pkClassField === undefined) {
                throw new Error('Required parameter pkClassField was null or undefined when calling infTextPropertyFindAlternativeTextProperties.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            if (pkClassField !== undefined && pkClassField !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkClassField)), 'pkClassField');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfTextProperties/findAlternativeTextProperties", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} infTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTextPropertyService.prototype.infTextPropertyFindOrCreateInfTextProperties = /**
         * @param {?} pkProject
         * @param {?} infTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, infTextProperty, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTextPropertyFindOrCreateInfTextProperties.');
            }
            if (infTextProperty === null || infTextProperty === undefined) {
                throw new Error('Required parameter infTextProperty was null or undefined when calling infTextPropertyFindOrCreateInfTextProperties.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pk_project');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfTextProperties/find-or-create-many", infTextProperty, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} infTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        InfTextPropertyService.prototype.infTextPropertyFindOrCreateInfTextProperty = /**
         * @param {?} pkProject
         * @param {?} infTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, infTextProperty, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling infTextPropertyFindOrCreateInfTextProperty.');
            }
            if (infTextProperty === null || infTextProperty === undefined) {
                throw new Error('Required parameter infTextProperty was null or undefined when calling infTextPropertyFindOrCreateInfTextProperty.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/InfTextProperties/findOrCreate", infTextProperty, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        InfTextPropertyService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        InfTextPropertyService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ InfTextPropertyService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function InfTextPropertyService_Factory() { return new InfTextPropertyService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InfTextPropertyService, providedIn: "root" });
        return InfTextPropertyService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        InfTextPropertyService.prototype.basePath;
        /** @type {?} */
        InfTextPropertyService.prototype.defaultHeaders;
        /** @type {?} */
        InfTextPropertyService.prototype.configuration;
        /** @type {?} */
        InfTextPropertyService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        InfTextPropertyService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/paginatedStatementsController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PaginatedStatementsControllerService = /** @class */ (function () {
        function PaginatedStatementsControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        PaginatedStatementsControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        PaginatedStatementsControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} gvPaginationAlternativeLeafItemsReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PaginatedStatementsControllerService.prototype.paginatedStatementsControllerAlternativeLeafItems = /**
         * @param {?=} gvPaginationAlternativeLeafItemsReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (gvPaginationAlternativeLeafItemsReq, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/paginated-statements/alternative-leaf-items", gvPaginationAlternativeLeafItemsReq, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} gvLoadSubfieldPageReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PaginatedStatementsControllerService.prototype.paginatedStatementsControllerLoadSubfieldPage = /**
         * @param {?=} gvLoadSubfieldPageReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (gvLoadSubfieldPageReq, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/paginated-statements/load-subfield-page", gvLoadSubfieldPageReq, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        PaginatedStatementsControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PaginatedStatementsControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ PaginatedStatementsControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PaginatedStatementsControllerService_Factory() { return new PaginatedStatementsControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: PaginatedStatementsControllerService, providedIn: "root" });
        return PaginatedStatementsControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        PaginatedStatementsControllerService.prototype.basePath;
        /** @type {?} */
        PaginatedStatementsControllerService.prototype.defaultHeaders;
        /** @type {?} */
        PaginatedStatementsControllerService.prototype.configuration;
        /** @type {?} */
        PaginatedStatementsControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        PaginatedStatementsControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/pingController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PingControllerService = /** @class */ (function () {
        function PingControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        PingControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        PingControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PingControllerService.prototype.pingControllerPing = /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/ping", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PingControllerService.prototype.pingControllerProjectPing = /**
         * @param {?=} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/project-ping", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} projectPongRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PingControllerService.prototype.pingControllerProjectPong = /**
         * @param {?=} projectPongRequest
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (projectPongRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/project-pong", projectPongRequest, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PingControllerService.prototype.pingControllerSysAdminPing = /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/system-admin-ping", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        PingControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PingControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ PingControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PingControllerService_Factory() { return new PingControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: PingControllerService, providedIn: "root" });
        return PingControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        PingControllerService.prototype.basePath;
        /** @type {?} */
        PingControllerService.prototype.defaultHeaders;
        /** @type {?} */
        PingControllerService.prototype.configuration;
        /** @type {?} */
        PingControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        PingControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/proClassFieldConfig.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProClassFieldConfigService = /** @class */ (function () {
        function ProClassFieldConfigService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProClassFieldConfigService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProClassFieldConfigService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} requestBody
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProClassFieldConfigService.prototype.proClassFieldConfigBulkDelete = /**
         * @param {?} requestBody
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (requestBody === null || requestBody === undefined) {
                throw new Error('Required parameter requestBody was null or undefined when calling proClassFieldConfigBulkDelete.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProClassFieldConfigs/bulk-delete", requestBody, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} proClassFieldConfig
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProClassFieldConfigService.prototype.proClassFieldConfigBulkUpsert = /**
         * @param {?} pkProject
         * @param {?} proClassFieldConfig
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proClassFieldConfig, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proClassFieldConfigBulkUpsert.');
            }
            if (proClassFieldConfig === null || proClassFieldConfig === undefined) {
                throw new Error('Required parameter proClassFieldConfig was null or undefined when calling proClassFieldConfigBulkUpsert.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProClassFieldConfigs/bulk-upsert", proClassFieldConfig, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProClassFieldConfigService.prototype.proClassFieldConfigOfProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proClassFieldConfigOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProClassFieldConfigs/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} proClassFieldConfig
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProClassFieldConfigService.prototype.proClassFieldConfigPatchOrCreate = /**
         * @param {?=} proClassFieldConfig
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (proClassFieldConfig, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/lb3-api/ProClassFieldConfigs", proClassFieldConfig, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProClassFieldConfigService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProClassFieldConfigService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProClassFieldConfigService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProClassFieldConfigService_Factory() { return new ProClassFieldConfigService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProClassFieldConfigService, providedIn: "root" });
        return ProClassFieldConfigService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProClassFieldConfigService.prototype.basePath;
        /** @type {?} */
        ProClassFieldConfigService.prototype.defaultHeaders;
        /** @type {?} */
        ProClassFieldConfigService.prototype.configuration;
        /** @type {?} */
        ProClassFieldConfigService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProClassFieldConfigService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/proDfhClassProjRel.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProDfhClassProjRelService = /** @class */ (function () {
        function ProDfhClassProjRelService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProDfhClassProjRelService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProDfhClassProjRelService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} proDfhClassProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProDfhClassProjRelService.prototype.proDfhClassProjRelBulkUpsert = /**
         * @param {?} pkProject
         * @param {?} proDfhClassProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proDfhClassProjRel, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proDfhClassProjRelBulkUpsert.');
            }
            if (proDfhClassProjRel === null || proDfhClassProjRel === undefined) {
                throw new Error('Required parameter proDfhClassProjRel was null or undefined when calling proDfhClassProjRelBulkUpsert.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProDfhClassProjRels/bulk-upsert", proDfhClassProjRel, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} newProDfhClassProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProDfhClassProjRelService.prototype.proDfhClassProjRelCreate = /**
         * @param {?=} newProDfhClassProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (newProDfhClassProjRel, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/ProDfhClassProjRels", newProDfhClassProjRel, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProDfhClassProjRelService.prototype.proDfhClassProjRelOfProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proDfhClassProjRelOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProDfhClassProjRels/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProDfhClassProjRelService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProDfhClassProjRelService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProDfhClassProjRelService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProDfhClassProjRelService_Factory() { return new ProDfhClassProjRelService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProDfhClassProjRelService, providedIn: "root" });
        return ProDfhClassProjRelService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProDfhClassProjRelService.prototype.basePath;
        /** @type {?} */
        ProDfhClassProjRelService.prototype.defaultHeaders;
        /** @type {?} */
        ProDfhClassProjRelService.prototype.configuration;
        /** @type {?} */
        ProDfhClassProjRelService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProDfhClassProjRelService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/proDfhProfileProjRel.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProDfhProfileProjRelService = /** @class */ (function () {
        function ProDfhProfileProjRelService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProDfhProfileProjRelService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProDfhProfileProjRelService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} proDfhProfileProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProDfhProfileProjRelService.prototype.proDfhProfileProjRelBulkUpsert = /**
         * @param {?} pkProject
         * @param {?} proDfhProfileProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proDfhProfileProjRel, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proDfhProfileProjRelBulkUpsert.');
            }
            if (proDfhProfileProjRel === null || proDfhProfileProjRel === undefined) {
                throw new Error('Required parameter proDfhProfileProjRel was null or undefined when calling proDfhProfileProjRelBulkUpsert.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProDfhProfileProjRels/bulk-upsert", proDfhProfileProjRel, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProDfhProfileProjRelService.prototype.proDfhProfileProjRelOfProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proDfhProfileProjRelOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProDfhProfileProjRels/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProDfhProfileProjRelService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProDfhProfileProjRelService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProDfhProfileProjRelService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProDfhProfileProjRelService_Factory() { return new ProDfhProfileProjRelService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProDfhProfileProjRelService, providedIn: "root" });
        return ProDfhProfileProjRelService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProDfhProfileProjRelService.prototype.basePath;
        /** @type {?} */
        ProDfhProfileProjRelService.prototype.defaultHeaders;
        /** @type {?} */
        ProDfhProfileProjRelService.prototype.configuration;
        /** @type {?} */
        ProDfhProfileProjRelService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProDfhProfileProjRelService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/proInfoProjRel.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProInfoProjRelService = /** @class */ (function () {
        function ProInfoProjRelService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProInfoProjRelService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProInfoProjRelService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} proInfoProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProInfoProjRelService.prototype.proInfoProjRelBulkUpdateEprAttributes = /**
         * @param {?} pkProject
         * @param {?} proInfoProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proInfoProjRel, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proInfoProjRelBulkUpdateEprAttributes.');
            }
            if (proInfoProjRel === null || proInfoProjRel === undefined) {
                throw new Error('Required parameter proInfoProjRel was null or undefined when calling proInfoProjRelBulkUpdateEprAttributes.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProInfoProjRels/bulk-update-attributes", proInfoProjRel, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProInfoProjRelService.prototype.proInfoProjRelFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProInfoProjRels", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkStatement
         * @param {?} body
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProInfoProjRelService.prototype.proInfoProjRelMarkStatementAsFavorite = /**
         * @param {?} pkProject
         * @param {?} pkStatement
         * @param {?} body
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkStatement, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proInfoProjRelMarkStatementAsFavorite.');
            }
            if (pkStatement === null || pkStatement === undefined) {
                throw new Error('Required parameter pkStatement was null or undefined when calling proInfoProjRelMarkStatementAsFavorite.');
            }
            if (body === null || body === undefined) {
                throw new Error('Required parameter body was null or undefined when calling proInfoProjRelMarkStatementAsFavorite.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkStatement !== undefined && pkStatement !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkStatement)), 'pkStatement');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProInfoProjRels/mark-statement-as-favorite", body, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} proInfoProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProInfoProjRelService.prototype.proInfoProjRelPatchOrCreate = /**
         * @param {?=} proInfoProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (proInfoProjRel, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/lb3-api/ProInfoProjRels", proInfoProjRel, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} proInfoProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProInfoProjRelService.prototype.proInfoProjRelUpdateEprAttributes = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} proInfoProjRel
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, proInfoProjRel, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proInfoProjRelUpdateEprAttributes.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling proInfoProjRelUpdateEprAttributes.');
            }
            if (proInfoProjRel === null || proInfoProjRel === undefined) {
                throw new Error('Required parameter proInfoProjRel was null or undefined when calling proInfoProjRelUpdateEprAttributes.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProInfoProjRels/updateEprAttributes", proInfoProjRel, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProInfoProjRelService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProInfoProjRelService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProInfoProjRelService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProInfoProjRelService_Factory() { return new ProInfoProjRelService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProInfoProjRelService, providedIn: "root" });
        return ProInfoProjRelService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProInfoProjRelService.prototype.basePath;
        /** @type {?} */
        ProInfoProjRelService.prototype.defaultHeaders;
        /** @type {?} */
        ProInfoProjRelService.prototype.configuration;
        /** @type {?} */
        ProInfoProjRelService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProInfoProjRelService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/proProject.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProProjectService = /** @class */ (function () {
        function ProProjectService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProProjectService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProProjectService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} accountId
         * @param {?} pkLanguage
         * @param {?} label
         * @param {?=} textProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProProjectService.prototype.proProjectCreateWithLabelAndDescription = /**
         * @param {?} accountId
         * @param {?} pkLanguage
         * @param {?} label
         * @param {?=} textProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (accountId, pkLanguage, label, textProperty, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (accountId === null || accountId === undefined) {
                throw new Error('Required parameter accountId was null or undefined when calling proProjectCreateWithLabelAndDescription.');
            }
            if (pkLanguage === null || pkLanguage === undefined) {
                throw new Error('Required parameter pkLanguage was null or undefined when calling proProjectCreateWithLabelAndDescription.');
            }
            if (label === null || label === undefined) {
                throw new Error('Required parameter label was null or undefined when calling proProjectCreateWithLabelAndDescription.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (accountId !== undefined && accountId !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (accountId)), 'accountId');
            }
            if (pkLanguage !== undefined && pkLanguage !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkLanguage)), 'pkLanguage');
            }
            if (label !== undefined && label !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (label)), 'label');
            }
            if (textProperty !== undefined && textProperty !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (textProperty)), 'textProperty');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/ProProjects/create-with-label-and-description", null, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProProjectService.prototype.proProjectGetBasics = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proProjectGetBasics.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProProjects/get-basics", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} accountId
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProProjectService.prototype.proProjectOfAccount = /**
         * @param {?} accountId
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (accountId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (accountId === null || accountId === undefined) {
                throw new Error('Required parameter accountId was null or undefined when calling proProjectOfAccount.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (accountId !== undefined && accountId !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (accountId)), 'accountId');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProProjects/of-account", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProProjectService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProProjectService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProProjectService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProProjectService_Factory() { return new ProProjectService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProProjectService, providedIn: "root" });
        return ProProjectService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProProjectService.prototype.basePath;
        /** @type {?} */
        ProProjectService.prototype.defaultHeaders;
        /** @type {?} */
        ProProjectService.prototype.configuration;
        /** @type {?} */
        ProProjectService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProProjectService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/proTextProperty.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProTextPropertyService = /** @class */ (function () {
        function ProTextPropertyService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProTextPropertyService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProTextPropertyService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} proTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProTextPropertyService.prototype.proTextPropertyBulkDelete = /**
         * @param {?} pkProject
         * @param {?} proTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proTextProperty, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proTextPropertyBulkDelete.');
            }
            if (proTextProperty === null || proTextProperty === undefined) {
                throw new Error('Required parameter proTextProperty was null or undefined when calling proTextPropertyBulkDelete.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/lb3-api/ProTextProperties/bulk-delete", proTextProperty, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} proTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProTextPropertyService.prototype.proTextPropertyBulkUpsert = /**
         * @param {?} pkProject
         * @param {?} proTextProperty
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, proTextProperty, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proTextPropertyBulkUpsert.');
            }
            if (proTextProperty === null || proTextProperty === undefined) {
                throw new Error('Required parameter proTextProperty was null or undefined when calling proTextPropertyBulkUpsert.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/ProTextProperties/bulk-upsert", proTextProperty, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProTextPropertyService.prototype.proTextPropertyOfProject = /**
         * @param {?} pkProject
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling proTextPropertyOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/ProTextProperties/of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProTextPropertyService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProTextPropertyService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProTextPropertyService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProTextPropertyService_Factory() { return new ProTextPropertyService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProTextPropertyService, providedIn: "root" });
        return ProTextPropertyService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProTextPropertyService.prototype.basePath;
        /** @type {?} */
        ProTextPropertyService.prototype.defaultHeaders;
        /** @type {?} */
        ProTextPropertyService.prototype.configuration;
        /** @type {?} */
        ProTextPropertyService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProTextPropertyService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/projectConfiguration.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProjectConfigurationService = /** @class */ (function () {
        function ProjectConfigurationService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        ProjectConfigurationService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        ProjectConfigurationService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} pkProject
         * @param {?=} fkClass
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProjectConfigurationService.prototype.projectConfigControllerDeleteEntityLabelConfig = /**
         * @param {?=} pkProject
         * @param {?=} fkClass
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, fkClass, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (fkClass !== undefined && fkClass !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (fkClass)), 'fkClass');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/entity-label-config", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} pkProject
         * @param {?=} fkClass
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProjectConfigurationService.prototype.projectConfigControllerGetEntityLabelConfig = /**
         * @param {?=} pkProject
         * @param {?=} fkClass
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, fkClass, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (fkClass !== undefined && fkClass !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (fkClass)), 'fkClass');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/entity-label-config", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} proEntityLabelConfig
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        ProjectConfigurationService.prototype.projectConfigControllerPostEntityLabelConfig = /**
         * @param {?=} proEntityLabelConfig
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (proEntityLabelConfig, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/entity-label-config", proEntityLabelConfig, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        ProjectConfigurationService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ProjectConfigurationService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ ProjectConfigurationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ProjectConfigurationService_Factory() { return new ProjectConfigurationService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ProjectConfigurationService, providedIn: "root" });
        return ProjectConfigurationService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ProjectConfigurationService.prototype.basePath;
        /** @type {?} */
        ProjectConfigurationService.prototype.defaultHeaders;
        /** @type {?} */
        ProjectConfigurationService.prototype.configuration;
        /** @type {?} */
        ProjectConfigurationService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        ProjectConfigurationService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/pubAccount.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PubAccountService = /** @class */ (function () {
        function PubAccountService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        PubAccountService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        PubAccountService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} id
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PubAccountService.prototype.pubAccountGetRoles = /**
         * @param {?} id
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling pubAccountGetRoles.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/PubAccounts/" + encodeURIComponent(String(id)) + "/get-roles", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} id
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PubAccountService.prototype.pubAccountListProjects = /**
         * @param {?} id
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling pubAccountListProjects.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/PubAccounts/" + encodeURIComponent(String(id)) + "/list-projects", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} body
         * @param {?=} include
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PubAccountService.prototype.pubAccountLogin = /**
         * @param {?} body
         * @param {?=} include
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (body, include, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (body === null || body === undefined) {
                throw new Error('Required parameter body was null or undefined when calling pubAccountLogin.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (include !== undefined && include !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (include)), 'include');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/PubAccounts/login", body, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PubAccountService.prototype.pubAccountLogout = /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/PubAccounts/logout", null, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        PubAccountService.prototype.pubAccountWithRolesAndProjects = /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/PubAccounts/with-roles-and-projects", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        PubAccountService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PubAccountService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ PubAccountService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PubAccountService_Factory() { return new PubAccountService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: PubAccountService, providedIn: "root" });
        return PubAccountService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        PubAccountService.prototype.basePath;
        /** @type {?} */
        PubAccountService.prototype.defaultHeaders;
        /** @type {?} */
        PubAccountService.prototype.configuration;
        /** @type {?} */
        PubAccountService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        PubAccountService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/ramList.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RamListService = /** @class */ (function () {
        function RamListService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        RamListService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        RamListService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} fkProperty
         * @param {?=} refersTo
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        RamListService.prototype.ramListControllerGetRamList = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?} fkProperty
         * @param {?=} refersTo
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, fkProperty, refersTo, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling ramListControllerGetRamList.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling ramListControllerGetRamList.');
            }
            if (fkProperty === null || fkProperty === undefined) {
                throw new Error('Required parameter fkProperty was null or undefined when calling ramListControllerGetRamList.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            if (fkProperty !== undefined && fkProperty !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (fkProperty)), 'fkProperty');
            }
            if (refersTo !== undefined && refersTo !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (refersTo)), 'refersTo');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/get-ram-list", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        RamListService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        RamListService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ RamListService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function RamListService_Factory() { return new RamListService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: RamListService, providedIn: "root" });
        return RamListService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        RamListService.prototype.basePath;
        /** @type {?} */
        RamListService.prototype.defaultHeaders;
        /** @type {?} */
        RamListService.prototype.configuration;
        /** @type {?} */
        RamListService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        RamListService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/schemaObject.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SchemaObjectService = /** @class */ (function () {
        function SchemaObjectService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        SchemaObjectService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        SchemaObjectService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SchemaObjectService.prototype.schemaObjectAddEntityToProject = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling schemaObjectAddEntityToProject.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling schemaObjectAddEntityToProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SchemaObjects/add-entity-to-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SchemaObjectService.prototype.schemaObjectRemoveEntityFromProject = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling schemaObjectRemoveEntityFromProject.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling schemaObjectRemoveEntityFromProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SchemaObjects/remove-entity-from-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkType
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SchemaObjectService.prototype.schemaObjectTypeOfProject = /**
         * @param {?} pkProject
         * @param {?} pkType
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkType, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling schemaObjectTypeOfProject.');
            }
            if (pkType === null || pkType === undefined) {
                throw new Error('Required parameter pkType was null or undefined when calling schemaObjectTypeOfProject.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkType !== undefined && pkType !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkType)), 'pkType');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SchemaObjects/type-of-project", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        SchemaObjectService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SchemaObjectService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ SchemaObjectService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SchemaObjectService_Factory() { return new SchemaObjectService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SchemaObjectService, providedIn: "root" });
        return SchemaObjectService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SchemaObjectService.prototype.basePath;
        /** @type {?} */
        SchemaObjectService.prototype.defaultHeaders;
        /** @type {?} */
        SchemaObjectService.prototype.configuration;
        /** @type {?} */
        SchemaObjectService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        SchemaObjectService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/sysClassField.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SysClassFieldService = /** @class */ (function () {
        function SysClassFieldService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        SysClassFieldService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        SysClassFieldService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SysClassFieldService.prototype.sysClassFieldFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SysClassFields", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} body
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SysClassFieldService.prototype.sysClassFieldFindComplex = /**
         * @param {?=} body
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/SysClassFields/findComplex", body, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        SysClassFieldService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SysClassFieldService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ SysClassFieldService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SysClassFieldService_Factory() { return new SysClassFieldService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SysClassFieldService, providedIn: "root" });
        return SysClassFieldService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SysClassFieldService.prototype.basePath;
        /** @type {?} */
        SysClassFieldService.prototype.defaultHeaders;
        /** @type {?} */
        SysClassFieldService.prototype.configuration;
        /** @type {?} */
        SysClassFieldService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        SysClassFieldService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/sysClassHasTypeProperty.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SysClassHasTypePropertyService = /** @class */ (function () {
        function SysClassHasTypePropertyService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        SysClassHasTypePropertyService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        SysClassHasTypePropertyService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SysClassHasTypePropertyService.prototype.sysClassHasTypePropertyFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SysClassHasTypeProperties", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        SysClassHasTypePropertyService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SysClassHasTypePropertyService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ SysClassHasTypePropertyService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SysClassHasTypePropertyService_Factory() { return new SysClassHasTypePropertyService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SysClassHasTypePropertyService, providedIn: "root" });
        return SysClassHasTypePropertyService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SysClassHasTypePropertyService.prototype.basePath;
        /** @type {?} */
        SysClassHasTypePropertyService.prototype.defaultHeaders;
        /** @type {?} */
        SysClassHasTypePropertyService.prototype.configuration;
        /** @type {?} */
        SysClassHasTypePropertyService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        SysClassHasTypePropertyService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/sysSystemRelevantClass.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SysSystemRelevantClassService = /** @class */ (function () {
        function SysSystemRelevantClassService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        SysSystemRelevantClassService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        SysSystemRelevantClassService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} sysSystemRelevantClass
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SysSystemRelevantClassService.prototype.sysSystemRelevantClassBulkReplaceOrCreate = /**
         * @param {?} sysSystemRelevantClass
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (sysSystemRelevantClass, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (sysSystemRelevantClass === null || sysSystemRelevantClass === undefined) {
                throw new Error('Required parameter sysSystemRelevantClass was null or undefined when calling sysSystemRelevantClassBulkReplaceOrCreate.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json',
                'application/x-www-form-urlencoded',
                'application/xml',
                'text/xml'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/lb3-api/SysSystemRelevantClasses/bulk-replace-or-create", sysSystemRelevantClass, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SysSystemRelevantClassService.prototype.sysSystemRelevantClassFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SysSystemRelevantClasses", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        SysSystemRelevantClassService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SysSystemRelevantClassService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ SysSystemRelevantClassService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SysSystemRelevantClassService_Factory() { return new SysSystemRelevantClassService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SysSystemRelevantClassService, providedIn: "root" });
        return SysSystemRelevantClassService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SysSystemRelevantClassService.prototype.basePath;
        /** @type {?} */
        SysSystemRelevantClassService.prototype.defaultHeaders;
        /** @type {?} */
        SysSystemRelevantClassService.prototype.configuration;
        /** @type {?} */
        SysSystemRelevantClassService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        SysSystemRelevantClassService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/sysSystemType.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SysSystemTypeService = /** @class */ (function () {
        function SysSystemTypeService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        SysSystemTypeService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        SysSystemTypeService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SysSystemTypeService.prototype.sysSystemTypeFind = /**
         * @param {?=} filter
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (filter)), 'filter');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json',
                    'application/xml',
                    'text/xml',
                    'application/javascript',
                    'text/javascript'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/lb3-api/SysSystemTypes", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        SysSystemTypeService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SysSystemTypeService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ SysSystemTypeService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SysSystemTypeService_Factory() { return new SysSystemTypeService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SysSystemTypeService, providedIn: "root" });
        return SysSystemTypeService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SysSystemTypeService.prototype.basePath;
        /** @type {?} */
        SysSystemTypeService.prototype.defaultHeaders;
        /** @type {?} */
        SysSystemTypeService.prototype.configuration;
        /** @type {?} */
        SysSystemTypeService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        SysSystemTypeService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/systemConfiguration.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SystemConfigurationService = /** @class */ (function () {
        function SystemConfigurationService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        SystemConfigurationService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        SystemConfigurationService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SystemConfigurationService.prototype.sysConfigControllerGetSystemConfig = /**
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/get-system-config", {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} sysConfigValue
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SystemConfigurationService.prototype.sysConfigControllerSetSystemConfig = /**
         * @param {?} sysConfigValue
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (sysConfigValue, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (sysConfigValue === null || sysConfigValue === undefined) {
                throw new Error('Required parameter sysConfigValue was null or undefined when calling sysConfigControllerSetSystemConfig.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/set-system-config", sysConfigValue, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} sysConfigValue
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        SystemConfigurationService.prototype.sysConfigControllerValidateSystemConfig = /**
         * @param {?} sysConfigValue
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (sysConfigValue, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (sysConfigValue === null || sysConfigValue === undefined) {
                throw new Error('Required parameter sysConfigValue was null or undefined when calling sysConfigControllerValidateSystemConfig.');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/validate-system-config", sysConfigValue, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        SystemConfigurationService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        SystemConfigurationService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ SystemConfigurationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SystemConfigurationService_Factory() { return new SystemConfigurationService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SystemConfigurationService, providedIn: "root" });
        return SystemConfigurationService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SystemConfigurationService.prototype.basePath;
        /** @type {?} */
        SystemConfigurationService.prototype.defaultHeaders;
        /** @type {?} */
        SystemConfigurationService.prototype.configuration;
        /** @type {?} */
        SystemConfigurationService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        SystemConfigurationService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/table.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TableService = /** @class */ (function () {
        function TableService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        TableService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        TableService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?} pkProject
         * @param {?} pkDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        TableService.prototype.tableControllerGetTableColumns = /**
         * @param {?} pkProject
         * @param {?} pkDigital
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkDigital, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling tableControllerGetTableColumns.');
            }
            if (pkDigital === null || pkDigital === undefined) {
                throw new Error('Required parameter pkDigital was null or undefined when calling tableControllerGetTableColumns.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkDigital !== undefined && pkDigital !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkDigital)), 'pkDigital');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/get-columns-of-table", {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} getTablePageOptions
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        TableService.prototype.tableControllerGetTablePage = /**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @param {?=} getTablePageOptions
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (pkProject, pkEntity, getTablePageOptions, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (pkProject === null || pkProject === undefined) {
                throw new Error('Required parameter pkProject was null or undefined when calling tableControllerGetTablePage.');
            }
            if (pkEntity === null || pkEntity === undefined) {
                throw new Error('Required parameter pkEntity was null or undefined when calling tableControllerGetTablePage.');
            }
            /** @type {?} */
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
            if (pkProject !== undefined && pkProject !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkProject)), 'pkProject');
            }
            if (pkEntity !== undefined && pkEntity !== null) {
                queryParameters = this.addToHttpParams(queryParameters, (/** @type {?} */ (pkEntity)), 'pkEntity');
            }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/get-table-page", getTablePageOptions, {
                params: queryParameters,
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        TableService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        TableService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ TableService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function TableService_Factory() { return new TableService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: TableService, providedIn: "root" });
        return TableService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        TableService.prototype.basePath;
        /** @type {?} */
        TableService.prototype.defaultHeaders;
        /** @type {?} */
        TableService.prototype.configuration;
        /** @type {?} */
        TableService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        TableService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/warEntityPreviewController.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WarEntityPreviewControllerService = /** @class */ (function () {
        function WarEntityPreviewControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://0.0.0.0:3000';
            this.defaultHeaders = new http.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        WarEntityPreviewControllerService.prototype.addToHttpParams = /**
         * @private
         * @param {?} httpParams
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        WarEntityPreviewControllerService.prototype.addToHttpParamsRecursive = /**
         * @private
         * @param {?} httpParams
         * @param {?=} value
         * @param {?=} key
         * @return {?}
         */
        function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    ((/** @type {?} */ (value))).forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); }));
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, ((/** @type {?} */ (value))).toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); }));
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        /**
         * @param {?=} warEntityPreviewPaginatedByPkReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        WarEntityPreviewControllerService.prototype.warEntityPreviewControllerPaginatedListByPks = /**
         * @param {?=} warEntityPreviewPaginatedByPkReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (warEntityPreviewPaginatedByPkReq, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/war-entity-previews/paginated-list-by-pks", warEntityPreviewPaginatedByPkReq, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} warEntityPreviewSearchExistingReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        WarEntityPreviewControllerService.prototype.warEntityPreviewControllerSearch = /**
         * @param {?=} warEntityPreviewSearchExistingReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (warEntityPreviewSearchExistingReq, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/war-entity-previews/search", warEntityPreviewSearchExistingReq, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        /**
         * @param {?=} warEntityPreviewSearchExistingReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        WarEntityPreviewControllerService.prototype.warEntityPreviewControllerSearchExisting = /**
         * @param {?=} warEntityPreviewSearchExistingReq
         * @param {?=} observe
         * @param {?=} reportProgress
         * @param {?=} options
         * @return {?}
         */
        function (warEntityPreviewSearchExistingReq, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            /** @type {?} */
            var headers = this.defaultHeaders;
            /** @type {?} */
            var credential;
            // authentication (accesstoken) required
            credential = this.configuration.lookupCredential('accesstoken');
            if (credential) {
                headers = headers.set('authorization', credential);
            }
            // authentication (jwt) required
            credential = this.configuration.lookupCredential('jwt');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            /** @type {?} */
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                /** @type {?} */
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            /** @type {?} */
            var consumes = [
                'application/json'
            ];
            /** @type {?} */
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            /** @type {?} */
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/war-entity-previews/search-existing", warEntityPreviewSearchExistingReq, {
                responseType: (/** @type {?} */ (responseType)),
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        WarEntityPreviewControllerService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        WarEntityPreviewControllerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        /** @nocollapse */ WarEntityPreviewControllerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WarEntityPreviewControllerService_Factory() { return new WarEntityPreviewControllerService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: WarEntityPreviewControllerService, providedIn: "root" });
        return WarEntityPreviewControllerService;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        WarEntityPreviewControllerService.prototype.basePath;
        /** @type {?} */
        WarEntityPreviewControllerService.prototype.defaultHeaders;
        /** @type {?} */
        WarEntityPreviewControllerService.prototype.configuration;
        /** @type {?} */
        WarEntityPreviewControllerService.prototype.encoder;
        /**
         * @type {?}
         * @protected
         */
        WarEntityPreviewControllerService.prototype.httpClient;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/api/api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var APIS = [AccountService, AnalysisService, ContentTreeService, DatChunkService, DatChunkControllerService, DatColumnService, DatDigitalService, DatNamespaceService, DfhClassControllerService, DfhLabelService, DfhProfileService, DfhPropertyControllerService, FactoidControllerService, ImportTableControllerService, InfLanguageService, InfPersistentItemService, InfPlaceService, InfStatementService, InfTemporalEntityService, InfTextPropertyService, PaginatedStatementsControllerService, PingControllerService, ProClassFieldConfigService, ProDfhClassProjRelService, ProDfhProfileProjRelService, ProInfoProjRelService, ProProjectService, ProTextPropertyService, ProjectConfigurationService, PubAccountService, RamListService, SchemaObjectService, SysClassFieldService, SysClassHasTypePropertyService, SysSystemRelevantClassService, SysSystemTypeService, SystemConfigurationService, TableService, WarEntityPreviewControllerService];

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisDefinition.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisDefinition() { }
    if (false) {
        /** @type {?|undefined} */
        AnalysisDefinition.prototype.queryDefinition;
        /** @type {?|undefined} */
        AnalysisDefinition.prototype.lines;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisMapRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisMapRequest() { }
    if (false) {
        /** @type {?} */
        AnalysisMapRequest.prototype.analysisDefinition;
        /** @type {?} */
        AnalysisMapRequest.prototype.fkProject;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisMapResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisMapResponse() { }
    if (false) {
        /** @type {?} */
        AnalysisMapResponse.prototype.geoPlaces;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTableCell.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisTableCell() { }
    if (false) {
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.entity;
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.entityLabel;
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.entityClassLabel;
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.entityTypeLabel;
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.value;
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.entities;
        /** @type {?|undefined} */
        AnalysisTableCell.prototype.values;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTableCellValue.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisTableCellValue() { }
    if (false) {
        /** @type {?|undefined} */
        AnalysisTableCellValue.prototype.value;
        /** @type {?|undefined} */
        AnalysisTableCellValue.prototype.pkStatement;
        /** @type {?|undefined} */
        AnalysisTableCellValue.prototype.fkSubjectInfo;
        /** @type {?|undefined} */
        AnalysisTableCellValue.prototype.fkObjectInfo;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTableExportRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (AnalysisTableExportRequest) {
        AnalysisTableExportRequest.FileTypeEnum = {
            Json: (/** @type {?} */ ('json')),
            Csv: (/** @type {?} */ ('csv'))
        };
    })(exports.AnalysisTableExportRequest || (exports.AnalysisTableExportRequest = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTableExportResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function AnalysisTableExportResponse() { }
    if (false) {
        /** @type {?|undefined} */
        AnalysisTableExportResponse.prototype.res;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTableRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisTableRequest() { }
    if (false) {
        /** @type {?} */
        AnalysisTableRequest.prototype.analysisDefinition;
        /** @type {?} */
        AnalysisTableRequest.prototype.fkProject;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTableResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisTableResponse() { }
    if (false) {
        /** @type {?} */
        AnalysisTableResponse.prototype.rows;
        /** @type {?|undefined} */
        AnalysisTableResponse.prototype.full_count;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTimeChartRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisTimeChartRequest() { }
    if (false) {
        /** @type {?} */
        AnalysisTimeChartRequest.prototype.lines;
        /** @type {?} */
        AnalysisTimeChartRequest.prototype.fkProject;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/analysisTimeChartResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AnalysisTimeChartResponse() { }
    if (false) {
        /** @type {?} */
        AnalysisTimeChartResponse.prototype.activeLine;
        /** @type {?} */
        AnalysisTimeChartResponse.prototype.chartLines;
        /** @type {?|undefined} */
        AnalysisTimeChartResponse.prototype.mouseX;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/chartLine.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ChartLine() { }
    if (false) {
        /** @type {?} */
        ChartLine.prototype.label;
        /** @type {?} */
        ChartLine.prototype.linePoints;
        /** @type {?|undefined} */
        ChartLine.prototype.pkEntities;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/chartLinePoint.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ChartLinePoint() { }
    if (false) {
        /** @type {?} */
        ChartLinePoint.prototype.x;
        /** @type {?} */
        ChartLinePoint.prototype.y;
        /** @type {?|undefined} */
        ChartLinePoint.prototype.data;
        /** @type {?|undefined} */
        ChartLinePoint.prototype.data_ref;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/classConfig.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * System wide configuration for the class.
     * @record
     */
    function ClassConfig() { }
    if (false) {
        /** @type {?|undefined} */
        ClassConfig.prototype.valueObjectType;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/classesIndex.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ClassesIndex() { }
    if (false) {
        /** @type {?|undefined} */
        ClassesIndex.prototype._1;
        /* Skipping unhandled member: [key: string]: ClassConfig | any;*/
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/colDef.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (ColDef) {
        ColDef.DefaultTypeEnum = {
            EntityPreview: (/** @type {?} */ ('entity_preview')),
            EntityLabel: (/** @type {?} */ ('entity_label')),
            ClassLabel: (/** @type {?} */ ('class_label')),
            TypeLabel: (/** @type {?} */ ('type_label')),
            TemporalDistribution: (/** @type {?} */ ('temporal_distribution')),
            SpaceAndTimeCont: (/** @type {?} */ ('space_and_time_cont'))
        };
    })(exports.ColDef || (exports.ColDef = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/czmlSpatialValue.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function CzmlSpatialValue() { }
    if (false) {
        /** @type {?} */
        CzmlSpatialValue.prototype.latitude;
        /** @type {?} */
        CzmlSpatialValue.prototype.longitude;
        /** @type {?|undefined} */
        CzmlSpatialValue.prototype.from;
        /** @type {?|undefined} */
        CzmlSpatialValue.prototype.to;
        /** @type {?|undefined} */
        CzmlSpatialValue.prototype.iso_to;
        /** @type {?|undefined} */
        CzmlSpatialValue.prototype.iso_from;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datChunk.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatChunk() { }
    if (false) {
        /** @type {?|undefined} */
        DatChunk.prototype.quill_doc;
        /** @type {?|undefined} */
        DatChunk.prototype.string;
        /** @type {?} */
        DatChunk.prototype.fk_text;
        /** @type {?} */
        DatChunk.prototype.fk_entity_version;
        /** @type {?|undefined} */
        DatChunk.prototype.pk_entity;
        /** @type {?|undefined} */
        DatChunk.prototype.fk_namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datChunkFields.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatChunkFields() { }
    if (false) {
        /** @type {?|undefined} */
        DatChunkFields.prototype.pk_entity;
        /** @type {?|undefined} */
        DatChunkFields.prototype.quill_doc;
        /** @type {?|undefined} */
        DatChunkFields.prototype.string;
        /** @type {?|undefined} */
        DatChunkFields.prototype.fk_entity_version;
        /** @type {?|undefined} */
        DatChunkFields.prototype.fk_text;
        /** @type {?|undefined} */
        DatChunkFields.prototype.fk_namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datChunkFilter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DatChunkFilter() { }
    if (false) {
        /** @type {?|undefined} */
        DatChunkFilter.prototype.offset;
        /** @type {?|undefined} */
        DatChunkFilter.prototype.limit;
        /** @type {?|undefined} */
        DatChunkFilter.prototype.skip;
        /** @type {?|undefined} */
        DatChunkFilter.prototype.order;
        /** @type {?|undefined} */
        DatChunkFilter.prototype.fields;
        /** @type {?|undefined} */
        DatChunkFilter.prototype.include;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datChunkIncludeFilterItems.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DatChunkIncludeFilterItems() { }
    if (false) {
        /** @type {?|undefined} */
        DatChunkIncludeFilterItems.prototype.relation;
        /** @type {?|undefined} */
        DatChunkIncludeFilterItems.prototype.scope;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datChunkScopeFilter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatChunkScopeFilter() { }
    if (false) {
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.offset;
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.limit;
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.skip;
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.order;
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.where;
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.fields;
        /** @type {?|undefined} */
        DatChunkScopeFilter.prototype.include;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datChunkWithRelations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * (tsType: DatChunkWithRelations, schemaOptions: { includeRelations: true })
     * @record
     */
    function DatChunkWithRelations() { }
    if (false) {
        /** @type {?|undefined} */
        DatChunkWithRelations.prototype.pk_entity;
        /** @type {?|undefined} */
        DatChunkWithRelations.prototype.quill_doc;
        /** @type {?|undefined} */
        DatChunkWithRelations.prototype.string;
        /** @type {?} */
        DatChunkWithRelations.prototype.fk_entity_version;
        /** @type {?} */
        DatChunkWithRelations.prototype.fk_text;
        /** @type {?} */
        DatChunkWithRelations.prototype.fk_namespace;
        /** @type {?|undefined} */
        DatChunkWithRelations.prototype.outgoing_statements;
        /** @type {?|undefined} */
        DatChunkWithRelations.prototype.digital;
        /** @type {?|undefined} */
        DatChunkWithRelations.prototype.namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datClassColumnMapping.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatClassColumnMapping() { }
    if (false) {
        /** @type {?|undefined} */
        DatClassColumnMapping.prototype.pk_entity;
        /** @type {?|undefined} */
        DatClassColumnMapping.prototype.fk_class;
        /** @type {?|undefined} */
        DatClassColumnMapping.prototype.fk_column;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datColumn.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatColumn() { }
    if (false) {
        /** @type {?|undefined} */
        DatColumn.prototype.fk_digital;
        /** @type {?|undefined} */
        DatColumn.prototype.fk_data_type;
        /** @type {?|undefined} */
        DatColumn.prototype.fk_column_content_type;
        /** @type {?|undefined} */
        DatColumn.prototype.fk_column_relationship_type;
        /** @type {?|undefined} */
        DatColumn.prototype.fk_original_column;
        /** @type {?|undefined} */
        DatColumn.prototype.is_imported;
        /** @type {?|undefined} */
        DatColumn.prototype.pk_entity;
        /** @type {?|undefined} */
        DatColumn.prototype.fk_namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datDigital.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatDigital() { }
    if (false) {
        /** @type {?|undefined} */
        DatDigital.prototype.entity_version;
        /** @type {?|undefined} */
        DatDigital.prototype.pk_text;
        /** @type {?|undefined} */
        DatDigital.prototype.quill_doc;
        /** @type {?|undefined} */
        DatDigital.prototype.string;
        /** @type {?|undefined} */
        DatDigital.prototype.fk_system_type;
        /** @type {?|undefined} */
        DatDigital.prototype.pk_entity;
        /** @type {?|undefined} */
        DatDigital.prototype.fk_namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datDigitalWithRelations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * (tsType: DatDigitalWithRelations, schemaOptions: { includeRelations: true })
     * @record
     */
    function DatDigitalWithRelations() { }
    if (false) {
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.pk_entity;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.entity_version;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.pk_text;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.quill_doc;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.string;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.fk_system_type;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.fk_namespace;
        /** @type {?|undefined} */
        DatDigitalWithRelations.prototype.namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datNamespace.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatNamespace() { }
    if (false) {
        /** @type {?|undefined} */
        DatNamespace.prototype.pk_entity;
        /** @type {?|undefined} */
        DatNamespace.prototype.fk_root_namespace;
        /** @type {?} */
        DatNamespace.prototype.fk_project;
        /** @type {?} */
        DatNamespace.prototype.standard_label;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datNamespaceWithRelations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * (tsType: DatNamespaceWithRelations, schemaOptions: { includeRelations: true })
     * @record
     */
    function DatNamespaceWithRelations() { }
    if (false) {
        /** @type {?|undefined} */
        DatNamespaceWithRelations.prototype.pk_entity;
        /** @type {?|undefined} */
        DatNamespaceWithRelations.prototype.fk_root_namespace;
        /** @type {?} */
        DatNamespaceWithRelations.prototype.fk_project;
        /** @type {?} */
        DatNamespaceWithRelations.prototype.standard_label;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DatObject() { }
    if (false) {
        /** @type {?|undefined} */
        DatObject.prototype.digital;
        /** @type {?|undefined} */
        DatObject.prototype.column;
        /** @type {?|undefined} */
        DatObject.prototype.text_property;
        /** @type {?|undefined} */
        DatObject.prototype.class_column_mapping;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/datTextProperty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DatTextProperty() { }
    if (false) {
        /** @type {?|undefined} */
        DatTextProperty.prototype.pk_entity;
        /** @type {?|undefined} */
        DatTextProperty.prototype.string;
        /** @type {?|undefined} */
        DatTextProperty.prototype.quill_doc;
        /** @type {?|undefined} */
        DatTextProperty.prototype.fk_system_type;
        /** @type {?|undefined} */
        DatTextProperty.prototype.fk_language;
        /** @type {?|undefined} */
        DatTextProperty.prototype.fk_entity;
        /** @type {?|undefined} */
        DatTextProperty.prototype.fk_namespace;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dfhApiProfile.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DfhApiProfile() { }
    if (false) {
        /** @type {?|undefined} */
        DfhApiProfile.prototype.pk_entity;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_pk_profile;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.tmsp_last_dfh_update;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.is_enabled_in_profile;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.removed_from_api;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.requested_language;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_profile_label_language;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_profile_label;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_profile_definition_language;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_profile_definition;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_owned_by_project;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_project_label_language;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_project_label;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_is_ongoing_forced_publication;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_date_profile_published;
        /** @type {?|undefined} */
        DfhApiProfile.prototype.dfh_date_profile_deprecated;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dfhClass.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DfhClass() { }
    if (false) {
        /** @type {?|undefined} */
        DfhClass.prototype.pk_class;
        /** @type {?|undefined} */
        DfhClass.prototype.identifier_in_namespace;
        /** @type {?|undefined} */
        DfhClass.prototype.basic_type;
        /** @type {?|undefined} */
        DfhClass.prototype.profiles;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dfhLabel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DfhLabel() { }
    if (false) {
        /** @type {?} */
        DfhLabel.prototype.type;
        /** @type {?|undefined} */
        DfhLabel.prototype.label;
        /** @type {?|undefined} */
        DfhLabel.prototype.language;
        /** @type {?|undefined} */
        DfhLabel.prototype.fk_profile;
        /** @type {?|undefined} */
        DfhLabel.prototype.fk_project;
        /** @type {?|undefined} */
        DfhLabel.prototype.fk_property;
        /** @type {?|undefined} */
        DfhLabel.prototype.fk_class;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dfhObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DfhObject() { }
    if (false) {
        /** @type {?|undefined} */
        DfhObject.prototype.profile;
        /** @type {?|undefined} */
        DfhObject.prototype.klass;
        /** @type {?|undefined} */
        DfhObject.prototype.property;
        /** @type {?|undefined} */
        DfhObject.prototype.label;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dfhProfile.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function DfhProfile() { }
    if (false) {
        /** @type {?} */
        DfhProfile.prototype.pk_profile;
        /** @type {?|undefined} */
        DfhProfile.prototype.owned_by_project;
        /** @type {?|undefined} */
        DfhProfile.prototype.is_ongoing_forced_publication;
        /** @type {?|undefined} */
        DfhProfile.prototype.date_profile_published;
        /** @type {?|undefined} */
        DfhProfile.prototype.date_profile_deprecated;
        /** @type {?|undefined} */
        DfhProfile.prototype.tmsp_last_dfh_update;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dfhProperty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DfhProperty() { }
    if (false) {
        /** @type {?} */
        DfhProperty.prototype.pk_property;
        /** @type {?|undefined} */
        DfhProperty.prototype.is_inherited;
        /** @type {?} */
        DfhProperty.prototype.has_domain;
        /** @type {?|undefined} */
        DfhProperty.prototype.domain_instances_min_quantifier;
        /** @type {?|undefined} */
        DfhProperty.prototype.domain_instances_max_quantifier;
        /** @type {?} */
        DfhProperty.prototype.has_range;
        /** @type {?|undefined} */
        DfhProperty.prototype.range_instances_min_quantifier;
        /** @type {?|undefined} */
        DfhProperty.prototype.range_instances_max_quantifier;
        /** @type {?|undefined} */
        DfhProperty.prototype.identity_defining;
        /** @type {?|undefined} */
        DfhProperty.prototype.is_has_type_subproperty;
        /** @type {?|undefined} */
        DfhProperty.prototype.identifier_in_namespace;
        /** @type {?|undefined} */
        DfhProperty.prototype.profiles;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/dimensionValueObjectType.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * This list type allows to create / view / edit a numeric value with a measurement unit.
     * @record
     */
    function DimensionValueObjectType() { }
    if (false) {
        /** @type {?} */
        DimensionValueObjectType.prototype.measurementUnitClass;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/entityLabelConfig.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function EntityLabelConfig() { }
    if (false) {
        /** @type {?|undefined} */
        EntityLabelConfig.prototype.labelParts;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/entitySearchHit.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function EntitySearchHit() { }
    if (false) {
        /** @type {?|undefined} */
        EntitySearchHit.prototype.pk_entity;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.fk_project;
        /** @type {?} */
        EntitySearchHit.prototype.project;
        /** @type {?} */
        EntitySearchHit.prototype.fk_class;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.class_label;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.entity_label;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.entity_type;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.type_label;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.fk_type;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.time_span;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.first_second;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.last_second;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.tmsp_last_modification;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.full_text_headline;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.class_label_headline;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.entity_label_headline;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.type_label_headline;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.projects;
        /** @type {?|undefined} */
        EntitySearchHit.prototype.related_statements;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/factoidEntity.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function FactoidEntity() { }
    if (false) {
        /** @type {?|undefined} */
        FactoidEntity.prototype.pkDigital;
        /** @type {?|undefined} */
        FactoidEntity.prototype.pkClass;
        /** @type {?|undefined} */
        FactoidEntity.prototype.pkRow;
        /** @type {?|undefined} */
        FactoidEntity.prototype.pkColumn;
        /** @type {?|undefined} */
        FactoidEntity.prototype.pkFactoidMapping;
        /** @type {?|undefined} */
        FactoidEntity.prototype.headerStatements;
        /** @type {?|undefined} */
        FactoidEntity.prototype.bodyStatements;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/factoidStatement.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function FactoidStatement() { }
    if (false) {
        /** @type {?|undefined} */
        FactoidStatement.prototype.fkProperty;
        /** @type {?|undefined} */
        FactoidStatement.prototype.isOutgoing;
        /** @type {?|undefined} */
        FactoidStatement.prototype.value;
        /** @type {?|undefined} */
        FactoidStatement.prototype.pkEntity;
        /** @type {?|undefined} */
        FactoidStatement.prototype.pkCell;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/geoEntityMapAndTimeCont.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GeoEntityMapAndTimeCont() { }
    if (false) {
        /** @type {?} */
        GeoEntityMapAndTimeCont.prototype.geo_entity_pk;
        /** @type {?} */
        GeoEntityMapAndTimeCont.prototype.geo_entity_preview;
        /** @type {?} */
        GeoEntityMapAndTimeCont.prototype.geo_positions;
        /** @type {?} */
        GeoEntityMapAndTimeCont.prototype.pk_entities;
        /** @type {?} */
        GeoEntityMapAndTimeCont.prototype.temporal_data;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/getEntityLabelConfigResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GetEntityLabelConfigResponse() { }
    if (false) {
        /** @type {?|undefined} */
        GetEntityLabelConfigResponse.prototype.defaultConfig;
        /** @type {?|undefined} */
        GetEntityLabelConfigResponse.prototype.customConfig;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/getFactoidsFromEntityResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GetFactoidsFromEntityResponse() { }
    if (false) {
        /** @type {?|undefined} */
        GetFactoidsFromEntityResponse.prototype.pkEntity;
        /** @type {?|undefined} */
        GetFactoidsFromEntityResponse.prototype.factoidEntities;
        /** @type {?|undefined} */
        GetFactoidsFromEntityResponse.prototype.totalLength;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/getTablePageOptions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (GetTablePageOptions) {
        GetTablePageOptions.SortDirectionEnum = {
            Asc: (/** @type {?} */ ('ASC')),
            Desc: (/** @type {?} */ ('DESC'))
        };
    })(exports.GetTablePageOptions || (exports.GetTablePageOptions = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvLoadSubfieldPageReq.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GvLoadSubfieldPageReq() { }
    if (false) {
        /** @type {?} */
        GvLoadSubfieldPageReq.prototype.pkProject;
        /** @type {?} */
        GvLoadSubfieldPageReq.prototype.page;
        /** @type {?} */
        GvLoadSubfieldPageReq.prototype.subfieldType;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvPaginationAlternativeLeafItemsReq.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GvPaginationAlternativeLeafItemsReq() { }
    if (false) {
        /** @type {?|undefined} */
        GvPaginationAlternativeLeafItemsReq.prototype.pkProject;
        /** @type {?|undefined} */
        GvPaginationAlternativeLeafItemsReq.prototype.filterObject;
        /** @type {?|undefined} */
        GvPaginationAlternativeLeafItemsReq.prototype.limit;
        /** @type {?|undefined} */
        GvPaginationAlternativeLeafItemsReq.prototype.offset;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvPaginationObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GvPaginationObject() { }
    if (false) {
        /** @type {?} */
        GvPaginationObject.prototype.schemas;
        /** @type {?} */
        GvPaginationObject.prototype.subfieldPages;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvPaginationStatementFilter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function GvPaginationStatementFilter() { }
    if (false) {
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_subject_info;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_subject_data;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_subject_tables_row;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_subject_tables_cell;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_property;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_property_of_property;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_object_info;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_object_data;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_object_tables_row;
        /** @type {?|undefined} */
        GvPaginationStatementFilter.prototype.fk_object_tables_cell;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvSchemaObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GvSchemaObject() { }
    if (false) {
        /** @type {?|undefined} */
        GvSchemaObject.prototype.inf;
        /** @type {?|undefined} */
        GvSchemaObject.prototype.pro;
        /** @type {?|undefined} */
        GvSchemaObject.prototype.dat;
        /** @type {?|undefined} */
        GvSchemaObject.prototype.war;
        /** @type {?|undefined} */
        GvSchemaObject.prototype.dfh;
        /** @type {?|undefined} */
        GvSchemaObject.prototype.sys;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvSubfieldPage.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GvSubfieldPage() { }
    if (false) {
        /** @type {?} */
        GvSubfieldPage.prototype.fkSourceEntity;
        /** @type {?} */
        GvSubfieldPage.prototype.fkProperty;
        /** @type {?} */
        GvSubfieldPage.prototype.isOutgoing;
        /** @type {?} */
        GvSubfieldPage.prototype.targetClass;
        /** @type {?} */
        GvSubfieldPage.prototype.limit;
        /** @type {?} */
        GvSubfieldPage.prototype.offset;
        /** @type {?} */
        GvSubfieldPage.prototype.scope;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvSubfieldPageInfo.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function GvSubfieldPageInfo() { }
    if (false) {
        /** @type {?} */
        GvSubfieldPageInfo.prototype.page;
        /** @type {?} */
        GvSubfieldPageInfo.prototype.count;
        /** @type {?} */
        GvSubfieldPageInfo.prototype.paginatedStatements;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvSubfieldType.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (GvSubfieldType) {
        GvSubfieldType.AppellationEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.LanguageEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.PlaceEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.TimePrimitiveEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.LangStringEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.TemporalEntityEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.EntityPreviewEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.TypeItemEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.TimeSpanEnum = {
            True: (/** @type {?} */ ('true'))
        };
        GvSubfieldType.TextPropertyEnum = {
            True: (/** @type {?} */ ('true'))
        };
    })(exports.GvSubfieldType || (exports.GvSubfieldType = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/gvSubfieldaPageScope.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * If present, defines a specific list type for the class.
     * @record
     */
    function GvSubfieldaPageScope() { }
    if (false) {
        /** @type {?|undefined} */
        GvSubfieldaPageScope.prototype.inProject;
        /** @type {?|undefined} */
        GvSubfieldaPageScope.prototype.notInProject;
        /** @type {?|undefined} */
        GvSubfieldaPageScope.prototype.inRepo;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/header.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function Header() { }
    if (false) {
        /** @type {?|undefined} */
        Header.prototype.colLabel;
        /** @type {?|undefined} */
        Header.prototype.comment;
        /** @type {?|undefined} */
        Header.prototype.type;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/httpErrorModel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function HttpErrorModel() { }
    if (false) {
        /** @type {?|undefined} */
        HttpErrorModel.prototype.error;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/httpErrorObjectModel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function HttpErrorObjectModel() { }
    if (false) {
        /** @type {?|undefined} */
        HttpErrorObjectModel.prototype.statusCode;
        /** @type {?|undefined} */
        HttpErrorObjectModel.prototype.name;
        /** @type {?|undefined} */
        HttpErrorObjectModel.prototype.message;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/importTable.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ImportTable() { }
    if (false) {
        /** @type {?} */
        ImportTable.prototype.tableName;
        /** @type {?} */
        ImportTable.prototype.fileName;
        /** @type {?} */
        ImportTable.prototype.pk_language;
        /** @type {?} */
        ImportTable.prototype.headers;
        /** @type {?} */
        ImportTable.prototype.rows;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/importTableResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ImportTableResponse() { }
    if (false) {
        /** @type {?|undefined} */
        ImportTableResponse.prototype.error;
        /** @type {?|undefined} */
        ImportTableResponse.prototype.fk_digital;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infAppellation.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfAppellation() { }
    if (false) {
        /** @type {?|undefined} */
        InfAppellation.prototype.pk_entity;
        /** @type {?|undefined} */
        InfAppellation.prototype.quill_doc;
        /** @type {?} */
        InfAppellation.prototype.fk_class;
        /** @type {?|undefined} */
        InfAppellation.prototype.string;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infDimension.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfDimension() { }
    if (false) {
        /** @type {?|undefined} */
        InfDimension.prototype.pk_entity;
        /** @type {?} */
        InfDimension.prototype.fk_class;
        /** @type {?} */
        InfDimension.prototype.fk_measurement_unit;
        /** @type {?|undefined} */
        InfDimension.prototype.numeric_value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infLangString.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfLangString() { }
    if (false) {
        /** @type {?|undefined} */
        InfLangString.prototype.pk_entity;
        /** @type {?} */
        InfLangString.prototype.fk_class;
        /** @type {?|undefined} */
        InfLangString.prototype.quill_doc;
        /** @type {?|undefined} */
        InfLangString.prototype.string;
        /** @type {?|undefined} */
        InfLangString.prototype.fk_language;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infLanguage.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfLanguage() { }
    if (false) {
        /** @type {?|undefined} */
        InfLanguage.prototype.fk_class;
        /** @type {?|undefined} */
        InfLanguage.prototype.pk_language;
        /** @type {?|undefined} */
        InfLanguage.prototype.lang_type;
        /** @type {?|undefined} */
        InfLanguage.prototype.scope;
        /** @type {?|undefined} */
        InfLanguage.prototype.iso6392b;
        /** @type {?|undefined} */
        InfLanguage.prototype.iso6392t;
        /** @type {?|undefined} */
        InfLanguage.prototype.iso6391;
        /** @type {?|undefined} */
        InfLanguage.prototype.notes;
        /** @type {?|undefined} */
        InfLanguage.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function InfObject() { }
    if (false) {
        /** @type {?|undefined} */
        InfObject.prototype.persistent_item;
        /** @type {?|undefined} */
        InfObject.prototype.temporal_entity;
        /** @type {?|undefined} */
        InfObject.prototype.statement;
        /** @type {?|undefined} */
        InfObject.prototype.place;
        /** @type {?|undefined} */
        InfObject.prototype.language;
        /** @type {?|undefined} */
        InfObject.prototype.appellation;
        /** @type {?|undefined} */
        InfObject.prototype.time_primitive;
        /** @type {?|undefined} */
        InfObject.prototype.text_property;
        /** @type {?|undefined} */
        InfObject.prototype.lang_string;
        /** @type {?|undefined} */
        InfObject.prototype.dimension;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infPersistentItem.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfPersistentItem() { }
    if (false) {
        /** @type {?} */
        InfPersistentItem.prototype.fk_class;
        /** @type {?|undefined} */
        InfPersistentItem.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infPlace.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfPlace() { }
    if (false) {
        /** @type {?} */
        InfPlace.prototype._long;
        /** @type {?} */
        InfPlace.prototype.lat;
        /** @type {?} */
        InfPlace.prototype.fk_class;
        /** @type {?|undefined} */
        InfPlace.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infStatement.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfStatement() { }
    if (false) {
        /** @type {?|undefined} */
        InfStatement.prototype.fk_subject_info;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_subject_data;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_subject_tables_cell;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_subject_tables_row;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_property;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_property_of_property;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_object_info;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_object_data;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_object_tables_cell;
        /** @type {?|undefined} */
        InfStatement.prototype.fk_object_tables_row;
        /** @type {?|undefined} */
        InfStatement.prototype.is_in_project_count;
        /** @type {?|undefined} */
        InfStatement.prototype.is_standard_in_project_count;
        /** @type {?|undefined} */
        InfStatement.prototype.community_favorite_calendar;
        /** @type {?|undefined} */
        InfStatement.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infStatementWithRelations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * (tsType: InfStatementWithRelations, schemaOptions: { includeRelations: true })
     * @record
     */
    function InfStatementWithRelations() { }
    if (false) {
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.pk_entity;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_subject_info;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_subject_data;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_subject_tables_cell;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_subject_tables_row;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_property;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_property_of_property;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_object_info;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_object_data;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_object_tables_cell;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.fk_object_tables_row;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.is_in_project_count;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.is_standard_in_project_count;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.community_favorite_calendar;
        /** @type {?|undefined} */
        InfStatementWithRelations.prototype.entity_version_project_rels;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infTemporalEntity.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfTemporalEntity() { }
    if (false) {
        /** @type {?} */
        InfTemporalEntity.prototype.fk_class;
        /** @type {?|undefined} */
        InfTemporalEntity.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infTextProperty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfTextProperty() { }
    if (false) {
        /** @type {?} */
        InfTextProperty.prototype.fk_class_field;
        /** @type {?} */
        InfTextProperty.prototype.fk_concerned_entity;
        /** @type {?} */
        InfTextProperty.prototype.fk_language;
        /** @type {?} */
        InfTextProperty.prototype.quill_doc;
        /** @type {?|undefined} */
        InfTextProperty.prototype.string;
        /** @type {?|undefined} */
        InfTextProperty.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/infTimePrimitive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function InfTimePrimitive() { }
    if (false) {
        /** @type {?|undefined} */
        InfTimePrimitive.prototype.pk_entity;
        /** @type {?} */
        InfTimePrimitive.prototype.fk_class;
        /** @type {?} */
        InfTimePrimitive.prototype.julian_day;
        /** @type {?} */
        InfTimePrimitive.prototype.duration;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/labelPart.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LabelPart() { }
    if (false) {
        /** @type {?|undefined} */
        LabelPart.prototype.field;
        /** @type {?|undefined} */
        LabelPart.prototype.ordNum;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/labelPartField.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function LabelPartField() { }
    if (false) {
        /** @type {?|undefined} */
        LabelPartField.prototype.fkProperty;
        /** @type {?|undefined} */
        LabelPartField.prototype.isOutgoing;
        /** @type {?|undefined} */
        LabelPartField.prototype.nrOfStatementsInLabel;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/loginRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function LoginRequest() { }
    if (false) {
        /** @type {?} */
        LoginRequest.prototype.email;
        /** @type {?} */
        LoginRequest.prototype.password;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/loginResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LoginResponse() { }
    if (false) {
        /** @type {?|undefined} */
        LoginResponse.prototype.user;
        /** @type {?|undefined} */
        LoginResponse.prototype.lb4Token;
        /** @type {?|undefined} */
        LoginResponse.prototype.lb4ExpiresInMs;
        /** @type {?|undefined} */
        LoginResponse.prototype.lb3Token;
        /** @type {?|undefined} */
        LoginResponse.prototype.lb3Ttl;
        /** @type {?|undefined} */
        LoginResponse.prototype.lb3Created;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/mapTemporalData.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MapTemporalData() { }
    if (false) {
        /** @type {?|undefined} */
        MapTemporalData.prototype.data_lookup;
        /** @type {?} */
        MapTemporalData.prototype.timeLinePoints;
        /** @type {?} */
        MapTemporalData.prototype.timeCzmlValues;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/newProDfhClassProjRel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function NewProDfhClassProjRel() { }
    if (false) {
        /** @type {?} */
        NewProDfhClassProjRel.prototype.fk_class;
        /** @type {?} */
        NewProDfhClassProjRel.prototype.fk_project;
        /** @type {?|undefined} */
        NewProDfhClassProjRel.prototype.enabled_in_entities;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/pingResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function PingResponse() { }
    if (false) {
        /** @type {?|undefined} */
        PingResponse.prototype.greeting;
        /** @type {?|undefined} */
        PingResponse.prototype.date;
        /** @type {?|undefined} */
        PingResponse.prototype.url;
        /** @type {?|undefined} */
        PingResponse.prototype.headers;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proAnalysis.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ProAnalysis() { }
    if (false) {
        /** @type {?|undefined} */
        ProAnalysis.prototype.pk_entity;
        /** @type {?} */
        ProAnalysis.prototype.name;
        /** @type {?|undefined} */
        ProAnalysis.prototype.description;
        /** @type {?} */
        ProAnalysis.prototype.analysis_definition;
        /** @type {?} */
        ProAnalysis.prototype.fk_project;
        /** @type {?} */
        ProAnalysis.prototype.fk_analysis_type;
        /** @type {?|undefined} */
        ProAnalysis.prototype.fk_last_modifier;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proClassFieldConfig.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProClassFieldConfig() { }
    if (false) {
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.pk_entity;
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.fk_project;
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.fk_property;
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.fk_class_field;
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.fk_domain_class;
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.fk_range_class;
        /** @type {?|undefined} */
        ProClassFieldConfig.prototype.ord_num;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proDfhClassProjRel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProDfhClassProjRel() { }
    if (false) {
        /** @type {?|undefined} */
        ProDfhClassProjRel.prototype.pk_entity;
        /** @type {?} */
        ProDfhClassProjRel.prototype.fk_class;
        /** @type {?} */
        ProDfhClassProjRel.prototype.fk_project;
        /** @type {?|undefined} */
        ProDfhClassProjRel.prototype.enabled_in_entities;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proDfhProfileProjRel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProDfhProfileProjRel() { }
    if (false) {
        /** @type {?|undefined} */
        ProDfhProfileProjRel.prototype.pk_entity;
        /** @type {?} */
        ProDfhProfileProjRel.prototype.fk_profile;
        /** @type {?} */
        ProDfhProfileProjRel.prototype.fk_project;
        /** @type {?|undefined} */
        ProDfhProfileProjRel.prototype.enabled;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proEntityLabelConfig.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ProEntityLabelConfig() { }
    if (false) {
        /** @type {?|undefined} */
        ProEntityLabelConfig.prototype.pk_entity;
        /** @type {?} */
        ProEntityLabelConfig.prototype.fk_project;
        /** @type {?} */
        ProEntityLabelConfig.prototype.fk_class;
        /** @type {?} */
        ProEntityLabelConfig.prototype.config;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proInfoProjRel.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProInfoProjRel() { }
    if (false) {
        /** @type {?} */
        ProInfoProjRel.prototype.fk_project;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.fk_entity;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.fk_entity_version;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.fk_entity_version_concat;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.is_in_project;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.is_standard_in_project;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.calendar;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.ord_num_of_domain;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.ord_num_of_range;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.ord_num_of_text_property;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.tmsp_last_modification;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.fk_creator;
        /** @type {?} */
        ProInfoProjRel.prototype.fk_last_modifier;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.pk_entity;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.entity_version;
        /** @type {?|undefined} */
        ProInfoProjRel.prototype.tmsp_creation;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proInfoProjRelWithRelations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * (tsType: ProInfoProjRelWithRelations, schemaOptions: { includeRelations: true })
     * @record
     */
    function ProInfoProjRelWithRelations() { }
    if (false) {
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.pk_entity;
        /** @type {?} */
        ProInfoProjRelWithRelations.prototype.fk_project;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.fk_entity;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.fk_entity_version;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.fk_entity_version_concat;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.is_in_project;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.is_standard_in_project;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.calendar;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.ord_num_of_domain;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.ord_num_of_range;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.ord_num_of_text_property;
        /** @type {?|undefined} */
        ProInfoProjRelWithRelations.prototype.fk_creator;
        /** @type {?} */
        ProInfoProjRelWithRelations.prototype.fk_last_modifier;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ProObject() { }
    if (false) {
        /** @type {?|undefined} */
        ProObject.prototype.info_proj_rel;
        /** @type {?|undefined} */
        ProObject.prototype.analysis;
        /** @type {?|undefined} */
        ProObject.prototype.class_field_config;
        /** @type {?|undefined} */
        ProObject.prototype.dfh_class_proj_rel;
        /** @type {?|undefined} */
        ProObject.prototype.text_property;
        /** @type {?|undefined} */
        ProObject.prototype.dfh_profile_proj_rel;
        /** @type {?|undefined} */
        ProObject.prototype.project;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proProject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProProject() { }
    if (false) {
        /** @type {?|undefined} */
        ProProject.prototype.pk_entity;
        /** @type {?|undefined} */
        ProProject.prototype.fk_language;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/proTextProperty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProTextProperty() { }
    if (false) {
        /** @type {?} */
        ProTextProperty.prototype.string;
        /** @type {?} */
        ProTextProperty.prototype.fk_system_type;
        /** @type {?} */
        ProTextProperty.prototype.fk_language;
        /** @type {?} */
        ProTextProperty.prototype.fk_project;
        /** @type {?|undefined} */
        ProTextProperty.prototype.fk_dfh_class;
        /** @type {?|undefined} */
        ProTextProperty.prototype.fk_dfh_property;
        /** @type {?|undefined} */
        ProTextProperty.prototype.fk_dfh_property_domain;
        /** @type {?|undefined} */
        ProTextProperty.prototype.fk_dfh_property_range;
        /** @type {?|undefined} */
        ProTextProperty.prototype.fk_pro_project;
        /** @type {?|undefined} */
        ProTextProperty.prototype.pk_entity;
        /** @type {?|undefined} */
        ProTextProperty.prototype.entity_version;
        /** @type {?|undefined} */
        ProTextProperty.prototype.tmsp_creation;
        /** @type {?|undefined} */
        ProTextProperty.prototype.tmsp_last_modification;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/projectPongRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ProjectPongRequest() { }
    if (false) {
        /** @type {?|undefined} */
        ProjectPongRequest.prototype.pkProject;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/pubAccount.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function PubAccount() { }
    if (false) {
        /** @type {?|undefined} */
        PubAccount.prototype.id;
        /** @type {?|undefined} */
        PubAccount.prototype.realm;
        /** @type {?|undefined} */
        PubAccount.prototype.username;
        /** @type {?} */
        PubAccount.prototype.email;
        /** @type {?|undefined} */
        PubAccount.prototype.emailVerified;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/queryDefinition.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function QueryDefinition() { }
    if (false) {
        /** @type {?} */
        QueryDefinition.prototype.filter;
        /** @type {?} */
        QueryDefinition.prototype.columns;
        /** @type {?|undefined} */
        QueryDefinition.prototype.limit;
        /** @type {?|undefined} */
        QueryDefinition.prototype.offset;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/queryFilter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function QueryFilter() { }
    if (false) {
        /** @type {?|undefined} */
        QueryFilter.prototype.children;
        /** @type {?} */
        QueryFilter.prototype.data;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/queryFilterData.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (QueryFilterData) {
        QueryFilterData.SubgroupEnum = {
            Property: (/** @type {?} */ ('property')),
            ClassAndType: (/** @type {?} */ ('classAndType'))
        };
        QueryFilterData.OperatorEnum = {
            Is: (/** @type {?} */ ('IS')),
            IsNot: (/** @type {?} */ ('IS NOT')),
            EntityLabelContains: (/** @type {?} */ ('ENTITY_LABEL_CONTAINS')),
            And: (/** @type {?} */ ('AND')),
            Or: (/** @type {?} */ ('OR'))
        };
    })(exports.QueryFilterData || (exports.QueryFilterData = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/queryPathSegment.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (QueryPathSegment) {
        QueryPathSegment.TypeEnum = {
            Properties: (/** @type {?} */ ('properties')),
            Classes: (/** @type {?} */ ('classes'))
        };
    })(exports.QueryPathSegment || (exports.QueryPathSegment = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/queryPathSegmentData.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function QueryPathSegmentData() { }
    if (false) {
        /** @type {?|undefined} */
        QueryPathSegmentData.prototype.classes;
        /** @type {?|undefined} */
        QueryPathSegmentData.prototype.types;
        /** @type {?|undefined} */
        QueryPathSegmentData.prototype.outgoingProperties;
        /** @type {?|undefined} */
        QueryPathSegmentData.prototype.ingoingProperties;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/relatedProfile.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function RelatedProfile() { }
    if (false) {
        /** @type {?|undefined} */
        RelatedProfile.prototype.fk_profile;
        /** @type {?|undefined} */
        RelatedProfile.prototype.removed_from_api;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/resetPasswordRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ResetPasswordRequest() { }
    if (false) {
        /** @type {?} */
        ResetPasswordRequest.prototype.password;
        /** @type {?} */
        ResetPasswordRequest.prototype.resetPasswordToken;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/responseWithMsg.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function ResponseWithMsg() { }
    if (false) {
        /** @type {?|undefined} */
        ResponseWithMsg.prototype.message;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/role.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function Role() { }
    if (false) {
        /** @type {?|undefined} */
        Role.prototype.id;
        /** @type {?} */
        Role.prototype.name;
        /** @type {?|undefined} */
        Role.prototype.description;
        /** @type {?|undefined} */
        Role.prototype.created;
        /** @type {?|undefined} */
        Role.prototype.modified;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/schemaObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SchemaObject() { }
    if (false) {
        /** @type {?} */
        SchemaObject.prototype.inf;
        /** @type {?|undefined} */
        SchemaObject.prototype.pro;
        /** @type {?|undefined} */
        SchemaObject.prototype.dat;
        /** @type {?|undefined} */
        SchemaObject.prototype.sys;
        /** @type {?|undefined} */
        SchemaObject.prototype.dfh;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/searchExistingRelatedStatement.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SearchExistingRelatedStatement() { }
    if (false) {
        /** @type {?} */
        SearchExistingRelatedStatement.prototype.relateBy;
        /** @type {?|undefined} */
        SearchExistingRelatedStatement.prototype.filter;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/searchExistingRelatedStatementFilter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SearchExistingRelatedStatementFilter() { }
    if (false) {
        /** @type {?} */
        SearchExistingRelatedStatementFilter.prototype.key;
        /** @type {?} */
        SearchExistingRelatedStatementFilter.prototype.value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/signupRequest.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SignupRequest() { }
    if (false) {
        /** @type {?} */
        SignupRequest.prototype.email;
        /** @type {?} */
        SignupRequest.prototype.username;
        /** @type {?} */
        SignupRequest.prototype.password;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/signupResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SignupResponse() { }
    if (false) {
        /** @type {?|undefined} */
        SignupResponse.prototype.success;
        /** @type {?|undefined} */
        SignupResponse.prototype.validationError;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/signupValidationError.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SignupValidationError() { }
    if (false) {
        /** @type {?|undefined} */
        SignupValidationError.prototype.email;
        /** @type {?|undefined} */
        SignupValidationError.prototype.username;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysClassField.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SysClassField() { }
    if (false) {
        /** @type {?|undefined} */
        SysClassField.prototype.pk_entity;
        /** @type {?|undefined} */
        SysClassField.prototype.description;
        /** @type {?|undefined} */
        SysClassField.prototype.label;
        /** @type {?|undefined} */
        SysClassField.prototype.fk_system_type_ng_component;
        /** @type {?|undefined} */
        SysClassField.prototype.used_table;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysClassHasTypeProperty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SysClassHasTypeProperty() { }
    if (false) {
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.pk_typed_class;
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.typed_class_label;
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.dfh_pk_property;
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.property_label;
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.pk_type_class;
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.type_class_label;
        /** @type {?|undefined} */
        SysClassHasTypeProperty.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigFieldDisplay.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SysConfigFieldDisplay() { }
    if (false) {
        /** @type {?|undefined} */
        SysConfigFieldDisplay.prototype.comment;
        /** @type {?|undefined} */
        SysConfigFieldDisplay.prototype.displayInBasicFields;
        /** @type {?|undefined} */
        SysConfigFieldDisplay.prototype.hidden;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigFieldPosition.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SysConfigFieldPosition() { }
    if (false) {
        /** @type {?|undefined} */
        SysConfigFieldPosition.prototype.position;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigFieldsByProperty.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SysConfigFieldsByProperty() { }
    if (false) {
        /** @type {?|undefined} */
        SysConfigFieldsByProperty.prototype._1;
        /* Skipping unhandled member: [key: string]: SysConfigFieldDisplay | any;*/
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigFieldsBySourceClass.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SysConfigFieldsBySourceClass() { }
    if (false) {
        /** @type {?|undefined} */
        SysConfigFieldsBySourceClass.prototype._1;
        /* Skipping unhandled member: [key: string]: SysConfigFieldsBySourceClass | any;*/
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigSpecialFields.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SysConfigSpecialFields() { }
    if (false) {
        /** @type {?|undefined} */
        SysConfigSpecialFields.prototype.incomingProperties;
        /** @type {?|undefined} */
        SysConfigSpecialFields.prototype.outgoingProperties;
        /** @type {?|undefined} */
        SysConfigSpecialFields.prototype.bySourceClass;
        /** @type {?|undefined} */
        SysConfigSpecialFields.prototype.hasTypeSubproperties;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigValue.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Classes indexed by primary key: Use class id as key (e.g. \"21\" for Person, https://ontome.dataforhistory.org/class/21)
     * @record
     */
    function SysConfigValue() { }
    if (false) {
        /** @type {?} */
        SysConfigValue.prototype.classes;
        /** @type {?} */
        SysConfigValue.prototype.specialFields;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysConfigValueObjectType.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (SysConfigValueObjectType) {
        SysConfigValueObjectType.AppellationEnum = {
            True: (/** @type {?} */ ('true'))
        };
        SysConfigValueObjectType.LanguageEnum = {
            True: (/** @type {?} */ ('true'))
        };
        SysConfigValueObjectType.PlaceEnum = {
            True: (/** @type {?} */ ('true'))
        };
        SysConfigValueObjectType.TimePrimitiveEnum = {
            True: (/** @type {?} */ ('true'))
        };
        SysConfigValueObjectType.LangStringEnum = {
            True: (/** @type {?} */ ('true'))
        };
    })(exports.SysConfigValueObjectType || (exports.SysConfigValueObjectType = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SysObject() { }
    if (false) {
        /** @type {?|undefined} */
        SysObject.prototype.config;
        /** @type {?|undefined} */
        SysObject.prototype.klass;
        /** @type {?|undefined} */
        SysObject.prototype.property;
        /** @type {?|undefined} */
        SysObject.prototype.label;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysSystemRelevantClass.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SysSystemRelevantClass() { }
    if (false) {
        /** @type {?|undefined} */
        SysSystemRelevantClass.prototype.fk_class;
        /** @type {?|undefined} */
        SysSystemRelevantClass.prototype.required_by_entities;
        /** @type {?|undefined} */
        SysSystemRelevantClass.prototype.required_by_sources;
        /** @type {?|undefined} */
        SysSystemRelevantClass.prototype.required_by_basics;
        /** @type {?|undefined} */
        SysSystemRelevantClass.prototype.excluded_from_entities;
        /** @type {?|undefined} */
        SysSystemRelevantClass.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/sysSystemType.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function SysSystemType() { }
    if (false) {
        /** @type {?|undefined} */
        SysSystemType.prototype.notes;
        /** @type {?|undefined} */
        SysSystemType.prototype.definition;
        /** @type {?|undefined} */
        SysSystemType.prototype.st_schema_name;
        /** @type {?|undefined} */
        SysSystemType.prototype.st_table_name;
        /** @type {?|undefined} */
        SysSystemType.prototype.st_column_name;
        /** @type {?|undefined} */
        SysSystemType.prototype.st_group;
        /** @type {?|undefined} */
        SysSystemType.prototype.pk_entity;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tColFilter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TColFilter() { }
    if (false) {
        /** @type {?|undefined} */
        TColFilter.prototype.numeric;
        /** @type {?|undefined} */
        TColFilter.prototype.text;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tColFilterNum.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (TColFilterNum) {
        TColFilterNum.OperatorEnum = {
            Equal: (/** @type {?} */ ('=')),
            LessThan: (/** @type {?} */ ('<')),
            GreaterThan: (/** @type {?} */ ('>'))
        };
    })(exports.TColFilterNum || (exports.TColFilterNum = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tColFilterTxt.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (TColFilterTxt) {
        TColFilterTxt.OperatorEnum = {
            ILike: (/** @type {?} */ ('%iLike%'))
        };
    })(exports.TColFilterTxt || (exports.TColFilterTxt = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tColFilters.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TColFilters() { }
    if (false) {
        /** @type {?|undefined} */
        TColFilters.prototype.colName1;
        /* Skipping unhandled member: [key: string]: TColFilter | any;*/
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tabCell.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function TabCell() { }
    if (false) {
        /** @type {?|undefined} */
        TabCell.prototype.pk_cell;
        /** @type {?|undefined} */
        TabCell.prototype.fk_column;
        /** @type {?|undefined} */
        TabCell.prototype.fk_row;
        /** @type {?|undefined} */
        TabCell.prototype.fk_digital;
        /** @type {?|undefined} */
        TabCell.prototype.string_value;
        /** @type {?|undefined} */
        TabCell.prototype.numeric_value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tabRow.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function TabRow() { }
    if (false) {
        /** @type {?|undefined} */
        TabRow.prototype.pk_row;
        /** @type {?|undefined} */
        TabRow.prototype.fk_digital;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tableCell.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function TableCell() { }
    if (false) {
        /** @type {?|undefined} */
        TableCell.prototype.string_value;
        /** @type {?|undefined} */
        TableCell.prototype.numeric_value;
        /** @type {?|undefined} */
        TableCell.prototype.pk_cell;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tablePageResponse.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TablePageResponse() { }
    if (false) {
        /** @type {?|undefined} */
        TablePageResponse.prototype.rows;
        /** @type {?|undefined} */
        TablePageResponse.prototype.columns;
        /** @type {?|undefined} */
        TablePageResponse.prototype.length;
        /** @type {?|undefined} */
        TablePageResponse.prototype.schemaObject;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/tableRow.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TableRow() { }
    if (false) {
        /** @type {?|undefined} */
        TableRow.prototype.colName1;
        /* Skipping unhandled member: [key: string]: TableCell | any;*/
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/timeChartContLine.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TimeChartContLine() { }
    if (false) {
        /** @type {?} */
        TimeChartContLine.prototype.visualizationDefinition;
        /** @type {?} */
        TimeChartContLine.prototype.queryDefinition;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/timeChartContQueryDef.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function TimeChartContQueryDef() { }
    if (false) {
        /** @type {?} */
        TimeChartContQueryDef.prototype.filter;
        /** @type {?} */
        TimeChartContQueryDef.prototype.columns;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/timeChartContVisualSettings.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function TimeChartContVisualSettings() { }
    if (false) {
        /** @type {?|undefined} */
        TimeChartContVisualSettings.prototype.label;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/timeCzmlValue.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function TimeCzmlValue() { }
    if (false) {
        /** @type {?} */
        TimeCzmlValue.prototype.iso_x;
        /** @type {?} */
        TimeCzmlValue.prototype.y;
        /** @type {?} */
        TimeCzmlValue.prototype.data_ref;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/timePrimitiveWithCal.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (TimePrimitiveWithCal) {
        TimePrimitiveWithCal.DurationEnum = {
            Century: (/** @type {?} */ ('1 century')),
            Decade: (/** @type {?} */ ('1 decade')),
            Year: (/** @type {?} */ ('1 year')),
            Month: (/** @type {?} */ ('1 month')),
            Day: (/** @type {?} */ ('1 day')),
            Hour: (/** @type {?} */ ('1 hour')),
            Minute: (/** @type {?} */ ('1 minute')),
            Second: (/** @type {?} */ ('1 second'))
        };
        TimePrimitiveWithCal.CalendarEnum = {
            Gregorian: (/** @type {?} */ ('gregorian')),
            Julian: (/** @type {?} */ ('julian'))
        };
    })(exports.TimePrimitiveWithCal || (exports.TimePrimitiveWithCal = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warEntityPreview.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarEntityPreview() { }
    if (false) {
        /** @type {?|undefined} */
        WarEntityPreview.prototype.pk_entity;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.fk_project;
        /** @type {?} */
        WarEntityPreview.prototype.project;
        /** @type {?} */
        WarEntityPreview.prototype.fk_class;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.class_label;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.entity_label;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.entity_type;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.type_label;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.fk_type;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.time_span;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.first_second;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.last_second;
        /** @type {?|undefined} */
        WarEntityPreview.prototype.tmsp_last_modification;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warEntityPreviewPaginatedByPkReq.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function WarEntityPreviewPaginatedByPkReq() { }
    if (false) {
        /** @type {?} */
        WarEntityPreviewPaginatedByPkReq.prototype.pkProject;
        /** @type {?} */
        WarEntityPreviewPaginatedByPkReq.prototype.pkEntities;
        /** @type {?} */
        WarEntityPreviewPaginatedByPkReq.prototype.limit;
        /** @type {?} */
        WarEntityPreviewPaginatedByPkReq.prototype.offset;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warEntityPreviewSearchExistingReq.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarEntityPreviewSearchExistingReq() { }
    if (false) {
        /** @type {?} */
        WarEntityPreviewSearchExistingReq.prototype.projectId;
        /** @type {?} */
        WarEntityPreviewSearchExistingReq.prototype.searchString;
        /** @type {?} */
        WarEntityPreviewSearchExistingReq.prototype.pkClasses;
        /** @type {?} */
        WarEntityPreviewSearchExistingReq.prototype.entityType;
        /** @type {?} */
        WarEntityPreviewSearchExistingReq.prototype.limit;
        /** @type {?} */
        WarEntityPreviewSearchExistingReq.prototype.page;
        /** @type {?|undefined} */
        WarEntityPreviewSearchExistingReq.prototype.relatedStatement;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warEntityPreviewTimeSpan.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarEntityPreviewTimeSpan() { }
    if (false) {
        /** @type {?|undefined} */
        WarEntityPreviewTimeSpan.prototype.p82;
        /** @type {?|undefined} */
        WarEntityPreviewTimeSpan.prototype.p81;
        /** @type {?|undefined} */
        WarEntityPreviewTimeSpan.prototype.p81a;
        /** @type {?|undefined} */
        WarEntityPreviewTimeSpan.prototype.p82a;
        /** @type {?|undefined} */
        WarEntityPreviewTimeSpan.prototype.p81b;
        /** @type {?|undefined} */
        WarEntityPreviewTimeSpan.prototype.p82b;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warEntityPreviewWithFulltext.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarEntityPreviewWithFulltext() { }
    if (false) {
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.pk_entity;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.fk_project;
        /** @type {?} */
        WarEntityPreviewWithFulltext.prototype.project;
        /** @type {?} */
        WarEntityPreviewWithFulltext.prototype.fk_class;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.class_label;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.entity_label;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.entity_type;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.type_label;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.fk_type;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.time_span;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.first_second;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.last_second;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.tmsp_last_modification;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.full_text;
        /** @type {?|undefined} */
        WarEntityPreviewWithFulltext.prototype.ts_vector;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warObject.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarObject() { }
    if (false) {
        /** @type {?|undefined} */
        WarObject.prototype.entity_preview;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementDimensionVT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function WarStatementDimensionVT() { }
    if (false) {
        /** @type {?} */
        WarStatementDimensionVT.prototype.pkEntity;
        /** @type {?} */
        WarStatementDimensionVT.prototype.fkClass;
        /** @type {?} */
        WarStatementDimensionVT.prototype.fkMeasurementUnit;
        /** @type {?} */
        WarStatementDimensionVT.prototype.numericValue;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementGeoJson.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (WarStatementGeoJson) {
        WarStatementGeoJson.TypeEnum = {
            Point: (/** @type {?} */ ('Point'))
        };
    })(exports.WarStatementGeoJson || (exports.WarStatementGeoJson = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementGeometryVT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarStatementGeometryVT() { }
    if (false) {
        /** @type {?} */
        WarStatementGeometryVT.prototype.pkEntity;
        /** @type {?} */
        WarStatementGeometryVT.prototype.fkClass;
        /** @type {?} */
        WarStatementGeometryVT.prototype.geoJSON;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementLangStringVT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function WarStatementLangStringVT() { }
    if (false) {
        /** @type {?} */
        WarStatementLangStringVT.prototype.pkEntity;
        /** @type {?} */
        WarStatementLangStringVT.prototype.fkClass;
        /** @type {?} */
        WarStatementLangStringVT.prototype.fkLanguage;
        /** @type {?} */
        WarStatementLangStringVT.prototype.string;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementLanguageVT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function WarStatementLanguageVT() { }
    if (false) {
        /** @type {?} */
        WarStatementLanguageVT.prototype.pkEntity;
        /** @type {?} */
        WarStatementLanguageVT.prototype.fkClass;
        /** @type {?} */
        WarStatementLanguageVT.prototype.label;
        /** @type {?} */
        WarStatementLanguageVT.prototype.iso6391;
        /** @type {?} */
        WarStatementLanguageVT.prototype.iso6392b;
        /** @type {?} */
        WarStatementLanguageVT.prototype.iso6392t;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementObjectValue.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarStatementObjectValue() { }
    if (false) {
        /** @type {?|undefined} */
        WarStatementObjectValue.prototype.string;
        /** @type {?|undefined} */
        WarStatementObjectValue.prototype.geometry;
        /** @type {?|undefined} */
        WarStatementObjectValue.prototype.language;
        /** @type {?|undefined} */
        WarStatementObjectValue.prototype.timePrimitive;
        /** @type {?|undefined} */
        WarStatementObjectValue.prototype.langString;
        /** @type {?|undefined} */
        WarStatementObjectValue.prototype.dimension;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementStringVT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function WarStatementStringVT() { }
    if (false) {
        /** @type {?} */
        WarStatementStringVT.prototype.pkEntity;
        /** @type {?} */
        WarStatementStringVT.prototype.fkClass;
        /** @type {?} */
        WarStatementStringVT.prototype.string;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementTimePrimitiveVT.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // WARNING: interface has both a type and a value, skipping emit

    (function (WarStatementTimePrimitiveVT) {
        WarStatementTimePrimitiveVT.DurationEnum = {
            Century: (/** @type {?} */ ('1 century')),
            Decade: (/** @type {?} */ ('1 decade')),
            Year: (/** @type {?} */ ('1 year')),
            Month: (/** @type {?} */ ('1 month')),
            Day: (/** @type {?} */ ('1 day')),
            Hour: (/** @type {?} */ ('1 hour')),
            Minute: (/** @type {?} */ ('1 minute')),
            Second: (/** @type {?} */ ('1 second'))
        };
        WarStatementTimePrimitiveVT.CalendarEnum = {
            Gregorian: (/** @type {?} */ ('gregorian')),
            Julian: (/** @type {?} */ ('julian'))
        };
    })(exports.WarStatementTimePrimitiveVT || (exports.WarStatementTimePrimitiveVT = {}));

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/warStatementTimePrimitiveVTPart.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * geovistory
     * Geovistory – Platform for Digital History
     *
     * The version of the OpenAPI document: 1.0.0
     *
     *
     * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
     * https://openapi-generator.tech
     * Do not edit the class manually.
     */
    /**
     * @record
     */
    function WarStatementTimePrimitiveVTPart() { }
    if (false) {
        /** @type {?} */
        WarStatementTimePrimitiveVTPart.prototype.julianDay;
        /** @type {?} */
        WarStatementTimePrimitiveVTPart.prototype.julianSecond;
        /** @type {?} */
        WarStatementTimePrimitiveVTPart.prototype.calJulian;
        /** @type {?} */
        WarStatementTimePrimitiveVTPart.prototype.calGregorian;
        /** @type {?} */
        WarStatementTimePrimitiveVTPart.prototype.calGregorianIso8601;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/sdk-lb4/model/wareEntityPreviewPage.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WareEntityPreviewPage() { }
    if (false) {
        /** @type {?|undefined} */
        WareEntityPreviewPage.prototype.totalCount;
        /** @type {?|undefined} */
        WareEntityPreviewPage.prototype.data;
    }

    exports.APIS = APIS;
    exports.AccountService = AccountService;
    exports.AnalysisService = AnalysisService;
    exports.BASE_PATH = BASE_PATH;
    exports.COLLECTION_FORMATS = COLLECTION_FORMATS;
    exports.Configuration = Configuration;
    exports.ContentTreeService = ContentTreeService;
    exports.DatChunkControllerService = DatChunkControllerService;
    exports.DatChunkService = DatChunkService;
    exports.DatColumnService = DatColumnService;
    exports.DatDigitalService = DatDigitalService;
    exports.DatNamespaceService = DatNamespaceService;
    exports.DfhClassControllerService = DfhClassControllerService;
    exports.DfhLabelService = DfhLabelService;
    exports.DfhProfileService = DfhProfileService;
    exports.DfhPropertyControllerService = DfhPropertyControllerService;
    exports.FactoidControllerService = FactoidControllerService;
    exports.ImportTableControllerService = ImportTableControllerService;
    exports.InfLanguageService = InfLanguageService;
    exports.InfPersistentItemService = InfPersistentItemService;
    exports.InfPlaceService = InfPlaceService;
    exports.InfStatementService = InfStatementService;
    exports.InfTemporalEntityService = InfTemporalEntityService;
    exports.InfTextPropertyService = InfTextPropertyService;
    exports.PaginatedStatementsControllerService = PaginatedStatementsControllerService;
    exports.PingControllerService = PingControllerService;
    exports.ProClassFieldConfigService = ProClassFieldConfigService;
    exports.ProDfhClassProjRelService = ProDfhClassProjRelService;
    exports.ProDfhProfileProjRelService = ProDfhProfileProjRelService;
    exports.ProInfoProjRelService = ProInfoProjRelService;
    exports.ProProjectService = ProProjectService;
    exports.ProTextPropertyService = ProTextPropertyService;
    exports.ProjectConfigurationService = ProjectConfigurationService;
    exports.PubAccountService = PubAccountService;
    exports.RamListService = RamListService;
    exports.SchemaObjectService = SchemaObjectService;
    exports.SdkLb4Module = ApiModule;
    exports.SysClassFieldService = SysClassFieldService;
    exports.SysClassHasTypePropertyService = SysClassHasTypePropertyService;
    exports.SysSystemRelevantClassService = SysSystemRelevantClassService;
    exports.SysSystemTypeService = SysSystemTypeService;
    exports.SystemConfigurationService = SystemConfigurationService;
    exports.TableService = TableService;
    exports.WarEntityPreviewControllerService = WarEntityPreviewControllerService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-sdk-lb4.umd.js.map
