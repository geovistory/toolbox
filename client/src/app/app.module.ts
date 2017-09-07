import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Third party imports
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Own imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SDKBrowserModule } from './shared/sdk/index';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginComponent,
    EmailVerifiedComponent,
    UserDashboardComponent,
    LogoutConfirmationComponent,
    RequestPasswordResetComponent,
    ResetPasswordComponent,
    EqualValidatorDirective,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectSettingsProfileComponent,
    ProjectSettingsComponent,
    ProjectSettingsCollaboratorsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    ActiveAccountService,
    AuthGuard
  ],
  entryComponents : [ AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
