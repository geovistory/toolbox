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
import { SchemaObjectService } from '../services/schema-object.service';
import { Flattener, storeFlattened } from '../_helpers/flattener';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
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
        { type: Injectable }
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
        { type: SchemaObjectService }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3Byby5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF1QixzQkFBc0IsRUFBc0IscUJBQXFCLEVBQXdCLHVCQUF1QixFQUFrQixpQkFBaUIsRUFBYyxhQUFhLEVBQW1CLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDalIsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBcUMsVUFBVSxFQUFFLGdDQUFnQyxFQUFFLCtCQUErQixFQUFFLGlDQUFpQyxFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLDRCQUE0QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFalIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJdEU7SUFFRSxrQkFDUyxZQUFxQyxFQUNyQyxVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0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ekcsQ0FDRixDQUFBO0lBQ0gsQ0FBQzs7Z0JBMUxGLFVBQVU7Ozs7Z0JBYkYsdUJBQXVCO2dCQUV2QixVQUFVO2dCQUN5QixVQUFVO2dCQUY3QyxVQUFVO2dCQUw0SyxhQUFhO2dCQUE1QyxpQkFBaUI7Z0JBQXZHLHFCQUFxQjtnQkFBd0IsdUJBQXVCO2dCQUFoSCxzQkFBc0I7Z0JBQTJLLGtCQUFrQjtnQkFDeE8sZUFBZTtnQkFTZixtQkFBbUI7O0lBaU41QixlQUFDO0NBQUEsQUExTUQsSUEwTUM7U0F6TVksUUFBUTs7O0lBRWpCLGdDQUE0Qzs7SUFDNUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQWdDOztJQUNoQyxrQ0FBd0M7O0lBQ3hDLG1DQUE2Qzs7SUFDN0MscUNBQWlEOztJQUNqRCxxQ0FBZ0Q7O0lBQ2hELG1DQUEwQzs7SUFDMUMsK0JBQW1DOzs7OztJQUNuQyx1Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0RmaENsYXNzUHJvalJlbEFwaSwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpLCBQcm9JbmZvUHJvalJlbCwgUHJvSW5mb1Byb2pSZWxBcGksIFByb1Byb2plY3QsIFByb1Byb2plY3RBcGksIFByb1RleHRQcm9wZXJ0eSwgUHJvVGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEFuYWx5c2lzU2VydmljZSwgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IE1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlQWN0aW9uTWV0YSwgUHJvQWN0aW9ucywgUHJvQ2xhc3NGaWVsZENvbmZpZ0FjdGlvbkZhY3RvcnksIFByb0RmaENsYXNzUHJvalJlbEFjdGlvbkZhY3RvcnksIFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeSwgUHJvSW5mb1Byb2pSZWxBY3Rpb25GYWN0b3J5LCBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeSwgUHJvVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXNTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvUHJvamVjdFNsaWNlLCBQcm9UZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9wcm8ubW9kZWxzJztcbmltcG9ydCB7IHByb1Jvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvcHJvLmNvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLW9iamVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IEZsYXR0ZW5lciwgc3RvcmVGbGF0dGVuZWQgfSBmcm9tICcuLi9faGVscGVycy9mbGF0dGVuZXInO1xuaW1wb3J0IHsgTW9kaWZ5QWN0aW9uTWV0YSwgTG9hZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1lcGljcy1mYWN0b3J5JztcblxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9FcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9qZWN0QXBpOiBQcm9Qcm9qZWN0QXBpLFxuICAgIHB1YmxpYyBpbmZvUHJvalJlbEFwaTogUHJvSW5mb1Byb2pSZWxBcGksXG4gICAgcHVibGljIGNsYXNzUHJvalJlbEFwaTogUHJvRGZoQ2xhc3NQcm9qUmVsQXBpLFxuICAgIHB1YmxpYyBwcm9maWxlUHJvalJlbEFwaTogUHJvRGZoUHJvZmlsZVByb2pSZWxBcGksXG4gICAgcHVibGljIGNsYXNzRmllbGRDb25mQXBpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLFxuICAgIHB1YmxpYyB0ZXh0UHJvcGVydHlBcGk6IFByb1RleHRQcm9wZXJ0eUFwaSxcbiAgICBwdWJsaWMgYW5hbHlzaXNBcGk6IEFuYWx5c2lzU2VydmljZSxcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYU9iamVjdFNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgcHJvUHJvamVjdEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvUHJvamVjdFNsaWNlLCBQcm9Qcm9qZWN0PlxuICAgICAgKHByb1Jvb3QsICdwcm9qZWN0JywgdGhpcy5wcm9BY3Rpb25zLnByb2plY3QsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0luZm9Qcm9qUmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbD5cbiAgICAgIChwcm9Sb290LCAnaW5mb19wcm9qX3JlbCcsIHRoaXMucHJvQWN0aW9ucy5pbmZvX3Byb2pfcmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9EZmhDbGFzc1Byb2pSZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWw+XG4gICAgICAocHJvUm9vdCwgJ2RmaF9jbGFzc19wcm9qX3JlbCcsIHRoaXMucHJvQWN0aW9ucy5kZmhfY2xhc3NfcHJval9yZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0RmaFByb2ZpbGVQcm9qUmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbD5cbiAgICAgIChwcm9Sb290LCAnZGZoX3Byb2ZpbGVfcHJval9yZWwnLCB0aGlzLnByb0FjdGlvbnMuZGZoX3Byb2ZpbGVfcHJval9yZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0NsYXNzRmllbGRDb25maWdFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZz5cbiAgICAgIChwcm9Sb290LCAnY2xhc3NfZmllbGRfY29uZmlnJywgdGhpcy5wcm9BY3Rpb25zLmNsYXNzX2ZpZWxkX2NvbmZpZywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9UZXh0UHJvcGVydHlTbGljZSwgUHJvVGV4dFByb3BlcnR5PlxuICAgICAgKHByb1Jvb3QsICd0ZXh0X3Byb3BlcnR5JywgdGhpcy5wcm9BY3Rpb25zLnRleHRfcHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0FuYWx5c2lzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9BbmFseXNpc1NsaWNlLCBQcm9BbmFseXNpcz5cbiAgICAgIChwcm9Sb290LCAnYW5hbHlzaXMnLCB0aGlzLnByb0FjdGlvbnMuYW5hbHlzaXMsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuXG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLyoqXG4gICAgICAqIFByb1Byb2plY3RcbiAgICAgICovXG4gICAgICBwcm9Qcm9qZWN0RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9qZWN0QXBpXG4gICAgICAgIC5vZkFjY291bnQobWV0YS5wayksXG4gICAgICAgIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5Lk9GX0FDQ09VTlQsXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX3Byb2plY3QuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvUHJvamVjdEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvamVjdEFwaVxuICAgICAgICAuZ2V0QmFzaWNzKG1ldGEucGspLFxuICAgICAgICBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeS5MT0FEX0JBU0lDUyxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fcHJvamVjdC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIFByb0luZm9Qcm9qUmVsXG4gICAgICAgKi9cbiAgICAgIHByb0luZm9Qcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9JbmZvUHJvalJlbD4+KChtZXRhKSA9PiB0aGlzLmluZm9Qcm9qUmVsQXBpXG4gICAgICAgIC5idWxrVXBkYXRlRXByQXR0cmlidXRlcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuaW5mb19wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0luZm9Qcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPE1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMuaW5mb1Byb2pSZWxBcGlcbiAgICAgICAgLm1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlKG1ldGEucGssIG1ldGEucGtTdGF0ZW1lbnQsIG1ldGEuaXNPdXRnb2luZyksXG4gICAgICAgIFByb0luZm9Qcm9qUmVsQWN0aW9uRmFjdG9yeS5NQVJLX1JPTEVfQVNfRkFWT1JJVEUsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLmluZm9fcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIFByb0NsYXNzRmllbGRDb25maWdcbiAgICAgICAqL1xuICAgICAgcHJvQ2xhc3NGaWVsZENvbmZpZ0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNsYXNzRmllbGRDb25mQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgUHJvQ2xhc3NGaWVsZENvbmZpZ0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fY2xhc3NfZmllbGRfY29uZmlnLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0NsYXNzRmllbGRDb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb0NsYXNzRmllbGRDb25maWc+PigobWV0YSkgPT4gdGhpcy5jbGFzc0ZpZWxkQ29uZkFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2NsYXNzX2ZpZWxkX2NvbmZpZy5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogUHJvUHJvRGZoQ2xhc3NQcm9qUmVsXG4gICAgICAgKi9cbiAgICAgIHByb0RmaENsYXNzUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNsYXNzUHJvalJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb0RmaENsYXNzUHJvalJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fZGZoX2NsYXNzX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0RmaENsYXNzUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvRGZoQ2xhc3NQcm9qUmVsPj4oKG1ldGEpID0+IHRoaXMuY2xhc3NQcm9qUmVsQXBpXG4gICAgICAgIC5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fZGZoX2NsYXNzX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIFByb0RmaFByb2ZpbGVQcm9qUmVsXG4gICAgICAqL1xuICAgICAgcHJvRGZoUHJvZmlsZVByb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5wcm9maWxlUHJvalJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19kZmhfcHJvZmlsZV9wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9EZmhQcm9maWxlUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvRGZoUHJvZmlsZVByb2pSZWw+PigobWV0YSkgPT4gdGhpcy5wcm9maWxlUHJvalJlbEFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIFByb1RleHRQcm9wZXJ0eVxuICAgICAgKi9cbiAgICAgIHByb1RleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb1RleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hcywgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9UZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb1RleHRQcm9wZXJ0eT4+KChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hcywgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9UZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYygobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGkuYnVsa0RlbGV0ZShtZXRhLnBrLCBtZXRhLml0ZW1zKSksXG4gICAgICAvKipcbiAgICAgICogUHJvQW5hbHlzaXNcbiAgICAgICovXG4gICAgICAvLyBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa0FOc1ZlcnNpb25BY3Rpb25NZXRhPihcbiAgICAgIC8vICAgKG1ldGEpID0+IHRoaXMuYW5hbHlzaXNBcGkuYW5hbHlzaXNDb250cm9sbGVyR2V0VmVyc2lvbihtZXRhLnBrLCBtZXRhLnBrRW50aXR5LCBtZXRhLnZlcnNpb24pLnBpcGUobWFwKHggPT4gW3hdKSksXG4gICAgICAvLyAgIFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeS5CWV9QS19BTkRfVkVSU0lPTixcbiAgICAgIC8vICAgKHJlc3VsdHMpID0+IHtcbiAgICAgIC8vICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgLy8gICAgIGZsYXR0ZW5lci5hbmFseXNpcy5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgLy8gICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICksXG4gICAgICAvLyBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvQW5hbHlzaXM+PihcbiAgICAgIC8vICAgKG1ldGEpID0+IHRoaXMuYW5hbHlzaXNBcGkuYW5hbHlzaXNDb250cm9sbGVyQnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgIC8vICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgIC8vICAgICBmbGF0dGVuZXIuYW5hbHlzaXMuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgIC8vICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICksXG4gICAgICBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeS5jcmVhdGVEZWxldGVFcGljKFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5hbmFseXNpc0FwaS5hbmFseXNpc0NvbnRyb2xsZXJCdWxrRGVsZXRlKG1ldGEucGssIG1ldGEuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5wa19lbnRpdHkpKSxcbiAgICAgICksXG4gICAgKVxuICB9XG4gIC8vIHByaXZhdGUgc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hczogU2NoZW1hT2JqZWN0LCBwa1Byb2plY3QpIHtcbiAgLy8gICBpZiAoc2NoZW1hcyAmJiBPYmplY3Qua2V5cyhzY2hlbWFzKS5sZW5ndGggPiAwKSB7XG4gIC8vICAgICBPYmplY3Qua2V5cyhzY2hlbWFzKS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gIC8vICAgICAgIGxldCBhY3Rpb25zO1xuICAvLyAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgLy8gICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgLy8gICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgLy8gICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWFzW3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAvLyAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChzY2hlbWFzW3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gIC8vICAgICAgICAgfSk7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cbiAgLy8gfVxuXG59XG4iXX0=