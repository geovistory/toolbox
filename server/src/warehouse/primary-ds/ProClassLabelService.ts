import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {proClassIdToString, stringToProClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
export interface ProClassLabelId {
    fkProject: number
    fkClass: number
    fkLanguage: number
}
const keyDefs: KeyDefinition[] = [
    {
        name: 'fkClass',
        type: 'integer'
    },
    {
        name: 'fkProject',
        type: 'integer'
    },
    {
        name: 'fkLanguage',
        type: 'integer'
    }
]
export interface ProClassLabelVal {label: string}

export class ProClassLabelService extends PrimaryDataService<DbItem, ProClassLabelId, ProClassLabelVal>{
    measure = 1000;
    constructor(wh: Warehouse) {
        super(
            wh,
            ['modified_projects_text_property'],
            proClassIdToString,
            stringToProClassId,
            keyDefs)
    }

    dbItemToKeyVal = undefined
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };
    get2ndUpdatesSql = undefined
    get2ndDeleteSql = undefined
}


interface DbItem {
    fkProject: number,
    fkClass: number,
    fkLanguage: number,
    label: string
}


export const updateSql = `
SELECT
    fk_project "fkProject",
    fk_dfh_class "fkClass",
    fk_language "fkLanguage",
    jsonb_build_object( 'label', string ) val
FROM
    projects.text_property
WHERE
    fk_dfh_class IS NOT NULL
AND
    fk_system_type = 639
AND
    tmsp_last_modification > $1
`;


const deleteSql = `
    SELECT
        fk_project "fkProject",
        fk_dfh_class "fkClass",
        fk_language "fkLanguage"
    FROM
        projects.text_property_vt
    WHERE
        upper(sys_period) > $1

    EXCEPT

    SELECT
        fk_project "fkProject",
        fk_dfh_class "fkClass",
        fk_language "fkLanguage"
    FROM
        projects.text_property
`
