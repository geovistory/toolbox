/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/inf.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9pbmYuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBMEMsb0JBQW9CLEVBQXFCLE1BQU0sb0NBQW9DLENBQUM7Ozs7QUFNckksa0NBQXlFOzs7SUFBbEIsZ0NBQWdCOztBQUFFLENBQUM7Ozs7QUFFMUUsNkNBQW9GOzs7SUFBbEIsMkNBQWdCOztBQUFFLENBQUM7QUFHckYsTUFBTSxPQUFPLDhCQUErQixTQUFRLGdCQUE0Qzs7Ozs7SUFjOUYsWUFBbUIsT0FBMkI7UUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFBN0MsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBbUIsQ0FBQzs7OztJQUVsRSxhQUFhO1FBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7UUFFdEUscUVBQXFFO1FBQ3JFLGlDQUFpQztRQUNqQyxnRUFBZ0U7UUFDaEUsc0hBQXNIO1FBQ3RILHFEQUFxRDtRQUNyRCxxQkFBcUI7UUFDckIsT0FBTztRQUNQLGtDQUFrQztRQUNsQyxh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QUMsQ0FBQTtRQUMzSCxVQUFLLEdBQUcsSUFBSSxvQkFBb0IsQ0FBb0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNyRyxtQkFBYyxHQUFHLElBQUksb0JBQW9CLENBQTRCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtRQUMvSCxrQkFBYSxHQUFHLElBQUksNEJBQTRCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBRTVCLENBQUM7OztZQWhCcEQsVUFBVTs7OztZQS9ZRixPQUFPOzs7O0lBa1pkLHFDQUFtRjs7SUFDbkYscUNBQWtGOztJQUNsRiwrQkFBdUU7O0lBR3ZFLDhCQUE4Rzs7SUFDOUcsaUNBQXVIOztJQUN2SCxpQ0FBc0g7O0lBQ3RILCtCQUEySDs7SUFDM0gsMkJBQXFHOztJQUNyRyxvQ0FBK0g7O0lBQy9ILG1DQUE4RTs7SUFFbEUsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0RGlnaXRhbCwgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mU3RhdGVtZW50LCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSwgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgSW5mRGltZW5zaW9uU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvaW5mLm1vZGVscyc7XG5pbXBvcnQgeyBpbmZSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL2luZi5jb25maWcnO1xuaW1wb3J0IHsgSW5mQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL2luZi1hY3Rpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlLCBMb2FkQWN0aW9uTWV0YSwgU2NoZW1hQWN0aW9uc0ZhY3RvcnksIFN1Y2NlZWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cblxuXG50eXBlIFBheWxvYWQgPSBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRCeVBrTWV0YSBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtFbnRpdHk6IG51bWJlciB9O1xuZXhwb3J0IHR5cGUgTG9hZFR5cGVzT2ZQcm9qZWN0QWN0aW9uID0gTG9hZEFjdGlvbk1ldGE7XG5leHBvcnQgaW50ZXJmYWNlIExvYWRUeXBlT2ZQcm9qZWN0QWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0VudGl0eTogbnVtYmVyIH07XG50eXBlIExvYWROZXN0ZXRlZFBlSXRSZXN1bHQgPSBJbmZQZXJzaXN0ZW50SXRlbVtdXG5cbmV4cG9ydCBjbGFzcyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBJbmZBY3Rpb25GYWN0b3J5PFBheWxvYWQsIEluZlBlcnNpc3RlbnRJdGVtPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgLy8gc3RhdGljIHJlYWRvbmx5IE5FU1RFRF9CWV9QSyA9ICdORVNURURfQllfUEsnO1xuICBzdGF0aWMgcmVhZG9ubHkgTUlOSU1BTF9CWV9QSyA9ICdNSU5JTUFMX0JZX1BLJztcbiAgc3RhdGljIHJlYWRvbmx5IFRZUEVTX09GX1BST0pFQ1QgPSAnVFlQRVNfT0ZfUFJPSkVDVCc7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX09GX1BST0pFQ1QgPSAnVFlQRV9PRl9QUk9KRUNUJztcblxuICBsb2FkTWluaW1hbDogKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPFNjaGVtYU9iamVjdD47XG4gIGxvYWROZXN0ZWRPYmplY3Q6IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxMb2FkTmVzdGV0ZWRQZUl0UmVzdWx0PjtcblxuICB0eXBlc09mUHJvamVjdDogKHBrUHJvamVjdDogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPExvYWRBY3Rpb25NZXRhPjtcbiAgLy8gdHlwZU9mUHJvamVjdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPExvYWROZXN0ZXRlZFBlSXRSZXN1bHQ+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlSW5mQWN0aW9ucyhpbmZSb290LCAncGVyc2lzdGVudF9pdGVtJykpXG5cbiAgICAvLyB0aGlzLmxvYWROZXN0ZWRPYmplY3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IHtcbiAgICAvLyAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcbiAgICAvLyAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRCeVBrTWV0YT4gPSB7XG4gICAgLy8gICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuTkVTVEVEX0JZX1BLLFxuICAgIC8vICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrOiBwa1Byb2plY3QsIHBrRW50aXR5IH0sXG4gICAgLy8gICAgIHBheWxvYWQ6IG51bGwsXG4gICAgLy8gICB9O1xuICAgIC8vICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAvLyAgIHJldHVybiB7XG4gICAgLy8gICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAvLyAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPExvYWROZXN0ZXRlZFBlSXRSZXN1bHQ+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgLy8gICAgIGtleTogYWRkUGVuZGluZ1xuICAgIC8vICAgfTtcbiAgICAvLyB9XG4gICAgdGhpcy5sb2FkTWluaW1hbCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpO1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEJ5UGtNZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5NSU5JTUFMX0JZX1BLLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrOiBwa1Byb2plY3QsIHBrRW50aXR5IH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFNjaGVtYU9iamVjdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgdGhpcy50eXBlc09mUHJvamVjdCA9IChwa1Byb2plY3Q6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpO1xuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkVHlwZXNPZlByb2plY3RBY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVTX09GX1BST0pFQ1QsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxMb2FkQWN0aW9uTWV0YT4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgLy8gdGhpcy50eXBlT2ZQcm9qZWN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyKSA9PiB7XG4gICAgLy8gICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG5cbiAgICAvLyAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRUeXBlT2ZQcm9qZWN0QWN0aW9uPiA9IHtcbiAgICAvLyAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5UWVBFX09GX1BST0pFQ1QsXG4gICAgLy8gICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGs6IHBrUHJvamVjdCwgcGtFbnRpdHkgfSxcbiAgICAvLyAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAvLyAgIH07XG4gICAgLy8gICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIC8vICAgcmV0dXJuIHtcbiAgICAvLyAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgIC8vICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TG9hZE5lc3RldGVkUGVJdFJlc3VsdD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAvLyAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgLy8gICB9O1xuICAgIC8vIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cbmV4cG9ydCB0eXBlIFBhZ2luYXRlZFN0YXRlbWVudHMgPSBudW1iZXJbXVxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0IHtcbiAgY291bnQ6IG51bWJlcixcbiAgc2NoZW1hczogU2NoZW1hT2JqZWN0LFxuICBwYWdpbmF0ZWRTdGF0ZW1lbnRzOiBQYWdpbmF0ZWRTdGF0ZW1lbnRzXG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YSBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHtcbiAgcGtTb3VyY2VFbnRpdHk6IG51bWJlciAvLyBQayBvZiB0aGUgc291cmNlIGVudGl0eS5cbiAgcGtQcm9wZXJ0eTogbnVtYmVyIC8vIFBrIG9mIHRoZSBwcm9wZXJ0eS5cbiAgZmtUYXJnZXRDbGFzczogbnVtYmVyIC8vIFBrIG9mIHRoZSB0YXJnZXQgY2xhc3MuXG4gIGlzT3V0Z29pbmc6IGJvb2xlYW4gLy8gSWYgdHJ1ZSwgdGhlIHNvdXJjZSBlbnRpdHkgaXMgZG9tYWluLCBlbHNlIHJhbmdlLlxuICBsaW1pdDogbnVtYmVyIC8vIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cbiAgb2Zmc2V0OiBudW1iZXIgLy8gb2Zmc2V0LlxuICBhbHRlcm5hdGl2ZXM6IGJvb2xlYW5cbn1cbmV4cG9ydCBjbGFzcyBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBJbmZBY3Rpb25GYWN0b3J5PFBheWxvYWQsIEluZlRlbXBvcmFsRW50aXR5PiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IE9XTl9QUk9QRVJUSUVTID0gJ09XTl9QUk9QRVJUSUVTJztcbiAgc3RhdGljIHJlYWRvbmx5IFBBR0lOQVRFRF9MSVNUID0gJ1BBR0lOQVRFRF9MSVNUJztcbiAgc3RhdGljIHJlYWRvbmx5IFBBR0lOQVRFRF9BTFRFUk5BVElWRV9MSVNUID0gJ1BBR0lOQVRFRF9BTFRFUk5BVElWRV9MSVNUJztcblxuICBsb2FkTmVzdGVkT2JqZWN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8SW5mVGVtcG9yYWxFbnRpdHlbXT47XG4gIGxvYWRQYWdpbmF0ZWRMaXN0OiAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0PjtcbiAgbG9hZFBhZ2luYXRlZEFsdGVybmF0aXZlTGlzdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa1NvdXJjZUVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVJbmZBY3Rpb25zKGluZlJvb3QsICd0ZW1wb3JhbF9lbnRpdHknKSlcblxuICAgIHRoaXMubG9hZE5lc3RlZE9iamVjdCA9IChwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkQnlQa01ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5Lk9XTl9QUk9QRVJUSUVTLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrOiBwa1Byb2plY3QsIHBrRW50aXR5IH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPEluZlRlbXBvcmFsRW50aXR5W10+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHRoaXMubG9hZFBhZ2luYXRlZExpc3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNULFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIHBrU291cmNlRW50aXR5LFxuICAgICAgICAgIGZrVGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICBhbHRlcm5hdGl2ZXM6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5sb2FkUGFnaW5hdGVkQWx0ZXJuYXRpdmVMaXN0ID0gKHBrUHJvamVjdDogbnVtYmVyLCBwa1NvdXJjZUVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfQUxURVJOQVRJVkVfTElTVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa1NvdXJjZUVudGl0eSxcbiAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgIGZrVGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgYWx0ZXJuYXRpdmVzOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPFBhZ2luYXRlZFN0YXRlbWVudExpc3Q+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbmV4cG9ydCBpbnRlcmZhY2UgRmluZFN0YXRlbWVudEJ5UGFyYW1zIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICBvZlByb2plY3Q6IGJvb2xlYW4sXG4gIHBrRW50aXR5OiBudW1iZXIsXG4gIHBrSW5mb1JhbmdlOiBudW1iZXIsXG4gIHBrSW5mb0RvbWFpbjogbnVtYmVyLFxuICBwa1Byb3BlcnR5OiBudW1iZXIsXG59XG5leHBvcnQgaW50ZXJmYWNlIENvbnRlbnRUcmVlTWV0YSBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHtcbiAgcGtFeHByZXNzaW9uRW50aXR5OiBudW1iZXIsXG59XG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5IGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEge1xuICBvZlByb2plY3Q6IGJvb2xlYW4sXG4gIHBrRW50aXR5OiBudW1iZXIsXG59XG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5UmVzdWx0IHtcbiAgc3RhdGVtZW50czogSW5mU3RhdGVtZW50W10sXG4gIGRpZ2l0YWxzOiBEYXREaWdpdGFsW10sXG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkT3V0Z29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHMgZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrVGVtcG9yYWxFbnRpdHk6IG51bWJlciwgcGtQcm9wZXJ0eTogbnVtYmVyIH07XG5leHBvcnQgaW50ZXJmYWNlIExvYWRJbmdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0VudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIgfTtcbmV4cG9ydCBpbnRlcmZhY2UgQWRkVG9Qcm9qZWN0V2l0aFRlRW50QWN0aW9uTWV0YSB7IHBrU3RhdGVtZW50czogbnVtYmVyW10sIHBrOiBudW1iZXIsIGFkZFBlbmRpbmc6IHN0cmluZyB9O1xuXG5leHBvcnQgY2xhc3MgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeSBleHRlbmRzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgSW5mU3RhdGVtZW50PiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgLy8gc3RhdGljIHJlYWRvbmx5IEFMVEVSTkFUSVZFU19PVVRHT0lORyA9ICdBTFRFUk5BVElWRVNfT1VUR09JTkcnO1xuICBzdGF0aWMgcmVhZG9ubHkgQUxURVJOQVRJVkVTX0lOR09JTkcgPSAnQUxURVJOQVRJVkVTX0lOR09JTkcnO1xuICAvLyBzdGF0aWMgcmVhZG9ubHkgQUREX1RPX1BST0pFQ1RfV0lUSF9URV9FTiA9ICdBRERfVE9fUFJPSkVDVF9XSVRIX1RFX0VOJztcbiAgc3RhdGljIHJlYWRvbmx5IFBBR0lOQVRFRF9MSVNUID0gJ1BBR0lOQVRFRF9MSVNUJztcbiAgc3RhdGljIHJlYWRvbmx5IENPTlRFTlRfVFJFRSA9ICdDT05URU5UX1RSRUUnO1xuICBzdGF0aWMgcmVhZG9ubHkgU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZID0gJ1NPVVJDRVNfQU5EX0RJR0lUQUxTX09GX0VOVElUWSc7XG4gIHN0YXRpYyByZWFkb25seSBCWV9QQVJBTVMgPSAnQllfUEFSQU1TJztcblxuICBsb2FkSW5nb2luZ0FsdGVybmF0aXZlczogKHBrRW50aXR5LCBwa1Byb3BlcnR5LCBwa1Byb2plYykgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnQ+O1xuICBsb2FkUGFnaW5hdGVkTGlzdDogKHBrUHJvamVjdDogbnVtYmVyLCBwa1NvdXJjZUVudGl0eTogbnVtYmVyLCBwa1Byb3BlcnR5OiBudW1iZXIsIGZrVGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8UGFnaW5hdGVkU3RhdGVtZW50TGlzdD47XG5cbiAgLy8gY29udGVudFRyZWU6IChwa1Byb2plY3Q6IG51bWJlciwgcGtFeHByZXNzaW9uRW50aXR5OiBudW1iZXIpID0+IHZvaWQ7XG4gIHNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5OiAob2ZQcm9qZWN0OiBib29sZWFuLCBwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdD47XG4gIGZpbmRCeVBhcmFtczogKFxuICAgIG9mUHJvamVjdDogYm9vbGVhbixcbiAgICBwa1Byb2plY3Q6IG51bWJlcixcbiAgICBwa0VudGl0eTogbnVtYmVyLFxuICAgIHBrSW5mb1JhbmdlOiBudW1iZXIsXG4gICAgcGtJbmZvRG9tYWluOiBudW1iZXIsXG4gICAgcGtQcm9wZXJ0eTogbnVtYmVyLFxuICApID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlSW5mQWN0aW9ucyhpbmZSb290LCAnc3RhdGVtZW50JykpXG5cbiAgICB0aGlzLmZpbmRCeVBhcmFtcyA9IChcbiAgICAgIG9mUHJvamVjdDogYm9vbGVhbixcbiAgICAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAgICAgcGtFbnRpdHk6IG51bWJlcixcbiAgICAgIHBrSW5mb1JhbmdlOiBudW1iZXIsXG4gICAgICBwa0luZm9Eb21haW46IG51bWJlcixcbiAgICAgIHBrUHJvcGVydHk6IG51bWJlcixcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIEZpbmRTdGF0ZW1lbnRCeVBhcmFtcz4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LkJZX1BBUkFNUyxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmc6IFUudXVpZCgpLFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgb2ZQcm9qZWN0LFxuICAgICAgICAgIHBrRW50aXR5LFxuICAgICAgICAgIHBrSW5mb1JhbmdlLFxuICAgICAgICAgIHBrSW5mb0RvbWFpbixcbiAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG5cbiAgICB0aGlzLmxvYWRJbmdvaW5nQWx0ZXJuYXRpdmVzID0gKHBrRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgcGtQcm9qZWN0OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEluZ29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHM+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVNfSU5HT0lORyxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa0VudGl0eSxcbiAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxJbmZTdGF0ZW1lbnQ+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHRoaXMubG9hZFBhZ2luYXRlZExpc3QgPSAocGtQcm9qZWN0OiBudW1iZXIsIHBrU291cmNlRW50aXR5OiBudW1iZXIsIHBrUHJvcGVydHk6IG51bWJlciwgZmtUYXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfTElTVCxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgcGs6IHBrUHJvamVjdCxcbiAgICAgICAgICBwa1NvdXJjZUVudGl0eSxcbiAgICAgICAgICBma1RhcmdldENsYXNzLFxuICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgYWx0ZXJuYXRpdmVzOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIEdldCBhbiBuZXN0ZWQgb2JqZWN0IHdpdGggZXZlcnl0aGluZyBuZWVkZWQgdG8gZGlzcGxheSB0aGVcbiAgICAqIGxpbmtzIG1hZGUgZnJvbSBhbiBlbnRpdHkgdG93YXJkcyBzb3VyY2VzIGFuZCBkaWdpdGFscy5cbiAgICAqL1xuICAgIHRoaXMuc291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHkgPSAob2ZQcm9qZWN0OiBib29sZWFuLCBwa1Byb2plY3Q6IG51bWJlciwgcGtFbnRpdHk6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eT4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LlNPVVJDRVNfQU5EX0RJR0lUQUxTX09GX0VOVElUWSxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFkZFBlbmRpbmcsXG4gICAgICAgICAgb2ZQcm9qZWN0LFxuICAgICAgICAgIHBrOiBwa1Byb2plY3QsXG4gICAgICAgICAgcGtFbnRpdHlcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8U291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQ+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBma0VudGl0eTogbnVtYmVyLCBma0NsYXNzRmllbGQ6IG51bWJlciB9O1xuXG5leHBvcnQgY2xhc3MgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSBleHRlbmRzIEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgSW5mVGV4dFByb3BlcnR5PiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IEFMVEVSTkFUSVZFUyA9ICdBTFRFUk5BVElWRVMnO1xuXG4gIGxvYWRBbHRlcm5hdGl2ZXM6IChma0VudGl0eSwgZmtDbGFzc0ZpZWxkLCBma1Byb2plY3QpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8SW5mVGV4dFByb3BlcnR5PjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVJbmZBY3Rpb25zKGluZlJvb3QsICd0ZXh0X3Byb3BlcnR5JykpXG5cbiAgICB0aGlzLmxvYWRBbHRlcm5hdGl2ZXMgPSAoZmtFbnRpdHk6IG51bWJlciwgZmtDbGFzc0ZpZWxkOiBudW1iZXIsIHBrUHJvamVjdDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuQUxURVJOQVRJVkVTLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWRkUGVuZGluZyxcbiAgICAgICAgICBwazogcGtQcm9qZWN0LFxuICAgICAgICAgIGZrRW50aXR5LFxuICAgICAgICAgIGZrQ2xhc3NGaWVsZCxcbiAgICAgICAgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8SW5mVGV4dFByb3BlcnR5Pj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZBY3Rpb25zIHtcblxuICBwZXJzaXN0ZW50X2l0ZW0gPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpO1xuICB0ZW1wb3JhbF9lbnRpdHkgPSBuZXcgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG4gIHN0YXRlbWVudCA9IG5ldyBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG5cbiAgLy8gVE9ETzogcGltcCB0aG9zZSB1cCB0byByZWFsIEluZiBBY3Rpb25zIVxuICBsYW5ndWFnZSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBJbmZMYW5ndWFnZT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAnbGFuZ3VhZ2UnKVxuICBhcHBlbGxhdGlvbiA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBJbmZBcHBlbGxhdGlvbj4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAnYXBwZWxsYXRpb24nKVxuICBsYW5nX3N0cmluZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBJbmZMYW5nU3RyaW5nPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGluZlJvb3QsICdsYW5nX3N0cmluZycpXG4gIGRpbWVuc2lvbiA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxJbmZEaW1lbnNpb25TbGljZSwgSW5mRGltZW5zaW9uPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGluZlJvb3QsICdkaW1lbnNpb24nKVxuICBwbGFjZSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBJbmZQbGFjZT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhpbmZSb290LCAncGxhY2UnKVxuICB0aW1lX3ByaW1pdGl2ZSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBJbmZUaW1lUHJpbWl0aXZlPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGluZlJvb3QsICd0aW1lX3ByaW1pdGl2ZScpXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=