import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
import {Warehouse} from '../Warehouse';
import {Injectable, Inject, forwardRef} from 'injection-js';
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

@Injectable()
export class ProClassLabelService extends PrimaryDataService< ProClassLabelId, ProClassLabelVal>{
    measure = 1000;
    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            ['modified_projects_text_property'],
            keyDefs)
    }

    dbItemToKeyVal = undefined
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };

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
