/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/inf.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { infRoot } from '../reducer-configs/inf.config';
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
export class InfPersistentItemActionFactory extends InfActionFactory {
    // typeOfProject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
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
        (pkProject, pkEntity) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
                meta: { addPending, pk: pkProject, pkEntity },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        this.typesOfProject = (/**
         * @param {?} pkProject
         * @return {?}
         */
        (pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
                meta: { addPending, pk: pkProject },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
    }
}
// Suffixes of load action types
// static readonly NESTED_BY_PK = 'NESTED_BY_PK';
InfPersistentItemActionFactory.MINIMAL_BY_PK = 'MINIMAL_BY_PK';
InfPersistentItemActionFactory.TYPES_OF_PROJECT = 'TYPES_OF_PROJECT';
InfPersistentItemActionFactory.TYPE_OF_PROJECT = 'TYPE_OF_PROJECT';
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
export class InfTemporalEntityActionFactory extends InfActionFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'));
        this.loadNestedObject = (/**
         * @param {?} pkProject
         * @param {?} pkEntity
         * @return {?}
         */
        (pkProject, pkEntity) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
                meta: { addPending, pk: pkProject, pkEntity },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_LIST,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkSourceEntity,
                    fkTargetClass,
                    pkProperty,
                    isOutgoing,
                    limit,
                    offset,
                    alternatives: false
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkSourceEntity,
                    pkProperty,
                    fkTargetClass,
                    isOutgoing,
                    limit,
                    offset,
                    alternatives: true
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
InfTemporalEntityActionFactory.OWN_PROPERTIES = 'OWN_PROPERTIES';
InfTemporalEntityActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';
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
export class InfStatementActionFactory extends InfActionFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
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
        (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty) => {
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.BY_PARAMS,
                meta: {
                    addPending: U.uuid(),
                    pk: pkProject,
                    ofProject,
                    pkEntity,
                    pkInfoRange,
                    pkInfoDomain,
                    pkProperty,
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
        });
        this.loadIngoingAlternatives = (/**
         * @param {?} pkEntity
         * @param {?} pkProperty
         * @param {?} pkProject
         * @return {?}
         */
        (pkEntity, pkProperty, pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.ALTERNATIVES_INGOING,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkEntity,
                    pkProperty,
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.PAGINATED_LIST,
                meta: {
                    addPending,
                    pk: pkProject,
                    pkSourceEntity,
                    fkTargetClass,
                    pkProperty,
                    isOutgoing,
                    limit,
                    offset,
                    alternatives: false
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
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
        (ofProject, pkProject, pkEntity) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
                meta: {
                    addPending,
                    ofProject,
                    pk: pkProject,
                    pkEntity
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
// static readonly ALTERNATIVES_OUTGOING = 'ALTERNATIVES_OUTGOING';
InfStatementActionFactory.ALTERNATIVES_INGOING = 'ALTERNATIVES_INGOING';
// static readonly ADD_TO_PROJECT_WITH_TE_EN = 'ADD_TO_PROJECT_WITH_TE_EN';
InfStatementActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
InfStatementActionFactory.CONTENT_TREE = 'CONTENT_TREE';
InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY = 'SOURCES_AND_DIGITALS_OF_ENTITY';
InfStatementActionFactory.BY_PARAMS = 'BY_PARAMS';
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
export class InfTextPropertyActionFactory extends InfActionFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'text_property'));
        this.loadAlternatives = (/**
         * @param {?} fkEntity
         * @param {?} fkClassField
         * @param {?} pkProject
         * @return {?}
         */
        (fkEntity, fkClassField, pkProject) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTextPropertyActionFactory.ALTERNATIVES,
                meta: {
                    addPending,
                    pk: pkProject,
                    fkEntity,
                    fkClassField,
                },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
InfTextPropertyActionFactory.ALTERNATIVES = 'ALTERNATIVES';
if (false) {
    /** @type {?} */
    InfTextPropertyActionFactory.ALTERNATIVES;
    /** @type {?} */
    InfTextPropertyActionFactory.prototype.loadAlternatives;
    /** @type {?} */
    InfTextPropertyActionFactory.prototype.ngRedux;
}
export class InfActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
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
}
InfActions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InfActions.ctorParameters = () => [
    { type: NgRedux }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2luZi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUEwQyxvQkFBb0IsRUFBcUIsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQU1ySSxrQ0FBeUU7OztJQUFsQixnQ0FBZ0I7O0FBQUUsQ0FBQzs7OztBQUUxRSw2Q0FBb0Y7OztJQUFsQiwyQ0FBZ0I7O0FBQUUsQ0FBQztBQUdyRixNQUFNLE9BQU8sOEJBQStCLFNBQVEsZ0JBQTRDOzs7OztJQWM5RixZQUFtQixPQUEyQjtRQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUE3QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFtQixDQUFDOzs7O0lBRWxFLGFBQWE7UUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUV0RSxxRUFBcUU7UUFDckUsaUNBQWlDO1FBQ2pDLGdFQUFnRTtRQUNoRSxzSEFBc0g7UUFDdEgscURBQXFEO1FBQ3JELHFCQUFxQjtRQUNyQixPQUFPO1FBQ1Asa0NBQWtDO1FBQ2xDLGFBQWE7UUFDYix1RUFBdUU7UUFDdkUsa0lBQWtJO1FBQ2xJLHNCQUFzQjtRQUN0QixPQUFPO1FBQ1AsSUFBSTtRQUNKLElBQUksQ0FBQyxXQUFXOzs7OztRQUFHLENBQUMsU0FBaUIsRUFBRSxRQUFnQixFQUFFLEVBQUU7O2tCQUNuRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7a0JBQ3JCLE1BQU0sR0FBOEM7Z0JBQ3hELElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsOEJBQThCLENBQUMsYUFBYTtnQkFDL0csSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO2dCQUM3QyxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBa0MsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztnQkFDaEgsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBR0QsSUFBSSxDQUFDLGNBQWM7Ozs7UUFBRyxDQUFDLFNBQWlCLEVBQUUsRUFBRTs7a0JBQ3BDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFFckIsTUFBTSxHQUEwRDtnQkFDcEUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyw4QkFBOEIsQ0FBQyxnQkFBZ0I7Z0JBQ2xILElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFO2dCQUNuQyxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBb0MsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztnQkFDbEgsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBR0Qsa0VBQWtFO1FBQ2xFLGlDQUFpQztRQUVqQywyRUFBMkU7UUFDM0UseUhBQXlIO1FBQ3pILHFEQUFxRDtRQUNyRCxxQkFBcUI7UUFDckIsT0FBTztRQUNQLGtDQUFrQztRQUNsQyxhQUFhO1FBQ2IsdUVBQXVFO1FBQ3ZFLGtJQUFrSTtRQUNsSSxzQkFBc0I7UUFDdEIsT0FBTztRQUNQLElBQUk7UUFFSixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7QUEvRWUsNENBQWEsR0FBRyxlQUFlLENBQUM7QUFDaEMsK0NBQWdCLEdBQUcsa0JBQWtCLENBQUM7QUFDdEMsOENBQWUsR0FBRyxpQkFBaUIsQ0FBQzs7O0lBRnBELDZDQUFnRDs7SUFDaEQsZ0RBQXNEOztJQUN0RCwrQ0FBb0Q7O0lBRXBELHFEQUEyRjs7SUFDM0YsMERBQTBHOztJQUUxRyx3REFBOEU7O0lBR2xFLGlEQUFrQzs7Ozs7QUF5RWhELDRDQUlDOzs7SUFIQyx1Q0FBYzs7SUFDZCx5Q0FBc0I7O0lBQ3RCLHFEQUF3Qzs7Ozs7QUFFMUMsb0RBUUM7OztJQVBDLHdEQUFzQjs7SUFDdEIsb0RBQWtCOztJQUNsQix1REFBcUI7O0lBQ3JCLG9EQUFtQjs7SUFDbkIsK0NBQWE7O0lBQ2IsZ0RBQWM7O0lBQ2Qsc0RBQXFCOztBQUV2QixNQUFNLE9BQU8sOEJBQStCLFNBQVEsZ0JBQTRDOzs7O0lBVzlGLFlBQW1CLE9BQTJCO1FBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQTdDLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQW1CLENBQUM7Ozs7SUFFbEUsYUFBYTtRQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO1FBRXRFLElBQUksQ0FBQyxnQkFBZ0I7Ozs7O1FBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQWdCLEVBQUUsRUFBRTs7a0JBQ3hELFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDckIsTUFBTSxHQUE4QztnQkFDeEQsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyw4QkFBOEIsQ0FBQyxjQUFjO2dCQUNoSCxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7Z0JBQzdDLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QixPQUFPO2dCQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDL0QsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUF5QyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2dCQUN2SCxHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7UUFHRCxJQUFJLENBQUMsaUJBQWlCOzs7Ozs7Ozs7O1FBQUcsQ0FBQyxTQUFpQixFQUFFLGNBQXNCLEVBQUUsVUFBa0IsRUFBRSxhQUFxQixFQUFFLFVBQW1CLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxFQUFFOztrQkFDOUosVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2tCQUNyQixNQUFNLEdBQWdFO2dCQUMxRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLDhCQUE4QixDQUFDLGNBQWM7Z0JBQ2hILElBQUksRUFBRTtvQkFDSixVQUFVO29CQUNWLEVBQUUsRUFBRSxTQUFTO29CQUNiLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixVQUFVO29CQUNWLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxNQUFNO29CQUNOLFlBQVksRUFBRSxLQUFLO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBNEMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztnQkFDMUgsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBQ0QsSUFBSSxDQUFDLDRCQUE0Qjs7Ozs7Ozs7OztRQUFHLENBQUMsU0FBaUIsRUFBRSxjQUFzQixFQUFFLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxVQUFtQixFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsRUFBRTs7a0JBQ3pLLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDckIsTUFBTSxHQUFnRTtnQkFDMUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyw4QkFBOEIsQ0FBQywwQkFBMEI7Z0JBQzVILElBQUksRUFBRTtvQkFDSixVQUFVO29CQUNWLEVBQUUsRUFBRSxTQUFTO29CQUNiLGNBQWM7b0JBQ2QsVUFBVTtvQkFDVixhQUFhO29CQUNiLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxNQUFNO29CQUNOLFlBQVksRUFBRSxJQUFJO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBNEMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztnQkFDMUgsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7QUE5RWUsNkNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUNsQyw2Q0FBYyxHQUFHLGdCQUFnQixDQUFDO0FBQ2xDLHlEQUEwQixHQUFHLDRCQUE0QixDQUFDOzs7SUFGMUUsOENBQWtEOztJQUNsRCw4Q0FBa0Q7O0lBQ2xELDBEQUEwRTs7SUFFMUUsMERBQXVHOztJQUN2RywyREFBZ047O0lBQ2hOLHNFQUEyTjs7SUFFL00saURBQWtDOzs7OztBQXdFaEQsMkNBTUM7OztJQUxDLDBDQUFtQjs7SUFDbkIseUNBQWlCOztJQUNqQiw0Q0FBb0I7O0lBQ3BCLDZDQUFxQjs7SUFDckIsMkNBQW1COzs7OztBQUVyQixxQ0FFQzs7O0lBREMsNkNBQTJCOzs7OztBQUU3QixnREFHQzs7O0lBRkMsK0NBQW1COztJQUNuQiw4Q0FBaUI7Ozs7O0FBRW5CLHNEQUdDOzs7SUFGQyxzREFBMkI7O0lBQzNCLG9EQUF1Qjs7Ozs7QUFJekIsdURBQTBIOzs7SUFBOUMsNkRBQXlCOztJQUFDLHVEQUFrQjs7QUFBRSxDQUFDOzs7O0FBQzNILHNEQUFpSDs7O0lBQXRDLG9EQUFpQjs7SUFBQyxzREFBa0I7O0FBQUUsQ0FBQzs7OztBQUNsSCxxREFBMkc7OztJQUF4RCx1REFBdUI7O0lBQUMsNkNBQVc7O0lBQUMscURBQWtCOztBQUFFLENBQUM7QUFFNUcsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGdCQUF1Qzs7OztJQXlCcEYsWUFBbUIsT0FBMkI7UUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFBN0MsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBbUIsQ0FBQzs7OztJQUVsRSxhQUFhO1FBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBRWhFLElBQUksQ0FBQyxZQUFZOzs7Ozs7Ozs7UUFBRyxDQUNsQixTQUFrQixFQUNsQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixXQUFtQixFQUNuQixZQUFvQixFQUNwQixVQUFrQixFQUNsQixFQUFFOztrQkFDSSxNQUFNLEdBQXVEO2dCQUNqRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLHlCQUF5QixDQUFDLFNBQVM7Z0JBQ3RHLElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtvQkFDcEIsRUFBRSxFQUFFLFNBQVM7b0JBQ2IsU0FBUztvQkFDVCxRQUFRO29CQUNSLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixVQUFVO2lCQUNYO2dCQUNELE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUEsQ0FBQTtRQUdELElBQUksQ0FBQyx1QkFBdUI7Ozs7OztRQUFHLENBQUMsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLFNBQWlCLEVBQUUsRUFBRTs7a0JBQ25GLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDckIsTUFBTSxHQUFrRTtnQkFDNUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxvQkFBb0I7Z0JBQ2pILElBQUksRUFBRTtvQkFDSixVQUFVO29CQUNWLEVBQUUsRUFBRSxTQUFTO29CQUNiLFFBQVE7b0JBQ1IsVUFBVTtpQkFDWDtnQkFDRCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBa0MsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztnQkFDaEgsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBR0QsSUFBSSxDQUFDLGlCQUFpQjs7Ozs7Ozs7OztRQUFHLENBQUMsU0FBaUIsRUFBRSxjQUFzQixFQUFFLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxVQUFtQixFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsRUFBRTs7a0JBQzlKLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDckIsTUFBTSxHQUFnRTtnQkFDMUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxjQUFjO2dCQUMzRyxJQUFJLEVBQUU7b0JBQ0osVUFBVTtvQkFDVixFQUFFLEVBQUUsU0FBUztvQkFDYixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixZQUFZLEVBQUUsS0FBSztpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdCLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQTRDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7Z0JBQzFILEdBQUcsRUFBRSxVQUFVO2FBQ2hCLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQTtRQUdEOzs7VUFHRTtRQUNGLElBQUksQ0FBQywwQkFBMEI7Ozs7OztRQUFHLENBQUMsU0FBa0IsRUFBRSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsRUFBRTs7a0JBQ3RGLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDckIsTUFBTSxHQUE0RDtnQkFDdEUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyx5QkFBeUIsQ0FBQyw4QkFBOEI7Z0JBQzNILElBQUksRUFBRTtvQkFDSixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsRUFBRSxFQUFFLFNBQVM7b0JBQ2IsUUFBUTtpQkFDVDtnQkFDRCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBc0QsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztnQkFDcEksR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7O0FBM0hlLDhDQUFvQixHQUFHLHNCQUFzQixDQUFDOztBQUU5Qyx3Q0FBYyxHQUFHLGdCQUFnQixDQUFDO0FBQ2xDLHNDQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLHdEQUE4QixHQUFHLGdDQUFnQyxDQUFDO0FBQ2xFLG1DQUFTLEdBQUcsV0FBVyxDQUFDOzs7SUFMeEMsK0NBQThEOztJQUU5RCx5Q0FBa0Q7O0lBQ2xELHVDQUE4Qzs7SUFDOUMseURBQWtGOztJQUNsRixvQ0FBd0M7O0lBRXhDLDREQUFrRzs7SUFDbEcsc0RBQWdOOztJQUdoTiwrREFBa0o7O0lBQ2xKLGlEQU9VOztJQUVFLDRDQUFrQzs7Ozs7QUF5R2hELG1EQUFnSDs7O0lBQXhDLGlEQUFpQjs7SUFBQyxxREFBb0I7O0FBQUUsQ0FBQztBQUVqSCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsZ0JBQTBDOzs7O0lBTzFGLFlBQW1CLE9BQTJCO1FBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQTdDLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQW1CLENBQUM7Ozs7SUFFbEUsYUFBYTtRQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQTtRQUVwRSxJQUFJLENBQUMsZ0JBQWdCOzs7Ozs7UUFBRyxDQUFDLFFBQWdCLEVBQUUsWUFBb0IsRUFBRSxTQUFpQixFQUFFLEVBQUU7O2tCQUM5RSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7a0JBQ3JCLE1BQU0sR0FBK0Q7Z0JBQ3pFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsNEJBQTRCLENBQUMsWUFBWTtnQkFDNUcsSUFBSSxFQUFFO29CQUNKLFVBQVU7b0JBQ1YsRUFBRSxFQUFFLFNBQVM7b0JBQ2IsUUFBUTtvQkFDUixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QixPQUFPO2dCQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDL0QsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFxQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2dCQUNuSCxHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztBQTlCZSx5Q0FBWSxHQUFHLGNBQWMsQ0FBQzs7O0lBQTlDLDBDQUE4Qzs7SUFFOUMsd0RBQWlHOztJQUVyRiwrQ0FBa0M7O0FBZ0NoRCxNQUFNLE9BQU8sVUFBVTs7OztJQWVyQixZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQWI5QyxvQkFBZSxHQUFHLElBQUksOEJBQThCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25GLG9CQUFlLEdBQUcsSUFBSSw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDbEYsY0FBUyxHQUFHLElBQUkseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBOztRQUd2RSxhQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUM5RyxnQkFBVyxHQUFHLElBQUksb0JBQW9CLENBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDdkgsZ0JBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUF5QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQ3RILGNBQVMsR0FBRyxJQUFJLG9CQUFvQixDQUFrQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQzNILFVBQUssR0FBRyxJQUFJLG9CQUFvQixDQUFvQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3JHLG1CQUFjLEdBQUcsSUFBSSxvQkFBb0IsQ0FBNEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQy9ILGtCQUFhLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7SUFFNUIsQ0FBQzs7O1lBaEJwRCxVQUFVOzs7O1lBL1lGLE9BQU87Ozs7SUFrWmQscUNBQW1GOztJQUNuRixxQ0FBa0Y7O0lBQ2xGLCtCQUF1RTs7SUFHdkUsOEJBQThHOztJQUM5RyxpQ0FBdUg7O0lBQ3ZILGlDQUFzSDs7SUFDdEgsK0JBQTJIOztJQUMzSCwyQkFBcUc7O0lBQ3JHLG9DQUErSDs7SUFDL0gsbUNBQThFOztJQUVsRSw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXREaWdpdGFsLCBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlLCBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBJbmZEaW1lbnNpb25TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSB9IGZyb20gJy4uL21vZGVscy9pbmYubW9kZWxzJztcbmltcG9ydCB7IGluZlJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvaW5mLmNvbmZpZyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvaW5mLWFjdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuXG5cbnR5cGUgUGF5bG9hZCA9IEluZlBlcnNpc3RlbnRJdGVtU2xpY2U7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEJ5UGtNZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0VudGl0eTogbnVtYmVyIH07XG5leHBvcnQgdHlwZSBMb2FkVHlwZXNPZlByb2plY3RBY3Rpb24gPSBMb2FkQWN0aW9uTWV0YTtcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZFR5cGVPZlByb2plY3RBY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRW50aXR5OiBudW1iZXIgfTtcbnR5cGUgTG9hZE5lc3RldGVkUGVJdFJlc3VsdCA9IEluZlBlcnNpc3RlbnRJdGVtW11cblxuZXhwb3J0IGNsYXNzIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSBleHRlbmRzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgSW5mUGVyc2lzdGVudEl0ZW0+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgTkVTVEVEX0JZX1BLID0gJ05FU1RFRF9CWV9QSyc7XG4gIHN0YXRpYyByZWFkb25seSBNSU5JTUFMX0JZX1BLID0gJ01JTklNQUxfQllfUEsnO1xuICBzdGF0aWMgcmVhZG9ubHkgVFlQRVNfT0ZfUFJPSkVDVCA9ICdUWVBFU19PRl9QUk9KRUNUJztcbiAgc3RhdGljIHJlYWRvbmx5IFRZUEVfT0ZfUFJPSkVDVCA9ICdUWVBFX09GX1BST0pFQ1QnO1xuXG4gIGxvYWRNaW5pbWFsOiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8U2NoZW1hT2JqZWN0PjtcbiAgbG9hZE5lc3RlZE9iamVjdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPExvYWROZXN0ZXRlZFBlSXRSZXN1bHQ+O1xuXG4gIHR5cGVzT2ZQcm9qZWN0OiAocGtQcm9qZWN0OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TG9hZEFjdGlvbk1ldGE+O1xuICAvLyB0eXBlT2ZQcm9qZWN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TG9hZE5lc3RldGVkUGVJdFJlc3VsdD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVJbmZBY3Rpb25zKGluZlJvb3QsICdwZXJzaXN0ZW50X2l0ZW0nKSlcblxuICAgIC8vIHRoaXMubG9hZE5lc3RlZE9iamVjdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4ge1xuICAgIC8vICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpO1xuICAgIC8vICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEJ5UGtNZXRhPiA9IHtcbiAgICAvLyAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5ORVNURURfQllfUEssXG4gICAgLy8gICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAvLyAgIH07XG4gICAgLy8gICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIC8vICAgcmV0dXJuIHtcbiAgICAvLyAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgIC8vICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TG9hZE5lc3RldGVkUGVJdFJlc3VsdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAvLyAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgLy8gICB9O1xuICAgIC8vIH1cbiAgICB0aGlzLmxvYWRNaW5pbWFsID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQnlQa01ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5Lk1JTklNQUxfQllfUEssXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8U2NoZW1hT2JqZWN0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICB0aGlzLnR5cGVzT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRUeXBlc09mUHJvamVjdEFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuVFlQRVNfT0ZfUFJPSkVDVCxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0IH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPExvYWRBY3Rpb25NZXRhPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICAvLyB0aGlzLnR5cGVPZlByb2plY3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IHtcbiAgICAvLyAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcblxuICAgIC8vICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFR5cGVPZlByb2plY3RBY3Rpb24+ID0ge1xuICAgIC8vICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVfT0ZfUFJPSkVDVCxcbiAgICAvLyAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwazogcGtQcm9qZWN0LCBwa0VudGl0eSB9LFxuICAgIC8vICAgICBwYXlsb2FkOiBudWxsLFxuICAgIC8vICAgfTtcbiAgICAvLyAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgLy8gICByZXR1cm4ge1xuICAgIC8vICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgLy8gICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxMb2FkTmVzdGV0ZWRQZUl0UmVzdWx0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgIC8vICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAvLyAgIH07XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuZXhwb3J0IHR5cGUgUGFnaW5hdGVkU3RhdGVtZW50cyA9IG51bWJlcltdXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRlZFN0YXRlbWVudExpc3Qge1xuICBjb3VudDogbnVtYmVyLFxuICBzY2hlbWFzOiBTY2hlbWFPYmplY3QsXG4gIHBhZ2luYXRlZFN0YXRlbWVudHM6IFBhZ2luYXRlZFN0YXRlbWVudHNcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICBwa1NvdXJjZUVudGl0eTogbnVtYmVyIC8vIFBrIG9mIHRoZSBzb3VyY2UgZW50aXR5LlxuICBwa1Byb3BlcnR5OiBudW1iZXIgLy8gUGsgb2YgdGhlIHByb3BlcnR5LlxuICBma1RhcmdldENsYXNzOiBudW1iZXIgLy8gUGsgb2YgdGhlIHRhcmdldCBjbGFzcy5cbiAgaXNPdXRnb2luZzogYm9vbGVhbiAvLyBJZiB0cnVlLCB0aGUgc291cmNlIGVudGl0eSBpcyBkb21haW4sIGVsc2UgcmFuZ2UuXG4gIGxpbWl0OiBudW1iZXIgLy8gbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuICBvZmZzZXQ6IG51bWJlciAvLyBvZmZzZXQuXG4gIGFsdGVybmF0aXZlczogYm9vbGVhblxufVxuZXhwb3J0IGNsYXNzIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSBleHRlbmRzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgSW5mVGVtcG9yYWxFbnRpdHk+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgT1dOX1BST1BFUlRJRVMgPSAnT1dOX1BST1BFUlRJRVMnO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFHSU5BVEVEX0xJU1QgPSAnUEFHSU5BVEVEX0xJU1QnO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QgPSAnUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QnO1xuXG4gIGxvYWROZXN0ZWRPYmplY3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxJbmZUZW1wb3JhbEVudGl0eVtdPjtcbiAgbG9hZFBhZ2luYXRlZExpc3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+O1xuICBsb2FkUGFnaW5hdGVkQWx0ZXJuYXRpdmVMaXN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUluZkFjdGlvbnMoaW5mUm9vdCwgJ3RlbXBvcmFsX2VudGl0eScpKVxuXG4gICAgdGhpcy5sb2FkTmVzdGVkT2JqZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRCeVBrTWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuT1dOX1BST1BFUlRJRVMsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8SW5mVGVtcG9yYWxFbnRpdHlbXT4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgdGhpcy5sb2FkUGFnaW5hdGVkTGlzdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0xJU1QsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtTb3VyY2VFbnRpdHksXG4gICAgICAgICAgZmtUYXJnZXRDbGFzcyxcbiAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgbGltaXQsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIGFsdGVybmF0aXZlczogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLmxvYWRQYWdpbmF0ZWRBbHRlcm5hdGl2ZUxpc3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9BTFRFUk5BVElWRV9MSVNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrU291cmNlRW50aXR5LFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgZmtUYXJnZXRDbGFzcyxcbiAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBhbHRlcm5hdGl2ZXM6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuZXhwb3J0IGludGVyZmFjZSBGaW5kU3RhdGVtZW50QnlQYXJhbXMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7XG4gIG9mUHJvamVjdDogYm9vbGVhbixcbiAgcGtFbnRpdHk6IG51bWJlcixcbiAgcGtJbmZvUmFuZ2U6IG51bWJlcixcbiAgcGtJbmZvRG9tYWluOiBudW1iZXIsXG4gIHBrUHJvcGVydHk6IG51bWJlcixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGVudFRyZWVNZXRhIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICBwa0V4cHJlc3Npb25FbnRpdHk6IG51bWJlcixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHkgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7XG4gIG9mUHJvamVjdDogYm9vbGVhbixcbiAgcGtFbnRpdHk6IG51bWJlcixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQge1xuICBzdGF0ZW1lbnRzOiBJbmZTdGF0ZW1lbnRbXSxcbiAgZGlnaXRhbHM6IERhdERpZ2l0YWxbXSxcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRPdXRnb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cyBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtUZW1wb3JhbEVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIgfTtcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEluZ29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciB9O1xuZXhwb3J0IGludGVyZmFjZSBBZGRUb1Byb2plY3RXaXRoVGVFbnRBY3Rpb25NZXRhIHsgcGtTdGF0ZW1lbnRzOiBudW1iZXJbXSwgcGs6IG51bWJlciwgYWRkUGVuZGluZzogc3RyaW5nIH07XG5cbmV4cG9ydCBjbGFzcyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5IGV4dGVuZHMgSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBJbmZTdGF0ZW1lbnQ+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgQUxURVJOQVRJVkVTX09VVEdPSU5HID0gJ0FMVEVSTkFUSVZFU19PVVRHT0lORyc7XG4gIHN0YXRpYyByZWFkb25seSBBTFRFUk5BVElWRVNfSU5HT0lORyA9ICdBTFRFUk5BVElWRVNfSU5HT0lORyc7XG4gIC8vIHN0YXRpYyByZWFkb25seSBBRERfVE9fUFJPSkVDVF9XSVRIX1RFX0VOID0gJ0FERF9UT19QUk9KRUNUX1dJVEhfVEVfRU4nO1xuICBzdGF0aWMgcmVhZG9ubHkgUEFHSU5BVEVEX0xJU1QgPSAnUEFHSU5BVEVEX0xJU1QnO1xuICBzdGF0aWMgcmVhZG9ubHkgQ09OVEVOVF9UUkVFID0gJ0NPTlRFTlRfVFJFRSc7XG4gIHN0YXRpYyByZWFkb25seSBTT1VSQ0VTX0FORF9ESUdJVEFMU19PRl9FTlRJVFkgPSAnU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZJztcbiAgc3RhdGljIHJlYWRvbmx5IEJZX1BBUkFNUyA9ICdCWV9QQVJBTVMnO1xuXG4gIGxvYWRJbmdvaW5nQWx0ZXJuYXRpdmVzOiAocGtFbnRpdHksIHBrUHJvcGVydHksIHBrUHJvamVjKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPEluZlN0YXRlbWVudD47XG4gIGxvYWRQYWdpbmF0ZWRMaXN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0PjtcblxuICAvLyBjb250ZW50VHJlZTogKHBrUHJvamVjdDogbnVtYmVyLCBwa0V4cHJlc3Npb25FbnRpdHk6IG51bWJlcikgPT4gdm9pZDtcbiAgc291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHk6IChvZlByb2plY3Q6IGJvb2xlYW4sIHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5UmVzdWx0PjtcbiAgZmluZEJ5UGFyYW1zOiAoXG4gICAgb2ZQcm9qZWN0OiBib29sZWFuLFxuICAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAgIHBrRW50aXR5OiBudW1iZXIsXG4gICAgcGtJbmZvUmFuZ2U6IG51bWJlcixcbiAgICBwa0luZm9Eb21haW46IG51bWJlcixcbiAgICBwa1Byb3BlcnR5OiBudW1iZXIsXG4gICkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IEluZlN0YXRlbWVudEFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVJbmZBY3Rpb25zKGluZlJvb3QsICdzdGF0ZW1lbnQnKSlcblxuICAgIHRoaXMuZmluZEJ5UGFyYW1zID0gKFxuICAgICAgb2ZQcm9qZWN0OiBib29sZWFuLFxuICAgICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gICAgICBwa0VudGl0eTogbnVtYmVyLFxuICAgICAgcGtJbmZvUmFuZ2U6IG51bWJlcixcbiAgICAgIHBrSW5mb0RvbWFpbjogbnVtYmVyLFxuICAgICAgcGtQcm9wZXJ0eTogbnVtYmVyLFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgRmluZFN0YXRlbWVudEJ5UGFyYW1zPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuQllfUEFSQU1TLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZzogVS51dWlkKCksXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBvZlByb2plY3QsXG4gICAgICAgICAgcGtFbnRpdHksXG4gICAgICAgICAgcGtJbmZvUmFuZ2UsXG4gICAgICAgICAgcGtJbmZvRG9tYWluLFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cblxuICAgIHRoaXMubG9hZEluZ29pbmdBbHRlcm5hdGl2ZXMgPSAocGtFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkSW5nb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cz4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFU19JTkdPSU5HLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrRW50aXR5LFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPEluZlN0YXRlbWVudD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgdGhpcy5sb2FkUGFnaW5hdGVkTGlzdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtTb3VyY2VFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyLCBma1RhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrU291cmNlRW50aXR5LFxuICAgICAgICAgIGZrVGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBhbHRlcm5hdGl2ZXM6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICogR2V0IGFuIG5lc3RlZCBvYmplY3Qgd2l0aCBldmVyeXRoaW5nIG5lZWRlZCB0byBkaXNwbGF5IHRoZVxuICAgICogbGlua3MgbWFkZSBmcm9tIGFuIGVudGl0eSB0b3dhcmRzIHNvdXJjZXMgYW5kIGRpZ2l0YWxzLlxuICAgICovXG4gICAgdGhpcy5zb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eSA9IChvZlByb2plY3Q6IGJvb2xlYW4sIHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5PiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBvZlByb2plY3QsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa0VudGl0eVxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IGZrRW50aXR5OiBudW1iZXIsIGZrQ2xhc3NGaWVsZDogbnVtYmVyIH07XG5cbmV4cG9ydCBjbGFzcyBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5IGV4dGVuZHMgSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBJbmZUZXh0UHJvcGVydHk+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQUxURVJOQVRJVkVTID0gJ0FMVEVSTkFUSVZFUyc7XG5cbiAgbG9hZEFsdGVybmF0aXZlczogKGZrRW50aXR5LCBma0NsYXNzRmllbGQsIGZrUHJvamVjdCkgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxJbmZUZXh0UHJvcGVydHk+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUluZkFjdGlvbnMoaW5mUm9vdCwgJ3RleHRfcHJvcGVydHknKSlcblxuICAgIHRoaXMubG9hZEFsdGVybmF0aXZlcyA9IChma0VudGl0eTogbnVtYmVyLCBma0NsYXNzRmllbGQ6IG51bWJlciwgcGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXM+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVMsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhZGRQZW5kaW5nLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgZmtFbnRpdHksXG4gICAgICAgICAgZmtDbGFzc0ZpZWxkLFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxJbmZUZXh0UHJvcGVydHk+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluZkFjdGlvbnMge1xuXG4gIHBlcnNpc3RlbnRfaXRlbSA9IG5ldyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKCk7XG4gIHRlbXBvcmFsX2VudGl0eSA9IG5ldyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcbiAgc3RhdGVtZW50ID0gbmV3IEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICAvLyBUT0RPOiBwaW1wIHRob3NlIHVwIHRvIHJlYWwgSW5mIEFjdGlvbnMhXG4gIGxhbmd1YWdlID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIEluZkxhbmd1YWdlPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGluZlJvb3QsICdsYW5ndWFnZScpXG4gIGFwcGVsbGF0aW9uID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIEluZkFwcGVsbGF0aW9uPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGluZlJvb3QsICdhcHBlbGxhdGlvbicpXG4gIGxhbmdfc3RyaW5nID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIEluZkxhbmdTdHJpbmc+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ2xhbmdfc3RyaW5nJylcbiAgZGltZW5zaW9uID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PEluZkRpbWVuc2lvblNsaWNlLCBJbmZEaW1lbnNpb24+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ2RpbWVuc2lvbicpXG4gIHBsYWNlID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIEluZlBsYWNlPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGluZlJvb3QsICdwbGFjZScpXG4gIHRpbWVfcHJpbWl0aXZlID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIEluZlRpbWVQcmltaXRpdmU+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoaW5mUm9vdCwgJ3RpbWVfcHJpbWl0aXZlJylcbiAgdGV4dF9wcm9wZXJ0eSA9IG5ldyBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==