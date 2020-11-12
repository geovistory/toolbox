import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {dfhClassIdToString, stringToDfhClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
export interface DfhClassLabelId {
    pkClass: number
    language: string
}
const keyDefs: KeyDefinition[] = [
    {
        name: 'pkClass',
        type: 'integer'
    },
    {
        name: 'language',
        type: 'text'
    }
]
export interface DfhClassLabelVal {label: string};
export class DfhClassLabelService extends PrimaryDataService<DfhClassLabelId, DfhClassLabelVal>{
    measure = 1000;
    constructor(wh: Warehouse) {
        super(
            wh,
            ['modified_data_for_history_api_class'],
            dfhClassIdToString,
            stringToDfhClassId,
            keyDefs
        )
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};
    get2ndDeleteSql = undefined
    get2ndUpdatesSql = undefined
    dbItemToKeyVal = undefined
}

interface DbItem {
    pkClass: number
    language: string
    label: string
}

const updateSql = `
    SELECT DISTINCT
        dfh_pk_class "pkClass",
        dfh_class_label_language "language",
        jsonb_build_object('label',dfh_class_label) val
    FROM
        data_for_history.api_class
    WHERE
        tmsp_last_modification > $1
`
