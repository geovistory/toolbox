import { PrimaryDataService } from '../base/classes/PrimaryDataService';
import { projectIdToString, stringToProjectId } from '../base/functions';
import { IndexDBGeneric } from '../base/classes/IndexDBGeneric';
import { Warehouse } from '../Warehouse';
export interface ProjectId {
    pkProject: number
}
export interface ProjectVal {
    fkLanguage: number
}
export class ProjectService extends PrimaryDataService<DbItem, ProjectId, ProjectVal>{
    measure = 1000;
    updatesSql = updateSql
    deletesSql = deleteSql;
    index = new IndexDBGeneric<ProjectId, ProjectVal>(projectIdToString, stringToProjectId)
    constructor(wh: Warehouse) {
        super(wh, ['modified_projects_project'])
    }
    dbItemToKeyVal(item: DbItem): { key: ProjectId; val: ProjectVal; } {
        const key: ProjectId = {
            pkProject: item.pkProject
        }
        const val: ProjectVal = {
            fkLanguage: item.fkLanguage
        }
        return { key, val }
    }
}

interface DbItem {
    pkProject: number,
    fkLanguage: number,
}
const updateSql = `
    SELECT
        pk_entity "pkProject",
        fk_language "fkLanguage"
    FROM
        projects.project
    WHERE
        tmsp_last_modification >= $1
`
const deleteSql = `
    SELECT
        pk_entity "pkProject"
    FROM
        projects.project_vt
    WHERE
        upper(sys_period) >= $1

    EXCEPT

    SELECT
        pk_entity "pkProject"
    FROM
        projects.project;
`
