import { Injectable } from '@angular/core';
import { ProClassFieldConfig, ProInfoProjRel, ProInfoProjRelApi } from 'app/core';
import { DatActions } from 'app/core/dat/dat.actions';
import { InfActions } from 'app/core/inf/inf.actions';
import { proRoot } from 'app/core/pro/pro.config';
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { ProClassFieldConfigApi, ProDfhClassProjRel, ProDfhClassProjRelApi, ProTextProperty, ProTextPropertyApi, ProProject, ProProjectApi, ProDfhProfileProjRel, ProDfhProfileProjRelApi } from '../sdk';
import { LoadActionMeta, ModifyActionMeta, LoadByPkANsVersionActionMeta } from '../store/actions';
import { StandardEpicsFactory } from '../store/StandardEpicsFactory';
import { ProActions, ProTextPropertyActionFactory, ProAnalysisActionFactory, ProProjectActionFactory, ProClassFieldConfigActionFactory, MarkStatementAsFavoriteActionMeta, ProInfoProjRelActionFactory, ProDfhProfileProjRelActionFactory, ProDfhClassProjRelActionFactory } from './pro.actions';
import { ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProInfoProjRelSlice, ProTextPropertySlice, ProAnalysisSlice, ProProjectSlice, ProDfhProfileProjRelSlice } from './pro.models';
import { SchemaObject } from '../store/model';
import { SchemaObjectService } from '../store/schema-object.service';
import { AnalysisService } from '../sdk-lb4/api/analysis.service';
import { map } from 'rxjs/operators';
import { ProAnalysis } from '../sdk-lb4/model/proAnalysis';


@Injectable()
export class ProEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public projectApi: ProProjectApi,
    public infoProjRelApi: ProInfoProjRelApi,
    public classProjRelApi: ProDfhClassProjRelApi,
    public profileProjRelApi: ProDfhProfileProjRelApi,
    public classFieldConfApi: ProClassFieldConfigApi,
    public textPropertyApi: ProTextPropertyApi,
    public analysisApi: AnalysisService,
    private schemaObjectService: SchemaObjectService
  ) { }

  public createEpics(): Epic {
    const proProjectEpicsFactory = new StandardEpicsFactory<ProProjectSlice, ProProject>
      (proRoot, 'project', this.proActions.project, this.notification);

    const proInfoProjRelEpicsFactory = new StandardEpicsFactory<ProInfoProjRelSlice, ProInfoProjRel>
      (proRoot, 'info_proj_rel', this.proActions.info_proj_rel, this.notification);

    const proDfhClassProjRelEpicsFactory = new StandardEpicsFactory<ProDfhClassProjRelSlice, ProDfhClassProjRel>
      (proRoot, 'dfh_class_proj_rel', this.proActions.dfh_class_proj_rel, this.notification);

    const proDfhProfileProjRelEpicsFactory = new StandardEpicsFactory<ProDfhProfileProjRelSlice, ProDfhProfileProjRel>
      (proRoot, 'dfh_profile_proj_rel', this.proActions.dfh_profile_proj_rel, this.notification);

    const proClassFieldConfigEpicsFactory = new StandardEpicsFactory<ProClassFieldConfigSlice, ProClassFieldConfig>
      (proRoot, 'class_field_config', this.proActions.class_field_config, this.notification);

    const proTextPropertyEpicsFactory = new StandardEpicsFactory<ProTextPropertySlice, ProTextProperty>
      (proRoot, 'text_property', this.proActions.text_property, this.notification);

    const proAnalysisEpicsFactory = new StandardEpicsFactory<ProAnalysisSlice, ProAnalysis>
      (proRoot, 'analysis', this.proActions.analysis, this.notification);



    return combineEpics(
      /**
      * ProProject
      */
      proProjectEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.projectApi
        .ofAccount(meta.pk),
        ProProjectActionFactory.OF_ACCOUNT,
        (results) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_project.flatten(results);
          storeFlattened(flattener.getFlattened());
        }
      ),
      proProjectEpicsFactory.createLoadEpic<LoadActionMeta>((meta) => this.projectApi
        .getBasics(meta.pk),
        ProProjectActionFactory.LOAD_BASICS,
        (results) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_project.flatten(results);
          storeFlattened(flattener.getFlattened());
        }
      ),
      /**
       * ProInfoProjRel
       */
      proInfoProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProInfoProjRel>>((meta) => this.infoProjRelApi
        .bulkUpdateEprAttributes(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.info_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      proInfoProjRelEpicsFactory.createLoadEpic<MarkStatementAsFavoriteActionMeta>((meta) => this.infoProjRelApi
        .markStatementAsFavorite(meta.pk, meta.pkStatement, meta.isOutgoing),
        ProInfoProjRelActionFactory.MARK_ROLE_AS_FAVORITE,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.info_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      /**
       * ProClassFieldConfig
       */
      proClassFieldConfigEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.classFieldConfApi.ofProject(meta.pk),
        ProClassFieldConfigActionFactory.OF_PROJECT,
        (results) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_class_field_config.flatten(results);
          storeFlattened(flattener.getFlattened());
        }
      ),
      proClassFieldConfigEpicsFactory.createUpsertEpic<ModifyActionMeta<ProClassFieldConfig>>((meta) => this.classFieldConfApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_class_field_config.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      /**
       * ProProDfhClassProjRel
       */
      proDfhClassProjRelEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.classProjRelApi.ofProject(meta.pk),
        ProDfhClassProjRelActionFactory.OF_PROJECT,
        (results) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_dfh_class_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened());
        }
      ),
      proDfhClassProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProDfhClassProjRel>>((meta) => this.classProjRelApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_dfh_class_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      /**
      * ProDfhProfileProjRel
      */
      proDfhProfileProjRelEpicsFactory.createLoadEpic<LoadActionMeta>(
        (meta) => this.profileProjRelApi.ofProject(meta.pk),
        ProDfhProfileProjRelActionFactory.OF_PROJECT,
        (results) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_dfh_profile_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened());
        }
      ),
      proDfhProfileProjRelEpicsFactory.createUpsertEpic<ModifyActionMeta<ProDfhProfileProjRel>>((meta) => this.profileProjRelApi
        .bulkUpsert(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.pro_dfh_profile_proj_rel.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
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
      proAnalysisEpicsFactory.createDeleteEpic(
        (meta) => this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map(item => item.pk_entity)),
      ),
    )
  }
  // private storeSchemaObject(schemas: SchemaObject, pkProject) {
  //   if (schemas && Object.keys(schemas).length > 0) {
  //     Object.keys(schemas).forEach(schema => {
  //       let actions;
  //       if (schema === 'inf') actions = this.infActions;
  //       else if (schema === 'pro') actions = this.proActions;
  //       if (actions) {
  //         Object.keys(schemas[schema]).forEach(model => {
  //           actions[model].loadSucceeded(schemas[schema][model], undefined, pkProject);
  //         });
  //       }
  //     });
  //   }
  // }

}
