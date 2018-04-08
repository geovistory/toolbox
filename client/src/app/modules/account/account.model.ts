import { Account } from "app/core";
import { IProjectList } from "../projects/projects.model";
import { IPeIt } from "../information/components/pe-it-entity/pe-it-entity.model";

export interface IAccount{
    record: Account,
    projects?: IProjectList,
    activePeIt: IPeIt
}