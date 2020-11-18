import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {dfhPropertyIdToString, stringToDfhPropertyId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
export interface DfhPropertyLabelId {
    pkProperty: number
    language: string
}
export interface DfhPropertyLabelVal {label: string};
export const dfhPropertyLabelIdKeyDef: KeyDefinition[] = [
    {name: 'pkProperty', type: 'integer'},
    {name: 'language', type: 'text'}
]
export class DfhPropertyLabelService extends PrimaryDataService<DfhPropertyLabelId, DfhPropertyLabelVal>{
    measure = 1000;
    constructor(wh: Warehouse) {
        super(
            wh,
            ['modified_data_for_history_api_property'],
            dfhPropertyIdToString,
            stringToDfhPropertyId,
            dfhPropertyLabelIdKeyDef
        )
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};
}

interface DbItem {
    pkProperty: number
    language: string
    label: string
}

const updateSql = `
    SELECT DISTINCT
        dfh_pk_property "pkProperty",
        dfh_property_label_language "language",
        jsonb_build_object('label', dfh_property_label) val
    FROM
        data_for_history.api_property
    WHERE
        tmsp_last_modification > $1
`
