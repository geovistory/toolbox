import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
import {Warehouse} from '../Warehouse';
import {Injectable, Inject, forwardRef} from 'injection-js';
export interface OutgoingProperyId {
    fkDomain: number
    fkProperty: number
}
export type OutgoingPropertyVal = {
    fkDomain: number,
    fkProperty: number,
    dfhIdentityDefining: boolean,
    dfhIsHasTypeSubproperty: boolean,
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
const outgoingPropertykeyDefs: KeyDefinition[] = [
    {
        name: 'fkDomain',
        type: 'integer'
    },
    {
        name: 'fkProperty',
        type: 'integer'
    },
]
@Injectable()
export class DfhOutgoingPropertyService extends PrimaryDataService<OutgoingProperyId, OutgoingPropertyVal>{
    measure = 1000;
    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(wh,
            ['modified_data_for_history_api_property'],
            outgoingPropertykeyDefs
        )
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};
}

const updateSql = `
    SELECT DISTINCT ON (dfh_property_domain, dfh_pk_property)
    dfh_property_domain "fkDomain",
    dfh_pk_property "fkProperty",
    jsonb_build_object(
        'fkDomain', dfh_property_domain,
        'fkProperty', dfh_pk_property,
        'dfhIdentityDefining', dfh_identity_defining,
        'dfhIsHasTypeSubproperty', dfh_is_has_type_subproperty,
        'dfhRangeInstancesMaxQuantifier', dfh_range_instances_max_quantifier,
        'dfhRangeInstancesMinQuantifier', dfh_range_instances_min_quantifier,
        'dfhDomainInstancesMaxQuantifier', dfh_domain_instances_max_quantifier,
        'dfhDomainInstancesMinQuantifier', dfh_domain_instances_min_quantifier
    ) val
    FROM
        data_for_history.api_property
    WHERE
        tmsp_last_modification >= $1
`


