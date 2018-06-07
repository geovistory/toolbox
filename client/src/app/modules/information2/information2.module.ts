import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeItRoleCreateCtrlComponent } from './role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { PeItRoleAddCtrlComponent } from './role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { PeItRoleEditableComponent } from './role/pe-it/pe-it-role-editable/pe-it-role-editable.component';
import { TeEntRoleCreateCtrlComponent } from './role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { TeEntRoleAddCtrlComponent } from './role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import { TeEntRoleEditableComponent } from './role/te-ent/te-ent-role-editable/te-ent-role-editable.component';
import { AppellationViewComponent } from './value/appellation-view/appellation-view.component';
import { AppellationCtrlComponent } from './value/appellation-ctrl/appellation-ctrl.component';
import { TeEntCreateCtrlComponent } from './data-unit/te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { TeEntAddCtrlComponent } from './data-unit/te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntEditableComponent } from './data-unit/te-ent/te-ent-editable/te-ent-editable.component';
import { PeItEditableComponent } from './data-unit/pe-it/pe-it-editable/pe-it-editable.component';
import { PeItAddCtrlComponent } from './data-unit/pe-it/pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItCreateCtrlComponent } from './data-unit/pe-it/pe-it-create-ctrl/pe-it-create-ctrl.component';
import { PeItCreateFormComponent } from './data-unit/pe-it/pe-it-create-form/pe-it-create-form.component';
import { PeItAddFormComponent } from './data-unit/pe-it/pe-it-add-form/pe-it-add-form.component';
import { PeItRoleSetCreateCtrlComponent } from './role-set/pe-it/pe-it-role-set-create-ctrl/pe-it-role-set-create-ctrl.component';
import { PeItRoleSetAddCtrlComponent } from './role-set/pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import { PeItRoleSetEditableComponent } from './role-set/pe-it/pe-it-role-set-editable/pe-it-role-set-editable.component';
import { PeItRoleSetFormComponent } from './role-set/pe-it/pe-it-role-set-form/pe-it-role-set-form.component';
import { TeEntRoleSetCreateCtrlComponent } from './role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component';
import { TeEntRoleSetAddCtrlComponent } from './role-set/te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { TeEntRoleSetEditableComponent } from './role-set/te-ent/te-ent-role-set-editable/te-ent-role-set-editable.component';
import { TeEntRoleSetFormComponent } from './role-set/te-ent/te-ent-role-set-form/te-ent-role-set-form.component';
import { LanguageViewComponent } from './value/language-view/language-view.component';
import { LanguageCtrlComponent } from './value/language-ctrl/language-ctrl.component';

@NgModule({
  imports: [
    CommonModule
  ],  
  declarations: [
    PeItRoleCreateCtrlComponent,
     PeItRoleAddCtrlComponent,
     PeItRoleEditableComponent,
     TeEntRoleCreateCtrlComponent,
     TeEntRoleAddCtrlComponent,
     TeEntRoleEditableComponent,
     PeItEditableComponent,
     PeItAddCtrlComponent,
     PeItCreateCtrlComponent,
     PeItCreateFormComponent,
     PeItAddFormComponent,
     PeItRoleSetCreateCtrlComponent,
     PeItRoleSetAddCtrlComponent,
     PeItRoleSetEditableComponent,
     PeItRoleSetFormComponent,
     TeEntRoleSetCreateCtrlComponent,
     TeEntRoleSetAddCtrlComponent,
     TeEntRoleSetEditableComponent,
     TeEntRoleSetFormComponent,
     AppellationViewComponent,
     AppellationCtrlComponent,
     TeEntCreateCtrlComponent,
     TeEntAddCtrlComponent,
     TeEntEditableComponent,
     LanguageViewComponent,
     LanguageCtrlComponent
    ]
})
export class Information2Module { }
