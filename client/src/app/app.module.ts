import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';

registerLocaleData(localeDeCh);

// Third party imports
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ElasticInputModule} from 'angular2-elastic-input';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

// Own imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SDKBrowserModule } from './shared/sdk/index';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EqualValidatorDirective } from './shared/validator-equal.directive';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectSettingsProfileComponent } from './project-settings-profile/project-settings-profile.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { ProjectSettingsCollaboratorsComponent } from './project-settings-collaborators/project-settings-collaborators.component';
import { ActiveAccountService } from './shared/services/active-account.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectEntitiesComponent } from './project-entities/project-entities.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { NameComponent } from './name/name.component';
import { ProjectEditPanelComponent } from './project-edit-panel/project-edit-panel.component';
import { ProjectSourcesComponent } from './project-sources/project-sources.component';
import { SourceComponent } from './source/source.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountPasswordComponent } from './account-password/account-password.component';
import { AccountEmailComponent } from './account-email/account-email.component';
import { AccountComponent } from './account/account.component';
import { ProjectSettingsDataComponent } from './project-settings-data/project-settings-data.component';
import { EntityAddModalComponent } from './entity-add-modal/entity-add-modal.component';
import { ActiveProjectService } from './shared/services/active-project.service';
import { EntitySearchHitComponent } from './entity-search-hit/entity-search-hit.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PropertyPipe } from './shared/pipes/property';
import { LanguageComponent } from './language/language.component';
import { EntityAddChooseClassComponent } from './entity-add-choose-class/entity-add-choose-class.component';
import { EntityAddSearchExistingComponent } from './entity-add-search-existing/entity-add-search-existing.component';
import { EntityAddCreateNewComponent } from './entity-add-create-new/entity-add-create-new.component';
import { EntityAddModalService } from './shared/services/entity-add-modal.service';
import { EntityAddAddExistingComponent } from './entity-add-add-existing/entity-add-add-existing.component';
import { GvNameVisiblePipe } from './shared/pipes/gv-name-visible.pipe';
import { EntityEditorComponent } from './entity-editor/entity.editor.component';
import { LanguageSearchTypeaheadComponent } from './language-search-typeahead/language-search-typeahead.component';
import { AppellationService } from './shared/services/appellation.service';
import { AppellationLabelTokenComponent } from './appellation-label-token/appellation-label-token.component';
import { PassiveLinkDirective } from './passive-link.directive';
import { VersionModalComponent } from './version-modal/version-modal.component';
import { PeItService } from './shared/services/pe-it.service';
import { PeItComponent } from './pe-it/pe-it.component';
import { PeItEntityComponent } from './pe-it-entity/pe-it-entity.component';
import { TeEntComponent } from './te-ent/te-ent.component';
import { PeItAppellationComponent } from './pe-it-appellation/pe-it-appellation.component';
import { PeItLanguageComponent } from './pe-it-language/pe-it-language.component';
import { ActivePeItService } from './shared/services/active-pe-it.service';
import { RoleService } from './shared/services/role.service';
import { EprService } from './shared/services/epr.service';
import { UtilitiesService } from './shared/services/utilities.service';
import { PropertyService } from './shared/services/property.service';
import { ClassService } from './shared/services/class.service';
import { EntityEditorService } from './shared/services/entity-editor.service';
import { AppellationLabelEditComponent } from './appellation-label-edit/appellation-label-edit.component';
import { AppellationLabelViewComponent } from './appellation-label-view/appellation-label-view.component';
import { AppellationLabelCreateComponent } from './appellation-label-create/appellation-label-create.component';
import { AppellationLabelEditorComponent } from './appellation-label-editor/appellation-label-editor.component';
import { EntityEditorSettingsComponent } from './entity-editor-settings/entity-editor-settings.component';
import { DfhIdComponent } from './dfh-id/dfh-id.component';
import { PeItEntityPreviewComponent } from './pe-it-entity-preview/pe-it-entity-preview.component';
import { PropSectionOfTeEntComponent } from './prop-section-of-te-ent/prop-section-of-te-ent.component';
import { PropSectionOfPeItComponent } from './prop-section-of-pe-it/prop-section-of-pe-it.component';
import { RoleOfTeEntComponent } from './role-of-te-ent/role-of-te-ent.component';
import { RoleOfPeItComponent } from './role-of-pe-it/role-of-pe-it.component';
import { PropSectionListOfPeItComponent } from './prop-section-list-of-pe-it/prop-section-list-of-pe-it.component';
import { PeItEntityPreviewModalComponent } from './pe-it-entity-preview-modal/pe-it-entity-preview-modal.component';
import { PeItEntityAddComponent } from './pe-it-entity-add/pe-it-entity-add.component';
import { PropertySectionForDatesComponent } from './property-section-for-dates/property-section-for-dates.component';
import { RoleToDateComponent } from './role-to-date/role-to-date.component';
import { TimePrimitiveComponent } from './time-primitive/time-primitive.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ValidationService } from './shared/services/validation.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginComponent,
    EmailVerifiedComponent,
    LogoutConfirmationComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent,
    EqualValidatorDirective,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectSettingsProfileComponent,
    ProjectSettingsComponent,
    ProjectSettingsCollaboratorsComponent,
    ProjectDashboardComponent,
    ProjectEntitiesComponent,
    ProjectEditComponent,
    NameComponent,
    AppellationLabelTokenComponent,
    ProjectEditPanelComponent,
    EntityEditorComponent,
    ProjectSourcesComponent,
    SourceComponent,
    AccountProfileComponent,
    AccountPasswordComponent,
    AccountEmailComponent,
    AccountComponent,
    ProjectSettingsDataComponent,
    EntityAddModalComponent,
    EntitySearchHitComponent,
    LoadingSpinnerComponent,
    LanguageComponent,
    PropertyPipe,
    EntityAddChooseClassComponent,
    EntityAddSearchExistingComponent,
    EntityAddCreateNewComponent,
    EntityAddAddExistingComponent,
    GvNameVisiblePipe,
    LanguageSearchTypeaheadComponent,
    AppellationLabelViewComponent,
    PassiveLinkDirective,
    VersionModalComponent,
    PeItComponent,
    PeItEntityComponent,
    TeEntComponent,
    PeItAppellationComponent,
    PeItLanguageComponent,
    AppellationLabelEditComponent,
    AppellationLabelCreateComponent,
    AppellationLabelEditorComponent,
    EntityEditorSettingsComponent,
    DfhIdComponent,
    PeItEntityPreviewComponent,
    PropSectionOfTeEntComponent,
    PropSectionOfPeItComponent,
    RoleOfTeEntComponent,
    RoleOfPeItComponent,
    PropSectionListOfPeItComponent,
    PeItEntityPreviewModalComponent,
    PeItEntityAddComponent,
    PropertySectionForDatesComponent,
    RoleToDateComponent,
    TimePrimitiveComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot(),
    ElasticInputModule.forRoot(),
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    ActiveAccountService,
    ActiveProjectService,
    ActivePeItService,
    EntityAddModalService,
    AppellationService,
    AuthGuard,
    PropertyPipe,
    PeItService,
    RoleService,
    EprService,
    PropertyService,
    ClassService,
    UtilitiesService,
    EntityEditorService,
    ValidationService,
    { provide: LOCALE_ID, useValue: 'de-CH' }
  ],
  entryComponents : [
    AppComponent,
    EntityAddModalComponent,
    VersionModalComponent,
    PeItEntityPreviewModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
