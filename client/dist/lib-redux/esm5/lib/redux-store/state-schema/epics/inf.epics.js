/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/inf.epics.ts
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
var InfEpics = /** @class */ (function () {
    function InfEpics(notification, peItApi, teEnApi, statementApi, textPropertyApi, infActions, proActions, datActions, infoProjRelApi, schemaObjectService) {
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
    InfEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var infPersistentItemEpicsFactory = new InfEpicsFactory(infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        var infTemporalEntityEpicsFactory = new InfEpicsFactory(infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        var infStatementEpicsFactory = new InfEpicsFactory(infRoot, 'statement', this.infActions.statement, this.notification, this.infoProjRelApi, this.proActions);
        /** @type {?} */
        var infTextPropertyEpicsFactory = new InfEpicsFactory(infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi, this.proActions);
        return combineEpics(
        /**
         * Perstistent Item
         *
         */
        infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.peItApi.ownProperties(meta.pk, meta.pkEntity); }), InfPersistentItemActionFactory.MINIMAL_BY_PK, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            // call action to store records
            Object.keys(schemas).forEach((/**
             * @param {?} schema
             * @return {?}
             */
            function (schema) {
                /** @type {?} */
                var actions;
                if (schema === 'inf')
                    actions = _this.infActions;
                else if (schema === 'pro')
                    actions = _this.proActions;
                if (actions) {
                    Object.keys(schemas[schema]).forEach((/**
                     * @param {?} model
                     * @return {?}
                     */
                    function (model) {
                        actions[model].loadSucceeded(schemas[schema][model], undefined, pk);
                    }));
                }
            }));
        })), infPersistentItemEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.peItApi.typesOfProject(meta.pk); }), InfPersistentItemActionFactory.TYPES_OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemaObject = (/** @type {?} */ (results));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
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
        function (meta) { return _this.peItApi
            .findOrCreateInfPersistentItems(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
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
        function (meta) { return _this.teEnApi.ownProperties(meta.pk, meta.pkEntity); }), InfTemporalEntityActionFactory.OWN_PROPERTIES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemaObject = (/** @type {?} */ (results));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })), (
        /**
         * Epic to load paginated Temporal Entity List
         */
        /**
         * Epic to load paginated Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        function (globalActions) {
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var apiCal$ = _this.teEnApi.temporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            var pkProject = meta.pk;
            _this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })); }))); }), (
        /**
         * Epic to load paginated Alternative Temporal Entity List
         */
        /**
         * Epic to load paginated Alternative Temporal Entity List
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        function (globalActions) {
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var apiCal$ = _this.teEnApi.alternativeTemporalEntityList(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            var pkProject = null;
            _this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        })); }))); }), infTemporalEntityEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.teEnApi
            .findOrCreateInfTemporalEntities(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
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
        function (meta) { return _this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk); }), InfStatementActionFactory.ALTERNATIVES_INGOING, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infStatementEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi
            .findOrCreateInfStatements(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(infStatementEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalActions
         * @return {?}
         */
        function (globalActions) {
            /** @type {?} */
            var meta = action.meta;
            /** @type {?} */
            var apiCal$ = _this.statementApi.paginatedListTargetingEntityPreviews(meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset);
            /** @type {?} */
            var pkProject = meta.pk;
            _this.handleTemporalEntityListAction(action, infStatementEpicsFactory, globalActions, apiCal$, pkProject);
        })); }))); }), infStatementEpicsFactory.createRemoveEpic(), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty); }), InfStatementActionFactory.BY_PARAMS, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'LOAD');
        })), infStatementEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity); }), InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var res = (/** @type {?} */ ((/** @type {?} */ (results))));
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.statement.flatten(res.statements);
            storeFlattened(flattener.getFlattened(), pk);
            /** @type {?} */
            var flattener2 = new Flattener(_this.infActions, _this.datActions, _this.proActions);
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
        function (meta) { return _this.textPropertyApi
            .findAlternativeTextProperties(meta.pk, meta.fkEntity, meta.fkClassField); }), InfTextPropertyActionFactory.ALTERNATIVES, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), null);
        })), infTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi
            .findOrCreateInfTextProperties(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.text_property.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), infTextPropertyEpicsFactory.createRemoveEpic());
    };
    /**
     * handles the update of store for paginated temporal entity lists.
     * @param pkProject if null, list is handled as 'repo' list
     */
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
    InfEpics.prototype.handleTemporalEntityListAction = /**
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
    function (action, epicsFactory, globalActions, apiCall$, pkProject) {
        var _this = this;
        /** @type {?} */
        var meta = action.meta;
        /** @type {?} */
        var scope = meta.alternatives ? { notInProject: pkProject } : { inProject: pkProject };
        /** @type {?} */
        var req = {
            fkSourceEntity: meta.pkSourceEntity,
            fkProperty: meta.pkProperty,
            isOutgoing: meta.isOutgoing,
            targetClass: meta.fkTargetClass,
            limit: meta.limit,
            offset: meta.offset,
            scope: scope,
        };
        /** @type {?} */
        var pendingKey = meta.addPending;
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(req, pkProject);
        // call api to load data
        apiCall$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            // call action to store records
            _this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            _this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, req, pkProject);
            // call action to conclude the pending request
            epicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            // call action to handle error
            epicsFactory.onError(globalActions, error, pendingKey, pkProject);
        }));
    };
    InfEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InfEpics.ctorParameters = function () { return [
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
    ]; };
    /** @nocollapse */ InfEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function InfEpics_Factory() { return new InfEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.InfPersistentItemApi), i0.ɵɵinject(i2.InfTemporalEntityApi), i0.ɵɵinject(i2.InfStatementApi), i0.ɵɵinject(i2.InfTextPropertyApi), i0.ɵɵinject(i3.InfActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.DatActions), i0.ɵɵinject(i2.ProInfoProjRelApi), i0.ɵɵinject(i6.SchemaService)); }, token: InfEpics, providedIn: "root" });
    return InfEpics;
}());
export { InfEpics };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvaW5mLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXFCLG9CQUFvQixFQUFnQixlQUFlLEVBQXFCLG9CQUFvQixFQUFtQixrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2hOLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBeUIsVUFBVSxFQUFFLDhCQUE4QixFQUFFLHlCQUF5QixFQUFFLDhCQUE4QixFQUFFLDRCQUE0QixFQUF1TSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pZLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7OztBQUcvRDtJQUlFLGtCQUNTLFlBQXFDLEVBQ3JDLE9BQTZCLEVBQzdCLE9BQTZCLEVB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QUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBdFFGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBYlEsdUJBQXVCO2dCQVBKLG9CQUFvQjtnQkFBb0Qsb0JBQW9CO2dCQUF4RCxlQUFlO2dCQUE0RCxrQkFBa0I7Z0JBUzdILFVBQVU7Z0JBQ2pDLFVBQVU7Z0JBRlYsVUFBVTtnQkFSNEksaUJBQWlCO2dCQWF2SyxhQUFhOzs7bUJBZHRCO0NBMFJDLEFBdlFELElBdVFDO1NBcFFZLFFBQVE7OztJQUVqQixnQ0FBNEM7O0lBQzVDLDJCQUFvQzs7SUFDcEMsMkJBQW9DOztJQUNwQyxnQ0FBb0M7O0lBQ3BDLG1DQUEwQzs7SUFDMUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0Isa0NBQXdDOzs7OztJQUN4Qyx1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGVyc2lzdGVudEl0ZW1BcGksIEluZlN0YXRlbWVudCwgSW5mU3RhdGVtZW50QXBpLCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGVtcG9yYWxFbnRpdHlBcGksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGV4dFByb3BlcnR5QXBpLCBQcm9JbmZvUHJvalJlbEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkYVBhZ2VTY29wZSwgR3ZTdWJmaWVsZFBhZ2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBGaW5kU3RhdGVtZW50QnlQYXJhbXMsIEluZkFjdGlvbnMsIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSwgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeSwgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LCBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5LCBMb2FkQWx0ZXJuYXRpdmVUZXh0UHJvcGVydGllcywgTG9hZEJ5UGtNZXRhLCBMb2FkSW5nb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cywgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhLCBQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0LCBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eSwgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlN0YXRlbWVudFNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eVNsaWNlLCBJbmZUZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9pbmYubW9kZWxzJztcbmltcG9ydCB7IGluZlJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvaW5mLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxhdHRlbmVyLCBzdG9yZUZsYXR0ZW5lZCB9IGZyb20gJy4uL19oZWxwZXJzL2ZsYXR0ZW5lcic7XG5pbXBvcnQgeyBJbmZFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9pbmYtZXBpYy1mYWN0b3J5JztcbmltcG9ydCB7IEZsdXhBY3Rpb25PYnNlcnZhYmxlLCBNb2RpZnlBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEluZkVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIHBlSXRBcGk6IEluZlBlcnNpc3RlbnRJdGVtQXBpLFxuICAgIHB1YmxpYyB0ZUVuQXBpOiBJbmZUZW1wb3JhbEVudGl0eUFwaSxcbiAgICBwdWJsaWMgc3RhdGVtZW50QXBpOiBJbmZTdGF0ZW1lbnRBcGksXG4gICAgcHVibGljIHRleHRQcm9wZXJ0eUFwaTogSW5mVGV4dFByb3BlcnR5QXBpLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZvUHJvalJlbEFwaTogUHJvSW5mb1Byb2pSZWxBcGksXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RTZXJ2aWNlOiBTY2hlbWFTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5ID0gbmV3IEluZkVwaWNzRmFjdG9yeTxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZQZXJzaXN0ZW50SXRlbT5cbiAgICAgIChpbmZSb290LCAncGVyc2lzdGVudF9pdGVtJywgdGhpcy5pbmZBY3Rpb25zLnBlcnNpc3RlbnRfaXRlbSwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICBjb25zdCBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeSA9IG5ldyBJbmZFcGljc0ZhY3Rvcnk8SW5mVGVtcG9yYWxFbnRpdHlTbGljZSwgSW5mVGVtcG9yYWxFbnRpdHk+XG4gICAgICAoaW5mUm9vdCwgJ3RlbXBvcmFsX2VudGl0eScsIHRoaXMuaW5mQWN0aW9ucy50ZW1wb3JhbF9lbnRpdHksIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgY29uc3QgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5ID0gbmV3IEluZkVwaWNzRmFjdG9yeTxJbmZTdGF0ZW1lbnRTbGljZSwgSW5mU3RhdGVtZW50PlxuICAgICAgKGluZlJvb3QsICdzdGF0ZW1lbnQnLCB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LCB0aGlzLm5vdGlmaWNhdGlvbiwgdGhpcy5pbmZvUHJvalJlbEFwaSwgdGhpcy5wcm9BY3Rpb25zKTtcblxuICAgIGNvbnN0IGluZlRleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeSA9IG5ldyBJbmZFcGljc0ZhY3Rvcnk8SW5mVGV4dFByb3BlcnR5U2xpY2UsIEluZlRleHRQcm9wZXJ0eT5cbiAgICAgIChpbmZSb290LCAndGV4dF9wcm9wZXJ0eScsIHRoaXMuaW5mQWN0aW9ucy50ZXh0X3Byb3BlcnR5LCB0aGlzLm5vdGlmaWNhdGlvbiwgdGhpcy5pbmZvUHJvalJlbEFwaSwgdGhpcy5wcm9BY3Rpb25zKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvKipcbiAgICAgICAqIFBlcnN0aXN0ZW50IEl0ZW1cbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRCeVBrTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnBlSXRBcGkub3duUHJvcGVydGllcyhtZXRhLnBrLCBtZXRhLnBrRW50aXR5KSxcbiAgICAgICAgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5Lk1JTklNQUxfQllfUEssXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYXMgPSByZXN1bHRzIGFzIGFueSBhcyBTY2hlbWFPYmplY3Q7XG4gICAgICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcmVjb3Jkc1xuICAgICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYXMpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgICAgICAgICAgIGxldCBhY3Rpb25zO1xuICAgICAgICAgICAgaWYgKHNjaGVtYSA9PT0gJ2luZicpIGFjdGlvbnMgPSB0aGlzLmluZkFjdGlvbnM7XG4gICAgICAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAgICAgICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc2NoZW1hc1tzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zW21vZGVsXS5sb2FkU3VjY2VlZGVkKHNjaGVtYXNbc2NoZW1hXVttb2RlbF0sIHVuZGVmaW5lZCwgcGspXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRCeVBrTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnBlSXRBcGkudHlwZXNPZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5UWVBFU19PRl9QUk9KRUNULFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFPYmplY3QgPSByZXN1bHRzIGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8vIGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRUeXBlT2ZQcm9qZWN0QWN0aW9uPihcbiAgICAgIC8vICAgKG1ldGEpID0+IHRoaXMucGVJdEFwaS50eXBlT2ZQcm9qZWN0KG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgLy8gICBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuVFlQRV9PRl9QUk9KRUNULFxuICAgICAgLy8gICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgIC8vICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgLy8gICAgIGZsYXR0ZW5lci5wZXJzaXN0ZW50X2l0ZW0uZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgIC8vICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gKSxcbiAgICAgIGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxJbmZQZXJzaXN0ZW50SXRlbT4+KChtZXRhKSA9PiB0aGlzLnBlSXRBcGlcbiAgICAgICAgLmZpbmRPckNyZWF0ZUluZlBlcnNpc3RlbnRJdGVtcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucGVyc2lzdGVudF9pdGVtLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlUmVtb3ZlRXBpYygpLFxuXG5cbiAgICAgIC8qKlxuICAgICAgICogVGVtcG9yYWwgRW50aXR5XG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa01ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy50ZUVuQXBpLm93blByb3BlcnRpZXMobWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAgIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5PV05fUFJPUEVSVElFUyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hT2JqZWN0ID0gcmVzdWx0cyBhcyBTY2hlbWFPYmplY3Q7XG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYU9iamVjdCwgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIEVwaWMgdG8gbG9hZCBwYWdpbmF0ZWQgVGVtcG9yYWwgRW50aXR5IExpc3RcbiAgICAgICAqL1xuICAgICAgKGFjdGlvbiQ6IEZsdXhBY3Rpb25PYnNlcnZhYmxlPGFueSwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LnR5cGUoJ0xPQUQnLCBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0xJU1QpKSxcbiAgICAgICAgbWVyZ2VNYXAoYWN0aW9uID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgICAgICAgY29uc3QgYXBpQ2FsJCA9IHRoaXMudGVFbkFwaS50ZW1wb3JhbEVudGl0eUxpc3QoXG4gICAgICAgICAgICBtZXRhLnBrLCBtZXRhLnBrU291cmNlRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEuZmtUYXJnZXRDbGFzcywgbWV0YS5pc091dGdvaW5nLCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldFxuICAgICAgICAgIClcbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBtZXRhLnBrO1xuICAgICAgICAgIHRoaXMuaGFuZGxlVGVtcG9yYWxFbnRpdHlMaXN0QWN0aW9uKGFjdGlvbiwgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnksIGdsb2JhbEFjdGlvbnMsIGFwaUNhbCQsIHBrUHJvamVjdCk7XG4gICAgICAgIH0pKVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogRXBpYyB0byBsb2FkIHBhZ2luYXRlZCBBbHRlcm5hdGl2ZSBUZW1wb3JhbCBFbnRpdHkgTGlzdFxuICAgICAgICovXG4gICAgICAoYWN0aW9uJDogRmx1eEFjdGlvbk9ic2VydmFibGU8YW55LCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+LCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkudHlwZSgnTE9BRCcsIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfQUxURVJOQVRJVkVfTElTVCkpLFxuICAgICAgICBtZXJnZU1hcChhY3Rpb24gPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICAgICAgICBjb25zdCBhcGlDYWwkID0gdGhpcy50ZUVuQXBpLmFsdGVybmF0aXZlVGVtcG9yYWxFbnRpdHlMaXN0KFxuICAgICAgICAgICAgbWV0YS5waywgbWV0YS5wa1NvdXJjZUVudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLmZrVGFyZ2V0Q2xhc3MsIG1ldGEuaXNPdXRnb2luZywgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXRcbiAgICAgICAgICApXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLmhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbihhY3Rpb24sIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LCBnbG9iYWxBY3Rpb25zLCBhcGlDYWwkLCBwa1Byb2plY3QpO1xuICAgICAgICB9KSlcbiAgICAgICksXG4gICAgICBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mVGVtcG9yYWxFbnRpdHk+PigobWV0YSkgPT4gdGhpcy50ZUVuQXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZUZW1wb3JhbEVudGl0aWVzKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci50ZW1wb3JhbF9lbnRpdHkuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cblxuICAgICAgLyoqXG4gICAgICAgKiBTdGF0ZW1lbnRcbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkSW5nb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cz4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnN0YXRlbWVudEFwaS5hbHRlcm5hdGl2ZXNOb3RJblByb2plY3RCeUVudGl0eVBrKG1ldGEucGtFbnRpdHksIG1ldGEucGtQcm9wZXJ0eSwgbWV0YS5wayksXG4gICAgICAgIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuQUxURVJOQVRJVkVTX0lOR09JTkcsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnN0YXRlbWVudC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlN0YXRlbWVudD4+KChtZXRhKSA9PiB0aGlzLnN0YXRlbWVudEFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mU3RhdGVtZW50cyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuc3RhdGVtZW50LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICAoYWN0aW9uJDogRmx1eEFjdGlvbk9ic2VydmFibGU8YW55LCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+LCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LnR5cGUoJ0xPQUQnLCBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0xJU1QpKSxcbiAgICAgICAgbWVyZ2VNYXAoYWN0aW9uID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgICAgICAgY29uc3QgYXBpQ2FsJCA9IHRoaXMuc3RhdGVtZW50QXBpLnBhZ2luYXRlZExpc3RUYXJnZXRpbmdFbnRpdHlQcmV2aWV3cyhcbiAgICAgICAgICAgIG1ldGEucGssIG1ldGEucGtTb3VyY2VFbnRpdHksIG1ldGEucGtQcm9wZXJ0eSwgbWV0YS5ma1RhcmdldENsYXNzLCBtZXRhLmlzT3V0Z29pbmcsIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0XG4gICAgICAgICAgKVxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IG1ldGEucGs7XG4gICAgICAgICAgdGhpcy5oYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb24oYWN0aW9uLCBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnksIGdsb2JhbEFjdGlvbnMsIGFwaUNhbCQsIHBrUHJvamVjdCk7XG4gICAgICAgIH0pKVxuICAgICAgKSxcblxuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8RmluZFN0YXRlbWVudEJ5UGFyYW1zPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuc3RhdGVtZW50QXBpLnF1ZXJ5QnlQYXJhbXMobWV0YS5vZlByb2plY3QsIG1ldGEucGssIG1ldGEucGtFbnRpdHksIG1ldGEucGtJbmZvUmFuZ2UsIG1ldGEucGtJbmZvRG9tYWluLCBtZXRhLnBrUHJvcGVydHkpLFxuICAgICAgICBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LkJZX1BBUkFNUyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuc3RhdGVtZW50LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ0xPQUQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5PihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuc3RhdGVtZW50QXBpLnNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5KG1ldGEub2ZQcm9qZWN0LCBtZXRhLnBrLCBtZXRhLnBrRW50aXR5KSxcbiAgICAgICAgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5TT1VSQ0VTX0FORF9ESUdJVEFMU19PRl9FTlRJVFksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5UmVzdWx0O1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnN0YXRlbWVudC5mbGF0dGVuKHJlcy5zdGF0ZW1lbnRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcblxuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lcjIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lcjIuZGlnaXRhbC5mbGF0dGVuKHJlcy5kaWdpdGFscyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyMi5nZXRGbGF0dGVuZWQoKSwgcGspO1xuXG4gICAgICAgIH1cbiAgICAgICksXG5cblxuXG4gICAgICAvKipcbiAgICAgICAqIFRleHQgUHJvcGVydHlcbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIGluZlRleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWx0ZXJuYXRpdmVUZXh0UHJvcGVydGllcz4oKG1ldGEpID0+IHRoaXMudGV4dFByb3BlcnR5QXBpXG4gICAgICAgIC5maW5kQWx0ZXJuYXRpdmVUZXh0UHJvcGVydGllcyhtZXRhLnBrLCBtZXRhLmZrRW50aXR5LCBtZXRhLmZrQ2xhc3NGaWVsZCksXG4gICAgICAgIEluZlRleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuQUxURVJOQVRJVkVTLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci50ZXh0X3Byb3BlcnR5LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgICAgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxJbmZUZXh0UHJvcGVydHk+PigobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGlcbiAgICAgICAgLmZpbmRPckNyZWF0ZUluZlRleHRQcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci50ZXh0X3Byb3BlcnR5LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlUmVtb3ZlRXBpYygpLFxuXG4gICAgKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGhhbmRsZXMgdGhlIHVwZGF0ZSBvZiBzdG9yZSBmb3IgcGFnaW5hdGVkIHRlbXBvcmFsIGVudGl0eSBsaXN0cy5cbiAgICogQHBhcmFtIHBrUHJvamVjdCBpZiBudWxsLCBsaXN0IGlzIGhhbmRsZWQgYXMgJ3JlcG8nIGxpc3RcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlVGVtcG9yYWxFbnRpdHlMaXN0QWN0aW9uPE0+KFxuICAgIGFjdGlvbixcbiAgICBlcGljc0ZhY3Rvcnk6IEluZkVwaWNzRmFjdG9yeTxJbmZUZW1wb3JhbEVudGl0eVNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eT4gfCBJbmZFcGljc0ZhY3Rvcnk8SW5mU3RhdGVtZW50U2xpY2UsIEluZlN0YXRlbWVudD4sXG4gICAgZ2xvYmFsQWN0aW9ucyxcbiAgICBhcGlDYWxsJDogT2JzZXJ2YWJsZTxhbnk+LFxuICAgIHBrUHJvamVjdCkge1xuICAgIGNvbnN0IG1ldGE6IExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgIGNvbnN0IHNjb3BlOiBHdlN1YmZpZWxkYVBhZ2VTY29wZSA9IG1ldGEuYWx0ZXJuYXRpdmVzID8geyBub3RJblByb2plY3Q6IHBrUHJvamVjdCB9IDogeyBpblByb2plY3Q6IHBrUHJvamVjdCB9XG4gICAgY29uc3QgcmVxOiBHdlN1YmZpZWxkUGFnZSA9IHtcbiAgICAgIGZrU291cmNlRW50aXR5OiBtZXRhLnBrU291cmNlRW50aXR5LFxuICAgICAgZmtQcm9wZXJ0eTogbWV0YS5wa1Byb3BlcnR5LFxuICAgICAgaXNPdXRnb2luZzogbWV0YS5pc091dGdvaW5nLFxuICAgICAgdGFyZ2V0Q2xhc3M6IG1ldGEuZmtUYXJnZXRDbGFzcyxcbiAgICAgIGxpbWl0OiBtZXRhLmxpbWl0LFxuICAgICAgb2Zmc2V0OiBtZXRhLm9mZnNldCxcbiAgICAgIHNjb3BlLFxuICAgIH1cbiAgICBjb25zdCBwZW5kaW5nS2V5ID0gbWV0YS5hZGRQZW5kaW5nO1xuXG4gICAgLy8gY2FsbCBhY3Rpb24gdG8gc2V0IHBhZ2luYXRpb24gbG9hZGluZyBvbiB0cnVlXG4gICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZShyZXEsIHBrUHJvamVjdCk7XG4gICAgLy8gY2FsbCBhcGkgdG8gbG9hZCBkYXRhXG4gICAgYXBpQ2FsbCQuc3Vic2NyaWJlKChkYXRhOiBQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0KSA9PiB7XG4gICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3QoZGF0YS5zY2hlbWFzLCBwa1Byb2plY3QpO1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcGFnaW5hdGlvblxuICAgICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZVN1Y2NlZWRlZChkYXRhLnBhZ2luYXRlZFN0YXRlbWVudHMsIGRhdGEuY291bnQsIHJlcSwgcGtQcm9qZWN0KTtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGNvbmNsdWRlIHRoZSBwZW5kaW5nIHJlcXVlc3RcbiAgICAgIGVwaWNzRmFjdG9yeS5hY3Rpb25zLmxvYWRTdWNjZWVkZWQoW10sIHBlbmRpbmdLZXksIHBrUHJvamVjdCk7XG4gICAgfSwgZXJyb3IgPT4ge1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gaGFuZGxlIGVycm9yXG4gICAgICBlcGljc0ZhY3Rvcnkub25FcnJvcihnbG9iYWxBY3Rpb25zLCBlcnJvciwgcGVuZGluZ0tleSwgcGtQcm9qZWN0KTtcbiAgICB9KTtcbiAgfVxufVxuIl19