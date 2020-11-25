import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
import {Warehouse} from '../Warehouse';
export interface ProPropertyLabelId {
    fkProject: number
    fkProperty: number
    fkClass: number
    isOutgoing: boolean
    fkLanguage: number
}
export interface ProPropertyLabelVal {label: string}
export const proPropertyLabelKeyDef: KeyDefinition[] = [
    {name: 'fkProperty', type: 'integer'},
    {name: 'fkClass', type: 'integer'},
    {name: 'isOutgoing', type: 'boolean'},
    {name: 'fkLanguage', type: 'integer'},
]
export class ProPropertyLabelService extends PrimaryDataService<ProPropertyLabelId, ProPropertyLabelVal>{
    measure = 1000;

    constructor(wh: Warehouse) {
        super(
            wh,
            ['modified_projects_text_property'],
            proPropertyLabelKeyDef
        )
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };
}


export const updateSql = `
SELECT
    fk_project "fkProject",
    fk_dfh_property "fkProperty",
    COALESCE(fk_dfh_property_domain, fk_dfh_property_range) "fkClass",
    CASE WHEN fk_dfh_property_domain IS NOT NULL
    THEN true
    ELSE false
    END "isOutgoing",
    fk_language "fkLanguage",
    jsonb_build_object('label', string) val
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
    tw1
`
