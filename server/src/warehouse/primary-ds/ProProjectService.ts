import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {projectIdToString, stringToProjectId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
export interface ProjectId {
    pkProject: number
}
export interface ProjectVal {
    fkLanguage: number
}
export const pProjectKeyDef: KeyDefinition[] = [
    {name: 'pkProject', type: 'integer'}
]
export class ProProjectService extends PrimaryDataService<ProjectId, ProjectVal>{
    measure = 1000;

    constructor(wh: Warehouse) {
        super(
            wh,
            ['modified_projects_project'],
            projectIdToString,
            stringToProjectId,
            pProjectKeyDef
        )
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };
}

const updateSql = `
    SELECT
        pk_entity "pkProject",
        jsonb_build_object('fkLanguage', fk_language) val
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
        projects.project
`
