/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/inf.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { infRoot } from '../reducer-configs/inf.config';
import { InfActionFactory } from '../_helpers/inf-action-factory';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
/**
 * @record
 */
export function LoadByPkMeta() { }
if (false) {
    /** @type {?} */
    LoadByPkMeta.prototype.pkEntity;
}
;
/**
 * @record
 */
export function LoadTypeOfProjectAction() { }
if (false) {
    /** @type {?} */
    LoadTypeOfProjectAction.prototype.pkEntity;
}
;
var InfPersistentItemActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(InfPersistentItemActionFactory, _super);
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
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
                meta: { addPending: addPending, pk: pkProject, pkEntity: pkEntity },
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
        this.typesOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
                meta: { addPending: addPending, pk: pkProject },
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
export { InfPersistentItemActionFactory };
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
export function PaginatedStatementList() { }
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
export function LoadPaginatedStatementListMeta() { }
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
    tslib_1.__extends(InfTemporalEntityActionFactory, _super);
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
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
                meta: { addPending: addPending, pk: pkProject, pkEntity: pkEntity },
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
            var addPending = U.uuid();
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
    InfTemporalEntityActionFactory.OWN_PROPERTIES = 'OWN_PROPERTIES';
    InfTemporalEntityActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
    InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';
    return InfTemporalEntityActionFactory;
}(InfActionFactory));
export { InfTemporalEntityActionFactory };
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
export function FindStatementByParams() { }
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
export function ContentTreeMeta() { }
if (false) {
    /** @type {?} */
    ContentTreeMeta.prototype.pkExpressionEntity;
}
/**
 * @record
 */
export function SourcesAndDigitalsOfEntity() { }
if (false) {
    /** @type {?} */
    SourcesAndDigitalsOfEntity.prototype.ofProject;
    /** @type {?} */
    SourcesAndDigitalsOfEntity.prototype.pkEntity;
}
/**
 * @record
 */
export function SourcesAndDigitalsOfEntityResult() { }
if (false) {
    /** @type {?} */
    SourcesAndDigitalsOfEntityResult.prototype.statements;
    /** @type {?} */
    SourcesAndDigitalsOfEntityResult.prototype.digitals;
}
/**
 * @record
 */
