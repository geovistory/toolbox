import { ProjectPreview } from './active-project.models';

export interface IProject {
  record: ProjectPreview
}

export interface IProjectList {
  records: IProject[]
}
