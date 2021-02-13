import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
import { infRoot } from '../reducer-configs/inf.config';
import { InfActionFactory } from '../_helpers/inf-action-factory';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
;
;
export class InfPersistentItemActionFactory extends InfActionFactory {
    // typeOfProject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
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
        this.loadMinimal = (pkProject, pkEntity) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.MINIMAL_BY_PK,
                meta: { addPending, pk: pkProject, pkEntity },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        this.typesOfProject = (pkProject) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfPersistentItemActionFactory.TYPES_OF_PROJECT,
                meta: { addPending, pk: pkProject },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
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
export class InfTemporalEntityActionFactory extends InfActionFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'temporal_entity'));
        this.loadNestedObject = (pkProject, pkEntity) => {
            const addPending = U.uuid();
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + InfTemporalEntityActionFactory.OWN_PROPERTIES,
                meta: { addPending, pk: pkProject, pkEntity },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        this.loadPaginatedList = (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            const addPending = U.uuid();
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        this.loadPaginatedAlternativeList = (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            const addPending = U.uuid();
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        return this;
    }
}
// Suffixes of load action types
InfTemporalEntityActionFactory.OWN_PROPERTIES = 'OWN_PROPERTIES';
InfTemporalEntityActionFactory.PAGINATED_LIST = 'PAGINATED_LIST';
InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST = 'PAGINATED_ALTERNATIVE_LIST';
;
;
;
export class InfStatementActionFactory extends InfActionFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'statement'));
        this.findByParams = (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty) => {
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
        };
        this.loadIngoingAlternatives = (pkEntity, pkProperty, pkProject) => {
            const addPending = U.uuid();
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        this.loadPaginatedList = (pkProject, pkSourceEntity, pkProperty, fkTargetClass, isOutgoing, limit, offset) => {
            const addPending = U.uuid();
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        /**
        * Get an nested object with everything needed to display the
        * links made from an entity towards sources and digitals.
        */
        this.sourcesAndDigitalsOfEntity = (ofProject, pkProject, pkEntity) => {
            const addPending = U.uuid();
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
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
;
export class InfTextPropertyActionFactory extends InfActionFactory {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    createActions() {
        Object.assign(this, this.createInfActions(infRoot, 'text_property'));
        this.loadAlternatives = (fkEntity, fkClassField, pkProject) => {
            const addPending = U.uuid();
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
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter(x => !!x)),
                key: addPending
            };
        };
        return this;
    }
}
// Suffixes of load action types
InfTextPropertyActionFactory.ALTERNATIVES = 'ALTERNATIVES';
let InfActions = class InfActions {
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
};
InfActions = tslib_1.__decorate([
    Injectable()
], InfActions);
export { InfActions };
//# sourceMappingURL=inf.actions.js.map