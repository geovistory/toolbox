(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common/http'), require('@angular/common'), require('socket.io-client'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-sdk-lb3', ['exports', '@angular/core', 'rxjs', '@angular/common/http', '@angular/common', 'socket.io-client', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-sdk-lb3'] = {}), global.ng.core, global.rxjs, global.ng.common.http, global.ng.common, global.io, global.rxjs.operators));
}(this, (function (exports, core, rxjs, http, common, io, operators) { 'use strict';

    io = io && io.hasOwnProperty('default') ? io['default'] : io;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * Default error handler
     */
    var ErrorHandler = /** @class */ (function () {
        function ErrorHandler() {
        }
        ErrorHandler.prototype.handleError = function (errorResponse) {
            return rxjs.throwError(errorResponse.error.error || 'Server error');
        };
        ErrorHandler = __decorate([
            core.Injectable()
        ], ErrorHandler);
        return ErrorHandler;
    }());

    /* tslint:disable */
    /**
     * @module Storage
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @description
     * The InternalStorage class is used for dependency injection swapping.
     * It will be provided using factory method from different sources.
     **/
    var BaseStorage = /** @class */ (function () {
        function BaseStorage() {
        }
        /**
         * @method get
         * @param {string} key Storage key name
         * @return {any}
         * @description
         * The getter will return any type of data persisted in storage.
         **/
        BaseStorage.prototype.get = function (key) { };
        /**
         * @method set
         * @param {string} key Storage key name
         * @param {any} value Any value
         * @return {void}
         * @description
         * The setter will return any type of data persisted in localStorage.
         **/
        BaseStorage.prototype.set = function (key, value, expires) { };
        /**
         * @method remove
         * @param {string} key Storage key name
         * @return {void}
         * @description
         * This method will remove a localStorage item from the client.
         **/
        BaseStorage.prototype.remove = function (key) { };
        return BaseStorage;
    }());
    /**
     * @module InternalStorage
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @description
     * The InternalStorage class is used for dependency injection swapping.
     * It will be provided using factory method from different sources.
     * This is mainly required because Angular Universal integration.
     * It does inject a CookieStorage instead of LocalStorage.
     **/
    var InternalStorage = /** @class */ (function (_super) {
        __extends(InternalStorage, _super);
        function InternalStorage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InternalStorage;
    }(BaseStorage));
    /**
     * @module SDKStorage
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @description
     * The SDKStorage class is used for dependency injection swapping.
     * It will be provided using factory method according the right environment.
     * This is created for public usage, to allow persisting custom data
     * Into the local storage API.
     **/
    var SDKStorage = /** @class */ (function (_super) {
        __extends(SDKStorage, _super);
        function SDKStorage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SDKStorage;
    }(BaseStorage));

    /* tslint:disable */
    var AccessToken = /** @class */ (function () {
        function AccessToken(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `AccessToken`.
         */
        AccessToken.getModelName = function () {
            return "AccessToken";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of AccessToken for dynamic purposes.
        **/
        AccessToken.factory = function (data) {
            return new AccessToken(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        AccessToken.getModelDefinition = function () {
            return {
                name: 'AccessToken',
                plural: 'AccessTokens',
                properties: {
                    "id": {
                        name: 'id',
                        type: 'string'
                    },
                    "ttl": {
                        name: 'ttl',
                        type: 'number',
                        default: 1209600
                    },
                    "scopes": {
                        name: 'scopes',
                        type: '["string"]'
                    },
                    "created": {
                        name: 'created',
                        type: 'Date'
                    },
                    "userId": {
                        name: 'userId',
                        type: 'string'
                    },
                },
                relations: {
                    user: {
                        name: 'user',
                        type: 'User',
                        model: 'User'
                    },
                }
            };
        };
        return AccessToken;
    }());
    var SDKToken = /** @class */ (function () {
        function SDKToken(data) {
            this.id = null;
            this.ttl = null;
            this.scopes = null;
            this.created = null;
            this.userId = null;
            this.user = null;
            this.rememberMe = null;
            Object.assign(this, data);
        }
        return SDKToken;
    }());

    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module SocketConnection
    * @license MIT
    * @description
    * This module handle socket connections and return singleton instances for each
    * connection, it will use the SDK Socket Driver Available currently supporting
    * Angular 2 for web, NativeScript 2 and Angular Universal.
    **/
    var LoopBackAuth = /** @class */ (function () {
        /**
         * @method constructor
         * @param {InternalStorage} storage Internal Storage Driver
         * @description
         * The constructor will initialize the token loading data from storage
         **/
        function LoopBackAuth(storage) {
            this.storage = storage;
            /**
             * @type {SDKToken}
             **/
            this.token = new SDKToken();
            /**
             * @type {string}
             **/
            this.prefix = '$LoopBackSDK$';
            this.token.id = this.load('id');
            this.token.user = this.load('user');
            this.token.userId = this.load('userId');
            this.token.created = this.load('created');
            this.token.ttl = this.load('ttl');
            this.token.rememberMe = this.load('rememberMe');
        }
        /**
         * @method setRememberMe
         * @param {boolean} value Flag to remember credentials
         * @return {void}
         * @description
         * This method will set a flag in order to remember the current credentials
         **/
        LoopBackAuth.prototype.setRememberMe = function (value) {
            this.token.rememberMe = value;
        };
        /**
         * @method setUser
         * @param {any} user Any type of user model
         * @return {void}
         * @description
         * This method will update the user information and persist it if the
         * rememberMe flag is set.
         **/
        LoopBackAuth.prototype.setUser = function (user) {
            this.token.user = user;
            this.save();
        };
        /**
         * @method setToken
         * @param {SDKToken} token SDKToken or casted AccessToken instance
         * @return {void}
         * @description
         * This method will set a flag in order to remember the current credentials
         **/
        LoopBackAuth.prototype.setToken = function (token) {
            this.token = Object.assign({}, this.token, token);
            this.save();
        };
        /**
         * @method getToken
         * @return {void}
         * @description
         * This method will set a flag in order to remember the current credentials.
         **/
        LoopBackAuth.prototype.getToken = function () {
            return this.token;
        };
        /**
         * @method getAccessTokenId
         * @return {string}
         * @description
         * This method will return the actual token string, not the object instance.
         **/
        LoopBackAuth.prototype.getAccessTokenId = function () {
            return this.token.id;
        };
        /**
         * @method getCurrentUserId
         * @return {any}
         * @description
         * This method will return the current user id, it can be number or string.
         **/
        LoopBackAuth.prototype.getCurrentUserId = function () {
            return this.token.userId;
        };
        /**
         * @method getCurrentUserData
         * @return {any}
         * @description
         * This method will return the current user instance.
         **/
        LoopBackAuth.prototype.getCurrentUserData = function () {
            return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
        };
        /**
         * @method save
         * @return {boolean} Whether or not the information was saved
         * @description
         * This method will save in either local storage or cookies the current credentials.
         * But only if rememberMe is enabled.
         **/
        LoopBackAuth.prototype.save = function () {
            var today = new Date();
            var expires = new Date(today.getTime() + (this.token.ttl * 1000));
            this.persist('id', this.token.id, expires);
            this.persist('user', this.token.user, expires);
            this.persist('userId', this.token.userId, expires);
            this.persist('created', this.token.created, expires);
            this.persist('ttl', this.token.ttl, expires);
            this.persist('rememberMe', this.token.rememberMe, expires);
            return true;
        };
        ;
        /**
         * @method load
         * @param {string} prop Property name
         * @return {any} Any information persisted in storage
         * @description
         * This method will load either from local storage or cookies the provided property.
         **/
        LoopBackAuth.prototype.load = function (prop) {
            return this.storage.get("" + this.prefix + prop);
        };
        /**
         * @method clear
         * @return {void}
         * @description
         * This method will clear cookies or the local storage.
         **/
        LoopBackAuth.prototype.clear = function () {
            var _this = this;
            Object.keys(this.token).forEach(function (prop) { return _this.storage.remove("" + _this.prefix + prop); });
            this.token = new SDKToken();
        };
        /**
         * @method persist
         * @return {void}
         * @description
         * This method saves values to storage
         **/
        LoopBackAuth.prototype.persist = function (prop, value, expires) {
            try {
                this.storage.set("" + this.prefix + prop, (typeof value === 'object') ? JSON.stringify(value) : value, this.token.rememberMe ? expires : null);
            }
            catch (err) {
                console.error('Cannot access local/session storage:', err);
            }
        };
        LoopBackAuth.ctorParameters = function () { return [
            { type: InternalStorage, decorators: [{ type: core.Inject, args: [InternalStorage,] }] }
        ]; };
        LoopBackAuth = __decorate([
            core.Injectable(),
            __param(0, core.Inject(InternalStorage))
        ], LoopBackAuth);
        return LoopBackAuth;
    }());

    /* tslint:disable */
    /**
    * @module LoopBackConfig
    * @description
    *
    * The LoopBackConfig module help developers to externally
    * configure the base url and api version for loopback.io
    *
    * Example
    *
    * import { LoopBackConfig } from './sdk';
    *
    * @Component() // No metadata needed for this module
    *
    * export class MyApp {
    *   constructor() {
    *     LoopBackConfig.setBaseURL('http://localhost:3000');
    *     LoopBackConfig.setApiVersion('api');
    *   }
    * }
    **/
    var LoopBackConfig = /** @class */ (function () {
        function LoopBackConfig() {
        }
        LoopBackConfig.setApiVersion = function (version) {
            if (version === void 0) { version = 'api'; }
            LoopBackConfig.version = version;
        };
        LoopBackConfig.getApiVersion = function () {
            return LoopBackConfig.version;
        };
        LoopBackConfig.setBaseURL = function (url) {
            if (url === void 0) { url = '/'; }
            LoopBackConfig.path = url;
        };
        LoopBackConfig.getPath = function () {
            return LoopBackConfig.path;
        };
        LoopBackConfig.setAuthPrefix = function (authPrefix) {
            if (authPrefix === void 0) { authPrefix = ''; }
            LoopBackConfig.authPrefix = authPrefix;
        };
        LoopBackConfig.getAuthPrefix = function () {
            return LoopBackConfig.authPrefix;
        };
        LoopBackConfig.setDebugMode = function (isEnabled) {
            LoopBackConfig.debug = isEnabled;
        };
        LoopBackConfig.debuggable = function () {
            return LoopBackConfig.debug;
        };
        LoopBackConfig.filterOnUrl = function () {
            LoopBackConfig.filterOn = 'url';
        };
        LoopBackConfig.filterOnHeaders = function () {
            LoopBackConfig.filterOn = 'headers';
        };
        LoopBackConfig.whereOnUrl = function () {
            LoopBackConfig.whereOn = 'url';
        };
        LoopBackConfig.whereOnHeaders = function () {
            LoopBackConfig.whereOn = 'headers';
        };
        LoopBackConfig.isHeadersFilteringSet = function () {
            return (LoopBackConfig.filterOn === 'headers');
        };
        LoopBackConfig.isHeadersWhereSet = function () {
            return (LoopBackConfig.whereOn === 'headers');
        };
        LoopBackConfig.setSecureWebSockets = function () {
            LoopBackConfig.secure = true;
        };
        LoopBackConfig.unsetSecureWebSockets = function () {
            LoopBackConfig.secure = false;
        };
        LoopBackConfig.isSecureWebSocketsSet = function () {
            return LoopBackConfig.secure;
        };
        LoopBackConfig.setRequestOptionsCredentials = function (withCredentials) {
            if (withCredentials === void 0) { withCredentials = false; }
            LoopBackConfig.withCredentials = withCredentials;
        };
        LoopBackConfig.getRequestOptionsCredentials = function () {
            return LoopBackConfig.withCredentials;
        };
        LoopBackConfig.path = '//:3000';
        LoopBackConfig.version = 'lb3-api';
        LoopBackConfig.authPrefix = '';
        LoopBackConfig.debug = true;
        LoopBackConfig.filterOn = 'headers';
        LoopBackConfig.whereOn = 'headers';
        LoopBackConfig.secure = false;
        LoopBackConfig.withCredentials = false;
        return LoopBackConfig;
    }());

    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
    * @module LoggerService
    * @license MIT
    * @description
    * Console Log wrapper that can be disabled in production mode
    **/
    var LoggerService = /** @class */ (function () {
        function LoggerService() {
        }
        LoggerService.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (LoopBackConfig.debuggable())
                console.log.apply(console, args);
        };
        LoggerService.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (LoopBackConfig.debuggable())
                console.info.apply(console, args);
        };
        LoggerService.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (LoopBackConfig.debuggable())
                console.error.apply(console, args);
        };
        LoggerService.prototype.count = function (arg) {
            if (LoopBackConfig.debuggable())
                console.count(arg);
        };
        LoggerService.prototype.group = function (arg) {
            if (LoopBackConfig.debuggable())
                console.count(arg);
        };
        LoggerService.prototype.groupEnd = function () {
            if (LoopBackConfig.debuggable())
                console.groupEnd();
        };
        LoggerService.prototype.profile = function (arg) {
            if (LoopBackConfig.debuggable())
                console.count(arg);
        };
        LoggerService.prototype.profileEnd = function () {
            if (LoopBackConfig.debuggable())
                console.profileEnd();
        };
        LoggerService.prototype.time = function (arg) {
            if (LoopBackConfig.debuggable())
                console.time(arg);
        };
        LoggerService.prototype.timeEnd = function (arg) {
            if (LoopBackConfig.debuggable())
                console.timeEnd(arg);
        };
        LoggerService = __decorate([
            core.Injectable()
        ], LoggerService);
        return LoggerService;
    }());

    var DatChunk = /** @class */ (function () {
        function DatChunk(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatChunk`.
         */
        DatChunk.getModelName = function () {
            return "DatChunk";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DatChunk for dynamic purposes.
        **/
        DatChunk.factory = function (data) {
            return new DatChunk(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DatChunk.getModelDefinition = function () {
            return {
                name: 'DatChunk',
                plural: 'DatChunks',
                path: 'DatChunks',
                idName: 'pk_entity',
                properties: {
                    "quill_doc": {
                        name: 'quill_doc',
                        type: 'any'
                    },
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "fk_text": {
                        name: 'fk_text',
                        type: 'number'
                    },
                    "fk_entity_version": {
                        name: 'fk_entity_version',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_namespace": {
                        name: 'fk_namespace',
                        type: 'number'
                    },
                },
                relations: {
                    digital: {
                        name: 'digital',
                        type: 'DatDigital',
                        model: 'DatDigital',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_text',
                        keyTo: 'pk_text'
                    },
                    outgoing_statements: {
                        name: 'outgoing_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_subject_data'
                    },
                    namespace: {
                        name: 'namespace',
                        type: 'DatNamespace',
                        model: 'DatNamespace',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_namespace',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return DatChunk;
    }());

    var DatColumn = /** @class */ (function () {
        function DatColumn(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatColumn`.
         */
        DatColumn.getModelName = function () {
            return "DatColumn";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DatColumn for dynamic purposes.
        **/
        DatColumn.factory = function (data) {
            return new DatColumn(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DatColumn.getModelDefinition = function () {
            return {
                name: 'DatColumn',
                plural: 'DatColumns',
                path: 'DatColumns',
                idName: 'pk_entity',
                properties: {
                    "fk_digital": {
                        name: 'fk_digital',
                        type: 'number'
                    },
                    "fk_data_type": {
                        name: 'fk_data_type',
                        type: 'number'
                    },
                    "fk_column_content_type": {
                        name: 'fk_column_content_type',
                        type: 'number'
                    },
                    "fk_column_relationship_type": {
                        name: 'fk_column_relationship_type',
                        type: 'number'
                    },
                    "fk_original_column": {
                        name: 'fk_original_column',
                        type: 'number'
                    },
                    "is_imported": {
                        name: 'is_imported',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_namespace": {
                        name: 'fk_namespace',
                        type: 'number'
                    },
                },
                relations: {
                    namespace: {
                        name: 'namespace',
                        type: 'DatNamespace',
                        model: 'DatNamespace',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_namespace',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return DatColumn;
    }());

    var DatDigital = /** @class */ (function () {
        function DatDigital(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatDigital`.
         */
        DatDigital.getModelName = function () {
            return "DatDigital";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DatDigital for dynamic purposes.
        **/
        DatDigital.factory = function (data) {
            return new DatDigital(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DatDigital.getModelDefinition = function () {
            return {
                name: 'DatDigital',
                plural: 'DatDigitals',
                path: 'DatDigitals',
                idName: 'pk_entity',
                properties: {
                    "entity_version": {
                        name: 'entity_version',
                        type: 'number'
                    },
                    "pk_text": {
                        name: 'pk_text',
                        type: 'number'
                    },
                    "quill_doc": {
                        name: 'quill_doc',
                        type: 'any'
                    },
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "fk_system_type": {
                        name: 'fk_system_type',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_namespace": {
                        name: 'fk_namespace',
                        type: 'number'
                    },
                },
                relations: {
                    namespace: {
                        name: 'namespace',
                        type: 'DatNamespace',
                        model: 'DatNamespace',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_namespace',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return DatDigital;
    }());

    /* tslint:disable */
    var DatNamespace = /** @class */ (function () {
        function DatNamespace(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatNamespace`.
         */
        DatNamespace.getModelName = function () {
            return "DatNamespace";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DatNamespace for dynamic purposes.
        **/
        DatNamespace.factory = function (data) {
            return new DatNamespace(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DatNamespace.getModelDefinition = function () {
            return {
                name: 'DatNamespace',
                plural: 'DatNamespaces',
                path: 'DatNamespaces',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_root_namespace": {
                        name: 'fk_root_namespace',
                        type: 'number'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "standard_label": {
                        name: 'standard_label',
                        type: 'string'
                    },
                },
                relations: {}
            };
        };
        return DatNamespace;
    }());

    var DatTextProperty = /** @class */ (function () {
        function DatTextProperty(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatTextProperty`.
         */
        DatTextProperty.getModelName = function () {
            return "DatTextProperty";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DatTextProperty for dynamic purposes.
        **/
        DatTextProperty.factory = function (data) {
            return new DatTextProperty(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DatTextProperty.getModelDefinition = function () {
            return {
                name: 'DatTextProperty',
                plural: 'DatTextProperties',
                path: 'DatTextProperties',
                idName: 'pk_entity',
                properties: {
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "quill_doc": {
                        name: 'quill_doc',
                        type: 'any'
                    },
                    "fk_system_type": {
                        name: 'fk_system_type',
                        type: 'number'
                    },
                    "fk_language": {
                        name: 'fk_language',
                        type: 'number'
                    },
                    "fk_entity": {
                        name: 'fk_entity',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_namespace": {
                        name: 'fk_namespace',
                        type: 'number'
                    },
                },
                relations: {
                    namespace: {
                        name: 'namespace',
                        type: 'DatNamespace',
                        model: 'DatNamespace',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_namespace',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return DatTextProperty;
    }());

    /* tslint:disable */
    var DfhLabel = /** @class */ (function () {
        function DfhLabel(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DfhLabel`.
         */
        DfhLabel.getModelName = function () {
            return "DfhLabel";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DfhLabel for dynamic purposes.
        **/
        DfhLabel.factory = function (data) {
            return new DfhLabel(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DfhLabel.getModelDefinition = function () {
            return {
                name: 'DfhLabel',
                plural: 'DfhLabels',
                path: 'DfhLabels',
                idName: 'type',
                properties: {
                    "type": {
                        name: 'type',
                        type: 'string'
                    },
                    "label": {
                        name: 'label',
                        type: 'string'
                    },
                    "language": {
                        name: 'language',
                        type: 'string'
                    },
                    "fk_profile": {
                        name: 'fk_profile',
                        type: 'number'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "fk_property": {
                        name: 'fk_property',
                        type: 'number'
                    },
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                },
                relations: {}
            };
        };
        return DfhLabel;
    }());

    /* tslint:disable */
    var DfhProfile = /** @class */ (function () {
        function DfhProfile(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DfhProfile`.
         */
        DfhProfile.getModelName = function () {
            return "DfhProfile";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of DfhProfile for dynamic purposes.
        **/
        DfhProfile.factory = function (data) {
            return new DfhProfile(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        DfhProfile.getModelDefinition = function () {
            return {
                name: 'DfhProfile',
                plural: 'DfhProfiles',
                path: 'DfhProfiles',
                idName: 'pk_profile',
                properties: {
                    "pk_profile": {
                        name: 'pk_profile',
                        type: 'number'
                    },
                    "owned_by_project": {
                        name: 'owned_by_project',
                        type: 'number'
                    },
                    "is_ongoing_forced_publication": {
                        name: 'is_ongoing_forced_publication',
                        type: 'boolean'
                    },
                    "date_profile_published": {
                        name: 'date_profile_published',
                        type: 'string'
                    },
                    "date_profile_deprecated": {
                        name: 'date_profile_deprecated',
                        type: 'string'
                    },
                    "tmsp_last_dfh_update": {
                        name: 'tmsp_last_dfh_update',
                        type: 'string'
                    },
                },
                relations: {}
            };
        };
        return DfhProfile;
    }());

    /* tslint:disable */
    var Email = /** @class */ (function () {
        function Email(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `Email`.
         */
        Email.getModelName = function () {
            return "Email";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of Email for dynamic purposes.
        **/
        Email.factory = function (data) {
            return new Email(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        Email.getModelDefinition = function () {
            return {
                name: 'Email',
                plural: 'Emails',
                path: 'Emails',
                idName: 'id',
                properties: {
                    "to": {
                        name: 'to',
                        type: 'string'
                    },
                    "from": {
                        name: 'from',
                        type: 'string'
                    },
                    "subject": {
                        name: 'subject',
                        type: 'string'
                    },
                    "text": {
                        name: 'text',
                        type: 'string'
                    },
                    "html": {
                        name: 'html',
                        type: 'string'
                    },
                    "id": {
                        name: 'id',
                        type: 'number'
                    },
                },
                relations: {}
            };
        };
        return Email;
    }());

    var InfAppellation = /** @class */ (function () {
        function InfAppellation(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfAppellation`.
         */
        InfAppellation.getModelName = function () {
            return "InfAppellation";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfAppellation for dynamic purposes.
        **/
        InfAppellation.factory = function (data) {
            return new InfAppellation(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfAppellation.getModelDefinition = function () {
            return {
                name: 'InfAppellation',
                plural: 'InfAppellations',
                path: 'InfAppellations',
                idName: 'pk_entity',
                properties: {
                    "quill_doc": {
                        name: 'quill_doc',
                        type: 'any'
                    },
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    incoming_statements: {
                        name: 'incoming_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_object_info'
                    },
                }
            };
        };
        return InfAppellation;
    }());

    var InfDimension = /** @class */ (function () {
        function InfDimension(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfDimension`.
         */
        InfDimension.getModelName = function () {
            return "InfDimension";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfDimension for dynamic purposes.
        **/
        InfDimension.factory = function (data) {
            return new InfDimension(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfDimension.getModelDefinition = function () {
            return {
                name: 'InfDimension',
                plural: 'InfDimensions',
                path: 'InfDimensions',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "fk_measurement_unit": {
                        name: 'fk_measurement_unit',
                        type: 'number'
                    },
                    "numeric_value": {
                        name: 'numeric_value',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    incoming_statements: {
                        name: 'incoming_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_object_info'
                    },
                    measurement_unit: {
                        name: 'measurement_unit',
                        type: 'InfPersistentItem',
                        model: 'InfPersistentItem',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_measurement_unit',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return InfDimension;
    }());

    var InfLangString = /** @class */ (function () {
        function InfLangString(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfLangString`.
         */
        InfLangString.getModelName = function () {
            return "InfLangString";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfLangString for dynamic purposes.
        **/
        InfLangString.factory = function (data) {
            return new InfLangString(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfLangString.getModelDefinition = function () {
            return {
                name: 'InfLangString',
                plural: 'InfLangStrings',
                path: 'InfLangStrings',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "fk_language": {
                        name: 'fk_language',
                        type: 'number'
                    },
                    "quill_doc": {
                        name: 'quill_doc',
                        type: 'any'
                    },
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    incoming_statements: {
                        name: 'incoming_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_object_info'
                    },
                    language: {
                        name: 'language',
                        type: 'InfLanguage',
                        model: 'InfLanguage',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_language',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return InfLangString;
    }());

    var InfLanguage = /** @class */ (function () {
        function InfLanguage(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfLanguage`.
         */
        InfLanguage.getModelName = function () {
            return "InfLanguage";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfLanguage for dynamic purposes.
        **/
        InfLanguage.factory = function (data) {
            return new InfLanguage(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfLanguage.getModelDefinition = function () {
            return {
                name: 'InfLanguage',
                plural: 'InfLanguages',
                path: 'InfLanguages',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "pk_language": {
                        name: 'pk_language',
                        type: 'string'
                    },
                    "lang_type": {
                        name: 'lang_type',
                        type: 'string'
                    },
                    "scope": {
                        name: 'scope',
                        type: 'string'
                    },
                    "iso6392b": {
                        name: 'iso6392b',
                        type: 'string'
                    },
                    "iso6392t": {
                        name: 'iso6392t',
                        type: 'string'
                    },
                    "iso6391": {
                        name: 'iso6391',
                        type: 'string'
                    },
                    "notes": {
                        name: 'notes',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                }
            };
        };
        return InfLanguage;
    }());

    var InfPersistentItem = /** @class */ (function () {
        function InfPersistentItem(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfPersistentItem`.
         */
        InfPersistentItem.getModelName = function () {
            return "InfPersistentItem";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfPersistentItem for dynamic purposes.
        **/
        InfPersistentItem.factory = function (data) {
            return new InfPersistentItem(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfPersistentItem.getModelDefinition = function () {
            return {
                name: 'InfPersistentItem',
                plural: 'InfPersistentItems',
                path: 'InfPersistentItems',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    incoming_statements: {
                        name: 'incoming_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_object_info'
                    },
                    outgoing_statements: {
                        name: 'outgoing_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_subject_info'
                    },
                    dfh_class: {
                        name: 'dfh_class',
                        type: 'DfhClass',
                        model: 'DfhClass',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_class',
                        keyTo: 'pk_class'
                    },
                    text_properties: {
                        name: 'text_properties',
                        type: 'InfTextProperty[]',
                        model: 'InfTextProperty',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_concerned_entity'
                    },
                }
            };
        };
        return InfPersistentItem;
    }());

    var InfPlace = /** @class */ (function () {
        function InfPlace(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfPlace`.
         */
        InfPlace.getModelName = function () {
            return "InfPlace";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfPlace for dynamic purposes.
        **/
        InfPlace.factory = function (data) {
            return new InfPlace(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfPlace.getModelDefinition = function () {
            return {
                name: 'InfPlace',
                plural: 'InfPlaces',
                path: 'InfPlaces',
                idName: 'pk_entity',
                properties: {
                    "long": {
                        name: 'long',
                        type: 'number'
                    },
                    "lat": {
                        name: 'lat',
                        type: 'number'
                    },
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                }
            };
        };
        return InfPlace;
    }());

    var InfStatement = /** @class */ (function () {
        function InfStatement(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfStatement`.
         */
        InfStatement.getModelName = function () {
            return "InfStatement";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfStatement for dynamic purposes.
        **/
        InfStatement.factory = function (data) {
            return new InfStatement(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfStatement.getModelDefinition = function () {
            return {
                name: 'InfStatement',
                plural: 'InfStatements',
                path: 'InfStatements',
                idName: 'pk_entity',
                properties: {
                    "fk_subject_info": {
                        name: 'fk_subject_info',
                        type: 'number',
                        default: 0
                    },
                    "fk_subject_data": {
                        name: 'fk_subject_data',
                        type: 'number',
                        default: 0
                    },
                    "fk_subject_tables_cell": {
                        name: 'fk_subject_tables_cell',
                        type: 'number',
                        default: 0
                    },
                    "fk_subject_tables_row": {
                        name: 'fk_subject_tables_row',
                        type: 'number',
                        default: 0
                    },
                    "fk_property": {
                        name: 'fk_property',
                        type: 'number',
                        default: 0
                    },
                    "fk_property_of_property": {
                        name: 'fk_property_of_property',
                        type: 'number',
                        default: 0
                    },
                    "fk_object_info": {
                        name: 'fk_object_info',
                        type: 'number',
                        default: 0
                    },
                    "fk_object_data": {
                        name: 'fk_object_data',
                        type: 'number',
                        default: 0
                    },
                    "fk_object_tables_cell": {
                        name: 'fk_object_tables_cell',
                        type: 'number',
                        default: 0
                    },
                    "fk_object_tables_row": {
                        name: 'fk_object_tables_row',
                        type: 'number',
                        default: 0
                    },
                    "is_in_project_count": {
                        name: 'is_in_project_count',
                        type: 'number'
                    },
                    "is_standard_in_project_count": {
                        name: 'is_standard_in_project_count',
                        type: 'number'
                    },
                    "community_favorite_calendar": {
                        name: 'community_favorite_calendar',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    subject_temporal_entity: {
                        name: 'subject_temporal_entity',
                        type: 'InfTemporalEntity',
                        model: 'InfTemporalEntity',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_subject_info',
                        keyTo: 'pk_entity'
                    },
                    subject_digital: {
                        name: 'subject_digital',
                        type: 'DatDigital',
                        model: 'DatDigital',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_subject_data',
                        keyTo: 'pk_entity'
                    },
                    subject_chunk: {
                        name: 'subject_chunk',
                        type: 'DatChunk',
                        model: 'DatChunk',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_subject_data',
                        keyTo: 'pk_entity'
                    },
                    subject_statement: {
                        name: 'subject_statement',
                        type: 'InfStatement',
                        model: 'InfStatement',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_subject_info',
                        keyTo: 'pk_entity'
                    },
                    object_temporal_entity: {
                        name: 'object_temporal_entity',
                        type: 'InfTemporalEntity',
                        model: 'InfTemporalEntity',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    object_appellation: {
                        name: 'object_appellation',
                        type: 'InfAppellation',
                        model: 'InfAppellation',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    object_lang_string: {
                        name: 'object_lang_string',
                        type: 'InfLangString',
                        model: 'InfLangString',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    object_chunk: {
                        name: 'object_chunk',
                        type: 'DatChunk',
                        model: 'DatChunk',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_data',
                        keyTo: 'pk_entity'
                    },
                    object_dimension: {
                        name: 'object_dimension',
                        type: 'InfDimension',
                        model: 'InfDimension',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    object_language: {
                        name: 'object_language',
                        type: 'InfLanguage',
                        model: 'InfLanguage',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    subject_persistent_item: {
                        name: 'subject_persistent_item',
                        type: 'InfPersistentItem',
                        model: 'InfPersistentItem',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_subject_info',
                        keyTo: 'pk_entity'
                    },
                    object_persistent_item: {
                        name: 'object_persistent_item',
                        type: 'InfPersistentItem',
                        model: 'InfPersistentItem',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    object_time_primitive: {
                        name: 'object_time_primitive',
                        type: 'InfTimePrimitive',
                        model: 'InfTimePrimitive',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                    object_place: {
                        name: 'object_place',
                        type: 'InfPlace',
                        model: 'InfPlace',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_object_info',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return InfStatement;
    }());

    var InfTemporalEntity = /** @class */ (function () {
        function InfTemporalEntity(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfTemporalEntity`.
         */
        InfTemporalEntity.getModelName = function () {
            return "InfTemporalEntity";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfTemporalEntity for dynamic purposes.
        **/
        InfTemporalEntity.factory = function (data) {
            return new InfTemporalEntity(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfTemporalEntity.getModelDefinition = function () {
            return {
                name: 'InfTemporalEntity',
                plural: 'InfTemporalEntities',
                path: 'InfTemporalEntities',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    outgoing_statements: {
                        name: 'outgoing_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_subject_info'
                    },
                    incoming_statements: {
                        name: 'incoming_statements',
                        type: 'InfStatement[]',
                        model: 'InfStatement',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_object_info'
                    },
                    text_properties: {
                        name: 'text_properties',
                        type: 'InfTextProperty[]',
                        model: 'InfTextProperty',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_concerned_entity'
                    },
                }
            };
        };
        return InfTemporalEntity;
    }());

    var InfTextProperty = /** @class */ (function () {
        function InfTextProperty(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfTextProperty`.
         */
        InfTextProperty.getModelName = function () {
            return "InfTextProperty";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfTextProperty for dynamic purposes.
        **/
        InfTextProperty.factory = function (data) {
            return new InfTextProperty(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfTextProperty.getModelDefinition = function () {
            return {
                name: 'InfTextProperty',
                plural: 'InfTextProperties',
                path: 'InfTextProperties',
                idName: 'pk_entity',
                properties: {
                    "fk_class_field": {
                        name: 'fk_class_field',
                        type: 'number'
                    },
                    "fk_concerned_entity": {
                        name: 'fk_concerned_entity',
                        type: 'number'
                    },
                    "fk_language": {
                        name: 'fk_language',
                        type: 'number'
                    },
                    "quill_doc": {
                        name: 'quill_doc',
                        type: 'any'
                    },
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                    persistent_item: {
                        name: 'persistent_item',
                        type: 'InfPersistentItem',
                        model: 'InfPersistentItem',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_concerned_entity',
                        keyTo: 'pk_entity'
                    },
                    temporal_entity: {
                        name: 'temporal_entity',
                        type: 'InfTemporalEntity',
                        model: 'InfTemporalEntity',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_concerned_entity',
                        keyTo: 'pk_entity'
                    },
                    language: {
                        name: 'language',
                        type: 'InfLanguage',
                        model: 'InfLanguage',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_language',
                        keyTo: 'pk_entity'
                    },
                    class_field: {
                        name: 'class_field',
                        type: 'SysClassField',
                        model: 'SysClassField',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_class_field',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return InfTextProperty;
    }());

    var InfTimePrimitive = /** @class */ (function () {
        function InfTimePrimitive(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfTimePrimitive`.
         */
        InfTimePrimitive.getModelName = function () {
            return "InfTimePrimitive";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of InfTimePrimitive for dynamic purposes.
        **/
        InfTimePrimitive.factory = function (data) {
            return new InfTimePrimitive(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        InfTimePrimitive.getModelDefinition = function () {
            return {
                name: 'InfTimePrimitive',
                plural: 'InfTimePrimitives',
                path: 'InfTimePrimitives',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "julian_day": {
                        name: 'julian_day',
                        type: 'number'
                    },
                    "duration": {
                        name: 'duration',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_entity'
                    },
                }
            };
        };
        return InfTimePrimitive;
    }());

    var ProClassFieldConfig = /** @class */ (function () {
        function ProClassFieldConfig(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProClassFieldConfig`.
         */
        ProClassFieldConfig.getModelName = function () {
            return "ProClassFieldConfig";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of ProClassFieldConfig for dynamic purposes.
        **/
        ProClassFieldConfig.factory = function (data) {
            return new ProClassFieldConfig(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        ProClassFieldConfig.getModelDefinition = function () {
            return {
                name: 'ProClassFieldConfig',
                plural: 'ProClassFieldConfigs',
                path: 'ProClassFieldConfigs',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "fk_property": {
                        name: 'fk_property',
                        type: 'number'
                    },
                    "fk_class_field": {
                        name: 'fk_class_field',
                        type: 'number'
                    },
                    "fk_domain_class": {
                        name: 'fk_domain_class',
                        type: 'number'
                    },
                    "fk_range_class": {
                        name: 'fk_range_class',
                        type: 'number'
                    },
                    "ord_num": {
                        name: 'ord_num',
                        type: 'number'
                    },
                    "fk_class_for_class_field": {
                        name: 'fk_class_for_class_field',
                        type: 'number'
                    },
                },
                relations: {
                    property: {
                        name: 'property',
                        type: 'DfhProperty',
                        model: 'DfhProperty',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_property',
                        keyTo: 'pk_property'
                    },
                    class_field: {
                        name: 'class_field',
                        type: 'SysClassField',
                        model: 'SysClassField',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_class_field',
                        keyTo: 'pk_entity'
                    },
                    project: {
                        name: 'project',
                        type: 'ProProject',
                        model: 'ProProject',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_project',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return ProClassFieldConfig;
    }());

    /* tslint:disable */
    var ProDfhClassProjRel = /** @class */ (function () {
        function ProDfhClassProjRel(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProDfhClassProjRel`.
         */
        ProDfhClassProjRel.getModelName = function () {
            return "ProDfhClassProjRel";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of ProDfhClassProjRel for dynamic purposes.
        **/
        ProDfhClassProjRel.factory = function (data) {
            return new ProDfhClassProjRel(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        ProDfhClassProjRel.getModelDefinition = function () {
            return {
                name: 'ProDfhClassProjRel',
                plural: 'ProDfhClassProjRels',
                path: 'ProDfhClassProjRels',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "enabled_in_entities": {
                        name: 'enabled_in_entities',
                        type: 'boolean'
                    },
                },
                relations: {}
            };
        };
        return ProDfhClassProjRel;
    }());

    /* tslint:disable */
    var ProDfhProfileProjRel = /** @class */ (function () {
        function ProDfhProfileProjRel(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProDfhProfileProjRel`.
         */
        ProDfhProfileProjRel.getModelName = function () {
            return "ProDfhProfileProjRel";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of ProDfhProfileProjRel for dynamic purposes.
        **/
        ProDfhProfileProjRel.factory = function (data) {
            return new ProDfhProfileProjRel(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        ProDfhProfileProjRel.getModelDefinition = function () {
            return {
                name: 'ProDfhProfileProjRel',
                plural: 'ProDfhProfileProjRels',
                path: 'ProDfhProfileProjRels',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_profile": {
                        name: 'fk_profile',
                        type: 'number'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "enabled": {
                        name: 'enabled',
                        type: 'boolean'
                    },
                },
                relations: {}
            };
        };
        return ProDfhProfileProjRel;
    }());

    /* tslint:disable */
    var ProInfoProjRel = /** @class */ (function () {
        function ProInfoProjRel(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProInfoProjRel`.
         */
        ProInfoProjRel.getModelName = function () {
            return "ProInfoProjRel";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of ProInfoProjRel for dynamic purposes.
        **/
        ProInfoProjRel.factory = function (data) {
            return new ProInfoProjRel(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        ProInfoProjRel.getModelDefinition = function () {
            return {
                name: 'ProInfoProjRel',
                plural: 'ProInfoProjRels',
                path: 'ProInfoProjRels',
                idName: 'pk_entity',
                properties: {
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "fk_entity": {
                        name: 'fk_entity',
                        type: 'number'
                    },
                    "fk_entity_version": {
                        name: 'fk_entity_version',
                        type: 'string'
                    },
                    "fk_entity_version_concat": {
                        name: 'fk_entity_version_concat',
                        type: 'string'
                    },
                    "is_in_project": {
                        name: 'is_in_project',
                        type: 'boolean'
                    },
                    "is_standard_in_project": {
                        name: 'is_standard_in_project',
                        type: 'boolean'
                    },
                    "calendar": {
                        name: 'calendar',
                        type: 'string'
                    },
                    "ord_num_of_domain": {
                        name: 'ord_num_of_domain',
                        type: 'number'
                    },
                    "ord_num_of_range": {
                        name: 'ord_num_of_range',
                        type: 'number'
                    },
                    "ord_num_of_text_property": {
                        name: 'ord_num_of_text_property',
                        type: 'number'
                    },
                    "tmsp_last_modification": {
                        name: 'tmsp_last_modification',
                        type: 'string'
                    },
                    "fk_creator": {
                        name: 'fk_creator',
                        type: 'number'
                    },
                    "fk_last_modifier": {
                        name: 'fk_last_modifier',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "entity_version": {
                        name: 'entity_version',
                        type: 'number'
                    },
                    "tmsp_creation": {
                        name: 'tmsp_creation',
                        type: 'string'
                    },
                },
                relations: {}
            };
        };
        return ProInfoProjRel;
    }());

    var ProProject = /** @class */ (function () {
        function ProProject(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProProject`.
         */
        ProProject.getModelName = function () {
            return "ProProject";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of ProProject for dynamic purposes.
        **/
        ProProject.factory = function (data) {
            return new ProProject(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        ProProject.getModelDefinition = function () {
            return {
                name: 'ProProject',
                plural: 'ProProjects',
                path: 'ProProjects',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_language": {
                        name: 'fk_language',
                        type: 'number'
                    },
                },
                relations: {
                    accounts: {
                        name: 'accounts',
                        type: 'PubAccount[]',
                        model: 'PubAccount',
                        relationType: 'hasMany',
                        modelThrough: 'PubAccountProjectRel',
                        keyThrough: 'account_id',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_project'
                    },
                    text_properties: {
                        name: 'text_properties',
                        type: 'ProTextProperty[]',
                        model: 'ProTextProperty',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_project'
                    },
                    entity_version_project_rels: {
                        name: 'entity_version_project_rels',
                        type: 'ProInfoProjRel[]',
                        model: 'ProInfoProjRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_project'
                    },
                    default_language: {
                        name: 'default_language',
                        type: 'InfLanguage',
                        model: 'InfLanguage',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_language',
                        keyTo: 'pk_entity'
                    },
                    persistent_items: {
                        name: 'persistent_items',
                        type: 'InfPersistentItem[]',
                        model: 'InfPersistentItem',
                        relationType: 'hasMany',
                        modelThrough: 'ProInfoProjRel',
                        keyThrough: 'fk_entity',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_project'
                    },
                    namespaces: {
                        name: 'namespaces',
                        type: 'DatNamespace[]',
                        model: 'DatNamespace',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_project'
                    },
                }
            };
        };
        return ProProject;
    }());

    var ProTextProperty = /** @class */ (function () {
        function ProTextProperty(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProTextProperty`.
         */
        ProTextProperty.getModelName = function () {
            return "ProTextProperty";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of ProTextProperty for dynamic purposes.
        **/
        ProTextProperty.factory = function (data) {
            return new ProTextProperty(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        ProTextProperty.getModelDefinition = function () {
            return {
                name: 'ProTextProperty',
                plural: 'ProTextProperties',
                path: 'ProTextProperties',
                idName: 'pk_entity',
                properties: {
                    "string": {
                        name: 'string',
                        type: 'string'
                    },
                    "fk_system_type": {
                        name: 'fk_system_type',
                        type: 'number'
                    },
                    "fk_language": {
                        name: 'fk_language',
                        type: 'number'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "fk_dfh_class": {
                        name: 'fk_dfh_class',
                        type: 'number'
                    },
                    "fk_dfh_property": {
                        name: 'fk_dfh_property',
                        type: 'number'
                    },
                    "fk_dfh_property_domain": {
                        name: 'fk_dfh_property_domain',
                        type: 'number'
                    },
                    "fk_dfh_property_range": {
                        name: 'fk_dfh_property_range',
                        type: 'number'
                    },
                    "fk_pro_project": {
                        name: 'fk_pro_project',
                        type: 'number'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "entity_version": {
                        name: 'entity_version',
                        type: 'number'
                    },
                    "tmsp_creation": {
                        name: 'tmsp_creation',
                        type: 'string'
                    },
                    "tmsp_last_modification": {
                        name: 'tmsp_last_modification',
                        type: 'string'
                    },
                },
                relations: {
                    project: {
                        name: 'project',
                        type: 'ProProject',
                        model: 'ProProject',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_project',
                        keyTo: 'pk_entity'
                    },
                    language: {
                        name: 'language',
                        type: 'InfLanguage',
                        model: 'InfLanguage',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_language',
                        keyTo: 'pk_entity'
                    },
                    systemType: {
                        name: 'systemType',
                        type: 'SysSystemType',
                        model: 'SysSystemType',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_system_type',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return ProTextProperty;
    }());

    /* tslint:disable */
    var PubAccount = /** @class */ (function () {
        function PubAccount(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `PubAccount`.
         */
        PubAccount.getModelName = function () {
            return "PubAccount";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of PubAccount for dynamic purposes.
        **/
        PubAccount.factory = function (data) {
            return new PubAccount(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        PubAccount.getModelDefinition = function () {
            return {
                name: 'PubAccount',
                plural: 'PubAccounts',
                path: 'PubAccounts',
                idName: 'id',
                properties: {
                    "id": {
                        name: 'id',
                        type: 'number'
                    },
                    "realm": {
                        name: 'realm',
                        type: 'string'
                    },
                    "username": {
                        name: 'username',
                        type: 'string'
                    },
                    "email": {
                        name: 'email',
                        type: 'string'
                    },
                    "emailVerified": {
                        name: 'emailVerified',
                        type: 'boolean'
                    },
                },
                relations: {
                    accessTokens: {
                        name: 'accessTokens',
                        type: 'any[]',
                        model: '',
                        relationType: 'hasMany',
                        keyFrom: 'id',
                        keyTo: 'userId'
                    },
                    projects: {
                        name: 'projects',
                        type: 'any[]',
                        model: '',
                        relationType: 'hasMany',
                        modelThrough: 'PubAccountProjectRel',
                        keyThrough: 'fk_project',
                        keyFrom: 'id',
                        keyTo: 'account_id'
                    },
                }
            };
        };
        return PubAccount;
    }());

    var PubAccountProjectRel = /** @class */ (function () {
        function PubAccountProjectRel(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `PubAccountProjectRel`.
         */
        PubAccountProjectRel.getModelName = function () {
            return "PubAccountProjectRel";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of PubAccountProjectRel for dynamic purposes.
        **/
        PubAccountProjectRel.factory = function (data) {
            return new PubAccountProjectRel(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        PubAccountProjectRel.getModelDefinition = function () {
            return {
                name: 'PubAccountProjectRel',
                plural: 'PubAccountProjectRels',
                path: 'PubAccountProjectRels',
                idName: 'id',
                properties: {
                    "role": {
                        name: 'role',
                        type: 'string',
                        default: 'admin'
                    },
                    "fk_project": {
                        name: 'fk_project',
                        type: 'number'
                    },
                    "account_id": {
                        name: 'account_id',
                        type: 'number'
                    },
                    "id": {
                        name: 'id',
                        type: 'number'
                    },
                },
                relations: {
                    account: {
                        name: 'account',
                        type: 'PubAccount',
                        model: 'PubAccount',
                        relationType: 'belongsTo',
                        keyFrom: 'account_id',
                        keyTo: 'id'
                    },
                    project: {
                        name: 'project',
                        type: 'ProProject',
                        model: 'ProProject',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_project',
                        keyTo: 'pk_entity'
                    },
                }
            };
        };
        return PubAccountProjectRel;
    }());

    /* tslint:disable */
    var SchemaObject = /** @class */ (function () {
        function SchemaObject(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SchemaObject`.
         */
        SchemaObject.getModelName = function () {
            return "SchemaObject";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SchemaObject for dynamic purposes.
        **/
        SchemaObject.factory = function (data) {
            return new SchemaObject(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SchemaObject.getModelDefinition = function () {
            return {
                name: 'SchemaObject',
                plural: 'SchemaObjects',
                path: 'SchemaObjects',
                idName: 'inf',
                properties: {
                    "inf": {
                        name: 'inf',
                        type: 'any'
                    },
                    "pro": {
                        name: 'pro',
                        type: 'any'
                    },
                    "dat": {
                        name: 'dat',
                        type: 'any'
                    },
                    "sys": {
                        name: 'sys',
                        type: 'any'
                    },
                    "dfh": {
                        name: 'dfh',
                        type: 'any'
                    },
                },
                relations: {}
            };
        };
        return SchemaObject;
    }());

    /* tslint:disable */
    var SysAppContext = /** @class */ (function () {
        function SysAppContext(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysAppContext`.
         */
        SysAppContext.getModelName = function () {
            return "SysAppContext";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SysAppContext for dynamic purposes.
        **/
        SysAppContext.factory = function (data) {
            return new SysAppContext(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SysAppContext.getModelDefinition = function () {
            return {
                name: 'SysAppContext',
                plural: 'SysAppContexts',
                path: 'SysAppContexts',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "description": {
                        name: 'description',
                        type: 'string'
                    },
                    "label": {
                        name: 'label',
                        type: 'string'
                    },
                },
                relations: {}
            };
        };
        return SysAppContext;
    }());

    var SysClassField = /** @class */ (function () {
        function SysClassField(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysClassField`.
         */
        SysClassField.getModelName = function () {
            return "SysClassField";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SysClassField for dynamic purposes.
        **/
        SysClassField.factory = function (data) {
            return new SysClassField(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SysClassField.getModelDefinition = function () {
            return {
                name: 'SysClassField',
                plural: 'SysClassFields',
                path: 'SysClassFields',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "description": {
                        name: 'description',
                        type: 'string'
                    },
                    "label": {
                        name: 'label',
                        type: 'string'
                    },
                    "fk_system_type_ng_component": {
                        name: 'fk_system_type_ng_component',
                        type: 'number'
                    },
                    "used_table": {
                        name: 'used_table',
                        type: 'string'
                    },
                },
                relations: {
                    class_field_property_rel: {
                        name: 'class_field_property_rel',
                        type: 'SysClassFieldPropertyRel[]',
                        model: 'SysClassFieldPropertyRel',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_class_field'
                    },
                    class_field_configs: {
                        name: 'class_field_configs',
                        type: 'ProClassFieldConfig[]',
                        model: 'ProClassFieldConfig',
                        relationType: 'hasMany',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_class_field'
                    },
                    classes: {
                        name: 'classes',
                        type: 'DfhClass[]',
                        model: 'DfhClass',
                        relationType: 'hasMany',
                        modelThrough: 'ProClassFieldConfig',
                        keyThrough: 'fk_class_for_class_field',
                        keyFrom: 'pk_entity',
                        keyTo: 'fk_class_field'
                    },
                }
            };
        };
        return SysClassField;
    }());

    var SysClassFieldPropertyRel = /** @class */ (function () {
        // property?: DfhProperty;
        function SysClassFieldPropertyRel(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysClassFieldPropertyRel`.
         */
        SysClassFieldPropertyRel.getModelName = function () {
            return "SysClassFieldPropertyRel";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SysClassFieldPropertyRel for dynamic purposes.
        **/
        SysClassFieldPropertyRel.factory = function (data) {
            return new SysClassFieldPropertyRel(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SysClassFieldPropertyRel.getModelDefinition = function () {
            return {
                name: 'SysClassFieldPropertyRel',
                plural: 'SysClassFieldPropertyRels',
                path: 'SysClassFieldPropertyRels',
                idName: 'pk_entity',
                properties: {
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                    "fk_class_field": {
                        name: 'fk_class_field',
                        type: 'number'
                    },
                    "fk_property": {
                        name: 'fk_property',
                        type: 'number'
                    },
                    "property_is_outgoing": {
                        name: 'property_is_outgoing',
                        type: 'boolean'
                    },
                    "ord_num": {
                        name: 'ord_num',
                        type: 'number'
                    },
                },
                relations: {
                    class_field: {
                        name: 'class_field',
                        type: 'SysClassField',
                        model: 'SysClassField',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_class_field',
                        keyTo: 'pk_entity'
                    },
                    property: {
                        name: 'property',
                        type: 'DfhProperty',
                        model: 'DfhProperty',
                        relationType: 'belongsTo',
                        keyFrom: 'fk_property',
                        keyTo: 'pk_property'
                    },
                }
            };
        };
        return SysClassFieldPropertyRel;
    }());

    /* tslint:disable */
    var SysClassHasTypeProperty = /** @class */ (function () {
        function SysClassHasTypeProperty(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysClassHasTypeProperty`.
         */
        SysClassHasTypeProperty.getModelName = function () {
            return "SysClassHasTypeProperty";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SysClassHasTypeProperty for dynamic purposes.
        **/
        SysClassHasTypeProperty.factory = function (data) {
            return new SysClassHasTypeProperty(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SysClassHasTypeProperty.getModelDefinition = function () {
            return {
                name: 'SysClassHasTypeProperty',
                plural: 'SysClassHasTypeProperties',
                path: 'SysClassHasTypeProperties',
                idName: 'pk_entity',
                properties: {
                    "pk_typed_class": {
                        name: 'pk_typed_class',
                        type: 'number'
                    },
                    "typed_class_label": {
                        name: 'typed_class_label',
                        type: 'string'
                    },
                    "dfh_pk_property": {
                        name: 'dfh_pk_property',
                        type: 'number'
                    },
                    "property_label": {
                        name: 'property_label',
                        type: 'string'
                    },
                    "pk_type_class": {
                        name: 'pk_type_class',
                        type: 'number'
                    },
                    "type_class_label": {
                        name: 'type_class_label',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {}
            };
        };
        return SysClassHasTypeProperty;
    }());

    /* tslint:disable */
    var SysSystemRelevantClass = /** @class */ (function () {
        function SysSystemRelevantClass(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysSystemRelevantClass`.
         */
        SysSystemRelevantClass.getModelName = function () {
            return "SysSystemRelevantClass";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SysSystemRelevantClass for dynamic purposes.
        **/
        SysSystemRelevantClass.factory = function (data) {
            return new SysSystemRelevantClass(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SysSystemRelevantClass.getModelDefinition = function () {
            return {
                name: 'SysSystemRelevantClass',
                plural: 'SysSystemRelevantClasses',
                path: 'SysSystemRelevantClasses',
                idName: 'pk_entity',
                properties: {
                    "fk_class": {
                        name: 'fk_class',
                        type: 'number'
                    },
                    "required_by_entities": {
                        name: 'required_by_entities',
                        type: 'boolean'
                    },
                    "required_by_sources": {
                        name: 'required_by_sources',
                        type: 'boolean'
                    },
                    "required_by_basics": {
                        name: 'required_by_basics',
                        type: 'boolean'
                    },
                    "excluded_from_entities": {
                        name: 'excluded_from_entities',
                        type: 'boolean'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {}
            };
        };
        return SysSystemRelevantClass;
    }());

    /* tslint:disable */
    var SysSystemType = /** @class */ (function () {
        function SysSystemType(data) {
            Object.assign(this, data);
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysSystemType`.
         */
        SysSystemType.getModelName = function () {
            return "SysSystemType";
        };
        /**
        * @method factory
        * @author Jonathan Casarrubias
        * @license MIT
        * This method creates an instance of SysSystemType for dynamic purposes.
        **/
        SysSystemType.factory = function (data) {
            return new SysSystemType(data);
        };
        /**
        * @method getModelDefinition
        * @author Julien Ledun
        * @license MIT
        * This method returns an object that represents some of the model
        * definitions.
        **/
        SysSystemType.getModelDefinition = function () {
            return {
                name: 'SysSystemType',
                plural: 'SysSystemTypes',
                path: 'SysSystemTypes',
                idName: 'pk_entity',
                properties: {
                    "notes": {
                        name: 'notes',
                        type: 'string'
                    },
                    "definition": {
                        name: 'definition',
                        type: 'string'
                    },
                    "st_schema_name": {
                        name: 'st_schema_name',
                        type: 'string'
                    },
                    "st_table_name": {
                        name: 'st_table_name',
                        type: 'string'
                    },
                    "st_column_name": {
                        name: 'st_column_name',
                        type: 'string'
                    },
                    "st_group": {
                        name: 'st_group',
                        type: 'string'
                    },
                    "pk_entity": {
                        name: 'pk_entity',
                        type: 'number'
                    },
                },
                relations: {}
            };
        };
        return SysSystemType;
    }());

    var SDKModels = /** @class */ (function () {
        function SDKModels() {
            this.models = {
                SchemaObject: SchemaObject,
                SysClassFieldPropertyRel: SysClassFieldPropertyRel,
                SysClassField: SysClassField,
                SysClassHasTypeProperty: SysClassHasTypeProperty,
                SysSystemRelevantClass: SysSystemRelevantClass,
                PubAccount: PubAccount,
                Email: Email,
                ProProject: ProProject,
                PubAccountProjectRel: PubAccountProjectRel,
                ProTextProperty: ProTextProperty,
                ProInfoProjRel: ProInfoProjRel,
                DfhProfile: DfhProfile,
                DfhLabel: DfhLabel,
                DatChunk: DatChunk,
                DatColumn: DatColumn,
                DatTextProperty: DatTextProperty,
                DatDigital: DatDigital,
                SysAppContext: SysAppContext,
                ProClassFieldConfig: ProClassFieldConfig,
                ProDfhClassProjRel: ProDfhClassProjRel,
                ProDfhProfileProjRel: ProDfhProfileProjRel,
                InfAppellation: InfAppellation,
                InfLangString: InfLangString,
                InfDimension: InfDimension,
                InfTemporalEntity: InfTemporalEntity,
                InfStatement: InfStatement,
                InfLanguage: InfLanguage,
                InfPersistentItem: InfPersistentItem,
                InfTimePrimitive: InfTimePrimitive,
                InfPlace: InfPlace,
                DatNamespace: DatNamespace,
                InfTextProperty: InfTextProperty,
                SysSystemType: SysSystemType,
            };
        }
        SDKModels.prototype.get = function (modelName) {
            return this.models[modelName];
        };
        SDKModels.prototype.getAll = function () {
            return this.models;
        };
        SDKModels.prototype.getModelNames = function () {
            return Object.keys(this.models);
        };
        SDKModels = __decorate([
            core.Injectable()
        ], SDKModels);
        return SDKModels;
    }());

    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module CookieBrowser
    * @license MIT
    * @description
    * This module handle cookies, it will be provided using DI Swapping according the
    * SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
    **/
    var CookieBrowser = /** @class */ (function () {
        function CookieBrowser() {
            /**
             * @type {CookieInterface}
             **/
            this.cookies = {};
        }
        /**
         * @method get
         * @param {string} key Cookie key name
         * @return {any}
         * @description
         * The getter will return any type of data persisted in cookies.
         **/
        CookieBrowser.prototype.get = function (key) {
            if (!this.cookies[key]) {
                var cookie = window.document
                    .cookie.split('; ')
                    .filter(function (item) { return item.split('=')[0] === key; }).pop();
                if (!cookie) {
                    return null;
                }
                this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
            }
            return this.cookies[key];
        };
        /**
         * @method set
         * @param {string} key Cookie key name
         * @param {any} value Any value
         * @param {Date=} expires The date of expiration (Optional)
         * @return {void}
         * @description
         * The setter will return any type of data persisted in cookies.
         **/
        CookieBrowser.prototype.set = function (key, value, expires) {
            this.cookies[key] = value;
            var cookie = key + "=" + encodeURI(value) + "; path=/" + (expires ? "; expires=" + expires.toUTCString() : '');
            window.document.cookie = cookie;
        };
        /**
         * @method remove
         * @param {string} key Cookie key name
         * @return {void}
         * @description
         * This method will remove a cookie from the client.
         **/
        CookieBrowser.prototype.remove = function (key) {
            document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this.cookies[key];
        };
        /**
         * @method parse
         * @param {any} value Input data expected to be JSON
         * @return {void}
         * @description
         * This method will parse the string as JSON if possible, otherwise will
         * return the value itself.
         **/
        CookieBrowser.prototype.parse = function (value) {
            try {
                return JSON.parse(decodeURI(value));
            }
            catch (e) {
                return value;
            }
        };
        CookieBrowser = __decorate([
            core.Injectable()
        ], CookieBrowser);
        return CookieBrowser;
    }());

    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module StorageBrowser
    * @license MIT
    * @description
    * This module handle localStorage, it will be provided using DI Swapping according the
    * SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
    **/
    var StorageBrowser = /** @class */ (function () {
        function StorageBrowser() {
        }
        /**
         * @method get
         * @param {string} key Storage key name
         * @return {any}
         * @description
         * The getter will return any type of data persisted in localStorage.
         **/
        StorageBrowser.prototype.get = function (key) {
            var data = localStorage.getItem(key);
            return this.parse(data);
        };
        /**
         * @method set
         * @param {string} key Storage key name
         * @param {any} value Any value
         * @return {void}
         * @description
         * The setter will return any type of data persisted in localStorage.
         **/
        StorageBrowser.prototype.set = function (key, value, expires) {
            localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
        };
        /**
         * @method remove
         * @param {string} key Storage key name
         * @return {void}
         * @description
         * This method will remove a localStorage item from the client.
         **/
        StorageBrowser.prototype.remove = function (key) {
            if (localStorage[key]) {
                localStorage.removeItem(key);
            }
            else {
                console.log('Trying to remove unexisting key: ', key);
            }
        };
        /**
         * @method parse
         * @param {any} value Input data expected to be JSON
         * @return {void}
         * @description
         * This method will parse the string as JSON if possible, otherwise will
         * return the value itself.
         **/
        StorageBrowser.prototype.parse = function (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return value;
            }
        };
        StorageBrowser = __decorate([
            core.Injectable()
        ], StorageBrowser);
        return StorageBrowser;
    }());

    /* tslint:disable */
    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module SocketBrowser
    * @license MIT
    * @description
    * This module handle socket connections for web browsers, it will be DI Swapped
    * depending on the platform environment.
    * This module will be generated when the -d ng2web flag is set
    **/
    var SocketBrowser = /** @class */ (function () {
        function SocketBrowser() {
        }
        /**
         * @method connect
         * @param {string} url URL path to connect with the server.
         * @param {any} options Any socket.io v1 =< valid options
         * @return {any} Not currently a socket.io-client for web Typings implemented.
         * @description
         * This method will return a valid socket connection.
         **/
        SocketBrowser.prototype.connect = function (url, options) {
            return io(url, options);
        };
        return SocketBrowser;
    }());

    /* tslint:disable */
    /**
     * @module SocketDriver
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @description
     * The SocketDriver class is used for dependency injection swapping.
     * It will be provided using factory method from different sources.
     **/
    var SocketDriver = /** @class */ (function () {
        function SocketDriver() {
        }
        SocketDriver.prototype.connect = function (url, options) { };
        return SocketDriver;
    }());

    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module SocketConnection
    * @license MIT
    * @description
    * This module handle socket connections and return singleton instances for each
    * connection, it will use the SDK Socket Driver Available currently supporting
    * Angular 2 for web, NativeScript 2 and Angular Universal.
    **/
    var SocketConnection = /** @class */ (function () {
        /**
         * @method constructor
         * @param {SocketDriver} driver Socket IO Driver
         * @param {NgZone} zone Angular 2 Zone
         * @description
         * The constructor will set references for the shared hot observables from
         * the class subjects. Then it will subscribe each of these observables
         * that will create a channel that later will be shared between subscribers.
         **/
        function SocketConnection(driver, zone) {
            this.driver = driver;
            this.zone = zone;
            this.subjects = {
                onConnect: new rxjs.Subject(),
                onDisconnect: new rxjs.Subject(),
                onAuthenticated: new rxjs.Subject(),
                onUnAuthorized: new rxjs.Subject()
            };
            this.sharedObservables = {};
            this.authenticated = false;
            this.sharedObservables = {
                sharedOnConnect: this.subjects.onConnect.asObservable().pipe(operators.share()),
                sharedOnDisconnect: this.subjects.onDisconnect.asObservable().pipe(operators.share()),
                sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().pipe(operators.share()),
                sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().pipe(operators.share())
            };
            // This is needed to create the first channel, subsequents will share the connection
            // We are using Hot Observables to avoid duplicating connection status events.
            this.sharedObservables.sharedOnConnect.subscribe();
            this.sharedObservables.sharedOnDisconnect.subscribe();
            this.sharedObservables.sharedOnAuthenticated.subscribe();
            this.sharedObservables.sharedOnUnAuthorized.subscribe();
        }
        /**
         * @method connect
         * @param {AccessToken} token AccesToken instance
         * @return {void}
         * @description
         * This method will create a new socket connection when not previously established.
         * If there is a broken connection it will re-connect.
         **/
        SocketConnection.prototype.connect = function (token) {
            var _this = this;
            if (token === void 0) { token = null; }
            if (!this.socket) {
                console.info('Creating a new connection with: ', LoopBackConfig.getPath());
                // Create new socket connection
                this.socket = this.driver.connect(LoopBackConfig.getPath(), {
                    log: false,
                    secure: LoopBackConfig.isSecureWebSocketsSet(),
                    forceNew: true,
                    forceWebsockets: true,
                    transports: ['websocket']
                });
                // Listen for connection
                this.on('connect', function () {
                    _this.subjects.onConnect.next('connected');
                    // Authenticate or start heartbeat now    
                    _this.emit('authentication', token);
                });
                // Listen for authentication
                this.on('authenticated', function () {
                    _this.authenticated = true;
                    _this.subjects.onAuthenticated.next();
                    _this.heartbeater();
                });
                // Listen for authentication
                this.on('unauthorized', function (err) {
                    _this.authenticated = false;
                    _this.subjects.onUnAuthorized.next(err);
                });
                // Listen for disconnections
                this.on('disconnect', function (status) { return _this.subjects.onDisconnect.next(status); });
            }
            else if (this.socket && !this.socket.connected) {
                if (typeof this.socket.off === 'function') {
                    this.socket.off();
                }
                if (typeof this.socket.destroy === 'function') {
                    this.socket.destroy();
                }
                delete this.socket;
                this.connect(token);
            }
        };
        /**
         * @method isConnected
         * @return {boolean}
         * @description
         * This method will return true or false depending on established connections
         **/
        SocketConnection.prototype.isConnected = function () {
            return (this.socket && this.socket.connected);
        };
        /**
         * @method on
         * @param {string} event Event name
         * @param {Function} handler Event listener handler
         * @return {void}
         * @description
         * This method listen for server events from the current WebSocket connection.
         * This method is a facade that will wrap the original "on" method and run it
         * within the Angular Zone to avoid update issues.
         **/
        SocketConnection.prototype.on = function (event, handler) {
            var _this = this;
            this.socket.on(event, function (data) { return _this.zone.run(function () { return handler(data); }); });
        };
        /**
         * @method emit
         * @param {string} event Event name
         * @param {any=} data Any type of data
         * @return {void}
         * @description
         * This method will send any type of data to the server according the event set.
         **/
        SocketConnection.prototype.emit = function (event, data) {
            if (data) {
                this.socket.emit(event, data);
            }
            else {
                this.socket.emit(event);
            }
        };
        /**
         * @method removeListener
         * @param {string} event Event name
         * @param {Function} handler Event listener handler
         * @return {void}
         * @description
         * This method will wrap the original "on" method and run it within the Angular Zone
         * Note: off is being used since the nativescript socket io client does not provide
         * removeListener method, but only provides with off which is provided in any platform.
         **/
        SocketConnection.prototype.removeListener = function (event, handler) {
            if (typeof this.socket.off === 'function') {
                this.socket.off(event, handler);
            }
        };
        /**
         * @method removeAllListeners
         * @param {string} event Event name
         * @param {Function} handler Event listener handler
         * @return {void}
         * @description
         * This method will wrap the original "on" method and run it within the Angular Zone
         * Note: off is being used since the nativescript socket io client does not provide
         * removeListener method, but only provides with off which is provided in any platform.
         **/
        SocketConnection.prototype.removeAllListeners = function (event) {
            if (typeof this.socket.removeAllListeners === 'function') {
                this.socket.removeAllListeners(event);
            }
        };
        /**
         * @method disconnect
         * @return {void}
         * @description
         * This will disconnect the client from the server
         **/
        SocketConnection.prototype.disconnect = function () {
            this.socket.disconnect();
        };
        /**
         * @method heartbeater
         * @return {void}
         * @description
         * This will keep the connection as active, even when users are not sending
         * data, this avoids disconnection because of a connection not being used.
         **/
        SocketConnection.prototype.heartbeater = function () {
            var _this = this;
            var heartbeater = setInterval(function () {
                if (_this.isConnected()) {
                    _this.socket.emit('lb-ping');
                }
                else {
                    _this.socket.removeAllListeners('lb-pong');
                    clearInterval(heartbeater);
                }
            }, 15000);
            this.socket.on('lb-pong', function (data) { return console.info('Heartbeat: ', data); });
        };
        SocketConnection.ctorParameters = function () { return [
            { type: SocketDriver, decorators: [{ type: core.Inject, args: [SocketDriver,] }] },
            { type: core.NgZone, decorators: [{ type: core.Inject, args: [core.NgZone,] }] }
        ]; };
        SocketConnection = __decorate([
            core.Injectable(),
            __param(0, core.Inject(SocketDriver)),
            __param(1, core.Inject(core.NgZone))
        ], SocketConnection);
        return SocketConnection;
    }());

    /* tslint:disable */
    var IO = /** @class */ (function () {
        function IO(socket) {
            this.observables = {};
            this.socket = socket;
        }
        IO.prototype.emit = function (event, data) {
            this.socket.emit('ME:RT:1://event', {
                event: event,
                data: data
            });
        };
        IO.prototype.on = function (event) {
            if (this.observables[event]) {
                return this.observables[event];
            }
            var subject = new rxjs.Subject();
            this.socket.on(event, function (res) { return subject.next(res); });
            this.observables[event] = subject.asObservable();
            return this.observables[event];
        };
        return IO;
    }());

    /* tslint:disable */
    /**
     * @class FireLoopRef<T>
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @description
     * This class allows to create FireLoop References which will be in sync with
     * Server. It also allows to create FireLoop Reference Childs, that allows to
     * persist data according the generic model relationships.
     **/
    var FireLoopRef = /** @class */ (function () {
        /**
        * @method constructor
        * @param {any} model The model we want to create a reference
        * @param {SocketConnection} socket Socket connection to handle events
        * @param {FireLoopRef<any>} parent Parent FireLoop model reference
        * @param {string} relationship The defined model relationship
        * @description
        * The constructor will receive the required parameters and then will register this reference
        * into the server, needed to allow multiple references for the same model.
        * This ids are referenced into this specific client connection and won't have issues
        * with other client ids.
        **/
        function FireLoopRef(model, socket, parent, relationship) {
            if (parent === void 0) { parent = null; }
            if (relationship === void 0) { relationship = null; }
            this.model = model;
            this.socket = socket;
            this.parent = parent;
            this.relationship = relationship;
            // Reference ID
            this.id = this.buildId();
            // Model Childs
            this.childs = {};
            // Disposable Events
            this.disposable = {};
            this.socket.emit("Subscribe." + (!parent ? model.getModelName() : parent.model.getModelName()), { id: this.id, scope: model.getModelName(), relationship: relationship });
            return this;
        }
        /**
        * @method dispose
        * @return {void}
        * @description
        * This method is super important to avoid memory leaks in the server.
        * This method requires to be called on components destroy
        *
        * ngOnDestroy() {
        *  this.someRef.dispose()
        * }
        **/
        FireLoopRef.prototype.dispose = function () {
            var _this = this;
            var subscription = this.operation('dispose', {}).subscribe(function () {
                Object.keys(_this.disposable).forEach(function (channel) {
                    _this.socket.removeListener(channel, _this.disposable[channel]);
                    _this.socket.removeAllListeners(channel);
                });
                subscription.unsubscribe();
            });
        };
        /**
        * @method upsert
        * @param {T} data Persisted model instance
        * @return {Observable<T>}
        * @description
        * Operation wrapper for upsert function.
        **/
        FireLoopRef.prototype.upsert = function (data) {
            return this.operation('upsert', data);
        };
        /**
        * @method create
        * @param {T} data Persisted model instance
        * @return {Observable<T>}
        * @description
        * Operation wrapper for create function.
        **/
        FireLoopRef.prototype.create = function (data) {
            return this.operation('create', data);
        };
        /**
        * @method remove
        * @param {T} data Persisted model instance
        * @return {Observable<T>}
        * @description
        * Operation wrapper for remove function.
        **/
        FireLoopRef.prototype.remove = function (data) {
            return this.operation('remove', data);
        };
        /**
        * @method remote
        * @param {string} method Remote method name
        * @param {any[]=} params Parameters to be applied into the remote method
        * @param {boolean} broadcast Flag to define if the method results should be broadcasted
        * @return {Observable<any>}
        * @description
        * This method calls for any remote method. It is flexible enough to
        * allow you call either built-in or custom remote methods.
        *
        * FireLoop provides this interface to enable calling remote methods
        * but also to optionally send any defined accept params that will be
        * applied within the server.
        **/
        FireLoopRef.prototype.remote = function (method, params, broadcast) {
            if (broadcast === void 0) { broadcast = false; }
            return this.operation('remote', { method: method, params: params, broadcast: broadcast });
        };
        /**
        * @method onRemote
        * @param {string} method Remote method name
        * @return {Observable<any>}
        * @description
        * This method listen for public broadcasted remote method results. If the remote method
        * execution is not public only the owner will receive the result data.
        **/
        FireLoopRef.prototype.onRemote = function (method) {
            var event = 'remote';
            if (!this.relationship) {
                event = this.model.getModelName() + "." + event;
            }
            else {
                event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
            }
            return this.broadcasts(event, {});
        };
        /**
        * @method on
        * @param {string} event Event name
        * @param {LoopBackFilter} filter LoopBack query filter
        * @return {Observable<T>}
        * @description
        * Listener for different type of events. Valid events are:
        *   - change (Triggers on any model change -create, update, remove-)
        *   - value (Triggers on new entries)
        *   - child_added (Triggers when a child is added)
        *   - child_updated (Triggers when a child is updated)
        *   - child_removed (Triggers when a child is removed)
        **/
        FireLoopRef.prototype.on = function (event, filter) {
            if (filter === void 0) { filter = { limit: 100, order: 'id DESC' }; }
            if (event === 'remote') {
                throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
            }
            var request;
            if (!this.relationship) {
                event = this.model.getModelName() + "." + event;
                request = { filter: filter };
            }
            else {
                event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
                request = { filter: filter, parent: this.parent.instance };
            }
            if (event.match(/(value|change|stats)/)) {
                return rxjs.merge(this.pull(event, request), this.broadcasts(event, request));
            }
            else {
                return this.broadcasts(event, request);
            }
        };
        /**
        * @method stats
        * @param {LoopBackFilter=} filter LoopBack query filter
        * @return {Observable<T>}
        * @description
        * Listener for real-time statistics, will trigger on every
        * statistic modification.
        * TIP: You can improve performance by adding memcached to LoopBack models.
        **/
        FireLoopRef.prototype.stats = function (filter) {
            return this.on('stats', filter);
        };
        /**
        * @method make
        * @param {any} instance Persisted model instance reference
        * @return {Observable<T>}
        * @description
        * This method will set a model instance into this a new FireLoop Reference.
        * This allows to persiste parentship when creating related instances.
        *
        * It also allows to have multiple different persisted instance references to same model.
        * otherwise if using singleton will replace a previous instance for a new instance, when
        * we actually want to have more than 1 instance of same model.
        **/
        FireLoopRef.prototype.make = function (instance) {
            var reference = new FireLoopRef(this.model, this.socket);
            reference.instance = instance;
            return reference;
        };
        /**
        * @method child
        * @param {string} relationship A defined model relationship
        * @return {FireLoopRef<T>}
        * @description
        * This method creates child references, which will persist related model
        * instances. e.g. Room.messages, where messages belongs to a specific Room.
        **/
        FireLoopRef.prototype.child = function (relationship) {
            // Return singleton instance
            if (this.childs[relationship]) {
                return this.childs[relationship];
            }
            // Try to get relation settings from current model
            var settings = this.model.getModelDefinition().relations[relationship];
            // Verify the relationship actually exists
            if (!settings) {
                throw new Error("Invalid model relationship " + this.model.getModelName() + " <-> " + relationship + ", verify your model settings.");
            }
            // Verify if the relationship model is public
            if (settings.model === '') {
                throw new Error("Relationship model is private, cam't use " + relationship + " unless you set your model as public.");
            }
            // Lets get a model reference and add a reference for all of the models
            var model = this.model.models.get(settings.model);
            model.models = this.model.models;
            // If everything goes well, we will store a child reference and return it.
            this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
            return this.childs[relationship];
        };
        /**
        * @method pull
        * @param {string} event Event name
        * @param {any} request Type of request, can be LB-only filter or FL+LB filter
        * @return {Observable<T>}
        * @description
        * This method will pull initial data from server
        **/
        FireLoopRef.prototype.pull = function (event, request) {
            var sbj = new rxjs.Subject();
            var that = this;
            var nowEvent = event + ".pull.requested." + this.id;
            this.socket.emit(event + ".pull.request." + this.id, request);
            function pullNow(data) {
                if (that.socket.removeListener) {
                    that.socket.removeListener(nowEvent, pullNow);
                }
                sbj.next(data);
            }
            ;
            this.socket.on(nowEvent, pullNow);
            return sbj.asObservable();
        };
        /**
        * @method broadcasts
        * @param {string} event Event name
        * @param {any} request Type of request, can be LB-only filter or FL+LB filter
        * @return {Observable<T>}
        * @description
        * This will listen for public broadcasts announces and then request
        * for data according a specific client request, not shared with other clients.
        **/
        FireLoopRef.prototype.broadcasts = function (event, request) {
            var sbj = new rxjs.Subject();
            var channels = {
                announce: event + ".broadcast.announce." + this.id,
                broadcast: event + ".broadcast." + this.id
            };
            var that = this;
            // Announces Handler
            this.disposable[channels.announce] = function (res) {
                that.socket.emit(event + ".broadcast.request." + that.id, request);
            };
            // Broadcasts Handler
            this.disposable[channels.broadcast] = function (data) {
                sbj.next(data);
            };
            this.socket.on(channels.announce, this.disposable[channels.announce]);
            this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
            return sbj.asObservable();
        };
        /**
        * @method operation
        * @param {string} event Event name
        * @param {any} data Any type of data sent to the server
        * @return {Observable<T>}
        * @description
        * This internal method will run operations depending on current context
        **/
        FireLoopRef.prototype.operation = function (event, data) {
            if (!this.relationship) {
                event = this.model.getModelName() + "." + event + "." + this.id;
            }
            else {
                event = this.parent.model.getModelName() + "." + this.relationship + "." + event + "." + this.id;
            }
            var subject = new rxjs.Subject();
            var config = {
                data: data,
                parent: this.parent && this.parent.instance ? this.parent.instance : null
            };
            this.socket.emit(event, config);
            var resultEvent = '';
            if (!this.relationship) {
                resultEvent = this.model.getModelName() + ".value.result." + this.id;
            }
            else {
                resultEvent = this.parent.model.getModelName() + "." + this.relationship + ".value.result." + this.id;
            }
            this.socket.on(resultEvent, function (res) {
                if (res.error) {
                    subject.error(res);
                }
                else {
                    subject.next(res);
                }
            });
            if (event.match('dispose')) {
                setTimeout(function () { return subject.next(); });
            }
            // This event listener will be wiped within socket.connections
            this.socket.sharedObservables.sharedOnDisconnect.subscribe(function () { return subject.complete(); });
            return subject.asObservable().pipe(operators.catchError(function (error) { return rxjs.Observable.throw(error); }));
        };
        /**
        * @method buildId
        * @return {number}
        * @description
        * This internal method build an ID for this reference, this allows to have
        * multiple references for the same model or relationships.
        **/
        FireLoopRef.prototype.buildId = function () {
            return Date.now() + Math.floor(Math.random() * 100800) *
                Math.floor(Math.random() * 100700) *
                Math.floor(Math.random() * 198500);
        };
        return FireLoopRef;
    }());

    /* tslint:disable */

    /* tslint:disable */
    var FireLoop = /** @class */ (function () {
        function FireLoop(socket, models) {
            this.socket = socket;
            this.models = models;
            this.references = {};
        }
        FireLoop.prototype.ref = function (model) {
            var name = model.getModelName();
            model.models = this.models;
            this.references[name] = new FireLoopRef(model, this.socket);
            return this.references[name];
        };
        return FireLoop;
    }());

    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
    * @module RealTime
    * @license MIT
    * @description
    * This module is a real-time interface for using socket connections, its main purpose
    * is to make sure that when there is a valid connection, it will create instances
    * of the different real-time functionalities like FireLoop, PubSub and IO.
    **/
    var RealTime = /** @class */ (function () {
        /**
        * @method constructor
        * @param {SocketConnection} connection WebSocket connection service
        * @param {SDKModels} models Model provider service
        * @param {LoopBackAuth} auth LoopBack authentication service
        * @description
        * It will intialize the shared on ready communication channel.
        **/
        function RealTime(connection, models, auth) {
            this.connection = connection;
            this.models = models;
            this.auth = auth;
            this.connecting = false;
            this.onReadySubject = new rxjs.Subject();
            this.sharedOnReady = this.onReadySubject.asObservable().pipe(operators.share());
            this.sharedOnReady.subscribe();
        }
        /**
        * @method onDisconnect
        * @return {Observable<any>}
        * @description
        * Will trigger when Real-Time Service is disconnected from server.
        **/
        RealTime.prototype.onDisconnect = function () {
            return this.connection.sharedObservables.sharedOnDisconnect;
        };
        /**
        * @method onAuthenticated
        * @return {Observable<any>}
        * @description
        * Will trigger when Real-Time Service is authenticated with the server.
        **/
        RealTime.prototype.onAuthenticated = function () {
            return this.connection.sharedObservables.sharedOnAuthenticated;
        };
        /**
        * @method onUnAuthorized
        * @return {Observable<any>}
        * @description
        * Will trigger when Real-Time Service is not authorized to connect with the server.
        **/
        RealTime.prototype.onUnAuthorized = function () {
            return this.connection.sharedObservables.sharedOnUnAuthorized;
        };
        /**
        * @method onReady
        * @return {Observable<any>}
        * @description
        * Will trigger when Real-Time Service is Ready for broadcasting.
        * and will register connection flow events to notify subscribers.
        **/
        RealTime.prototype.onReady = function () {
            var _this = this;
            // If there is a valid connection, then we just send back to the EventLoop
            // Or next will be executed before the actual subscription.
            if (this.connection.isConnected()) {
                var to_1 = setTimeout(function () {
                    _this.onReadySubject.next('shared-connection');
                    clearTimeout(to_1);
                });
                // Else if there is a current attempt of connection we wait for the prior
                // process that started the connection flow.
            }
            else if (this.connecting) {
                var ti_1 = setInterval(function () {
                    if (_this.connection.isConnected()) {
                        _this.onReadySubject.next('shared-connection');
                        clearInterval(ti_1);
                    }
                }, 500);
                // If there is not valid connection or attempt, then we start the connection flow
                // and make sure we notify all the onReady subscribers when done.
                // Also it will listen for desconnections so we unsubscribe and avoid both:
                // Memory leaks and duplicated triggered events.
            }
            else {
                this.connecting = true;
                this.connection.connect(this.auth.getToken());
                this.IO = new IO(this.connection);
                this.FireLoop = new FireLoop(this.connection, this.models);
                // Fire event for those subscribed 
                var s1_1 = this.connection.sharedObservables.sharedOnConnect.subscribe(function () {
                    console.log('Real-Time connection has been established');
                    _this.connecting = false;
                    _this.onReadySubject.next('connected');
                    var s2 = _this.connection.sharedObservables.sharedOnDisconnect.subscribe(function () {
                        s1_1.unsubscribe();
                        s2.unsubscribe();
                    });
                });
            }
            return this.sharedOnReady;
        };
        RealTime.ctorParameters = function () { return [
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] }
        ]; };
        RealTime = __decorate([
            core.Injectable(),
            __param(0, core.Inject(SocketConnection)),
            __param(1, core.Inject(SDKModels)),
            __param(2, core.Inject(LoopBackAuth))
        ], RealTime);
        return RealTime;
    }());

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
                var subject_1 = new rxjs.Subject();
                this.connection.on(event_1, function (res) { return subject_1.next(res); });
                return subject_1.asObservable();
            }
            else {
                var httpParams_1 = new http.HttpParams({ encoder: new CustomQueryEncoderHelper() });
                // Headers to be sent
                var headers = new http.HttpHeaders();
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
                var request = new http.HttpRequest(method, "" + url + queryString, body, {
                    headers: headers,
                    params: httpParams_1,
                    withCredentials: LoopBackConfig.getRequestOptionsCredentials()
                });
                return this.http.request(request).pipe(operators.filter(function (event) { return event instanceof http.HttpResponse; }), operators.map(function (res) { return res.body; }), operators.catchError(function (e) { return _this.errorHandler.handleError(e); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
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
                .pipe(operators.map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
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
                .pipe(operators.map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
                .pipe(operators.map(function (data) { return _this.model.factory(data); }));
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
            var subject = new rxjs.Subject();
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
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        BaseLoopBackApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], BaseLoopBackApi);
        return BaseLoopBackApi;
    }());

    /**
     * Api services for the `SchemaObject` model.
     */
    var SchemaObjectApi = /** @class */ (function (_super) {
        __extends(SchemaObjectApi, _super);
        function SchemaObjectApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
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
        SchemaObjectApi.prototype.removeEntityFromProject = function (pkProject, pkEntity, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/SchemaObjects/remove-entity-from-project";
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
        SchemaObjectApi.prototype.addEntityToProject = function (pkProject, pkEntity, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/SchemaObjects/add-entity-to-project";
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
        SchemaObjectApi.prototype.typeOfProject = function (pkProject, pkType, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/SchemaObjects/type-of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            if (typeof pkType !== 'undefined' && pkType !== null)
                _urlParams.pkType = pkType;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `SchemaObject`.
         */
        SchemaObjectApi.prototype.getModelName = function () {
            return "SchemaObject";
        };
        SchemaObjectApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SchemaObjectApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SchemaObjectApi);
        return SchemaObjectApi;
    }(BaseLoopBackApi));

    // import { DfhProperty } from '../../models/DfhProperty';
    /**
     * Api services for the `SysClassFieldPropertyRel` model.
     */
    var SysClassFieldPropertyRelApi = /** @class */ (function (_super) {
        __extends(SysClassFieldPropertyRelApi, _super);
        function SysClassFieldPropertyRelApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysClassFieldPropertyRel`.
         */
        SysClassFieldPropertyRelApi.prototype.getModelName = function () {
            return "SysClassFieldPropertyRel";
        };
        SysClassFieldPropertyRelApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SysClassFieldPropertyRelApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SysClassFieldPropertyRelApi);
        return SysClassFieldPropertyRelApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `SysClassField` model.
     */
    var SysClassFieldApi = /** @class */ (function (_super) {
        __extends(SysClassFieldApi, _super);
        function SysClassFieldApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * <em>
               * (The remote method definition does not provide any description.)
               * </em>
         *
         * @param {object} data Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SysClassField` object.)
         * </em>
         */
        SysClassFieldApi.prototype.findComplex = function (filter, customHeaders) {
            if (filter === void 0) { filter = {}; }
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/SysClassFields/findComplex";
            var _routeParams = {};
            var _postBody = {
                filter: filter
            };
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result.pipe(operators.map(function (instances) {
                return instances.map(function (instance) { return new SysClassField(instance); });
            }));
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysClassField`.
         */
        SysClassFieldApi.prototype.getModelName = function () {
            return "SysClassField";
        };
        SysClassFieldApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SysClassFieldApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SysClassFieldApi);
        return SysClassFieldApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `SysClassHasTypeProperty` model.
     */
    var SysClassHasTypePropertyApi = /** @class */ (function (_super) {
        __extends(SysClassHasTypePropertyApi, _super);
        function SysClassHasTypePropertyApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysClassHasTypeProperty`.
         */
        SysClassHasTypePropertyApi.prototype.getModelName = function () {
            return "SysClassHasTypeProperty";
        };
        SysClassHasTypePropertyApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SysClassHasTypePropertyApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SysClassHasTypePropertyApi);
        return SysClassHasTypePropertyApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `SysSystemRelevantClass` model.
     */
    var SysSystemRelevantClassApi = /** @class */ (function (_super) {
        __extends(SysSystemRelevantClassApi, _super);
        function SysSystemRelevantClassApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Replace or create all items in the array.
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{SysSystemRelevantClass}` - Array of SysSystemRelevantClass
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SysSystemRelevantClass` object.)
         * </em>
         */
        SysSystemRelevantClassApi.prototype.bulkReplaceOrCreate = function (data, customHeaders) {
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/SysSystemRelevantClasses/bulk-replace-or-create";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysSystemRelevantClass`.
         */
        SysSystemRelevantClassApi.prototype.getModelName = function () {
            return "SysSystemRelevantClass";
        };
        SysSystemRelevantClassApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SysSystemRelevantClassApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SysSystemRelevantClassApi);
        return SysSystemRelevantClassApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `PubAccount` model.
     */
    var PubAccountApi = /** @class */ (function (_super) {
        __extends(PubAccountApi, _super);
        function PubAccountApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get Roles of the Account
         *
         * @param {number} id
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PubAccount` object.)
         * </em>
         */
        PubAccountApi.prototype.getRoles = function (id, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/PubAccounts/:id/get-roles";
            var _routeParams = {
                id: id
            };
            var _postBody = {};
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Get a list of all projects associated with this account.
         *
         * @param {number} id
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PubAccount` object.)
         * </em>
         */
        PubAccountApi.prototype.listProjects = function (id, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/PubAccounts/:id/list-projects";
            var _routeParams = {
                id: id
            };
            var _postBody = {};
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Get all accounts with their project pks and their roles
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PubAccount` object.)
         * </em>
         */
        PubAccountApi.prototype.withRolesAndProjects = function (customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/PubAccounts/with-roles-and-projects";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Login a user with username/email and password.
         *
         * @param {string} include Related objects to include in the response. See the description of return value for more details.
         *
         * @param {object} data Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         *
         *   - `user` - `U+007BPubAccountU+007D` - Data of the currently logged in user. (`include=user`)
         *
         *
         */
        PubAccountApi.prototype.login = function (credentials, include, customHeaders) {
            if (include === void 0) { include = {}; }
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/PubAccounts/login";
            var _routeParams = {};
            var _postBody = {
                credentials: credentials
            };
            var _urlParams = {};
            if (typeof include !== 'undefined' && include !== null)
                _urlParams.include = include;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Logout a user with access token.
         *
         * @param {object} data Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        PubAccountApi.prototype.logout = function (customHeaders) {
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/PubAccounts/logout";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `PubAccount`.
         */
        PubAccountApi.prototype.getModelName = function () {
            return "PubAccount";
        };
        PubAccountApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        PubAccountApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], PubAccountApi);
        return PubAccountApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `Email` model.
     */
    var EmailApi = /** @class */ (function (_super) {
        __extends(EmailApi, _super);
        function EmailApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `Email`.
         */
        EmailApi.prototype.getModelName = function () {
            return "Email";
        };
        EmailApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        EmailApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], EmailApi);
        return EmailApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `ProProject` model.
     */
    var ProProjectApi = /** @class */ (function (_super) {
        __extends(ProProjectApi, _super);
        function ProProjectApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get the projects of account.
         *
         * @param {number} accountId Id of the account
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProProject` object.)
         * </em>
         */
        ProProjectApi.prototype.ofAccount = function (accountId, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProProjects/of-account";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof accountId !== 'undefined' && accountId !== null)
                _urlParams.accountId = accountId;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Create a new project with a label and a description.
         *
         * @param {number} accountId Id of account to associate the persistent item with.
         *
         * @param {string} pkLanguage Default language of the project, language of the label and the text property.
         *
         * @param {string} label Label of the project.
         *
         * @param {string} textProperty Description of the project.
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
         * This usually means the response is a `ProProject` object.)
         * </em>
         */
        ProProjectApi.prototype.createWithLabelAndDescription = function (accountId, pkLanguage, label, textProperty, customHeaders) {
            if (textProperty === void 0) { textProperty = {}; }
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProProjects/create-with-label-and-description";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof accountId !== 'undefined' && accountId !== null)
                _urlParams.accountId = accountId;
            if (typeof pkLanguage !== 'undefined' && pkLanguage !== null)
                _urlParams.pkLanguage = pkLanguage;
            if (typeof label !== 'undefined' && label !== null)
                _urlParams.label = label;
            if (typeof textProperty !== 'undefined' && textProperty !== null)
                _urlParams.textProperty = textProperty;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Get basic information about the project (language, name)
         *
         * @param {number} pkProject Pk of project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProProject` object.)
         * </em>
         */
        ProProjectApi.prototype.getBasics = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProProjects/get-basics";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProProject`.
         */
        ProProjectApi.prototype.getModelName = function () {
            return "ProProject";
        };
        ProProjectApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        ProProjectApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], ProProjectApi);
        return ProProjectApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `PubAccountProjectRel` model.
     */
    var PubAccountProjectRelApi = /** @class */ (function (_super) {
        __extends(PubAccountProjectRelApi, _super);
        function PubAccountProjectRelApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `PubAccountProjectRel`.
         */
        PubAccountProjectRelApi.prototype.getModelName = function () {
            return "PubAccountProjectRel";
        };
        PubAccountProjectRelApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        PubAccountProjectRelApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], PubAccountProjectRelApi);
        return PubAccountProjectRelApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `ProTextProperty` model.
     */
    var ProTextPropertyApi = /** @class */ (function (_super) {
        __extends(ProTextPropertyApi, _super);
        function ProTextPropertyApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get the text-properties of the project.
         *
         * @param {number} pkProject Pk of the project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProTextProperty` object.)
         * </em>
         */
        ProTextPropertyApi.prototype.ofProject = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProTextProperties/of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Inserts or updates items in the array of ProTextProperty. If pk_entity is given and existing, an update is done, else an insert
         *
         * @param {number} pkProject Pk of the project
         *
         * @param {object} data Request data.
         *
         *  - `items` – `{ProTextProperty}` - Array of ProTextPropertys
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProTextProperty` object.)
         * </em>
         */
        ProTextPropertyApi.prototype.bulkUpsert = function (pkProject, items, customHeaders) {
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProTextProperties/bulk-upsert";
            var _routeParams = {};
            var _postBody = {
                items: items
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Dletes items in the array of ProTextProperty. Checks for each item if fk_project matches given pkProject
         *
         * @param {number} pkProject Pk of the project
         *
         * @param {object} data Request data.
         *
         *  - `items` – `{ProTextProperty}` - Array of ProTextPropertys
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProTextProperty` object.)
         * </em>
         */
        ProTextPropertyApi.prototype.bulkDelete = function (pkProject, items, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProTextProperties/bulk-delete";
            var _routeParams = {};
            var _postBody = {
                items: items
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProTextProperty`.
         */
        ProTextPropertyApi.prototype.getModelName = function () {
            return "ProTextProperty";
        };
        ProTextPropertyApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        ProTextPropertyApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], ProTextPropertyApi);
        return ProTextPropertyApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `ProInfoProjRel` model.
     */
    var ProInfoProjRelApi = /** @class */ (function (_super) {
        __extends(ProInfoProjRelApi, _super);
        function ProInfoProjRelApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Patch an existing model instance or insert a new one into the data source.
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{object}` - Model instance data
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProInfoProjRel` object.)
         * </em>
         */
        ProInfoProjRelApi.prototype.patchOrCreate = function (data, customHeaders) {
            if (data === void 0) { data = {}; }
            var _method = "PATCH";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProInfoProjRels";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Marks the statement as favorite for the given fk_project.
         *
         * @param {number} pkProject fk_project
         *
         * @param {number} pkStatement fk_entity
         *
         * @param {object} data Request data.
         *
         *  - `isOutgoing` – `{boolean}` - True, if the statement is outgoing, else false
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProInfoProjRel` object.)
         * </em>
         */
        ProInfoProjRelApi.prototype.markStatementAsFavorite = function (pkProject, pkStatement, isOutgoing, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProInfoProjRels/mark-statement-as-favorite";
            var _routeParams = {};
            var _postBody = {
                isOutgoing: isOutgoing
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            if (typeof pkStatement !== 'undefined' && pkStatement !== null)
                _urlParams.pkStatement = pkStatement;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Updates the ProInfoProjRel found by fk_project and fk_entity.
         *
         * @param {number} pkProject fk_project
         *
         * @param {number} pkEntity fk_entity
         *
         * @param {object} data Request data.
         *
         *  - `eprAttributes` – `{ProInfoProjRel}` - Instance of ProInfoProjRel (fk_project and fk_entity will be ignored)
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProInfoProjRel` object.)
         * </em>
         */
        ProInfoProjRelApi.prototype.updateEprAttributes = function (pkProject, pkEntity, eprAttributes, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProInfoProjRels/updateEprAttributes";
            var _routeParams = {};
            var _postBody = {
                eprAttributes: eprAttributes
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            if (typeof pkEntity !== 'undefined' && pkEntity !== null)
                _urlParams.pkEntity = pkEntity;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Updates the ProInfoProjRel of all found by fk_project and fk_entity.
         *
         * @param {number} pkProject fk_project
         *
         * @param {object} data Request data.
         *
         *  - `items` – `{ProInfoProjRel}` - Array of ProInfoProjRel (fk_project must be equal to pkProject)
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProInfoProjRel` object.)
         * </em>
         */
        ProInfoProjRelApi.prototype.bulkUpdateEprAttributes = function (pkProject, items, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProInfoProjRels/bulk-update-attributes";
            var _routeParams = {};
            var _postBody = {
                items: items
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProInfoProjRel`.
         */
        ProInfoProjRelApi.prototype.getModelName = function () {
            return "ProInfoProjRel";
        };
        ProInfoProjRelApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        ProInfoProjRelApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], ProInfoProjRelApi);
        return ProInfoProjRelApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DfhProfile` model.
     */
    var DfhProfileApi = /** @class */ (function (_super) {
        __extends(DfhProfileApi, _super);
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
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DfhProfileApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DfhProfileApi);
        return DfhProfileApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DfhLabel` model.
     */
    var DfhLabelApi = /** @class */ (function (_super) {
        __extends(DfhLabelApi, _super);
        function DfhLabelApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get all dfh labels needed by the given project.
         *
         * @param {number} pkProject Project pk
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DfhLabel` object.)
         * </em>
         */
        DfhLabelApi.prototype.ofProject = function (pkProject, customHeaders) {
            if (pkProject === void 0) { pkProject = {}; }
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DfhLabels/of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `DfhLabel`.
         */
        DfhLabelApi.prototype.getModelName = function () {
            return "DfhLabel";
        };
        DfhLabelApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DfhLabelApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DfhLabelApi);
        return DfhLabelApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DatChunk` model.
     */
    var DatChunkApi = /** @class */ (function (_super) {
        __extends(DatChunkApi, _super);
        function DatChunkApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get the chunks related to the digital, with their statements.
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
         * This usually means the response is a `DatChunk` object.)
         * </em>
         */
        DatChunkApi.prototype.ofDigital = function (pkProject, pkDigital, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DatChunks/of-digital";
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
         * i.e. `DatChunk`.
         */
        DatChunkApi.prototype.getModelName = function () {
            return "DatChunk";
        };
        DatChunkApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DatChunkApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DatChunkApi);
        return DatChunkApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DatColumn` model.
     */
    var DatColumnApi = /** @class */ (function (_super) {
        __extends(DatColumnApi, _super);
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
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DatColumnApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DatColumnApi);
        return DatColumnApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DatTextProperty` model.
     */
    var DatTextPropertyApi = /** @class */ (function (_super) {
        __extends(DatTextPropertyApi, _super);
        function DatTextPropertyApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatTextProperty`.
         */
        DatTextPropertyApi.prototype.getModelName = function () {
            return "DatTextProperty";
        };
        DatTextPropertyApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DatTextPropertyApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DatTextPropertyApi);
        return DatTextPropertyApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DatDigital` model.
     */
    var DatDigitalApi = /** @class */ (function (_super) {
        __extends(DatDigitalApi, _super);
        function DatDigitalApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Creates or updates instances of DatDigital.
         *
         * @param {number} pkNamespace Namespace
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{DatDigital}` - Array DatDigital
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatDigital` object.)
         * </em>
         */
        DatDigitalApi.prototype.bulkUpsert = function (pkNamespace, data, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DatDigitals/bulk-upsert";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof pkNamespace !== 'undefined' && pkNamespace !== null)
                _urlParams.pkNamespace = pkNamespace;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Deletes instances of DatDigital.
         *
         * @param {object} data Request data.
         *
         *  - `pks` – `{number}` - Array of Primary Key of DatDigitals
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatDigital` object.)
         * </em>
         */
        DatDigitalApi.prototype.bulkDelete = function (pks, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DatDigitals/delete-delete";
            var _routeParams = {};
            var _postBody = {
                pks: pks
            };
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Finds the version of given digital. If no version specified, latest is returned.
         *
         * @param {number} pkEntity Primary Key of the digital object (pk_entity)
         *
         * @param {number} entityVersion Primary Key of the digital object (entity_version)
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatDigital` object.)
         * </em>
         */
        DatDigitalApi.prototype.getVersion = function (pkEntity, entityVersion, customHeaders) {
            if (entityVersion === void 0) { entityVersion = {}; }
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DatDigitals/get-version";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkEntity !== 'undefined' && pkEntity !== null)
                _urlParams.pkEntity = pkEntity;
            if (typeof entityVersion !== 'undefined' && entityVersion !== null)
                _urlParams.entityVersion = entityVersion;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Get page of table
         *
         * @param {number} pkProject Pk of the project.
         *
         * @param {number} pkEntity Pk of the table digital.
         *
         * @param {object} data Request data.
         *
         *  - `options` – `{object}` - options
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatDigital` object.)
         * </em>
         */
        DatDigitalApi.prototype.getTablePage = function (pkProject, pkEntity, options, customHeaders) {
            if (options === void 0) { options = {}; }
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DatDigitals/getTablePage";
            var _routeParams = {};
            var _postBody = {
                options: options
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            if (typeof pkEntity !== 'undefined' && pkEntity !== null)
                _urlParams.pkEntity = pkEntity;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatDigital`.
         */
        DatDigitalApi.prototype.getModelName = function () {
            return "DatDigital";
        };
        DatDigitalApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DatDigitalApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DatDigitalApi);
        return DatDigitalApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `SysAppContext` model.
     */
    var SysAppContextApi = /** @class */ (function (_super) {
        __extends(SysAppContextApi, _super);
        function SysAppContextApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get the App Configuration for classes.
         *
         * @param {number} pk_app_context pk_entity of app_context
         *
         * @param {number} pk_project pk_project of project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SysAppContext` object.)
         * </em>
         */
        SysAppContextApi.prototype.appContext = function (pk_app_context, pk_project, customHeaders) {
            if (pk_app_context === void 0) { pk_app_context = {}; }
            if (pk_project === void 0) { pk_project = {}; }
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/SysAppContexts/app-context";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pk_app_context !== 'undefined' && pk_app_context !== null)
                _urlParams.pk_app_context = pk_app_context;
            if (typeof pk_project !== 'undefined' && pk_project !== null)
                _urlParams.pk_project = pk_project;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysAppContext`.
         */
        SysAppContextApi.prototype.getModelName = function () {
            return "SysAppContext";
        };
        SysAppContextApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SysAppContextApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SysAppContextApi);
        return SysAppContextApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `ProClassFieldConfig` model.
     */
    var ProClassFieldConfigApi = /** @class */ (function (_super) {
        __extends(ProClassFieldConfigApi, _super);
        function ProClassFieldConfigApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Patch an existing model instance or insert a new one into the data source.
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{object}` - Model instance data
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProClassFieldConfig` object.)
         * </em>
         */
        ProClassFieldConfigApi.prototype.patchOrCreate = function (data, customHeaders) {
            if (data === void 0) { data = {}; }
            var _method = "PATCH";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProClassFieldConfigs";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Find ProClassFieldConfig of project
         *
         * @param {number} pkProject Pk of the project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProClassFieldConfig` object.)
         * </em>
         */
        ProClassFieldConfigApi.prototype.ofProject = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProClassFieldConfigs/of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Creates or updates instances of ProClassFieldConfig.
         *
         * @param {number} pkProject Pk of the project
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{ProClassFieldConfig}` - Array ProClassFieldConfig
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProClassFieldConfig` object.)
         * </em>
         */
        ProClassFieldConfigApi.prototype.bulkUpsert = function (pkProject, data, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProClassFieldConfigs/bulk-upsert";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Deletes instances of ProClassFieldConfig.
         *
         * @param {object} data Request data.
         *
         *  - `pks` – `{number}` - Array of Primary Key of ProClassFieldConfigs
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProClassFieldConfig` object.)
         * </em>
         */
        ProClassFieldConfigApi.prototype.bulkDelete = function (pks, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProClassFieldConfigs/bulk-delete";
            var _routeParams = {};
            var _postBody = {
                pks: pks
            };
            var _urlParams = {};
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProClassFieldConfig`.
         */
        ProClassFieldConfigApi.prototype.getModelName = function () {
            return "ProClassFieldConfig";
        };
        ProClassFieldConfigApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        ProClassFieldConfigApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], ProClassFieldConfigApi);
        return ProClassFieldConfigApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `ProDfhClassProjRel` model.
     */
    var ProDfhClassProjRelApi = /** @class */ (function (_super) {
        __extends(ProDfhClassProjRelApi, _super);
        function ProDfhClassProjRelApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Find ProDfhClassProjRel of project
         *
         * @param {number} pkProject Pk of the project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProDfhClassProjRel` object.)
         * </em>
         */
        ProDfhClassProjRelApi.prototype.ofProject = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProDfhClassProjRels/of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Creates or updates instances of ProDfhClassProjRel.
         *
         * @param {number} pkProject Project
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{ProDfhClassProjRel}` - Array ProDfhClassProjRel
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProDfhClassProjRel` object.)
         * </em>
         */
        ProDfhClassProjRelApi.prototype.bulkUpsert = function (pkProject, data, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProDfhClassProjRels/bulk-upsert";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProDfhClassProjRel`.
         */
        ProDfhClassProjRelApi.prototype.getModelName = function () {
            return "ProDfhClassProjRel";
        };
        ProDfhClassProjRelApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        ProDfhClassProjRelApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], ProDfhClassProjRelApi);
        return ProDfhClassProjRelApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `ProDfhProfileProjRel` model.
     */
    var ProDfhProfileProjRelApi = /** @class */ (function (_super) {
        __extends(ProDfhProfileProjRelApi, _super);
        function ProDfhProfileProjRelApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Find ProDfhProfileProjRel of project where enabled is true
         *
         * @param {number} pkProject Pk of the project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProDfhProfileProjRel` object.)
         * </em>
         */
        ProDfhProfileProjRelApi.prototype.ofProject = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProDfhProfileProjRels/of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Creates or updates instances of ProDfhProfileProjRel.
         *
         * @param {number} pkProject Project
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{ProDfhProfileProjRel}` - Array ProDfhProfileProjRel
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ProDfhProfileProjRel` object.)
         * </em>
         */
        ProDfhProfileProjRelApi.prototype.bulkUpsert = function (pkProject, data, customHeaders) {
            var _method = "PUT";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/ProDfhProfileProjRels/bulk-upsert";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `ProDfhProfileProjRel`.
         */
        ProDfhProfileProjRelApi.prototype.getModelName = function () {
            return "ProDfhProfileProjRel";
        };
        ProDfhProfileProjRelApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        ProDfhProfileProjRelApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], ProDfhProfileProjRelApi);
        return ProDfhProfileProjRelApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfAppellation` model.
     */
    var InfAppellationApi = /** @class */ (function (_super) {
        __extends(InfAppellationApi, _super);
        function InfAppellationApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfAppellation`.
         */
        InfAppellationApi.prototype.getModelName = function () {
            return "InfAppellation";
        };
        InfAppellationApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfAppellationApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfAppellationApi);
        return InfAppellationApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfLangString` model.
     */
    var InfLangStringApi = /** @class */ (function (_super) {
        __extends(InfLangStringApi, _super);
        function InfLangStringApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfLangString`.
         */
        InfLangStringApi.prototype.getModelName = function () {
            return "InfLangString";
        };
        InfLangStringApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfLangStringApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfLangStringApi);
        return InfLangStringApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfDimension` model.
     */
    var InfDimensionApi = /** @class */ (function (_super) {
        __extends(InfDimensionApi, _super);
        function InfDimensionApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfDimension`.
         */
        InfDimensionApi.prototype.getModelName = function () {
            return "InfDimension";
        };
        InfDimensionApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfDimensionApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfDimensionApi);
        return InfDimensionApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfTemporalEntity` model.
     */
    var InfTemporalEntityApi = /** @class */ (function (_super) {
        __extends(InfTemporalEntityApi, _super);
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
            return result.pipe(operators.map(function (instances) {
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
            return result.pipe(operators.map(function (instances) {
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
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfTemporalEntityApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfTemporalEntityApi);
        return InfTemporalEntityApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfStatement` model.
     */
    var InfStatementApi = /** @class */ (function (_super) {
        __extends(InfStatementApi, _super);
        function InfStatementApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Get a flat object of entity previews, that are target of a list.
         *
         * @param {number} pkProject Pk of the project.
         *
         * @param {number} pkSourceEntity Pk of the source entity to which the entity previews, that are target of a list are related.
         *
         * @param {number} pkProperty Pk of the property leading from source entity to the entity previews, that are target of a list.
         *
         * @param {number} pkTargetClass Fk class of the target entity previews, that are target of a list.
         *
         * @param {boolean} isOutgoing If true, the source entity is domain, else range.
         *
         * @param {number} limit number of returned entity previews, that are target of a list.
         *
         * @param {number} offset offset of the segment of returned entity previews, that are target of a list.
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfStatement` object.)
         * </em>
         */
        InfStatementApi.prototype.paginatedListTargetingEntityPreviews = function (pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfStatements/paginated-list-targeting-entity-previews";
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
         * Find or create information statement.
         *
         * @param {number} pk_project Id of the project
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{InfStatement}` - data
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfStatement` object.)
         * </em>
         */
        InfStatementApi.prototype.findOrCreateInfStatements = function (pk_project, data, customHeaders) {
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfStatements/find-or-create-many";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof pk_project !== 'undefined' && pk_project !== null)
                _urlParams.pk_project = pk_project;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result.pipe(operators.map(function (instances) {
                return instances.map(function (instance) { return new InfStatement(instance); });
            }));
        };
        /**
         * Get statements (with children) of given fkProperty and fkEntity from Repo that are not in project of given projectId.
         *
         * @param {number} entityPk Key of the persistent item (fk_object_info)
         *
         * @param {number} propertyPk Key of the property (fk_property)
         *
         * @param {number} pkProject Id of the the current project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfStatement` object.)
         * </em>
         */
        InfStatementApi.prototype.alternativesNotInProjectByEntityPk = function (entityPk, propertyPk, pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfStatements/alternatives-not-in-project-by-entity-pk";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof entityPk !== 'undefined' && entityPk !== null)
                _urlParams.entityPk = entityPk;
            if (typeof propertyPk !== 'undefined' && propertyPk !== null)
                _urlParams.propertyPk = propertyPk;
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Get statements (with children) of given propertyPk and teEntPk from Repo that are not in project of given projectId.
         *
         * @param {number} teEntPk Key of the temporal entity (fk_subject_info)
         *
         * @param {number} propertyPk Key of the property (fk_property)
         *
         * @param {number} pkProject Id of the the current project
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfStatement` object.)
         * </em>
         */
        InfStatementApi.prototype.alternativesNotInProjectByTeEntPk = function (teEntPk, propertyPk, pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfStatements/alternatives-not-in-project-by-te-ent-pk";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof teEntPk !== 'undefined' && teEntPk !== null)
                _urlParams.teEntPk = teEntPk;
            if (typeof propertyPk !== 'undefined' && propertyPk !== null)
                _urlParams.propertyPk = propertyPk;
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Get an nested object of statement with everything needed to display the links made from an entity towards sources and digitals.
         *
         * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
         *
         * @param {number} pkProject Primary Key of the Project.
         *
         * @param {number} pkEntity Primary Key of the entity for which the sources links are needed.
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfStatement` object.)
         * </em>
         */
        InfStatementApi.prototype.sourcesAndDigitalsOfEntity = function (ofProject, pkProject, pkEntity, customHeaders) {
            if (pkProject === void 0) { pkProject = {}; }
            if (pkEntity === void 0) { pkEntity = {}; }
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfStatements/sources-and-digitals-of-entity";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof ofProject !== 'undefined' && ofProject !== null)
                _urlParams.ofProject = ofProject;
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            if (typeof pkEntity !== 'undefined' && pkEntity !== null)
                _urlParams.pkEntity = pkEntity;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Find statements by params.
         *
         * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
         *
         * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
         *
         * @param {number} pkEntity Primary Key of the statement (pk_entity)
         *
         * @param {number} pkInfoRange Foreign Key of the statement pointing to the range entity (fk_object_info)
         *
         * @param {number} pkInfoDomain Foreign Key of the statement pointing to the domain entity (fk_subject_info)
         *
         * @param {number} pkProperty Foreign Key of the statement pointing to the property (fk_property)
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfStatement` object.)
         * </em>
         */
        InfStatementApi.prototype.queryByParams = function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty, customHeaders) {
            if (pkProject === void 0) { pkProject = {}; }
            if (pkEntity === void 0) { pkEntity = {}; }
            if (pkInfoRange === void 0) { pkInfoRange = {}; }
            if (pkInfoDomain === void 0) { pkInfoDomain = {}; }
            if (pkProperty === void 0) { pkProperty = {}; }
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfStatements/find-by-params";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof ofProject !== 'undefined' && ofProject !== null)
                _urlParams.ofProject = ofProject;
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            if (typeof pkEntity !== 'undefined' && pkEntity !== null)
                _urlParams.pkEntity = pkEntity;
            if (typeof pkInfoRange !== 'undefined' && pkInfoRange !== null)
                _urlParams.pkInfoRange = pkInfoRange;
            if (typeof pkInfoDomain !== 'undefined' && pkInfoDomain !== null)
                _urlParams.pkInfoDomain = pkInfoDomain;
            if (typeof pkProperty !== 'undefined' && pkProperty !== null)
                _urlParams.pkProperty = pkProperty;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfStatement`.
         */
        InfStatementApi.prototype.getModelName = function () {
            return "InfStatement";
        };
        InfStatementApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfStatementApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfStatementApi);
        return InfStatementApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfLanguage` model.
     */
    var InfLanguageApi = /** @class */ (function (_super) {
        __extends(InfLanguageApi, _super);
        function InfLanguageApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Perform a ranked search on languages by search string.
         *
         * @param {string} queryString
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfLanguage` object.)
         * </em>
         */
        InfLanguageApi.prototype.queryByString = function (queryString, customHeaders) {
            if (queryString === void 0) { queryString = {}; }
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfLanguages/query-by-string";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof queryString !== 'undefined' && queryString !== null)
                _urlParams.queryString = queryString;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfLanguage`.
         */
        InfLanguageApi.prototype.getModelName = function () {
            return "InfLanguage";
        };
        InfLanguageApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfLanguageApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfLanguageApi);
        return InfLanguageApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfPersistentItem` model.
     */
    var InfPersistentItemApi = /** @class */ (function (_super) {
        __extends(InfPersistentItemApi, _super);
        function InfPersistentItemApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Find or create many information persistent items.
         *
         * @param {number} pk_project Pk of the project
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{InfPersistentItem}` - data
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfPersistentItem` object.)
         * </em>
         */
        InfPersistentItemApi.prototype.findOrCreateInfPersistentItems = function (pk_project, data, customHeaders) {
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfPersistentItems/find-or-create-many";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof pk_project !== 'undefined' && pk_project !== null)
                _urlParams.pk_project = pk_project;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result.pipe(operators.map(function (instances) {
                return instances.map(function (instance) { return new InfPersistentItem(instance); });
            }));
        };
        /**
         * Get only miminal properties of persistent item.
         *
         * @param {number} pkProject Pk of the project.
         *
         * @param {number} pkEntity Pk of the entity.
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfPersistentItem` object.)
         * </em>
         */
        InfPersistentItemApi.prototype.ownProperties = function (pkProject, pkEntity, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfPersistentItems/own-properties";
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
         * Get a minimal nested object of all types in the project.
         *
         * @param {number} pkProject Pk of the project.
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfPersistentItem` object.)
         * </em>
         */
        InfPersistentItemApi.prototype.typesOfProject = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfPersistentItems/types-of-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Find types of typed class and project. E.g. get the types for the class 'histC8 Geographical Place' (pk_typed_class=363) used in project (pk_project=123)
         *
         * @param {number} pk_project Primary Key of Project
         *
         * @param {number} pk_typed_classes Primary Keyes of Typed Classes (e.g. pk of Geographical Place to get Geographical Place Types)
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfPersistentItem` object.)
         * </em>
         */
        InfPersistentItemApi.prototype.typesOfClassesAndProject = function (pk_project, pk_typed_classes, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfPersistentItems/types-of-classes-and-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pk_project !== 'undefined' && pk_project !== null)
                _urlParams.pk_project = pk_project;
            if (typeof pk_typed_classes !== 'undefined' && pk_typed_classes !== null)
                _urlParams.pk_typed_classes = pk_typed_classes;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * Find one type by pk_entity with appellations and text properties.
         *
         * @param {number} pk_project Primary Key of Project
         *
         * @param {number} pk_entity Primary Key of the type. Provide this if you want to query one specific type.
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfPersistentItem` object.)
         * </em>
         */
        InfPersistentItemApi.prototype.typeNested = function (pk_project, pk_entity, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfPersistentItems/type-nested";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pk_project !== 'undefined' && pk_project !== null)
                _urlParams.pk_project = pk_project;
            if (typeof pk_entity !== 'undefined' && pk_entity !== null)
                _urlParams.pk_entity = pk_entity;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfPersistentItem`.
         */
        InfPersistentItemApi.prototype.getModelName = function () {
            return "InfPersistentItem";
        };
        InfPersistentItemApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfPersistentItemApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfPersistentItemApi);
        return InfPersistentItemApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfTimePrimitive` model.
     */
    var InfTimePrimitiveApi = /** @class */ (function (_super) {
        __extends(InfTimePrimitiveApi, _super);
        function InfTimePrimitiveApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfTimePrimitive`.
         */
        InfTimePrimitiveApi.prototype.getModelName = function () {
            return "InfTimePrimitive";
        };
        InfTimePrimitiveApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfTimePrimitiveApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfTimePrimitiveApi);
        return InfTimePrimitiveApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfPlace` model.
     */
    var InfPlaceApi = /** @class */ (function (_super) {
        __extends(InfPlaceApi, _super);
        function InfPlaceApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Find or create a InfPlace and update the project relation if needed.
         *
         * @param {number} projectId Id of the project
         *
         * @param {object} data Request data.
         *
         *  - `data` – `{InfPlace}` - data
         *
         * @returns {object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `InfPlace` object.)
         * </em>
         */
        InfPlaceApi.prototype.findOrCreatePlace = function (projectId, data, customHeaders) {
            var _method = "POST";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/InfPlaces/findOrCreate";
            var _routeParams = {};
            var _postBody = {
                data: data
            };
            var _urlParams = {};
            if (typeof projectId !== 'undefined' && projectId !== null)
                _urlParams.projectId = projectId;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result.pipe(operators.map(function (instances) {
                return instances.map(function (instance) { return new InfPlace(instance); });
            }));
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `InfPlace`.
         */
        InfPlaceApi.prototype.getModelName = function () {
            return "InfPlace";
        };
        InfPlaceApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfPlaceApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfPlaceApi);
        return InfPlaceApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `DatNamespace` model.
     */
    var DatNamespaceApi = /** @class */ (function (_super) {
        __extends(DatNamespaceApi, _super);
        function DatNamespaceApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * Finds namespaces of a project.
         *
         * @param {number} pkProject Key of the Project for which the namespaces should be found.
         *
         * @returns {object[]} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `DatNamespace` object.)
         * </em>
         */
        DatNamespaceApi.prototype.byProject = function (pkProject, customHeaders) {
            var _method = "GET";
            var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
                "/DatNamespaces/find-by-project";
            var _routeParams = {};
            var _postBody = {};
            var _urlParams = {};
            if (typeof pkProject !== 'undefined' && pkProject !== null)
                _urlParams.pkProject = pkProject;
            var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
            return result;
        };
        /**
         * The name of the model represented by this $resource,
         * i.e. `DatNamespace`.
         */
        DatNamespaceApi.prototype.getModelName = function () {
            return "DatNamespace";
        };
        DatNamespaceApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        DatNamespaceApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], DatNamespaceApi);
        return DatNamespaceApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `InfTextProperty` model.
     */
    var InfTextPropertyApi = /** @class */ (function (_super) {
        __extends(InfTextPropertyApi, _super);
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
            return result.pipe(operators.map(function (instances) {
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
            return result.pipe(operators.map(function (instances) {
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
            return result.pipe(operators.map(function (instances) {
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
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        InfTextPropertyApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], InfTextPropertyApi);
        return InfTextPropertyApi;
    }(BaseLoopBackApi));

    /**
     * Api services for the `SysSystemType` model.
     */
    var SysSystemTypeApi = /** @class */ (function (_super) {
        __extends(SysSystemTypeApi, _super);
        function SysSystemTypeApi(http, connection, models, auth, errorHandler) {
            var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
            _this.http = http;
            _this.connection = connection;
            _this.models = models;
            _this.auth = auth;
            _this.errorHandler = errorHandler;
            return _this;
        }
        /**
         * The name of the model represented by this $resource,
         * i.e. `SysSystemType`.
         */
        SysSystemTypeApi.prototype.getModelName = function () {
            return "SysSystemType";
        };
        SysSystemTypeApi.ctorParameters = function () { return [
            { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
            { type: SocketConnection, decorators: [{ type: core.Inject, args: [SocketConnection,] }] },
            { type: SDKModels, decorators: [{ type: core.Inject, args: [SDKModels,] }] },
            { type: LoopBackAuth, decorators: [{ type: core.Inject, args: [LoopBackAuth,] }] },
            { type: ErrorHandler, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ErrorHandler,] }] }
        ]; };
        SysSystemTypeApi = __decorate([
            core.Injectable(),
            __param(0, core.Inject(http.HttpClient)),
            __param(1, core.Inject(SocketConnection)),
            __param(2, core.Inject(SDKModels)),
            __param(3, core.Inject(LoopBackAuth)),
            __param(4, core.Optional()), __param(4, core.Inject(ErrorHandler))
        ], SysSystemTypeApi);
        return SysSystemTypeApi;
    }(BaseLoopBackApi));

    /* tslint:disable */

    /* tslint:disable */

    /* tslint:disable */

    /**
    * @module SDKBrowserModule
    * @description
    * This module should be imported when building a Web Application in the following scenarios:
    *
    *  1.- Regular web application
    *  2.- Angular universal application (Browser Portion)
    *  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
    **/
    var SDKBrowserModule = /** @class */ (function () {
        function SDKBrowserModule() {
        }
        SDKBrowserModule_1 = SDKBrowserModule;
        SDKBrowserModule.forRoot = function (internalStorageProvider) {
            if (internalStorageProvider === void 0) { internalStorageProvider = {
                provide: InternalStorage,
                useClass: CookieBrowser
            }; }
            return {
                ngModule: SDKBrowserModule_1,
                providers: [
                    LoopBackAuth,
                    LoggerService,
                    SDKModels,
                    RealTime,
                    SchemaObjectApi,
                    SysClassFieldPropertyRelApi,
                    SysClassFieldApi,
                    SysClassHasTypePropertyApi,
                    SysSystemRelevantClassApi,
                    PubAccountApi,
                    EmailApi,
                    ProProjectApi,
                    PubAccountProjectRelApi,
                    ProTextPropertyApi,
                    ProInfoProjRelApi,
                    DfhProfileApi,
                    DfhLabelApi,
                    DatChunkApi,
                    DatColumnApi,
                    DatTextPropertyApi,
                    DatDigitalApi,
                    SysAppContextApi,
                    ProClassFieldConfigApi,
                    ProDfhClassProjRelApi,
                    ProDfhProfileProjRelApi,
                    InfAppellationApi,
                    InfLangStringApi,
                    InfDimensionApi,
                    InfTemporalEntityApi,
                    InfStatementApi,
                    InfLanguageApi,
                    InfPersistentItemApi,
                    InfTimePrimitiveApi,
                    InfPlaceApi,
                    DatNamespaceApi,
                    InfTextPropertyApi,
                    SysSystemTypeApi,
                    internalStorageProvider,
                    { provide: SDKStorage, useClass: StorageBrowser },
                    { provide: SocketDriver, useClass: SocketBrowser }
                ]
            };
        };
        var SDKBrowserModule_1;
        SDKBrowserModule = SDKBrowserModule_1 = __decorate([
            core.NgModule({
                imports: [common.CommonModule, http.HttpClientModule],
                declarations: [],
                exports: [],
                providers: [
                    ErrorHandler,
                    SocketConnection
                ]
            })
        ], SDKBrowserModule);
        return SDKBrowserModule;
    }());

    exports.AccessToken = AccessToken;
    exports.BaseLoopBackApi = BaseLoopBackApi;
    exports.BaseStorage = BaseStorage;
    exports.CookieBrowser = CookieBrowser;
    exports.DatChunk = DatChunk;
    exports.DatChunkApi = DatChunkApi;
    exports.DatColumn = DatColumn;
    exports.DatColumnApi = DatColumnApi;
    exports.DatDigital = DatDigital;
    exports.DatDigitalApi = DatDigitalApi;
    exports.DatNamespace = DatNamespace;
    exports.DatNamespaceApi = DatNamespaceApi;
    exports.DatTextProperty = DatTextProperty;
    exports.DatTextPropertyApi = DatTextPropertyApi;
    exports.DfhLabel = DfhLabel;
    exports.DfhLabelApi = DfhLabelApi;
    exports.DfhProfile = DfhProfile;
    exports.DfhProfileApi = DfhProfileApi;
    exports.Email = Email;
    exports.EmailApi = EmailApi;
    exports.ErrorHandler = ErrorHandler;
    exports.FireLoopRef = FireLoopRef;
    exports.InfAppellation = InfAppellation;
    exports.InfAppellationApi = InfAppellationApi;
    exports.InfDimension = InfDimension;
    exports.InfDimensionApi = InfDimensionApi;
    exports.InfLangString = InfLangString;
    exports.InfLangStringApi = InfLangStringApi;
    exports.InfLanguage = InfLanguage;
    exports.InfLanguageApi = InfLanguageApi;
    exports.InfPersistentItem = InfPersistentItem;
    exports.InfPersistentItemApi = InfPersistentItemApi;
    exports.InfPlace = InfPlace;
    exports.InfPlaceApi = InfPlaceApi;
    exports.InfStatement = InfStatement;
    exports.InfStatementApi = InfStatementApi;
    exports.InfTemporalEntity = InfTemporalEntity;
    exports.InfTemporalEntityApi = InfTemporalEntityApi;
    exports.InfTextProperty = InfTextProperty;
    exports.InfTextPropertyApi = InfTextPropertyApi;
    exports.InfTimePrimitive = InfTimePrimitive;
    exports.InfTimePrimitiveApi = InfTimePrimitiveApi;
    exports.InternalStorage = InternalStorage;
    exports.LoggerService = LoggerService;
    exports.LoopBackAuth = LoopBackAuth;
    exports.LoopBackConfig = LoopBackConfig;
    exports.ProClassFieldConfig = ProClassFieldConfig;
    exports.ProClassFieldConfigApi = ProClassFieldConfigApi;
    exports.ProDfhClassProjRel = ProDfhClassProjRel;
    exports.ProDfhClassProjRelApi = ProDfhClassProjRelApi;
    exports.ProDfhProfileProjRel = ProDfhProfileProjRel;
    exports.ProDfhProfileProjRelApi = ProDfhProfileProjRelApi;
    exports.ProInfoProjRel = ProInfoProjRel;
    exports.ProInfoProjRelApi = ProInfoProjRelApi;
    exports.ProProject = ProProject;
    exports.ProProjectApi = ProProjectApi;
    exports.ProTextProperty = ProTextProperty;
    exports.ProTextPropertyApi = ProTextPropertyApi;
    exports.PubAccount = PubAccount;
    exports.PubAccountApi = PubAccountApi;
    exports.PubAccountProjectRel = PubAccountProjectRel;
    exports.PubAccountProjectRelApi = PubAccountProjectRelApi;
    exports.RealTime = RealTime;
    exports.SDKBrowserModule = SDKBrowserModule;
    exports.SDKModels = SDKModels;
    exports.SDKStorage = SDKStorage;
    exports.SDKToken = SDKToken;
    exports.SchemaObject = SchemaObject;
    exports.SchemaObjectApi = SchemaObjectApi;
    exports.StorageBrowser = StorageBrowser;
    exports.SysAppContext = SysAppContext;
    exports.SysAppContextApi = SysAppContextApi;
    exports.SysClassField = SysClassField;
    exports.SysClassFieldApi = SysClassFieldApi;
    exports.SysClassFieldPropertyRel = SysClassFieldPropertyRel;
    exports.SysClassFieldPropertyRelApi = SysClassFieldPropertyRelApi;
    exports.SysClassHasTypeProperty = SysClassHasTypeProperty;
    exports.SysClassHasTypePropertyApi = SysClassHasTypePropertyApi;
    exports.SysSystemRelevantClass = SysSystemRelevantClass;
    exports.SysSystemRelevantClassApi = SysSystemRelevantClassApi;
    exports.SysSystemType = SysSystemType;
    exports.SysSystemTypeApi = SysSystemTypeApi;
    exports.ɵa = SocketConnection;
    exports.ɵb = SocketDriver;
    exports.ɵc = SocketBrowser;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-sdk-lb3.umd.js.map
