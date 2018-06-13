import { IAccount } from "../../modules/account/account.model";
import { IProjectList } from "../../modules/projects/projects.model";
import { Project } from "app/core";
import { ISourceListState } from "../../modules/sources";
import { Information } from "../../modules/information2/information.models";

export interface IAppState {
    account?: IAccount,
    projects?: IProjectList
    activeProject?: Project
    routes?: any,
    information?: Information,
    sources?: ISourceListState
    
}
