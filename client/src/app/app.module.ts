import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { NamingComponent } from './naming/naming.component';
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
import { NameAddComponent } from './name-add/name-add.component';
import { EntityAddChooseClassComponent } from './entity-add-choose-class/entity-add-choose-class.component';
import { EntityAddSearchExistingComponent } from './entity-add-search-existing/entity-add-search-existing.component';
import { EntityAddCreateNewComponent } from './entity-add-create-new/entity-add-create-new.component';
import { EntityAddModalService } from './shared/services/entity-add-modal.service';
import { EntityAddAddExistingComponent } from './entity-add-add-existing/entity-add-add-existing.component';
import { GvNameVisiblePipe } from './shared/pipes/gv-name-visible.pipe';
import { EntityEditorComponent } from './entity-editor/entity.editor.component';
import { LanguageSearchTypeaheadComponent } from './language-search-typeahead/language-search-typeahead.component';
import { AppellationService } from './shared/services/appellation.service';
import { NamePartsViewComponent } from './name-parts-view/name-parts-view.component';
import { NamePartTypeEditComponent } from './name-part-type-edit/name-part-type-edit.component';
import { NamePartStringEditComponent } from './name-part-string-edit/name-part-string-edit.component';
import { PassiveLinkDirective } from './passive-link.directive';
import { VersionModalComponent } from './version-modal/version-modal.component';
import { PeItService } from './shared/services/pe-it.service';

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
    NamingComponent,
    NameComponent,
    NamePartTypeEditComponent,
    NamePartStringEditComponent,
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
    NameAddComponent,
    PropertyPipe,
    EntityAddChooseClassComponent,
    EntityAddSearchExistingComponent,
    EntityAddCreateNewComponent,
    EntityAddAddExistingComponent,
    GvNameVisiblePipe,
    LanguageSearchTypeaheadComponent,
    NamePartsViewComponent,
    PassiveLinkDirective,
    VersionModalComponent
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
    EntityAddModalService,
    AppellationService,
    AuthGuard,
    PropertyPipe,
    PeItService,
    { provide: LOCALE_ID, useValue: 'ch-DE' }
  ],
  entryComponents : [
    AppComponent,
    EntityAddModalComponent,
    VersionModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
