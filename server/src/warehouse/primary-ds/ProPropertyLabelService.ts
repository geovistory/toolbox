import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {proPropertyIdToString, stringToProPropertyId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface ProPropertyLabelId {
    fkProject: number
    fkProperty: number
    fkClass: number
    isOutgoing: boolean
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
            fkClass: item.fkPropertyDomain ?? item.fkPropertyRange ?? -99,
            isOutgoing: !!item.fkPropertyDomain,
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
    fkPropertyDomain: number | null,
    fkPropertyRange: number | null,
    fkLanguage: number,
    label: string
}


export const updateSql = `
SELECT
    fk_project "fkProject",
    fk_dfh_property "fkProperty",
    fk_dfh_property_domain "fkPropertyDomain",
    fk_dfh_property_range "fkPropertyRange",
    fk_language "fkLanguage",
    string "label"
FROM
    projects.text_property
WHERE
    fk_dfh_property IS NOT NULL
AND
    fk_system_type = 639
AND
    tmsp_last_modification >= $1
`;


const deleteSql = `
WITH tw1 AS (
	SELECT
        fk_project "fkProject",
        fk_dfh_property "fkProperty",
        fk_dfh_property_domain "fkPropertyDomain",
        fk_dfh_property_range "fkPropertyRange",
        fk_language "fkLanguage"
    FROM
        projects.text_property_vt
    WHERE
        upper(sys_period) >= $1
    EXCEPT

    SELECT
        fk_project "fkProject",
        fk_dfh_property "fkProperty",
        fk_dfh_property_domain "fkPropertyDomain",
        fk_dfh_property_range "fkPropertyRange",
        fk_language "fkLanguage"
    FROM
        projects.text_property
	)
	SELECT
        "fkProject",
        "fkProperty",
        COALESCE("fkPropertyDomain", "fkPropertyRange") "fkClass",
        CASE WHEN "fkPropertyDomain" IS NOT NULL THEN true ELSE false END "isOutgoing",
        "fkLanguage"
    FROM
    tw1;


`
