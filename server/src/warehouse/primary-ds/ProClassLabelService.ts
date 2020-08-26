import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {proClassIdToString, stringToProClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface ProClassLabelId {
    fkProject: number
    fkClass: number
    fkLanguage: number
}
export type ProClassLabelVal = string

export class ProClassLabelService extends PrimaryDataService<DbItem, ProClassLabelId, ProClassLabelVal>{
    measure = 1000;
    updatesSql = updateSql;
    deletesSql = deleteSql;

    index = new IndexDBGeneric<ProClassLabelId, ProClassLabelVal>(proClassIdToString, stringToProClassId)

    constructor(wh: Warehouse) {
        super(wh, ['modified_projects_text_property'])
    }

    dbItemToKeyVal(item: DbItem): {key: ProClassLabelId; val: ProClassLabelVal;} {
        const key: ProClassLabelId = {
            fkProject: item.fkProject,
            fkClass: item.fkClass,
            fkLanguage: item.fkLanguage
        }
        const val = item.label
        return {key, val};
    }
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
    string "label"
FROM
    projects.text_property
WHERE
    fk_dfh_class IS NOT NULL
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
        projects.text_property;
`
