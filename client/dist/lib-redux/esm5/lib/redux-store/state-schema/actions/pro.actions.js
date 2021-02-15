/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/pro.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { proRoot } from '../reducer-configs/pro.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
var ProProjectActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ProProjectActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProProjectActionFactory };
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
export function MarkStatementAsFavoriteActionMeta() { }
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
    tslib_1.__extends(ProInfoProjRelActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProInfoProjRelActionFactory };
if (false) {
    /** @type {?} */
    ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE;
    /** @type {?} */
    ProInfoProjRelActionFactory.prototype.markStatementAsFavorite;
    /** @type {?} */
    ProInfoProjRelActionFactory.prototype.ngRedux;
}
var ProDfhClassProjRelActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ProDfhClassProjRelActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProDfhClassProjRelActionFactory };
if (false) {
    /** @type {?} */
    ProDfhClassProjRelActionFactory.OF_PROJECT;
    /** @type {?} */
    ProDfhClassProjRelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProDfhClassProjRelActionFactory.prototype.ngRedux;
}
var ProDfhProfileProjRelActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ProDfhProfileProjRelActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProDfhProfileProjRelActionFactory };
if (false) {
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.OF_PROJECT;
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProDfhProfileProjRelActionFactory.prototype.ngRedux;
}
var ProClassFieldConfigActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ProClassFieldConfigActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProClassFieldConfigActionFactory };
if (false) {
    /** @type {?} */
    ProClassFieldConfigActionFactory.OF_PROJECT;
    /** @type {?} */
    ProClassFieldConfigActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProClassFieldConfigActionFactory.prototype.ngRedux;
}
var ProTextPropertyActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ProTextPropertyActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProTextPropertyActionFactory };
if (false) {
    /** @type {?} */
    ProTextPropertyActionFactory.OF_PROJECT;
    /** @type {?} */
    ProTextPropertyActionFactory.prototype.loadOfProject;
    /** @type {?} */
    ProTextPropertyActionFactory.prototype.ngRedux;
}
var ProAnalysisActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ProAnalysisActionFactory, _super);
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
export { ProAnalysisActionFactory };
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ ProActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ProActions_Factory() { return new ProActions(i0.ɵɵinject(i1.NgRedux)); }, token: ProActions, providedIn: "root" });
    return ProActions;
}());
export { ProActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3Byby5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBd0Usb0JBQW9CLEVBQXFCLE1BQU0sb0NBQW9DLENBQUM7OztBQUtuSztJQUE2QyxtREFBeUM7SUFhcEYsaUNBQW1CLE9BQTJCO1FBQTlDLFlBQWtELGtCQUFNLE9BQU8sQ0FBQyxTQUFFO1FBQS9DLGFBQU8sR0FBUCxPQUFPLENBQW9COztJQUFtQixDQUFDOzs7O0lBRWxFLCtDQUFhOzs7SUFBYjtRQUFBLGlCQTBDQztRQXpDQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLGFBQWE7Ozs7UUFBRyxVQUFDLFNBQWlCOztnQkFDL0IsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2dCQUNyQixNQUFNLEdBQWdEO2dCQUMxRCxJQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLHVCQUF1QixDQUFDLFVBQVU7Z0JBQ3JHLElBQUksRUFBRTtvQkFDSixVQUFVLFlBQUE7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Q0FBZ0MsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDdkYsYUFBUSxHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBRW5CLENBQUM7O2dCQVpwRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXZTUSxPQUFPOzs7cUJBRGhCO0NBb1RDLEFBZEQsSUFjQztTQVhZLFVBQVU7OztJQUNyQiw2QkFBbUU7O0lBQ25FLG1DQUE2RTs7SUFDN0UsbUNBQThFOztJQUM5RSx3Q0FBc0Y7O0lBQ3RGLDBDQUEwRjs7SUFDMUYsd0NBQXVGOztJQUN2Riw4QkFBcUU7O0lBRXpELDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb0NsYXNzRmllbGRDb25maWcsIFByb0RmaENsYXNzUHJvalJlbCwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0luZm9Qcm9qUmVsLCBQcm9Qcm9qZWN0LCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXNTbGljZSwgUHJvSW5mb1Byb2pSZWxTbGljZSB9IGZyb20gJy4uL21vZGVscy9wcm8ubW9kZWxzJztcbmltcG9ydCB7IHByb1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvcHJvLmNvbmZpZyc7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlLCBMb2FkQWN0aW9uTWV0YSwgTG9hZEJ5UGtBbmRWZXJzaW9uQWN0aW9uTWV0YSwgU2NoZW1hQWN0aW9uc0ZhY3RvcnksIFN1Y2NlZWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cblxudHlwZSBQYXlsb2FkID0gUHJvSW5mb1Byb2pSZWxTbGljZTtcblxuZXhwb3J0IGNsYXNzIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgUHJvUHJvamVjdD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9BQ0NPVU5UID0gJ09GX0FDQ09VTlQnO1xuICBzdGF0aWMgcmVhZG9ubHkgTE9BRF9CQVNJQ1MgPSAnTE9BRF9CQVNJQ1MnO1xuXG4gIGxvYWRPZkFjY291bnQ6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UHJvUHJvamVjdD47XG5cbiAgLyoqXG4gICAqIGxvYWRzIHRoZSBQcm9Qcm9qZWN0IGFuZCB0aGUgZGVmYXVsdCBJbmZMYW5ndWFnZVxuICAgKi9cbiAgbG9hZEJhc2ljczogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQcm9Qcm9qZWN0PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IFByb1Byb2plY3RBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMocHJvUm9vdCwgJ3Byb2plY3QnKSlcblxuICAgIHRoaXMubG9hZE9mQWNjb3VudCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeS5PRl9BQ0NPVU5ULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb1Byb2plY3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHRoaXMubG9hZEJhc2ljcyA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeS5MT0FEX0JBU0lDUyxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQcm9Qcm9qZWN0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlQWN0aW9uTWV0YSB7XG4gIGFkZFBlbmRpbmc6IHN0cmluZyxcbiAgcGs6IG51bWJlclxuICBwa1N0YXRlbWVudDogbnVtYmVyXG4gIGlzT3V0Z29pbmc6IGJvb2xlYW5cbn1cbmV4cG9ydCBjbGFzcyBQcm9JbmZvUHJvalJlbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBQcm9JbmZvUHJvalJlbD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBNQVJLX1JPTEVfQVNfRkFWT1JJVEUgPSAnTUFSS19ST0xFX0FTX0ZBVk9SSVRFJztcblxuICBtYXJrU3RhdGVtZW50QXNGYXZvcml0ZTogKHBrUHJvamVjdDogbnVtYmVyLCBwa1N0YXRlbWVudDogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFByb0luZm9Qcm9qUmVsPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IFByb0luZm9Qcm9qUmVsQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKHByb1Jvb3QsICdpbmZvX3Byb2pfcmVsJykpXG5cbiAgICB0aGlzLm1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa1N0YXRlbWVudDogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9JbmZvUHJvalJlbEFjdGlvbkZhY3RvcnkuTUFSS19ST0xFX0FTX0ZBVk9SSVRFLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrU3RhdGVtZW50OiBwa1N0YXRlbWVudCxcbiAgICAgICAgICBpc091dGdvaW5nXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb0luZm9Qcm9qUmVsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFByb0RmaENsYXNzUHJvalJlbD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9QUk9KRUNUID0gJ09GX1BST0pFQ1QnO1xuXG4gIGxvYWRPZlByb2plY3Q6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UHJvRGZoQ2xhc3NQcm9qUmVsPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IFByb0RmaENsYXNzUHJvalJlbEFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhwcm9Sb290LCAnZGZoX2NsYXNzX3Byb2pfcmVsJykpXG5cbiAgICB0aGlzLmxvYWRPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb0RmaENsYXNzUHJvalJlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFByb0RmaFByb2ZpbGVQcm9qUmVsPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9GX1BST0pFQ1QgPSAnT0ZfUFJPSkVDVCc7XG5cbiAgbG9hZE9mUHJvamVjdDogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQcm9EZmhQcm9maWxlUHJvalJlbD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBQcm9EZmhQcm9maWxlUHJvalJlbEFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhwcm9Sb290LCAnZGZoX3Byb2ZpbGVfcHJval9yZWwnKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9EZmhQcm9maWxlUHJvalJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQcm9EZmhQcm9maWxlUHJvalJlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9DbGFzc0ZpZWxkQ29uZmlnQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFByb0NsYXNzRmllbGRDb25maWc+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT0ZfUFJPSkVDVCA9ICdPRl9QUk9KRUNUJztcblxuICBsb2FkT2ZQcm9qZWN0OiAocGtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFByb0NsYXNzRmllbGRDb25maWc+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogUHJvQ2xhc3NGaWVsZENvbmZpZ0FjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhwcm9Sb290LCAnY2xhc3NfZmllbGRfY29uZmlnJykpXG5cbiAgICB0aGlzLmxvYWRPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgUHJvQ2xhc3NGaWVsZENvbmZpZ0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQcm9DbGFzc0ZpZWxkQ29uZmlnPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb1RleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBQcm9UZXh0UHJvcGVydHk+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT0ZfUFJPSkVDVCA9ICdPRl9QUk9KRUNUJztcblxuICBsb2FkT2ZQcm9qZWN0OiAocGtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFByb1RleHRQcm9wZXJ0eT47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBQcm9UZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMocHJvUm9vdCwgJ3RleHRfcHJvcGVydHknKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9UZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UHJvVGV4dFByb3BlcnR5Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFByb0FuYWx5c2lzU2xpY2UsIFByb0FuYWx5c2lzPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IEJZX1BLX0FORF9WRVJTSU9OID0gJ0JZX1BLX0FORF9WRVJTSU9OJztcblxuICBsb2FkQnlJZEFuZFZlcnNpb246IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlciwgdmVyc2lvbjogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFByb0FuYWx5c2lzPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKHByb1Jvb3QsICdhbmFseXNpcycpKVxuXG4gICAgdGhpcy5sb2FkQnlJZEFuZFZlcnNpb24gPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIsIHZlcnNpb246IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQnlQa0FuZFZlcnNpb25BY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeS5CWV9QS19BTkRfVkVSU0lPTixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa0VudGl0eSxcbiAgICAgICAgICB2ZXJzaW9uXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb0FuYWx5c2lzPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByb0FjdGlvbnMge1xuICBwcm9qZWN0ID0gbmV3IFByb1Byb2plY3RBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIGluZm9fcHJval9yZWwgPSBuZXcgUHJvSW5mb1Byb2pSZWxBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgUHJvVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuICBkZmhfY2xhc3NfcHJval9yZWwgPSBuZXcgUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuICBkZmhfcHJvZmlsZV9wcm9qX3JlbCA9IG5ldyBQcm9EZmhQcm9maWxlUHJvalJlbEFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcbiAgY2xhc3NfZmllbGRfY29uZmlnID0gbmV3IFByb0NsYXNzRmllbGRDb25maWdBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIGFuYWx5c2lzID0gbmV3IFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=