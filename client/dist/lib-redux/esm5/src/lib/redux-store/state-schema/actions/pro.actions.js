/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/pro.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { proRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
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
        { type: Injectable }
    ];
    /** @nocollapse */
    ProActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9wcm8uYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQTBDLG9CQUFvQixFQUFtRCxNQUFNLG9DQUFvQyxDQUFDO0FBS25LO0lBQTZDLG1EQUF5QztJQWFwRixpQ0FBbUIsT0FBMkI7UUFBOUMsWUFBa0Qsa0JBQU0sT0FBTyxDQUFDLFNBQUU7UUFBL0MsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7O0lBQW1CLENBQUM7Ozs7SUFFbEUsK0NBQWE7OztJQUFiO1FBQUEsaUJBMENDO1FBekNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUUvRCxJQUFJLENBQUMsYUFBYTs7OztRQUFHLFVBQUMsU0FBaUI7O2dCQUMvQixVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7Z0JBQ3JCLE1BQU0sR0FBZ0Q7Z0JBQzFELElBQUksRUFBRSxLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsdUJBQXVCLENBQUMsVUFBVTtnQkFDckcsSUFBSSxFQUFFO29CQUNKLFVBQVUsWUFB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LGdDQUFnQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUN2RixhQUFRLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7SUFFbkIsQ0FBQzs7Z0JBVnBELFVBQVU7Ozs7Z0JBclNGLE9BQU87O0lBaVRoQixpQkFBQztDQUFBLEFBWkQsSUFZQztTQVhZLFVBQVU7OztJQUNyQiw2QkFBbUU7O0lBQ25FLG1DQUE2RTs7SUFDN0UsbUNBQThFOztJQUM5RSx3Q0FBc0Y7O0lBQ3RGLDBDQUEwRjs7SUFDMUYsd0NBQXVGOztJQUN2Riw4QkFBcUU7O0lBRXpELDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb0NsYXNzRmllbGRDb25maWcsIFByb0RmaENsYXNzUHJvalJlbCwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0luZm9Qcm9qUmVsLCBQcm9Qcm9qZWN0LCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXNTbGljZSwgUHJvSW5mb1Byb2pSZWxTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBwcm9Sb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzJztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEsIExvYWRCeVBrQW5kVmVyc2lvbkFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuXG50eXBlIFBheWxvYWQgPSBQcm9JbmZvUHJvalJlbFNsaWNlO1xuXG5leHBvcnQgY2xhc3MgUHJvUHJvamVjdEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBQcm9Qcm9qZWN0PiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9GX0FDQ09VTlQgPSAnT0ZfQUNDT1VOVCc7XG4gIHN0YXRpYyByZWFkb25seSBMT0FEX0JBU0lDUyA9ICdMT0FEX0JBU0lDUyc7XG5cbiAgbG9hZE9mQWNjb3VudDogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQcm9Qcm9qZWN0PjtcblxuICAvKipcbiAgICogbG9hZHMgdGhlIFByb1Byb2plY3QgYW5kIHRoZSBkZWZhdWx0IEluZkxhbmd1YWdlXG4gICAqL1xuICBsb2FkQmFzaWNzOiAocGtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFByb1Byb2plY3Q+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogUHJvUHJvamVjdEFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhwcm9Sb290LCAncHJvamVjdCcpKVxuXG4gICAgdGhpcy5sb2FkT2ZBY2NvdW50ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5Lk9GX0FDQ09VTlQsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UHJvUHJvamVjdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgdGhpcy5sb2FkQmFzaWNzID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5LkxPQURfQkFTSUNTLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb1Byb2plY3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFya1N0YXRlbWVudEFzRmF2b3JpdGVBY3Rpb25NZXRhIHtcbiAgYWRkUGVuZGluZzogc3RyaW5nLFxuICBwazogbnVtYmVyXG4gIHBrU3RhdGVtZW50OiBudW1iZXJcbiAgaXNPdXRnb2luZzogYm9vbGVhblxufVxuZXhwb3J0IGNsYXNzIFByb0luZm9Qcm9qUmVsQWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFByb0luZm9Qcm9qUmVsPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE1BUktfUk9MRV9BU19GQVZPUklURSA9ICdNQVJLX1JPTEVfQVNfRkFWT1JJVEUnO1xuXG4gIG1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlOiAocGtQcm9qZWN0OiBudW1iZXIsIHBrU3RhdGVtZW50OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UHJvSW5mb1Byb2pSZWw+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogUHJvSW5mb1Byb2pSZWxBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMocHJvUm9vdCwgJ2luZm9fcHJval9yZWwnKSlcblxuICAgIHRoaXMubWFya1N0YXRlbWVudEFzRmF2b3JpdGUgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrU3RhdGVtZW50OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWFya1N0YXRlbWVudEFzRmF2b3JpdGVBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIFByb0luZm9Qcm9qUmVsQWN0aW9uRmFjdG9yeS5NQVJLX1JPTEVfQVNfRkFWT1JJVEUsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtTdGF0ZW1lbnQ6IHBrU3RhdGVtZW50LFxuICAgICAgICAgIGlzT3V0Z29pbmdcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UHJvSW5mb1Byb2pSZWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBQcm9EZmhDbGFzc1Byb2pSZWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgUHJvRGZoQ2xhc3NQcm9qUmVsPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9GX1BST0pFQ1QgPSAnT0ZfUFJPSkVDVCc7XG5cbiAgbG9hZE9mUHJvamVjdDogKHBrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQcm9EZmhDbGFzc1Byb2pSZWw+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKHByb1Jvb3QsICdkZmhfY2xhc3NfcHJval9yZWwnKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9EZmhDbGFzc1Byb2pSZWxBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3RcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UHJvRGZoQ2xhc3NQcm9qUmVsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJvRGZoUHJvZmlsZVByb2pSZWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgUHJvRGZoUHJvZmlsZVByb2pSZWw+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT0ZfUFJPSkVDVCA9ICdPRl9QUk9KRUNUJztcblxuICBsb2FkT2ZQcm9qZWN0OiAocGtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFByb0RmaFByb2ZpbGVQcm9qUmVsPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKHByb1Jvb3QsICdkZmhfcHJvZmlsZV9wcm9qX3JlbCcpKVxuXG4gICAgdGhpcy5sb2FkT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb0RmaFByb2ZpbGVQcm9qUmVsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb0NsYXNzRmllbGRDb25maWdBY3Rpb25GYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgUHJvQ2xhc3NGaWVsZENvbmZpZz4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9QUk9KRUNUID0gJ09GX1BST0pFQ1QnO1xuXG4gIGxvYWRPZlByb2plY3Q6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UHJvQ2xhc3NGaWVsZENvbmZpZz47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKHByb1Jvb3QsICdjbGFzc19maWVsZF9jb25maWcnKSlcblxuICAgIHRoaXMubG9hZE9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBQcm9DbGFzc0ZpZWxkQ29uZmlnQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFByb0NsYXNzRmllbGRDb25maWc+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIFByb1RleHRQcm9wZXJ0eT4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPRl9QUk9KRUNUID0gJ09GX1BST0pFQ1QnO1xuXG4gIGxvYWRPZlByb2plY3Q6IChwa1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UHJvVGV4dFByb3BlcnR5PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IFByb1RleHRQcm9wZXJ0eUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhwcm9Sb290LCAndGV4dF9wcm9wZXJ0eScpKVxuXG4gICAgdGhpcy5sb2FkT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIFByb1RleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQcm9UZXh0UHJvcGVydHk+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvQW5hbHlzaXNBY3Rpb25GYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UHJvQW5hbHlzaXNTbGljZSwgUHJvQW5hbHlzaXM+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQllfUEtfQU5EX1ZFUlNJT04gPSAnQllfUEtfQU5EX1ZFUlNJT04nO1xuXG4gIGxvYWRCeUlkQW5kVmVyc2lvbjogKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyLCB2ZXJzaW9uOiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UHJvQW5hbHlzaXM+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogUHJvQW5hbHlzaXNBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMocHJvUm9vdCwgJ2FuYWx5c2lzJykpXG5cbiAgICB0aGlzLmxvYWRCeUlkQW5kVmVyc2lvbiA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlciwgdmVyc2lvbjogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRCeVBrQW5kVmVyc2lvbkFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgUHJvQW5hbHlzaXNBY3Rpb25GYWN0b3J5LkJZX1BLX0FORF9WRVJTSU9OLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrRW50aXR5LFxuICAgICAgICAgIHZlcnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UHJvQW5hbHlzaXM+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb0FjdGlvbnMge1xuICBwcm9qZWN0ID0gbmV3IFByb1Byb2plY3RBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIGluZm9fcHJval9yZWwgPSBuZXcgUHJvSW5mb1Byb2pSZWxBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgUHJvVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuICBkZmhfY2xhc3NfcHJval9yZWwgPSBuZXcgUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuICBkZmhfcHJvZmlsZV9wcm9qX3JlbCA9IG5ldyBQcm9EZmhQcm9maWxlUHJvalJlbEFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcbiAgY2xhc3NfZmllbGRfY29uZmlnID0gbmV3IFByb0NsYXNzRmllbGRDb25maWdBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIGFuYWx5c2lzID0gbmV3IFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=