import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {dfhClassIdToString, stringToDfhClassId} from '../base/functions';
import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {Warehouse} from '../Warehouse';
export interface DfhClassLabelId {
    pkClass: number
    language: string
}
export type DfhClassLabelVal = string;
export class DfhClassLabelService extends PrimaryDataService<DbItem, DfhClassLabelId, DfhClassLabelVal>{
    measure = 1000;
    index = new IndexDBGeneric<DfhClassLabelId, DfhClassLabelVal>(dfhClassIdToString, stringToDfhClassId)
    constructor(wh: Warehouse) {
        super(wh, ['modified_data_for_history_api_class'])
    }
    dbItemToKeyVal(item: DbItem): {key: DfhClassLabelId; val: DfhClassLabelVal;} {
        const key: DfhClassLabelId = {
            pkClass: item.pkClass,
            language: item.language,
        }
        const val: DfhClassLabelVal = item.label

        return {key, val}
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
   }
   getDeletesSql = undefined;
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
        dfh_class_label "label"
    FROM
        data_for_history.api_class
    WHERE
        tmsp_last_modification > $1
`
