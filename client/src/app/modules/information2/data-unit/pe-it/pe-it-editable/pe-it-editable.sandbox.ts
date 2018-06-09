import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitPeItEditableStateModule, LanguageSearchTypeaheadModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { KeysModule } from 'app/shared/pipes/keys.module';

import {
  PeItRoleSetAddCtrlComponent,
} from '../../../role-set/pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import {
  PeItRoleSetEditableComponent,
} from '../../../role-set/pe-it/pe-it-role-set-editable/pe-it-role-set-editable.component';
import { PeItRoleSetFormComponent } from '../../../role-set/pe-it/pe-it-role-set-form/pe-it-role-set-form.component';
import { RoleSetActions } from '../../../role-set/role-set.actions';
import {
  TeEntRoleSetAddCtrlComponent,
} from '../../../role-set/te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import {
  TeEntRoleSetCreateCtrlComponent,
} from '../../../role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component';
import {
  TeEntRoleSetEditableComponent,
} from '../../../role-set/te-ent/te-ent-role-set-editable/te-ent-role-set-editable.component';
import { PeItRoleAddCtrlComponent } from '../../../role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { PeItRoleCreateCtrlComponent } from '../../../role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { PeItRoleEditableComponent } from '../../../role/pe-it/pe-it-role-editable/pe-it-role-editable.component';
import { RoleActions } from '../../../role/role.actions';
import { TeEntRoleAddCtrlComponent } from '../../../role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import {
  TeEntRoleCreateCtrlComponent,
} from '../../../role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { TeEntRoleEditableComponent } from '../../../role/te-ent/te-ent-role-editable/te-ent-role-editable.component';
import { AppellationService } from '../../../shared/appellation.service';
import { ClassService } from '../../../shared/class.service';
import { EprService } from '../../../shared/epr.service';
import { PeItService } from '../../../shared/pe-it.service';
import { PropertyService } from '../../../shared/property.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleService } from '../../../shared/role.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { TeEntService } from '../../../shared/te-ent.service';
import { AppellationCtrlModule } from '../../../value/appellation-ctrl/appellation-ctrl.module';
import { AppellationViewComponent } from '../../../value/appellation-view/appellation-view.component';
import { LanguageViewComponent } from '../../../value/language-view/language-view.component';
import { LeafPeItViewModule } from '../../../value/leaf-pe-it-view/leaf-pe-it-view.module';
import { TeEntAddCtrlComponent } from '../../te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntCreateCtrlComponent } from '../../te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { TeEntEditableComponent } from '../../te-ent/te-ent-editable/te-ent-editable.component';
import { TeEntActions } from '../../te-ent/te-ent.actions';
import { PeItActions } from '../pe-it.actions';
import { PeItEditableComponent } from './pe-it-editable.component';
import { LanguageCtrlComponent } from '../../../value/language-ctrl/language-ctrl.component';

export default sandboxOf(PeItEditableComponent, {
  imports: [
    InitPeItEditableStateModule,
    InitStateModule,
    KeysModule,
    BrowserAnimationsModule,
    LeafPeItViewModule,
    AppellationCtrlModule,
    LanguageSearchTypeaheadModule
  ],
  declarations: [
    PeItRoleSetEditableComponent,
    PeItRoleEditableComponent,
    TeEntEditableComponent,
    TeEntRoleSetEditableComponent,
    TeEntRoleEditableComponent,
    AppellationViewComponent,
    LanguageViewComponent,
    PeItRoleSetFormComponent,
    TeEntRoleSetCreateCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    TeEntCreateCtrlComponent,
    PeItRoleCreateCtrlComponent,
    PeItRoleSetAddCtrlComponent,
    PeItRoleAddCtrlComponent,
    TeEntAddCtrlComponent,
    TeEntRoleSetAddCtrlComponent,
    TeEntRoleAddCtrlComponent,
    LanguageCtrlComponent

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
    AppellationService,
  ]
})
  .add('View ', {
    context: {
      basePath: ['_peIt_editable'],
      pkProject: 52,
      pkEntity: 152831,
      state: {
        activeProject: {
          pk_project: 52
        } as Project,
        _peIt_editable: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_editable = $event"
    ></gv-init-pe-it-editable-state>

    <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_editable">
      <div style="width:700px;height:400px" class="d-flex">

        <gv-init-state [initState]="state"></gv-init-state>

        <gv-pe-it-editable class="gv-flex-grow-1" [basePath]="basePath"></gv-pe-it-editable>

      </div>
    </div>
        `
  })