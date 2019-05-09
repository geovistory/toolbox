import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ProProject } from 'app/core';

interface MetaData { };
export type ProjectsAction = FluxStandardAction<ProProject[], MetaData>;


@Injectable()
export class ProjectsActions {
    static LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';  

    loadProjectsSucceeded(payload: ProProject[]): ProjectsAction {
        return {
            type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
            payload,
            meta: null
        };
    }

}