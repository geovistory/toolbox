import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Flattener, storeFlattened } from 'projects/app-toolbox/src/app/core/redux-store/flattener';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { InfEpicsFactory } from './inf-epic-factory';
import { InfPersistentItemActionFactory, InfStatementActionFactory, InfTemporalEntityActionFactory, InfTextPropertyActionFactory } from './inf.actions';
import { infRoot } from './inf.config';
let InfEpics = class InfEpics {
    constructor(notification, peItApi, teEnApi, statementApi, textPropertyApi, infActions, proActions, datActions, infoProjRelApi, schemaObjectService) {
        this.notification = notification;
        this.peItApi = peItApi;
        this.teEnApi = teEnApi;
        this.statementApi = statementApi;
        this.textPropertyApi = textPropertyApi;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.infoProjRelApi = infoProjRelApi;
        this.schemaObjectService = schemaObjectService;
    }
    createEpics() {
        const infPersistentItemEpicsFactory = new InfEpicsFactory(infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi, this.proActions);
        const infTemporalEntityEpicsFactory = new InfEpicsFactory(infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi, this.proActions);
        const infStatementEpicsFactory = new InfEpicsFactory(infRoot, 'statement', this.infActions.statement, this.notification, this.infoProjRelApi, this.proActions);
        const infTextPropertyEpicsFactory = new InfEpicsFactory(infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi, this.proActions);
        return combineEpics(
        /**
         * Perstistent Item
         *
         */
        infPersistentItemEpicsFactory.createLoadEpic((meta) => this.peItApi.ownProperties(meta.pk, meta.pkEntity), InfPersistentItemActionFactory.MINIMAL_BY_PK, (results, pk) => {
            const schemas = results;
            // call action to store records
            Object.keys(schemas).forEach(schema => {
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                if (actions) {
                    Object.keys(schemas[schema]).forEach(model => {
                        actions[model].loadSucceeded(schemas[schema][model], undefined, pk);
                    });
                }
            });
        }), infPersistentItemEpicsFactory.createLoadEpic((meta) => this.peItApi.typesOfProject(meta.pk), InfPersistentItemActionFactory.TYPES_OF_PROJECT, (results, pk) => {
            const schemaObject = results;
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        }), 
        // infPersistentItemEpicsFactory.createLoadEpic<LoadTypeOfProjectAction>(
        //   (meta) => this.peItApi.typeOfProject(meta.pk, meta.pkEntity),
        //   InfPersistentItemActionFactory.TYPE_OF_PROJECT,
        //   (results, pk) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.persistent_item.flatten(results);
        //     storeFlattened(flattener.getFlattened(), pk);
        //   }
        // ),
        infPersistentItemEpicsFactory.createUpsertEpic((meta) => this.peItApi
            .findOrCreateInfPersistentItems(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.persistent_item.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), infPersistentItemEpicsFactory.createRemoveEpic(), 
        /**
         * Temporal Entity
         *
         */
        infTemporalEntityEpicsFactory.createLoadEpic((meta) => this.teEnApi.ownProperties(meta.pk, meta.pkEntity), InfTemporalEntityActionFactory.OWN_PROPERTIES, (results, pk) => {
            const schemaObject = results;
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        }), 
        /**
         * Epic to load paginated Temporal Entity List
         */
        (action$, store) => action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap(action => new Observable((globalActions) => {
            const meta = action.meta;
            const apiCal$ = this.teEnApi.temporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            const pkProject = meta.pk;
            this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        }))), 
        /**
         * Epic to load paginated Alternative Temporal Entity List
         */
        (action$, store) => action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)), mergeMap(action => new Observable((globalActions) => {
            const meta = action.meta;
            const apiCal$ = this.teEnApi.alternativeTemporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            const pkProject = null;
            this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        }))), infTemporalEntityEpicsFactory.createUpsertEpic((meta) => this.teEnApi
            .findOrCreateInfTemporalEntities(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.temporal_entity.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), infTemporalEntityEpicsFactory.createRemoveEpic(), 
        /**
         * Statement
         *
         */
        infStatementEpicsFactory.createLoadEpic((meta) => this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk), InfStatementActionFactory.ALTERNATIVES_INGOING, (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        }), infStatementEpicsFactory.createUpsertEpic((meta) => this.statementApi
            .findOrCreateInfStatements(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), (action$, store) => action$.pipe(ofType(infStatementEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap(action => new Observable((globalActions) => {
            const meta = action.meta;
            const apiCal$ = this.statementApi.paginatedListTargetingEntityPreviews(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            const pkProject = meta.pk;
            this.handleTemporalEntityListAction(action, infStatementEpicsFactory, globalActions, apiCal$, pkProject);
        }))), infStatementEpicsFactory.createRemoveEpic(), infStatementEpicsFactory.createLoadEpic((meta) => this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty), InfStatementActionFactory.BY_PARAMS, (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'LOAD');
        }), infStatementEpicsFactory.createLoadEpic((meta) => this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity), InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY, (results, pk) => {
            const res = results;
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(res.statements);
            storeFlattened(flattener.getFlattened(), pk);
            const flattener2 = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener2.digital.flatten(res.digitals);
            storeFlattened(flattener2.getFlattened(), pk);
        }), 
        /**
         * Text Property
         *
         */
        infTextPropertyEpicsFactory.createLoadEpic((meta) => this.textPropertyApi
            .findAlternativeTextProperties(meta.pk, meta.fkEntity, meta.fkClassField), InfTextPropertyActionFactory.ALTERNATIVES, (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        }), infTextPropertyEpicsFactory.createUpsertEpic((meta) => this.textPropertyApi
            .findOrCreateInfTextProperties(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        }), infTextPropertyEpicsFactory.createRemoveEpic());
    }
    /**
     * handles the update of store for paginated temporal entity lists.
     * @param pkProject if null, list is handled as 'repo' list
     */
    handleTemporalEntityListAction(action, epicsFactory, globalActions, apiCall$, pkProject) {
        const meta = action.meta;
        const pendingKey = meta.addPending;
        const paginateBy = [
            { fk_property: meta.pkProperty },
            { fk_target_class: meta.fkTargetClass },
            { [meta.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: meta.pkSourceEntity },
            { [meta.alternatives ? 'alternatives' : 'ofProject']: meta.alternatives }
        ];
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
        // call api to load data
        apiCall$.subscribe((data) => {
            // call action to store records
            this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, paginateBy, meta.limit, meta.offset, pkProject);
            // call action to conclude the pending request
            epicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
        }, error => {
            // call action to handle error
            epicsFactory.onError(globalActions, error, pendingKey, pkProject);
        });
    }
};
InfEpics = tslib_1.__decorate([
    Injectable()
], InfEpics);
export { InfEpics };
//# sourceMappingURL=inf.epics.js.map