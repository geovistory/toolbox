import { Injectable } from '@angular/core';
import { ProClassFieldConfigApi, ProDfhClassProjRelApi, ProDfhProfileProjRelApi, ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService, GvPositiveSchemaObject, ProAnalysis, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { SchemaObject } from '../../root/models/model';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { ProActions, ProClassFieldConfigActionFactory, ProDfhClassProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProTextPropertyActionFactory } from '../actions/pro.actions';
import { ProAnalysisSlice, ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProDfhProfileProjRelSlice, ProTextPropertySlice } from '../models/pro.models';
import { proRoot } from '../reducer-configs/pro.config';
import { SchemaService } from '../services/schema.service';
import { LoadActionMeta, ModifyActionMeta } from '../_helpers/schema-actions-factory';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';



@Injectable({
  providedIn: 'root'
})
export class ProEpics {
  constructor(
    public notification: NotificationsAPIActions,
    private proActions: ProActions,
    private classProjRelApi: ProDfhClassProjRelApi,
    private profileProjRelApi: ProDfhProfileProjRelApi,
    private classFieldConfApi: ProClassFieldConfigApi,
    private textPropertyApi: ProTextPropertyApi,
    private analysisApi: AnalysisService,
    private schemaObjectService: SchemaService
  ) { }

  public createEpics(): Epic {


    const proDfhClassProjRelEpicsFactory = new SchemaEpicsFactory<ProDfhClassProjRelSlice, ProDfhClassProjRel>
      (proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);

    const proDfhProfileProjRelEpicsFactory = new SchemaEpicsFactory<ProDfhProfileProjRelSlice, ProDfhProfileProjRel>
      (proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);

    const proClassFieldConfigEpicsFactory = new SchemaEpicsFactory<ProClassFieldConfigSlice, ProClassFieldConfig>
      (proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);

    const proTextPropertyEpicsFactory = new SchemaEpicsFactory<ProTextPropertySlice, ProTextProperty>
      (proRoot, 'text_property', this.proActions.text_property, this.notification);

    const proAnalysisEpicsFactory = new SchemaEpicsFactory<ProAnalysisSlice, ProAnalysis>
      (proRoot, 'analysis', this.proActions.analysis, this.notification);



    return combineEpics(



      /**
       * ProClassFieldConfig
       */
      proClassFieldConfigEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.classFieldConfApi.ofProject(meta.pk),
        ProClassFieldConfigActionFactory.OF_PROJECT,
        (results, pk) => {
          const o: GvPositiveSchemaObject = { pro: { class_field_config: results } }
          this.schemaObjectService.storeSchemaObjectGv(o, pk)
        }
      ),
      proClassFieldConfigEpicsFactory.createUpsertEpic<ModifyActionMeta<ProClassFieldConfig>>((meta) => this.classFieldConfApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const o: GvPositiveSchemaObject = { pro: { class_field_config: results } }
          this.schemaObjectService.storeSchemaObjectGv(o, pk)
        }
      ),
      /**
       * ProProDfhClassProjRel
       */
      proDfhClassProjRelEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.classProjRelApi.ofProject(meta.pk),
        ProDfhClassProjRelActionFactory.OF_PROJECT,
        (results, pk) => {
          const o: GvPositiveSchemaObject = { pro: { dfh_class_proj_rel: results } }
          this.schemaObjectService.storeSchemaObjectGv(o, pk)
        }
      ),
      proDfhClassProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProDfhClassProjRel>>((meta) => this.classProjRelApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const o: GvPositiveSchemaObject = { pro: { dfh_class_proj_rel: results } }
          this.schemaObjectService.storeSchemaObjectGv(o, pk)
        }
      ),
      /**
      * ProDfhProfileProjRel
      */
      proDfhProfileProjRelEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.profileProjRelApi.ofProject(meta.pk),
        ProDfhProfileProjRelActionFactory.OF_PROJECT,
        (results, pk) => {
          const o: GvPositiveSchemaObject = { pro: { dfh_profile_proj_rel: results } }
          this.schemaObjectService.storeSchemaObjectGv(o, pk)
        }
      ),
      proDfhProfileProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProDfhProfileProjRel>>((meta) => this.profileProjRelApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const o: GvPositiveSchemaObject = { pro: { dfh_profile_proj_rel: results } }
          this.schemaObjectService.storeSchemaObjectGv(o, pk)
        }
      ),
      /**
      * ProTextProperty
      */
      proTextPropertyEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.textPropertyApi.ofProject(meta.pk),
        ProTextPropertyActionFactory.OF_PROJECT,
        (results, pk) => {
          const schemas = results as any as SchemaObject;
          this.schemaObjectService.storeSchemaObject(schemas, pk)
        }
      ),
      proTextPropertyEpicsFactory.createUpsertEpic<ModifyActionMeta<ProTextProperty>>((meta) => this.textPropertyApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const schemas = results as any as SchemaObject;
          this.schemaObjectService.storeSchemaObject(schemas, pk)
        }
      ),
      proTextPropertyEpicsFactory.createDeleteEpic((meta) => this.textPropertyApi.bulkDelete(meta.pk, meta.items)),
      /**
      * ProAnalysis
      */

      proAnalysisEpicsFactory.createDeleteEpic(
        (meta) => this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map(item => item.pk_entity)),
      ),
    )
  }
}
