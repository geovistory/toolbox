import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDeCh from '@angular/common/locales/de-CH';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateModule } from '@kleiolab/lib-redux';
import { SOCKETS_CONFIG, SocketsConfig, SocketsModule } from '@kleiolab/lib-sockets';
import { DndModule } from '@suez/ngx-dnd';
import { AngularSplitModule } from 'angular-split';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveAccountService } from './core/active-account';
import { AuthGuard } from './core/auth/auth-guard.service';
import { lb4SdkConfigurationProvider } from './core/auth/auth.module';
import { GvAuthService } from './core/auth/auth.service';
import { SystemAdminGuard } from './core/auth/system-admin-guard.service';
import { BasicModule } from './core/basic/basic.module';
import { CookiesModule } from './core/cookies/cookies.module';
import { MatIconRegistryModule } from './core/material/material-icon-registry.module';
import { MaterialModule } from './core/material/material.module';
import { NotificationModule } from './core/notifications/notifications.module';
import { ValidationDirectivesModule } from './core/validation/validation.directives';
import { AccountModule } from './modules/account/account.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UserFeedbackModule } from './modules/user-feedback/user-feedback.module';
import { ControlMessagesModule, PassiveLinkModule } from './shared';
import { ClassDropdownModule } from './shared/components/class-dropdown/class-dropdown.module';
import { CommentMenuModule } from './shared/components/comment-menu/comment-menu.module';
import { LoadingBarModule } from './shared/components/loading-bar/loading-bar.module';
import { KeysModule } from './shared/pipes/keys.module';

// TODO: check if this can stay.
const socketIoConfig: SocketIoConfig = { url: environment.apiUrl, options: {} };
const socketsConfig: SocketsConfig = { baseUrl: environment.apiUrl, options: { autoConnect: true } };

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

registerLocaleData(localeDeCh);

// Third party imports
// Own imports
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // angular modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatIconRegistryModule,



    // other thid party modules
    AngularSplitModule,
    CookiesModule.forRoot(),
    DndModule.forRoot(),


    // ??
    SocketsModule,
    SocketIoModule.forRoot(socketIoConfig),

    // @kleiolab/lib-* modules
    StateModule,

    // own modules (@kleiolab/app-toolbox)
    AppRoutingModule,
    BasicModule,
    ProjectsModule,
    BackofficeModule,
    PassiveLinkModule,
    ControlMessagesModule,
    KeysModule,
    AccountModule,
    ValidationDirectivesModule,
    UserFeedbackModule,
    LoadingBarModule,
    ClassDropdownModule,
    CommentMenuModule,
    NotificationModule
  ],
  providers: [
    ActiveAccountService,
    AuthGuard,
    GvAuthService,
    SystemAdminGuard,

    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: SOCKETS_CONFIG,
      useValue: socketsConfig
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    lb4SdkConfigurationProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}