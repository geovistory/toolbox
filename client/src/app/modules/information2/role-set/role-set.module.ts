import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PeItRoleSetAddCtrlComponent } from './pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import { PeItRoleSetCreateCtrlComponent } from './pe-it/pe-it-role-set-create-ctrl/pe-it-role-set-create-ctrl.component';
import { PeItRoleSetEditableComponent } from './pe-it/pe-it-role-set-editable/pe-it-role-set-editable.component';
import { PeItRoleSetFormComponent } from './pe-it/pe-it-role-set-form/pe-it-role-set-form.component';
import { RoleSetActions } from './role-set.actions';
import { TeEntRoleSetAddCtrlComponent } from './te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { TeEntRoleSetCreateCtrlComponent } from './te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component';
import { TeEntRoleSetEditableComponent } from './te-ent/te-ent-role-set-editable/te-ent-role-set-editable.component';
import { TeEntRoleSetFormComponent } from './te-ent/te-ent-role-set-form/te-ent-role-set-form.component';
import { KeysModule } from 'app/shared/pipes/keys.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        KeysModule
    ],
    declarations: [
        PeItRoleSetAddCtrlComponent,
        PeItRoleSetCreateCtrlComponent,
        PeItRoleSetEditableComponent,
        PeItRoleSetFormComponent,
        TeEntRoleSetAddCtrlComponent,
        TeEntRoleSetCreateCtrlComponent,
        TeEntRoleSetEditableComponent,
        TeEntRoleSetFormComponent
    ],
    providers: [
        RoleSetActions
    ],
    exports: [
    ]
})
export class RoleSetModule { }
