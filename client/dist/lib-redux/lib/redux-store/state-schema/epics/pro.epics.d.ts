import { ProClassFieldConfigApi, ProDfhClassProjRelApi, ProDfhProfileProjRelApi, ProInfoProjRelApi, ProProjectApi, ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService } from '@kleiolab/lib-sdk-lb4';
import { Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SchemaService } from '../services/schema.service';
export declare class ProEpics {
    notification: NotificationsAPIActions;
    infActions: InfActions;
    proActions: ProActions;
    datActions: DatActions;
    projectApi: ProProjectApi;
    infoProjRelApi: ProInfoProjRelApi;
    classProjRelApi: ProDfhClassProjRelApi;
    profileProjRelApi: ProDfhProfileProjRelApi;
    classFieldConfApi: ProClassFieldConfigApi;
    textPropertyApi: ProTextPropertyApi;
    analysisApi: AnalysisService;
    private schemaObjectService;
    constructor(notification: NotificationsAPIActions, infActions: InfActions, proActions: ProActions, datActions: DatActions, projectApi: ProProjectApi, infoProjRelApi: ProInfoProjRelApi, classProjRelApi: ProDfhClassProjRelApi, profileProjRelApi: ProDfhProfileProjRelApi, classFieldConfApi: ProClassFieldConfigApi, textPropertyApi: ProTextPropertyApi, analysisApi: AnalysisService, schemaObjectService: SchemaService);
    createEpics(): Epic;
}
