import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { proRoot } from 'projects/app-toolbox/src/app/core/pro/pro.config';
import { Flattener, storeFlattened } from 'projects/app-toolbox/src/app/core/redux-store/flattener';
import { combineEpics } from 'redux-observable-es6-compat';
import { SchemaEpicsFactory } from '../redux-store/schema-epics-factory';
import { ProTextPropertyActionFactory, ProProjectActionFactory, ProClassFieldConfigActionFactory, ProInfoProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProDfhClassProjRelActionFactory } from './pro.actions';
let ProEpics = class ProEpics {
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
    createEpics() {
        const proProjectEpicsFactory = new SchemaEpicsFactory(proRoot, 'project', this.proActions.project, this.notification);
        const proInfoProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);
        const proDfhClassProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);
        const proDfhProfileProjRelEpicsFactory = new SchemaEpicsFactory(proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);
        const proClassFieldConfigEpicsFactory = new SchemaEpicsFactory(proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);
        const proTextPropertyEpicsFactory = new SchemaEpicsFactory(proRoot, 'text_property', this.proActions.text_property, this.notification);
        const proAnalysisEpicsFactory = new SchemaEpicsFactory(proRoot, 'analysis', this.proActions.analysis, this.notification);
        return combineEpics(
        /**
        * ProProject
        */
        proProjectEpicsFactory.createLoadEpic((meta) => this.projectApi
            .ofAccount(meta.pk), ProProjectActionFactory.OF_ACCOUNT, (results) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        }), proProjectEpicsFactory.createLoadEpic((meta) => this.projectApi
            .getBasics(meta.pk), ProProjectActionFactory.LOAD_BASICS, (results) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_project.flatten(results);
            storeFlattened(flattener.getFlattened());
        }), 
        /**
         * ProInfoProjRel
         */
        proInfoProjRelEpicsFactory.createUpsertEpic((meta) => this.infoProjRelApi
            .bulkUpdateEprAttributes(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), proInfoProjRelEpicsFactory.createLoadEpic((meta) => this.infoProjRelApi
            .markStatementAsFavorite(meta.pk, meta.pkStatement, meta.isOutgoing), ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE, (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.info_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), 
        /**
         * ProClassFieldConfig
         */
        proClassFieldConfigEpicsFactory.createLoadEpic((meta) => this.classFieldConfApi.ofProject(meta.pk), ProClassFieldConfigActionFactory.OF_PROJECT, (results) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened());
        }), proClassFieldConfigEpicsFactory.createUpsertEpic((meta) => this.classFieldConfApi
            .bulkUpsert(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_class_field_config.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), 
        /**
         * ProProDfhClassProjRel
         */
        proDfhClassProjRelEpicsFactory.createLoadEpic((meta) => this.classProjRelApi.ofProject(meta.pk), ProDfhClassProjRelActionFactory.OF_PROJECT, (results) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        }), proDfhClassProjRelEpicsFactory.createUpsertEpic((meta) => this.classProjRelApi
            .bulkUpsert(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_class_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), 
        /**
        * ProDfhProfileProjRel
        */
        proDfhProfileProjRelEpicsFactory.createLoadEpic((meta) => this.profileProjRelApi.ofProject(meta.pk), ProDfhProfileProjRelActionFactory.OF_PROJECT, (results) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened());
        }), proDfhProfileProjRelEpicsFactory.createUpsertEpic((meta) => this.profileProjRelApi
            .bulkUpsert(meta.pk, meta.items), (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.pro_dfh_profile_proj_rel.flatten(results);
            storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }), 
        /**
        * ProTextProperty
        */
        proTextPropertyEpicsFactory.createLoadEpic((meta) => this.textPropertyApi.ofProject(meta.pk), ProTextPropertyActionFactory.OF_PROJECT, (results, pk) => {
            const schemas = results;
            this.schemaObjectService.storeSchemaObject(schemas, pk);
        }), proTextPropertyEpicsFactory.createUpsertEpic((meta) => this.textPropertyApi
            .bulkUpsert(meta.pk, meta.items), (results, pk) => {
            const schemas = results;
            this.schemaObjectService.storeSchemaObject(schemas, pk);
        }), proTextPropertyEpicsFactory.createDeleteEpic((meta) => this.textPropertyApi.bulkDelete(meta.pk, meta.items)), 
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
        proAnalysisEpicsFactory.createDeleteEpic((meta) => this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map(item => item.pk_entity))));
    }
};
ProEpics = tslib_1.__decorate([
    Injectable()
], ProEpics);
export { ProEpics };
//# sourceMappingURL=pro.epics.js.map