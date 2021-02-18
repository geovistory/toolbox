/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/pro.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ProClassFieldConfigApi, ProDfhClassProjRelApi, ProDfhProfileProjRelApi, ProInfoProjRelApi, ProProjectApi, ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions, ProClassFieldConfigActionFactory, ProDfhClassProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProInfoProjRelActionFactory, ProProjectActionFactory, ProTextPropertyActionFactory } from '../actions/pro.actions';
import { proRoot } from '../reducer-configs/pro.config';
import { SchemaService } from '../services/schema.service';
import { Flattener, storeFlattened } from '../_helpers/flattener';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import * as i0 from "@angular/core";
import * as i1 from "../../state-gui/actions/notifications.actions";
import * as i2 from "../actions/inf.actions";
import * as i3 from "../actions/pro.actions";
import * as i4 from "../actions/dat.actions";
import * as i5 from "@kleiolab/lib-sdk-lb3";
import * as i6 from "@kleiolab/lib-sdk-lb4";
import * as i7 from "../services/schema.service";
var ProEpics = /** @class */ (function () {
    function ProEpics(notification, infActions, proActions, datActions, projectApi, infoProjRelApi, classProjRelApi, profileProjRelApi, classFieldConfApi, textPropertyApi, analysisApi, schemaObjectService) {
        this.notification = notification;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.projectApi = projectApi;
        this.infoProjRelApi = infoProjRelApi;
        this.classProjRelApi = classProjRelApi;
        this.profileProjRelApi = profileProjRelApi;
        this.classFieldConfApi = classFieldConfApi;
        this.textPropertyApi = textPropertyApi;
        this.analysisApi = analysisApi;
        this.schemaObjectService = schemaObjectService;
    }
    /**
     * @return {?}
     */
    ProEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var proProjectEpicsFactory = new SchemaEpicsFactory(proRoot, 'project', this.proActions.project, this.notification);
        /** @type {?} */
        var proInfoProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);
        /** @type {?} */
        var proDfhClassProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);
        /** @type {?} */
        var proDfhProfileProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);
        /** @type {?} */
        var proClassFieldConfigEpicsFactory = new SchemaEpicsFactory(proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);
        /** @type {?} */
        var proTextPropertyEpicsFactory = new SchemaEpicsFactory(proRoot, 'text_property', this.proActions.text_property, this.notification);
        /** @type {?} */
        var proAnalysisEpicsFactory = new SchemaEpicsFactory(proRoot, 'analysis', this.proActions.analysis, this.notification);
        return combineEpics(
        /**
        * ProProject
        */
        proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.projectApi
            .ofAccount(meta.pk); }), ProProjectActionFactory.OF_ACCOUNT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.projectApi
            .getBasics(meta.pk); }), ProProjectActionFactory.LOAD_BASICS, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), 
        /**
         * ProInfoProjRel
         */
        proInfoProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.infoProjRelApi
            .bulkUpdateEprAttributes(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), proInfoProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.infoProjRelApi
            .markStatementAsFavorite(meta.pk, meta.pkStatement, meta.isOutgoing); }), ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
         * ProClassFieldConfig
         */
        proClassFieldConfigEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classFieldConfApi.ofProject(meta.pk); }), ProClassFieldConfigActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proClassFieldConfigEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classFieldConfApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
         * ProProDfhClassProjRel
         */
        proDfhClassProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classProjRelApi.ofProject(meta.pk); }), ProDfhClassProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhClassProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.classProjRelApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
        * ProDfhProfileProjRel
        */
        proDfhProfileProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.profileProjRelApi.ofProject(meta.pk); }), ProDfhProfileProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhProfileProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.profileProjRelApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), 
        /**
        * ProTextProperty
        */
        proTextPropertyEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi.ofProject(meta.pk); }), ProTextPropertyActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            _this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi
            .bulkUpsert(meta.pk, meta.items); }), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            _this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.textPropertyApi.bulkDelete(meta.pk, meta.items); })), 
        /**
        * ProAnalysis
        */
        // proAnalysisEpicsFactory.createLoadEpic<LoadByPkANsVersionActionMeta>(
        //   (meta) => this.analysisApi.analysisControllerGetVersion(meta.pk, meta.pkEntity, meta.version).pipe(map(x => [x])),
        //   ProAnalysisActionFactory.BY_PK_AND_VERSION,
        //   (results) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.analysis.flatten(results);
        //     storeFlattened(flattener.getFlattened());
        //   }
        // ),
        // proAnalysisEpicsFactory.createUpsertEpic<ModifyActionMeta<ProAnalysis>>(
        //   (meta) => this.analysisApi.analysisControllerBulkUpsert(meta.pk, meta.items),
        //   (results, pk) => {
        //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
        //     flattener.analysis.flatten(results);
        //     storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        //   }
        // ),
        proAnalysisEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.pk_entity; }))); })));
    };
    ProEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProEpics.ctorParameters = function () { return [
        { type: NotificationsAPIActions },
        { type: InfActions },
        { type: ProActions },
        { type: DatActions },
        { type: ProProjectApi },
        { type: ProInfoProjRelApi },
        { type: ProDfhClassProjRelApi },
        { type: ProDfhProfileProjRelApi },
        { type: ProClassFieldConfigApi },
        { type: ProTextPropertyApi },
        { type: AnalysisService },
        { type: SchemaService }
    ]; };
    /** @nocollapse */ ProEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ProEpics_Factory() { return new ProEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.InfActions), i0.ɵɵinject(i3.ProActions), i0.ɵɵinject(i4.DatActions), i0.ɵɵinject(i5.ProProjectApi), i0.ɵɵinject(i5.ProInfoProjRelApi), i0.ɵɵinject(i5.ProDfhClassProjRelApi), i0.ɵɵinject(i5.ProDfhProfileProjRelApi), i0.ɵɵinject(i5.ProClassFieldConfigApi), i0.ɵɵinject(i5.ProTextPropertyApi), i0.ɵɵinject(i6.AnalysisService), i0.ɵɵinject(i7.SchemaService)); }, token: ProEpics, providedIn: "root" });
    return ProEpics;
}());
export { ProEpics };
if (false) {
    /** @type {?} */
    ProEpics.prototype.notification;
    /** @type {?} */
    ProEpics.prototype.infActions;
    /** @type {?} */
    ProEpics.prototype.proActions;
    /** @type {?} */
    ProEpics.prototype.datActions;
    /** @type {?} */
    ProEpics.prototype.projectApi;
    /** @type {?} */
    ProEpics.prototype.infoProjRelApi;
    /** @type {?} */
    ProEpics.prototype.classProjRelApi;
    /** @type {?} */
    ProEpics.prototype.profileProjRelApi;
    /** @type {?} */
    ProEpics.prototype.classFieldConfApi;
    /** @type {?} */
    ProEpics.prototype.textPropertyApi;
    /** @type {?} */
    ProEpics.prototype.analysisApi;
    /**
     * @type {?}
     * @private
     */
    ProEpics.prototype.schemaObjectService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3Byby5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF1QixzQkFBc0IsRUFBc0IscUJBQXFCLEVBQXdCLHVCQUF1QixFQUFrQixpQkFBaUIsRUFBYyxhQUFhLEVBQW1CLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDalIsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBcUMsVUFBVSxFQUFFLGdDQUFnQyxFQUFFLCtCQUErQixFQUFFLGlDQUFpQyxFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLDRCQUE0QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFalIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWxFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7Ozs7QUFJdEU7SUFJRSxrQkFDUyxZQUFxQyxFQUNyQyxVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFz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RixFQUN6RyxDQUNGLENBQUE7SUFDSCxDQUFDOztnQkE1TEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFmUSx1QkFBdUI7Z0JBRXZCLFVBQVU7Z0JBQ3lCLFVBQVU7Z0JBRjdDLFVBQVU7Z0JBTDRLLGFBQWE7Z0JBQTVDLGlCQUFpQjtnQkFBdkcscUJBQXFCO2dCQUF3Qix1QkFBdUI7Z0JBQWhILHNCQUFzQjtnQkFBMkssa0JBQWtCO2dCQUN4TyxlQUFlO2dCQVNmLGFBQWE7OzttQkFYdEI7Q0E4TkMsQUE1TUQsSUE0TUM7U0F6TVksUUFBUTs7O0lBRWpCLGdDQUE0Qzs7SUFDNUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQWdDOztJQUNoQyxrQ0FBd0M7O0lBQ3hDLG1DQUE2Qzs7SUFDN0MscUNBQWlEOztJQUNqRCxxQ0FBZ0Q7O0lBQ2hELG1DQUEwQzs7SUFDMUMsK0JBQW1DOzs7OztJQUNuQyx1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0RmaENsYXNzUHJvalJlbEFwaSwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpLCBQcm9JbmZvUHJvalJlbCwgUHJvSW5mb1Byb2pSZWxBcGksIFByb1Byb2plY3QsIFByb1Byb2plY3RBcGksIFByb1RleHRQcm9wZXJ0eSwgUHJvVGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEFuYWx5c2lzU2VydmljZSwgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IE1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlQWN0aW9uTWV0YSwgUHJvQWN0aW9ucywgUHJvQ2xhc3NGaWVsZENvbmZpZ0FjdGlvbkZhY3RvcnksIFByb0RmaENsYXNzUHJvalJlbEFjdGlvbkZhY3RvcnksIFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeSwgUHJvSW5mb1Byb2pSZWxBY3Rpb25GYWN0b3J5LCBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeSwgUHJvVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXNTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvUHJvamVjdFNsaWNlLCBQcm9UZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9wcm8ubW9kZWxzJztcbmltcG9ydCB7IHByb1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvcHJvLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxhdHRlbmVyLCBzdG9yZUZsYXR0ZW5lZCB9IGZyb20gJy4uL19oZWxwZXJzL2ZsYXR0ZW5lcic7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSwgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvamVjdEFwaTogUHJvUHJvamVjdEFwaSxcbiAgICBwdWJsaWMgaW5mb1Byb2pSZWxBcGk6IFByb0luZm9Qcm9qUmVsQXBpLFxuICAgIHB1YmxpYyBjbGFzc1Byb2pSZWxBcGk6IFByb0RmaENsYXNzUHJvalJlbEFwaSxcbiAgICBwdWJsaWMgcHJvZmlsZVByb2pSZWxBcGk6IFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpLFxuICAgIHB1YmxpYyBjbGFzc0ZpZWxkQ29uZkFwaTogUHJvQ2xhc3NGaWVsZENvbmZpZ0FwaSxcbiAgICBwdWJsaWMgdGV4dFByb3BlcnR5QXBpOiBQcm9UZXh0UHJvcGVydHlBcGksXG4gICAgcHVibGljIGFuYWx5c2lzQXBpOiBBbmFseXNpc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RTZXJ2aWNlOiBTY2hlbWFTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IHByb1Byb2plY3RFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb1Byb2plY3RTbGljZSwgUHJvUHJvamVjdD5cbiAgICAgIChwcm9Sb290LCAncHJvamVjdCcsIHRoaXMucHJvQWN0aW9ucy5wcm9qZWN0LCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9JbmZvUHJvalJlbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWw+XG4gICAgICAocHJvUm9vdCwgJ2luZm9fcHJval9yZWwnLCB0aGlzLnByb0FjdGlvbnMuaW5mb19wcm9qX3JlbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvRGZoQ2xhc3NQcm9qUmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoQ2xhc3NQcm9qUmVsPlxuICAgICAgKHByb1Jvb3QsICdkZmhfY2xhc3NfcHJval9yZWwnLCB0aGlzLnByb0FjdGlvbnMuZGZoX2NsYXNzX3Byb2pfcmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9EZmhQcm9maWxlUHJvalJlbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWw+XG4gICAgICAocHJvUm9vdCwgJ2RmaF9wcm9maWxlX3Byb2pfcmVsJywgdGhpcy5wcm9BY3Rpb25zLmRmaF9wcm9maWxlX3Byb2pfcmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9DbGFzc0ZpZWxkQ29uZmlnRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2UsIFByb0NsYXNzRmllbGRDb25maWc+XG4gICAgICAocHJvUm9vdCwgJ2NsYXNzX2ZpZWxkX2NvbmZpZycsIHRoaXMucHJvQWN0aW9ucy5jbGFzc19maWVsZF9jb25maWcsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb1RleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvVGV4dFByb3BlcnR5U2xpY2UsIFByb1RleHRQcm9wZXJ0eT5cbiAgICAgIChwcm9Sb290LCAndGV4dF9wcm9wZXJ0eScsIHRoaXMucHJvQWN0aW9ucy50ZXh0X3Byb3BlcnR5LCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvQW5hbHlzaXNTbGljZSwgUHJvQW5hbHlzaXM+XG4gICAgICAocHJvUm9vdCwgJ2FuYWx5c2lzJywgdGhpcy5wcm9BY3Rpb25zLmFuYWx5c2lzLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIC8qKlxuICAgICAgKiBQcm9Qcm9qZWN0XG4gICAgICAqL1xuICAgICAgcHJvUHJvamVjdEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvamVjdEFwaVxuICAgICAgICAub2ZBY2NvdW50KG1ldGEucGspLFxuICAgICAgICBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeS5PRl9BQ0NPVU5ULFxuICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19wcm9qZWN0LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb1Byb2plY3RFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb2plY3RBcGlcbiAgICAgICAgLmdldEJhc2ljcyhtZXRhLnBrKSxcbiAgICAgICAgUHJvUHJvamVjdEFjdGlvbkZhY3RvcnkuTE9BRF9CQVNJQ1MsXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX3Byb2plY3QuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBQcm9JbmZvUHJvalJlbFxuICAgICAgICovXG4gICAgICBwcm9JbmZvUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvSW5mb1Byb2pSZWw+PigobWV0YSkgPT4gdGhpcy5pbmZvUHJvalJlbEFwaVxuICAgICAgICAuYnVsa1VwZGF0ZUVwckF0dHJpYnV0ZXMobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLmluZm9fcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9JbmZvUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxNYXJrU3RhdGVtZW50QXNGYXZvcml0ZUFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLmluZm9Qcm9qUmVsQXBpXG4gICAgICAgIC5tYXJrU3RhdGVtZW50QXNGYXZvcml0ZShtZXRhLnBrLCBtZXRhLnBrU3RhdGVtZW50LCBtZXRhLmlzT3V0Z29pbmcpLFxuICAgICAgICBQcm9JbmZvUHJvalJlbEFjdGlvbkZhY3RvcnkuTUFSS19ST0xFX0FTX0ZBVk9SSVRFLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBQcm9DbGFzc0ZpZWxkQ29uZmlnXG4gICAgICAgKi9cbiAgICAgIHByb0NsYXNzRmllbGRDb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jbGFzc0ZpZWxkQ29uZkFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb0NsYXNzRmllbGRDb25maWdBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2NsYXNzX2ZpZWxkX2NvbmZpZy5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9DbGFzc0ZpZWxkQ29uZmlnRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9DbGFzc0ZpZWxkQ29uZmlnPj4oKG1ldGEpID0+IHRoaXMuY2xhc3NGaWVsZENvbmZBcGlcbiAgICAgICAgLmJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19jbGFzc19maWVsZF9jb25maWcuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIFByb1Byb0RmaENsYXNzUHJvalJlbFxuICAgICAgICovXG4gICAgICBwcm9EZmhDbGFzc1Byb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jbGFzc1Byb2pSZWxBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBQcm9EZmhDbGFzc1Byb2pSZWxBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2RmaF9jbGFzc19wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9EZmhDbGFzc1Byb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb0RmaENsYXNzUHJvalJlbD4+KChtZXRhKSA9PiB0aGlzLmNsYXNzUHJvalJlbEFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2RmaF9jbGFzc19wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgKiBQcm9EZmhQcm9maWxlUHJvalJlbFxuICAgICAgKi9cbiAgICAgIHByb0RmaFByb2ZpbGVQcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMucHJvZmlsZVByb2pSZWxBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBQcm9EZmhQcm9maWxlUHJvalJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fZGZoX3Byb2ZpbGVfcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvRGZoUHJvZmlsZVByb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb0RmaFByb2ZpbGVQcm9qUmVsPj4oKG1ldGEpID0+IHRoaXMucHJvZmlsZVByb2pSZWxBcGlcbiAgICAgICAgLmJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19kZmhfcHJvZmlsZV9wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgKiBQcm9UZXh0UHJvcGVydHlcbiAgICAgICovXG4gICAgICBwcm9UZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBQcm9UZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYXMgPSByZXN1bHRzIGFzIGFueSBhcyBTY2hlbWFPYmplY3Q7XG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYXMsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9UZXh0UHJvcGVydHk+PigobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGlcbiAgICAgICAgLmJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYXMgPSByZXN1bHRzIGFzIGFueSBhcyBTY2hlbWFPYmplY3Q7XG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYXMsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZURlbGV0ZUVwaWMoKG1ldGEpID0+IHRoaXMudGV4dFByb3BlcnR5QXBpLmJ1bGtEZWxldGUobWV0YS5waywgbWV0YS5pdGVtcykpLFxuICAgICAgLyoqXG4gICAgICAqIFByb0FuYWx5c2lzXG4gICAgICAqL1xuICAgICAgLy8gcHJvQW5hbHlzaXNFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEJ5UGtBTnNWZXJzaW9uQWN0aW9uTWV0YT4oXG4gICAgICAvLyAgIChtZXRhKSA9PiB0aGlzLmFuYWx5c2lzQXBpLmFuYWx5c2lzQ29udHJvbGxlckdldFZlcnNpb24obWV0YS5waywgbWV0YS5wa0VudGl0eSwgbWV0YS52ZXJzaW9uKS5waXBlKG1hcCh4ID0+IFt4XSkpLFxuICAgICAgLy8gICBQcm9BbmFseXNpc0FjdGlvbkZhY3RvcnkuQllfUEtfQU5EX1ZFUlNJT04sXG4gICAgICAvLyAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgIC8vICAgICBmbGF0dGVuZXIuYW5hbHlzaXMuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgIC8vICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyApLFxuICAgICAgLy8gcHJvQW5hbHlzaXNFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb0FuYWx5c2lzPj4oXG4gICAgICAvLyAgIChtZXRhKSA9PiB0aGlzLmFuYWx5c2lzQXBpLmFuYWx5c2lzQ29udHJvbGxlckJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAvLyAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgLy8gICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAvLyAgICAgZmxhdHRlbmVyLmFuYWx5c2lzLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAvLyAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyApLFxuICAgICAgcHJvQW5hbHlzaXNFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYyhcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuYW5hbHlzaXNBcGkuYW5hbHlzaXNDb250cm9sbGVyQnVsa0RlbGV0ZShtZXRhLnBrLCBtZXRhLml0ZW1zLm1hcChpdGVtID0+IGl0ZW0ucGtfZW50aXR5KSksXG4gICAgICApLFxuICAgIClcbiAgfVxuICAvLyBwcml2YXRlIHN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYXM6IFNjaGVtYU9iamVjdCwgcGtQcm9qZWN0KSB7XG4gIC8vICAgaWYgKHNjaGVtYXMgJiYgT2JqZWN0LmtleXMoc2NoZW1hcykubGVuZ3RoID4gMCkge1xuICAvLyAgICAgT2JqZWN0LmtleXMoc2NoZW1hcykuZm9yRWFjaChzY2hlbWEgPT4ge1xuICAvLyAgICAgICBsZXQgYWN0aW9ucztcbiAgLy8gICAgICAgaWYgKHNjaGVtYSA9PT0gJ2luZicpIGFjdGlvbnMgPSB0aGlzLmluZkFjdGlvbnM7XG4gIC8vICAgICAgIGVsc2UgaWYgKHNjaGVtYSA9PT0gJ3BybycpIGFjdGlvbnMgPSB0aGlzLnByb0FjdGlvbnM7XG4gIC8vICAgICAgIGlmIChhY3Rpb25zKSB7XG4gIC8vICAgICAgICAgT2JqZWN0LmtleXMoc2NoZW1hc1tzY2hlbWFdKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgLy8gICAgICAgICAgIGFjdGlvbnNbbW9kZWxdLmxvYWRTdWNjZWVkZWQoc2NoZW1hc1tzY2hlbWFdW21vZGVsXSwgdW5kZWZpbmVkLCBwa1Byb2plY3QpO1xuICAvLyAgICAgICAgIH0pO1xuICAvLyAgICAgICB9XG4gIC8vICAgICB9KTtcbiAgLy8gICB9XG4gIC8vIH1cblxufVxuIl19