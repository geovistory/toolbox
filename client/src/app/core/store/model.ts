import { IAccount } from "../../modules/account/account.model";
import { IProjectList } from "../../modules/projects/projects.model";
import { IPeIt } from "../../modules/information/components/pe-it-entity/pe-it-entity.model";
import { IInformation } from "../../modules/information/information.model";

export interface IAppState {
    account?: IAccount,
    projects?: IProjectList
    information?: IInformation,
    routes?: any,
    // feedback?: any
}
