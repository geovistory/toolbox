import { ProjectPreview } from "@kleiolab/lib-redux";

export interface IProject {
    record: ProjectPreview
}

export interface IProjectList {
    records: IProject[]
}
