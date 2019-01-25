import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ComProject } from 'app/core';

interface MetaData { };
export type ProjectsAction = FluxStandardAction<ComProject[], MetaData>;


@Injectable()
export class ProjectsActions {
    static LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';  

    loadProjectsSucceeded(payload: ComProject[]): ProjectsAction {
        return {
            type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
            payload,
            meta: null
        };
    }

}