import { IAccount } from "../../modules/account/account.model";
import { IProjectList } from "../../modules/projects/projects.model";
import { Project } from "app/core";
import { IInformationState } from "../../modules/information/api/information.model";

export interface IAppState {
    account?: IAccount,
    projects?: IProjectList
    activeProject?: Project
    routes?: any,
    information?: IInformationState
    // feedback?: any
}
