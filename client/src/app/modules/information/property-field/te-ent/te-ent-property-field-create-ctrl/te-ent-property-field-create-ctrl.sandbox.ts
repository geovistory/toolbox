import { sandboxOf } from 'angular-playground';
import { DfhProperty, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, PropertyField } from 'app/core/state/models';
import { Information2Module } from '../../../information.module';
import { TeEntPropertyFieldCreateCtrlComponent } from './te-ent-property-field-create-ctrl.component';



export default sandboxOf(TeEntPropertyFieldCreateCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt PropertyField Create Ctrl | Detailed Name ', {
        context: {
            model: {
            },
            parentPath: ['_teEnt'],
            index: '_property_field_1',
            initState: {
                _teEnt: {
                    _fields: {
                        _property_field_1:  new PropertyField({
                            label: {
                                default: 'Detailed Name',
                                sg: 'Detailed Name',
                                pl: 'Detailed Names'
                            },
                            _role_list: {
                                _role_1: {
                                    role: {
                                        fk_property: 99,
                                    } as InfRole,
                                    _appe: {
                                    }
                                } as RoleDetail
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
                            } as DfhProperty
                        })
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-property-field-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-te-ent-property-field-create-ctrl>
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
    .add('TeEnt PropertyField Create Ctrl | Language Name ', {
        context: {
            model: {
            },
            parentPath: ['_teEnt'],
            index: '_property_field_1',
            initState: {
                _teEnt: {
                    _fields: {
                        _property_field_1:  new PropertyField({
                            label: {
                                default: 'Language',
                                sg: 'Language',
                                pl: 'Languages'
                            },
                            _role_list: {
                                _role_1: {
                                    role: {
                                        fk_property: 123,
                                    } as InfRole,
                                    _lang: {
                                    }
                                } as RoleDetail
                            },
                            property: {
                                "dfh_pk_property": 3,
                                "dfh_identifier_in_namespace": "R61",
                                "dfh_has_domain": 3,
                                "dfh_has_range": 4,
                                "dfh_standard_label": "Occured in kind of context",
                                "dfh_domain_instances_min_quantifier": 0,
                                "dfh_domain_instances_max_quantifier": -1,
                                "dfh_range_instances_min_quantifier": 1,
                                "dfh_range_instances_max_quantifier": 1,
                            } as DfhProperty
                        })
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-property-field-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-te-ent-property-field-create-ctrl>
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