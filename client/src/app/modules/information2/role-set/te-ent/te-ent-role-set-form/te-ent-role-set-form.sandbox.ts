import { sandboxOf } from 'angular-playground';
import { DfhProperty, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, RoleDetailList, RoleSetForm } from '../../../information.models';
import { Information2Module } from '../../../information2.module';
import { TeEntRoleSetFormComponent } from './te-ent-role-set-form.component';



export default sandboxOf(TeEntRoleSetFormComponent, {
    imports: [
        InitStateModule,    
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt RoleSet Form | Born Children', {
        context: {
            model: {
            },
            parentPath: ['_role_set_1'],
            initState: {
                _role_set_1: {
                    label: {
                        default: 'Born Children',
                        sg: 'Born Child',
                        pl: 'Born Children'
                    },
                    property: {
                        "dfh_pk_property": 6,
                        "dfh_identifier_in_namespace": "P98",
                        "dfh_has_domain": 5,
                        "dfh_has_range": 1,
                        "dfh_standard_label": "Brought into life",
                        "dfh_domain_instances_min_quantifier": 1,
                        "dfh_domain_instances_max_quantifier": 1,
                        "dfh_range_instances_min_quantifier": 1,
                        "dfh_range_instances_max_quantifier": 9,
                    } as DfhProperty,
                    _role_set_form: {
                        _role_create_list: {
                            role_a: {
                                _leaf_peIt: {

                                }
                            }
                        } as RoleDetailList
                    } as RoleSetForm
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">

                        <gv-te-ent-role-set-form [parentPath]="parentPath"></gv-te-ent-role-set-form>
                
                    </div>
            </div>
        `
    })
    .add('TeEnt RoleSet Form | Name', {
        context: {
            model: {
            },
            parentPath: ['_role_set_1'],
            initState: {
                _role_set_1: {
                    label: {
                        default: 'Born Children',
                        sg: 'Born Child',
                        pl: 'Born Children'
                    },
                    property: {
                        "dfh_pk_property": 6,
                        "dfh_identifier_in_namespace": "P98",
                        "dfh_has_domain": 5,
                        "dfh_has_range": 1,
                        "dfh_standard_label": "Brought into life",
                        "dfh_domain_instances_min_quantifier": 1,
                        "dfh_domain_instances_max_quantifier": 1,
                        "dfh_range_instances_min_quantifier": 1,
                        "dfh_range_instances_max_quantifier": 9,
                    } as DfhProperty,
                    _role_set_form: {
                        _role_create_list: {
                            _role_1: {
                                role: {
                                    fk_property: 99,
                                } as InfRole,
                                _appe: {
                                }
                            } as RoleDetail
                        } as RoleDetailList
                    } as RoleSetForm
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">

                        <gv-te-ent-role-set-form [parentPath]="parentPath"></gv-te-ent-role-set-form>
                
                    </div>
            </div>
        `
    })