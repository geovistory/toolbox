import { ProjectPreview } from "app/core";

export interface IProject {
    record: ProjectPreview
}

export interface IProjectList {
    records: IProject[]
}