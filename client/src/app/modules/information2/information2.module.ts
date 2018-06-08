import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
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
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { TestComponent } from './test/test.component';
import { InformationRoutingModule } from './information-routing.module';
import { EntityEditorComponent } from './containers/entity-editor/entity.editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxFormModule } from '@angular-redux/form';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageSearchTypeaheadModule, ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { TimelineModule } from 'app/modules/timeline/timeline.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { EntityAddModalModule } from './add-modal/entity-add-modal.module';
import { EntitySearchHitModule } from './components/entity-search-hit/entity-search-hit.module';
import { PeItService } from './shared/pe-it.service';
import { TeEntService } from './shared/te-ent.service';
import { ClassService } from './shared/class.service';
import { PropertyService } from './shared/property.service';
import { RoleService } from './shared/role.service';
import { EprService } from './shared/epr.service';
import { RoleSetService } from './shared/role-set.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,

    NgReduxFormModule,
    SlimLoadingBarModule,
    NgbModule,
    // ElasticInputModule,

    // SDKBrowserModule,
    InformationRoutingModule,

    //App wide reusable components
    LanguageSearchTypeaheadModule,
    ControlMessagesModule,
    PassiveLinkModule,
    TimelineModule,
    KeysModule,

    // Sub-Modules
    EntityAddModalModule,

    // Module wide reusable components
    EntitySearchHitModule

  ],
  declarations: [
    ProjectEntitiesComponent,
    EntityEditorComponent,
    TestComponent,
  ],
  providers: [
    PeItService,
    TeEntService,
    ClassService,
    PropertyService,
    RoleService,
    EprService,
    RoleSetService,
  ]
})
export class Information2Module { }
