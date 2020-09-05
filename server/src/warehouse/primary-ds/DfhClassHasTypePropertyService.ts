import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {rClassIdToString, stringToRClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface RClassId {
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
export class DfhClassHasTypePropertyService extends PrimaryDataService<DbItem, RClassId, DfhClassHasTypePropVal>{
    measure = 1000;
    index: IndexDBGeneric<RClassId, DfhClassHasTypePropVal>
    constructor(wh: Warehouse) {
        super(wh, ['modified_data_for_history_api_property'])
        this.index = new IndexDBGeneric(rClassIdToString, stringToRClassId, this.constructor.name)
    }
    dbItemToKeyVal(item: DbItem): {key: RClassId; val: DfhClassHasTypePropVal;} {
        const key: RClassId = {
            pkClass: item.fkClass
        }
        const val: DfhClassHasTypePropVal = item.fkProperty

        return {key, val}
    }
    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
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
`


const deleteSql = `

-- give me all records where latest item in version history
-- dfh_is_has_type_subproperty = true ...
WITH tw1 AS (
    SELECT
        dfh_property_domain,
        dfh_pk_property,
        dfh_is_has_type_subproperty
    FROM
        data_for_history.api_property_vt
    WHERE
        tmsp_last_modification >= $1
    ORDER BY entity_version desc
    LIMIT 1
)
SELECT
        dfh_property_domain "pkClass",
        dfh_pk_property "fkProperty"
FROM tw1
WHERE
    dfh_is_has_type_subproperty = true


    EXCEPT
-- ... excluding the items, where in current version it is still:
-- dfh_is_has_type_subproperty = true

SELECT DISTINCT
    dfh_property_domain "pkClass",
    dfh_pk_property "fkProperty"
FROM
    data_for_history.api_property
WHERE
    dfh_is_has_type_subproperty = true;

-- ... as a result we get only the items that have been set to false

`
