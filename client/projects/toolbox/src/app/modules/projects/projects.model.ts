import { ProjectPreview } from "projects/toolbox/src/app/core";

export interface IProject {
    record: ProjectPreview
}

export interface IProjectList {
    records: IProject[]
}
