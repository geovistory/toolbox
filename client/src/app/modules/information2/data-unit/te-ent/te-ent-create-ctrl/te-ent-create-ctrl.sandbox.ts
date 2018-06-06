import { sandboxOf } from "angular-playground";
import { InitStateModule } from "app/shared/components/init-state/init-state.module";
import { AppellationCtrlModule } from "../../../value/appellation-ctrl/appellation-ctrl.module";
import { InfRole, DfhLabel, DfhProperty, DfhClass } from "app/core";
import { RoleDetail, RoleSet } from "../../../information.models";
import { TeEntRoleCreateCtrlComponent } from "../../../role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component";
import { KeysModule } from "app/shared/pipes/keys.module";
import { RoleSetService } from "../../../shared/role-set.service";
import { RoleService } from "../../../shared/role.service";
import { RoleActions } from "../../../role/role.actions";
import { StateCreatorService } from "../../../shared/state-creator.service";
import { ClassService } from "../../../shared/class.service";
import { PropertyService } from "../../../shared/property.service";
import { PeItService } from "../../../shared/pe-it.service";
import { TeEntService } from "../../../shared/te-ent.service";
import { EprService } from "../../../shared/epr.service";
import { TeEntCreateCtrlComponent } from "./te-ent-create-ctrl.component";
import { RoleSetActions } from "../../../role-set/role-set.actions";
import { TeEntActions } from "../te-ent.actions";
import { TeEntRoleSetCreateCtrlComponent } from "../../../role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component";



export default sandboxOf(TeEntCreateCtrlComponent, {
    imports: [
        InitStateModule,
        AppellationCtrlModule,
        KeysModule
    ],
    declarations: [
        TeEntRoleSetCreateCtrlComponent,
        TeEntRoleCreateCtrlComponent
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
    .add('TeEnt Create Ctrl | Name Use Activity ', {
        context: {
            model: {
            },
            parentPath: ['_role_detail_1'],
            initState: {
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
                            } as RoleSet
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
                        <gv-te-ent-create-ctrl [parentPath]="parentPath"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-te-ent-create-ctrl>
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