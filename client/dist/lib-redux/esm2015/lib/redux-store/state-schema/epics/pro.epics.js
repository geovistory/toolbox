/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/pro.epics.ts
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
import * as i0 from "@angular/core";
import * as i1 from "../../state-gui/actions/notifications.actions";
import * as i2 from "../actions/inf.actions";
import * as i3 from "../actions/pro.actions";
import * as i4 from "../actions/dat.actions";
import * as i5 from "@kleiolab/lib-sdk-lb3";
import * as i6 from "@kleiolab/lib-sdk-lb4";
import * as i7 from "../services/schema-object.service";
export class ProEpics {
    /**
     * @param {?} notification
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} datActions
     * @param {?} projectApi
     * @param {?} infoProjRelApi
     * @param {?} classProjRelApi
     * @param {?} profileProjRelApi
     * @param {?} classFieldConfApi
     * @param {?} textPropertyApi
     * @param {?} analysisApi
     * @param {?} schemaObjectService
     */
    constructor(notification, infActions, proActions, datActions, projectApi, infoProjRelApi, classProjRelApi, profileProjRelApi, classFieldConfApi, textPropertyApi, analysisApi, schemaObjectService) {
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
    createEpics() {
        /** @type {?} */
        const proProjectEpicsFactory = new SchemaEpicsFactory(proRoot, 'project', this.proActions.project, this.notification);
        /** @type {?} */
        const proInfoProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);
        /** @type {?} */
        const proDfhClassProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);
        /** @type {?} */
        const proDfhProfileProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);
        /** @type {?} */
        const proClassFieldConfigEpicsFactory = new SchemaEpicsFactory(proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);
        /** @type {?} */
        const proTextPropertyEpicsFactory = new SchemaEpicsFactory(proRoot, 'text_property', this.proActions.text_property, this.notification);
        /** @type {?} */
        const proAnalysisEpicsFactory = new SchemaEpicsFactory(proRoot, 'analysis', this.proActions.analysis, this.notification);
        return combineEpics(
        /**
        * ProProject
        */
        proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.projectApi
            .ofAccount(meta.pk)), ProProjectActionFactory.OF_ACCOUNT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proProjectEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.projectApi
            .getBasics(meta.pk)), ProProjectActionFactory.LOAD_BASICS, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.infoProjRelApi
            .bulkUpdateEprAttributes(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        })), proInfoProjRelEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.infoProjRelApi
            .markStatementAsFavorite(meta.pk, meta.pkStatement, meta.isOutgoing)), ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.classFieldConfApi.ofProject(meta.pk)), ProClassFieldConfigActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proClassFieldConfigEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.classFieldConfApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.classProjRelApi.ofProject(meta.pk)), ProDfhClassProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhClassProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.classProjRelApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.profileProjRelApi.ofProject(meta.pk)), ProDfhProfileProjRelActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        })), proDfhProfileProjRelEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.profileProjRelApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
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
        (meta) => this.textPropertyApi.ofProject(meta.pk)), ProTextPropertyActionFactory.OF_PROJECT, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi
            .bulkUpsert(meta.pk, meta.items)), (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemas = (/** @type {?} */ ((/** @type {?} */ (results))));
            this.schemaObjectService.storeSchemaObject(schemas, pk);
        })), proTextPropertyEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.textPropertyApi.bulkDelete(meta.pk, meta.items))), 
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
        (meta) => this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.pk_entity))))));
    }
}
ProEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProEpics.ctorParameters = () => [
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
];
/** @nocollapse */ ProEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ProEpics_Factory() { return new ProEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.InfActions), i0.ɵɵinject(i3.ProActions), i0.ɵɵinject(i4.DatActions), i0.ɵɵinject(i5.ProProjectApi), i0.ɵɵinject(i5.ProInfoProjRelApi), i0.ɵɵinject(i5.ProDfhClassProjRelApi), i0.ɵɵinject(i5.ProDfhProfileProjRelApi), i0.ɵɵinject(i5.ProClassFieldConfigApi), i0.ɵɵinject(i5.ProTextPropertyApi), i0.ɵɵinject(i6.AnalysisService), i0.ɵɵinject(i7.SchemaObjectService)); }, token: ProEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvcHJvLmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVCLHNCQUFzQixFQUFzQixxQkFBcUIsRUFBd0IsdUJBQXVCLEVBQWtCLGlCQUFpQixFQUFjLGFBQWEsRUFBbUIsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqUixPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLDZCQUE2QixDQUFDO0FBRWpFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFxQyxVQUFVLEVBQUUsZ0NBQWdDLEVBQUUsK0JBQStCLEVBQUUsaUNBQWlDLEVBQUUsMkJBQTJCLEVBQUUsdUJBQXVCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqUixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7O0FBT3RFLE1BQU0sT0FBTyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7SUFDbkIsWUFDUyxZQUFxQyxFQUNyQyxV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Q0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUN6RyxDQUNGLENBQUE7SUFDSCxDQUFDOzs7WUE1TEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBZlEsdUJBQXVCO1lBRXZCLFVBQVU7WUFDeUIsVUFBVTtZQUY3QyxVQUFVO1lBTDRLLGFBQWE7WUFBNUMsaUJBQWlCO1lBQXZHLHFCQUFxQjtZQUF3Qix1QkFBdUI7WUFBaEgsc0JBQXNCO1lBQTJLLGtCQUFrQjtZQUN4TyxlQUFlO1lBU2YsbUJBQW1COzs7OztJQVl4QixnQ0FBNEM7O0lBQzVDLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUFnQzs7SUFDaEMsa0NBQXdDOztJQUN4QyxtQ0FBNkM7O0lBQzdDLHFDQUFpRDs7SUFDakQscUNBQWdEOztJQUNoRCxtQ0FBMEM7O0lBQzFDLCtCQUFtQzs7Ozs7SUFDbkMsdUNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvQ2xhc3NGaWVsZENvbmZpZ0FwaSwgUHJvRGZoQ2xhc3NQcm9qUmVsLCBQcm9EZmhDbGFzc1Byb2pSZWxBcGksIFByb0RmaFByb2ZpbGVQcm9qUmVsLCBQcm9EZmhQcm9maWxlUHJvalJlbEFwaSwgUHJvSW5mb1Byb2pSZWwsIFByb0luZm9Qcm9qUmVsQXBpLCBQcm9Qcm9qZWN0LCBQcm9Qcm9qZWN0QXBpLCBQcm9UZXh0UHJvcGVydHksIFByb1RleHRQcm9wZXJ0eUFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBBbmFseXNpc1NlcnZpY2UsIFByb0FuYWx5c2lzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBNYXJrU3RhdGVtZW50QXNGYXZvcml0ZUFjdGlvbk1ldGEsIFByb0FjdGlvbnMsIFByb0NsYXNzRmllbGRDb25maWdBY3Rpb25GYWN0b3J5LCBQcm9EZmhDbGFzc1Byb2pSZWxBY3Rpb25GYWN0b3J5LCBQcm9EZmhQcm9maWxlUHJvalJlbEFjdGlvbkZhY3RvcnksIFByb0luZm9Qcm9qUmVsQWN0aW9uRmFjdG9yeSwgUHJvUHJvamVjdEFjdGlvbkZhY3RvcnksIFByb1RleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FuYWx5c2lzU2xpY2UsIFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2UsIFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2UsIFByb0luZm9Qcm9qUmVsU2xpY2UsIFByb1Byb2plY3RTbGljZSwgUHJvVGV4dFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvcHJvLm1vZGVscyc7XG5pbXBvcnQgeyBwcm9Sb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL3Byby5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NjaGVtYS1vYmplY3Quc2VydmljZSc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMvZmxhdHRlbmVyJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhLCBNb2RpZnlBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcm9FcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9qZWN0QXBpOiBQcm9Qcm9qZWN0QXBpLFxuICAgIHB1YmxpYyBpbmZvUHJvalJlbEFwaTogUHJvSW5mb1Byb2pSZWxBcGksXG4gICAgcHVibGljIGNsYXNzUHJvalJlbEFwaTogUHJvRGZoQ2xhc3NQcm9qUmVsQXBpLFxuICAgIHB1YmxpYyBwcm9maWxlUHJvalJlbEFwaTogUHJvRGZoUHJvZmlsZVByb2pSZWxBcGksXG4gICAgcHVibGljIGNsYXNzRmllbGRDb25mQXBpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLFxuICAgIHB1YmxpYyB0ZXh0UHJvcGVydHlBcGk6IFByb1RleHRQcm9wZXJ0eUFwaSxcbiAgICBwdWJsaWMgYW5hbHlzaXNBcGk6IEFuYWx5c2lzU2VydmljZSxcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYU9iamVjdFNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgcHJvUHJvamVjdEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8UHJvUHJvamVjdFNsaWNlLCBQcm9Qcm9qZWN0PlxuICAgICAgKHByb1Jvb3QsICdwcm9qZWN0JywgdGhpcy5wcm9BY3Rpb25zLnByb2plY3QsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0luZm9Qcm9qUmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbD5cbiAgICAgIChwcm9Sb290LCAnaW5mb19wcm9qX3JlbCcsIHRoaXMucHJvQWN0aW9ucy5pbmZvX3Byb2pfcmVsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBwcm9EZmhDbGFzc1Byb2pSZWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWw+XG4gICAgICAocHJvUm9vdCwgJ2RmaF9jbGFzc19wcm9qX3JlbCcsIHRoaXMucHJvQWN0aW9ucy5kZmhfY2xhc3NfcHJval9yZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0RmaFByb2ZpbGVQcm9qUmVsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbD5cbiAgICAgIChwcm9Sb290LCAnZGZoX3Byb2ZpbGVfcHJval9yZWwnLCB0aGlzLnByb0FjdGlvbnMuZGZoX3Byb2ZpbGVfcHJval9yZWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0NsYXNzRmllbGRDb25maWdFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZz5cbiAgICAgIChwcm9Sb290LCAnY2xhc3NfZmllbGRfY29uZmlnJywgdGhpcy5wcm9BY3Rpb25zLmNsYXNzX2ZpZWxkX2NvbmZpZywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgcHJvVGV4dFByb3BlcnR5RXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9UZXh0UHJvcGVydHlTbGljZSwgUHJvVGV4dFByb3BlcnR5PlxuICAgICAgKHByb1Jvb3QsICd0ZXh0X3Byb3BlcnR5JywgdGhpcy5wcm9BY3Rpb25zLnRleHRfcHJvcGVydHksIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IHByb0FuYWx5c2lzRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxQcm9BbmFseXNpc1NsaWNlLCBQcm9BbmFseXNpcz5cbiAgICAgIChwcm9Sb290LCAnYW5hbHlzaXMnLCB0aGlzLnByb0FjdGlvbnMuYW5hbHlzaXMsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuXG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgLyoqXG4gICAgICAqIFByb1Byb2plY3RcbiAgICAgICovXG4gICAgICBwcm9Qcm9qZWN0RXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPigobWV0YSkgPT4gdGhpcy5wcm9qZWN0QXBpXG4gICAgICAgIC5vZkFjY291bnQobWV0YS5wayksXG4gICAgICAgIFByb1Byb2plY3RBY3Rpb25GYWN0b3J5Lk9GX0FDQ09VTlQsXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX3Byb2plY3QuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCkpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcHJvUHJvamVjdEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMucHJvamVjdEFwaVxuICAgICAgICAuZ2V0QmFzaWNzKG1ldGEucGspLFxuICAgICAgICBQcm9Qcm9qZWN0QWN0aW9uRmFjdG9yeS5MT0FEX0JBU0lDUyxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fcHJvamVjdC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIFByb0luZm9Qcm9qUmVsXG4gICAgICAgKi9cbiAgICAgIHByb0luZm9Qcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxQcm9JbmZvUHJvalJlbD4+KChtZXRhKSA9PiB0aGlzLmluZm9Qcm9qUmVsQXBpXG4gICAgICAgIC5idWxrVXBkYXRlRXByQXR0cmlidXRlcyhtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuaW5mb19wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0luZm9Qcm9qUmVsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPE1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlQWN0aW9uTWV0YT4oKG1ldGEpID0+IHRoaXMuaW5mb1Byb2pSZWxBcGlcbiAgICAgICAgLm1hcmtTdGF0ZW1lbnRBc0Zhdm9yaXRlKG1ldGEucGssIG1ldGEucGtTdGF0ZW1lbnQsIG1ldGEuaXNPdXRnb2luZyksXG4gICAgICAgIFByb0luZm9Qcm9qUmVsQWN0aW9uRmFjdG9yeS5NQVJLX1JPTEVfQVNfRkFWT1JJVEUsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLmluZm9fcHJval9yZWwuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKipcbiAgICAgICAqIFByb0NsYXNzRmllbGRDb25maWdcbiAgICAgICAqL1xuICAgICAgcHJvQ2xhc3NGaWVsZENvbmZpZ0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNsYXNzRmllbGRDb25mQXBpLm9mUHJvamVjdChtZXRhLnBrKSxcbiAgICAgICAgUHJvQ2xhc3NGaWVsZENvbmZpZ0FjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fY2xhc3NfZmllbGRfY29uZmlnLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0NsYXNzRmllbGRDb25maWdFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb0NsYXNzRmllbGRDb25maWc+PigobWV0YSkgPT4gdGhpcy5jbGFzc0ZpZWxkQ29uZkFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2NsYXNzX2ZpZWxkX2NvbmZpZy5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGssICdVUFNFUlQnKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qKlxuICAgICAgICogUHJvUHJvRGZoQ2xhc3NQcm9qUmVsXG4gICAgICAgKi9cbiAgICAgIHByb0RmaENsYXNzUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNsYXNzUHJvalJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb0RmaENsYXNzUHJvalJlbEFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fZGZoX2NsYXNzX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpKTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHByb0RmaENsYXNzUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvRGZoQ2xhc3NQcm9qUmVsPj4oKG1ldGEpID0+IHRoaXMuY2xhc3NQcm9qUmVsQXBpXG4gICAgICAgIC5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5wcm9fZGZoX2NsYXNzX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIFByb0RmaFByb2ZpbGVQcm9qUmVsXG4gICAgICAqL1xuICAgICAgcHJvRGZoUHJvZmlsZVByb2pSZWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5wcm9maWxlUHJvalJlbEFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb0RmaFByb2ZpbGVQcm9qUmVsQWN0aW9uRmFjdG9yeS5PRl9QUk9KRUNULFxuICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLnByb19kZmhfcHJvZmlsZV9wcm9qX3JlbC5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9EZmhQcm9maWxlUHJvalJlbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvRGZoUHJvZmlsZVByb2pSZWw+PigobWV0YSkgPT4gdGhpcy5wcm9maWxlUHJvalJlbEFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIucHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwaywgJ1VQU0VSVCcpO1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyoqXG4gICAgICAqIFByb1RleHRQcm9wZXJ0eVxuICAgICAgKi9cbiAgICAgIHByb1RleHRQcm9wZXJ0eUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaS5vZlByb2plY3QobWV0YS5wayksXG4gICAgICAgIFByb1RleHRQcm9wZXJ0eUFjdGlvbkZhY3RvcnkuT0ZfUFJPSkVDVCxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hcywgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9UZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPFByb1RleHRQcm9wZXJ0eT4+KChtZXRhKSA9PiB0aGlzLnRleHRQcm9wZXJ0eUFwaVxuICAgICAgICAuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hcyA9IHJlc3VsdHMgYXMgYW55IGFzIFNjaGVtYU9iamVjdDtcbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hcywgcGspXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwcm9UZXh0UHJvcGVydHlFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYygobWV0YSkgPT4gdGhpcy50ZXh0UHJvcGVydHlBcGkuYnVsa0RlbGV0ZShtZXRhLnBrLCBtZXRhLml0ZW1zKSksXG4gICAgICAvKipcbiAgICAgICogUHJvQW5hbHlzaXNcbiAgICAgICovXG4gICAgICAvLyBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQnlQa0FOc1ZlcnNpb25BY3Rpb25NZXRhPihcbiAgICAgIC8vICAgKG1ldGEpID0+IHRoaXMuYW5hbHlzaXNBcGkuYW5hbHlzaXNDb250cm9sbGVyR2V0VmVyc2lvbihtZXRhLnBrLCBtZXRhLnBrRW50aXR5LCBtZXRhLnZlcnNpb24pLnBpcGUobWFwKHggPT4gW3hdKSksXG4gICAgICAvLyAgIFByb0FuYWx5c2lzQWN0aW9uRmFjdG9yeS5CWV9QS19BTkRfVkVSU0lPTixcbiAgICAgIC8vICAgKHJlc3VsdHMpID0+IHtcbiAgICAgIC8vICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgLy8gICAgIGZsYXR0ZW5lci5hbmFseXNpcy5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgLy8gICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICksXG4gICAgICAvLyBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8UHJvQW5hbHlzaXM+PihcbiAgICAgIC8vICAgKG1ldGEpID0+IHRoaXMuYW5hbHlzaXNBcGkuYW5hbHlzaXNDb250cm9sbGVyQnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKSxcbiAgICAgIC8vICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgIC8vICAgICBmbGF0dGVuZXIuYW5hbHlzaXMuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgIC8vICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrLCAnVVBTRVJUJyk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICksXG4gICAgICBwcm9BbmFseXNpc0VwaWNzRmFjdG9yeS5jcmVhdGVEZWxldGVFcGljKFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5hbmFseXNpc0FwaS5hbmFseXNpc0NvbnRyb2xsZXJCdWxrRGVsZXRlKG1ldGEucGssIG1ldGEuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5wa19lbnRpdHkpKSxcbiAgICAgICksXG4gICAgKVxuICB9XG4gIC8vIHByaXZhdGUgc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hczogU2NoZW1hT2JqZWN0LCBwa1Byb2plY3QpIHtcbiAgLy8gICBpZiAoc2NoZW1hcyAmJiBPYmplY3Qua2V5cyhzY2hlbWFzKS5sZW5ndGggPiAwKSB7XG4gIC8vICAgICBPYmplY3Qua2V5cyhzY2hlbWFzKS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gIC8vICAgICAgIGxldCBhY3Rpb25zO1xuICAvLyAgICAgICBpZiAoc2NoZW1hID09PSAnaW5mJykgYWN0aW9ucyA9IHRoaXMuaW5mQWN0aW9ucztcbiAgLy8gICAgICAgZWxzZSBpZiAoc2NoZW1hID09PSAncHJvJykgYWN0aW9ucyA9IHRoaXMucHJvQWN0aW9ucztcbiAgLy8gICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgLy8gICAgICAgICBPYmplY3Qua2V5cyhzY2hlbWFzW3NjaGVtYV0pLmZvckVhY2gobW9kZWwgPT4ge1xuICAvLyAgICAgICAgICAgYWN0aW9uc1ttb2RlbF0ubG9hZFN1Y2NlZWRlZChzY2hlbWFzW3NjaGVtYV1bbW9kZWxdLCB1bmRlZmluZWQsIHBrUHJvamVjdCk7XG4gIC8vICAgICAgICAgfSk7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cbiAgLy8gfVxuXG59XG4iXX0=