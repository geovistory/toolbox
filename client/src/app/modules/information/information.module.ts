import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third party imports

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElasticInputModule } from 'angular2-elastic-input';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// Core services

import { SDKBrowserModule, ValidationService, IAppState } from 'app/core';

// Shared components and directives
import { ControlMessagesModule, LanguageSearchTypeaheadModule } from 'app/shared';
import { PassiveLinkModule } from 'app/shared';

// This modules components
import { AppellationLabelCreateComponent } from './components/appellation-label-create/appellation-label-create.component';
import { AppellationLabelEditorComponent } from './components/appellation-label-editor/appellation-label-editor.component';
import { AppellationLabelTokenComponent } from './components/appellation-label-token/appellation-label-token.component';
import { AppellationLabelViewComponent } from './components/appellation-label-view/appellation-label-view.component';
import { DfhIdComponent } from './components/dfh-id/dfh-id.component';
import { EntityAddAddExistingComponent } from './components/entity-add-add-existing/entity-add-add-existing.component';
import { EntityAddChooseClassComponent } from './components/entity-add-choose-class/entity-add-choose-class.component';
import { EntityAddCreateNewComponent } from './components/entity-add-create-new/entity-add-create-new.component';
import { EntityAddModalComponent } from './components/entity-add-modal/entity-add-modal.component';
import { EntityAddSearchExistingComponent } from './components/entity-add-search-existing/entity-add-search-existing.component';
import { EntityEditorSettingsComponent } from './components/entity-editor-settings/entity-editor-settings.component';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { ExistenceTimeComponent } from './components/existence-time/existence-time.component';
import { AppellationComponent } from './components/appellation/appellation.component';
import { PeItEntityAddComponent } from './components/pe-it-entity-add/pe-it-entity-add.component';
import { PeItEntityPreviewComponent } from './components/pe-it-entity-preview/pe-it-entity-preview.component';
import { PeItEntityPreviewModalComponent } from './components/pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';
import { PeItLanguageComponent } from './components/pe-it-language/pe-it-language.component';
import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { PeItRoleSetComponent } from './components/pe-it-role-set/pe-it-role-set.component';
import { TeEntRoleSetComponent } from './components/te-ent-role-set/te-ent-role-set.component';
import { PeItRoleComponent } from './components/pe-it-role/pe-it-role.component';
import { TeEntRoleComponent } from './components/te-ent-role/te-ent-role.component';
import { TeEntComponent } from './components/te-ent/te-ent.component';
import { TimePrimitiveComponent } from './components/time-primitive/time-primitive.component';
import { VersionModalComponent } from './components/version-modal/version-modal.component';
import { InformationRoutingModule } from './information-routing.module';
import { FieldsetComponent, FieldsetBeginComponent, FieldsetEndComponent, FieldsetInnerComponent, FieldsetOuterComponent, FieldComponent } from './components/existence-time';
import { TeEntExistenceTimeComponent } from './components/te-ent-existence-time/te-ent-existence-time.component';

// This modules pipes
import { PropertyPipe } from './shared/property.pipe';

// This modules services
import { EntityAddModalService } from './shared/entity-add-modal.service';
import { PeItService } from './shared/pe-it.service';
import { ActivePeItService } from './shared/active-pe-it.service';
import { UtilitiesService } from './shared/utilities.service';
import { ClassService } from './shared/class.service';
import { PropertyService } from './shared/property.service';
import { RoleService } from './shared/role.service';
import { EprService } from './shared/epr.service';
import { AppellationService } from './shared/appellation.service';
import { TeEntService } from './shared/te-ent.service';
import { ConfigService } from './shared/config.service';
import { TimelineModule } from '../timeline/timeline.module';
import { PeItTimelineComponent } from './components/pe-it-timeline/pe-it-timeline.component';
import { EntityEditorComponent } from './containers/entity-editor/entity.editor.component';
import { EntityEditorActions } from './containers/entity-editor/entity-editor.actions';
import { PeItActions } from './containers/pe-it/pe-it.actions';
import { PeItComponent } from './containers/pe-it/pe-it.component';
import { NgRedux } from '@angular-redux/store';
import { IAppStateWithInformation } from './api/information.model';
import { KeysPipe } from '../../shared/pipes/keys.pipe';
import { RoleSetActions } from './components/role-set/role-set.actions';
import { RoleActions } from './components/role/role.actions';
import { RoleSetListActions } from './components/role-set-list/role-set-list-actions';
import { TeEntActions } from './components/te-ent/te-ent.actions';
import { RoleSetListService } from './shared/role-set-list.service';
import { RoleSetService } from './shared/role-set.service';
import { PeItRoleService } from './shared/pe-it-role.service';
import { StateCreatorService } from './shared/state-creator.service';
import { StateToDataService } from './shared/state-to-data.service';
import { EntityAddExistingActions } from './components/entity-add-add-existing/entity-add-add-existing.actions';
import { EntityCreateNewActions } from './components/entity-add-create-new/entity-add-create-new.actions';
import { CreatePeItFormComponent } from './components/create-pe-it-form/create-pe-it-form.component';
import { NgReduxFormModule } from '@angular-redux/form';


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

    //Own reusable components
    LanguageSearchTypeaheadModule,
    ControlMessagesModule,
    PassiveLinkModule,
    TimelineModule

  ],
  declarations: [
    EntityEditorComponent,
    AppellationLabelCreateComponent,
    AppellationLabelEditorComponent,
    AppellationLabelTokenComponent,
    AppellationLabelViewComponent,
    DfhIdComponent,
    EntityAddAddExistingComponent,
    EntityAddChooseClassComponent,
    EntityAddCreateNewComponent,
    EntityAddModalComponent,
    EntityAddSearchExistingComponent,
    EntityEditorSettingsComponent,
    EntitySearchHitComponent,
    ExistenceTimeComponent,
    PeItComponent,
    AppellationComponent,
    PeItEntityAddComponent,
    PeItEntityPreviewComponent,
    PeItEntityPreviewModalComponent,
    PeItLanguageComponent,
    ProjectEntitiesComponent,
    PeItRoleSetComponent,
    TeEntRoleSetComponent,
    PeItRoleComponent,
    TeEntRoleComponent,
    TeEntComponent,
    TimePrimitiveComponent,
    VersionModalComponent,
    FieldsetComponent,
    FieldsetBeginComponent,
    FieldsetEndComponent,
    FieldsetInnerComponent,
    FieldsetOuterComponent,
    FieldComponent,
    TeEntExistenceTimeComponent,
    PropertyPipe,
    PeItTimelineComponent,
    KeysPipe,
    CreatePeItFormComponent
  ],
  providers: [
    RoleSetListActions,
    PropertyPipe,
    EntityAddModalService,
    UtilitiesService,
    PeItService,
    ActivePeItService,
    ClassService,
    PropertyService,
    RoleService,
    ValidationService,
    EprService,
    AppellationService,
    ConfigService,
    RoleSetListService,
    RoleSetService,
    PeItActions,
    EntityEditorActions,
    PeItRoleService,
    RoleSetActions,
    RoleActions,
    TeEntActions,
    TeEntService,
    StateCreatorService,
    StateToDataService,
    EntityAddExistingActions,
    EntityCreateNewActions
  ],
  entryComponents: [
    EntityAddModalComponent,
    PeItEntityPreviewModalComponent
  ],
})
export class InformationModule {
}
