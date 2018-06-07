import { sandboxOf } from "angular-playground";
import { PeItCreateFormComponent } from "./pe-it-create-form.component";
import { DfhClass, DfhProperty, DfhLabel } from "app/core";
import { mockPerson } from "./sandbox.mock";
import { PeItRoleSetCreateCtrlComponent } from "../../../role-set/pe-it/pe-it-role-set-create-ctrl/pe-it-role-set-create-ctrl.component";
import { PeItRoleCreateCtrlComponent } from "../../../role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component";
import { TeEntCreateCtrlComponent } from "../../te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component";
import { TeEntRoleSetCreateCtrlComponent } from "../../../role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component";
import { TeEntRoleCreateCtrlComponent } from "../../../role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component";
import { AppellationCtrlComponent } from "../../../value/appellation-ctrl/appellation-ctrl.component";
import { PeItCreateCtrlComponent } from "../pe-it-create-ctrl/pe-it-create-ctrl.component";
import { PeItActions } from "../pe-it.actions";
import { NgReduxFormModule } from "@angular-redux/form";
import { KeysModule } from "app/shared/pipes/keys.module";
import { RoleSetActions } from "../../../role-set/role-set.actions";
import { RoleActions } from "../../../role/role.actions";
import { StateCreatorService } from "../../../shared/state-creator.service";
import { RoleSetService } from "../../../shared/role-set.service";
import { RoleService } from "../../../shared/role.service";
import { ClassService } from "../../../shared/class.service";
import { PropertyService } from "../../../shared/property.service";
import { PeItService } from "../../../shared/pe-it.service";
import { TeEntService } from "../../../shared/te-ent.service";
import { EprService } from "../../../shared/epr.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TeEntActions } from "../../te-ent/te-ent.actions";
import { AppellationLabelTokenComponent } from "../../../value/appellation-ctrl/appellation-label-token/appellation-label-token.component";
import { AppellationLabelEditorComponent } from "../../../value/appellation-ctrl/appellation-label-editor/appellation-label-editor.component";
import { AppellationService } from "../../../shared/appellation.service";
import { InitStateModule } from "app/shared/components/init-state/init-state.module";


export default sandboxOf(PeItCreateFormComponent, {
  imports: [
    InitStateModule,
    NgReduxFormModule,
    KeysModule,
    BrowserAnimationsModule
  ],
  declarations: [
    PeItCreateCtrlComponent,
    PeItRoleSetCreateCtrlComponent,
    PeItRoleCreateCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntRoleSetCreateCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    AppellationCtrlComponent,
    AppellationLabelEditorComponent,
    AppellationLabelTokenComponent
  ],
  providers: [
    PeItActions,
    RoleSetActions,
    RoleActions,
    TeEntActions,
    RoleSetService,
    RoleService,
    ClassService,
    PropertyService,
    StateCreatorService,
    PeItService,
    TeEntService,
    EprService,
    AppellationService
  ]
})
  .add('PeIt Create Form | Person ', {
    context: {
      model: {},
      initState: {
        _peIt_create_form: mockPerson
      },
      basePath: ['_peIt_create_form']
    },
    template: `
    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
        <div style="width:430px;height:400px" class="d-flex">
                <gv-pe-it-create-form [basePath]="basePath"></gv-pe-it-create-form>
        </div>
    </div>
    
    
        `
  })



