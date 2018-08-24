import { DfhClass, DfhProperty, InfPersistentItem, InfRole } from 'app/core';

import { PeItDetail, RoleDetail, RoleSet } from 'app/core/models';
import { DfhConfig } from '../../shared/dfh-config';

export const createState = function (appeProperty) {

    return {
        peIt: {
            fk_class: 1
        } as InfPersistentItem,
        dfhClass: {
            dfh_pk_class: 1,
            dfh_standard_label: 'Person'
        } as DfhClass,
        ingoingRoleSets: [],
        outgoingRoleSets: [],
        _children: {
            _role_set_1: {
                label: {
                    default: 'Names',
                    sg: 'Name',
                    pl: 'Names'
                },
                property: {
                    "dfh_pk_property": 1,
                    "dfh_identifier_in_namespace": "R63",
                    "dfh_has_domain": 3,
                    "dfh_has_range": 1,
                    "dfh_standard_label": "Named",
                    "dfh_domain_instances_min_quantifier": 0,
                    "dfh_domain_instances_max_quantifier": -1,
                    "dfh_range_instances_min_quantifier": 0,
                    "dfh_range_instances_max_quantifier": -1,
                } as DfhProperty,
                _role_list: {
                    _role_detail_1: {
                        role: {
                            fk_property: appeProperty,
                            entity_version_project_rels: [{
                                is_standard_in_project: true
                            }]
                        } as InfRole,
                        _teEnt: {
                            dfhClass: {
                                dfh_pk_class: 3,
                                dfh_identifier_in_namespace: "F52",
                                dfh_standard_label: "Name Use Activity",
                            } as DfhClass,
                            _children: {
                                _role_set_1: new RoleSet({
                                    label: {
                                        default: 'Detailed Name',
                                        sg: 'Detailed Name',
                                        pl: 'Detailed Names'
                                    },
                                    property: {
                                        "dfh_pk_property": 2,
                                        "dfh_identifier_in_namespace": "R64",
                                        "dfh_has_domain": 3,
                                        "dfh_has_range": 2,
                                        "dfh_standard_label": "Used Name",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": -1,
                                        "dfh_range_instances_min_quantifier": 1,
                                        "dfh_range_instances_max_quantifier": 1,
                                    } as DfhProperty,
                                    _role_list: {
                                        _role_1: {
                                            role: {
                                                fk_property: DfhConfig.PROPERTY_PK_R64_USED_NAME,
                                                appellation: {
                                                    fk_class: DfhConfig.CLASS_PK_APPELLATION
                                                }
                                            } as InfRole,
                                            _appe: {
                                            }
                                        } as RoleDetail
                                    },
                                }) 
                            }
                        }
                    }
                }
            }
        }
    }
}