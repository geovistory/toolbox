import { Injectable } from '@angular/core';
import { ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService, ProAnalysis, ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { SchemaObject } from '../../root/models/model';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { ProActions, ProTextPropertyActionFactory } from '../actions/pro.actions';
import { ProAnalysisSlice, ProTextPropertySlice } from '../models/pro.models';
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
    private textPropertyApi: ProTextPropertyApi,
    private analysisApi: AnalysisService,
    private schemaObjectService: SchemaService
  ) { }

  public createEpics(): Epic {


    const proTextPropertyEpicsFactory = new SchemaEpicsFactory<ProTextPropertySlice, ProTextProperty>
      (proRoot, 'text_property', this.proActions.text_property, this.notification);

    const proAnalysisEpicsFactory = new SchemaEpicsFactory<ProAnalysisSlice, ProAnalysis>
      (proRoot, 'analysis', this.proActions.analysis, this.notification);



    return combineEpics(

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
