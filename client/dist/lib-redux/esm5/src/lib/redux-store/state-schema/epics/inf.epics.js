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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixvQkFBb0IsRUFBZ0IsZUFBZSxFQUFxQixvQkFBb0IsRUFBbUIsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdoTixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQXlCLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSx5QkFBeUIsRUFBRSw4QkFBOEIsRUFBRSw0QkFBNEIsRUFBdU0sTUFBTSx3QkFBd0IsQ0FBQztBQUN6WSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7QUFHL0Q7SUFJRSxrQkFDUyxZQUFxQyxFQUNyQyxPQUE2QixFQUM3QixPQUE2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QU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRSxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXRRRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLHVCQUF1QjtnQkFQSixvQkFBb0I7Z0JBQW9ELG9CQUFvQjtnQkFBeEQsZUFBZTtnQkFBNEQsa0JBQWtCO2dCQVM3SCxVQUFVO2dCQUNqQyxVQUFVO2dCQUZWLFVBQVU7Z0JBUjRJLGlCQUFpQjtnQkFhdkssYUFBYTs7O21CQWR0QjtDQTBSQyxBQXZRRCxJQXVRQztTQXBRWSxRQUFROzs7SUFFakIsZ0NBQTRDOztJQUM1QywyQkFBb0M7O0lBQ3BDLDJCQUFvQzs7SUFDcEMsZ0NBQW9DOztJQUNwQyxtQ0FBMEM7O0lBQzFDLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLGtDQUF3Qzs7Ozs7SUFDeEMsdUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBlcnNpc3RlbnRJdGVtQXBpLCBJbmZTdGF0ZW1lbnQsIEluZlN0YXRlbWVudEFwaSwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRlbXBvcmFsRW50aXR5QXBpLCBJbmZUZXh0UHJvcGVydHksIEluZlRleHRQcm9wZXJ0eUFwaSwgUHJvSW5mb1Byb2pSZWxBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTdWJmaWVsZGFQYWdlU2NvcGUsIEd2U3ViZmllbGRQYWdlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgRmluZFN0YXRlbWVudEJ5UGFyYW1zLCBJbmZBY3Rpb25zLCBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnksIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnksIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeSwgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSwgTG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXMsIExvYWRCeVBrTWV0YSwgTG9hZEluZ29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHMsIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YSwgUGFnaW5hdGVkU3RhdGVtZW50TGlzdCwgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHksIFNvdXJjZXNBbmREaWdpdGFsc09mRW50aXR5UmVzdWx0IH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZTdGF0ZW1lbnRTbGljZSwgSW5mVGVtcG9yYWxFbnRpdHlTbGljZSwgSW5mVGV4dFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvaW5mLm1vZGVscyc7XG5pbXBvcnQgeyBpbmZSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL2luZi5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NjaGVtYS5zZXJ2aWNlJztcbmltcG9ydCB7IEZsYXR0ZW5lciwgc3RvcmVGbGF0dGVuZWQgfSBmcm9tICcuLi9faGVscGVycy9mbGF0dGVuZXInO1xuaW1wb3J0IHsgSW5mRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvaW5mLWVwaWMtZmFjdG9yeSc7XG5pbXBvcnQgeyBGbHV4QWN0aW9uT2JzZXJ2YWJsZSwgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBJbmZFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBwZUl0QXBpOiBJbmZQZXJzaXN0ZW50SXRlbUFwaSxcbiAgICBwdWJsaWMgdGVFbkFwaTogSW5mVGVtcG9yYWxFbnRpdHlBcGksXG4gICAgcHVibGljIHN0YXRlbWVudEFwaTogSW5mU3RhdGVtZW50QXBpLFxuICAgIHB1YmxpYyB0ZXh0UHJvcGVydHlBcGk6IEluZlRleHRQcm9wZXJ0eUFwaSxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mb1Byb2pSZWxBcGk6IFByb0luZm9Qcm9qUmVsQXBpLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeSA9IG5ldyBJbmZFcGljc0ZhY3Rvcnk8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW0+XG4gICAgICAoaW5mUm9vdCwgJ3BlcnNpc3RlbnRfaXRlbScsIHRoaXMuaW5mQWN0aW9ucy5wZXJzaXN0ZW50X2l0ZW0sIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgY29uc3QgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlRlbXBvcmFsRW50aXR5U2xpY2UsIEluZlRlbXBvcmFsRW50aXR5PlxuICAgICAgKGluZlJvb3QsICd0ZW1wb3JhbF9lbnRpdHknLCB0aGlzLmluZkFjdGlvbnMudGVtcG9yYWxfZW50aXR5LCB0aGlzLm5vdGlmaWNhdGlvbiwgdGhpcy5pbmZvUHJvalJlbEFwaSwgdGhpcy5wcm9BY3Rpb25zKTtcblxuICAgIGNvbnN0IGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeSA9IG5ldyBJbmZFcGljc0ZhY3Rvcnk8SW5mU3RhdGVtZW50U2xpY2UsIEluZlN0YXRlbWVudD5cbiAgICAgIChpbmZSb290LCAnc3RhdGVtZW50JywgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudCwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICBjb25zdCBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlRleHRQcm9wZXJ0eVNsaWNlLCBJbmZUZXh0UHJvcGVydHk+XG4gICAgICAoaW5mUm9vdCwgJ3RleHRfcHJvcGVydHknLCB0aGlzLmluZkFjdGlvbnMudGV4dF9wcm9wZXJ0eSwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLyoqXG4gICAgICAgKiBQZXJzdGlzdGVudCBJdGVtXG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa01ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5wZUl0QXBpLm93blByb3BlcnRpZXMobWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAgIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5NSU5JTUFMX0JZX1BLLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFzID0gcmVzdWx0cyBhcyBhbnkgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHJlY29yZHNcbiAgICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWFzKS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgICAgICBsZXQgYWN0aW9ucztcbiAgICAgICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAgICAgICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYXNbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChzY2hlbWFzW3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa01ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5wZUl0QXBpLnR5cGVzT2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuVFlQRVNfT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hT2JqZWN0ID0gcmVzdWx0cyBhcyBTY2hlbWFPYmplY3Q7XG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYU9iamVjdCwgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvLyBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkVHlwZU9mUHJvamVjdEFjdGlvbj4oXG4gICAgICAvLyAgIChtZXRhKSA9PiB0aGlzLnBlSXRBcGkudHlwZU9mUHJvamVjdChtZXRhLnBrLCBtZXRhLnBrRW50aXR5KSxcbiAgICAgIC8vICAgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVfT0ZfUFJPSkVDVCxcbiAgICAgIC8vICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgIC8vICAgICBmbGF0dGVuZXIucGVyc2lzdGVudF9pdGVtLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAvLyAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICksXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mUGVyc2lzdGVudEl0ZW0+PigobWV0YSkgPT4gdGhpcy5wZUl0QXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZQZXJzaXN0ZW50SXRlbXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnBlcnNpc3RlbnRfaXRlbS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlBlcnNpc3RlbnRJdGVtRXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuXG4gICAgICAvKipcbiAgICAgICAqIFRlbXBvcmFsIEVudGl0eVxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtNZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMudGVFbkFwaS5vd25Qcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgICBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuT1dOX1BST1BFUlRJRVMsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFPYmplY3QsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBFcGljIHRvIGxvYWQgcGFnaW5hdGVkIFRlbXBvcmFsIEVudGl0eSBMaXN0XG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxhbnksIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS50eXBlKCdMT0FEJywgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNUKSksXG4gICAgICAgIG1lcmdlTWFwKGFjdGlvbiA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IGFwaUNhbCQgPSB0aGlzLnRlRW5BcGkudGVtcG9yYWxFbnRpdHlMaXN0KFxuICAgICAgICAgICAgbWV0YS5waywgbWV0YS5wa1NvdXJjZUVudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLmZrVGFyZ2V0Q2xhc3MsIG1ldGEuaXNPdXRnb2luZywgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXRcbiAgICAgICAgICApXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gbWV0YS5waztcbiAgICAgICAgICB0aGlzLmhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbihhY3Rpb24sIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LCBnbG9iYWxBY3Rpb25zLCBhcGlDYWwkLCBwa1Byb2plY3QpO1xuICAgICAgICB9KSlcbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIEVwaWMgdG8gbG9hZCBwYWdpbmF0ZWQgQWx0ZXJuYXRpdmUgVGVtcG9yYWwgRW50aXR5IExpc3RcbiAgICAgICAqL1xuICAgICAgKGFjdGlvbiQ6IEZsdXhBY3Rpb25PYnNlcnZhYmxlPGFueSwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LnR5cGUoJ0xPQUQnLCBJbmZUZW1wb3JhbEVudGl0eUFjdGlvbkZhY3RvcnkuUEFHSU5BVEVEX0FMVEVSTkFUSVZFX0xJU1QpKSxcbiAgICAgICAgbWVyZ2VNYXAoYWN0aW9uID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgICAgICAgY29uc3QgYXBpQ2FsJCA9IHRoaXMudGVFbkFwaS5hbHRlcm5hdGl2ZVRlbXBvcmFsRW50aXR5TGlzdChcbiAgICAgICAgICAgIG1ldGEucGssIG1ldGEucGtTb3VyY2VFbnRpdHksIG1ldGEucGtQcm9wZXJ0eSwgbWV0YS5ma1RhcmdldENsYXNzLCBtZXRhLmlzT3V0Z29pbmcsIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0XG4gICAgICAgICAgKVxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5oYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb24oYWN0aW9uLCBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeSwgZ2xvYmFsQWN0aW9ucywgYXBpQ2FsJCwgcGtQcm9qZWN0KTtcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlRlbXBvcmFsRW50aXR5Pj4oKG1ldGEpID0+IHRoaXMudGVFbkFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mVGVtcG9yYWxFbnRpdGllcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIudGVtcG9yYWxfZW50aXR5LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkuY3JlYXRlUmVtb3ZlRXBpYygpLFxuXG5cbiAgICAgIC8qKlxuICAgICAgICogU3RhdGVtZW50XG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEluZ29pbmdBbHRlcm5hdGl2ZVN0YXRlbWVudHM+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGkuYWx0ZXJuYXRpdmVzTm90SW5Qcm9qZWN0QnlFbnRpdHlQayhtZXRhLnBrRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEucGspLFxuICAgICAgICBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFU19JTkdPSU5HLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIG51bGwpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxJbmZTdGF0ZW1lbnQ+PigobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGlcbiAgICAgICAgLmZpbmRPckNyZWF0ZUluZlN0YXRlbWVudHMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnN0YXRlbWVudC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgICAgKGFjdGlvbiQ6IEZsdXhBY3Rpb25PYnNlcnZhYmxlPGFueSwgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhPiwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS50eXBlKCdMT0FEJywgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9MSVNUKSksXG4gICAgICAgIG1lcmdlTWFwKGFjdGlvbiA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IGFwaUNhbCQgPSB0aGlzLnN0YXRlbWVudEFwaS5wYWdpbmF0ZWRMaXN0VGFyZ2V0aW5nRW50aXR5UHJldmlld3MoXG4gICAgICAgICAgICBtZXRhLnBrLCBtZXRhLnBrU291cmNlRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEuZmtUYXJnZXRDbGFzcywgbWV0YS5pc091dGdvaW5nLCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldFxuICAgICAgICAgIClcbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBtZXRhLnBrO1xuICAgICAgICAgIHRoaXMuaGFuZGxlVGVtcG9yYWxFbnRpdHlMaXN0QWN0aW9uKGFjdGlvbiwgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LCBnbG9iYWxBY3Rpb25zLCBhcGlDYWwkLCBwa1Byb2plY3QpO1xuICAgICAgICB9KSlcbiAgICAgICksXG5cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cblxuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPEZpbmRTdGF0ZW1lbnRCeVBhcmFtcz4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnN0YXRlbWVudEFwaS5xdWVyeUJ5UGFyYW1zKG1ldGEub2ZQcm9qZWN0LCBtZXRhLnBrLCBtZXRhLnBrRW50aXR5LCBtZXRhLnBrSW5mb1JhbmdlLCBtZXRhLnBrSW5mb0RvbWFpbiwgbWV0YS5wa1Byb3BlcnR5KSxcbiAgICAgICAgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5CWV9QQVJBTVMsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnN0YXRlbWVudC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdMT0FEJyk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnN0YXRlbWVudEFwaS5zb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eShtZXRhLm9mUHJvamVjdCwgbWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAgIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuU09VUkNFU19BTkRfRElHSVRBTFNfT0ZfRU5USVRZLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCByZXMgPSByZXN1bHRzIGFzIGFueSBhcyBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eVJlc3VsdDtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXMuc3RhdGVtZW50cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG5cbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIyLmRpZ2l0YWwuZmxhdHRlbihyZXMuZGlnaXRhbHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lcjIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcblxuICAgICAgICB9XG4gICAgICApLFxuXG5cblxuICAgICAgLyoqXG4gICAgICAgKiBUZXh0IFByb3BlcnR5XG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXM+KChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaVxuICAgICAgICAuZmluZEFsdGVybmF0aXZlVGV4dFByb3BlcnRpZXMobWV0YS5waywgbWV0YS5ma0VudGl0eSwgbWV0YS5ma0NsYXNzRmllbGQpLFxuICAgICAgICBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5LkFMVEVSTkFUSVZFUyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIGluZlRleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mVGV4dFByb3BlcnR5Pj4oKG1ldGEpID0+IHRoaXMudGV4dFByb3BlcnR5QXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZUZXh0UHJvcGVydGllcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuICAgICk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBoYW5kbGVzIHRoZSB1cGRhdGUgb2Ygc3RvcmUgZm9yIHBhZ2luYXRlZCB0ZW1wb3JhbCBlbnRpdHkgbGlzdHMuXG4gICAqIEBwYXJhbSBwa1Byb2plY3QgaWYgbnVsbCwgbGlzdCBpcyBoYW5kbGVkIGFzICdyZXBvJyBsaXN0XG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbjxNPihcbiAgICBhY3Rpb24sXG4gICAgZXBpY3NGYWN0b3J5OiBJbmZFcGljc0ZhY3Rvcnk8SW5mVGVtcG9yYWxFbnRpdHlTbGljZSwgSW5mVGVtcG9yYWxFbnRpdHk+IHwgSW5mRXBpY3NGYWN0b3J5PEluZlN0YXRlbWVudFNsaWNlLCBJbmZTdGF0ZW1lbnQ+LFxuICAgIGdsb2JhbEFjdGlvbnMsXG4gICAgYXBpQ2FsbCQ6IE9ic2VydmFibGU8YW55PixcbiAgICBwa1Byb2plY3QpIHtcbiAgICBjb25zdCBtZXRhOiBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICBjb25zdCBzY29wZTogR3ZTdWJmaWVsZGFQYWdlU2NvcGUgPSBtZXRhLmFsdGVybmF0aXZlcyA/IHsgbm90SW5Qcm9qZWN0OiBwa1Byb2plY3QgfSA6IHsgaW5Qcm9qZWN0OiBwa1Byb2plY3QgfVxuICAgIGNvbnN0IHJlcTogR3ZTdWJmaWVsZFBhZ2UgPSB7XG4gICAgICBma1NvdXJjZUVudGl0eTogbWV0YS5wa1NvdXJjZUVudGl0eSxcbiAgICAgIGZrUHJvcGVydHk6IG1ldGEucGtQcm9wZXJ0eSxcbiAgICAgIGlzT3V0Z29pbmc6IG1ldGEuaXNPdXRnb2luZyxcbiAgICAgIHRhcmdldENsYXNzOiBtZXRhLmZrVGFyZ2V0Q2xhc3MsXG4gICAgICBsaW1pdDogbWV0YS5saW1pdCxcbiAgICAgIG9mZnNldDogbWV0YS5vZmZzZXQsXG4gICAgICBzY29wZSxcbiAgICB9XG4gICAgY29uc3QgcGVuZGluZ0tleSA9IG1ldGEuYWRkUGVuZGluZztcblxuICAgIC8vIGNhbGwgYWN0aW9uIHRvIHNldCBwYWdpbmF0aW9uIGxvYWRpbmcgb24gdHJ1ZVxuICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2UocmVxLCBwa1Byb2plY3QpO1xuICAgIC8vIGNhbGwgYXBpIHRvIGxvYWQgZGF0YVxuICAgIGFwaUNhbGwkLnN1YnNjcmliZSgoZGF0YTogUGFnaW5hdGVkU3RhdGVtZW50TGlzdCkgPT4ge1xuICAgICAgLy8gY2FsbCBhY3Rpb24gdG8gc3RvcmUgcmVjb3Jkc1xuICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KGRhdGEuc2NoZW1hcywgcGtQcm9qZWN0KTtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHBhZ2luYXRpb25cbiAgICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQubG9hZFBhZ2VTdWNjZWVkZWQoZGF0YS5wYWdpbmF0ZWRTdGF0ZW1lbnRzLCBkYXRhLmNvdW50LCByZXEsIHBrUHJvamVjdCk7XG4gICAgICAvLyBjYWxsIGFjdGlvbiB0byBjb25jbHVkZSB0aGUgcGVuZGluZyByZXF1ZXN0XG4gICAgICBlcGljc0ZhY3RvcnkuYWN0aW9ucy5sb2FkU3VjY2VlZGVkKFtdLCBwZW5kaW5nS2V5LCBwa1Byb2plY3QpO1xuICAgIH0sIGVycm9yID0+IHtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGhhbmRsZSBlcnJvclxuICAgICAgZXBpY3NGYWN0b3J5Lm9uRXJyb3IoZ2xvYmFsQWN0aW9ucywgZXJyb3IsIHBlbmRpbmdLZXksIHBrUHJvamVjdCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==