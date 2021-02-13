import { IProjectList } from '../models/projects.model';
import { ProjectPreview } from '../models/active-project.models';
export declare const createProjectsReducer: () => (lastState: IProjectList, action: import("flux-standard-action").FluxStandardAction<ProjectPreview[], {}>) => IProjectList;
