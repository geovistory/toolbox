import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { DfhClass } from '../sdk';
import { ProjectDetail, ProjectCrm } from './active-project.models';


interface MetaData {
    pk_project: number
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

}