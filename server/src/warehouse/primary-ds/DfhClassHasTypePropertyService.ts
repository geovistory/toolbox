import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {classIdToString, stringToClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface ClassId {
    pkClass: number
}
export type DfhClassHasTypePropVal = number;

/**
 * This PrimaryDataService creates an index of all properties that are
 * 'has-type'-Subproperty, indexed by the domain class.
 *
 * Example :
 * {
 *      // key is the pk_class of 'Geographical Place – C13'
 *      // value is the pk_property of 'P20 has geographical place type'
 *      '363': 1110
 * }
 */
export class DfhClassHasTypePropertyService extends PrimaryDataService<DbItem, ClassId, DfhClassHasTypePropVal>{
    measure = 1000;
    updatesSql = updateSql
    deletesSql = null;
    index = new IndexDBGeneric<ClassId, DfhClassHasTypePropVal>(classIdToString, stringToClassId)
    constructor(wh: Warehouse) {
        super(wh, ['modified_data_for_history_api_property'])
    }
    dbItemToKeyVal(item: DbItem): {key: ClassId; val: DfhClassHasTypePropVal;} {
        const key: ClassId = {
            pkClass: item.fkClass
        }
        const val: DfhClassHasTypePropVal = item.fkProperty

        return {key, val}
    }
}

interface DbItem {
    fkClass: number
    fkProperty: number
}

const updateSql = `
    SELECT DISTINCT
        dfh_property_domain "fkClass",
        dfh_pk_property "fkProperty"
    FROM
        data_for_history.api_property
    WHERE
        tmsp_last_modification >= $1
    AND
        dfh_is_has_type_subproperty = true
    --ORDER BY
    --    dfh_property_domain,
    --    dfh_pk_property,
    --    tmsp_last_dfh_update DESC;
`
