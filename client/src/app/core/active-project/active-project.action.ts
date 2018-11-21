import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ProjectCrm, ProjectDetail } from './active-project.models';
import { DataUnitPreview } from '../state/models';



interface MetaData {
    pk_project?: number;
    pk_entity?: number;
    pk_ui_context?: number;
    dataUnitPreview?: DataUnitPreview;
};
type Payload = ProjectDetail;
export type ActiveProjectAction = FluxStandardAction<Payload, MetaData>;


@Injectable()
export class ActiveProjectActions {
    static LOAD_PROJECT = 'ActiveProject::LOAD_PROJECT';
    static LOAD_PROJECT_FAILED = 'ActiveProject::LOAD_PROJECT_FAILED';
    static ACTIVE_PROJECT_UPDATED = 'ActiveProject::ACTIVE_PROJECT_UPDATED';

    static PROJECT_LOAD_CRM = 'ActiveProject::PROJECT_LOAD_CRM';
    static PROJECT_CRM_LOADED = 'ActiveProject::PROJECT_CRM_LOADED';

    static LOAD_DATA_UNIT_PREVIEW = 'ActiveProject::LOAD_DATA_UNIT_PREVIEW';
    static LOAD_DATA_UNIT_PREVIEW_SUCCEEDED = 'ActiveProject::LOAD_DATA_UNIT_PREVIEW_SUCCEEDED';
    static LOAD_DATA_UNIT_PREVIEW_FAILED = 'ActiveProject::LOAD_DATA_UNIT_PREVIEW_FAILED';


    loadProject(pk_project: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_PROJECT,
            payload: null,
            meta: {
                pk_project
            }
        }
    }

    activeProjectLoadCrm(pk_project: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.PROJECT_LOAD_CRM,
            payload: null,
            meta: {
                pk_project
            },
        }
    }

    activeProjectUpdated(payload: Payload): ActiveProjectAction {
        return {
            type: ActiveProjectActions.ACTIVE_PROJECT_UPDATED,
            payload,
            meta: null,
        }
    }

    projectCrmLoaded(crm: ProjectCrm): ActiveProjectAction {
        return {
            type: ActiveProjectActions.PROJECT_CRM_LOADED,
            payload: {
                crm
            },
            meta: null,
        }
    }

    /*****************************************************
     * Actions to load a DataUnitPreview
     *****************************************************/

    loadDataUnitPreview(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW,
            payload: null,
            meta: {
                pk_project, pk_entity, pk_ui_context
            }
        }
    }

    loadDataUnitPreviewSucceeded(dataUnitPreview: DataUnitPreview): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW_SUCCEEDED,
            payload: null,
            meta: {
                dataUnitPreview
            },
        }
    }

    loadDataUnitPreviewFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW_FAILED,
            payload: null,
            meta: null,
            error
        }
    }


}
