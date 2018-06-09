import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeItRoleAddCtrlComponent } from './pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { PeItRoleCreateCtrlComponent } from './pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { PeItRoleEditableComponent } from './pe-it/pe-it-role-editable/pe-it-role-editable.component';
import { TeEntRoleAddCtrlComponent } from './te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import { TeEntRoleCreateCtrlComponent } from './te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { TeEntRoleEditableComponent } from './te-ent/te-ent-role-editable/te-ent-role-editable.component';
import { RoleActions } from './role.actions';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PeItRoleAddCtrlComponent,
        PeItRoleCreateCtrlComponent,
        PeItRoleEditableComponent,
        TeEntRoleAddCtrlComponent,
        TeEntRoleCreateCtrlComponent,
        TeEntRoleEditableComponent,
    ],
    providers: [
        RoleActions
    ],
    exports: [

    ]
})
export class RoleModule { }
