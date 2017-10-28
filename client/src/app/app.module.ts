import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Third party imports
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ElasticInputModule} from 'angular2-elastic-input';

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
import { NamePartComponent } from './name-part/name-part.component';
import { NamePartInputComponent } from './name-part-input/name-part-input.component';
import { ProjectEditPanelComponent } from './project-edit-panel/project-edit-panel.component';
import { EntityComponent } from './entity/entity.component';
import { ProjectSourcesComponent } from './project-sources/project-sources.component';
import { SourceComponent } from './source/source.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountPasswordComponent } from './account-password/account-password.component';
import { AccountEmailComponent } from './account-email/account-email.component';
import { AccountComponent } from './account/account.component';
import { ProjectSettingsDataComponent } from './project-settings-data/project-settings-data.component';
import { EntityCreateModalComponent } from './entity-create-modal/entity-create-modal.component';
import { ActiveProjectService } from './shared/services/active-project.service';

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
    NamePartComponent,
    NamePartInputComponent,
    ProjectEditPanelComponent,
    EntityComponent,
    ProjectSourcesComponent,
    SourceComponent,
    AccountProfileComponent,
    AccountPasswordComponent,
    AccountEmailComponent,
    AccountComponent,
    ProjectSettingsDataComponent,
    EntityCreateModalComponent
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
    ElasticInputModule.forRoot()
  ],
  providers: [
    ActiveAccountService,
    ActiveProjectService,
    AuthGuard
  ],
  entryComponents : [
    AppComponent,
    EntityCreateModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
