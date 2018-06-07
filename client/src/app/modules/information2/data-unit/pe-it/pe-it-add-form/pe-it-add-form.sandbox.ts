import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { KeysModule } from 'app/shared/pipes/keys.module';

import {
  PeItRoleSetAddCtrlComponent,
} from '../../../role-set/pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import { RoleSetActions } from '../../../role-set/role-set.actions';
import {
  TeEntRoleSetAddCtrlComponent,
} from '../../../role-set/te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { PeItRoleAddCtrlComponent } from '../../../role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { RoleActions } from '../../../role/role.actions';
import { TeEntRoleAddCtrlComponent } from '../../../role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import { AppellationService } from '../../../shared/appellation.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleService } from '../../../shared/role.service';
import { AppellationViewComponent } from '../../../value/appellation-view/appellation-view.component';
import { LanguageViewComponent } from '../../../value/language-view/language-view.component';
import { PeItEntityPreviewModule } from '../../../value/pe-it-entity-preview/pe-it-entity-preview.module';
import { TeEntAddCtrlComponent } from '../../te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntActions } from '../../te-ent/te-ent.actions';
import { PeItAddCtrlComponent } from '../pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItActions } from '../pe-it.actions';
import { PeItAddFormComponent } from './pe-it-add-form.component';

export default sandboxOf(PeItAddFormComponent, {
  imports: [
    InitPeItEditableStateModule,
    InitStateModule,
    KeysModule,
    BrowserAnimationsModule,
    PeItEntityPreviewModule,

  ],
  declarations: [
    PeItAddCtrlComponent,
    PeItRoleSetAddCtrlComponent,
    PeItRoleAddCtrlComponent,
    TeEntAddCtrlComponent,
    TeEntRoleSetAddCtrlComponent,
    TeEntRoleAddCtrlComponent,
    AppellationViewComponent,
    LanguageViewComponent,
  ],
  providers: [
    PeItActions,
    TeEntActions,
    RoleSetActions,
    RoleActions,
    RoleSetService,
    RoleService,
    // StateCreatorService,
    // ClassService,
    // PropertyService,
    // PeItService,
    // TeEntService,
    // EprService,
    AppellationService,
  ]
})
  .add('PeIt add form', {
    context: {
      basePath: ['_peIt_add_form'],
      pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
      pkEntity: 152831,
      state: {
        activeProject: {
          pk_project: -1 // use same pkProject
        } as Project,
        _peIt_add_form: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_add_form = $event"
    ></gv-init-pe-it-editable-state>

    <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_add_form">
      <div style="width:430px;height:400px" class="d-flex">

        <gv-init-state [initState]="state"></gv-init-state>

        <gv-pe-it-add-form [basePath]="basePath"></gv-pe-it-add-form>
        
      </div>
    </div>
    `
  })