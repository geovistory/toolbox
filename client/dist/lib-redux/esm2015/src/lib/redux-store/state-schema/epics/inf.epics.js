/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/inf.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { InfPersistentItemApi, InfStatementApi, InfTemporalEntityApi, InfTextPropertyApi, ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { InfActions, InfPersistentItemActionFactory, InfStatementActionFactory, InfTemporalEntityActionFactory, InfTextPropertyActionFactory } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { infRoot } from '../reducer-configs/inf.config';
import { SchemaService } from '../services/schema.service';
import { Flattener, storeFlattened } from '../_helpers/flattener';
import { InfEpicsFactory } from '../_helpers/inf-epic-factory';
import * as i0 from "@angular/core";
import * as i1 from "../../state-gui/actions/notifications.actions";
import * as i2 from "@kleiolab/lib-sdk-lb3";
import * as i3 from "../actions/inf.actions";
import * as i4 from "../actions/pro.actions";
import * as i5 from "../actions/dat.actions";
import * as i6 from "../services/schema.service";
export class InfEpics {
    /**
     * @param {?} notification
     * @param {?} peItApi
     * @param {?} teEnApi
     * @param {?} statementApi
     * @param {?} textPropertyApi
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} datActions
     * @param {?} infoProjRelApi
     * @param {?} schemaObjectService
     */
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
    /**
     * @return {?}
     */
    createEpics() {
        /** @type {?} */
        const infPersistentItemEpicsFactory = new InfEpicsFactory(infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        const infTemporalEntityEpicsFactory = new InfEpicsFactory(infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        const infStatementEpicsFactory = new InfEpicsFactory(infRoot, 'statement', this.infActions.statement, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        const infTextPropertyEpicsFactory = new InfEpicsFactory(infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi, this.proActions);
        return combineEpics(
        /**
         * Perstistent Item
         *
         */
        infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.peItApi.ownProperties(meta.pk, meta.pkEntity)), InfPersistentItemActionFactory.MINIMAL_BY_PK, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            // call action to store records
            Object.keys(schemas).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            schema => {
                /** @type {?} */
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                if (actions) {
                    Object.keys(schemas[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    model => {
                        actions[model].loadSucceeded(schemas[schema][model], undefined, pk);
                    }));
                }
            }));
        })), infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.peItApi.typesOfProject(meta.pk)), InfPersistentItemActionFactory.TYPES_OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemaObject = (/** @type {?} */ (results));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })), 
        // infPersistentItemEpicsFactory.createLoadEpic<LoadTypeOfProjectAction>(
        //   (meta) => this.peItApi.typeOfProject(meta.pk, meta.pkEntity),
        //   InfPersistentItemActionFactory.TYPE_OF_PROJECT,
        //   (results, pk) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.persistent_item.flatten(results);
        //     storeFlattened(flattener.getFlattened(), pk);
        //   }
        // ),
        infPersistentItemEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.peItApi
            .findOrCreateInfPersistentItems(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.persistent_item.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), infPersistentItemEpicsFactory.createRemoveEpic(), 
        /**
         * Temporal Entity
         *
         */
        infTemporalEntityEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.teEnApi.ownProperties(meta.pk, meta.pkEntity)), InfTemporalEntityActionFactory.OWN_PROPERTIES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemaObject = (/** @type {?} */ (results));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })), (/**
         * Epic to load paginated Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        (globalActions) => {
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const apiCal$ = this.teEnApi.temporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            const pkProject = meta.pk;
            this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })))))), (/**
         * Epic to load paginated Alternative Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        (globalActions) => {
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const apiCal$ = this.teEnApi.alternativeTemporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            const pkProject = null;
            this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })))))), infTemporalEntityEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.teEnApi
            .findOrCreateInfTemporalEntities(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.temporal_entity.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), infTemporalEntityEpicsFactory.createRemoveEpic(), 
        /**
         * Statement
         *
         */
        infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk)), InfStatementActionFactory.ALTERNATIVES_INGOING, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infStatementEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi
            .findOrCreateInfStatements(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(infStatementEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        (globalActions) => {
            /** @type {?} */
            const meta = action.meta;
            /** @type {?} */
            const apiCal$ = this.statementApi.paginatedListTargetingEntityPreviews(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            const pkProject = meta.pk;
            this.handleTemporalEntityListAction(action, infStatementEpicsFactory, globalActions, apiCal$, pkProject);
        })))))), infStatementEpicsFactory.createRemoveEpic(), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty)), InfStatementActionFactory.BY_PARAMS, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'LOAD');
        })), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity)), InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const res = (/** @type {?} */ ((/** @type {?} */ (results))));
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.statement.flatten(res.statements);
            storeFlattened(flattener.getFlattened(), pk);
            /** @type {?} */
            const flattener2 = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener2.digital.flatten(res.digitals);
            storeFlattened(flattener2.getFlattened(), pk);
        })), 
        /**
         * Text Property
         *
         */
        infTextPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi
            .findAlternativeTextProperties(meta.pk, meta.fkEntity, meta.fkClassField)), InfTextPropertyActionFactory.ALTERNATIVES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi
            .findOrCreateInfTextProperties(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), infTextPropertyEpicsFactory.createRemoveEpic());
    }
    /**
     * handles the update of store for paginated temporal entity lists.
     * @private
     * @template M
     * @param {?} action
     * @param {?} epicsFactory
     * @param {?} globalActions
     * @param {?} apiCall$
     * @param {?} pkProject if null, list is handled as 'repo' list
     *
     * TODO remove
     * @return {?}
     */
    handleTemporalEntityListAction(action, epicsFactory, globalActions, apiCall$, pkProject) {
        /** @type {?} */
        const meta = action.meta;
        /** @type {?} */
        const scope = meta.alternatives ? { notInProject: pkProject } : { inProject: pkProject };
        /** @type {?} */
        const req = {
            source: { fkInfo: meta.pkSourceEntity },
            property: { fkProperty: meta.pkProperty },
            isOutgoing: meta.isOutgoing,
            limit: meta.limit,
            offset: meta.offset,
            scope,
        };
        /** @type {?} */
        const pendingKey = meta.addPending;
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(req, pkProject);
        // call api to load data
        apiCall$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            // call action to store records
            this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, req, pkProject);
            // call action to conclude the pending request
            epicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            // call action to handle error
            epicsFactory.onError(globalActions, error, pendingKey, pkProject);
        }));
    }
}
InfEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InfEpics.ctorParameters = () => [
    { type: NotificationsAPIActions },
    { type: InfPersistentItemApi },
    { type: InfTemporalEntityApi },
    { type: InfStatementApi },
    { type: InfTextPropertyApi },
    { type: InfActions },
    { type: ProActions },
    { type: DatActions },
    { type: ProInfoProjRelApi },
    { type: SchemaService }
];
/** @nocollapse */ InfEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function InfEpics_Factory() { return new InfEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.InfPersistentItemApi), i0.ɵɵinject(i2.InfTemporalEntityApi), i0.ɵɵinject(i2.InfStatementApi), i0.ɵɵinject(i2.InfTextPropertyApi), i0.ɵɵinject(i3.InfActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.DatActions), i0.ɵɵinject(i2.ProInfoProjRelApi), i0.ɵɵinject(i6.SchemaService)); }, token: InfEpics, providedIn: "root" });
if (false) {
    /** @type {?} */
    InfEpics.prototype.notification;
    /** @type {?} */
    InfEpics.prototype.peItApi;
    /** @type {?} */
    InfEpics.prototype.teEnApi;
    /** @type {?} */
    InfEpics.prototype.statementApi;
    /** @type {?} */
    InfEpics.prototype.textPropertyApi;
    /** @type {?} */
    InfEpics.prototype.infActions;
    /** @type {?} */
    InfEpics.prototype.proActions;
    /** @type {?} */
    InfEpics.prototype.datActions;
    /** @type {?} */
    InfEpics.prototype.infoProjRelApi;
    /**
     * @type {?}
     * @private
     */
    InfEpics.prototype.schemaObjectService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixvQkFBb0IsRUFBZ0IsZUFBZSxFQUFxQixvQkFBb0IsRUFBbUIsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdoTixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQXlCLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSx5QkFBeUIsRUFBRSw4QkFBOEIsRUFBRSw0QkFBNEIsRUFBdU0sTUFBTSx3QkFBd0IsQ0FBQztBQUN6WSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7QUFNL0QsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7Ozs7Ozs7SUFDbkIsWUFDUyxZ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QUssRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2UUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBYlEsdUJBQXVCO1lBUEosb0JBQW9CO1lBQW9ELG9CQUFvQjtZQUF4RCxlQUFlO1lBQTRELGtCQUFrQjtZQVM3SCxVQUFVO1lBQ2pDLFVBQVU7WUFGVixVQUFVO1lBUjRJLGlCQUFpQjtZQWF2SyxhQUFhOzs7OztJQVVsQixnQ0FBNEM7O0lBQzVDLDJCQUFvQzs7SUFDcEMsMkJBQW9DOztJQUNwQyxnQ0FBb0M7O0lBQ3BDLG1DQUEwQzs7SUFDMUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0Isa0NBQXdDOzs7OztJQUN4Qyx1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGVyc2lzdGVudEl0ZW1BcGksIEluZlN0YXRlbWVudCwgSW5mU3RhdGVtZW50QXBpLCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGVtcG9yYWxFbnRpdHlBcGksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGV4dFByb3BlcnR5QXBpLCBQcm9JbmZvUHJvalJlbEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdkZpZWxkUGFnZSwgR3ZGaWVsZFBhZ2VTY29wZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IEZpbmRTdGF0ZW1lbnRCeVBhcmFtcywgSW5mQWN0aW9ucywgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LCBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LCBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnksIEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnksIExvYWRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzLCBMb2FkQnlQa01ldGEsIExvYWRJbmdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzLCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEsIFBhZ2luYXRlZFN0YXRlbWVudExpc3QsIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5LCBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdCB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mU3RhdGVtZW50U2xpY2UsIEluZlRlbXBvcmFsRW50aXR5U2xpY2UsIEluZlRleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2luZi5tb2RlbHMnO1xuaW1wb3J0IHsgaW5mUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9pbmYuY29uZmlnJztcbmltcG9ydCB7IFNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMvZmxhdHRlbmVyJztcbmltcG9ydCB7IEluZkVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL2luZi1lcGljLWZhY3RvcnknO1xuaW1wb3J0IHsgRmx1eEFjdGlvbk9ic2VydmFibGUsIE1vZGlmeUFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSW5mRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgcGVJdEFwaTogSW5mUGVyc2lzdGVudEl0ZW1BcGksXG4gICAgcHVibGljIHRlRW5BcGk6IEluZlRlbXBvcmFsRW50aXR5QXBpLFxuICAgIHB1YmxpYyBzdGF0ZW1lbnRBcGk6IEluZlN0YXRlbWVudEFwaSxcbiAgICBwdWJsaWMgdGV4dFByb3BlcnR5QXBpOiBJbmZUZXh0UHJvcGVydHlBcGksXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIGluZm9Qcm9qUmVsQXBpOiBQcm9JbmZvUHJvalJlbEFwaSxcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYVNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtPlxuICAgICAgKGluZlJvb3QsICdwZXJzaXN0ZW50X2l0ZW0nLCB0aGlzLmluZkFjdGlvbnMucGVyc2lzdGVudF9pdGVtLCB0aGlzLm5vdGlmaWNhdGlvbiwgdGhpcy5pbmZvUHJvalJlbEFwaSwgdGhpcy5wcm9BY3Rpb25zKTtcblxuICAgIGNvbnN0IGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5ID0gbmV3IEluZkVwaWNzRmFjdG9yeTxJbmZUZW1wb3JhbEVudGl0eVNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eT5cbiAgICAgIChpbmZSb290LCAndGVtcG9yYWxfZW50aXR5JywgdGhpcy5pbmZBY3Rpb25zLnRlbXBvcmFsX2VudGl0eSwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICBjb25zdCBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlN0YXRlbWVudFNsaWNlLCBJbmZTdGF0ZW1lbnQ+XG4gICAgICAoaW5mUm9vdCwgJ3N0YXRlbWVudCcsIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQsIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgY29uc3QgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5ID0gbmV3IEluZkVwaWNzRmFjdG9yeTxJbmZUZXh0UHJvcGVydHlTbGljZSwgSW5mVGV4dFByb3BlcnR5PlxuICAgICAgKGluZlJvb3QsICd0ZXh0X3Byb3BlcnR5JywgdGhpcy5pbmZBY3Rpb25zLnRleHRfcHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8qKlxuICAgICAgICogUGVyc3Rpc3RlbnQgSXRlbVxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtNZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMucGVJdEFwaS5vd25Qcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgICBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuTUlOSU1BTF9CWV9QSyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICAgICAgT2JqZWN0LmtleXMoc2NoZW1hcykuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgICAgICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gICAgICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWFzW3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQoc2NoZW1hc1tzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwaylcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtNZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMucGVJdEFwaS50eXBlc09mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVTX09GX1BST0pFQ1QsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFPYmplY3QsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLy8gaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZFR5cGVPZlByb2plY3RBY3Rpb24+KFxuICAgICAgLy8gICAobWV0YSkgPT4gdGhpcy5wZUl0QXBpLnR5cGVPZlByb2plY3QobWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAvLyAgIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5UWVBFX09GX1BST0pFQ1QsXG4gICAgICAvLyAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgLy8gICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAvLyAgICAgZmxhdHRlbmVyLnBlcnNpc3RlbnRfaXRlbS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgLy8gICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgLy8gICB9XG4gICAgICAvLyApLFxuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlBlcnNpc3RlbnRJdGVtPj4oKG1ldGEpID0+IHRoaXMucGVJdEFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mUGVyc2lzdGVudEl0ZW1zKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wZXJzaXN0ZW50X2l0ZW0uZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cblxuICAgICAgLyoqXG4gICAgICAgKiBUZW1wb3JhbCBFbnRpdHlcbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRCeVBrTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnRlRW5BcGkub3duUHJvcGVydGllcyhtZXRhLnBrLCBtZXRhLnBrRW50aXR5KSxcbiAgICAgICAgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5Lk9XTl9QUk9QRVJUSUVTLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFPYmplY3QgPSByZXN1bHRzIGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogRXBpYyB0byBsb2FkIHBhZ2luYXRlZCBUZW1wb3JhbCBFbnRpdHkgTGlzdFxuICAgICAgICovXG4gICAgICAoYWN0aW9uJDogRmx1eEFjdGlvbk9ic2VydmFibGU8YW55LCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+LCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkudHlwZSgnTE9BRCcsIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfTElTVCkpLFxuICAgICAgICBtZXJnZU1hcChhY3Rpb24gPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICAgICAgICBjb25zdCBhcGlDYWwkID0gdGhpcy50ZUVuQXBpLnRlbXBvcmFsRW50aXR5TGlzdChcbiAgICAgICAgICAgIG1ldGEucGssIG1ldGEucGtTb3VyY2VFbnRpdHksIG1ldGEucGtQcm9wZXJ0eSwgbWV0YS5ma1RhcmdldENsYXNzLCBtZXRhLmlzT3V0Z29pbmcsIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0XG4gICAgICAgICAgKVxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IG1ldGEucGs7XG4gICAgICAgICAgdGhpcy5oYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb24oYWN0aW9uLCBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeSwgZ2xvYmFsQWN0aW9ucywgYXBpQ2FsJCwgcGtQcm9qZWN0KTtcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBFcGljIHRvIGxvYWQgcGFnaW5hdGVkIEFsdGVybmF0aXZlIFRlbXBvcmFsIEVudGl0eSBMaXN0XG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxhbnksIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS50eXBlKCdMT0FEJywgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9BTFRFUk5BVElWRV9MSVNUKSksXG4gICAgICAgIG1lcmdlTWFwKGFjdGlvbiA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IGFwaUNhbCQgPSB0aGlzLnRlRW5BcGkuYWx0ZXJuYXRpdmVUZW1wb3JhbEVudGl0eUxpc3QoXG4gICAgICAgICAgICBtZXRhLnBrLCBtZXRhLnBrU291cmNlRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEuZmtUYXJnZXRDbGFzcywgbWV0YS5pc091dGdvaW5nLCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldFxuICAgICAgICAgIClcbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBudWxsO1xuICAgICAgICAgIHRoaXMuaGFuZGxlVGVtcG9yYWxFbnRpdHlMaXN0QWN0aW9uKGFjdGlvbiwgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnksIGdsb2JhbEFjdGlvbnMsIGFwaUNhbCQsIHBrUHJvamVjdCk7XG4gICAgICAgIH0pKVxuICAgICAgKSxcbiAgICAgIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxJbmZUZW1wb3JhbEVudGl0eT4+KChtZXRhKSA9PiB0aGlzLnRlRW5BcGlcbiAgICAgICAgLmZpbmRPckNyZWF0ZUluZlRlbXBvcmFsRW50aXRpZXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnRlbXBvcmFsX2VudGl0eS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuXG4gICAgICAvKipcbiAgICAgICAqIFN0YXRlbWVudFxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRJbmdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuc3RhdGVtZW50QXBpLmFsdGVybmF0aXZlc05vdEluUHJvamVjdEJ5RW50aXR5UGsobWV0YS5wa0VudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLnBrKSxcbiAgICAgICAgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVNfSU5HT0lORyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuc3RhdGVtZW50LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mU3RhdGVtZW50Pj4oKG1ldGEpID0+IHRoaXMuc3RhdGVtZW50QXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZTdGF0ZW1lbnRzKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxhbnksIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkudHlwZSgnTE9BRCcsIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfTElTVCkpLFxuICAgICAgICBtZXJnZU1hcChhY3Rpb24gPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICAgICAgICBjb25zdCBhcGlDYWwkID0gdGhpcy5zdGF0ZW1lbnRBcGkucGFnaW5hdGVkTGlzdFRhcmdldGluZ0VudGl0eVByZXZpZXdzKFxuICAgICAgICAgICAgbWV0YS5waywgbWV0YS5wa1NvdXJjZUVudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLmZrVGFyZ2V0Q2xhc3MsIG1ldGEuaXNPdXRnb2luZywgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXRcbiAgICAgICAgICApXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gbWV0YS5waztcbiAgICAgICAgICB0aGlzLmhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbihhY3Rpb24sIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeSwgZ2xvYmFsQWN0aW9ucywgYXBpQ2FsJCwgcGtQcm9qZWN0KTtcbiAgICAgICAgfSkpXG4gICAgICApLFxuXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlUmVtb3ZlRXBpYygpLFxuXG5cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxGaW5kU3RhdGVtZW50QnlQYXJhbXM+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGkucXVlcnlCeVBhcmFtcyhtZXRhLm9mUHJvamVjdCwgbWV0YS5waywgbWV0YS5wa0VudGl0eSwgbWV0YS5wa0luZm9SYW5nZSwgbWV0YS5wa0luZm9Eb21haW4sIG1ldGEucGtQcm9wZXJ0eSksXG4gICAgICAgIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuQllfUEFSQU1TLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnTE9BRCcpO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8U291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHk+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGkuc291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHkobWV0YS5vZlByb2plY3QsIG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgICBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LlNPVVJDRVNfQU5EX0RJR0lUQUxTX09GX0VOVElUWSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gcmVzdWx0cyBhcyBhbnkgYXMgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQ7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuc3RhdGVtZW50LmZsYXR0ZW4ocmVzLnN0YXRlbWVudHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuXG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyMiA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyMi5kaWdpdGFsLmZsYXR0ZW4ocmVzLmRpZ2l0YWxzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG5cbiAgICAgICAgfVxuICAgICAgKSxcblxuXG5cbiAgICAgIC8qKlxuICAgICAgICogVGV4dCBQcm9wZXJ0eVxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzPigobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGlcbiAgICAgICAgLmZpbmRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEuZmtFbnRpdHksIG1ldGEuZmtDbGFzc0ZpZWxkKSxcbiAgICAgICAgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVMsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnRleHRfcHJvcGVydHkuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIG51bGwpO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlRleHRQcm9wZXJ0eT4+KChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mVGV4dFByb3BlcnRpZXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnRleHRfcHJvcGVydHkuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlRleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cbiAgICApO1xuICB9XG5cblxuICAvKipcbiAgICogaGFuZGxlcyB0aGUgdXBkYXRlIG9mIHN0b3JlIGZvciBwYWdpbmF0ZWQgdGVtcG9yYWwgZW50aXR5IGxpc3RzLlxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IGlmIG51bGwsIGxpc3QgaXMgaGFuZGxlZCBhcyAncmVwbycgbGlzdFxuICAgKlxuICAgKiBUT0RPIHJlbW92ZVxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb248TT4oXG4gICAgYWN0aW9uLFxuICAgIGVwaWNzRmFjdG9yeTogSW5mRXBpY3NGYWN0b3J5PEluZlRlbXBvcmFsRW50aXR5U2xpY2UsIEluZlRlbXBvcmFsRW50aXR5PiB8IEluZkVwaWNzRmFjdG9yeTxJbmZTdGF0ZW1lbnRTbGljZSwgSW5mU3RhdGVtZW50PixcbiAgICBnbG9iYWxBY3Rpb25zLFxuICAgIGFwaUNhbGwkOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgcGtQcm9qZWN0KSB7XG4gICAgY29uc3QgbWV0YTogTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgY29uc3Qgc2NvcGU6IEd2RmllbGRQYWdlU2NvcGUgPSBtZXRhLmFsdGVybmF0aXZlcyA/IHsgbm90SW5Qcm9qZWN0OiBwa1Byb2plY3QgfSA6IHsgaW5Qcm9qZWN0OiBwa1Byb2plY3QgfVxuICAgIGNvbnN0IHJlcTogR3ZGaWVsZFBhZ2UgPSB7XG4gICAgICBzb3VyY2U6IHsgZmtJbmZvOiBtZXRhLnBrU291cmNlRW50aXR5IH0sXG4gICAgICBwcm9wZXJ0eTogeyBma1Byb3BlcnR5OiBtZXRhLnBrUHJvcGVydHkgfSxcbiAgICAgIGlzT3V0Z29pbmc6IG1ldGEuaXNPdXRnb2luZyxcbiAgICAgIGxpbWl0OiBtZXRhLmxpbWl0LFxuICAgICAgb2Zmc2V0OiBtZXRhLm9mZnNldCxcbiAgICAgIHNjb3BlLFxuICAgIH1cbiAgICBjb25zdCBwZW5kaW5nS2V5ID0gbWV0YS5hZGRQZW5kaW5nO1xuXG4gICAgLy8gY2FsbCBhY3Rpb24gdG8gc2V0IHBhZ2luYXRpb24gbG9hZGluZyBvbiB0cnVlXG4gICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZShyZXEsIHBrUHJvamVjdCk7XG4gICAgLy8gY2FsbCBhcGkgdG8gbG9hZCBkYXRhXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKChkYXRhOiBQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0KSA9PiB7XG4gICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3QoZGF0YS5zY2hlbWFzLCBwa1Byb2plY3QpO1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcGFnaW5hdGlvblxuICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZVN1Y2NlZWRlZChkYXRhLnBhZ2luYXRlZFN0YXRlbWVudHMsIGRhdGEuY291bnQsIHJlcSwgcGtQcm9qZWN0KTtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGNvbmNsdWRlIHRoZSBwZW5kaW5nIHJlcXVlc3RcbiAgICAgIGVwaWNzRmFjdG9yeS5hY3Rpb25zLmxvYWRTdWNjZWVkZWQoW10sIHBlbmRpbmdLZXksIHBrUHJvamVjdCk7XG4gICAgfSwgZXJyb3IgPT4ge1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gaGFuZGxlIGVycm9yXG4gICAgICBlcGljc0ZhY3Rvcnkub25FcnJvcihnbG9iYWxBY3Rpb25zLCBlcnJvciwgcGVuZGluZ0tleSwgcGtQcm9qZWN0KTtcbiAgICB9KTtcbiAgfVxufVxuIl19