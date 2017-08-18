import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    EqualValidatorDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [],
  entryComponents : [ AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
