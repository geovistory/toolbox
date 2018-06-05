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
import { PeItSanboxStoreModule } from "../pe-it.sandbox.store";
import { PeItCreateCtrlComponent } from "../pe-it-create-ctrl/pe-it-create-ctrl.component";
import { PeItActions } from "../pe-it.actions";
import { NgReduxFormModule } from "@angular-redux/form";



export default sandboxOf(PeItCreateFormComponent, {
  imports: [
    PeItSanboxStoreModule,
    NgReduxFormModule
  ],
  declarations: [
    PeItCreateCtrlComponent,
    PeItRoleSetCreateCtrlComponent,
    PeItRoleCreateCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntRoleSetCreateCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    AppellationCtrlComponent
  ],
  providers: [
    PeItActions
  ]
})
  .add('PeIt Create | Person ', {
    context: {
      initState: mockPerson,
      parentPath: ''
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-pe-it-create-form [initState]="initState" [parentPath]="parentPath"></gv-pe-it-create-form>
      </div>
    </div>
        `
  })