export function LoadOutgoingAlternativeStatements() { }
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
export function LoadIngoingAlternativeStatements() { }
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
export function AddToProjectWithTeEntActionMeta() { }
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
    tslib_1.__extends(InfStatementActionFactory, _super);
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
                    addPending: U.uuid(),
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
            var addPending = U.uuid();
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
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
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
            var addPending = U.uuid();
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
    // static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
    InfStatementActionFactory.ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';
    // static readonly ADD_TO_PROJECT_WITH_TE_EN = 'ADD_TO_PROJECT_WITH_TE_EN';
    InfStatementActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
    InfStatementActionFactory.CONTENT_TREE = 'CONTENT_TREE';
    InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
    InfStatementActionFactory.BY_PARAMS = 'BY_PARAMS';
    return InfStatementActionFactory;
}(InfActionFactory));
export { InfStatementActionFactory };
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
export function LoadAlternativeTextProperties() { }
if (false) {
    /** @type {?} */
    LoadAlternativeTextProperties.prototype.fkEntity;
    /** @type {?} */
    LoadAlternativeTextProperties.prototype.fkClassField;
}
;
var InfTextPropertyActionFactory = /** @class */ (function (_super) {
    tslib_1.__extends(InfTextPropertyActionFactory, _super);
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
            var addPending = U.uuid();
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
    InfTextPropertyActionFactory.ALTERNATIVES = 'ALTERNATIVES';
    return InfTextPropertyActionFactory;
}(InfActionFactory));
export { InfTextPropertyActionFactory };
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InfActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ InfActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function InfActions_Factory() { return new InfActions(i0.ɵɵinject(i1.NgRedux)); }, token: InfActions, providedIn: "root" });
    return InfActions;
}());
export { InfActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2luZi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBMEMsb0JBQW9CLEVBQXFCLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQU1ySSxrQ0FBeUU7OztJQUFsQixnQ0FBZ0I7O0FBQUUsQ0FBQzs7OztBQUUxRSw2Q0FBb0Y7OztJQUFsQiwyQ0FBZ0I7O0FBQUUsQ0FBQztBQUdyRjtJQUFvRCwwREFBNEM7SUFZOUYsMEdBQTBHO0lBRTFHLHdDQUFtQixPQUEyQjtRQUE5QyxZQUFrRCxrQkFBTSxPQUFPLENBQUMsU0FBRTtRQUEvQyxhQUFPLEdBQVAsT0FBTyxDQUFvQjs7SUFBbUIsQ0FBQzs7OztJQUVsRSxzREFBYTs7O0lBQWI7UUFBQSxpQkFtRUM7UUFsRUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7UUFFdEUscUVBQXFFO1FBQ3JFLGlDQUFpQztRQUNqQyxnRUFBZ0U7UUFDaEUsc0hBQXNIO1FBQ3RILHFEQUFxRDtRQUNyRCxxQkFBcUI7UUFDckIsT0FBTztR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Q3ZILGlDQUFzSDs7SUFDdEgsK0JBQTJIOztJQUMzSCwyQkFBcUc7O0lBQ3JHLG9DQUErSDs7SUFDL0gsbUNBQThFOztJQUVsRSw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXREaWdpdGFsLCBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlLCBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBJbmZEaW1lbnNpb25TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSB9IGZyb20gJy4uL21vZGVscy9pbmYubW9kZWxzJztcbmltcG9ydCB7IGluZlJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvaW5mLmNvbmZpZyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvaW5mLWFjdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuXG5cbnR5cGUgUGF5bG9hZCA9IEluZlBlcnNpc3RlbnRJdGVtU2xpY2U7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEJ5UGtNZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0VudGl0eTogbnVtYmVyIH07XG5leHBvcnQgdHlwZSBMb2FkVHlwZXNPZlByb2plY3RBY3Rpb24gPSBMb2FkQWN0aW9uTWV0YTtcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZFR5cGVPZlByb2plY3RBY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRW50aXR5OiBudW1iZXIgfTtcbnR5cGUgTG9hZE5lc3RldGVkUGVJdFJlc3VsdCA9IEluZlBlcnNpc3RlbnRJdGVtW11cblxuZXhwb3J0IGNsYXNzIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSBleHRlbmRzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgSW5mUGVyc2lzdGVudEl0ZW0+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgTkVTVEVEX0JZX1BLID0gJ05FU1RFRF9CWV9QSyc7XG4gIHN0YXRpYyByZWFkb25seSBNSU5JTUFMX0JZX1BLID0gJ01JTklNQUxfQllfUEsnO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRVNfT0ZfUFJPSkVDVCA9ICdUWVBFU19PRl9QUk9KRUNUJztcbiAgc3RhdGljIHJlYWRvbmx5IFRZUEVfT0ZfUFJPSkVDVCA9ICdUWVBFX09GX1BST0pFQ1QnO1xuXG4gIGxvYWRNaW5pbWFsOiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PjtcbiAgbG9hZE5lc3RlZE9iamVjdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPExvYWROZXN0ZXRlZFBlSXRSZXN1bHQ+O1xuXG4gIHR5cGVzT2ZQcm9qZWN0OiAocGtQcm9qZWN0OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TG9hZEFjdGlvbk1ldGE+O1xuICAvLyB0eXBlT2ZQcm9qZWN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TG9hZE5lc3RldGVkUGVJdFJlc3VsdD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVJbmZBY3Rpb25zKGluZlJvb3QsICdwZXJzaXN0ZW50X2l0ZW0nKSlcblxuICAgIC8vIHRoaXMubG9hZE5lc3RlZE9iamVjdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4ge1xuICAgIC8vICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpO1xuICAgIC8vICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEJ5UGtNZXRhPiA9IHtcbiAgICAvLyAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5ORVNURURfQllfUEssXG4gICAgLy8gICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAvLyAgIH07XG4gICAgLy8gICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIC8vICAgcmV0dXJuIHtcbiAgICAvLyAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgIC8vICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TG9hZE5lc3RldGVkUGVJdFJlc3VsdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAvLyAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgLy8gICB9O1xuICAgIC8vIH1cbiAgICB0aGlzLmxvYWRNaW5pbWFsID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQnlQa01ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5Lk1JTklNQUxfQllfUEssXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8U2NoZW1hT2JqZWN0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICB0aGlzLnR5cGVzT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRUeXBlc09mUHJvamVjdEFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuVFlQRVNfT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0IH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPExvYWRBY3Rpb25NZXRhPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICAvLyB0aGlzLnR5cGVPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IHtcbiAgICAvLyAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcblxuICAgIC8vICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFR5cGVPZlByb2plY3RBY3Rpb24+ID0ge1xuICAgIC8vICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVfT0ZfUFJPSkVDVCxcbiAgICAvLyAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0LCBwa0VudGl0eSB9LFxuICAgIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAgIC8vICAgfTtcbiAgICAvLyAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgLy8gICByZXR1cm4ge1xuICAgIC8vICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgLy8gICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxMb2FkTmVzdGV0ZWRQZUl0UmVzdWx0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgIC8vICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAvLyAgIH07XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuZXhwb3J0IHR5cGUgUGFnaW5hdGVkU3RhdGVtZW50cyA9IG51bWJlcltdXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRlZFN0YXRlbWVudExpc3Qge1xuICBjb3VudDogbnVtYmVyLFxuICBzY2hlbWFzOiBTY2hlbWFPYmplY3QsXG4gIHBhZ2luYXRlZFN0YXRlbWVudHM6IFBhZ2luYXRlZFN0YXRlbWVudHNcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICBwa1NvdXJjZUVudGl0eTogbnVtYmVyIC8vIFBrIG9mIHRoZSBzb3VyY2UgZW50aXR5LlxuICBwa1Byb3BlcnR5OiBudW1iZXIgLy8gUGsgb2YgdGhlIHByb3BlcnR5LlxuICBma1RhcmdldENsYXNzOiBudW1iZXIgLy8gUGsgb2YgdGhlIHRhcmdldCBjbGFzcy5cbiAgaXNPdXRnb2luZzogYm9vbGVhbiAvLyBJZiB0cnVlLCB0aGUgc291cmNlIGVudGl0eSBpcyBkb21haW4sIGVsc2UgcmFuZ2UuXG4gIGxpbWl0OiBudW1iZXIgLy8gbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuICBvZmZzZXQ6IG51bWJlciAvLyBvZmZzZXQuXG4gIGFsdGVybmF0aXZlczogYm9vbGVhblxufVxuZXhwb3J0IGNsYXNzIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSBleHRlbmRzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgSW5mVGVtcG9yYWxFbnRpdHk+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT1dOX1BST1BFUlRJRVMgPSAnT1dOX1BST1BFUlRJRVMnO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFHSU5BVEVEX0xJU1QgPSAnUEFHSU5BVEVEX0xJU1QnO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QgPSAnUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QnO1xuXG4gIGxvYWROZXN0ZWRPYmplY3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxJbmZUZW1wb3JhbEVudGl0eVtdPjtcbiAgbG9hZFBhZ2luYXRlZExpc3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+O1xuICBsb2FkUGFnaW5hdGVkQWx0ZXJuYXRpdmVMaXN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUluZkFjdGlvbnMoaW5mUm9vdCwgJ3RlbXBvcmFsX2VudGl0eScpKVxuXG4gICAgdGhpcy5sb2FkTmVzdGVkT2JqZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRCeVBrTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuT1dOX1BST1BFUlRJRVMsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8SW5mVGVtcG9yYWxFbnRpdHlbXT4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgdGhpcy5sb2FkUGFnaW5hdGVkTGlzdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0xJU1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtTb3VyY2VFbnRpdHksXG4gICAgICAgICAgZmtUYXJnZXRDbGFzcyxcbiAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgbGltaXQsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIGFsdGVybmF0aXZlczogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLmxvYWRQYWdpbmF0ZWRBbHRlcm5hdGl2ZUxpc3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9BTFRFUk5BVElWRV9MSVNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrU291cmNlRW50aXR5LFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgZmtUYXJnZXRDbGFzcyxcbiAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBhbHRlcm5hdGl2ZXM6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuZXhwb3J0IGludGVyZmFjZSBGaW5kU3RhdGVtZW50QnlQYXJhbXMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7XG4gIG9mUHJvamVjdDogYm9vbGVhbixcbiAgcGtFbnRpdHk6IG51bWJlcixcbiAgcGtJbmZvUmFuZ2U6IG51bWJlcixcbiAgcGtJbmZvRG9tYWluOiBudW1iZXIsXG4gIHBrUHJvcGVydHk6IG51bWJlcixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGVudFRyZWVNZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICBwa0V4cHJlc3Npb25FbnRpdHk6IG51bWJlcixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHkgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7XG4gIG9mUHJvamVjdDogYm9vbGVhbixcbiAgcGtFbnRpdHk6IG51bWJlcixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQge1xuICBzdGF0ZW1lbnRzOiBJbmZTdGF0ZW1lbnRbXSxcbiAgZGlnaXRhbHM6IERhdERpZ2l0YWxbXSxcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRPdXRnb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cyBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtUZW1wb3JhbEVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIgfTtcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEluZ29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciB9O1xuZXhwb3J0IGludGVyZmFjZSBBZGRUb1Byb2plY3RXaXRoVGVFbnRBY3Rpb25NZXRhIHsgcGtTdGF0ZW1lbnRzOiBudW1iZXJbXSwgcGs6IG51bWJlciwgYWRkUGVuZGluZzogc3RyaW5nIH07XG5cbmV4cG9ydCBjbGFzcyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5IGV4dGVuZHMgSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBJbmZTdGF0ZW1lbnQ+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgQUxURVJOQVRJVkVTX09VVEdPSU5HID0gJ0FMVEVSTkFUSVZFU19PVVRHT0lORyc7XG4gIHN0YXRpYyByZWFkb25seSBBTFRFUk5BVElWRVNfSU5HT0lORyA9ICdBTFRFUk5BVElWRVNfSU5HT0lORyc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBBRERfVE9fUFJPSkVDVF9XSVRIX1RFX0VOID0gJ0FERF9UT19QUk9KRUNUX1dJVEhfVEVfRU4nO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFHSU5BVEVEX0xJU1QgPSAnUEFHSU5BVEVEX0xJU1QnO1xuICBzdGF0aWMgcmVhZG9ubHkgQ09OVEVOVF9UUkVFID0gJ0NPTlRFTlRfVFJFRSc7XG4gIHN0YXRpYyByZWFkb25seSBTT1VSQ0VTX0FORF9ESUdJVEFMU19PRl9FTlRJVFkgPSAnU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZJztcbiAgc3RhdGljIHJlYWRvbmx5IEJZX1BBUkFNUyA9ICdCWV9QQVJBTVMnO1xuXG4gIGxvYWRJbmdvaW5nQWx0ZXJuYXRpdmVzOiAocGtFbnRpdHksIHBrUHJvcGVydHksIHBrUHJvamVjKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPEluZlN0YXRlbWVudD47XG4gIGxvYWRQYWdpbmF0ZWRMaXN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0PjtcblxuICAvLyBjb250ZW50VHJlZTogKHBrUHJvamVjdDogbnVtYmVyLCBwa0V4cHJlc3Npb25FbnRpdHk6IG51bWJlcikgPT4gdm9pZDtcbiAgc291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHk6IChvZlByb2plY3Q6IGJvb2xlYW4sIHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5UmVzdWx0PjtcbiAgZmluZEJ5UGFyYW1zOiAoXG4gICAgb2ZQcm9qZWN0OiBib29sZWFuLFxuICAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAgIHBrRW50aXR5OiBudW1iZXIsXG4gICAgcGtJbmZvUmFuZ2U6IG51bWJlcixcbiAgICBwa0luZm9Eb21haW46IG51bWJlcixcbiAgICBwa1Byb3BlcnR5OiBudW1iZXIsXG4gICkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IEluZlN0YXRlbWVudEFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVJbmZBY3Rpb25zKGluZlJvb3QsICdzdGF0ZW1lbnQnKSlcblxuICAgIHRoaXMuZmluZEJ5UGFyYW1zID0gKFxuICAgICAgb2ZQcm9qZWN0OiBib29sZWFuLFxuICAgICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gICAgICBwa0VudGl0eTogbnVtYmVyLFxuICAgICAgcGtJbmZvUmFuZ2U6IG51bWJlcixcbiAgICAgIHBrSW5mb0RvbWFpbjogbnVtYmVyLFxuICAgICAgcGtQcm9wZXJ0eTogbnVtYmVyLFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgRmluZFN0YXRlbWVudEJ5UGFyYW1zPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuQllfUEFSQU1TLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZzogVS51dWlkKCksXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBvZlByb2plY3QsXG4gICAgICAgICAgcGtFbnRpdHksXG4gICAgICAgICAgcGtJbmZvUmFuZ2UsXG4gICAgICAgICAgcGtJbmZvRG9tYWluLFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cblxuICAgIHRoaXMubG9hZEluZ29pbmdBbHRlcm5hdGl2ZXMgPSAocGtFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkSW5nb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cz4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFU19JTkdPSU5HLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrRW50aXR5LFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPEluZlN0YXRlbWVudD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgdGhpcy5sb2FkUGFnaW5hdGVkTGlzdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrU291cmNlRW50aXR5LFxuICAgICAgICAgIGZrVGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBhbHRlcm5hdGl2ZXM6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICogR2V0IGFuIG5lc3RlZCBvYmplY3Qgd2l0aCBldmVyeXRoaW5nIG5lZWRlZCB0byBkaXNwbGF5IHRoZVxuICAgICogbGlua3MgbWFkZSBmcm9tIGFuIGVudGl0eSB0b3dhcmRzIHNvdXJjZXMgYW5kIGRpZ2l0YWxzLlxuICAgICovXG4gICAgdGhpcy5zb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eSA9IChvZlByb2plY3Q6IGJvb2xlYW4sIHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5PiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBvZlByb2plY3QsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa0VudGl0eVxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IGZrRW50aXR5OiBudW1iZXIsIGZrQ2xhc3NGaWVsZDogbnVtYmVyIH07XG5cbmV4cG9ydCBjbGFzcyBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5IGV4dGVuZHMgSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBJbmZUZXh0UHJvcGVydHk+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQUxURVJOQVRJVkVTID0gJ0FMVEVSTkFUSVZFUyc7XG5cbiAgbG9hZEFsdGVybmF0aXZlczogKGZrRW50aXR5LCBma0NsYXNzRmllbGQsIGZrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxJbmZUZXh0UHJvcGVydHk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUluZkFjdGlvbnMoaW5mUm9vdCwgJ3RleHRfcHJvcGVydHknKSlcblxuICAgIHRoaXMubG9hZEFsdGVybmF0aXZlcyA9IChma0VudGl0eTogbnVtYmVyLCBma0NsYXNzRmllbGQ6IG51bWJlciwgcGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXM+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVMsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgZmtFbnRpdHksXG4gICAgICAgICAgZmtDbGFzc0ZpZWxkLFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxJbmZUZXh0UHJvcGVydHk+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSW5mQWN0aW9ucyB7XG5cbiAgcGVyc2lzdGVudF9pdGVtID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcbiAgdGVtcG9yYWxfZW50aXR5ID0gbmV3IEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuICBzdGF0ZW1lbnQgPSBuZXcgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIC8vIFRPRE86IHBpbXAgdGhvc2UgdXAgdG8gcmVhbCBJbmYgQWN0aW9ucyFcbiAgbGFuZ3VhZ2UgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mTGFuZ3VhZ2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ2xhbmd1YWdlJylcbiAgYXBwZWxsYXRpb24gPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mQXBwZWxsYXRpb24+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ2FwcGVsbGF0aW9uJylcbiAgbGFuZ19zdHJpbmcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mTGFuZ1N0cmluZz4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAnbGFuZ19zdHJpbmcnKVxuICBkaW1lbnNpb24gPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8SW5mRGltZW5zaW9uU2xpY2UsIEluZkRpbWVuc2lvbj4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAnZGltZW5zaW9uJylcbiAgcGxhY2UgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mUGxhY2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ3BsYWNlJylcbiAgdGltZV9wcmltaXRpdmUgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mVGltZVByaW1pdGl2ZT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAndGltZV9wcmltaXRpdmUnKVxuICB0ZXh0X3Byb3BlcnR5ID0gbmV3IEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19