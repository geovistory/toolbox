import { Account } from "app/core";
import { IProjectList } from "../projects/projects.model";

export interface IAccount{
    record: Account,
    projects?: IProjectList,
}