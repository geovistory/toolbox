import { FluxStandardAction } from 'flux-standard-action';
import { ProjectPreview } from '../models';
export declare type ProjectsAction = FluxStandardAction<ProjectPreview[], {}>;
export declare class ProjectsActions {
    static LOAD_PROJECTS_SUCCEEDED: string;
    loadProjectsSucceeded(payload: ProjectPreview[]): ProjectsAction;
}
