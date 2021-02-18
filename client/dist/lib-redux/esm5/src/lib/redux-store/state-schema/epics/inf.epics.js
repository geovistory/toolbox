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
        var _a, _b;
        var _this = this;
        /** @type {?} */
        var meta = action.meta;
        /** @type {?} */
        var pendingKey = meta.addPending;
        /** @type {?} */
        var paginateBy = [
            { fk_property: meta.pkProperty },
            { fk_target_class: meta.fkTargetClass },
            (_a = {}, _a[meta.isOutgoing ? 'fk_subject_info' : 'fk_object_info'] = meta.pkSourceEntity, _a),
            (_b = {}, _b[meta.alternatives ? 'alternatives' : 'ofProject'] = meta.alternatives, _b)
        ];
        // call action to set pagination loading on true
        this.infActions.statement.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
        // call api to load data
        apiCall$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            // call action to store records
            _this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
            // call action to store pagination
            _this.infActions.statement.loadPageSucceeded(data.paginatedStatements, data.count, paginateBy, meta.limit, meta.offset, pkProject);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixvQkFBb0IsRUFBZ0IsZUFBZSxFQUFxQixvQkFBb0IsRUFBbUIsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoTixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQXlCLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSx5QkFBeUIsRUFBRSw4QkFBOEIsRUFBRSw0QkFBNEIsRUFBdU0sTUFBTSx3QkFBd0IsQ0FBQztBQUN6WSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7QUFHL0Q7SUFJRSxrQkFDUyxZQUFxQyxFQUNyQyxPQUE2QixFQUM3QixPQUE2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Tiw4QkFBOEI7WUFDOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRSxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQWpRRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLHVCQUF1QjtnQkFOSixvQkFBb0I7Z0JBQW9ELG9CQUFvQjtnQkFBeEQsZUFBZTtnQkFBNEQsa0JBQWtCO2dCQVE3SCxVQUFVO2dCQUNqQyxVQUFVO2dCQUZWLFVBQVU7Z0JBUDRJLGlCQUFpQjtnQkFZdkssYUFBYTs7O21CQWJ0QjtDQW9SQyxBQWxRRCxJQWtRQztTQS9QWSxRQUFROzs7SUFFakIsZ0NBQTRDOztJQUM1QywyQkFBb0M7O0lBQ3BDLDJCQUFvQzs7SUFDcEMsZ0NBQW9DOztJQUNwQyxtQ0FBMEM7O0lBQzFDLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLGtDQUF3Qzs7Ozs7SUFDeEMsdUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBlcnNpc3RlbnRJdGVtQXBpLCBJbmZTdGF0ZW1lbnQsIEluZlN0YXRlbWVudEFwaSwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRlbXBvcmFsRW50aXR5QXBpLCBJbmZUZXh0UHJvcGVydHksIEluZlRleHRQcm9wZXJ0eUFwaSwgUHJvSW5mb1Byb2pSZWxBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBGaW5kU3RhdGVtZW50QnlQYXJhbXMsIEluZkFjdGlvbnMsIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeSwgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeSwgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LCBJbmZUZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5LCBMb2FkQWx0ZXJuYXRpdmVUZXh0UHJvcGVydGllcywgTG9hZEJ5UGtNZXRhLCBMb2FkSW5nb2luZ0FsdGVybmF0aXZlU3RhdGVtZW50cywgTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhLCBQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0LCBTb3VyY2VzQW5kRGlnaXRhbHNPZkVudGl0eSwgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlN0YXRlbWVudFNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eVNsaWNlLCBJbmZUZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9pbmYubW9kZWxzJztcbmltcG9ydCB7IGluZlJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvaW5mLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxhdHRlbmVyLCBzdG9yZUZsYXR0ZW5lZCB9IGZyb20gJy4uL19oZWxwZXJzL2ZsYXR0ZW5lcic7XG5pbXBvcnQgeyBJbmZFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9pbmYtZXBpYy1mYWN0b3J5JztcbmltcG9ydCB7IEZsdXhBY3Rpb25PYnNlcnZhYmxlLCBNb2RpZnlBY3Rpb25NZXRhLCBQYWdpbmF0ZUJ5UGFyYW0gfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSW5mRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgcGVJdEFwaTogSW5mUGVyc2lzdGVudEl0ZW1BcGksXG4gICAgcHVibGljIHRlRW5BcGk6IEluZlRlbXBvcmFsRW50aXR5QXBpLFxuICAgIHB1YmxpYyBzdGF0ZW1lbnRBcGk6IEluZlN0YXRlbWVudEFwaSxcbiAgICBwdWJsaWMgdGV4dFByb3BlcnR5QXBpOiBJbmZUZXh0UHJvcGVydHlBcGksXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIGluZm9Qcm9qUmVsQXBpOiBQcm9JbmZvUHJvalJlbEFwaSxcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYVNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtPlxuICAgICAgKGluZlJvb3QsICdwZXJzaXN0ZW50X2l0ZW0nLCB0aGlzLmluZkFjdGlvbnMucGVyc2lzdGVudF9pdGVtLCB0aGlzLm5vdGlmaWNhdGlvbiwgdGhpcy5pbmZvUHJvalJlbEFwaSwgdGhpcy5wcm9BY3Rpb25zKTtcblxuICAgIGNvbnN0IGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5ID0gbmV3IEluZkVwaWNzRmFjdG9yeTxJbmZUZW1wb3JhbEVudGl0eVNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eT5cbiAgICAgIChpbmZSb290LCAndGVtcG9yYWxfZW50aXR5JywgdGhpcy5pbmZBY3Rpb25zLnRlbXBvcmFsX2VudGl0eSwgdGhpcy5ub3RpZmljYXRpb24sIHRoaXMuaW5mb1Byb2pSZWxBcGksIHRoaXMucHJvQWN0aW9ucyk7XG5cbiAgICBjb25zdCBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkgPSBuZXcgSW5mRXBpY3NGYWN0b3J5PEluZlN0YXRlbWVudFNsaWNlLCBJbmZTdGF0ZW1lbnQ+XG4gICAgICAoaW5mUm9vdCwgJ3N0YXRlbWVudCcsIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQsIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgY29uc3QgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5ID0gbmV3IEluZkVwaWNzRmFjdG9yeTxJbmZUZXh0UHJvcGVydHlTbGljZSwgSW5mVGV4dFByb3BlcnR5PlxuICAgICAgKGluZlJvb3QsICd0ZXh0X3Byb3BlcnR5JywgdGhpcy5pbmZBY3Rpb25zLnRleHRfcHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uLCB0aGlzLmluZm9Qcm9qUmVsQXBpLCB0aGlzLnByb0FjdGlvbnMpO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8qKlxuICAgICAgICogUGVyc3Rpc3RlbnQgSXRlbVxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtNZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMucGVJdEFwaS5vd25Qcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgICBJbmZQZXJzaXN0ZW50SXRlbUFjdGlvbkZhY3RvcnkuTUlOSU1BTF9CWV9QSyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSByZWNvcmRzXG4gICAgICAgICAgT2JqZWN0LmtleXMoc2NoZW1hcykuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdGlvbnM7XG4gICAgICAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgICAgICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gICAgICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWFzW3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQoc2NoZW1hc1tzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwaylcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtNZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMucGVJdEFwaS50eXBlc09mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgSW5mUGVyc2lzdGVudEl0ZW1BY3Rpb25GYWN0b3J5LlRZUEVTX09GX1BST0pFQ1QsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFPYmplY3QsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLy8gaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZFR5cGVPZlByb2plY3RBY3Rpb24+KFxuICAgICAgLy8gICAobWV0YSkgPT4gdGhpcy5wZUl0QXBpLnR5cGVPZlByb2plY3QobWV0YS5waywgbWV0YS5wa0VudGl0eSksXG4gICAgICAvLyAgIEluZlBlcnNpc3RlbnRJdGVtQWN0aW9uRmFjdG9yeS5UWVBFX09GX1BST0pFQ1QsXG4gICAgICAvLyAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgLy8gICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAvLyAgICAgZmxhdHRlbmVyLnBlcnNpc3RlbnRfaXRlbS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgLy8gICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgLy8gICB9XG4gICAgICAvLyApLFxuICAgICAgaW5mUGVyc2lzdGVudEl0ZW1FcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlBlcnNpc3RlbnRJdGVtPj4oKG1ldGEpID0+IHRoaXMucGVJdEFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mUGVyc2lzdGVudEl0ZW1zKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wZXJzaXN0ZW50X2l0ZW0uZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBpbmZQZXJzaXN0ZW50SXRlbUVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cblxuICAgICAgLyoqXG4gICAgICAgKiBUZW1wb3JhbCBFbnRpdHlcbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRCeVBrTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnRlRW5BcGkub3duUHJvcGVydGllcyhtZXRhLnBrLCBtZXRhLnBrRW50aXR5KSxcbiAgICAgICAgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5Lk9XTl9QUk9QRVJUSUVTLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFPYmplY3QgPSByZXN1bHRzIGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogRXBpYyB0byBsb2FkIHBhZ2luYXRlZCBUZW1wb3JhbCBFbnRpdHkgTGlzdFxuICAgICAgICovXG4gICAgICAoYWN0aW9uJDogRmx1eEFjdGlvbk9ic2VydmFibGU8YW55LCBMb2FkUGFnaW5hdGVkU3RhdGVtZW50TGlzdE1ldGE+LCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnkudHlwZSgnTE9BRCcsIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfTElTVCkpLFxuICAgICAgICBtZXJnZU1hcChhY3Rpb24gPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICAgICAgICBjb25zdCBhcGlDYWwkID0gdGhpcy50ZUVuQXBpLnRlbXBvcmFsRW50aXR5TGlzdChcbiAgICAgICAgICAgIG1ldGEucGssIG1ldGEucGtTb3VyY2VFbnRpdHksIG1ldGEucGtQcm9wZXJ0eSwgbWV0YS5ma1RhcmdldENsYXNzLCBtZXRhLmlzT3V0Z29pbmcsIG1ldGEubGltaXQsIG1ldGEub2Zmc2V0XG4gICAgICAgICAgKVxuICAgICAgICAgIGNvbnN0IHBrUHJvamVjdCA9IG1ldGEucGs7XG4gICAgICAgICAgdGhpcy5oYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb24oYWN0aW9uLCBpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeSwgZ2xvYmFsQWN0aW9ucywgYXBpQ2FsJCwgcGtQcm9qZWN0KTtcbiAgICAgICAgfSkpXG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBFcGljIHRvIGxvYWQgcGFnaW5hdGVkIEFsdGVybmF0aXZlIFRlbXBvcmFsIEVudGl0eSBMaXN0XG4gICAgICAgKi9cbiAgICAgIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxhbnksIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShpbmZUZW1wb3JhbEVudGl0eUVwaWNzRmFjdG9yeS50eXBlKCdMT0FEJywgSW5mVGVtcG9yYWxFbnRpdHlBY3Rpb25GYWN0b3J5LlBBR0lOQVRFRF9BTFRFUk5BVElWRV9MSVNUKSksXG4gICAgICAgIG1lcmdlTWFwKGFjdGlvbiA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhO1xuICAgICAgICAgIGNvbnN0IGFwaUNhbCQgPSB0aGlzLnRlRW5BcGkuYWx0ZXJuYXRpdmVUZW1wb3JhbEVudGl0eUxpc3QoXG4gICAgICAgICAgICBtZXRhLnBrLCBtZXRhLnBrU291cmNlRW50aXR5LCBtZXRhLnBrUHJvcGVydHksIG1ldGEuZmtUYXJnZXRDbGFzcywgbWV0YS5pc091dGdvaW5nLCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldFxuICAgICAgICAgIClcbiAgICAgICAgICBjb25zdCBwa1Byb2plY3QgPSBudWxsO1xuICAgICAgICAgIHRoaXMuaGFuZGxlVGVtcG9yYWxFbnRpdHlMaXN0QWN0aW9uKGFjdGlvbiwgaW5mVGVtcG9yYWxFbnRpdHlFcGljc0ZhY3RvcnksIGdsb2JhbEFjdGlvbnMsIGFwaUNhbCQsIHBrUHJvamVjdCk7XG4gICAgICAgIH0pKVxuICAgICAgKSxcbiAgICAgIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxJbmZUZW1wb3JhbEVudGl0eT4+KChtZXRhKSA9PiB0aGlzLnRlRW5BcGlcbiAgICAgICAgLmZpbmRPckNyZWF0ZUluZlRlbXBvcmFsRW50aXRpZXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnRlbXBvcmFsX2VudGl0eS5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlRlbXBvcmFsRW50aXR5RXBpY3NGYWN0b3J5LmNyZWF0ZVJlbW92ZUVwaWMoKSxcblxuXG4gICAgICAvKipcbiAgICAgICAqIFN0YXRlbWVudFxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mU3RhdGVtZW50RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRJbmdvaW5nQWx0ZXJuYXRpdmVTdGF0ZW1lbnRzPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuc3RhdGVtZW50QXBpLmFsdGVybmF0aXZlc05vdEluUHJvamVjdEJ5RW50aXR5UGsobWV0YS5wa0VudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLnBrKSxcbiAgICAgICAgSW5mU3RhdGVtZW50QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVNfSU5HT0lORyxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuc3RhdGVtZW50LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8SW5mU3RhdGVtZW50Pj4oKG1ldGEpID0+IHRoaXMuc3RhdGVtZW50QXBpXG4gICAgICAgIC5maW5kT3JDcmVhdGVJbmZTdGF0ZW1lbnRzKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxhbnksIExvYWRQYWdpbmF0ZWRTdGF0ZW1lbnRMaXN0TWV0YT4sIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkudHlwZSgnTE9BRCcsIEluZlRlbXBvcmFsRW50aXR5QWN0aW9uRmFjdG9yeS5QQUdJTkFURURfTElTVCkpLFxuICAgICAgICBtZXJnZU1hcChhY3Rpb24gPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YTtcbiAgICAgICAgICBjb25zdCBhcGlDYWwkID0gdGhpcy5zdGF0ZW1lbnRBcGkucGFnaW5hdGVkTGlzdFRhcmdldGluZ0VudGl0eVByZXZpZXdzKFxuICAgICAgICAgICAgbWV0YS5waywgbWV0YS5wa1NvdXJjZUVudGl0eSwgbWV0YS5wa1Byb3BlcnR5LCBtZXRhLmZrVGFyZ2V0Q2xhc3MsIG1ldGEuaXNPdXRnb2luZywgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXRcbiAgICAgICAgICApXG4gICAgICAgICAgY29uc3QgcGtQcm9qZWN0ID0gbWV0YS5waztcbiAgICAgICAgICB0aGlzLmhhbmRsZVRlbXBvcmFsRW50aXR5TGlzdEFjdGlvbihhY3Rpb24sIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeSwgZ2xvYmFsQWN0aW9ucywgYXBpQ2FsJCwgcGtQcm9qZWN0KTtcbiAgICAgICAgfSkpXG4gICAgICApLFxuXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlUmVtb3ZlRXBpYygpLFxuXG5cbiAgICAgIGluZlN0YXRlbWVudEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxGaW5kU3RhdGVtZW50QnlQYXJhbXM+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGkucXVlcnlCeVBhcmFtcyhtZXRhLm9mUHJvamVjdCwgbWV0YS5waywgbWV0YS5wa0VudGl0eSwgbWV0YS5wa0luZm9SYW5nZSwgbWV0YS5wa0luZm9Eb21haW4sIG1ldGEucGtQcm9wZXJ0eSksXG4gICAgICAgIEluZlN0YXRlbWVudEFjdGlvbkZhY3RvcnkuQllfUEFSQU1TLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5zdGF0ZW1lbnQuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnTE9BRCcpO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICBpbmZTdGF0ZW1lbnRFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8U291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHk+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5zdGF0ZW1lbnRBcGkuc291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHkobWV0YS5vZlByb2plY3QsIG1ldGEucGssIG1ldGEucGtFbnRpdHkpLFxuICAgICAgICBJbmZTdGF0ZW1lbnRBY3Rpb25GYWN0b3J5LlNPVVJDRVNfQU5EX0RJR0lUQUxTX09GX0VOVElUWSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gcmVzdWx0cyBhcyBhbnkgYXMgU291cmNlc0FuZERpZ2l0YWxzT2ZFbnRpdHlSZXN1bHQ7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuc3RhdGVtZW50LmZsYXR0ZW4ocmVzLnN0YXRlbWVudHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuXG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyMiA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyMi5kaWdpdGFsLmZsYXR0ZW4ocmVzLmRpZ2l0YWxzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG5cbiAgICAgICAgfVxuICAgICAgKSxcblxuXG5cbiAgICAgIC8qKlxuICAgICAgICogVGV4dCBQcm9wZXJ0eVxuICAgICAgICpcbiAgICAgICAqL1xuICAgICAgaW5mVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzPigobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGlcbiAgICAgICAgLmZpbmRBbHRlcm5hdGl2ZVRleHRQcm9wZXJ0aWVzKG1ldGEucGssIG1ldGEuZmtFbnRpdHksIG1ldGEuZmtDbGFzc0ZpZWxkKSxcbiAgICAgICAgSW5mVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeS5BTFRFUk5BVElWRVMsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnRleHRfcHJvcGVydHkuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIG51bGwpO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICBpbmZUZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPEluZlRleHRQcm9wZXJ0eT4+KChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaVxuICAgICAgICAuZmluZE9yQ3JlYXRlSW5mVGV4dFByb3BlcnRpZXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnRleHRfcHJvcGVydHkuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGluZlRleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVSZW1vdmVFcGljKCksXG5cbiAgICApO1xuICB9XG5cblxuICAvKipcbiAgICogaGFuZGxlcyB0aGUgdXBkYXRlIG9mIHN0b3JlIGZvciBwYWdpbmF0ZWQgdGVtcG9yYWwgZW50aXR5IGxpc3RzLlxuICAgKiBAcGFyYW0gcGtQcm9qZWN0IGlmIG51bGwsIGxpc3QgaXMgaGFuZGxlZCBhcyAncmVwbycgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVUZW1wb3JhbEVudGl0eUxpc3RBY3Rpb248TT4oXG4gICAgYWN0aW9uLFxuICAgIGVwaWNzRmFjdG9yeTogSW5mRXBpY3NGYWN0b3J5PEluZlRlbXBvcmFsRW50aXR5U2xpY2UsIEluZlRlbXBvcmFsRW50aXR5PiB8IEluZkVwaWNzRmFjdG9yeTxJbmZTdGF0ZW1lbnRTbGljZSwgSW5mU3RhdGVtZW50PixcbiAgICBnbG9iYWxBY3Rpb25zLFxuICAgIGFwaUNhbGwkOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgcGtQcm9qZWN0KSB7XG4gICAgY29uc3QgbWV0YTogTG9hZFBhZ2luYXRlZFN0YXRlbWVudExpc3RNZXRhID0gYWN0aW9uLm1ldGE7XG4gICAgY29uc3QgcGVuZGluZ0tleSA9IG1ldGEuYWRkUGVuZGluZztcbiAgICBjb25zdCBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSA9IFtcbiAgICAgIHsgZmtfcHJvcGVydHk6IG1ldGEucGtQcm9wZXJ0eSB9LFxuICAgICAgeyBma190YXJnZXRfY2xhc3M6IG1ldGEuZmtUYXJnZXRDbGFzcyB9LFxuICAgICAgeyBbbWV0YS5pc091dGdvaW5nID8gJ2ZrX3N1YmplY3RfaW5mbycgOiAnZmtfb2JqZWN0X2luZm8nXTogbWV0YS5wa1NvdXJjZUVudGl0eSB9LFxuICAgICAgeyBbbWV0YS5hbHRlcm5hdGl2ZXMgPyAnYWx0ZXJuYXRpdmVzJyA6ICdvZlByb2plY3QnXTogbWV0YS5hbHRlcm5hdGl2ZXMgfVxuICAgIF07XG4gICAgLy8gY2FsbCBhY3Rpb24gdG8gc2V0IHBhZ2luYXRpb24gbG9hZGluZyBvbiB0cnVlXG4gICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudC5sb2FkUGFnZShwYWdpbmF0ZUJ5LCBtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCwgcGtQcm9qZWN0KTtcbiAgICAvLyBjYWxsIGFwaSB0byBsb2FkIGRhdGFcbiAgICBhcGlDYWxsJC5zdWJzY3JpYmUoKGRhdGE6IFBhZ2luYXRlZFN0YXRlbWVudExpc3QpID0+IHtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIHN0b3JlIHJlY29yZHNcbiAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChkYXRhLnNjaGVtYXMsIHBrUHJvamVjdCk7XG4gICAgICAvLyBjYWxsIGFjdGlvbiB0byBzdG9yZSBwYWdpbmF0aW9uXG4gICAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LmxvYWRQYWdlU3VjY2VlZGVkKGRhdGEucGFnaW5hdGVkU3RhdGVtZW50cywgZGF0YS5jb3VudCwgcGFnaW5hdGVCeSwgbWV0YS5saW1pdCwgbWV0YS5vZmZzZXQsIHBrUHJvamVjdCk7XG4gICAgICAvLyBjYWxsIGFjdGlvbiB0byBjb25jbHVkZSB0aGUgcGVuZGluZyByZXF1ZXN0XG4gICAgICBlcGljc0ZhY3RvcnkuYWN0aW9ucy5sb2FkU3VjY2VlZGVkKFtdLCBwZW5kaW5nS2V5LCBwa1Byb2plY3QpO1xuICAgIH0sIGVycm9yID0+IHtcbiAgICAgIC8vIGNhbGwgYWN0aW9uIHRvIGhhbmRsZSBlcnJvclxuICAgICAgZXBpY3NGYWN0b3J5Lm9uRXJyb3IoZ2xvYmFsQWN0aW9ucywgZXJyb3IsIHBlbmRpbmdLZXksIHBrUHJvamVjdCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==