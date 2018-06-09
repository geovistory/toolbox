import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { KeysModule } from 'app/shared/pipes/keys.module';

import {
    PeItRoleSetEditableComponent,
} from '../../../role-set/pe-it/pe-it-role-set-editable/pe-it-role-set-editable.component';
import { RoleSetActions } from '../../../role-set/role-set.actions';
import {
    TeEntRoleSetEditableComponent,
} from '../../../role-set/te-ent/te-ent-role-set-editable/te-ent-role-set-editable.component';
import { PeItRoleEditableComponent } from '../../../role/pe-it/pe-it-role-editable/pe-it-role-editable.component';
import { RoleActions } from '../../../role/role.actions';
import { TeEntRoleEditableComponent } from '../../../role/te-ent/te-ent-role-editable/te-ent-role-editable.component';
import { ClassService } from '../../../shared/class.service';
import { EprService } from '../../../shared/epr.service';
import { PeItService } from '../../../shared/pe-it.service';
import { PropertyService } from '../../../shared/property.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleService } from '../../../shared/role.service';
import { StateCreatorService } from '../../../shared/state-creator.service';
import { TeEntService } from '../../../shared/te-ent.service';
import { TeEntEditableComponent } from '../../te-ent/te-ent-editable/te-ent-editable.component';
import { TeEntActions } from '../../te-ent/te-ent.actions';
import { PeItActions } from '../pe-it.actions';
import { AppellationViewComponent } from '../../../value/appellation-view/appellation-view.component';
import { AppellationService } from '../../../shared/appellation.service';
import { LanguageViewComponent } from '../../../value/language-view/language-view.component';
import { LeafPeItViewComponent } from '../../../value/leaf-pe-it-view/leaf-pe-it-view.component';
import { PeItEntityPreviewModule } from '../../../value/leaf-pe-it-view/leaf-pe-it-view.module';
import { PeItRoleSetFormComponent } from '../../../role-set/pe-it/pe-it-role-set-form/pe-it-role-set-form.component';
import { TeEntRoleSetCreateCtrlComponent } from '../../../role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component';
import { TeEntRoleCreateCtrlComponent } from '../../../role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { TeEntCreateCtrlComponent } from '../../te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { PeItRoleCreateCtrlComponent } from '../../../role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { AppellationCtrlModule } from '../../../value/appellation-ctrl/appellation-ctrl.module';
import { PeItAddCtrlComponent } from '../pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItRoleSetAddCtrlComponent } from '../../../role-set/pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import { PeItRoleAddCtrlComponent } from '../../../role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { TeEntAddCtrlComponent } from '../../te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntRoleSetAddCtrlComponent } from '../../../role-set/te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { TeEntRoleAddCtrlComponent } from '../../../role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';

export default sandboxOf(PeItAddCtrlComponent, {
    imports: [
        InitPeItEditableStateModule,
        InitStateModule,
        KeysModule,
        BrowserAnimationsModule,
        PeItEntityPreviewModule,

    ],
    declarations: [
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
            model: {},
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
        
                <form #f="ngForm">
                    <gv-pe-it-add-ctrl [basePath]="basePath"
                        name="val" [(ngModel)]="model.val" #val="ngModel" required>
                    </gv-pe-it-add-ctrl>
                </form>     
                
            </div>


            <div style="height:500px; overflow:scroll;">
                <p>Form.valid: {{f?.valid | json}}</p>

                <p>Form.touched: {{f?.touched | json}}</p>

                <p>Form.dirty: {{f?.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f?.value | json}}
                </pre>

            </div>

        </div>


    `
    })
