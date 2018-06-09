import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeItAddCtrlComponent } from './pe-it/pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItCreateCtrlComponent } from './pe-it/pe-it-create-ctrl/pe-it-create-ctrl.component';
import { PeItEditableComponent } from './pe-it/pe-it-editable/pe-it-editable.component';
import { PeItAddFormComponent } from './pe-it/pe-it-add-form/pe-it-add-form.component';
import { PeItCreateFormComponent } from './pe-it/pe-it-create-form/pe-it-create-form.component';
import { PeItActions } from './pe-it/pe-it.actions';
import { TeEntAddCtrlComponent } from './te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntCreateCtrlComponent } from './te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { TeEntEditableComponent } from './te-ent/te-ent-editable/te-ent-editable.component';
import { TeEntActions } from './te-ent/te-ent.actions';
import { RoleSetModule } from '../role-set/role-set.module';
import { RoleModule } from '../role/role.module';
import { ValueModule } from '../value/value.module';

@NgModule({
  imports: [
    CommonModule,
    RoleSetModule,
    RoleModule,
    ValueModule
  ],
  declarations: [
    PeItAddCtrlComponent,
    PeItCreateCtrlComponent,
    PeItEditableComponent,
    PeItAddFormComponent,
    PeItCreateFormComponent,

    TeEntAddCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntEditableComponent,
  ],
  providers: [
      PeItActions,
      
      TeEntActions,
  ],
  exports:[
        
  ]
})
export class DataUnitModule { }
