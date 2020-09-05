import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {outgoingProperyIdToString, stringToOutgoingProperyId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface OutgoingProperyId {
    fkDomain: number
    fkProperty: number
}
export type OutgoingPropertyVal = {
    fkDomain: number,
    fkProperty: number,
    dfhIdentityDefining: false,
    dfhIsHasTypeSubproperty: true,
    dfhRangeInstancesMaxQuantifier: number,
    dfhRangeInstancesMinQuantifier: number,
    dfhDomainInstancesMaxQuantifier: number,
    dfhDomainInstancesMinQuantifier: number,
};

/**
 * This PrimaryDataService creates an index of all properties,
 * storing the not-language dependent aspects like
 * - quantifiers
 * - has type subproperty
 * - is identity defining
 *
 * Example :
 * {
 *      // key is the pk_class of 'Geographical Place – C13'
 *      // value is the pk_property of 'P20 has geographical place type'
 *      '363': 1110
 * }
 */
export class DfhOutgoingPropertyService extends PrimaryDataService<DbItem, OutgoingProperyId, OutgoingPropertyVal>{
    measure = 1000;
    index = new IndexDBGeneric<OutgoingProperyId, OutgoingPropertyVal>(outgoingProperyIdToString, stringToOutgoingProperyId)
    constructor(wh: Warehouse) {
        super(wh, ['modified_data_for_history_api_property'])

        this.afterPut$.subscribe(item => {
            wh.agg.identifyingProperty.updater.addItemToQueue({pkClass: item.key.fkDomain}).catch(e => console.log(e))
        })
    }
    dbItemToKeyVal(item: DbItem): {key: OutgoingProperyId; val: OutgoingPropertyVal;} {
        const key: OutgoingProperyId = {
            fkDomain: item.fkDomain,
            fkProperty: item.fkProperty
        }
        const val: OutgoingPropertyVal = {
            fkDomain: item.fkDomain,
            fkProperty: item.fkProperty,
            dfhIdentityDefining: item.dfhIdentityDefining,
            dfhIsHasTypeSubproperty: item.dfhIsHasTypeSubproperty,
            dfhRangeInstancesMaxQuantifier: item.dfhRangeInstancesMaxQuantifier,
            dfhRangeInstancesMinQuantifier: item.dfhRangeInstancesMinQuantifier,
            dfhDomainInstancesMaxQuantifier: item.dfhDomainInstancesMaxQuantifier,
            dfhDomainInstancesMinQuantifier: item.dfhDomainInstancesMinQuantifier
        }

        return {key, val}
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};
}

interface DbItem {
    fkDomain: number
    fkProperty: number
    dfhIdentityDefining: false,
    dfhIsHasTypeSubproperty: true,
    dfhRangeInstancesMaxQuantifier: number,
    dfhRangeInstancesMinQuantifier: number,
    dfhDomainInstancesMaxQuantifier: number,
    dfhDomainInstancesMinQuantifier: number,
}

const updateSql = `
    SELECT DISTINCT ON (dfh_property_domain, dfh_pk_property)
        dfh_property_domain "fkDomain",
        dfh_pk_property "fkProperty",
        dfh_identity_defining "dfhIdentityDefining",
        dfh_is_has_type_subproperty "dfhIsHasTypeSubproperty",
        dfh_range_instances_max_quantifier "dfhRangeInstancesMaxQuantifier",
        dfh_range_instances_min_quantifier "dfhRangeInstancesMinQuantifier",
        dfh_domain_instances_max_quantifier "dfhDomainInstancesMaxQuantifier",
        dfh_domain_instances_min_quantifier "dfhDomainInstancesMinQuantifier"
    FROM
        data_for_history.api_property
    WHERE
        tmsp_last_modification >= $1
`


