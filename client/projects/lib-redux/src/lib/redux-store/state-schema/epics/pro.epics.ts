import { Injectable } from '@angular/core';
import { ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService, ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { ProActions } from '../actions/pro.actions';
import { ProAnalysisSlice } from '../models/pro.models';
import { proRoot } from '../reducer-configs/pro.config';
import { SchemaService } from '../services/schema.service';
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



    const proAnalysisEpicsFactory = new SchemaEpicsFactory<ProAnalysisSlice, ProAnalysis>
      (proRoot, 'analysis', this.proActions.analysis, this.notification);



    return combineEpics(

      /**
      * ProAnalysis
      */

      proAnalysisEpicsFactory.createDeleteEpic(
        (meta) => this.analysisApi.analysisControllerBulkDelete(meta.pk, meta.items.map(item => item.pk_entity)),
      ),
    )
  }
}
