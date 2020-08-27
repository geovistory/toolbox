import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {proPropertyIdToString, stringToProPropertyId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface ProPropertyLabelId {
    fkProject: number
    fkProperty: number
    fkLanguage: number
}
export type ProPropertyLabelVal = string

export class ProPropertyLabelService extends PrimaryDataService<DbItem, ProPropertyLabelId, ProPropertyLabelVal>{
    measure = 1000;


    index = new IndexDBGeneric<ProPropertyLabelId, ProPropertyLabelVal>(proPropertyIdToString, stringToProPropertyId)

    constructor(wh: Warehouse) {
        super(wh, ['modified_projects_text_property'])
    }

    dbItemToKeyVal(item: DbItem): {key: ProPropertyLabelId; val: ProPropertyLabelVal;} {
        const key: ProPropertyLabelId = {
            fkProject: item.fkProject,
            fkProperty: item.fkProperty,
            fkLanguage: item.fkLanguage
        }
        const val = item.label
        return {key, val};
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };
}


interface DbItem {
    fkProject: number,
    fkProperty: number,
    fkLanguage: number,
    label: string
}


export const updateSql = `
SELECT
    fk_project "fkProject",
    fk_dfh_property "fkProperty",
    fk_language "fkLanguage",
    string "label"
FROM
    projects.text_property
WHERE
    fk_dfh_property IS NOT NULL
AND
    tmsp_last_modification > $1
`;


const deleteSql = `
    SELECT
        fk_project "fkProject",
        fk_dfh_property "fkProperty",
        fk_language "fkLanguage"
    FROM
        projects.text_property_vt
    WHERE
        upper(sys_period) > $1

    EXCEPT

    SELECT
        fk_project "fkProject",
        fk_dfh_property "fkProperty",
        fk_language "fkLanguage"
    FROM
        projects.text_property;
`
