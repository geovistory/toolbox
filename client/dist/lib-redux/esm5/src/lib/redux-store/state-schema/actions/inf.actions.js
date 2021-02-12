/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/inf.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { infRoot } from '../reducer-configs';
import { InfActionFactory } from '../_helpers/inf-action-factory';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
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
        { type: Injectable }
    ];
    /** @nocollapse */
    InfActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9pbmYuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQTBDLG9CQUFvQixFQUFxQixNQUFNLG9DQUFvQyxDQUFDOzs7O0FBTXJJLGtDQUF5RTs7O0lBQWxCLGdDQUFnQjs7QUFBRSxDQUFDOzs7O0FBRTFFLDZDQUFvRjs7O0lBQWxCLDJDQUFnQjs7QUFBRSxDQUFDO0FBR3JGO0lBQW9ELDBEQUE0QztJQVk5RiwwR0FBMEc7SUFFMUcsd0NBQW1CLE9BQTJCO1FBQTlDLFlBQWtELGtCQUFNLE9BQU8sQ0FBQyxTQUFFO1FBQS9DLGFBQU8sR0FBUCxPQUFPLENBQW9COztJQUFtQixDQUFDOzs7O0lBRWxFLHNEQUFhOzs7SUFBYjtRQUFBLGlCQW1FQztRQWxFQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUV0RSxxRUFBcUU7UUFDckUsaUNBQWlDO1FBQ2pDLGdFQUFnRTtRQUNoRSxzSEFBc0g7UUFDdEgscURBQXFEO1FBQ3JELHFCQUFxQjtRQUNyQixPQUFP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QUMzSCwyQkFBcUc7O0lBQ3JHLG9DQUErSDs7SUFDL0gsbUNBQThFOztJQUVsRSw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXREaWdpdGFsLCBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlLCBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBJbmZEaW1lbnNpb25TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBpbmZSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzJztcbmltcG9ydCB7IEluZkFjdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9pbmYtYWN0aW9uLWZhY3RvcnknO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZSwgTG9hZEFjdGlvbk1ldGEsIFNjaGVtYUFjdGlvbnNGYWN0b3J5LCBTdWNjZWVkQWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5cblxudHlwZSBQYXlsb2FkID0gSW5mUGVyc2lzdGVudEl0ZW1TbGljZTtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQnlQa01ldGEgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRW50aXR5OiBudW1iZXIgfTtcbmV4cG9ydCB0eXBlIExvYWRUeXBlc09mUHJvamVjdEFjdGlvbiA9IExvYWRBY3Rpb25NZXRhO1xuZXhwb3J0IGludGVyZmFjZSBMb2FkVHlwZU9mUHJvamVjdEFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtFbnRpdHk6IG51bWJlciB9O1xudHlwZSBMb2FkTmVzdGV0ZWRQZUl0UmVzdWx0ID0gSW5mUGVyc2lzdGVudEl0ZW1bXVxuXG5leHBvcnQgY2xhc3MgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5IGV4dGVuZHMgSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBJbmZQZXJzaXN0ZW50SXRlbT4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIC8vIHN0YXRpYyByZWFkb25seSBORVNURURfQllfUEsgPSAnTkVTVEVEX0JZX1BLJztcbiAgc3RhdGljIHJlYWRvbmx5IE1JTklNQUxfQllfUEsgPSAnTUlOSU1BTF9CWV9QSyc7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFU19PRl9QUk9KRUNUID0gJ1RZUEVTX09GX1BST0pFQ1QnO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRV9PRl9QUk9KRUNUID0gJ1RZUEVfT0ZfUFJPSkVDVCc7XG5cbiAgbG9hZE1pbmltYWw6IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxTY2hlbWFPYmplY3Q+O1xuICBsb2FkTmVzdGVkT2JqZWN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TG9hZE5lc3RldGVkUGVJdFJlc3VsdD47XG5cbiAgdHlwZXNPZlByb2plY3Q6IChwa1Byb2plY3Q6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxMb2FkQWN0aW9uTWV0YT47XG4gIC8vIHR5cGVPZlByb2plY3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxMb2FkTmVzdGV0ZWRQZUl0UmVzdWx0PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUluZkFjdGlvbnMoaW5mUm9vdCwgJ3BlcnNpc3RlbnRfaXRlbScpKVxuXG4gICAgLy8gdGhpcy5sb2FkTmVzdGVkT2JqZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgLy8gICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgLy8gICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQnlQa01ldGE+ID0ge1xuICAgIC8vICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5Lk5FU1RFRF9CWV9QSyxcbiAgICAvLyAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0LCBwa0VudGl0eSB9LFxuICAgIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAgIC8vICAgfTtcbiAgICAvLyAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgLy8gICByZXR1cm4ge1xuICAgIC8vICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgLy8gICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxMb2FkTmVzdGV0ZWRQZUl0UmVzdWx0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgIC8vICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAvLyAgIH07XG4gICAgLy8gfVxuICAgIHRoaXMubG9hZE1pbmltYWwgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRCeVBrTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuTUlOSU1BTF9CWV9QSyxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0LCBwa0VudGl0eSB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxTY2hlbWFPYmplY3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHRoaXMudHlwZXNPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFR5cGVzT2ZQcm9qZWN0QWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5UWVBFU19PRl9QUk9KRUNULFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrOiBwa1Byb2plY3QgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TG9hZEFjdGlvbk1ldGE+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8vIHRoaXMudHlwZU9mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4ge1xuICAgIC8vICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpO1xuXG4gICAgLy8gICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkVHlwZU9mUHJvamVjdEFjdGlvbj4gPSB7XG4gICAgLy8gICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuVFlQRV9PRl9QUk9KRUNULFxuICAgIC8vICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrOiBwa1Byb2plY3QsIHBrRW50aXR5IH0sXG4gICAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gICAgLy8gICB9O1xuICAgIC8vICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAvLyAgIHJldHVybiB7XG4gICAgLy8gICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAvLyAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPExvYWROZXN0ZXRlZFBlSXRSZXN1bHQ+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgLy8gICAgIGtleTogYWRkUGVuZGluZ1xuICAgIC8vICAgfTtcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG5leHBvcnQgdHlwZSBQYWdpbmF0ZWRTdGF0ZW1lbnRzID0gbnVtYmVyW11cbmV4cG9ydCBpbnRlcmZhY2UgUGFnaW5hdGVkU3RhdGVtZW50TGlzdCB7XG4gIGNvdW50OiBudW1iZXIsXG4gIHNjaGVtYXM6IFNjaGVtYU9iamVjdCxcbiAgcGFnaW5hdGVkU3RhdGVtZW50czogUGFnaW5hdGVkU3RhdGVtZW50c1xufVxuZXhwb3J0IGludGVyZmFjZSBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7XG4gIHBrU291cmNlRW50aXR5OiBudW1iZXIgLy8gUGsgb2YgdGhlIHNvdXJjZSBlbnRpdHkuXG4gIHBrUHJvcGVydHk6IG51bWJlciAvLyBQayBvZiB0aGUgcHJvcGVydHkuXG4gIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciAvLyBQayBvZiB0aGUgdGFyZ2V0IGNsYXNzLlxuICBpc091dGdvaW5nOiBib29sZWFuIC8vIElmIHRydWUsIHRoZSBzb3VyY2UgZW50aXR5IGlzIGRvbWFpbiwgZWxzZSByYW5nZS5cbiAgbGltaXQ6IG51bWJlciAvLyBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuXG4gIG9mZnNldDogbnVtYmVyIC8vIG9mZnNldC5cbiAgYWx0ZXJuYXRpdmVzOiBib29sZWFuXG59XG5leHBvcnQgY2xhc3MgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5IGV4dGVuZHMgSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBJbmZUZW1wb3JhbEVudGl0eT4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBPV05fUFJPUEVSVElFUyA9ICdPV05fUFJPUEVSVElFUyc7XG4gIHN0YXRpYyByZWFkb25seSBQQUdJTkFURURfTElTVCA9ICdQQUdJTkFURURfTElTVCc7XG4gIHN0YXRpYyByZWFkb25seSBQQUdJTkFURURfQUxURVJOQVRJVkVfTElTVCA9ICdQQUdJTkFURURfQUxURVJOQVRJVkVfTElTVCc7XG5cbiAgbG9hZE5lc3RlZE9iamVjdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPEluZlRlbXBvcmFsRW50aXR5W10+O1xuICBsb2FkUGFnaW5hdGVkTGlzdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa1NvdXJjZUVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD47XG4gIGxvYWRQYWdpbmF0ZWRBbHRlcm5hdGl2ZUxpc3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlSW5mQWN0aW9ucyhpbmZSb290LCAndGVtcG9yYWxfZW50aXR5JykpXG5cbiAgICB0aGlzLmxvYWROZXN0ZWRPYmplY3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEJ5UGtNZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5PV05fUFJPUEVSVElFUyxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0LCBwa0VudGl0eSB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxJbmZUZW1wb3JhbEVudGl0eVtdPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICB0aGlzLmxvYWRQYWdpbmF0ZWRMaXN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa1NvdXJjZUVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfTElTVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa1NvdXJjZUVudGl0eSxcbiAgICAgICAgICBma1RhcmdldENsYXNzLFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgYWx0ZXJuYXRpdmVzOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMubG9hZFBhZ2luYXRlZEFsdGVybmF0aXZlTGlzdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtTb3VyY2VFbnRpdHksXG4gICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICBma1RhcmdldENsYXNzLFxuICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgbGltaXQsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIGFsdGVybmF0aXZlczogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5leHBvcnQgaW50ZXJmYWNlIEZpbmRTdGF0ZW1lbnRCeVBhcmFtcyBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHtcbiAgb2ZQcm9qZWN0OiBib29sZWFuLFxuICBwa0VudGl0eTogbnVtYmVyLFxuICBwa0luZm9SYW5nZTogbnVtYmVyLFxuICBwa0luZm9Eb21haW46IG51bWJlcixcbiAgcGtQcm9wZXJ0eTogbnVtYmVyLFxufVxuZXhwb3J0IGludGVyZmFjZSBDb250ZW50VHJlZU1ldGEgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7XG4gIHBrRXhwcmVzc2lvbkVudGl0eTogbnVtYmVyLFxufVxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eSBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHtcbiAgb2ZQcm9qZWN0OiBib29sZWFuLFxuICBwa0VudGl0eTogbnVtYmVyLFxufVxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdCB7XG4gIHN0YXRlbWVudHM6IEluZlN0YXRlbWVudFtdLFxuICBkaWdpdGFsczogRGF0RGlnaXRhbFtdLFxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZE91dGdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa1RlbXBvcmFsRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciB9O1xuZXhwb3J0IGludGVyZmFjZSBMb2FkSW5nb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cyBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyIH07XG5leHBvcnQgaW50ZXJmYWNlIEFkZFRvUHJvamVjdFdpdGhUZUVudEFjdGlvbk1ldGEgeyBwa1N0YXRlbWVudHM6IG51bWJlcltdLCBwazogbnVtYmVyLCBhZGRQZW5kaW5nOiBzdHJpbmcgfTtcblxuZXhwb3J0IGNsYXNzIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBJbmZBY3Rpb25GYWN0b3J5PFBheWxvYWQsIEluZlN0YXRlbWVudD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIC8vIHN0YXRpYyByZWFkb25seSBBTFRFUk5BVElWRVNfT1VUR09JTkcgPSAnQUxURVJOQVRJVkVTX09VVEdPSU5HJztcbiAgc3RhdGljIHJlYWRvbmx5IEFMVEVSTkFUSVZFU19JTkdPSU5HID0gJ0FMVEVSTkFUSVZFU19JTkdPSU5HJztcbiAgLy8gc3RhdGljIHJlYWRvbmx5IEFERF9UT19QUk9KRUNUX1dJVEhfVEVfRU4gPSAnQUREX1RPX1BST0pFQ1RfV0lUSF9URV9FTic7XG4gIHN0YXRpYyByZWFkb25seSBQQUdJTkFURURfTElTVCA9ICdQQUdJTkFURURfTElTVCc7XG4gIHN0YXRpYyByZWFkb25seSBDT05URU5UX1RSRUUgPSAnQ09OVEVOVF9UUkVFJztcbiAgc3RhdGljIHJlYWRvbmx5IFNPVVJDRVNfQU5EX0RJR0lUQUxTX09GX0VOVElUWSA9ICdTT1VSQ0VTX0FORF9ESUdJVEFMU19PRl9FTlRJVFknO1xuICBzdGF0aWMgcmVhZG9ubHkgQllfUEFSQU1TID0gJ0JZX1BBUkFNUyc7XG5cbiAgbG9hZEluZ29pbmdBbHRlcm5hdGl2ZXM6IChwa0VudGl0eSwgcGtQcm9wZXJ0eSwgcGtQcm9qZWMpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8SW5mU3RhdGVtZW50PjtcbiAgbG9hZFBhZ2luYXRlZExpc3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+O1xuXG4gIC8vIGNvbnRlbnRUcmVlOiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRXhwcmVzc2lvbkVudGl0eTogbnVtYmVyKSA9PiB2b2lkO1xuICBzb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eTogKG9mUHJvamVjdDogYm9vbGVhbiwgcGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8U291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQ+O1xuICBmaW5kQnlQYXJhbXM6IChcbiAgICBvZlByb2plY3Q6IGJvb2xlYW4sXG4gICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gICAgcGtFbnRpdHk6IG51bWJlcixcbiAgICBwa0luZm9SYW5nZTogbnVtYmVyLFxuICAgIHBrSW5mb0RvbWFpbjogbnVtYmVyLFxuICAgIHBrUHJvcGVydHk6IG51bWJlcixcbiAgKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUluZkFjdGlvbnMoaW5mUm9vdCwgJ3N0YXRlbWVudCcpKVxuXG4gICAgdGhpcy5maW5kQnlQYXJhbXMgPSAoXG4gICAgICBvZlByb2plY3Q6IGJvb2xlYW4sXG4gICAgICBwa1Byb2plY3Q6IG51bWJlcixcbiAgICAgIHBrRW50aXR5OiBudW1iZXIsXG4gICAgICBwa0luZm9SYW5nZTogbnVtYmVyLFxuICAgICAgcGtJbmZvRG9tYWluOiBudW1iZXIsXG4gICAgICBwa1Byb3BlcnR5OiBudW1iZXIsXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBGaW5kU3RhdGVtZW50QnlQYXJhbXM+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5CWV9QQVJBTVMsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nOiBVLnV1aWQoKSxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIG9mUHJvamVjdCxcbiAgICAgICAgICBwa0VudGl0eSxcbiAgICAgICAgICBwa0luZm9SYW5nZSxcbiAgICAgICAgICBwa0luZm9Eb21haW4sXG4gICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuXG4gICAgdGhpcy5sb2FkSW5nb2luZ0FsdGVybmF0aXZlcyA9IChwa0VudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRJbmdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuQUxURVJOQVRJVkVTX0lOR09JTkcsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtFbnRpdHksXG4gICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8SW5mU3RhdGVtZW50Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICB0aGlzLmxvYWRQYWdpbmF0ZWRMaXN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa1NvdXJjZUVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0xJU1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtTb3VyY2VFbnRpdHksXG4gICAgICAgICAgZmtUYXJnZXRDbGFzcyxcbiAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgbGltaXQsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIGFsdGVybmF0aXZlczogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBHZXQgYW4gbmVzdGVkIG9iamVjdCB3aXRoIGV2ZXJ5dGhpbmcgbmVlZGVkIHRvIGRpc3BsYXkgdGhlXG4gICAgKiBsaW5rcyBtYWRlIGZyb20gYW4gZW50aXR5IHRvd2FyZHMgc291cmNlcyBhbmQgZGlnaXRhbHMuXG4gICAgKi9cbiAgICB0aGlzLnNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5ID0gKG9mUHJvamVjdDogYm9vbGVhbiwgcGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHk+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5TT1VSQ0VTX0FORF9ESUdJVEFMU19PRl9FTlRJVFksXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIG9mUHJvamVjdCxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrRW50aXR5XG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5UmVzdWx0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQWx0ZXJuYXRpdmVUZXh0UHJvcGVydGllcyBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgZmtFbnRpdHk6IG51bWJlciwgZmtDbGFzc0ZpZWxkOiBudW1iZXIgfTtcblxuZXhwb3J0IGNsYXNzIEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBJbmZBY3Rpb25GYWN0b3J5PFBheWxvYWQsIEluZlRleHRQcm9wZXJ0eT4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBBTFRFUk5BVElWRVMgPSAnQUxURVJOQVRJVkVTJztcblxuICBsb2FkQWx0ZXJuYXRpdmVzOiAoZmtFbnRpdHksIGZrQ2xhc3NGaWVsZCwgZmtQcm9qZWN0KSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPEluZlRleHRQcm9wZXJ0eT47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlSW5mQWN0aW9ucyhpbmZSb290LCAndGV4dF9wcm9wZXJ0eScpKVxuXG4gICAgdGhpcy5sb2FkQWx0ZXJuYXRpdmVzID0gKGZrRW50aXR5OiBudW1iZXIsIGZrQ2xhc3NGaWVsZDogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQWx0ZXJuYXRpdmVUZXh0UHJvcGVydGllcz4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFUyxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBma0VudGl0eSxcbiAgICAgICAgICBma0NsYXNzRmllbGQsXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPEluZlRleHRQcm9wZXJ0eT4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5mQWN0aW9ucyB7XG5cbiAgcGVyc2lzdGVudF9pdGVtID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcbiAgdGVtcG9yYWxfZW50aXR5ID0gbmV3IEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuICBzdGF0ZW1lbnQgPSBuZXcgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIC8vIFRPRE86IHBpbXAgdGhvc2UgdXAgdG8gcmVhbCBJbmYgQWN0aW9ucyFcbiAgbGFuZ3VhZ2UgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mTGFuZ3VhZ2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ2xhbmd1YWdlJylcbiAgYXBwZWxsYXRpb24gPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mQXBwZWxsYXRpb24+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ2FwcGVsbGF0aW9uJylcbiAgbGFuZ19zdHJpbmcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mTGFuZ1N0cmluZz4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAnbGFuZ19zdHJpbmcnKVxuICBkaW1lbnNpb24gPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8SW5mRGltZW5zaW9uU2xpY2UsIEluZkRpbWVuc2lvbj4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAnZGltZW5zaW9uJylcbiAgcGxhY2UgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mUGxhY2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ3BsYWNlJylcbiAgdGltZV9wcmltaXRpdmUgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgSW5mVGltZVByaW1pdGl2ZT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAndGltZV9wcmltaXRpdmUnKVxuICB0ZXh0X3Byb3BlcnR5ID0gbmV3IEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19