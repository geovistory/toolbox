import { NgReduxFormConnectModule } from '@angular-redux/form';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysModule } from 'app/shared/pipes/keys.module';

import { RoleSetActions } from '../../../role-set/role-set.actions';
import { RoleActions } from '../../../role/role.actions';
import { AppellationService } from '../../../shared/appellation.service';
import { RoleSetService } from '../../../shared/role-set.service';
import { RoleService } from '../../../shared/role.service';
import { LeafPeItViewModule } from '../../../value/leaf-pe-it-view/leaf-pe-it-view.module';
import { TeEntActions } from '../../te-ent/te-ent.actions';
import { PeItActions } from '../pe-it.actions';
import { PeItAddFormComponent } from './pe-it-add-form.component';

@NgModule({
    imports: [
        CommonModule,
        KeysModule,
        LeafPeItViewModule,
        FormsModule,
        ReactiveFormsModule,
        NgReduxFormConnectModule
    ],
    declarations: [
        PeItAddFormComponent,
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
