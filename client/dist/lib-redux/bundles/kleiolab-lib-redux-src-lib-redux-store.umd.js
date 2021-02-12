(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular-redux/store'), require('@angular/core'), require('@kleiolab/lib-utils'), require('rxjs/operators'), require('@kleiolab/lib-sdk-lb3'), require('redux-observable-es6-compat'), require('rxjs'), require('@kleiolab/lib-config'), require('@cime/ngx-slim-loading-bar'), require('@cime/ngx-toasty'), require('@angular/cdk/drag-drop'), require('ramda')) :
    typeof define === 'function' && define.amd ? define('@kleiolab/lib-redux/src/lib/redux-store', ['exports', '@angular-redux/store', '@angular/core', '@kleiolab/lib-utils', 'rxjs/operators', '@kleiolab/lib-sdk-lb3', 'redux-observable-es6-compat', 'rxjs', '@kleiolab/lib-config', '@cime/ngx-slim-loading-bar', '@cime/ngx-toasty', '@angular/cdk/drag-drop', 'ramda'], factory) :
    (global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-redux'] = global.kleiolab['lib-redux'] || {}, global.kleiolab['lib-redux'].src = global.kleiolab['lib-redux'].src || {}, global.kleiolab['lib-redux'].src.lib = global.kleiolab['lib-redux'].src.lib || {}, global.kleiolab['lib-redux'].src.lib['redux-store'] = {}), global.store, global.ng.core, global.libUtils, global.rxjs.operators, global.libSdkLb3, global.reduxObservableEs6Compat, global.rxjs, global.libConfig, global.ngxSlimLoadingBar, global.ngxToasty, global.ng.cdk['drag-drop'], global.ramda));
}(this, (function (exports, store, core, libUtils, operators, libSdkLb3, reduxObservableEs6Compat, rxjs, libConfig, ngxSlimLoadingBar, ngxToasty, dragDrop, ramda) { 'use strict';

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
     * @fileoverview added by tsickle
     * Generated from: root/models/model.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function InfObject() { }
    if (false) {
        /** @type {?} */
        InfObject.prototype.persistent_item;
        /** @type {?} */
        InfObject.prototype.temporal_entity;
        /** @type {?} */
        InfObject.prototype.statement;
        /** @type {?} */
        InfObject.prototype.place;
        /** @type {?} */
        InfObject.prototype.language;
        /** @type {?} */
        InfObject.prototype.appellation;
        /** @type {?} */
        InfObject.prototype.time_primitive;
        /** @type {?} */
        InfObject.prototype.text_property;
        /** @type {?} */
        InfObject.prototype.lang_string;
        /** @type {?} */
        InfObject.prototype.dimension;
    }
    /**
     * @record
     */
    function ProObject() { }
    if (false) {
        /** @type {?} */
        ProObject.prototype.info_proj_rel;
    }
    /**
     * @record
     */
    function DatObject() { }
    if (false) {
        /** @type {?} */
        DatObject.prototype.digital;
    }
    /**
     * @record
     */
    function WarObject() { }
    if (false) {
        /** @type {?} */
        WarObject.prototype.entity_preview;
    }
    /**
     * @record
     */
    function SchemaObject() { }
    if (false) {
        /** @type {?|undefined} */
        SchemaObject.prototype.inf;
        /** @type {?|undefined} */
        SchemaObject.prototype.pro;
        /** @type {?|undefined} */
        SchemaObject.prototype.dat;
        /** @type {?|undefined} */
        SchemaObject.prototype.war;
    }
    /**
     * @record
     */
    function PaginationObject() { }
    if (false) {
        /** @type {?} */
        PaginationObject.prototype.count;
        /** @type {?} */
        PaginationObject.prototype.schemas;
        /** @type {?} */
        PaginationObject.prototype.statements;
    }
    /**
     * @record
     */
    function IAppState() { }
    if (false) {
        /** @type {?|undefined} */
        IAppState.prototype.account;
        /** @type {?|undefined} */
        IAppState.prototype.loadingBar;
        /** @type {?|undefined} */
        IAppState.prototype.projects;
        /** @type {?|undefined} */
        IAppState.prototype.sys;
        /** @type {?|undefined} */
        IAppState.prototype.dfh;
        /** @type {?|undefined} */
        IAppState.prototype.inf;
        /** @type {?|undefined} */
        IAppState.prototype.dat;
        /** @type {?|undefined} */
        IAppState.prototype.pro;
        /** @type {?|undefined} */
        IAppState.prototype.war;
        /** @type {?|undefined} */
        IAppState.prototype.tab;
        /** @type {?|undefined} */
        IAppState.prototype.activeProject;
        /** @type {?|undefined} */
        IAppState.prototype.routes;
        /** @type {?|undefined} */
        IAppState.prototype.information;
        /** @type {?|undefined} */
        IAppState.prototype.sources;
        /** @type {?|undefined} */
        IAppState.prototype.sandboxState;
        /** @type {?|undefined} */
        IAppState.prototype.pending;
    }
    /**
     * @record
     * @template T
     */
    function ByPk() { }

    /**
     * @fileoverview added by tsickle
     * Generated from: root/models/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: root/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/dat.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var datRoot = 'dat';
    /** @type {?} */
    var facetteByPk = 'by_namespace';
    var ɵ0 = /**
     * @param {?} newItem
     * @param {?} oldItem
     * @return {?}
     */
    function (newItem, oldItem) {
        if (!oldItem.quill_doc && newItem.quill_doc)
            return false;
        return (newItem.pk_entity === oldItem.pk_entity &&
            newItem.entity_version === oldItem.entity_version);
    }, ɵ1 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString() + '_' + item.entity_version.toString(); }, ɵ2 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_text.toString(); }, ɵ4 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ5 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_text.toString(); }, ɵ6 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ7 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_digital.toString(); }, ɵ8 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ9 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_column.toString(); }, ɵ10 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ11 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_entity + '_' + item.fk_system_type; }, ɵ12 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ13 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_project.toString(); };
    /** @type {?} */
    var datDefinitions = {
        digital: {
            equals: (ɵ0),
            indexBy: {
                keyInStore: 'pk_entity__entity_version',
                indexByFn: (ɵ1)
            },
            groupBy: [
                {
                    keyInStore: 'pk_entity',
                    groupByFn: (ɵ2)
                },
                {
                    keyInStore: 'pk_text',
                    groupByFn: (ɵ3)
                }
            ]
        },
        chunk: {
            // facetteByPk,
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ4)
            },
            groupBy: [
                {
                    keyInStore: 'fk_text',
                    groupByFn: (ɵ5)
                }
            ]
        },
        column: {
            // facetteByPk,
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ6)
            },
            groupBy: [
                {
                    keyInStore: 'fk_digital',
                    groupByFn: (ɵ7)
                }
            ]
        },
        class_column_mapping: {
            // facetteByPk,
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ8)
            },
            groupBy: [
                {
                    keyInStore: 'fk_column',
                    groupByFn: (ɵ9)
                }
            ]
        },
        text_property: {
            // facetteByPk,
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ10)
            },
            groupBy: [
                {
                    keyInStore: 'fk_entity__fk_system_type',
                    groupByFn: (ɵ11)
                }
            ]
        },
        namespace: {
            // facetteByPk,
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ12)
            },
            groupBy: [
                {
                    keyInStore: 'fk_project',
                    groupByFn: (ɵ13)
                }
            ]
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/dfh.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var dfhRoot = 'dfh';
    /** @type {?} */
    var dfhLabelByFksKey = (/**
     * @param {?} item
     * @return {?}
     */
    function (item) { return (item.type || null) + "_" + (item.language || null) + "_" + (item.fk_class || null) + "_" + (item.fk_profile || null) + "_" + (item.fk_property || null) + "_" + (item.fk_project || null); });
    var ɵ0$1 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_profile.toString(); }, ɵ1$1 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_class.toString(); }, ɵ2$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.basic_type.toString(); }, ɵ3$1 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_property + '_' + item.has_domain + '_' + item.has_range; }, ɵ4$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.pk_property.toString(); }, ɵ5$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.has_domain.toString(); }, ɵ6$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.has_range.toString(); }, ɵ7$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.has_domain + '_' + d.pk_property; }, ɵ8$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.has_range + '_' + d.pk_property; }, ɵ9$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined; }, ɵ10$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return !d.fk_class ? undefined : d.fk_class + "_" + d.type; }, ɵ11$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return !d.fk_property ? undefined : d.fk_property + "_" + d.type; }, ɵ12$1 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return !d.fk_profile ? undefined : d.fk_profile + "_" + d.type; };
    /** @type {?} */
    var dfhDefinitions = {
        profile: {
            indexBy: {
                keyInStore: 'pk_profile',
                indexByFn: (ɵ0$1)
            }
        },
        klass: {
            indexBy: {
                keyInStore: 'pk_class',
                indexByFn: (ɵ1$1),
            },
            groupBy: [
                {
                    keyInStore: 'basic_type',
                    groupByFn: (ɵ2$1)
                },
            ]
        },
        property: {
            indexBy: {
                keyInStore: 'pk_property__has_domain__has_range',
                indexByFn: (ɵ3$1)
            },
            groupBy: [
                {
                    keyInStore: 'pk_property',
                    groupByFn: (ɵ4$1)
                },
                {
                    keyInStore: 'has_domain',
                    groupByFn: (ɵ5$1)
                },
                {
                    keyInStore: 'has_range',
                    groupByFn: (ɵ6$1)
                },
                {
                    keyInStore: 'has_domain__fk_property',
                    groupByFn: (ɵ7$1)
                },
                {
                    keyInStore: 'has_range__fk_property',
                    groupByFn: (ɵ8$1)
                },
                {
                    keyInStore: 'is_has_type_subproperty',
                    groupByFn: (ɵ9$1)
                }
            ]
        },
        label: {
            indexBy: {
                keyInStore: 'fks',
                indexByFn: dfhLabelByFksKey
            },
            groupBy: [
                {
                    keyInStore: 'fk_class__type',
                    groupByFn: (ɵ10$1)
                },
                {
                    keyInStore: 'fk_property__type',
                    groupByFn: (ɵ11$1)
                },
                {
                    keyInStore: 'fk_profile__type',
                    groupByFn: (ɵ12$1)
                }
            ]
        },
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/inf.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var infRoot = 'inf';
    var ɵ0$2 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ1$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_class.toString(); }, ɵ2$2 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ3$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_class.toString(); }, ɵ4$2 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ5$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return indexStatementBySubject(d); }, ɵ6$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return indexStatementBySubjectProperty(d); }, ɵ7$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return indexStatementByObject(d); }, ɵ8$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return indexStatementByObjectProperty(d); }, ɵ9$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return libUtils.U.toStr0undef(d.fk_subject_data); }, ɵ10$2 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ11$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_concerned_entity + '_' + d.fk_class_field; }, ɵ12$2 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_concerned_entity.toString(); }, ɵ13$1 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ14 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ15 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ16 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ17 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ18 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    };
    /** @type {?} */
    var infDefinitions = {
        persistent_item: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ0$2)
            },
            groupBy: [
                {
                    keyInStore: 'fk_class',
                    groupByFn: (ɵ1$2)
                }
            ]
        },
        temporal_entity: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ2$2)
            },
            groupBy: [
                {
                    keyInStore: 'fk_class',
                    groupByFn: (ɵ3$2)
                }
            ]
        },
        statement: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ4$2)
            },
            groupBy: [
                {
                    keyInStore: 'subject',
                    groupByFn: (ɵ5$2)
                },
                {
                    keyInStore: 'subject+property',
                    groupByFn: (ɵ6$2)
                },
                {
                    keyInStore: 'object',
                    groupByFn: (ɵ7$2)
                },
                {
                    keyInStore: 'object+property',
                    groupByFn: (ɵ8$2)
                },
                {
                    keyInStore: 'fk_subject_data',
                    groupByFn: (ɵ9$2)
                },
            ]
        },
        text_property: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ10$2)
            },
            groupBy: [
                {
                    keyInStore: 'fk_concerned_entity__fk_class_field',
                    groupByFn: (ɵ11$2)
                },
                {
                    keyInStore: 'fk_concerned_entity',
                    groupByFn: (ɵ12$2)
                },
            ]
        },
        lang_string: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ13$1)
            },
            groupBy: []
        },
        appellation: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ14)
            },
            groupBy: []
        },
        time_primitive: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ15)
            },
            groupBy: []
        },
        place: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ16)
            },
            groupBy: []
        },
        language: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ17)
            },
            groupBy: []
        },
        dimension: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ18)
            },
            groupBy: []
        },
    }
    /**
     * This function creates a key for the given statement by
     * - subject (all subject foreign keys)
     *
     * The key is created on the basis of the given foreign keys.
     * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
     *
     * Use this function to index groups of statements with the same subject
     * or to retrieve statements from such a group index
     */
    ;
    /**
     * This function creates a key for the given statement by
     * - subject (all subject foreign keys)
     *
     * The key is created on the basis of the given foreign keys.
     * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
     *
     * Use this function to index groups of statements with the same subject
     * or to retrieve statements from such a group index
     * @param {?=} fks
     * @return {?}
     */
    function indexStatementBySubject(fks) {
        if (fks === void 0) { fks = {}; }
        return (fks.fk_subject_info || '0') + "-" + (fks.fk_subject_data || '0') + "-" + ((fks.fk_subject_tables_row) || '0') + "-" + ((fks.fk_subject_tables_cell) || '0');
    }
    /**
     * @record
     */
    function IndexStatementBySubject() { }
    if (false) {
        /** @type {?|undefined} */
        IndexStatementBySubject.prototype.fk_subject_info;
        /** @type {?|undefined} */
        IndexStatementBySubject.prototype.fk_subject_data;
        /** @type {?|undefined} */
        IndexStatementBySubject.prototype.fk_subject_tables_row;
        /** @type {?|undefined} */
        IndexStatementBySubject.prototype.fk_subject_tables_cell;
    }
    ;
    /**
     * This function creates a key for the given statement by
     * - object (all object foreign keys)
     *
     * The key is created on the basis of the given foreign keys.
     * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
     *
     * Use this function to index groups of statements with the same object
     * or to retrieve statements from such a group index
     * @param {?=} fks
     * @return {?}
     */
    function indexStatementByObject(fks) {
        if (fks === void 0) { fks = {}; }
        return (fks.fk_object_info || '0') + "-" + (fks.fk_object_data || '0') + "-" + (fks.fk_object_tables_row || '0') + "-" + (fks.fk_object_tables_cell || '0');
    }
    /**
     * @record
     */
    function IndexStatementByObject() { }
    if (false) {
        /** @type {?|undefined} */
        IndexStatementByObject.prototype.fk_object_info;
        /** @type {?|undefined} */
        IndexStatementByObject.prototype.fk_object_data;
        /** @type {?|undefined} */
        IndexStatementByObject.prototype.fk_object_tables_row;
        /** @type {?|undefined} */
        IndexStatementByObject.prototype.fk_object_tables_cell;
    }
    ;
    /**
     * This function creates a key for the given statement by
     * - subject (all subject foreign keys)
     * - property (all property foreign keys)
     *
     * The key is created on the basis of the given foreign keys.
     * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
     *
     * Use this function to index groups of statements with the same subject + property
     * or to retrieve statements from such a group index
     * @param {?=} fks
     * @return {?}
     */
    function indexStatementBySubjectProperty(fks) {
        if (fks === void 0) { fks = {}; }
        return (fks.fk_subject_info || '0') + "-" + (fks.fk_subject_data || '0') + "-" + ((fks.fk_subject_tables_row) || '0') + "-" + ((fks.fk_subject_tables_cell) || '0') + "-" + (fks.fk_property || '0') + "-" + (fks.fk_property_of_property || '0');
    }
    /**
     * @record
     */
    function IndexStatementBySubjectProperty() { }
    if (false) {
        /** @type {?|undefined} */
        IndexStatementBySubjectProperty.prototype.fk_subject_info;
        /** @type {?|undefined} */
        IndexStatementBySubjectProperty.prototype.fk_subject_data;
        /** @type {?|undefined} */
        IndexStatementBySubjectProperty.prototype.fk_subject_tables_row;
        /** @type {?|undefined} */
        IndexStatementBySubjectProperty.prototype.fk_subject_tables_cell;
        /** @type {?|undefined} */
        IndexStatementBySubjectProperty.prototype.fk_property;
        /** @type {?|undefined} */
        IndexStatementBySubjectProperty.prototype.fk_property_of_property;
    }
    /**
     * This function creates a key for the given statement by
     * - object (all object foreign keys)
     * - property (all property foreign keys)
     *
     * The key is created on the basis of the given foreign keys.
     * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
     *
     * Use this function to index groups of statements with the same object + property
     * or to retrieve statements from such a group index
     * @param {?=} fks
     * @return {?}
     */
    function indexStatementByObjectProperty(fks) {
        if (fks === void 0) { fks = {}; }
        return (fks.fk_object_info || '0') + "-" + (fks.fk_object_data || '0') + "-" + (fks.fk_object_tables_row || '0') + "-" + (fks.fk_object_tables_cell || '0') + "-" + (fks.fk_property || '0') + "-" + (fks.fk_property_of_property || '0');
    }
    /**
     * @record
     */
    function IndexStatementByObjectProperty() { }
    if (false) {
        /** @type {?|undefined} */
        IndexStatementByObjectProperty.prototype.fk_object_info;
        /** @type {?|undefined} */
        IndexStatementByObjectProperty.prototype.fk_object_data;
        /** @type {?|undefined} */
        IndexStatementByObjectProperty.prototype.fk_object_tables_row;
        /** @type {?|undefined} */
        IndexStatementByObjectProperty.prototype.fk_object_tables_cell;
        /** @type {?|undefined} */
        IndexStatementByObjectProperty.prototype.fk_property;
        /** @type {?|undefined} */
        IndexStatementByObjectProperty.prototype.fk_property_of_property;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/pro.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var proRoot = 'pro';
    /** @type {?} */
    var textPropertyByFksKey = (/**
     * @param {?} d
     * @return {?}
     */
    function (d) { return (d.fk_project || null) + "_" + (d.fk_system_type || null) + "_" + (d.fk_language || null) + "_" + (d.fk_dfh_class || null) + "_" + (d.fk_dfh_property || null) + "_" + (d.fk_dfh_property_domain || null) + "_" + (d.fk_dfh_property_range || null); });
    /** @type {?} */
    var textPropertyByFksWithoutLang = (/**
     * @param {?} d
     * @return {?}
     */
    function (d) { return (d.fk_project || null) + "_" + (d.fk_system_type || null) + "_" + (d.fk_dfh_class || null) + "_" + (d.fk_dfh_property || null) + "_" + (d.fk_dfh_property_domain || null) + "_" + (d.fk_dfh_property_range || null); });
    /** @type {?} */
    var proClassFieldConfgByProjectAndClassKey = (/**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        /** @type {?} */
        var fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
        return (d.fk_project || null) + "_" + (fk_class || null);
    });
    var ɵ0$3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ1$3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_project.toString() + '_' + item.fk_entity.toString(); }, ɵ2$3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); }, ɵ3$3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_project + '_' + item.fk_class; }, ɵ4$3 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_project + '_' + d.enabled_in_entities; }, ɵ5$3 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_project.toString(); }, ɵ6$3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_project + '_' + item.fk_profile; }, ɵ7$3 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_project + '_' + d.enabled; }, ɵ8$3 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_project.toString(); }, ɵ9$3 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); };
    /** @type {?} */
    var proDefinitions = {
        project: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ0$3)
            }
        },
        info_proj_rel: {
            indexBy: {
                keyInStore: 'fk_project__fk_entity',
                indexByFn: (ɵ1$3)
            }
        },
        class_field_config: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ2$3)
            },
            groupBy: [
                {
                    keyInStore: 'fk_project__fk_class',
                    groupByFn: proClassFieldConfgByProjectAndClassKey
                }
            ]
        },
        dfh_class_proj_rel: {
            indexBy: {
                keyInStore: 'fk_project__fk_class',
                indexByFn: (ɵ3$3)
            },
            groupBy: [
                {
                    keyInStore: 'fk_project__enabled_in_entities',
                    groupByFn: (ɵ4$3)
                },
                {
                    keyInStore: 'fk_project',
                    groupByFn: (ɵ5$3)
                }
            ],
        },
        dfh_profile_proj_rel: {
            indexBy: {
                keyInStore: 'fk_project__fk_profile',
                indexByFn: (ɵ6$3)
            },
            groupBy: [
                {
                    keyInStore: 'fk_project__enabled',
                    groupByFn: (ɵ7$3)
                },
                {
                    keyInStore: 'fk_project',
                    groupByFn: (ɵ8$3)
                }
            ],
        },
        text_property: {
            indexBy: {
                keyInStore: 'fks',
                indexByFn: textPropertyByFksKey
            },
            groupBy: [
                {
                    keyInStore: 'fks_without_lang',
                    groupByFn: textPropertyByFksWithoutLang
                }
            ]
        },
        analysis: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ9$3)
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/sys.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sysRoot = 'sys';
    var ɵ0$4 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.pk_entity.toString();
    }, ɵ1$4 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.fk_class.toString(); }, ɵ2$4 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return d.required_by_sources.toString(); }, ɵ3$4 = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false'; }, ɵ4$4 = /**
     * @return {?}
     */
    function () { return 'main'; };
    /** @type {?} */
    var sysDefinitions = {
        system_relevant_class: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ0$4)
            },
            groupBy: [
                {
                    keyInStore: 'fk_class',
                    groupByFn: (ɵ1$4)
                },
                {
                    keyInStore: 'required_by_sources',
                    groupByFn: (ɵ2$4)
                },
                {
                    keyInStore: 'required',
                    groupByFn: (ɵ3$4)
                }
            ]
        },
        config: {
            indexBy: {
                keyInStore: 'main',
                indexByFn: (ɵ4$4)
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/tab.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var tabRoot = 'tab';
    var ɵ0$5 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_cell.toString(); }, ɵ1$5 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.fk_column + '_' + item.fk_row; };
    /** @type {?} */
    var tabDefinitions = {
        cell: {
            indexBy: {
                keyInStore: 'pk_cell',
                indexByFn: (ɵ0$5)
            },
            groupBy: [
                {
                    keyInStore: 'fk_column_fk_row',
                    groupByFn: (ɵ1$5)
                }
            ]
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/war.config.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var warRoot = 'war';
    var ɵ0$6 = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { return item.pk_entity.toString(); };
    /** @type {?} */
    var warDefinitions = {
        entity_preview: {
            indexBy: {
                keyInStore: 'pk_entity',
                indexByFn: (ɵ0$6)
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/reducer-configs/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/_helpers/schema-actions-factory.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LoadActionMeta() { }
    if (false) {
        /** @type {?} */
        LoadActionMeta.prototype.addPending;
        /** @type {?|undefined} */
        LoadActionMeta.prototype.pk;
    }
    /**
     * @record
     */
    function LoadVersionAction() { }
    if (false) {
        /** @type {?} */
        LoadVersionAction.prototype.pkEntity;
        /** @type {?} */
        LoadVersionAction.prototype.entityVersion;
    }
    ;
    /**
     * @record
     */
    function LoadByPkAndVersionActionMeta() { }
    if (false) {
        /** @type {?} */
        LoadByPkAndVersionActionMeta.prototype.addPending;
        /** @type {?|undefined} */
        LoadByPkAndVersionActionMeta.prototype.pk;
        /** @type {?} */
        LoadByPkAndVersionActionMeta.prototype.pkEntity;
        /** @type {?} */
        LoadByPkAndVersionActionMeta.prototype.version;
    }
    /**
     * @record
     * @template Model
     */
    function ModifyActionMeta() { }
    if (false) {
        /** @type {?} */
        ModifyActionMeta.prototype.items;
        /** @type {?} */
        ModifyActionMeta.prototype.addPending;
        /** @type {?|undefined} */
        ModifyActionMeta.prototype.pk;
    }
    /**
     * @record
     * @template Model
     */
    function SucceedActionMeta() { }
    if (false) {
        /** @type {?} */
        SucceedActionMeta.prototype.items;
        /** @type {?} */
        SucceedActionMeta.prototype.removePending;
        /** @type {?|undefined} */
        SucceedActionMeta.prototype.pk;
    }
    /**
     * @record
     */
    function FailActionMeta() { }
    if (false) {
        /** @type {?} */
        FailActionMeta.prototype.removePending;
        /** @type {?|undefined} */
        FailActionMeta.prototype.pk;
    }
    /**
     * @record
     */
    function PaginateByParam() { }
    /**
     * @record
     */
    function LoadPageMeta() { }
    if (false) {
        /** @type {?} */
        LoadPageMeta.prototype.paginateBy;
        /** @type {?} */
        LoadPageMeta.prototype.limit;
        /** @type {?} */
        LoadPageMeta.prototype.offset;
        /** @type {?|undefined} */
        LoadPageMeta.prototype.pk;
    }
    /**
     * @record
     */
    function LoadPageSucceededMeta() { }
    if (false) {
        /** @type {?} */
        LoadPageSucceededMeta.prototype.pks;
        /** @type {?} */
        LoadPageSucceededMeta.prototype.count;
        /** @type {?} */
        LoadPageSucceededMeta.prototype.paginateBy;
        /** @type {?} */
        LoadPageSucceededMeta.prototype.limit;
        /** @type {?} */
        LoadPageSucceededMeta.prototype.offset;
        /** @type {?|undefined} */
        LoadPageSucceededMeta.prototype.pk;
    }
    /**
     * @record
     * @template Model
     */
    function ActionResultObservable() { }
    if (false) {
        /** @type {?} */
        ActionResultObservable.prototype.pending$;
        /** @type {?} */
        ActionResultObservable.prototype.resolved$;
        /** @type {?} */
        ActionResultObservable.prototype.key;
    }
    /**
     * A: Schema Action Type (e.g. DfhAction)
     * M: Model for whitch the Actions are produced
     * @template Payload, Model
     */
    var /**
     * A: Schema Action Type (e.g. DfhAction)
     * M: Model for whitch the Actions are produced
     * @template Payload, Model
     */
    SchemaActionsFactory = /** @class */ (function () {
        function SchemaActionsFactory(ngRedux) {
            this.ngRedux = ngRedux;
        }
        /**
         * @param {?} actionPrefix
         * @param {?} modelName
         * @return {?}
         */
        SchemaActionsFactory.prototype.createCrudActions = /**
         * @param {?} actionPrefix
         * @param {?} modelName
         * @return {?}
         */
        function (actionPrefix, modelName) {
            var _this = this;
            this.actionPrefix = actionPrefix;
            this.modelName = modelName;
            this.load = (/**
             * @param {?=} suffix
             * @param {?=} pk
             * @return {?}
             */
            function (suffix, pk) {
                if (suffix === void 0) { suffix = ''; }
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
                    meta: { addPending: addPending, pk: pk },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]),
                    key: addPending
                };
            });
            this.loadSucceeded = (/**
             * @param {?} items
             * @param {?} removePending
             * @param {?=} pk
             * @return {?}
             */
            function (items, removePending, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_SUCCEEDED',
                    meta: { items: items, removePending: removePending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
            });
            /**
             * Call the Redux Action to upsert model instances.
             */
            this.upsert = (/**
             * @param {?} items
             * @param {?=} pk
             * @return {?}
             */
            function (items, pk) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::UPSERT',
                    meta: { items: items, addPending: addPending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]),
                    key: addPending
                };
            });
            this.upsertSucceeded = (/**
             * @param {?} items
             * @param {?} removePending
             * @param {?=} pk
             * @return {?}
             */
            function (items, removePending, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::UPSERT_SUCCEEDED',
                    meta: { items: items, removePending: removePending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
            });
            /**
             * this action is not model specific but pendingKey specific.
             * Reducer will add whole meta part to the resolved key
             */
            this.succeeded = (/**
             * @param {?} items
             * @param {?} removePending
             * @param {?=} pk
             * @return {?}
             */
            function (items, removePending, pk) {
                /** @type {?} */
                var action = ({
                    type: 'general::UPSERT_SUCCEEDED',
                    meta: { items: items, removePending: removePending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
            });
            /**
            * Call the Redux Action to delete model instances.
            */
            this.delete = (/**
             * @param {?} items
             * @param {?=} pk
             * @return {?}
             */
            function (items, pk) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::DELETE',
                    meta: { items: items, addPending: addPending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            this.deleteSucceeded = (/**
             * @param {?} items
             * @param {?} removePending
             * @param {?=} pk
             * @return {?}
             */
            function (items, removePending, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::DELETE_SUCCEEDED',
                    meta: { items: items, removePending: removePending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
            });
            this.failed = (/**
             * @param {?} error
             * @param {?} removePending
             * @param {?=} pk
             * @return {?}
             */
            function (error, removePending, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::FAILED',
                    meta: { removePending: removePending, pk: pk },
                    payload: null,
                    error: error,
                });
                _this.ngRedux.dispatch(action);
            });
            this.loadPage = (/**
             * @param {?} paginateBy
             * @param {?} limit
             * @param {?} offset
             * @param {?=} pk
             * @return {?}
             */
            function (paginateBy, limit, offset, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE',
                    meta: { paginateBy: paginateBy, limit: limit, offset: offset, pk: pk },
                    payload: null,
                });
                _this.ngRedux.dispatch(action);
            });
            this.loadPageSucceeded = (/**
             * @param {?} pks
             * @param {?} count
             * @param {?} paginateBy
             * @param {?} limit
             * @param {?} offset
             * @param {?=} pk
             * @return {?}
             */
            function (pks, count, paginateBy, limit, offset, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE_SUCCEEDED',
                    meta: { pks: pks, paginateBy: paginateBy, count: count, limit: limit, offset: offset, pk: pk },
                    payload: null,
                });
                _this.ngRedux.dispatch(action);
            });
            this.loadPageFailed = (/**
             * @param {?} paginateBy
             * @param {?} limit
             * @param {?} offset
             * @param {?=} pk
             * @return {?}
             */
            function (paginateBy, limit, offset, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE_FAILED',
                    meta: { paginateBy: paginateBy, limit: limit, offset: offset, pk: pk },
                    payload: null,
                });
                _this.ngRedux.dispatch(action);
            });
            return this;
        };
        return SchemaActionsFactory;
    }());
    if (false) {
        /** @type {?} */
        SchemaActionsFactory.prototype.load;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.loadSucceeded;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.upsert;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.upsertSucceeded;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.delete;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.deleteSucceeded;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.failed;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.loadPage;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        SchemaActionsFactory.prototype.loadPageSucceeded;
        /** @type {?} */
        SchemaActionsFactory.prototype.loadPageFailed;
        /**
         * this action is not model specific but pendingKey specific.
         * Reducer will add whole meta part to the resolved key.
         * @type {?}
         */
        SchemaActionsFactory.prototype.succeeded;
        /** @type {?} */
        SchemaActionsFactory.prototype.actionPrefix;
        /** @type {?} */
        SchemaActionsFactory.prototype.modelName;
        /** @type {?} */
        SchemaActionsFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function SchemaObjectLoadActionMeta() { }
    if (false) {
        /** @type {?} */
        SchemaObjectLoadActionMeta.prototype.removePending;
        /** @type {?|undefined} */
        SchemaObjectLoadActionMeta.prototype.pk;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/dat.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DigitalActionsFactory = /** @class */ (function (_super) {
        __extends(DigitalActionsFactory, _super);
        function DigitalActionsFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        DigitalActionsFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(datRoot, 'digital'));
            this.loadVersion = (/**
             * @param {?} pkEntity
             * @param {?=} entityVersion
             * @return {?}
             */
            function (pkEntity, entityVersion) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
                    meta: { addPending: addPending, pkEntity: pkEntity, entityVersion: entityVersion },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        DigitalActionsFactory.LOAD_VERSION = 'LOAD_VERSION';
        return DigitalActionsFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        DigitalActionsFactory.LOAD_VERSION;
        /**
         * Load a version. if entityVersion omitted, latest version is returned.
         * @type {?}
         */
        DigitalActionsFactory.prototype.loadVersion;
        /** @type {?} */
        DigitalActionsFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function LoadChunksOfDigitalAction() { }
    if (false) {
        /** @type {?} */
        LoadChunksOfDigitalAction.prototype.pkDigital;
    }
    var ChunkActionsFactory = /** @class */ (function (_super) {
        __extends(ChunkActionsFactory, _super);
        function ChunkActionsFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ChunkActionsFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(datRoot, 'chunk'));
            this.loadChunksOfDigital = (/**
             * @param {?} pkDigital
             * @param {?} pk
             * @return {?}
             */
            function (pkDigital, pk) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
                    meta: { addPending: addPending, pkDigital: pkDigital, pk: pk },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ChunkActionsFactory.CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';
        return ChunkActionsFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ChunkActionsFactory.CHUNKS_OF_DIGITAL;
        /**
         * Load a version. if entityVersion omitted, latest version is returned.
         * @type {?}
         */
        ChunkActionsFactory.prototype.loadChunksOfDigital;
        /** @type {?} */
        ChunkActionsFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function LoadColumnsOfTableAction() { }
    if (false) {
        /** @type {?} */
        LoadColumnsOfTableAction.prototype.pkDigital;
    }
    var ColumnActionsFactory = /** @class */ (function (_super) {
        __extends(ColumnActionsFactory, _super);
        function ColumnActionsFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ColumnActionsFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(datRoot, 'column'));
            this.loadColumnsOfTable = (/**
             * @param {?} pkDigital
             * @param {?} pk
             * @return {?}
             */
            function (pkDigital, pk) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
                    meta: { addPending: addPending, pkDigital: pkDigital, pk: pk },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ColumnActionsFactory.COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';
        return ColumnActionsFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ColumnActionsFactory.COLUMNS_OF_TABLE;
        /**
         * Load a version. if entityVersion omitted, latest version is returned.
         * @type {?}
         */
        ColumnActionsFactory.prototype.loadColumnsOfTable;
        /** @type {?} */
        ColumnActionsFactory.prototype.ngRedux;
    }
    var DatActions = /** @class */ (function () {
        function DatActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.digital = new DigitalActionsFactory(this.ngRedux).createActions();
            this.chunk = new ChunkActionsFactory(this.ngRedux).createActions();
            this.column = new ColumnActionsFactory(this.ngRedux).createActions();
            this.class_column_mapping = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping');
            this.namespace = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'namespace');
            this.text_property = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'text_property');
        }
        DatActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DatActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return DatActions;
    }());
    if (false) {
        /** @type {?} */
        DatActions.prototype.digital;
        /** @type {?} */
        DatActions.prototype.chunk;
        /** @type {?} */
        DatActions.prototype.column;
        /** @type {?} */
        DatActions.prototype.class_column_mapping;
        /** @type {?} */
        DatActions.prototype.namespace;
        /** @type {?} */
        DatActions.prototype.text_property;
        /** @type {?} */
        DatActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/dfh.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfhProfileActionFactory = /** @class */ (function (_super) {
        __extends(DfhProfileActionFactory, _super);
        function DfhProfileActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        DfhProfileActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(dfhRoot, 'profile'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhProfileActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        DfhProfileActionFactory.OF_PROJECT = 'OF_PROJECT';
        return DfhProfileActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        DfhProfileActionFactory.OF_PROJECT;
        /** @type {?} */
        DfhProfileActionFactory.prototype.loadOfProject;
        /** @type {?} */
        DfhProfileActionFactory.prototype.ngRedux;
    }
    var DfhClassActionFactory = /** @class */ (function (_super) {
        __extends(DfhClassActionFactory, _super);
        function DfhClassActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        DfhClassActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(dfhRoot, 'klass'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhClassActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        DfhClassActionFactory.OF_PROJECT = 'OF_PROJECT';
        return DfhClassActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        DfhClassActionFactory.OF_PROJECT;
        /** @type {?} */
        DfhClassActionFactory.prototype.loadOfProject;
        /** @type {?} */
        DfhClassActionFactory.prototype.ngRedux;
    }
    var DfhPropertyActionFactory = /** @class */ (function (_super) {
        __extends(DfhPropertyActionFactory, _super);
        function DfhPropertyActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        DfhPropertyActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(dfhRoot, 'property'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhPropertyActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        DfhPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
        return DfhPropertyActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        DfhPropertyActionFactory.OF_PROJECT;
        /** @type {?} */
        DfhPropertyActionFactory.prototype.loadOfProject;
        /** @type {?} */
        DfhPropertyActionFactory.prototype.ngRedux;
    }
    var DfhLabelActionFactory = /** @class */ (function (_super) {
        __extends(DfhLabelActionFactory, _super);
        function DfhLabelActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        DfhLabelActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(dfhRoot, 'label'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        DfhLabelActionFactory.OF_PROJECT = 'OF_PROJECT';
        return DfhLabelActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        DfhLabelActionFactory.OF_PROJECT;
        /** @type {?} */
        DfhLabelActionFactory.prototype.loadOfProject;
        /** @type {?} */
        DfhLabelActionFactory.prototype.ngRedux;
    }
    var DfhActions = /** @class */ (function () {
        function DfhActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.profile = new DfhProfileActionFactory(this.ngRedux).createActions();
            this.klass = new DfhClassActionFactory(this.ngRedux).createActions();
            this.property = new DfhPropertyActionFactory(this.ngRedux).createActions();
            this.label = new DfhLabelActionFactory(this.ngRedux).createActions();
        }
        DfhActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DfhActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return DfhActions;
    }());
    if (false) {
        /** @type {?} */
        DfhActions.prototype.profile;
        /** @type {?} */
        DfhActions.prototype.klass;
        /** @type {?} */
        DfhActions.prototype.property;
        /** @type {?} */
        DfhActions.prototype.label;
        /** @type {?} */
        DfhActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/_helpers/inf-action-factory.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template Payload, Model
     */
    var InfActionFactory = /** @class */ (function (_super) {
        __extends(InfActionFactory, _super);
        function InfActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @param {?} actionPrefix
         * @param {?} modelName
         * @return {?}
         */
        InfActionFactory.prototype.createInfActions = /**
         * @param {?} actionPrefix
         * @param {?} modelName
         * @return {?}
         */
        function (actionPrefix, modelName) {
            var _this = this;
            this.createCrudActions(actionPrefix, modelName);
            /**
             * Call the Redux Action to remove model instances from project.
             */
            this.remove = (/**
             * @param {?} items
             * @param {?=} pk
             * @return {?}
             */
            function (items, pk) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::REMOVE',
                    meta: { items: items, addPending: addPending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]),
                    key: addPending
                };
            });
            this.removeSucceeded = (/**
             * @param {?} items
             * @param {?} removePending
             * @param {?=} pk
             * @return {?}
             */
            function (items, removePending, pk) {
                /** @type {?} */
                var action = ({
                    type: _this.actionPrefix + '.' + _this.modelName + '::REMOVE_SUCCEEDED',
                    meta: { items: items, removePending: removePending, pk: pk },
                    payload: null
                });
                _this.ngRedux.dispatch(action);
            });
            return this;
        };
        InfActionFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        InfActionFactory.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return InfActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        InfActionFactory.prototype.remove;
        /**
         * \@param pk is used for facetting
         * @type {?}
         */
        InfActionFactory.prototype.removeSucceeded;
        /** @type {?} */
        InfActionFactory.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/inf.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LoadByPkMeta() { }
    if (false) {
        /** @type {?} */
        LoadByPkMeta.prototype.pkEntity;
    }
    ;
    /**
     * @record
     */
    function LoadTypeOfProjectAction() { }
    if (false) {
        /** @type {?} */
        LoadTypeOfProjectAction.prototype.pkEntity;
    }
    ;
    var InfPersistentItemActionFactory = /** @class */ (function (_super) {
        __extends(InfPersistentItemActionFactory, _super);
        // typeOfProject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;
        function InfPersistentItemActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        InfPersistentItemActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createInfActions(infRoot, 'persistent_item'));
            // this.loadNestedObject = (pkProject: number, pkEntity: number) => {
            //   const addPending = U.uuid();
            //   const action: FluxStandardAction<Payload, LoadByPkMeta> = {
            //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.NESTED_BY_PK,
            //     meta: { addPending, pk: pkProject, pkEntity },
            //     payload: null,
            //   };
            //   this.ngRedux.dispatch(action)
            //   return {
            //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
            //     resolved$: this.ngRedux.select<SucceedActionMeta<LoadNestetedPeItResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
            //     key: addPending
            //   };
            // }
            this.loadMinimal = (/**
             * @param {?} pkProject
             * @param {?} pkEntity
             * @return {?}
             */
            function (pkProject, pkEntity) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
                    meta: { addPending: addPending, pk: pkProject, pkEntity: pkEntity },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            this.typesOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
                    meta: { addPending: addPending, pk: pkProject },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            // this.typeOfProject = (pkProject: number, pkEntity: number) => {
            //   const addPending = U.uuid();
            //   const action: FluxStandardAction<Payload, LoadTypeOfProjectAction> = {
            //     type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPE_OF_PROJECT,
            //     meta: { addPending, pk: pkProject, pkEntity },
            //     payload: null,
            //   };
            //   this.ngRedux.dispatch(action)
            //   return {
            //     pending$: this.ngRedux.select<boolean>(['pending', addPending]),
            //     resolved$: this.ngRedux.select<SucceedActionMeta<LoadNestetedPeItResult>>(['resolved', addPending]).pipe(filter(x => !!x)),
            //     key: addPending
            //   };
            // }
            return this;
        };
        // Suffixes of load action types
        // static readonly NESTED_BY_PK = 'NESTED_BY_PK';
        InfPersistentItemActionFactory.MINIMAL_BY_PK = 'MINIMAL_BY_PK';
        InfPersistentItemActionFactory.TYPES_OF_PROJECT = 'TYPES_OF_PROJECT';
        InfPersistentItemActionFactory.TYPE_OF_PROJECT = 'TYPE_OF_PROJECT';
        return InfPersistentItemActionFactory;
    }(InfActionFactory));
    if (false) {
        /** @type {?} */
        InfPersistentItemActionFactory.MINIMAL_BY_PK;
        /** @type {?} */
        InfPersistentItemActionFactory.TYPES_OF_PROJECT;
        /** @type {?} */
        InfPersistentItemActionFactory.TYPE_OF_PROJECT;
        /** @type {?} */
        InfPersistentItemActionFactory.prototype.loadMinimal;
        /** @type {?} */
        InfPersistentItemActionFactory.prototype.loadNestedObject;
        /** @type {?} */
        InfPersistentItemActionFactory.prototype.typesOfProject;
        /** @type {?} */
        InfPersistentItemActionFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function PaginatedStatementList() { }
    if (false) {
        /** @type {?} */
        PaginatedStatementList.prototype.count;
        /** @type {?} */
        PaginatedStatementList.prototype.schemas;
        /** @type {?} */
        PaginatedStatementList.prototype.paginatedStatements;
    }
    /**
     * @record
     */
    function LoadPaginatedStatementListMeta() { }
    if (false) {
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.pkSourceEntity;
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.pkProperty;
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.fkTargetClass;
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.isOutgoing;
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.limit;
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.offset;
        /** @type {?} */
        LoadPaginatedStatementListMeta.prototype.alternatives;
    }
    var InfTemporalEntityActionFactory = /** @class */ (function (_super) {
        __extends(InfTemporalEntityActionFactory, _super);
        function InfTemporalEntityActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        InfTemporalEntityActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'));
            this.loadNestedObject = (/**
             * @param {?} pkProject
             * @param {?} pkEntity
             * @return {?}
             */
            function (pkProject, pkEntity) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
                    meta: { addPending: addPending, pk: pkProject, pkEntity: pkEntity },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            this.loadPaginatedList = (/**
             * @param {?} pkProject
             * @param {?} pkSourceEntity
             * @param {?} pkProperty
             * @param {?} fkTargetClass
             * @param {?} isOutgoing
             * @param {?} limit
             * @param {?} offset
             * @return {?}
             */
            function (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_LIST,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        pkSourceEntity: pkSourceEntity,
                        fkTargetClass: fkTargetClass,
                        pkProperty: pkProperty,
                        isOutgoing: isOutgoing,
                        limit: limit,
                        offset: offset,
                        alternatives: false
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            this.loadPaginatedAlternativeList = (/**
             * @param {?} pkProject
             * @param {?} pkSourceEntity
             * @param {?} pkProperty
             * @param {?} fkTargetClass
             * @param {?} isOutgoing
             * @param {?} limit
             * @param {?} offset
             * @return {?}
             */
            function (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        pkSourceEntity: pkSourceEntity,
                        pkProperty: pkProperty,
                        fkTargetClass: fkTargetClass,
                        isOutgoing: isOutgoing,
                        limit: limit,
                        offset: offset,
                        alternatives: true
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        InfTemporalEntityActionFactory.OWN_PROPERTIES = 'OWN_PROPERTIES';
        InfTemporalEntityActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
        InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';
        return InfTemporalEntityActionFactory;
    }(InfActionFactory));
    if (false) {
        /** @type {?} */
        InfTemporalEntityActionFactory.OWN_PROPERTIES;
        /** @type {?} */
        InfTemporalEntityActionFactory.PAGINATED_LIST;
        /** @type {?} */
        InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST;
        /** @type {?} */
        InfTemporalEntityActionFactory.prototype.loadNestedObject;
        /** @type {?} */
        InfTemporalEntityActionFactory.prototype.loadPaginatedList;
        /** @type {?} */
        InfTemporalEntityActionFactory.prototype.loadPaginatedAlternativeList;
        /** @type {?} */
        InfTemporalEntityActionFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function FindStatementByParams() { }
    if (false) {
        /** @type {?} */
        FindStatementByParams.prototype.ofProject;
        /** @type {?} */
        FindStatementByParams.prototype.pkEntity;
        /** @type {?} */
        FindStatementByParams.prototype.pkInfoRange;
        /** @type {?} */
        FindStatementByParams.prototype.pkInfoDomain;
        /** @type {?} */
        FindStatementByParams.prototype.pkProperty;
    }
    /**
     * @record
     */
    function ContentTreeMeta() { }
    if (false) {
        /** @type {?} */
        ContentTreeMeta.prototype.pkExpressionEntity;
    }
    /**
     * @record
     */
    function SourcesAndDigitalsOfEntity() { }
    if (false) {
        /** @type {?} */
        SourcesAndDigitalsOfEntity.prototype.ofProject;
        /** @type {?} */
        SourcesAndDigitalsOfEntity.prototype.pkEntity;
    }
    /**
     * @record
     */
    function SourcesAndDigitalsOfEntityResult() { }
    if (false) {
        /** @type {?} */
        SourcesAndDigitalsOfEntityResult.prototype.statements;
        /** @type {?} */
        SourcesAndDigitalsOfEntityResult.prototype.digitals;
    }
    /**
     * @record
     */
    function LoadOutgoingAlternativeStatements() { }
    if (false) {
        /** @type {?} */
        LoadOutgoingAlternativeStatements.prototype.pkTemporalEntity;
        /** @type {?} */
        LoadOutgoingAlternativeStatements.prototype.pkProperty;
    }
    ;
    /**
     * @record
     */
    function LoadIngoingAlternativeStatements() { }
    if (false) {
        /** @type {?} */
        LoadIngoingAlternativeStatements.prototype.pkEntity;
        /** @type {?} */
        LoadIngoingAlternativeStatements.prototype.pkProperty;
    }
    ;
    /**
     * @record
     */
    function AddToProjectWithTeEntActionMeta() { }
    if (false) {
        /** @type {?} */
        AddToProjectWithTeEntActionMeta.prototype.pkStatements;
        /** @type {?} */
        AddToProjectWithTeEntActionMeta.prototype.pk;
        /** @type {?} */
        AddToProjectWithTeEntActionMeta.prototype.addPending;
    }
    ;
    var InfStatementActionFactory = /** @class */ (function (_super) {
        __extends(InfStatementActionFactory, _super);
        function InfStatementActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        InfStatementActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createInfActions(infRoot, 'statement'));
            this.findByParams = (/**
             * @param {?} ofProject
             * @param {?} pkProject
             * @param {?} pkEntity
             * @param {?} pkInfoRange
             * @param {?} pkInfoDomain
             * @param {?} pkProperty
             * @return {?}
             */
            function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty) {
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.BY_PARAMS,
                    meta: {
                        addPending: libUtils.U.uuid(),
                        pk: pkProject,
                        ofProject: ofProject,
                        pkEntity: pkEntity,
                        pkInfoRange: pkInfoRange,
                        pkInfoDomain: pkInfoDomain,
                        pkProperty: pkProperty,
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
            });
            this.loadIngoingAlternatives = (/**
             * @param {?} pkEntity
             * @param {?} pkProperty
             * @param {?} pkProject
             * @return {?}
             */
            function (pkEntity, pkProperty, pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.ALTERNATIVES_INGOING,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        pkEntity: pkEntity,
                        pkProperty: pkProperty,
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            this.loadPaginatedList = (/**
             * @param {?} pkProject
             * @param {?} pkSourceEntity
             * @param {?} pkProperty
             * @param {?} fkTargetClass
             * @param {?} isOutgoing
             * @param {?} limit
             * @param {?} offset
             * @return {?}
             */
            function (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.PAGINATED_LIST,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        pkSourceEntity: pkSourceEntity,
                        fkTargetClass: fkTargetClass,
                        pkProperty: pkProperty,
                        isOutgoing: isOutgoing,
                        limit: limit,
                        offset: offset,
                        alternatives: false
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            /**
            * Get an nested object with everything needed to display the
            * links made from an entity towards sources and digitals.
            */
            this.sourcesAndDigitalsOfEntity = (/**
             * @param {?} ofProject
             * @param {?} pkProject
             * @param {?} pkEntity
             * @return {?}
             */
            function (ofProject, pkProject, pkEntity) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
                    meta: {
                        addPending: addPending,
                        ofProject: ofProject,
                        pk: pkProject,
                        pkEntity: pkEntity
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        // static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
        InfStatementActionFactory.ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';
        // static readonly ADD_TO_PROJECT_WITH_TE_EN = 'ADD_TO_PROJECT_WITH_TE_EN';
        InfStatementActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
        InfStatementActionFactory.CONTENT_TREE = 'CONTENT_TREE';
        InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
        InfStatementActionFactory.BY_PARAMS = 'BY_PARAMS';
        return InfStatementActionFactory;
    }(InfActionFactory));
    if (false) {
        /** @type {?} */
        InfStatementActionFactory.ALTERNATIVES_INGOING;
        /** @type {?} */
        InfStatementActionFactory.PAGINATED_LIST;
        /** @type {?} */
        InfStatementActionFactory.CONTENT_TREE;
        /** @type {?} */
        InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY;
        /** @type {?} */
        InfStatementActionFactory.BY_PARAMS;
        /** @type {?} */
        InfStatementActionFactory.prototype.loadIngoingAlternatives;
        /** @type {?} */
        InfStatementActionFactory.prototype.loadPaginatedList;
        /** @type {?} */
        InfStatementActionFactory.prototype.sourcesAndDigitalsOfEntity;
        /** @type {?} */
        InfStatementActionFactory.prototype.findByParams;
        /** @type {?} */
        InfStatementActionFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function LoadAlternativeTextProperties() { }
    if (false) {
        /** @type {?} */
        LoadAlternativeTextProperties.prototype.fkEntity;
        /** @type {?} */
        LoadAlternativeTextProperties.prototype.fkClassField;
    }
    ;
    var InfTextPropertyActionFactory = /** @class */ (function (_super) {
        __extends(InfTextPropertyActionFactory, _super);
        function InfTextPropertyActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        InfTextPropertyActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createInfActions(infRoot, 'text_property'));
            this.loadAlternatives = (/**
             * @param {?} fkEntity
             * @param {?} fkClassField
             * @param {?} pkProject
             * @return {?}
             */
            function (fkEntity, fkClassField, pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTextPropertyActionFactory.ALTERNATIVES,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        fkEntity: fkEntity,
                        fkClassField: fkClassField,
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        InfTextPropertyActionFactory.ALTERNATIVES = 'ALTERNATIVES';
        return InfTextPropertyActionFactory;
    }(InfActionFactory));
    if (false) {
        /** @type {?} */
        InfTextPropertyActionFactory.ALTERNATIVES;
        /** @type {?} */
        InfTextPropertyActionFactory.prototype.loadAlternatives;
        /** @type {?} */
        InfTextPropertyActionFactory.prototype.ngRedux;
    }
    var InfActions = /** @class */ (function () {
        function InfActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.persistent_item = new InfPersistentItemActionFactory(this.ngRedux).createActions();
            this.temporal_entity = new InfTemporalEntityActionFactory(this.ngRedux).createActions();
            this.statement = new InfStatementActionFactory(this.ngRedux).createActions();
            // TODO: pimp those up to real Inf Actions!
            this.language = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'language');
            this.appellation = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'appellation');
            this.lang_string = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'lang_string');
            this.dimension = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'dimension');
            this.place = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'place');
            this.time_primitive = new SchemaActionsFactory(this.ngRedux).createCrudActions(infRoot, 'time_primitive');
            this.text_property = new InfTextPropertyActionFactory(this.ngRedux).createActions();
        }
        InfActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        InfActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return InfActions;
    }());
    if (false) {
        /** @type {?} */
        InfActions.prototype.persistent_item;
        /** @type {?} */
        InfActions.prototype.temporal_entity;
        /** @type {?} */
        InfActions.prototype.statement;
        /** @type {?} */
        InfActions.prototype.language;
        /** @type {?} */
        InfActions.prototype.appellation;
        /** @type {?} */
        InfActions.prototype.lang_string;
        /** @type {?} */
        InfActions.prototype.dimension;
        /** @type {?} */
        InfActions.prototype.place;
        /** @type {?} */
        InfActions.prototype.time_primitive;
        /** @type {?} */
        InfActions.prototype.text_property;
        /** @type {?} */
        InfActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/pro.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProProjectActionFactory = /** @class */ (function (_super) {
        __extends(ProProjectActionFactory, _super);
        function ProProjectActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProProjectActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'project'));
            this.loadOfAccount = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProProjectActionFactory.OF_ACCOUNT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            this.loadBasics = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProProjectActionFactory.LOAD_BASICS,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProProjectActionFactory.OF_ACCOUNT = 'OF_ACCOUNT';
        ProProjectActionFactory.LOAD_BASICS = 'LOAD_BASICS';
        return ProProjectActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProProjectActionFactory.OF_ACCOUNT;
        /** @type {?} */
        ProProjectActionFactory.LOAD_BASICS;
        /** @type {?} */
        ProProjectActionFactory.prototype.loadOfAccount;
        /**
         * loads the ProProject and the default InfLanguage
         * @type {?}
         */
        ProProjectActionFactory.prototype.loadBasics;
        /** @type {?} */
        ProProjectActionFactory.prototype.ngRedux;
    }
    /**
     * @record
     */
    function MarkStatementAsFavoriteActionMeta() { }
    if (false) {
        /** @type {?} */
        MarkStatementAsFavoriteActionMeta.prototype.addPending;
        /** @type {?} */
        MarkStatementAsFavoriteActionMeta.prototype.pk;
        /** @type {?} */
        MarkStatementAsFavoriteActionMeta.prototype.pkStatement;
        /** @type {?} */
        MarkStatementAsFavoriteActionMeta.prototype.isOutgoing;
    }
    var ProInfoProjRelActionFactory = /** @class */ (function (_super) {
        __extends(ProInfoProjRelActionFactory, _super);
        function ProInfoProjRelActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProInfoProjRelActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'info_proj_rel'));
            this.markStatementAsFavorite = (/**
             * @param {?} pkProject
             * @param {?} pkStatement
             * @param {?} isOutgoing
             * @return {?}
             */
            function (pkProject, pkStatement, isOutgoing) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        pkStatement: pkStatement,
                        isOutgoing: isOutgoing
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE = 'MARK_ROLE_AS_FAVORITE';
        return ProInfoProjRelActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE;
        /** @type {?} */
        ProInfoProjRelActionFactory.prototype.markStatementAsFavorite;
        /** @type {?} */
        ProInfoProjRelActionFactory.prototype.ngRedux;
    }
    var ProDfhClassProjRelActionFactory = /** @class */ (function (_super) {
        __extends(ProDfhClassProjRelActionFactory, _super);
        function ProDfhClassProjRelActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProDfhClassProjRelActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'dfh_class_proj_rel'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProDfhClassProjRelActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProDfhClassProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
        return ProDfhClassProjRelActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProDfhClassProjRelActionFactory.OF_PROJECT;
        /** @type {?} */
        ProDfhClassProjRelActionFactory.prototype.loadOfProject;
        /** @type {?} */
        ProDfhClassProjRelActionFactory.prototype.ngRedux;
    }
    var ProDfhProfileProjRelActionFactory = /** @class */ (function (_super) {
        __extends(ProDfhProfileProjRelActionFactory, _super);
        function ProDfhProfileProjRelActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProDfhProfileProjRelActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'dfh_profile_proj_rel'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProDfhProfileProjRelActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProDfhProfileProjRelActionFactory.OF_PROJECT = 'OF_PROJECT';
        return ProDfhProfileProjRelActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProDfhProfileProjRelActionFactory.OF_PROJECT;
        /** @type {?} */
        ProDfhProfileProjRelActionFactory.prototype.loadOfProject;
        /** @type {?} */
        ProDfhProfileProjRelActionFactory.prototype.ngRedux;
    }
    var ProClassFieldConfigActionFactory = /** @class */ (function (_super) {
        __extends(ProClassFieldConfigActionFactory, _super);
        function ProClassFieldConfigActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProClassFieldConfigActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'class_field_config'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProClassFieldConfigActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProClassFieldConfigActionFactory.OF_PROJECT = 'OF_PROJECT';
        return ProClassFieldConfigActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProClassFieldConfigActionFactory.OF_PROJECT;
        /** @type {?} */
        ProClassFieldConfigActionFactory.prototype.loadOfProject;
        /** @type {?} */
        ProClassFieldConfigActionFactory.prototype.ngRedux;
    }
    var ProTextPropertyActionFactory = /** @class */ (function (_super) {
        __extends(ProTextPropertyActionFactory, _super);
        function ProTextPropertyActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProTextPropertyActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'text_property'));
            this.loadOfProject = (/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProTextPropertyActionFactory.OF_PROJECT,
                    meta: {
                        addPending: addPending,
                        pk: pkProject
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProTextPropertyActionFactory.OF_PROJECT = 'OF_PROJECT';
        return ProTextPropertyActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProTextPropertyActionFactory.OF_PROJECT;
        /** @type {?} */
        ProTextPropertyActionFactory.prototype.loadOfProject;
        /** @type {?} */
        ProTextPropertyActionFactory.prototype.ngRedux;
    }
    var ProAnalysisActionFactory = /** @class */ (function (_super) {
        __extends(ProAnalysisActionFactory, _super);
        function ProAnalysisActionFactory(ngRedux) {
            var _this = _super.call(this, ngRedux) || this;
            _this.ngRedux = ngRedux;
            return _this;
        }
        /**
         * @return {?}
         */
        ProAnalysisActionFactory.prototype.createActions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Object.assign(this, this.createCrudActions(proRoot, 'analysis'));
            this.loadByIdAndVersion = (/**
             * @param {?} pkProject
             * @param {?} pkEntity
             * @param {?} version
             * @return {?}
             */
            function (pkProject, pkEntity, version) {
                /** @type {?} */
                var addPending = libUtils.U.uuid();
                /** @type {?} */
                var action = {
                    type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ProAnalysisActionFactory.BY_PK_AND_VERSION,
                    meta: {
                        addPending: addPending,
                        pk: pkProject,
                        pkEntity: pkEntity,
                        version: version
                    },
                    payload: null,
                };
                _this.ngRedux.dispatch(action);
                return {
                    pending$: _this.ngRedux.select(['pending', addPending]),
                    resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(operators.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))),
                    key: addPending
                };
            });
            return this;
        };
        // Suffixes of load action types
        ProAnalysisActionFactory.BY_PK_AND_VERSION = 'BY_PK_AND_VERSION';
        return ProAnalysisActionFactory;
    }(SchemaActionsFactory));
    if (false) {
        /** @type {?} */
        ProAnalysisActionFactory.BY_PK_AND_VERSION;
        /** @type {?} */
        ProAnalysisActionFactory.prototype.loadByIdAndVersion;
        /** @type {?} */
        ProAnalysisActionFactory.prototype.ngRedux;
    }
    var ProActions = /** @class */ (function () {
        function ProActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.project = new ProProjectActionFactory(this.ngRedux).createActions();
            this.info_proj_rel = new ProInfoProjRelActionFactory(this.ngRedux).createActions();
            this.text_property = new ProTextPropertyActionFactory(this.ngRedux).createActions();
            this.dfh_class_proj_rel = new ProDfhClassProjRelActionFactory(this.ngRedux).createActions();
            this.dfh_profile_proj_rel = new ProDfhProfileProjRelActionFactory(this.ngRedux).createActions();
            this.class_field_config = new ProClassFieldConfigActionFactory(this.ngRedux).createActions();
            this.analysis = new ProAnalysisActionFactory(this.ngRedux).createActions();
        }
        ProActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ProActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return ProActions;
    }());
    if (false) {
        /** @type {?} */
        ProActions.prototype.project;
        /** @type {?} */
        ProActions.prototype.info_proj_rel;
        /** @type {?} */
        ProActions.prototype.text_property;
        /** @type {?} */
        ProActions.prototype.dfh_class_proj_rel;
        /** @type {?} */
        ProActions.prototype.dfh_profile_proj_rel;
        /** @type {?} */
        ProActions.prototype.class_field_config;
        /** @type {?} */
        ProActions.prototype.analysis;
        /** @type {?} */
        ProActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/sys.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MetaData() { }
    if (false) {
        /** @type {?|undefined} */
        MetaData.prototype.systemRelevantClasses;
    }
    ;
    var SysActions = /** @class */ (function () {
        function SysActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.system_relevant_class = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');
            // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
            //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');
            this.config = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'config');
        }
        SysActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SysActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return SysActions;
    }());
    if (false) {
        /** @type {?} */
        SysActions.prototype.system_relevant_class;
        /** @type {?} */
        SysActions.prototype.config;
        /** @type {?} */
        SysActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/tab.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TabActions = /** @class */ (function () {
        function TabActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.cell = new SchemaActionsFactory(this.ngRedux).createCrudActions(tabRoot, 'cell');
        }
        TabActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TabActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return TabActions;
    }());
    if (false) {
        /** @type {?} */
        TabActions.prototype.cell;
        /** @type {?} */
        TabActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/war.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WarActions = /** @class */ (function () {
        function WarActions(ngRedux) {
            this.ngRedux = ngRedux;
            this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
        }
        WarActions.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        WarActions.ctorParameters = function () { return [
            { type: store.NgRedux }
        ]; };
        return WarActions;
    }());
    if (false) {
        /** @type {?} */
        WarActions.prototype.entity_preview;
        /** @type {?} */
        WarActions.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/actions/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/dat.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DigitalSlice = /** @class */ (function () {
        function DigitalSlice() {
        }
        return DigitalSlice;
    }());
    if (false) {
        /** @type {?} */
        DigitalSlice.prototype.by_pk_entity__entity_version;
        /** @type {?} */
        DigitalSlice.prototype.by_pk_entity;
        /** @type {?} */
        DigitalSlice.prototype.by_pk_text;
        /** @type {?} */
        DigitalSlice.prototype.loading;
    }
    var ChunkSlice = /** @class */ (function () {
        function ChunkSlice() {
        }
        return ChunkSlice;
    }());
    if (false) {
        /** @type {?} */
        ChunkSlice.prototype.by_pk_entity;
        /** @type {?} */
        ChunkSlice.prototype.by_fk_text;
        /** @type {?} */
        ChunkSlice.prototype.loading;
    }
    var ColumnSlice = /** @class */ (function () {
        function ColumnSlice() {
        }
        return ColumnSlice;
    }());
    if (false) {
        /** @type {?} */
        ColumnSlice.prototype.by_pk_entity;
        /** @type {?} */
        ColumnSlice.prototype.by_fk_digital;
    }
    var ClassColumnMappingSlice = /** @class */ (function () {
        function ClassColumnMappingSlice() {
        }
        return ClassColumnMappingSlice;
    }());
    if (false) {
        /** @type {?} */
        ClassColumnMappingSlice.prototype.by_pk_entity;
        /** @type {?} */
        ClassColumnMappingSlice.prototype.by_fk_column;
    }
    var TextPropertySlice = /** @class */ (function () {
        function TextPropertySlice() {
        }
        return TextPropertySlice;
    }());
    if (false) {
        /** @type {?} */
        TextPropertySlice.prototype.by_pk_entity;
        /** @type {?} */
        TextPropertySlice.prototype.by_fk_digital;
    }
    var NamespaceSlice = /** @class */ (function () {
        function NamespaceSlice() {
        }
        return NamespaceSlice;
    }());
    if (false) {
        /** @type {?} */
        NamespaceSlice.prototype.by_pk_entity;
        /** @type {?} */
        NamespaceSlice.prototype.by_fk_project;
        /** @type {?} */
        NamespaceSlice.prototype.loading;
    }
    /**
     * @record
     */
    function Dat() { }
    if (false) {
        /** @type {?|undefined} */
        Dat.prototype.digital;
        /** @type {?|undefined} */
        Dat.prototype.chunk;
        /** @type {?|undefined} */
        Dat.prototype.column;
        /** @type {?|undefined} */
        Dat.prototype.text_property;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/dfh.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DfhProfileSlice = /** @class */ (function () {
        function DfhProfileSlice() {
        }
        return DfhProfileSlice;
    }());
    if (false) {
        /** @type {?} */
        DfhProfileSlice.prototype.by_pk_profile;
        /** @type {?} */
        DfhProfileSlice.prototype.loading;
    }
    var DfhClassSlice = /** @class */ (function () {
        function DfhClassSlice() {
        }
        return DfhClassSlice;
    }());
    if (false) {
        /** @type {?} */
        DfhClassSlice.prototype.by_pk_class;
        /** @type {?} */
        DfhClassSlice.prototype.by_basic_type;
        /** @type {?} */
        DfhClassSlice.prototype.loading;
    }
    var DfhPropertySlice = /** @class */ (function () {
        function DfhPropertySlice() {
        }
        return DfhPropertySlice;
    }());
    if (false) {
        /** @type {?} */
        DfhPropertySlice.prototype.by_pk_property;
        /** @type {?} */
        DfhPropertySlice.prototype.by_has_domain__fk_property;
        /** @type {?} */
        DfhPropertySlice.prototype.by_has_range__fk_property;
        /** @type {?} */
        DfhPropertySlice.prototype.by_has_domain;
        /** @type {?} */
        DfhPropertySlice.prototype.by_has_range;
        /** @type {?} */
        DfhPropertySlice.prototype.by_pk_property__has_domain__has_range;
        /** @type {?} */
        DfhPropertySlice.prototype.by_is_has_type_subproperty;
        /** @type {?} */
        DfhPropertySlice.prototype.loading;
    }
    var DfhLabelSlice = /** @class */ (function () {
        function DfhLabelSlice() {
        }
        return DfhLabelSlice;
    }());
    if (false) {
        /** @type {?} */
        DfhLabelSlice.prototype.by_fks;
        /** @type {?} */
        DfhLabelSlice.prototype.by_fk_class__type;
        /** @type {?} */
        DfhLabelSlice.prototype.by_fk_property__type;
        /** @type {?} */
        DfhLabelSlice.prototype.by_fk_profile__type;
        /** @type {?} */
        DfhLabelSlice.prototype.loading;
    }
    /**
     * @record
     */
    function Dfh() { }
    if (false) {
        /** @type {?|undefined} */
        Dfh.prototype.profile;
        /** @type {?|undefined} */
        Dfh.prototype.klass;
        /** @type {?|undefined} */
        Dfh.prototype.property;
        /** @type {?|undefined} */
        Dfh.prototype.label;
        /** @type {?} */
        Dfh.prototype.pkEntityModelMap;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/inf.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PaginationInfo() { }
    if (false) {
        /** @type {?} */
        PaginationInfo.prototype.loading;
        /** @type {?} */
        PaginationInfo.prototype.count;
        /** @type {?} */
        PaginationInfo.prototype.rows;
    }
    var InfPersistentItemSlice = /** @class */ (function () {
        function InfPersistentItemSlice() {
        }
        return InfPersistentItemSlice;
    }());
    if (false) {
        /** @type {?} */
        InfPersistentItemSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfPersistentItemSlice.prototype.by_fk_class;
        /** @type {?} */
        InfPersistentItemSlice.prototype.loading;
    }
    var InfTemporalEntitySlice = /** @class */ (function () {
        function InfTemporalEntitySlice() {
        }
        return InfTemporalEntitySlice;
    }());
    if (false) {
        /** @type {?} */
        InfTemporalEntitySlice.prototype.by_pk_entity;
        /** @type {?} */
        InfTemporalEntitySlice.prototype.by_fk_class;
        /** @type {?} */
        InfTemporalEntitySlice.prototype.loading;
    }
    var InfStatementSlice = /** @class */ (function () {
        function InfStatementSlice() {
        }
        return InfStatementSlice;
    }());
    if (false) {
        /** @type {?} */
        InfStatementSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfStatementSlice.prototype.by_subject;
        /** @type {?} */
        InfStatementSlice.prototype.by_object;
        /* Skipping unnamed member:
        'by_subject+property'?: ByPk<ByPk<InfStatement>>;*/
        /* Skipping unnamed member:
        'by_object+property'?: ByPk<ByPk<InfStatement>>;*/
        /** @type {?} */
        InfStatementSlice.prototype.by_fk_subject_data;
        /** @type {?} */
        InfStatementSlice.prototype.pag_by_fk_property__fk_target_class__fk_object_info__ofProject;
        /** @type {?} */
        InfStatementSlice.prototype.pag_by_fk_property__fk_target_class__fk_subject_info__ofProject;
        /** @type {?} */
        InfStatementSlice.prototype.loading;
    }
    var InfPlaceSlice = /** @class */ (function () {
        function InfPlaceSlice() {
        }
        return InfPlaceSlice;
    }());
    if (false) {
        /** @type {?} */
        InfPlaceSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfPlaceSlice.prototype.loading;
    }
    var InfTimePrimitiveSlice = /** @class */ (function () {
        function InfTimePrimitiveSlice() {
        }
        return InfTimePrimitiveSlice;
    }());
    if (false) {
        /** @type {?} */
        InfTimePrimitiveSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfTimePrimitiveSlice.prototype.loading;
    }
    var InfLanguageSlice = /** @class */ (function () {
        function InfLanguageSlice() {
        }
        return InfLanguageSlice;
    }());
    if (false) {
        /** @type {?} */
        InfLanguageSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfLanguageSlice.prototype.loading;
    }
    var InfAppellationSlice = /** @class */ (function () {
        function InfAppellationSlice() {
        }
        return InfAppellationSlice;
    }());
    if (false) {
        /** @type {?} */
        InfAppellationSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfAppellationSlice.prototype.loading;
    }
    var InfLangStringSlice = /** @class */ (function () {
        function InfLangStringSlice() {
        }
        return InfLangStringSlice;
    }());
    if (false) {
        /** @type {?} */
        InfLangStringSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfLangStringSlice.prototype.loading;
    }
    var InfDimensionSlice = /** @class */ (function () {
        function InfDimensionSlice() {
        }
        return InfDimensionSlice;
    }());
    if (false) {
        /** @type {?} */
        InfDimensionSlice.prototype.by_pk_entity;
        /** @type {?} */
        InfDimensionSlice.prototype.loading;
    }
    var InfTextPropertySlice = /** @class */ (function () {
        function InfTextPropertySlice() {
        }
        return InfTextPropertySlice;
    }());
    if (false) {
        /** @type {?} */
        InfTextPropertySlice.prototype.by_pk_entity;
        /** @type {?} */
        InfTextPropertySlice.prototype.by_fk_concerned_entity__fk_class_field;
        /** @type {?} */
        InfTextPropertySlice.prototype.by_fk_concerned_entity;
        /** @type {?} */
        InfTextPropertySlice.prototype.loading;
    }
    /**
     * @record
     */
    function Inf() { }
    if (false) {
        /** @type {?|undefined} */
        Inf.prototype.persistent_item;
        /** @type {?|undefined} */
        Inf.prototype.temporal_entity;
        /** @type {?|undefined} */
        Inf.prototype.statement;
        /** @type {?|undefined} */
        Inf.prototype.place;
        /** @type {?|undefined} */
        Inf.prototype.time_primitive;
        /** @type {?|undefined} */
        Inf.prototype.language;
        /** @type {?|undefined} */
        Inf.prototype.appellation;
        /** @type {?|undefined} */
        Inf.prototype.lang_string;
        /** @type {?|undefined} */
        Inf.prototype.dimension;
        /** @type {?|undefined} */
        Inf.prototype.text_property;
        /** @type {?|undefined} */
        Inf.prototype.pkEntityModelMap;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/pro.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ProProjectSlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProProjectSlice.prototype.by_pk_entity;
    }
    /**
     * @record
     */
    function ProInfoProjRelSlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProInfoProjRelSlice.prototype.by_fk_project__fk_entity;
        /** @type {?|undefined} */
        ProInfoProjRelSlice.prototype.loading;
    }
    /**
     * @record
     */
    function ProDfhClassProjRelSlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProDfhClassProjRelSlice.prototype.by_fk_project__fk_class;
        /** @type {?|undefined} */
        ProDfhClassProjRelSlice.prototype.by_fk_project__enabled_in_entities;
        /** @type {?|undefined} */
        ProDfhClassProjRelSlice.prototype.loading;
    }
    /**
     * @record
     */
    function ProDfhProfileProjRelSlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProDfhProfileProjRelSlice.prototype.by_fk_project__fk_profile;
        /** @type {?|undefined} */
        ProDfhProfileProjRelSlice.prototype.by_fk_project__enabled;
        /** @type {?|undefined} */
        ProDfhProfileProjRelSlice.prototype.loading;
    }
    /**
     * @record
     */
    function ProClassFieldConfigSlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProClassFieldConfigSlice.prototype.by_fk_project__fk_class;
        /** @type {?|undefined} */
        ProClassFieldConfigSlice.prototype.loading;
    }
    /**
     * @record
     */
    function ProTextPropertySlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProTextPropertySlice.prototype.by_pk_entity;
        /** @type {?|undefined} */
        ProTextPropertySlice.prototype.by_fk_project__fk_property__fk_domain_class__fk_range_class;
        /** @type {?|undefined} */
        ProTextPropertySlice.prototype.loading;
    }
    /**
     * @record
     */
    function ProAnalysisSlice() { }
    if (false) {
        /** @type {?|undefined} */
        ProAnalysisSlice.prototype.by_pk_entity;
    }
    /**
     * @record
     */
    function Pro() { }
    if (false) {
        /** @type {?|undefined} */
        Pro.prototype.info_proj_rel;
        /** @type {?|undefined} */
        Pro.prototype.dfh_profile_proj_rel;
        /** @type {?|undefined} */
        Pro.prototype.dfh_class_proj_rel;
        /** @type {?|undefined} */
        Pro.prototype.class_field_config;
        /** @type {?|undefined} */
        Pro.prototype.text_property;
        /** @type {?|undefined} */
        Pro.prototype.analysis;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/sys.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function SysRelevantClassSlice() { }
    if (false) {
        /** @type {?|undefined} */
        SysRelevantClassSlice.prototype.by_pk_entity;
        /** @type {?|undefined} */
        SysRelevantClassSlice.prototype.by_fk_class;
        /** @type {?|undefined} */
        SysRelevantClassSlice.prototype.by_required_by_sources;
        /** @type {?|undefined} */
        SysRelevantClassSlice.prototype.by_required;
        /** @type {?|undefined} */
        SysRelevantClassSlice.prototype.loading;
    }
    /**
     * @record
     */
    function SysConfigSlice() { }
    if (false) {
        /** @type {?|undefined} */
        SysConfigSlice.prototype.by_main;
        /** @type {?|undefined} */
        SysConfigSlice.prototype.loading;
    }
    /**
     * @record
     */
    function Sys() { }
    if (false) {
        /** @type {?|undefined} */
        Sys.prototype.system_relevant_class;
        /** @type {?|undefined} */
        Sys.prototype.config;
        /** @type {?} */
        Sys.prototype.pkEntityModelMap;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/tab.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TabCellSlice = /** @class */ (function () {
        function TabCellSlice() {
        }
        return TabCellSlice;
    }());
    if (false) {
        /** @type {?} */
        TabCellSlice.prototype.by_pk_cell;
        /** @type {?} */
        TabCellSlice.prototype.by_fk_column_fk_row;
    }
    /**
     * @record
     */
    function Tab() { }
    if (false) {
        /** @type {?|undefined} */
        Tab.prototype.cell;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/war.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function WarEntityPreviewSlice() { }
    if (false) {
        /** @type {?|undefined} */
        WarEntityPreviewSlice.prototype.by_pk_entity;
    }
    /**
     * @record
     */
    function War() { }
    if (false) {
        /** @type {?|undefined} */
        War.prototype.entity_preview;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/models/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-schema/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/account.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AccountActionMeta() { }
    if (false) {
        /** @type {?|undefined} */
        AccountActionMeta.prototype.accountId;
        /** @type {?|undefined} */
        AccountActionMeta.prototype.accountRoles;
        /** @type {?|undefined} */
        AccountActionMeta.prototype.account;
    }
    ;
    var AccountActions = /** @class */ (function () {
        function AccountActions() {
        }
        /**
         * @return {?}
         */
        AccountActions.prototype.login = /**
         * @return {?}
         */
        function () {
            return {
                type: AccountActions.LOGIN,
                payload: null,
                meta: null
            };
        };
        /**
         * @param {?} account
         * @return {?}
         */
        AccountActions.prototype.loginSucceeded = /**
         * @param {?} account
         * @return {?}
         */
        function (account) {
            return {
                type: AccountActions.LOGIN_SUCCEEDED,
                payload: null,
                meta: { account: account }
            };
        };
        /**
         * @param {?} error
         * @return {?}
         */
        AccountActions.prototype.loginFailed = /**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            return {
                type: AccountActions.LOGIN_FAILED,
                payload: null,
                meta: null,
                error: error
            };
        };
        /**
         * @param {?} account
         * @return {?}
         */
        AccountActions.prototype.accountUpdated = /**
         * @param {?} account
         * @return {?}
         */
        function (account) {
            return {
                type: AccountActions.ACCOUNT_UPDATED,
                payload: null,
                meta: { account: account }
            };
        };
        // Roles of the account, used to check permissions
        // Roles of the account, used to check permissions
        /**
         * @param {?} accountId
         * @return {?}
         */
        AccountActions.prototype.loadRoles = 
        // Roles of the account, used to check permissions
        /**
         * @param {?} accountId
         * @return {?}
         */
        function (accountId) {
            return {
                type: AccountActions.LOAD_ROLES,
                payload: null,
                meta: { accountId: accountId }
            };
        };
        /**
         * @param {?} accountRoles
         * @return {?}
         */
        AccountActions.prototype.loadRolesSucceeded = /**
         * @param {?} accountRoles
         * @return {?}
         */
        function (accountRoles) {
            return {
                type: AccountActions.LOAD_ROLES_SUCCEEDED,
                payload: null,
                meta: { accountRoles: accountRoles }
            };
        };
        /**
         * @param {?} accountRoles
         * @return {?}
         */
        AccountActions.prototype.loadRolesFailed = /**
         * @param {?} accountRoles
         * @return {?}
         */
        function (accountRoles) {
            return {
                type: AccountActions.LOAD_ROLES_FAILED,
                payload: null,
                meta: null
            };
        };
        AccountActions.LOGIN = 'Account::LOGIN';
        AccountActions.LOGIN_SUCCEEDED = 'Account::LOGIN_SUCCEEDED';
        AccountActions.LOGIN_FAILED = 'Account::LOGIN_FAILED';
        AccountActions.LOAD_ROLES = 'Account::LOAD_ROLES';
        AccountActions.LOAD_ROLES_SUCCEEDED = 'Account::LOAD_ROLES_SUCCEEDED';
        AccountActions.LOAD_ROLES_FAILED = 'Account::LOAD_ROLES_FAILED';
        AccountActions.ACCOUNT_UPDATED = 'Account::ACCOUNT_UPDATED';
        AccountActions.decorators = [
            { type: core.Injectable }
        ];
        return AccountActions;
    }());
    if (false) {
        /** @type {?} */
        AccountActions.LOGIN;
        /** @type {?} */
        AccountActions.LOGIN_SUCCEEDED;
        /** @type {?} */
        AccountActions.LOGIN_FAILED;
        /** @type {?} */
        AccountActions.LOAD_ROLES;
        /** @type {?} */
        AccountActions.LOAD_ROLES_SUCCEEDED;
        /** @type {?} */
        AccountActions.LOAD_ROLES_FAILED;
        /** @type {?} */
        AccountActions.ACCOUNT_UPDATED;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/active-project.action.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ActiveProjectMeta() { }
    if (false) {
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.projectPreview;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.pk_project;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.pk_entity;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.pk_entities;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.pk_classes;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.pk_ui_context;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.entity_version;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.chunk;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.teEnGraphs;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.peItGraphs;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.types;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.projRel;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.dfh_pk_class;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.infProjRel;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.panels;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.list;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.panelIndex;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.panelSerial;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.tabIndex;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.uiIdSerial;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.focusedPanel;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.previousPanelIndex;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.currentPanelIndex;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.previousTabIndex;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.currentTabIndex;
        /** @type {?|undefined} */
        ActiveProjectMeta.prototype.tab;
    }
    ;
    var ActiveProjectActions = /** @class */ (function () {
        function ActiveProjectActions() {
        }
        /**
         * @param {?} pk_project
         * @return {?}
         */
        ActiveProjectActions.prototype.loadProjectBasics = /**
         * @param {?} pk_project
         * @return {?}
         */
        function (pk_project) {
            return {
                type: ActiveProjectActions.LOAD_PROJECT_BASICS,
                payload: null,
                meta: {
                    pk_project: pk_project
                }
            };
        };
        /**
         * @param {?} projectPreview
         * @return {?}
         */
        ActiveProjectActions.prototype.loadProjectBasiscsSucceded = /**
         * @param {?} projectPreview
         * @return {?}
         */
        function (projectPreview) {
            return {
                type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
                payload: null,
                meta: { projectPreview: projectPreview },
            };
        };
        /**
         * @param {?} pk_project
         * @return {?}
         */
        ActiveProjectActions.prototype.loadProjectConfig = /**
         * @param {?} pk_project
         * @return {?}
         */
        function (pk_project) {
            return {
                type: ActiveProjectActions.LOAD_PROJECT_CONFIG,
                payload: null,
                meta: {
                    pk_project: pk_project
                },
            };
        };
        /**
         * @return {?}
         */
        ActiveProjectActions.prototype.loadProjectConfigSucceeded = /**
         * @return {?}
         */
        function () {
            return {
                type: ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED,
                payload: {
                // crm
                },
                meta: null,
            };
        };
        /**
         * @param {?} list
         * @return {?}
         */
        ActiveProjectActions.prototype.setListType = /**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            return {
                type: ActiveProjectActions.SET_LIST_TYPE,
                payload: null,
                meta: {
                    list: list
                }
            };
        };
        /**
         * @param {?} panels
         * @param {?} uiIdSerial
         * @param {?} panelSerial
         * @param {?} focusedPanel
         * @return {?}
         */
        ActiveProjectActions.prototype.setPanels = /**
         * @param {?} panels
         * @param {?} uiIdSerial
         * @param {?} panelSerial
         * @param {?} focusedPanel
         * @return {?}
         */
        function (panels, uiIdSerial, panelSerial, focusedPanel) {
            return {
                type: ActiveProjectActions.SET_PANELS,
                payload: null,
                meta: { panels: panels, uiIdSerial: uiIdSerial, panelSerial: panelSerial, focusedPanel: focusedPanel }
            };
        };
        /**
         * @param {?} panelIndex
         * @param {?} tabIndex
         * @return {?}
         */
        ActiveProjectActions.prototype.activateTab = /**
         * @param {?} panelIndex
         * @param {?} tabIndex
         * @return {?}
         */
        function (panelIndex, tabIndex) {
            return {
                type: ActiveProjectActions.ACTIVATE_TAB,
                payload: null,
                meta: {
                    panelIndex: panelIndex, tabIndex: tabIndex
                }
            };
        };
        /**
         * @param {?} previousPanelIndex
         * @param {?} currentPanelIndex
         * @param {?} previousTabIndex
         * @param {?} currentTabIndex
         * @return {?}
         */
        ActiveProjectActions.prototype.moveTab = /**
         * @param {?} previousPanelIndex
         * @param {?} currentPanelIndex
         * @param {?} previousTabIndex
         * @param {?} currentTabIndex
         * @return {?}
         */
        function (previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex) {
            return {
                type: ActiveProjectActions.MOVE_TAB,
                payload: null,
                meta: {
                    previousPanelIndex: previousPanelIndex, currentPanelIndex: currentPanelIndex, previousTabIndex: previousTabIndex, currentTabIndex: currentTabIndex
                }
            };
        };
        /**
         * @param {?} panelIndex
         * @param {?} tabIndex
         * @return {?}
         */
        ActiveProjectActions.prototype.closeTab = /**
         * @param {?} panelIndex
         * @param {?} tabIndex
         * @return {?}
         */
        function (panelIndex, tabIndex) {
            return {
                type: ActiveProjectActions.CLOSE_TAB,
                payload: null,
                meta: {
                    panelIndex: panelIndex, tabIndex: tabIndex
                }
            };
        };
        /**
         * @template TabData
         * @param {?} tab
         * @return {?}
         */
        ActiveProjectActions.prototype.addTab = /**
         * @template TabData
         * @param {?} tab
         * @return {?}
         */
        function (tab) {
            return {
                type: ActiveProjectActions.ADD_TAB,
                payload: null,
                meta: { tab: tab }
            };
        };
        /**
         * @param {?} previousPanelIndex
         * @param {?} tabIndex
         * @param {?} currentPanelIndex
         * @return {?}
         */
        ActiveProjectActions.prototype.splitPanel = /**
         * @param {?} previousPanelIndex
         * @param {?} tabIndex
         * @param {?} currentPanelIndex
         * @return {?}
         */
        function (previousPanelIndex, tabIndex, currentPanelIndex) {
            return {
                type: ActiveProjectActions.SPLIT_PANEL,
                payload: null,
                meta: { previousPanelIndex: previousPanelIndex, tabIndex: tabIndex, currentPanelIndex: currentPanelIndex }
            };
        };
        /**
         * @param {?} panelIndex
         * @return {?}
         */
        ActiveProjectActions.prototype.closePanel = /**
         * @param {?} panelIndex
         * @return {?}
         */
        function (panelIndex) {
            return {
                type: ActiveProjectActions.CLOSE_PANEL,
                payload: null,
                meta: { panelIndex: panelIndex }
            };
        };
        /**
         * @param {?} panelIndex
         * @return {?}
         */
        ActiveProjectActions.prototype.focusPanel = /**
         * @param {?} panelIndex
         * @return {?}
         */
        function (panelIndex) {
            return {
                type: ActiveProjectActions.FOCUS_PANEL,
                payload: null,
                meta: { panelIndex: panelIndex }
            };
        };
        // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
        //     payload: { selectedChunk },
        //     meta: null
        //   }
        // }
        // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
        //     payload: { selectedChunk },
        //     meta: null
        //   }
        // }
        /**
         * @param {?} refiningChunk
         * @return {?}
         */
        ActiveProjectActions.prototype.setRefiningChunk = 
        // updateSelectedChunk(selectedChunk: DatChunk): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
        //     payload: { selectedChunk },
        //     meta: null
        //   }
        // }
        /**
         * @param {?} refiningChunk
         * @return {?}
         */
        function (refiningChunk) {
            return {
                type: ActiveProjectActions.SET_REFINING_CHUNK,
                payload: { refiningChunk: refiningChunk },
                meta: null
            };
        };
        /**
         * @param {?} creatingMentioning
         * @return {?}
         */
        ActiveProjectActions.prototype.setCreatingMentioning = /**
         * @param {?} creatingMentioning
         * @return {?}
         */
        function (creatingMentioning) {
            return {
                type: ActiveProjectActions.SET_CREATING_MENTIONING,
                payload: { creatingMentioning: creatingMentioning },
                meta: null
            };
        };
        /**
         * @param {?} mentioningsFocusedInText
         * @return {?}
         */
        ActiveProjectActions.prototype.setMentioningsFocusedInText = /**
         * @param {?} mentioningsFocusedInText
         * @return {?}
         */
        function (mentioningsFocusedInText) {
            return {
                type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT,
                payload: { mentioningsFocusedInText: mentioningsFocusedInText },
                meta: null
            };
        };
        /**
         * @param {?} mentioningsFocusedInTable
         * @return {?}
         */
        ActiveProjectActions.prototype.setMentioningsFocusedInTable = /**
         * @param {?} mentioningsFocusedInTable
         * @return {?}
         */
        function (mentioningsFocusedInTable) {
            return {
                type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE,
                payload: { mentioningsFocusedInTable: mentioningsFocusedInTable },
                meta: null
            };
        };
        /**
         * @return {?}
         */
        ActiveProjectActions.prototype.destroy = /**
         * @return {?}
         */
        function () {
            return {
                type: ActiveProjectActions.DESTROY,
                payload: null,
                meta: null,
            };
        };
        /* tslint:disable:member-ordering */
        /**
         * *********************************************************************************
         * CRM and Config (metadata, crm)
         * **********************************************************************************
         */
        ActiveProjectActions.LOAD_PROJECT_BASICS = 'ActiveProject::LOAD_PROJECT_BASICS';
        ActiveProjectActions.LOAD_PROJECT_BASICS_FAILED = 'ActiveProject::LOAD_PROJECT_BASICS_FAILED';
        ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_BASICS_SUCCEEDED';
        ActiveProjectActions.LOAD_PROJECT_CONFIG = 'ActiveProject::LOAD_PROJECT_CONFIG';
        ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_CONFIG_SUCCEEDED';
        /**
         * *********************************************************************************
         * Layout -- Tabs
         * **********************************************************************************
         */
        ActiveProjectActions.SET_LIST_TYPE = 'ActiveProject::SET_LIST_TYPE';
        ActiveProjectActions.SET_PANELS = 'ActiveProject::SET_PANELS';
        ActiveProjectActions.ACTIVATE_TAB = 'ActiveProject::ACTIVATE_TAB';
        ActiveProjectActions.MOVE_TAB = 'ActiveProject::MOVE_TAB';
        ActiveProjectActions.CLOSE_TAB = 'ActiveProject::CLOSE_TAB';
        ActiveProjectActions.ADD_TAB = 'ActiveProject::ADD_TAB';
        ActiveProjectActions.SPLIT_PANEL = 'ActiveProject::SPLIT_PANEL';
        ActiveProjectActions.CLOSE_PANEL = 'ActiveProject::CLOSE_PANEL';
        ActiveProjectActions.FOCUS_PANEL = 'ActiveProject::FOCUS_PANEL';
        // /************************************************************************************
        //  * Layout -- Modals
        // ************************************************************************************/
        // // create or add entity modal
        // static readonly OPEN_ADD_FORM = 'ActiveProject::OPEN_ADD_FORM';
        // static readonly CLOSE_ADD_FORM = 'ActiveProject::CLOSE_ADD_FORM';
        // openAddForm = (createOrAddEntity: CreateOrAddEntity): ActiveProjectAction => ({
        //   type: ActiveProjectActions.OPEN_ADD_FORM,
        //   meta: { createOrAddEntity },
        //   payload: null
        // })
        // closeAddForm = (): ActiveProjectAction => ({
        //   type: ActiveProjectActions.CLOSE_ADD_FORM,
        //   meta: null,
        //   payload: null
        // })
        /************************************************************************************
          * Information cache
          ************************************************************************************/
        // EntityPreviews
        // static LOAD_ENTITY_PREVIEW = 'ActiveProject::LOAD_ENTITY_PREVIEW';
        // static LOAD_ENTITY_PREVIEW_SUCCEEDED = 'ActiveProject::LOAD_ENTITY_PREVIEW_SUCCEEDED';
        // static LOAD_ENTITY_PREVIEW_FAILED = 'ActiveProject::LOAD_ENTITY_PREVIEW_FAILED';
        // loadEntityPreview(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entity, pk_ui_context
        //     }
        //   }
        // }
        // loadEntityPreviewSucceeded(entityPreview: EntityPreview): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       entityPreview
        //     },
        //   }
        // }
        // loadEntityPreviewFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // EntityPreviews
        // static LOAD_TYPES = 'ActiveProject::LOAD_TYPES';
        // static LOAD_TYPES_SUCCEEDED = 'ActiveProject::LOAD_TYPES_SUCCEEDED';
        // static LOAD_TYPES_FAILED = 'ActiveProject::LOAD_TYPES_FAILED';
        // loadTypes(pk_project: number, pk_classes: number[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_TYPES,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_classes
        //     }
        //   }
        // }
        // loadTypesSucceeded(types: TypePeIt[], pk_classes: number[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_TYPES_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       types, pk_classes
        //     },
        //   }
        // }
        // loadTypesFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_TYPES_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // Entities Details for display in Modals
        // static LOAD_ENTITY_DETAIL_FOR_MODAL = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL';
        // static LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED';
        // static LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED'; // TODO: Implement action/reducer
        // static LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED';
        // loadEntityDetailForModal(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entity, pk_ui_context
        //     }
        //   }
        // }
        // loadPeItDetailsForModalSucceeded(peItDetail: EntityDetail): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       peItDetail
        //     },
        //   }
        // }
        // loaEntitytDetailsForModalFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // Chunks
        // static LOAD_CHUNK = 'ActiveProject::LOAD_CHUNK';
        // static LOAD_CHUNK_SUCCEEDED = 'ActiveProject::LOAD_CHUNK_SUCCEEDED';
        // static LOAD_CHUNK_FAILED = 'ActiveProject::LOAD_CHUNK_FAILED';
        // loadChunk(pk_project: number, pk_entity: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_CHUNK,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entity
        //     }
        //   }
        // }
        // loadChunkSucceeded(chunk: DatChunk): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_CHUNK_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       chunk
        //     },
        //   }
        // }
        // loadChunkFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_CHUNK_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // PeIt Graphs
        // static LOAD_PEIT_GRAPHS = 'ActiveProject::LOAD_PEIT_GRAPHS';
        // static LOAD_PEIT_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_PEIT_GRAPHS_SUCCEEDED';
        // static LOAD_PEIT_GRAPHS_FAILED = 'ActiveProject::LOAD_PEIT_GRAPHS_FAILED';
        // loadPeItGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entities
        //     }
        //   }
        // }
        // loadPeItGraphsSucceeded(peItGraphs: InfPersistentItem[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       peItGraphs
        //     },
        //   }
        // }
        // loadPeItGraphsFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_PEIT_GRAPHS_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // TeEn Graphs
        // static LOAD_TEEN_GRAPHS = 'ActiveProject::LOAD_TEEN_GRAPHS';
        // static LOAD_TEEN_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_TEEN_GRAPHS_SUCCEEDED';
        // static LOAD_TEEN_GRAPHS_FAILED = 'ActiveProject::LOAD_TEEN_GRAPHS_FAILED';
        // loadTeEnGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entities
        //     }
        //   }
        // }
        // loadTeEnGraphsSucceeded(teEnGraphs: InfTemporalEntity[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       teEnGraphs
        //     },
        //   }
        // }
        // loadTeEnGraphsFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_TEEN_GRAPHS_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // Queries
        // static LOAD_QUERIES = 'ActiveProject::LOAD_QUERIES';
        // static LOAD_QUERIES_SUCCEEDED = 'ActiveProject::LOAD_QUERIES_SUCCEEDED';
        // static LOAD_QUERIES_FAILED = 'ActiveProject::LOAD_QUERIES_FAILED';
        // loadQueries(pk_project: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_QUERIES,
        //     payload: null,
        //     meta: {
        //       pk_project
        //     }
        //   }
        // }
        // loadQueriesSucceeded(comQueryArray: ComQueryV[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_QUERIES_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       comQueryArray
        //     },
        //   }
        // }
        // loadQueriesFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_QUERIES_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // Query Version
        // static LOAD_QUERY_VERSION = 'ActiveProject::LOAD_QUERY_VERSION';
        // static LOAD_QUERY_VERSION_SUCCEEDED = 'ActiveProject::LOAD_QUERY_VERSION_SUCCEEDED';
        // static LOAD_QUERY_VERSION_FAILED = 'ActiveProject::LOAD_QUERY_VERSION_FAILED';
        // loadQueryVersion(pk_project: number, pk_entity: number, entity_version: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_QUERY_VERSION,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entity, entity_version
        //     }
        //   }
        // }
        // loadQueryVersionSucceeded(comQuery: ProQuery): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_QUERY_VERSION_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       comQuery
        //     },
        //   }
        // }
        // loadQueryVersionFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_QUERY_VERSION_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // Visuals
        // static LOAD_VISUALS = 'ActiveProject::LOAD_VISUALS';
        // static LOAD_VISUALS_SUCCEEDED = 'ActiveProject::LOAD_VISUALS_SUCCEEDED';
        // static LOAD_VISUALS_FAILED = 'ActiveProject::LOAD_VISUALS_FAILED';
        // loadVisuals(pk_project: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_VISUALS,
        //     payload: null,
        //     meta: {
        //       pk_project
        //     }
        //   }
        // }
        // loadVisualsSucceeded(comVisualArray: ComVisualV[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_VISUALS_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       comVisualArray
        //     },
        //   }
        // }
        // loadVisualsFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_VISUALS_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        // // Visual Version
        // static LOAD_VISUAL_VERSION = 'ActiveProject::LOAD_VISUAL_VERSION';
        // static LOAD_VISUAL_VERSION_SUCCEEDED = 'ActiveProject::LOAD_VISUAL_VERSION_SUCCEEDED';
        // static LOAD_VISUAL_VERSION_FAILED = 'ActiveProject::LOAD_VISUAL_VERSION_FAILED';
        // loadVisualVersion(pk_project: number, pk_entity: number, entity_version?: number): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_VISUAL_VERSION,
        //     payload: null,
        //     meta: {
        //       pk_project, pk_entity, entity_version
        //     }
        //   }
        // }
        // loadVisualVersionSucceeded(comVisualArray: ComVisualV[]): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_VISUAL_VERSION_SUCCEEDED,
        //     payload: null,
        //     meta: {
        //       comVisualArray
        //     },
        //   }
        // }
        // loadVisualVersionFailed(error): ActiveProjectAction {
        //   return {
        //     type: ActiveProjectActions.LOAD_VISUAL_VERSION_FAILED,
        //     payload: null,
        //     meta: null,
        //     error
        //   }
        // }
        /**
         * *********************************************************************************
         *  Things for Mentionings / Annotations
         * **********************************************************************************
         */
        ActiveProjectActions.UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
        ActiveProjectActions.SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
        ActiveProjectActions.SET_CREATING_MENTIONING = 'ActiveProject::SET_CREATING_MENTIONING';
        /**
         * *********************************************************************************
         * Highlighting of mentionings in the gui
         * **********************************************************************************
         */
        ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TEXT';
        ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TABLE';
        // /*********************************************************************
        //  *  Methods to manage enabling and disabling a class for the project
        //  *********************************************************************/
        // static readonly UPSERT_CLASS_PROJ_REL = 'ActiveProject::UPSERT_CLASS_PROJ_REL';
        // static readonly UPSERT_CLASS_PROJ_REL_SUCCEEDED = 'ActiveProject::UPSERT_CLASS_PROJ_REL_SUCCEEDED';
        // static readonly UPSERT_CLASS_PROJ_REL_FAILED = 'ActiveProject::UPSERT_CLASS_PROJ_REL_FAILED';
        // upsertClassProjRel = (projRel: ProDfhClassProjRel, dfh_pk_class: number): ActiveProjectAction => ({
        //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL,
        //   meta: { projRel, dfh_pk_class },
        //   payload: null,
        // });
        // upsertClassProjRelSucceeded = (projRel: ProDfhClassProjRel, dfh_pk_class: number): ActiveProjectAction => ({
        //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL_SUCCEEDED,
        //   meta: { projRel, dfh_pk_class },
        //   payload: null
        // })
        // upsertClassProjRelFailed = (error, dfh_pk_class: number): ActiveProjectAction => ({
        //   type: ActiveProjectActions.UPSERT_CLASS_PROJ_REL_FAILED,
        //   meta: { dfh_pk_class },
        //   payload: null,
        //   error,
        // })
        // /*********************************************************************
        //  *  Methods to manage enabling and disabling an entity for the project
        //  *********************************************************************/
        // static readonly UPSERT_ENTITY_PROJ_REL = 'ActiveProject::UPSERT_ENTITY_PROJ_REL';
        // static readonly UPSERT_ENTITY_PROJ_REL_SUCCEEDED = 'ActiveProject::UPSERT_ENTITY_PROJ_REL_SUCCEEDED';
        // static readonly UPSERT_ENTITY_PROJ_REL_FAILED = 'ActiveProject::UPSERT_ENTITY_PROJ_REL_FAILED';
        // upsertEntityProjRel = (infProjRel: ProInfoProjRel): ActiveProjectAction => ({
        //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL,
        //   meta: { infProjRel },
        //   payload: null,
        // });
        // upsertEntityProjRelSucceeded = (infProjRel: ProInfoProjRel): ActiveProjectAction => ({
        //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_SUCCEEDED,
        //   meta: { infProjRel },
        //   payload: null
        // })
        // upsertEntityProjRelFailed = (error): ActiveProjectAction => ({
        //   type: ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_FAILED,
        //   meta: null,
        //   payload: null,
        //   error,
        // })
        /**
         * *********************************************************************************
         * Destroy the active project state (on closing a project)
         * **********************************************************************************
         */
        ActiveProjectActions.DESTROY = 'ActiveProject::DESTROY';
        ActiveProjectActions.decorators = [
            { type: core.Injectable }
        ];
        return ActiveProjectActions;
    }());
    if (false) {
        /**
         * *********************************************************************************
         * CRM and Config (metadata, crm)
         * **********************************************************************************
         * @type {?}
         */
        ActiveProjectActions.LOAD_PROJECT_BASICS;
        /** @type {?} */
        ActiveProjectActions.LOAD_PROJECT_BASICS_FAILED;
        /** @type {?} */
        ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED;
        /** @type {?} */
        ActiveProjectActions.LOAD_PROJECT_CONFIG;
        /** @type {?} */
        ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED;
        /**
         * *********************************************************************************
         * Layout -- Tabs
         * **********************************************************************************
         * @type {?}
         */
        ActiveProjectActions.SET_LIST_TYPE;
        /** @type {?} */
        ActiveProjectActions.SET_PANELS;
        /** @type {?} */
        ActiveProjectActions.ACTIVATE_TAB;
        /** @type {?} */
        ActiveProjectActions.MOVE_TAB;
        /** @type {?} */
        ActiveProjectActions.CLOSE_TAB;
        /** @type {?} */
        ActiveProjectActions.ADD_TAB;
        /** @type {?} */
        ActiveProjectActions.SPLIT_PANEL;
        /** @type {?} */
        ActiveProjectActions.CLOSE_PANEL;
        /** @type {?} */
        ActiveProjectActions.FOCUS_PANEL;
        /**
         * *********************************************************************************
         *  Things for Mentionings / Annotations
         * **********************************************************************************
         * @type {?}
         */
        ActiveProjectActions.UPDATE_SELECTED_CHUNK;
        /** @type {?} */
        ActiveProjectActions.SET_REFINING_CHUNK;
        /** @type {?} */
        ActiveProjectActions.SET_CREATING_MENTIONING;
        /**
         * *********************************************************************************
         * Highlighting of mentionings in the gui
         * **********************************************************************************
         * @type {?}
         */
        ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT;
        /** @type {?} */
        ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE;
        /**
         * *********************************************************************************
         * Destroy the active project state (on closing a project)
         * **********************************************************************************
         * @type {?}
         */
        ActiveProjectActions.DESTROY;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/entity-list.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InformationAPIActions = /** @class */ (function () {
        function InformationAPIActions() {
            /**
             * ******************************************************************
             *  Method to distroy the slice of store
             * *******************************************************************
             */
            this.destroy = (/**
             * @return {?}
             */
            function () { return ({
                type: InformationAPIActions.DESTROY,
                meta: null,
                payload: null
            }); });
        }
        InformationAPIActions.DESTROY = 'Information::DESTROY';
        InformationAPIActions.decorators = [
            { type: core.Injectable }
        ];
        __decorate([
            store.dispatch(),
            __metadata("design:type", Object)
        ], InformationAPIActions.prototype, "destroy", void 0);
        return InformationAPIActions;
    }());
    if (false) {
        /** @type {?} */
        InformationAPIActions.DESTROY;
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         * @type {?}
         */
        InformationAPIActions.prototype.destroy;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/loading-bar.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MetaData$1() { }
    if (false) {
        /** @type {?} */
        MetaData$1.prototype.null;
    }
    ;
    /**
     * This actions start, stop and complete the global loading bar
     * using a SlimLoadingBarService instantiated within the loading-bar
     * module.
     *
     * In order to show a loading bar in GUI, use the LoadingBarComponent
     * exported by this module.
     */
    var LoadingBarActions = /** @class */ (function () {
        function LoadingBarActions() {
            this.startLoading = (/**
             * @return {?}
             */
            function () { return ({
                type: LoadingBarActions.START,
                meta: null,
                payload: null,
            }); });
            this.stopLoading = (/**
             * @return {?}
             */
            function () { return ({
                type: LoadingBarActions.STOP,
                meta: null,
                payload: null
            }); });
            this.completeLoading = (/**
             * @return {?}
             */
            function () { return ({
                type: LoadingBarActions.COPMLETE,
                meta: null,
                payload: null,
            }); });
        }
        LoadingBarActions.START = 'LOADING_BAR_START';
        LoadingBarActions.STOP = 'LOADING_BAR_STOP';
        LoadingBarActions.COPMLETE = 'LOADING_BAR_COPMLETE';
        LoadingBarActions.decorators = [
            { type: core.Injectable }
        ];
        __decorate([
            store.dispatch(),
            __metadata("design:type", Object)
        ], LoadingBarActions.prototype, "startLoading", void 0);
        __decorate([
            store.dispatch(),
            __metadata("design:type", Object)
        ], LoadingBarActions.prototype, "stopLoading", void 0);
        __decorate([
            store.dispatch(),
            __metadata("design:type", Object)
        ], LoadingBarActions.prototype, "completeLoading", void 0);
        return LoadingBarActions;
    }());
    if (false) {
        /** @type {?} */
        LoadingBarActions.START;
        /** @type {?} */
        LoadingBarActions.STOP;
        /** @type {?} */
        LoadingBarActions.COPMLETE;
        /** @type {?} */
        LoadingBarActions.prototype.startLoading;
        /** @type {?} */
        LoadingBarActions.prototype.stopLoading;
        /** @type {?} */
        LoadingBarActions.prototype.completeLoading;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/notifications.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MetaData$2() { }
    if (false) {
        /** @type {?|undefined} */
        MetaData$2.prototype.itemsArray;
    }
    ;
    var NotificationsAPIActions = /** @class */ (function () {
        function NotificationsAPIActions() {
            this.addToast = (/**
             * @param {?} payload
             * @return {?}
             */
            function (payload) { return ({
                type: NotificationsAPIActions.ADD_TOAST,
                meta: null,
                payload: payload
            }); });
        }
        NotificationsAPIActions.ADD_TOAST = 'Notifications::ADD_TOAST';
        NotificationsAPIActions.decorators = [
            { type: core.Injectable }
        ];
        return NotificationsAPIActions;
    }());
    if (false) {
        /** @type {?} */
        NotificationsAPIActions.ADD_TOAST;
        /** @type {?} */
        NotificationsAPIActions.prototype.addToast;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/projects.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ProjectsActions = /** @class */ (function () {
        function ProjectsActions() {
        }
        /**
         * @param {?} payload
         * @return {?}
         */
        ProjectsActions.prototype.loadProjectsSucceeded = /**
         * @param {?} payload
         * @return {?}
         */
        function (payload) {
            return {
                type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
                payload: payload,
                meta: null
            };
        };
        ProjectsActions.LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';
        ProjectsActions.decorators = [
            { type: core.Injectable }
        ];
        return ProjectsActions;
    }());
    if (false) {
        /** @type {?} */
        ProjectsActions.LOAD_PROJECTS_SUCCEEDED;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/source-list.actions.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MetaData$3() { }
    if (false) {
        /** @type {?|undefined} */
        MetaData$3.prototype.pkAllowedClasses;
    }
    ;
    var SourceListAPIActions = /** @class */ (function () {
        function SourceListAPIActions() {
            /**
             * ******************************************************************
             *  Actions to manage the list
             * *******************************************************************
             */
            this.initializeList = (/**
             * @param {?} pkAllowedClasses
             * @return {?}
             */
            function (pkAllowedClasses) { return ({
                type: SourceListAPIActions.INITIALIZE_LIST,
                meta: { pkAllowedClasses: pkAllowedClasses },
                payload: null
            }); });
            /**
             * ******************************************************************
             *  Method to distroy the slice of store
             * *******************************************************************
             */
            this.destroy = (/**
             * @return {?}
             */
            function () { return ({
                type: SourceListAPIActions.DESTROY,
                meta: null,
                payload: null
            }); });
        }
        SourceListAPIActions.INITIALIZE_LIST = 'SourceList::INITIALIZE_LIST';
        SourceListAPIActions.DESTROY = 'SourceList::DESTROY';
        SourceListAPIActions.decorators = [
            { type: core.Injectable }
        ];
        __decorate([
            store.dispatch(),
            __metadata("design:type", Object)
        ], SourceListAPIActions.prototype, "initializeList", void 0);
        __decorate([
            store.dispatch(),
            __metadata("design:type", Object)
        ], SourceListAPIActions.prototype, "destroy", void 0);
        return SourceListAPIActions;
    }());
    if (false) {
        /** @type {?} */
        SourceListAPIActions.INITIALIZE_LIST;
        /** @type {?} */
        SourceListAPIActions.DESTROY;
        /**
         * ******************************************************************
         *  Actions to manage the list
         * *******************************************************************
         * @type {?}
         */
        SourceListAPIActions.prototype.initializeList;
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         * @type {?}
         */
        SourceListAPIActions.prototype.destroy;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/actions/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/epics/account.epics.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AccountEpics = /** @class */ (function () {
        function AccountEpics(actions, loadingBarActions, accountApi, notificationActions) {
            this.actions = actions;
            this.loadingBarActions = loadingBarActions;
            this.accountApi = accountApi;
            this.notificationActions = notificationActions;
        }
        /**
         * @return {?}
         */
        AccountEpics.prototype.createEpics = /**
         * @return {?}
         */
        function () {
            return reduxObservableEs6Compat.combineEpics(this.loadRoles());
        };
        /**
         * @private
         * @return {?}
         */
        AccountEpics.prototype.loadRoles = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) { return action$.pipe(reduxObservableEs6Compat.ofType(AccountActions.LOAD_ROLES), operators.mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new rxjs.Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                globalStore.next(_this.loadingBarActions.startLoading());
                _this.accountApi.getRoles(action.meta.accountId)
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    globalStore.next(_this.loadingBarActions.completeLoading());
                    globalStore.next(_this.actions.loadRolesSucceeded(data));
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalStore.next(_this.notificationActions.addToast({
                        type: 'error',
                        options: { title: error }
                    }));
                }));
            })); }))); });
        };
        AccountEpics.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AccountEpics.ctorParameters = function () { return [
            { type: AccountActions },
            { type: LoadingBarActions },
            { type: libSdkLb3.PubAccountApi },
            { type: NotificationsAPIActions }
        ]; };
        return AccountEpics;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AccountEpics.prototype.actions;
        /**
         * @type {?}
         * @private
         */
        AccountEpics.prototype.loadingBarActions;
        /**
         * @type {?}
         * @private
         */
        AccountEpics.prototype.accountApi;
        /**
         * @type {?}
         * @private
         */
        AccountEpics.prototype.notificationActions;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/epics/active-project.epics.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Transform ProProject to ProjectPreview
     * @param {?} project
     * @return {?}
     */
    function proProjectToProjectPreview(project) {
        return {
            label: this.firstProTextPropStringOfType(project.text_properties, libConfig.SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
            description: this.firstProTextPropStringOfType(project.text_properties, libConfig.SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
            default_language: project.default_language,
            pk_project: project.pk_entity
        };
    }
    var ActiveProjectEpics = /** @class */ (function () {
        function ActiveProjectEpics(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux) {
            this.sys = sys;
            this.dat = dat;
            this.dfh = dfh;
            this.pro = pro;
            this.inf = inf;
            this.projectApi = projectApi;
            this.actions = actions;
            this.notificationActions = notificationActions;
            this.loadingBarActions = loadingBarActions;
            this.ngRedux = ngRedux;
        }
        /**
         * @return {?}
         */
        ActiveProjectEpics.prototype.createEpics = /**
         * @return {?}
         */
        function () {
            return reduxObservableEs6Compat.combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
        };
        /**
         * This epic listenes to an action that wants to load tha active project (by id)
         * It loads the project info and
         * - on loaded dispaches an action that reduces the project into the store
         * - on fail dispaches an action that shows an error notification
         */
        /**
         * This epic listenes to an action that wants to load tha active project (by id)
         * It loads the project info and
         * - on loaded dispaches an action that reduces the project into the store
         * - on fail dispaches an action that shows an error notification
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createLoadProjectBasicsEpic = /**
         * This epic listenes to an action that wants to load tha active project (by id)
         * It loads the project info and
         * - on loaded dispaches an action that reduces the project into the store
         * - on fail dispaches an action that shows an error notification
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) { return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.LOAD_PROJECT_BASICS), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new rxjs.Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                /**
               * Emit the global action that activates the loading bar
               */
                globalStore.next(_this.loadingBarActions.startLoading());
                _this.projectApi.getBasics(action.meta.pk_project)
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    globalStore.next(_this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])));
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalStore.next(_this.notificationActions.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                }));
            })); }))); });
        };
        /**
        * This epic listenes to an action that is dispached when loading projcect succeeded
        *
        * It dispaches an action that completes the loading bar
        */
        /**
         * This epic listenes to an action that is dispached when loading projcect succeeded
         *
         * It dispaches an action that completes the loading bar
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createLoadProjectUpdatedEpic = /**
         * This epic listenes to an action that is dispached when loading projcect succeeded
         *
         * It dispaches an action that completes the loading bar
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) { return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED), operators.mapTo(_this.loadingBarActions.completeLoading())); });
        };
        /**
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createLoadProjectConfigEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) { return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new rxjs.Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                globalStore.next(_this.loadingBarActions.startLoading());
                rxjs.combineLatest(_this.dfh.profile.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.dfh.klass.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.dfh.property.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.dfh.label.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.sys.system_relevant_class.load().resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.sys.config.load().resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.inf.persistent_item.typesOfProject(action.meta.pk_project).resolved$.pipe(operators.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))))
                    .pipe(operators.filter((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return !res.includes(undefined); })))
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    globalStore.next(_this.actions.loadProjectConfigSucceeded());
                    globalStore.next(_this.loadingBarActions.completeLoading());
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
                }));
            })); }))); });
        };
        /**
         * LAYOUT
         */
        /**
         * LAYOUT
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createClosePanelEpic = /**
         * LAYOUT
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL), operators.mergeMap((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) { return new rxjs.Observable((/**
                 * @param {?} globalStore
                 * @return {?}
                 */
                function (globalStore) {
                    _this.ngRedux.getState().activeProject.panels.forEach((/**
                     * @param {?} panel
                     * @param {?} panelIndex
                     * @return {?}
                     */
                    function (panel, panelIndex) {
                        if (panel.tabs.length === 0)
                            globalStore.next(_this.actions.closePanel(panelIndex));
                    }));
                })); })));
            });
        };
        /**
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createSplitPanelActivateTabEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.SPLIT_PANEL), operators.map((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) {
                    /** @type {?} */
                    var p = _this.ngRedux.getState().activeProject;
                    /** @type {?} */
                    var c = action.meta.currentPanelIndex;
                    /** @type {?} */
                    var panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
                    return _this.actions.activateTab(panelIndex, 0);
                })));
            });
        };
        /**
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createActivateTabFocusPanelEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.ACTIVATE_TAB), operators.mergeMap((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) { return new rxjs.Observable((/**
                 * @param {?} globalStore
                 * @return {?}
                 */
                function (globalStore) {
                    if (_this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
                        globalStore.next(_this.actions.focusPanel(action.meta.panelIndex));
                    }
                })); })));
            });
        };
        /**
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createMoveTabFocusPanelEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.MOVE_TAB), operators.mergeMap((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) { return new rxjs.Observable((/**
                 * @param {?} globalStore
                 * @return {?}
                 */
                function (globalStore) {
                    if (_this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
                        globalStore.next(_this.actions.focusPanel(action.meta.currentPanelIndex));
                    }
                })); })));
            });
        };
        /**
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createClosePanelFocusPanelEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.CLOSE_PANEL), operators.mergeMap((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) { return new rxjs.Observable((/**
                 * @param {?} globalStore
                 * @return {?}
                 */
                function (globalStore) {
                    if (_this.ngRedux.getState().activeProject.focusedPanel > (_this.ngRedux.getState().activeProject.panels.length - 1)) {
                        globalStore.next(_this.actions.focusPanel(0));
                    }
                })); })));
            });
        };
        /**
         * @private
         * @return {?}
         */
        ActiveProjectEpics.prototype.createAddTabCloseListEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(reduxObservableEs6Compat.ofType(ActiveProjectActions.ADD_TAB), operators.mapTo(_this.actions.setListType('')));
            });
        };
        ActiveProjectEpics.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ActiveProjectEpics.ctorParameters = function () { return [
            { type: SysActions },
            { type: DatActions },
            { type: DfhActions },
            { type: ProActions },
            { type: InfActions },
            { type: libSdkLb3.ProProjectApi },
            { type: ActiveProjectActions },
            { type: NotificationsAPIActions },
            { type: LoadingBarActions },
            { type: store.NgRedux }
        ]; };
        return ActiveProjectEpics;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.sys;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.dat;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.dfh;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.pro;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.inf;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.projectApi;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.actions;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.notificationActions;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.loadingBarActions;
        /**
         * @type {?}
         * @private
         */
        ActiveProjectEpics.prototype.ngRedux;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/epics/loading-bar.epics.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoadingBarEpics = /** @class */ (function () {
        function LoadingBarEpics(service, actions) {
            this.service = service;
            this.actions = actions;
        }
        /**
         * @return {?}
         */
        LoadingBarEpics.prototype.createEpics = /**
         * @return {?}
         */
        function () {
            return reduxObservableEs6Compat.combineEpics(this.createStartLoadingBarEpic(), this.createCompleteLoadingBarEpic());
        };
        /**
         * @private
         * @return {?}
         */
        LoadingBarEpics.prototype.createCompleteLoadingBarEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) { return action$.pipe(reduxObservableEs6Compat.ofType(LoadingBarActions.COPMLETE), operators.switchMap((/**
             * @return {?}
             */
            function () {
                return rxjs.Observable.create((/**
                 * @param {?} observer
                 * @return {?}
                 */
                function (observer) {
                    _this.service.complete();
                    // observer.next(this.actions.stopLoading())
                }));
            }))); });
        };
        /**
         * @private
         * @return {?}
         */
        LoadingBarEpics.prototype.createStartLoadingBarEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) { return action$.pipe(reduxObservableEs6Compat.ofType(LoadingBarActions.START), operators.switchMap((/**
             * @return {?}
             */
            function () {
                return rxjs.Observable.create((/**
                 * @param {?} observer
                 * @return {?}
                 */
                function (observer) {
                    _this.service.start();
                }));
            }))); });
        };
        LoadingBarEpics.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LoadingBarEpics.ctorParameters = function () { return [
            { type: ngxSlimLoadingBar.SlimLoadingBarService },
            { type: LoadingBarActions }
        ]; };
        return LoadingBarEpics;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LoadingBarEpics.prototype.service;
        /**
         * @type {?}
         * @private
         */
        LoadingBarEpics.prototype.actions;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/epics/notifications.epics.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NotificationsAPIEpics = /** @class */ (function () {
        function NotificationsAPIEpics(toastyService, toastyConfig) {
            this.toastyService = toastyService;
            this.toastyConfig = toastyConfig;
            // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
            // Possible values: default, bootstrap, material
            this.toastyConfig.theme = 'bootstrap';
        }
        /**
         * @return {?}
         */
        NotificationsAPIEpics.prototype.createEpics = /**
         * @return {?}
         */
        function () {
            return reduxObservableEs6Compat.combineEpics(this.createAddToastEpic());
        };
        /**
         * @private
         * @return {?}
         */
        NotificationsAPIEpics.prototype.createAddToastEpic = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} action$
             * @param {?} store
             * @return {?}
             */
            function (action$, store) {
                return action$.pipe(
                /**
                 * Filter the actions that triggers this epic
                 */
                operators.filter((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) {
                    return a;
                })), reduxObservableEs6Compat.ofType(NotificationsAPIActions.ADD_TOAST), operators.switchMap((/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) { return new rxjs.Observable((/**
                 * @param {?} observer
                 * @return {?}
                 */
                function (observer) {
                    /**
                     * Add Toast
                     * @type {?}
                     */
                    var a = (/** @type {?} */ (action));
                    if (!a.payload.options.title && !a.payload.options.msg) {
                        if (a.payload.type === 'error') {
                            a.payload.options.title = 'Oops, something went wrong!';
                        }
                    }
                    _this.toastyService[a.payload.type](a.payload.options);
                })); })));
            });
        };
        NotificationsAPIEpics.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NotificationsAPIEpics.ctorParameters = function () { return [
            { type: ngxToasty.ToastyService },
            { type: ngxToasty.ToastyConfig }
        ]; };
        return NotificationsAPIEpics;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NotificationsAPIEpics.prototype.toastyService;
        /**
         * @type {?}
         * @private
         */
        NotificationsAPIEpics.prototype.toastyConfig;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/epics/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/account.model.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AccountRole() { }
    if (false) {
        /** @type {?} */
        AccountRole.prototype.id;
        /** @type {?} */
        AccountRole.prototype.name;
    }
    /**
     * @record
     */
    function IAccount() { }
    if (false) {
        /** @type {?} */
        IAccount.prototype.account;
        /** @type {?|undefined} */
        IAccount.prototype.roles;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/active-project.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ProjectPreview() { }
    if (false) {
        /** @type {?|undefined} */
        ProjectPreview.prototype.label;
        /** @type {?|undefined} */
        ProjectPreview.prototype.description;
        /** @type {?|undefined} */
        ProjectPreview.prototype.default_language;
        /** @type {?|undefined} */
        ProjectPreview.prototype.pk_project;
    }
    /**
     * @record
     * @template T
     */
    function EntityByPk() { }
    /**
     * @record
     * @template T
     */
    function VersionEntity() { }
    if (false) {
        /** @type {?} */
        VersionEntity.prototype._latestVersion;
        /* Skipping unhandled member: [v: number]: T*/
    }
    /**
     * @record
     * @template T
     */
    function EntityVersionsByPk() { }
    /**
     * @record
     */
    function ChunkList() { }
    /**
     * @record
     */
    function PeItList() { }
    /**
     * @record
     */
    function TeEnList() { }
    /**
     * @record
     */
    function PropertyList() { }
    /**
     * @record
     */
    function TypePeIt() { }
    if (false) {
        /** @type {?} */
        TypePeIt.prototype.fk_typed_class;
    }
    /**
     * @record
     */
    function TypesByClass() { }
    /**
     * @record
     */
    function TypesByPk() { }
    /**
     * @record
     */
    function TypePreview() { }
    if (false) {
        /** @type {?} */
        TypePreview.prototype.fk_typed_class;
    }
    /**
     * @record
     */
    function TypePreviewsByClass() { }
    /**
     * @record
     */
    function TypePreviewList() { }
    /**
     * @record
     */
    function Panel() { }
    if (false) {
        /** @type {?} */
        Panel.prototype.id;
        /** @type {?} */
        Panel.prototype.tabs;
    }
    /**
     * @record
     * @template D
     */
    function PanelTab() { }
    if (false) {
        /** @type {?} */
        PanelTab.prototype.active;
        /** @type {?} */
        PanelTab.prototype.component;
        /** @type {?} */
        PanelTab.prototype.icon;
        /** @type {?|undefined} */
        PanelTab.prototype.pathSegment;
        /** @type {?|undefined} */
        PanelTab.prototype.data;
        /** @type {?|undefined} */
        PanelTab.prototype.path;
        /** @type {?|undefined} */
        PanelTab.prototype.tabTitle$;
        /** @type {?|undefined} */
        PanelTab.prototype.loading$;
    }
    /**
     * @record
     */
    function PeItTabData() { }
    if (false) {
        /** @type {?|undefined} */
        PeItTabData.prototype.peItDetailConfig;
    }
    /**
     * @record
     */
    function AnalysisTabData() { }
    if (false) {
        /** @type {?|undefined} */
        AnalysisTabData.prototype.pkEntity;
        /** @type {?|undefined} */
        AnalysisTabData.prototype.fkAnalysisType;
    }
    /**
     * @record
     */
    function TabData() { }
    if (false) {
        /** @type {?|undefined} */
        TabData.prototype.pkEntity;
        /** @type {?|undefined} */
        TabData.prototype.pkProperty;
        /** @type {?|undefined} */
        TabData.prototype.peItDetailConfig;
    }
    /**
     * @record
     */
    function RamSource() { }
    if (false) {
        /** @type {?|undefined} */
        RamSource.prototype.pkEntity;
        /** @type {?|undefined} */
        RamSource.prototype.chunk;
    }
    /**
     * @record
     */
    function ProjectDetail() { }
    if (false) {
        /**
         * ***************************************************************
         * CRM and Project Config
         * @type {?|undefined}
         */
        ProjectDetail.prototype.loadingConfigData;
        /** @type {?|undefined} */
        ProjectDetail.prototype.configDataInitialized;
        /**
         * ***************************************************************
         * Layout – Tabs
         * @type {?|undefined}
         */
        ProjectDetail.prototype.list;
        /** @type {?|undefined} */
        ProjectDetail.prototype.panels;
        /** @type {?|undefined} */
        ProjectDetail.prototype.focusedPanel;
        /** @type {?|undefined} */
        ProjectDetail.prototype.panelSerial;
        /** @type {?|undefined} */
        ProjectDetail.prototype.uiIdSerial;
        /** @type {?|undefined} */
        ProjectDetail.prototype.tabLayouts;
        /** @type {?|undefined} */
        ProjectDetail.prototype.textDetails;
        /** @type {?|undefined} */
        ProjectDetail.prototype.peItDetails;
        /** @type {?|undefined} */
        ProjectDetail.prototype.analysisDetails;
        /** @type {?|undefined} */
        ProjectDetail.prototype.classesSettings;
        /** @type {?|undefined} */
        ProjectDetail.prototype.contrVocabSettings;
        /** @type {?|undefined} */
        ProjectDetail.prototype.ontomeProfilesSettings;
        /**
         * ***************************************************************
         * Things for Mentionings / Annotations
         * @type {?|undefined}
         */
        ProjectDetail.prototype.refiningChunk;
        /** @type {?|undefined} */
        ProjectDetail.prototype.creatingMentioning;
        /** @type {?|undefined} */
        ProjectDetail.prototype.mentioningsFocusedInText;
        /** @type {?|undefined} */
        ProjectDetail.prototype.mentioningsFocusedInTable;
    }
    /**
     * @record
     */
    function ProjectCrm() { }
    if (false) {
        /** @type {?|undefined} */
        ProjectCrm.prototype.classes;
        /** @type {?|undefined} */
        ProjectCrm.prototype.properties;
    }
    /**
     * @record
     */
    function ClassConfigList() { }
    /**
     * @record
     */
    function ClassConfig() { }
    if (false) {
        /** @type {?} */
        ClassConfig.prototype.pkEntity;
        /** @type {?} */
        ClassConfig.prototype.dfh_pk_class;
        /** @type {?} */
        ClassConfig.prototype.label;
        /** @type {?} */
        ClassConfig.prototype.dfh_standard_label;
        /** @type {?} */
        ClassConfig.prototype.profileLabels;
        /** @type {?} */
        ClassConfig.prototype.profilePks;
        /** @type {?|undefined} */
        ClassConfig.prototype.projRel;
        /** @type {?|undefined} */
        ClassConfig.prototype.isInProject;
        /** @type {?} */
        ClassConfig.prototype.changingProjRel;
        /** @type {?|undefined} */
        ClassConfig.prototype.subclassOf;
        /** @type {?|undefined} */
        ClassConfig.prototype.subclassOfType;
        /** @type {?} */
        ClassConfig.prototype.scopeNote;
        /** @type {?} */
        ClassConfig.prototype.dfh_identifier_in_namespace;
        /** @type {?|undefined} */
        ClassConfig.prototype.uiContexts;
        /** @type {?|undefined} */
        ClassConfig.prototype.required_by_sources;
        /** @type {?|undefined} */
        ClassConfig.prototype.required_by_entities;
        /** @type {?|undefined} */
        ClassConfig.prototype.required_by_basics;
        /** @type {?|undefined} */
        ClassConfig.prototype.excluded_from_entities;
    }
    /**
     * @record
     */
    function UiContext() { }
    if (false) {
        /** @type {?|undefined} */
        UiContext.prototype.uiElements;
    }
    /**
     * @record
     */
    function UiElement() { }
    if (false) {
        /** @type {?|undefined} */
        UiElement.prototype.fk_property;
        /** @type {?|undefined} */
        UiElement.prototype.property_is_outgoing;
        /** @type {?|undefined} */
        UiElement.prototype.propertyFieldKey;
        /** @type {?|undefined} */
        UiElement.prototype.propSetKey;
        /** @type {?|undefined} */
        UiElement.prototype.fk_class_field;
        /** @type {?|undefined} */
        UiElement.prototype.class_field;
        /** @type {?} */
        UiElement.prototype.ord_num;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/entity-list.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Information = /** @class */ (function () {
        function Information(data) {
            Object.assign(this, data);
        }
        return Information;
    }());
    if (false) {
        /** @type {?} */
        Information.prototype.items;
        /** @type {?} */
        Information.prototype.loading;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/list.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Class of this slice of store
    var   
    // Class of this slice of store
    List = /** @class */ (function () {
        function List(data) {
            Object.assign(this, data);
            if (true) {
            }
            else {
            }
        }
        return List;
    }());
    if (false) {
        /** @type {?} */
        List.prototype.searchString;
        /** @type {?} */
        List.prototype.pkAllowedClasses;
        /** @type {?} */
        List.prototype.collectionSize;
        /** @type {?} */
        List.prototype.items;
        /** @type {?} */
        List.prototype.loading;
        /** @type {?} */
        List.prototype.error;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/loading-bar.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function LoadingBar() { }
    if (false) {
        /** @type {?|undefined} */
        LoadingBar.prototype.loading;
        /** @type {?|undefined} */
        LoadingBar.prototype.progress;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/notifications.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function NotificationsI() { }
    if (false) {
        /** @type {?} */
        NotificationsI.prototype.type;
        /** @type {?} */
        NotificationsI.prototype.options;
    }
    // Class of this slice of store
    var   
    // Class of this slice of store
    Notifications = /** @class */ (function () {
        function Notifications(data) {
            Object.assign(this, data);
        }
        return Notifications;
    }());
    if (false) {
        /** @type {?} */
        Notifications.prototype.type;
        /** @type {?} */
        Notifications.prototype.options;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/projects.model.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IProject() { }
    if (false) {
        /** @type {?} */
        IProject.prototype.record;
    }
    /**
     * @record
     */
    function IProjectList() { }
    if (false) {
        /** @type {?} */
        IProjectList.prototype.records;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/source-list.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Class of this slice of store
    var   
    // Class of this slice of store
    SourceList = /** @class */ (function () {
        function SourceList(data) {
            Object.assign(this, data);
        }
        return SourceList;
    }());
    if (false) {
        /** @type {?} */
        SourceList.prototype.list;
        /** @type {?} */
        SourceList.prototype.loading;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/active-project/entity-detail.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PeItDetailList() { }
    ;
    var EntityDetail = /** @class */ (function () {
        function EntityDetail(data) {
            /**
             * Left Panel Visibility
             */
            // the properties with information about the peIt
            this.showProperties = false;
            // the right area
            this.showRightArea = true;
            /**
             * Right panel
             */
            this.rightPanelTabs = [];
            this.rightPanelActiveTab = 0; // index of the active tab
            // index of the active tab
            // the bar to above the properties
            // showPropertiesHeader?= true;
            // the header with name of peIt
            this.showHeader = true;
            Object.assign(this, data);
        }
        return EntityDetail;
    }());
    if (false) {
        /** @type {?} */
        EntityDetail.prototype.pkEntity;
        /**
         * Left Panel Visibility
         * @type {?}
         */
        EntityDetail.prototype.showProperties;
        /** @type {?} */
        EntityDetail.prototype.showRightArea;
        /**
         * Right panel
         * @type {?}
         */
        EntityDetail.prototype.rightPanelTabs;
        /** @type {?} */
        EntityDetail.prototype.rightPanelActiveTab;
        /** @type {?} */
        EntityDetail.prototype.showHeader;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/active-project/project-settings-data.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Class of this slice of store
    var   
    // Class of this slice of store
    ProjectSettingsData = /** @class */ (function () {
        function ProjectSettingsData(data) {
            Object.assign(this, data);
        }
        return ProjectSettingsData;
    }());
    if (false) {
        /** @type {?} */
        ProjectSettingsData.prototype.items;
        /** @type {?} */
        ProjectSettingsData.prototype.tabTitle;
        /** @type {?} */
        ProjectSettingsData.prototype.loading;
        /** @type {?} */
        ProjectSettingsData.prototype.error;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/active-project/tab-layout.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Class of this slice of store
    var   
    // Class of this slice of store
    TabBase = /** @class */ (function () {
        function TabBase(data) {
            Object.assign(this, data);
        }
        return TabBase;
    }());
    if (false) {
        /** @type {?} */
        TabBase.prototype.pkEntity;
        /** @type {?} */
        TabBase.prototype.tabTitle;
        /** @type {?} */
        TabBase.prototype.tabTooltip;
        /** @type {?} */
        TabBase.prototype.loading;
        /** @type {?} */
        TabBase.prototype.layoutMode;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/active-project/types.models.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Class of this slice of store
    var   
    // Class of this slice of store
    Types = /** @class */ (function () {
        function Types(data) {
            Object.assign(this, data);
        }
        return Types;
    }());
    if (false) {
        /** @type {?} */
        Types.prototype.items;
        /** @type {?} */
        Types.prototype.edit;
        /** @type {?} */
        Types.prototype.loading;
        /** @type {?} */
        Types.prototype.error;
        /** @type {?} */
        Types.prototype.tabTitle;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/models/active-project/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/account.reducers.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE = {
        account: undefined,
        roles: undefined
    };
    /** @type {?} */
    var accountRootReducer = (/**
     * @param {?=} lastState
     * @param {?=} action
     * @return {?}
     */
    function (lastState, action) {
        if (lastState === void 0) { lastState = INITIAL_STATE; }
        switch (action.type) {
            case AccountActions.LOGIN_SUCCEEDED:
                lastState = __assign({}, lastState, { account: action.meta.account });
                break;
            case AccountActions.ACCOUNT_UPDATED:
                lastState = __assign({}, lastState, { account: action.meta.account });
                break;
            case AccountActions.LOAD_ROLES_SUCCEEDED:
                lastState = __assign({}, lastState, { roles: action.meta.accountRoles });
                break;
            case AccountActions.LOAD_ROLES_FAILED:
                lastState = __assign({}, lastState, { roles: [] });
                break;
        }
        return lastState;
    });

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/active-project.reducer.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE$1 = {
        label: '',
        list: '',
        uiIdSerial: 0,
        panelSerial: 0,
        focusedPanel: 0,
        panels: []
    };
    /** @type {?} */
    var activeProjectReducer = (/**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function (state, action) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (state === void 0) { state = INITIAL_STATE$1; }
        /** @type {?} */
        var pi;
        /** @type {?} */
        var ti;
        /** @type {?} */
        var ppi;
        /** @type {?} */
        var cpi;
        /** @type {?} */
        var pti;
        /** @type {?} */
        var cti;
        switch (action.type) {
            /************************************************************************************
             * Load project data (metadata, crm)
            ************************************************************************************/
            case ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED:
                state = __assign({}, state, action.meta.projectPreview);
                break;
            case ActiveProjectActions.LOAD_PROJECT_CONFIG:
                state = __assign({}, state, { loadingConfigData: true });
                break;
            case ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED:
                state = __assign({}, state, { configDataInitialized: true, loadingConfigData: false });
                break;
            /************************************************************************************
             * Layout -- Tabs
            ************************************************************************************/
            case ActiveProjectActions.SET_PANELS:
                state = __assign({}, state, { panels: action.meta.panels, uiIdSerial: action.meta.uiIdSerial, panelSerial: action.meta.panelSerial, focusedPanel: action.meta.focusedPanel });
                break;
            case ActiveProjectActions.SET_LIST_TYPE:
                state = __assign({}, state, { list: action.meta.list });
                break;
            case ActiveProjectActions.ACTIVATE_TAB:
                pi = action.meta.panelIndex;
                ti = action.meta.tabIndex;
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_a = {},
                        _a[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs).map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === ti);
                                return tab;
                            })) }),
                        _a)) });
                break;
            case ActiveProjectActions.MOVE_TAB:
                ppi = action.meta.previousPanelIndex;
                cpi = action.meta.currentPanelIndex;
                pti = action.meta.previousTabIndex;
                cti = action.meta.currentTabIndex;
                if (ppi === cpi) {
                    /** @type {?} */
                    var tabs = __spread(state.panels[cpi].tabs);
                    dragDrop.moveItemInArray(tabs, pti, cti);
                    state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_b = {},
                            _b[cpi] = __assign({}, state.panels[cpi], { tabs: tabs }),
                            _b)) });
                }
                else {
                    /** @type {?} */
                    var pTabs_1 = __spread(state.panels[ppi].tabs);
                    /** @type {?} */
                    var cTabs = __spread(state.panels[cpi].tabs);
                    dragDrop.transferArrayItem(pTabs_1, cTabs, pti, cti);
                    state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_c = {},
                            _c[ppi] = __assign({}, state.panels[ppi], { tabs: pTabs_1.map((/**
                                 * @param {?} tab
                                 * @param {?} index
                                 * @return {?}
                                 */
                                function (tab, index) {
                                    tab.active = (index === (pti < pTabs_1.length ? pti : (pti - 1)));
                                    return tab;
                                })) }),
                            _c[cpi] = __assign({}, state.panels[cpi], { tabs: cTabs.map((/**
                                 * @param {?} tab
                                 * @param {?} index
                                 * @return {?}
                                 */
                                function (tab, index) {
                                    tab.active = (index === cti);
                                    return tab;
                                })) }),
                            _c)) });
                }
                break;
            case ActiveProjectActions.ADD_TAB:
                if (state.panels.length === 0) {
                    state = __assign({}, state, { panels: [
                            {
                                id: state.panelSerial,
                                tabs: []
                            }
                        ], focusedPanel: 0, panelSerial: state.panelSerial + 1 });
                }
                pi = state.focusedPanel;
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_d = {},
                        _d[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs.map((/**
                             * @param {?} t
                             * @return {?}
                             */
                            function (t) {
                                t.active = false;
                                return t;
                            })), [
                                __assign({}, ramda.omit(['pathSegment'], action.meta.tab), { path: ['activeProject', action.meta.tab.pathSegment, state.uiIdSerial.toString()] })
                            ]) }),
                        _d)), uiIdSerial: (state.uiIdSerial + 1) });
                break;
            case ActiveProjectActions.CLOSE_TAB:
                pi = action.meta.panelIndex;
                ti = action.meta.tabIndex;
                // remove the closing tab
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_e = {},
                        _e[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs).filter((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) { return index !== ti; })) }),
                        _e)) });
                // activate a sibling tab, if needed and possible
                if (!state.panels[pi].tabs.find((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return t.active; }))) {
                    state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_f = {},
                            _f[pi] = __assign({}, state.panels[pi], { tabs: __spread(state.panels[pi].tabs).map((/**
                                 * @param {?} tab
                                 * @param {?} index
                                 * @return {?}
                                 */
                                function (tab, index) {
                                    tab.active = (index === (ti < state.panels[pi].tabs.length ? ti : (ti - 1)));
                                    return tab;
                                })) }),
                            _f)) });
                }
                break;
            case ActiveProjectActions.CLOSE_PANEL:
                pi = action.meta.panelIndex;
                /** @type {?} */
                var panels = __spread(state.panels);
                panels.splice(pi, 1);
                state = __assign({}, state, { panels: panels });
                break;
            case ActiveProjectActions.FOCUS_PANEL:
                state = __assign({}, state, { focusedPanel: action.meta.panelIndex });
                break;
            case ActiveProjectActions.SPLIT_PANEL:
                ppi = action.meta.previousPanelIndex;
                ti = action.meta.tabIndex;
                cpi = action.meta.currentPanelIndex;
                /** @type {?} */
                var moveTab = state.panels[ppi].tabs[ti];
                // removes tab from old panel
                state = __assign({}, state, { panels: Object.assign(__spread(state.panels), (_g = {},
                        _g[ppi] = __assign({}, state.panels[ppi], { tabs: __spread(state.panels[ppi].tabs).filter((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) { return index !== ti; }))
                                .map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                if (index === 0)
                                    tab.active = true;
                                return tab;
                            })) }),
                        _g)) });
                // insert a new panel at position of cpi
                /** @type {?} */
                var newPanels = __spread(state.panels);
                newPanels.splice(cpi, 0, {
                    id: state.panelSerial,
                    tabs: [moveTab]
                });
                state = __assign({}, state, { panels: newPanels, panelSerial: state.panelSerial + 1 });
                break;
            case ActiveProjectActions.SET_REFINING_CHUNK:
                state = __assign({}, state, { refiningChunk: action.payload.refiningChunk });
                break;
            case ActiveProjectActions.SET_CREATING_MENTIONING:
                state = __assign({}, state, { creatingMentioning: action.payload.creatingMentioning });
                break;
            /************************************************************************************
            * Highlighting of mentionings in the gui
            ************************************************************************************/
            case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT:
                state = __assign({}, state, { mentioningsFocusedInText: action.payload.mentioningsFocusedInText });
                break;
            case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE:
                state = __assign({}, state, { mentioningsFocusedInTable: action.payload.mentioningsFocusedInTable });
                break;
            /************************************************************************************
             * Destroy the active project state (on closing a project)
            ************************************************************************************/
            case ActiveProjectActions.DESTROY:
                state = INITIAL_STATE$1;
                break;
        }
        return state;
    });

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/entity-list.reducer.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE$2 = new Information();
    /**
     * @param {?=} state
     * @param {?=} a
     * @return {?}
     */
    function informationReducer(state, a) {
        if (state === void 0) { state = INITIAL_STATE$2; }
        /** @type {?} */
        var action = (/** @type {?} */ (a));
        switch (action.type) {
            /*****************************************************
            * Reducers called on destroy of component
            *****************************************************/
            case InformationAPIActions.DESTROY:
                state = {};
                break;
        }
        return state;
    }
    ;

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/loading-bar.reducer.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE$3 = {
        loading: false,
        progress: 0,
    };
    /**
     * @param {?=} state
     * @param {?=} a
     * @return {?}
     */
    function loadingBarReducer(state, a) {
        if (state === void 0) { state = INITIAL_STATE$3; }
        /** @type {?} */
        var action = (/** @type {?} */ (a));
        switch (action.type) {
            case LoadingBarActions.START:
                return __assign({}, state, { loading: true });
            case LoadingBarActions.STOP:
                return __assign({}, state, { loading: false });
            case LoadingBarActions.COPMLETE:
                return __assign({}, state, { loading: false });
        }
        return state;
    }
    ;

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/notifications.reducer.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE$4 = new Notifications();
    /**
     * @param {?=} state
     * @param {?=} a
     * @return {?}
     */
    function notificationsReducer(state, a) {
        if (state === void 0) { state = INITIAL_STATE$4; }
        /** @type {?} */
        var action = (/** @type {?} */ (a));
        switch (action.type) {
        }
        return state;
    }
    ;

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/projects.reducers.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE$5 = {
        records: []
    };
    /** @type {?} */
    var projectListReducer = (/**
     * @param {?=} lastState
     * @param {?=} action
     * @return {?}
     */
    function (lastState, action) {
        if (lastState === void 0) { lastState = INITIAL_STATE$5; }
        switch (action.type) {
            case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return __assign({}, lastState, { records: action.payload.map((/**
                 * @param {?} record
                 * @return {?}
                 */
                function (record) { return ({ record: record }); })) });
        }
        return lastState;
    });
    var ɵ0$7 = projectListReducer;
    /** @type {?} */
    var createProjectsReducer = (/**
     * @return {?}
     */
    function () {
        return projectListReducer;
    });

    /**
     * @fileoverview added by tsickle
     * Generated from: state-gui/reducers/source-list.reducer.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var INITIAL_STATE$6 = new SourceList();
    /**
     * @param {?=} state
     * @param {?=} a
     * @return {?}
     */
    function sourceListReducer(state, a) {
        if (state === void 0) { state = INITIAL_STATE$6; }
        /** @type {?} */
        var action = (/** @type {?} */ (a));
        switch (action.type) {
            case SourceListAPIActions.INITIALIZE_LIST:
                state = __assign({}, state, { list: {
                        pkAllowedClasses: action.meta.pkAllowedClasses
                    } });
                break;
            /*****************************************************
            * Reducers called on destroy of component
            *****************************************************/
            case SourceListAPIActions.DESTROY:
                state = {};
                break;
        }
        return state;
    }
    ;

    exports.AccountActions = AccountActions;
    exports.AccountEpics = AccountEpics;
    exports.ActiveProjectActions = ActiveProjectActions;
    exports.ActiveProjectEpics = ActiveProjectEpics;
    exports.ChunkActionsFactory = ChunkActionsFactory;
    exports.ChunkSlice = ChunkSlice;
    exports.ClassColumnMappingSlice = ClassColumnMappingSlice;
    exports.ColumnActionsFactory = ColumnActionsFactory;
    exports.ColumnSlice = ColumnSlice;
    exports.DatActions = DatActions;
    exports.DfhActions = DfhActions;
    exports.DfhClassActionFactory = DfhClassActionFactory;
    exports.DfhClassSlice = DfhClassSlice;
    exports.DfhLabelActionFactory = DfhLabelActionFactory;
    exports.DfhLabelSlice = DfhLabelSlice;
    exports.DfhProfileActionFactory = DfhProfileActionFactory;
    exports.DfhProfileSlice = DfhProfileSlice;
    exports.DfhPropertyActionFactory = DfhPropertyActionFactory;
    exports.DfhPropertySlice = DfhPropertySlice;
    exports.DigitalActionsFactory = DigitalActionsFactory;
    exports.DigitalSlice = DigitalSlice;
    exports.EntityDetail = EntityDetail;
    exports.InfActions = InfActions;
    exports.InfAppellationSlice = InfAppellationSlice;
    exports.InfDimensionSlice = InfDimensionSlice;
    exports.InfLangStringSlice = InfLangStringSlice;
    exports.InfLanguageSlice = InfLanguageSlice;
    exports.InfPersistentItemActionFactory = InfPersistentItemActionFactory;
    exports.InfPersistentItemSlice = InfPersistentItemSlice;
    exports.InfPlaceSlice = InfPlaceSlice;
    exports.InfStatementActionFactory = InfStatementActionFactory;
    exports.InfStatementSlice = InfStatementSlice;
    exports.InfTemporalEntityActionFactory = InfTemporalEntityActionFactory;
    exports.InfTemporalEntitySlice = InfTemporalEntitySlice;
    exports.InfTextPropertyActionFactory = InfTextPropertyActionFactory;
    exports.InfTextPropertySlice = InfTextPropertySlice;
    exports.InfTimePrimitiveSlice = InfTimePrimitiveSlice;
    exports.Information = Information;
    exports.InformationAPIActions = InformationAPIActions;
    exports.List = List;
    exports.LoadingBarActions = LoadingBarActions;
    exports.LoadingBarEpics = LoadingBarEpics;
    exports.NamespaceSlice = NamespaceSlice;
    exports.Notifications = Notifications;
    exports.NotificationsAPIActions = NotificationsAPIActions;
    exports.NotificationsAPIEpics = NotificationsAPIEpics;
    exports.ProActions = ProActions;
    exports.ProAnalysisActionFactory = ProAnalysisActionFactory;
    exports.ProClassFieldConfigActionFactory = ProClassFieldConfigActionFactory;
    exports.ProDfhClassProjRelActionFactory = ProDfhClassProjRelActionFactory;
    exports.ProDfhProfileProjRelActionFactory = ProDfhProfileProjRelActionFactory;
    exports.ProInfoProjRelActionFactory = ProInfoProjRelActionFactory;
    exports.ProProjectActionFactory = ProProjectActionFactory;
    exports.ProTextPropertyActionFactory = ProTextPropertyActionFactory;
    exports.ProjectSettingsData = ProjectSettingsData;
    exports.ProjectsActions = ProjectsActions;
    exports.SourceList = SourceList;
    exports.SourceListAPIActions = SourceListAPIActions;
    exports.SysActions = SysActions;
    exports.TabActions = TabActions;
    exports.TabBase = TabBase;
    exports.TabCellSlice = TabCellSlice;
    exports.TextPropertySlice = TextPropertySlice;
    exports.Types = Types;
    exports.WarActions = WarActions;
    exports.accountRootReducer = accountRootReducer;
    exports.activeProjectReducer = activeProjectReducer;
    exports.createProjectsReducer = createProjectsReducer;
    exports.informationReducer = informationReducer;
    exports.loadingBarReducer = loadingBarReducer;
    exports.notificationsReducer = notificationsReducer;
    exports.sourceListReducer = sourceListReducer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-redux-src-lib-redux-store.umd.js.map
