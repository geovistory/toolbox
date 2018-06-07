import { NgModule } from '@angular/core';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeItEntityPreviewModule } from '../../../value/leaf-pe-it-view/leaf-pe-it-view.module';
import { PeItAddCtrlComponent } from '../pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItRoleSetAddCtrlComponent } from '../../../role-set/pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import { PeItRoleAddCtrlComponent } from '../../../role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { TeEntAddCtrlComponent } from '../../te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntRoleSetAddCtrlComponent } from '../../../role-set/te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { TeEntRoleAddCtrlComponent } from '../../../role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import { AppellationViewComponent } from '../../../value/appellation-view/appellation-view.component';
import { LanguageViewComponent } from '../../../value/language-view/language-view.component';
import { PeItActions } from '../pe-it.actions';
import { TeEntActions } from '../../te-ent/te-ent.actions';
import { RoleSetActions } from '../../../role-set/role-set.actions';
import { RoleActions } from '../../../role/role.actions';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleService } from '../../../shared/role.service';
import { AppellationService } from '../../../shared/appellation.service';
import { PeItAddFormComponent } from './pe-it-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        KeysModule,
        BrowserAnimationsModule,
        PeItEntityPreviewModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PeItAddFormComponent,
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
        AppellationService,
    ],
    exports:[
        PeItAddFormComponent
    ]
})
export class PeItAddFormModule { }
