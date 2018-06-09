import { sandboxOf } from 'angular-playground';
import { DfhClass, DfhProperty, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { KeysModule } from 'app/shared/pipes/keys.module';

import { TeEntAddCtrlComponent } from '../../../data-unit/te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntCreateCtrlComponent } from '../../../data-unit/te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { TeEntActions } from '../../../data-unit/te-ent/te-ent.actions';
import { RoleDetail, RoleSet } from '../../../information.models';
import { RoleSetActions } from '../../../role-set/role-set.actions';
import {
    TeEntRoleSetCreateCtrlComponent,
} from '../../../role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component';
import { PeItRoleAddCtrlComponent } from '../../../role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { PeItRoleCreateCtrlComponent } from '../../../role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { RoleActions } from '../../../role/role.actions';
import { TeEntRoleAddCtrlComponent } from '../../../role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import {
    TeEntRoleCreateCtrlComponent,
} from '../../../role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { ClassService } from '../../../shared/class.service';
import { EprService } from '../../../shared/epr.service';
import { PeItService } from '../../../shared/pe-it.service';
import { PropertyService } from '../../../shared/property.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleService } from '../../../shared/role.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { TeEntService } from '../../../shared/te-ent.service';
import { ValueModule } from '../../../value/value.module';
import { TeEntRoleSetAddCtrlComponent } from '../../te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { PeItRoleSetFormComponent } from './pe-it-role-set-form.component';



export default sandboxOf(PeItRoleSetFormComponent, {
    imports: [
        InitStateModule,
        KeysModule,
        ValueModule
    ],
    declarations: [
        TeEntRoleSetCreateCtrlComponent,
        TeEntRoleCreateCtrlComponent,
        TeEntCreateCtrlComponent,
        PeItRoleCreateCtrlComponent,
        TeEntRoleSetAddCtrlComponent,
        TeEntRoleAddCtrlComponent,
        TeEntAddCtrlComponent,
        PeItRoleAddCtrlComponent,
    ],
    providers: [
        TeEntActions,
        RoleSetActions,
        RoleSetService,
        RoleService,
        RoleActions,
        StateCreatorService,
        ClassService,
        PropertyService,
        PeItService,
        TeEntService,
        EprService,
    ]
})
    .add('PeIt RoleSet Form | Appellation ', {
        context: {
            model: {},
            parentPath: ['_peIt'],
            index: '_role_set_1',
            initState: {
                _peIt: {
                    _roleSet_list: {
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
                                    _teEnt: {
                                        dfhClass: {
                                            dfh_pk_class: 3,
                                            dfh_identifier_in_namespace: "F52",
                                            dfh_standard_label: "Name Use Activity",
                                        } as DfhClass,
                                        _roleSet_list: {
                                            _role_set_1: {
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
                                                            appellation: {
                                                                appellation_label: {
                                                                    tokens: [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Hallo",
                                                                            "isSeparator": false
                                                                        },
                                                                        {
                                                                            "string": " ",
                                                                            "isSeparator": true
                                                                        },
                                                                        {
                                                                            "string": "Welt",
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 2
                                                                }
                                                            }
                                                        }
                                                    } as RoleDetail
                                                },
                                            } as RoleSet
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
                        <gv-pe-it-role-set-form [parentPath]="parentPath" 
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-pe-it-role-set-form>
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