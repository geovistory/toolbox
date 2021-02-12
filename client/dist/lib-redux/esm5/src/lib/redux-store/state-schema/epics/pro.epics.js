/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/pro.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ProClassFieldConfigApi, ProDfhClassProjRelApi, ProDfhProfileProjRelApi, ProInfoProjRelApi, ProProjectApi, ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService } from '@kleiolab/lib-sdk-lb4/public-api';
import { combineEpics } from 'redux-observable-es6-compat';
import { DatActions, InfActions, ProActions, ProClassFieldConfigActionFactory, ProDfhClassProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProInfoProjRelActionFactory, ProProjectActionFactory, ProTextPropertyActionFactory } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { proRoot } from '../reducer-configs';
import { Flattener, SchemaEpicsFactory, SchemaObjectService, storeFlattened } from '../_helpers';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL3Byby5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF1QixzQkFBc0IsRUFBc0IscUJBQXFCLEVBQXdCLHVCQUF1QixFQUFrQixpQkFBaUIsRUFBYyxhQUFhLEVBQW1CLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDalIsT0FBTyxFQUFFLGVBQWUsRUFBZSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBcUMsVUFBVSxFQUFFLGdDQUFnQyxFQUFFLCtCQUErQixFQUFFLGlDQUFpQyxFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLDRCQUE0QixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTdSLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFvQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJbkk7SUFFRSxrQkFDUyxZQUFxQyxFQUNyQyxVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUF5QixFQUN6QixjQUFpQyxFQUNqQyxlQUFzQyxFQUN0QyxpQkFBMEMsRUFDMUMsaUJBQXlDLEVBQ3pDLGVBQW1DLEVBQ25DLFdBQTRCLEVBQzNCLG1CQUF3QztRQVh6QyxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFDckMsZUFBVSxH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QkFBdUI7Z0JBQWhILHNCQUFzQjtnQkFBMkssa0JBQWtCO2dCQUN4TyxlQUFlO2dCQU9rRCxtQkFBbUI7O0lBOE03RixlQUFDO0NBQUEsQUExTUQsSUEwTUM7U0F6TVksUUFBUTs7O0lBRWpCLGdDQUE0Qzs7SUFDNUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQWdDOztJQUNoQyxrQ0FBd0M7O0lBQ3hDLG1DQUE2Qzs7SUFDN0MscUNBQWlEOztJQUNqRCxxQ0FBZ0Q7O0lBQ2hELG1DQUEwQzs7SUFDMUMsK0JBQW1DOzs7OztJQUNuQyx1Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0RmaENsYXNzUHJvalJlbEFwaSwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpLCBQcm9JbmZvUHJvalJlbCwgUHJvSW5mb1Byb2pSZWxBcGksIFByb1Byb2plY3QsIFByb1Byb2plY3RBcGksIFByb1RleHRQcm9wZXJ0eSwgUHJvVGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEFuYWx5c2lzU2VydmljZSwgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQvcHVibGljLWFwaSc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucywgSW5mQWN0aW9ucywgTWFya1N0YXRlbWVudEFzRmF2b3JpdGVBY3Rpb25NZXRhLCBQcm9BY3Rpb25zLCBQcm9DbGFzc0ZpZWxkQ29uZmlnQWN0aW9uRmFjdG9yeSwgUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeSwgUHJvRGZoUHJvZmlsZVByb2pSZWxBY3Rpb25GYWN0b3J5LCBQcm9JbmZvUHJvalJlbEFjdGlvbkZhY3RvcnksIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5LCBQcm9UZXh0UHJvcGVydHlBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpc1NsaWNlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2UsIFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9Qcm9qZWN0U2xpY2UsIFByb1RleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgcHJvUm9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIExvYWRBY3Rpb25NZXRhLCBNb2RpZnlBY3Rpb25NZXRhLCBTY2hlbWFFcGljc0ZhY3RvcnksIFNjaGVtYU9iamVjdFNlcnZpY2UsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMnO1xuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb0VwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIHByb2plY3RBcGk6IFByb1Byb2plY3RBcGksXG4gICAgcHVibGljIGluZm9Qcm9qUmVsQXBpOiBQcm9JbmZvUHJvalJlbEFwaSxcbiAgICBwdWJsaWMgY2xhc3NQcm9qUmVsQXBpOiBQcm9EZmhDbGFzc1Byb2pSZWxBcGksXG4gICAgcHVibGljIHByb2ZpbGVQcm9qUmVsQXBpOiBQcm9EZmhQcm9maWxlUHJvalJlbEFwaSxcbiAgICBwdWJsaWMgY2xhc3NGaWVsZENvbmZBcGk6IFByb0NsYXNzRmllbGRDb25maWdBcGksXG4gICAgcHVibGljIHRleHRQcm9wZXJ0eUFwaTogUHJvVGV4dFByb3BlcnR5QXBpLFxuICAgIHB1YmxpYyBhbmFseXNpc0FwaTogQW5hbHlzaXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hT2JqZWN0U2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBwcm9Qcm9qZWN0RXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9Qcm9qZWN0U2xpY2UsIFByb1Byb2plY3Q+XG4gICAgICAocHJvUm9vdCwgJ3Byb2plY3QnLCB0aGlzLnByb0FjdGlvbnMucHJvamVjdCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvSW5mb1Byb2pSZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0luZm9Qcm9qUmVsU2xpY2UsIFByb0luZm9Qcm9qUmVsPlxuICAgICAgKHByb1Jvb3QsICdpbmZvX3Byb2pfcmVsJywgdGhpcy5wcm9BY3Rpb25zLmluZm9fcHJval9yZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0RmaENsYXNzUHJvalJlbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2UsIFByb0RmaENsYXNzUHJvalJlbD5cbiAgICAgIChwcm9Sb290LCAnZGZoX2NsYXNzX3Byb2pfcmVsJywgdGhpcy5wcm9BY3Rpb25zLmRmaF9jbGFzc19wcm9qX3JlbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvRGZoUHJvZmlsZVByb2pSZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2UsIFByb0RmaFByb2ZpbGVQcm9qUmVsPlxuICAgICAgKHByb1Jvb3QsICdkZmhfcHJvZmlsZV9wcm9qX3JlbCcsIHRoaXMucHJvQWN0aW9ucy5kZmhfcHJvZmlsZV9wcm9qX3JlbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvQ2xhc3NGaWVsZENvbmZpZ0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnPlxuICAgICAgKHByb1Jvb3QsICdjbGFzc19maWVsZF9jb25maWcnLCB0aGlzLnByb0FjdGlvbnMuY2xhc3NfZmllbGRfY29uZmlnLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9UZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb1RleHRQcm9wZXJ0eVNsaWNlLCBQcm9UZXh0UHJvcGVydHk+XG4gICAgICAocHJvUm9vdCwgJ3RleHRfcHJvcGVydHknLCB0aGlzLnByb0FjdGlvbnMudGV4dF9wcm9wZXJ0eSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvQW5hbHlzaXNFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0FuYWx5c2lzU2xpY2UsIFByb0FuYWx5c2lzPlxuICAgICAgKHByb1Jvb3QsICdhbmFseXNpcycsIHRoaXMucHJvQWN0aW9ucy5hbmFseXNpcywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG5cblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICAvKipcbiAgICAgICogUHJvUHJvamVjdFxuICAgICAgKi9cbiAgICAgIHByb1Byb2plY3RFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KChtZXRhKSA9PiB0aGlzLnByb2plY3RBcGlcbiAgICAgICAgLm9mQWNjb3VudChtZXRhLnBrKSxcbiAgICAgICAgUHJvUHJvamVjdEFjdGlvbkZhY3RvcnkuT0ZfQUNDT1VOVCxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fcHJvamVjdC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9Qcm9qZWN0RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9qZWN0QXBpXG4gICAgICAgIC5nZXRCYXNpY3MobWV0YS5wayksXG4gICAgICAgIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5LkxPQURfQkFTSUNTLFxuICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19wcm9qZWN0LmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogUHJvSW5mb1Byb2pSZWxcbiAgICAgICAqL1xuICAgICAgcHJvSW5mb1Byb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb0luZm9Qcm9qUmVsPj4oKG1ldGEpID0+IHRoaXMuaW5mb1Byb2pSZWxBcGlcbiAgICAgICAgLmJ1bGtVcGRhdGVFcHJBdHRyaWJ1dGVzKG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvSW5mb1Byb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TWFya1N0YXRlbWVudEFzRmF2b3JpdGVBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5pbmZvUHJvalJlbEFwaVxuICAgICAgICAubWFya1N0YXRlbWVudEFzRmF2b3JpdGUobWV0YS5waywgbWV0YS5wa1N0YXRlbWVudCwgbWV0YS5pc091dGdvaW5nKSxcbiAgICAgICAgUHJvSW5mb1Byb2pSZWxBY3Rpb25GYWN0b3J5Lk1BUktfUk9MRV9BU19GQVZPUklURSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuaW5mb19wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogUHJvQ2xhc3NGaWVsZENvbmZpZ1xuICAgICAgICovXG4gICAgICBwcm9DbGFzc0ZpZWxkQ29uZmlnRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY2xhc3NGaWVsZENvbmZBcGkub2ZQcm9qZWN0KG1ldGEucGspLFxuICAgICAgICBQcm9DbGFzc0ZpZWxkQ29uZmlnQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19jbGFzc19maWVsZF9jb25maWcuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvQ2xhc3NGaWVsZENvbmZpZ0VwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvQ2xhc3NGaWVsZENvbmZpZz4+KChtZXRhKSA9PiB0aGlzLmNsYXNzRmllbGRDb25mQXBpXG4gICAgICAgIC5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fY2xhc3NfZmllbGRfY29uZmlnLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAgKiBQcm9Qcm9EZmhDbGFzc1Byb2pSZWxcbiAgICAgICAqL1xuICAgICAgcHJvRGZoQ2xhc3NQcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY2xhc3NQcm9qUmVsQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgUHJvRGZoQ2xhc3NQcm9qUmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19kZmhfY2xhc3NfcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvRGZoQ2xhc3NQcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9EZmhDbGFzc1Byb2pSZWw+PigobWV0YSkgPT4gdGhpcy5jbGFzc1Byb2pSZWxBcGlcbiAgICAgICAgLmJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcyksXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19kZmhfY2xhc3NfcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICogUHJvRGZoUHJvZmlsZVByb2pSZWxcbiAgICAgICovXG4gICAgICBwcm9EZmhQcm9maWxlUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnByb2ZpbGVQcm9qUmVsQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgUHJvRGZoUHJvZmlsZVByb2pSZWxBY3Rpb25GYWN0b3J5Lk9GX1BST0pFQ1QsXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0RmaFByb2ZpbGVQcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9EZmhQcm9maWxlUHJvalJlbD4+KChtZXRhKSA9PiB0aGlzLnByb2ZpbGVQcm9qUmVsQXBpXG4gICAgICAgIC5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fZGZoX3Byb2ZpbGVfcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICogUHJvVGV4dFByb3BlcnR5XG4gICAgICAqL1xuICAgICAgcHJvVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMudGV4dFByb3BlcnR5QXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgUHJvVGV4dFByb3BlcnR5QWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFzID0gcmVzdWx0cyBhcyBhbnkgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFzLCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb1RleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvVGV4dFByb3BlcnR5Pj4oKG1ldGEpID0+IHRoaXMudGV4dFByb3BlcnR5QXBpXG4gICAgICAgIC5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFzID0gcmVzdWx0cyBhcyBhbnkgYXMgU2NoZW1hT2JqZWN0O1xuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFzLCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb1RleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVEZWxldGVFcGljKChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaS5idWxrRGVsZXRlKG1ldGEucGssIG1ldGEuaXRlbXMpKSxcbiAgICAgIC8qKlxuICAgICAgKiBQcm9BbmFseXNpc1xuICAgICAgKi9cbiAgICAgIC8vIHByb0FuYWx5c2lzRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRCeVBrQU5zVmVyc2lvbkFjdGlvbk1ldGE+KFxuICAgICAgLy8gICAobWV0YSkgPT4gdGhpcy5hbmFseXNpc0FwaS5hbmFseXNpc0NvbnRyb2xsZXJHZXRWZXJzaW9uKG1ldGEucGssIG1ldGEucGtFbnRpdHksIG1ldGEudmVyc2lvbikucGlwZShtYXAoeCA9PiBbeF0pKSxcbiAgICAgIC8vICAgUHJvQW5hbHlzaXNBY3Rpb25GYWN0b3J5LkJZX1BLX0FORF9WRVJTSU9OLFxuICAgICAgLy8gICAocmVzdWx0cykgPT4ge1xuICAgICAgLy8gICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAvLyAgICAgZmxhdHRlbmVyLmFuYWx5c2lzLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAvLyAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gKSxcbiAgICAgIC8vIHByb0FuYWx5c2lzRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9BbmFseXNpcz4+KFxuICAgICAgLy8gICAobWV0YSkgPT4gdGhpcy5hbmFseXNpc0FwaS5hbmFseXNpc0NvbnRyb2xsZXJCdWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgLy8gICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgIC8vICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgLy8gICAgIGZsYXR0ZW5lci5hbmFseXNpcy5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgLy8gICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gKSxcbiAgICAgIHByb0FuYWx5c2lzRXBpY3NGYWN0b3J5LmNyZWF0ZURlbGV0ZUVwaWMoXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmFuYWx5c2lzQXBpLmFuYWx5c2lzQ29udHJvbGxlckJ1bGtEZWxldGUobWV0YS5waywgbWV0YS5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnBrX2VudGl0eSkpLFxuICAgICAgKSxcbiAgICApXG4gIH1cbiAgLy8gcHJpdmF0ZSBzdG9yZVNjaGVtYU9iamVjdChzY2hlbWFzOiBTY2hlbWFPYmplY3QsIHBrUHJvamVjdCkge1xuICAvLyAgIGlmIChzY2hlbWFzICYmIE9iamVjdC5rZXlzKHNjaGVtYXMpLmxlbmd0aCA+IDApIHtcbiAgLy8gICAgIE9iamVjdC5rZXlzKHNjaGVtYXMpLmZvckVhY2goc2NoZW1hID0+IHtcbiAgLy8gICAgICAgbGV0IGFjdGlvbnM7XG4gIC8vICAgICAgIGlmIChzY2hlbWEgPT09ICdpbmYnKSBhY3Rpb25zID0gdGhpcy5pbmZBY3Rpb25zO1xuICAvLyAgICAgICBlbHNlIGlmIChzY2hlbWEgPT09ICdwcm8nKSBhY3Rpb25zID0gdGhpcy5wcm9BY3Rpb25zO1xuICAvLyAgICAgICBpZiAoYWN0aW9ucykge1xuICAvLyAgICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYXNbc2NoZW1hXSkuZm9yRWFjaChtb2RlbCA9PiB7XG4gIC8vICAgICAgICAgICBhY3Rpb25zW21vZGVsXS5sb2FkU3VjY2VlZGVkKHNjaGVtYXNbc2NoZW1hXVttb2RlbF0sIHVuZGVmaW5lZCwgcGtQcm9qZWN0KTtcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfSk7XG4gIC8vICAgfVxuICAvLyB9XG5cbn1cbiJdfQ==