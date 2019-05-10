import { ProjectPreview } from './containers/project-list/project-list.component';

export interface IProject {
    record: ProjectPreview
}

export interface IProjectList {
    records: IProject[]
}