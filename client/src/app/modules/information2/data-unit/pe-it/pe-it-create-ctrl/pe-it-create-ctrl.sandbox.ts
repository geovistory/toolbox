import { sandboxOf } from "angular-playground";
import { InitStateModule } from "app/shared/components/init-state/init-state.module";
import { AppellationCtrlModule } from "../../../value/appellation-ctrl/appellation-ctrl.module";
import { InfRole, DfhLabel, DfhProperty, DfhClass } from "app/core";
import { RoleDetail, RoleSet, PeItDetail } from "../../../information.models";
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
import { RoleSetActions } from "../../../role-set/role-set.actions";
import { TeEntRoleSetCreateCtrlComponent } from "../../../role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component";
import { TeEntActions } from "../../../data-unit/te-ent/te-ent.actions";
import { TeEntCreateCtrlComponent } from "../../../data-unit/te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component";
import { PeItRoleCreateCtrlComponent } from "../../../role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component";
import { PeItCreateCtrlComponent } from "./pe-it-create-ctrl.component";
import { PeItRoleSetCreateCtrlComponent } from "../../../role-set/pe-it/pe-it-role-set-create-ctrl/pe-it-role-set-create-ctrl.component";
import { PeItActions } from "../pe-it.actions";
import { mockPerson } from "../pe-it-create-form/sandbox.mock";



export default sandboxOf(PeItCreateCtrlComponent, {
    imports: [
        InitStateModule,
        AppellationCtrlModule,
        KeysModule
    ],
    declarations: [
        TeEntRoleSetCreateCtrlComponent,
        TeEntRoleCreateCtrlComponent,
        TeEntCreateCtrlComponent,
        PeItRoleCreateCtrlComponent,
        PeItRoleSetCreateCtrlComponent
    ],
    providers: [
        PeItActions,
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
    .add('PeIt Create Ctrl | Name ', {
        context: {
            model: {
            },
            basePath: ['_peIt_create_form'],
            initState: {
                _peIt_create_form: mockPerson
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-pe-it-create-ctrl [basePath]="basePath"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-pe-it-create-ctrl>
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