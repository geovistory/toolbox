import { sandboxOf } from 'angular-playground';
import { DfhClass, DfhProperty, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, PropertyField } from 'app/core/state/models';
import { Information2Module } from '../../../information.module';
import { PeItPropertyFieldCreateCtrlComponent } from './pe-it-property-field-create-ctrl.component';



export default sandboxOf(PeItPropertyFieldCreateCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('PeIt PropertyField Create Ctrl | Name ', {
        context: {
            model: {},
            parentPath: ['_peIt'],
            index: '_property_field_1',
            initState: {
                _peIt: {
                    _fields: {
                        _property_field_1: {
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
                                    _teEnt: {
                                        dfhClass: {
                                            dfh_pk_class: 3,
                                            dfh_identifier_in_namespace: "F52",
                                            dfh_standard_label: "Name Use Activity",
                                        } as DfhClass,
                                        _fields: {
                                            _property_field_1: new PropertyField({
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
                                                            fk_property: 99,
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
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-pe-it-property-field-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-pe-it-property-field-create-ctrl>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>
        
                    <p>Form.touched: {{f.touched | json}}</p>
        
                    <p>Form.dirty: {{f.dirty | json}}</p>
        
                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })