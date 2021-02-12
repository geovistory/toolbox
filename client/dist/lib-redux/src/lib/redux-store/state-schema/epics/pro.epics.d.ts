import { ProClassFieldConfigApi, ProDfhClassProjRelApi, ProDfhProfileProjRelApi, ProInfoProjRelApi, ProProjectApi, ProTextPropertyApi } from '@kleiolab/lib-sdk-lb3';
import { AnalysisService } from '@kleiolab/lib-sdk-lb4/public-api';
import { Epic } from 'redux-observable-es6-compat';
import { DatActions, InfActions, ProActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { SchemaObjectService } from '../_helpers';
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
    constructor(notification: NotificationsAPIActions, infActions: InfActions, proActions: ProActions, datActions: DatActions, projectApi: ProProjectApi, infoProjRelApi: ProInfoProjRelApi, classProjRelApi: ProDfhClassProjRelApi, profileProjRelApi: ProDfhProfileProjRelApi, classFieldConfApi: ProClassFieldConfigApi, textPropertyApi: ProTextPropertyApi, analysisApi: AnalysisService, schemaObjectService: SchemaObjectService);
    createEpics(): Epic;
}
