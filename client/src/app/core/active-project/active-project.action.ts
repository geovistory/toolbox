import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass, ProjectInterface } from '../sdk';

export interface ProjectCrm { [key: string]: DfhClass }

export interface ProjectDetail extends ProjectInterface {
    crm?: ProjectCrm
}

interface MetaData { };
type Payload = ProjectDetail;
export type ActiveProjectAction = FluxStandardAction<Payload, MetaData>;


@Injectable()
export class ActiveProjectActions {

    static ACTIVE_PROJECT_UPDATED = 'ACTIVE_PROJECT_UPDATED';
    static PROJECT_CRM_LOADED = 'PROJECT_CRM_LOADED';

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