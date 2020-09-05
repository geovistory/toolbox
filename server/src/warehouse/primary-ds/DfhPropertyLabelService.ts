import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {dfhPropertyIdToString, stringToDfhPropertyId} from '../base/functions';
import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {Warehouse} from '../Warehouse';
export interface DfhPropertyLabelId {
    pkProperty: number
    language: string
}
export type DfhPropertyLabelVal = string;
export class DfhPropertyLabelService extends PrimaryDataService<DbItem, DfhPropertyLabelId, DfhPropertyLabelVal>{
    measure = 1000;
    index: IndexDBGeneric<DfhPropertyLabelId, DfhPropertyLabelVal>
    constructor(wh: Warehouse) {
        super(wh, ['modified_data_for_history_api_property'])
        this.index = new IndexDBGeneric(dfhPropertyIdToString, stringToDfhPropertyId, this.constructor.name)
    }
    dbItemToKeyVal(item: DbItem): {key: DfhPropertyLabelId; val: DfhPropertyLabelVal;} {
        const key: DfhPropertyLabelId = {
            pkProperty: item.pkProperty,
            language: item.language,
        }
        const val: DfhPropertyLabelVal = item.label

        return {key, val}
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
        dfh_property_label "label"
    FROM
        data_for_history.api_property
    WHERE
        tmsp_last_modification > $1
`
