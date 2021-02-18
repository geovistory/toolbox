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
     * @return {?}
     */
    handleTemporalEntityListAction(action, epicsFactory, globalActions, apiCall$, pkProject) {
        /** @type {?} */
        const meta = action.meta;
        /** @type {?} */
        const pendingKey = meta.addPending;
        /** @type {?} */
        const paginateBy = [
            { fk_property: meta.pkProperty },
            { fk_target_class: meta.fkTargetClass },
            { [meta.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: meta.pkSourceEntity },
            { [meta.alternatives ? 'alternatives' : 'ofProject']: meta.alternatives }
        ];
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
        // call api to load data
        apiCall$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            // call action to store records
            this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, paginateBy, meta.limit, meta.offset, pkProject);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixvQkFBb0IsRUFBZ0IsZUFBZSxFQUFxQixvQkFBb0IsRUFBbUIsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoTixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQXlCLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSx5QkFBeUIsRUFBRSw4QkFBOEIsRUFBRSw0QkFBNEIsRUFBdU0sTUFBTSx3QkFBd0IsQ0FBQztBQUN6WSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7QUFNL0QsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7Ozs7Ozs7SUFDbkIsWUFDUyxZ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Q1QsOEJBQThCO1lBQzlCLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFqUUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBYlEsdUJBQXVCO1lBTkosb0JBQW9CO1lBQW9ELG9CQUFvQjtZQUF4RCxlQUFlO1lBQTRELGtCQUFrQjtZQVE3SCxVQUFVO1lBQ2pDLFVBQVU7WUFGVixVQUFVO1lBUDRJLGlCQUFpQjtZQVl2SyxhQUFhOzs7OztJQVVsQixnQ0FBNEM7O0lBQzVDLDJCQUFvQzs7SUFDcEMsMkJBQW9DOztJQUNwQyxnQ0FBb0M7O0lBQ3BDLG1DQUEwQzs7SUFDMUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0Isa0NBQXdDOzs7OztJQUN4Qyx1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGVyc2lzdGVudEl0ZW1BcGksIEluZlN0YXRlbWVudCwgSW5mU3RhdGVtZW50QXBpLCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGVtcG9yYWxFbnRpdHlBcGksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGV4dFByb3BlcnR5QXBpLCBQcm9JbmZvUHJvalJlbEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IEZpbmRTdGF0ZW1lbnRCeVBhcmFtcywgSW5mQWN0aW9ucywgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LCBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LCBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnksIEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnksIExvYWRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzLCBMb2FkQnlQa01ldGEsIExvYWRJbmdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzLCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEsIFBhZ2luYXRlZFN0YXRlbWVudExpc3QsIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5LCBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdCB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mU3RhdGVtZW50U2xpY2UsIEluZlRlbXBvcmFsRW50aXR5U2xpY2UsIEluZlRleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2luZi5tb2RlbHMnO1xuaW1wb3J0IHsgaW5mUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9pbmYuY29uZmlnJztcbmltcG9ydCB7IFNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMvZmxhdHRlbmVyJztcbmltcG9ydCB7IEluZkVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL2luZi1lcGljLWZhY3RvcnknO1xuaW1wb3J0IHsgRmx1eEFjdGlvbk9ic2VydmFibGUsIE1vZGlmeUFjdGlvbk1ldGEsIFBhZ2luYXRlQnlQYXJhbSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBJbmZFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBwZUl0QXBpOiBJbmZQZXJzaXN0ZW50SXRlbUFwaSxcbiAgICBwdWJsaWMgdGVFbkFwaTogSW5mVGVtcG9yYWxFbnRpdHlBcGksXG4gICAgcHVibGljIHN0YXRlbWVudEFwaTogSW5mU3RhdGVtZW50QXBpLFxuICAgIHB1YmxpYyB0ZXh0UHJvcGVydHlBcGk6IEluZlRleHRQcm9wZXJ0eUFwaSxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mb1Byb2pSZWxBcGk6IFByb0luZm9Qcm9qUmVsQXBpLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeSA9IG5ldyBJbmZFcGljc0ZhY3Rvcnk8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW0+XG4gICAgICAoaW5mUm9vdCwgJ3BlcnNpc3RlbnRfaXRlbScsIHRoaXMuaW5mQWN0aW9ucy5wZXJzaXN0ZW50X2l0ZW0sIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgY29uc3QgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlRlbXBvcmFsRW50aXR5U2xpY2UsIEluZlRlbXBvcmFsRW50aXR5PlxuICAgICAgKGluZlJvb3QsICd0ZW1wb3JhbF9lbnRpdHknLCB0aGlzLmluZkFjdGlvbnMudGVtcG9yYWxfZW50aXR5LCB0aGlzLm5vdGlmaWNhdGlvbiwgdGhpcy5pbmZvUHJvalJlbEFwaSwgdGhpcy5wcm9BY3Rpb25zKTtcblxuICAgIGNvbnN0IGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeSA9IG5ldyBJbmZFcGljc0ZhY3Rvcnk8SW5mU3RhdGVtZW50U2xpY2UsIEluZlN0YXRlbWVudD5cbiAgICAgIChpbmZSb290LCAnc3RhdGVtZW50JywgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudCwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICBjb25zdCBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlRleHRQcm9wZXJ0eVNsaWNlLCBJbmZUZXh0UHJvcGVydHk+XG4gICAgICAoaW5mUm9vdCwgJ3RleHRfcHJvcGVydHknLCB0aGlzLmluZkFjdGlvbnMudGV4dF9wcm9wZXJ0eSwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLyoqXG4gICAgICAgKiBQZXJzdGlzdGVudCBJdGVtXG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa01ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5wZUl0QXBpLm93blByb3BlcnRpZXMobWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAgIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5NSU5JTUFMX0JZX1BLLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFzID0gcmVzdWx0cyBhcyBhbnkgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHJlY29yZHNcbiAgICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWFzKS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgICAgICBsZXQgYWN0aW9ucztcbiAgICAgICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYXNbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChzY2hlbWFzW3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa01ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5wZUl0QXBpLnR5cGVzT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuVFlQRVNfT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hT2JqZWN0ID0gcmVzdWx0cyBhcyBTY2hlbWFPYmplY3Q7XG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYU9iamVjdCwgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvLyBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkVHlwZU9mUHJvamVjdEFjdGlvbj4oXG4gICAgICAvLyAgIChtZXRhKSA9PiB0aGlzLnBlSXRBcGkudHlwZU9mUHJvamVjdChtZXRhLnBrLCBtZXRhLnBrRW50aXR5KSxcbiAgICAgIC8vICAgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVfT0ZfUFJPSkVDVCxcbiAgICAgIC8vICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgIC8vICAgICBmbGF0dGVuZXIucGVyc2lzdGVudF9pdGVtLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAvLyAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICksXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mUGVyc2lzdGVudEl0ZW0+PigobWV0YSkgPT4gdGhpcy5wZUl0QXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZQZXJzaXN0ZW50SXRlbXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnBlcnNpc3RlbnRfaXRlbS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuXG4gICAgICAvKipcbiAgICAgICAqIFRlbXBvcmFsIEVudGl0eVxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtNZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMudGVFbkFwaS5vd25Qcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgICBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuT1dOX1BST1BFUlRJRVMsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFPYmplY3QsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBFcGljIHRvIGxvYWQgcGFnaW5hdGVkIFRlbXBvcmFsIEVudGl0eSBMaXN0XG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxhbnksIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS50eXBlKCdMT0FEJywgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNUKSksXG4gICAgICAgIG1lcmdlTWFwKGFjdGlvbiA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IGFwaUNhbCQgPSB0aGlzLnRlRW5BcGkudGVtcG9yYWxFbnRpdHlMaXN0KFxuICAgICAgICAgICAgbWV0YS5waywgbWV0YS5wa1NvdXJjZUVudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLmZrVGFyZ2V0Q2xhc3MsIG1ldGEuaXNPdXRnb2luZywgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXRcbiAgICAgICAgICApXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gbWV0YS5waztcbiAgICAgICAgICB0aGlzLmhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbihhY3Rpb24sIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LCBnbG9iYWxBY3Rpb25zLCBhcGlDYWwkLCBwa1Byb2plY3QpO1xuICAgICAgICB9KSlcbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIEVwaWMgdG8gbG9hZCBwYWdpbmF0ZWQgQWx0ZXJuYXRpdmUgVGVtcG9yYWwgRW50aXR5IExpc3RcbiAgICAgICAqL1xuICAgICAgKGFjdGlvbiQ6IEZsdXhBY3Rpb25PYnNlcnZhYmxlPGFueSwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LnR5cGUoJ0xPQUQnLCBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QpKSxcbiAgICAgICAgbWVyZ2VNYXAoYWN0aW9uID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgICAgICAgY29uc3QgYXBpQ2FsJCA9IHRoaXMudGVFbkFwaS5hbHRlcm5hdGl2ZVRlbXBvcmFsRW50aXR5TGlzdChcbiAgICAgICAgICAgIG1ldGEucGssIG1ldGEucGtTb3VyY2VFbnRpdHksIG1ldGEucGtQcm9wZXJ0eSwgbWV0YS5ma1RhcmdldENsYXNzLCBtZXRhLmlzT3V0Z29pbmcsIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0XG4gICAgICAgICAgKVxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5oYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb24oYWN0aW9uLCBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeSwgZ2xvYmFsQWN0aW9ucywgYXBpQ2FsJCwgcGtQcm9qZWN0KTtcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlRlbXBvcmFsRW50aXR5Pj4oKG1ldGEpID0+IHRoaXMudGVFbkFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mVGVtcG9yYWxFbnRpdGllcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIudGVtcG9yYWxfZW50aXR5LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkuY3JlYXRlUmVtb3ZlRXBpYygpLFxuXG5cbiAgICAgIC8qKlxuICAgICAgICogU3RhdGVtZW50XG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEluZ29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHM+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGkuYWx0ZXJuYXRpdmVzTm90SW5Qcm9qZWN0QnlFbnRpdHlQayhtZXRhLnBrRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEucGspLFxuICAgICAgICBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFU19JTkdPSU5HLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIG51bGwpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxJbmZTdGF0ZW1lbnQ+PigobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGlcbiAgICAgICAgLmZpbmRPckNyZWF0ZUluZlN0YXRlbWVudHMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnN0YXRlbWVudC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgICAgKGFjdGlvbiQ6IEZsdXhBY3Rpb25PYnNlcnZhYmxlPGFueSwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS50eXBlKCdMT0FEJywgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNUKSksXG4gICAgICAgIG1lcmdlTWFwKGFjdGlvbiA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IGFwaUNhbCQgPSB0aGlzLnN0YXRlbWVudEFwaS5wYWdpbmF0ZWRMaXN0VGFyZ2V0aW5nRW50aXR5UHJldmlld3MoXG4gICAgICAgICAgICBtZXRhLnBrLCBtZXRhLnBrU291cmNlRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEuZmtUYXJnZXRDbGFzcywgbWV0YS5pc091dGdvaW5nLCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldFxuICAgICAgICAgIClcbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBtZXRhLnBrO1xuICAgICAgICAgIHRoaXMuaGFuZGxlVGVtcG9yYWxFbnRpdHlMaXN0QWN0aW9uKGFjdGlvbiwgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LCBnbG9iYWxBY3Rpb25zLCBhcGlDYWwkLCBwa1Byb2plY3QpO1xuICAgICAgICB9KSlcbiAgICAgICksXG5cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cblxuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPEZpbmRTdGF0ZW1lbnRCeVBhcmFtcz4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnN0YXRlbWVudEFwaS5xdWVyeUJ5UGFyYW1zKG1ldGEub2ZQcm9qZWN0LCBtZXRhLnBrLCBtZXRhLnBrRW50aXR5LCBtZXRhLnBrSW5mb1JhbmdlLCBtZXRhLnBrSW5mb0RvbWFpbiwgbWV0YS5wa1Byb3BlcnR5KSxcbiAgICAgICAgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5CWV9QQVJBTVMsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnN0YXRlbWVudC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdMT0FEJyk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnN0YXRlbWVudEFwaS5zb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eShtZXRhLm9mUHJvamVjdCwgbWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAgIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCByZXMgPSByZXN1bHRzIGFzIGFueSBhcyBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdDtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXMuc3RhdGVtZW50cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG5cbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIyLmRpZ2l0YWwuZmxhdHRlbihyZXMuZGlnaXRhbHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lcjIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcblxuICAgICAgICB9XG4gICAgICApLFxuXG5cblxuICAgICAgLyoqXG4gICAgICAgKiBUZXh0IFByb3BlcnR5XG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXM+KChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaVxuICAgICAgICAuZmluZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXMobWV0YS5waywgbWV0YS5ma0VudGl0eSwgbWV0YS5ma0NsYXNzRmllbGQpLFxuICAgICAgICBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFUyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIGluZlRleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mVGV4dFByb3BlcnR5Pj4oKG1ldGEpID0+IHRoaXMudGV4dFByb3BlcnR5QXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZUZXh0UHJvcGVydGllcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuICAgICk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBoYW5kbGVzIHRoZSB1cGRhdGUgb2Ygc3RvcmUgZm9yIHBhZ2luYXRlZCB0ZW1wb3JhbCBlbnRpdHkgbGlzdHMuXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgaWYgbnVsbCwgbGlzdCBpcyBoYW5kbGVkIGFzICdyZXBvJyBsaXN0XG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbjxNPihcbiAgICBhY3Rpb24sXG4gICAgZXBpY3NGYWN0b3J5OiBJbmZFcGljc0ZhY3Rvcnk8SW5mVGVtcG9yYWxFbnRpdHlTbGljZSwgSW5mVGVtcG9yYWxFbnRpdHk+IHwgSW5mRXBpY3NGYWN0b3J5PEluZlN0YXRlbWVudFNsaWNlLCBJbmZTdGF0ZW1lbnQ+LFxuICAgIGdsb2JhbEFjdGlvbnMsXG4gICAgYXBpQ2FsbCQ6IE9ic2VydmFibGU8YW55PixcbiAgICBwa1Byb2plY3QpIHtcbiAgICBjb25zdCBtZXRhOiBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICBjb25zdCBwZW5kaW5nS2V5ID0gbWV0YS5hZGRQZW5kaW5nO1xuICAgIGNvbnN0IHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdID0gW1xuICAgICAgeyBma19wcm9wZXJ0eTogbWV0YS5wa1Byb3BlcnR5IH0sXG4gICAgICB7IGZrX3RhcmdldF9jbGFzczogbWV0YS5ma1RhcmdldENsYXNzIH0sXG4gICAgICB7IFttZXRhLmlzT3V0Z29pbmcgPyAnZmtfc3ViamVjdF9pbmZvJyA6ICdma19vYmplY3RfaW5mbyddOiBtZXRhLnBrU291cmNlRW50aXR5IH0sXG4gICAgICB7IFttZXRhLmFsdGVybmF0aXZlcyA/ICdhbHRlcm5hdGl2ZXMnIDogJ29mUHJvamVjdCddOiBtZXRhLmFsdGVybmF0aXZlcyB9XG4gICAgXTtcbiAgICAvLyBjYWxsIGFjdGlvbiB0byBzZXQgcGFnaW5hdGlvbiBsb2FkaW5nIG9uIHRydWVcbiAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlKHBhZ2luYXRlQnksIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0LCBwa1Byb2plY3QpO1xuICAgIC8vIGNhbGwgYXBpIHRvIGxvYWQgZGF0YVxuICAgIGFwaUNhbGwkLnN1YnNjcmliZSgoZGF0YTogUGFnaW5hdGVkU3RhdGVtZW50TGlzdCkgPT4ge1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcmVjb3Jkc1xuICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KGRhdGEuc2NoZW1hcywgcGtQcm9qZWN0KTtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHBhZ2luYXRpb25cbiAgICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2VTdWNjZWVkZWQoZGF0YS5wYWdpbmF0ZWRTdGF0ZW1lbnRzLCBkYXRhLmNvdW50LCBwYWdpbmF0ZUJ5LCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCwgcGtQcm9qZWN0KTtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGNvbmNsdWRlIHRoZSBwZW5kaW5nIHJlcXVlc3RcbiAgICAgIGVwaWNzRmFjdG9yeS5hY3Rpb25zLmxvYWRTdWNjZWVkZWQoW10sIHBlbmRpbmdLZXksIHBrUHJvamVjdCk7XG4gICAgfSwgZXJyb3IgPT4ge1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gaGFuZGxlIGVycm9yXG4gICAgICBlcGljc0ZhY3Rvcnkub25FcnJvcihnbG9iYWxBY3Rpb25zLCBlcnJvciwgcGVuZGluZ0tleSwgcGtQcm9qZWN0KTtcbiAgICB9KTtcbiAgfVxufVxuIl19