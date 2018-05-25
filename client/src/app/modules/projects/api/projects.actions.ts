import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Project } from 'app/core';

interface MetaData { };
export type ProjectsAction = FluxStandardAction<Project[], MetaData>;


@Injectable()
export class ProjectsActions {
    static LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';  

    loadProjectsSucceeded(payload: Project[]): ProjectsAction {
        return {
            type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
            payload,
            meta: null
        };
    }

}