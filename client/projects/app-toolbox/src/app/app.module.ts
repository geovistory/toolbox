import { NgReduxModule } from '@angular-redux/store';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDeCh from '@angular/common/locales/de-CH';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReduxQueriesModule } from '@kleiolab/lib-queries';
import { ReduxModule } from '@kleiolab/lib-redux';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsConfig, SocketsModule, SOCKETS_CONFIG } from '@kleiolab/lib-sockets';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ActiveAccountService } from 'projects/app-toolbox/src/app/core/active-account';
import { AuthGuard } from 'projects/app-toolbox/src/app/core/auth/auth-guard.service';
import { GvAuthService } from 'projects/app-toolbox/src/app/core/auth/auth.service';
import { SystemAdminGuard } from 'projects/app-toolbox/src/app/core/auth/system-admin-guard.service';
import { BasicModule } from 'projects/app-toolbox/src/app/core/basic/basic.module';
import { CookiesModule } from 'projects/app-toolbox/src/app/core/cookies/cookies.module';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { RepoModule } from 'projects/app-toolbox/src/app/core/repo/repo.module';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { lb4SdkConfigurationProvider } from './core/auth/auth.module';
import { NotificationsModule } from './core/notifications/notifications.module';
import { ValidationDirectivesModule } from './core/validation/validation.directives';
import { AccountModule } from './modules/account/account.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UserFeedbackModule } from './modules/user-feedback/user-feedback.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from './shared';
import { ClassDropdownModule } from './shared/components/class-dropdown/class-dropdown.module';
import { CommentMenuModule } from './shared/components/comment-menu/comment-menu.module';
import { LoadingBarModule } from './shared/components/loading-bar/loading-bar.module';
import { KeysModule } from './shared/pipes/keys.module';

// TODO: check if this can stay.
const socketIoConfig: SocketIoConfig = { url: environment.apiUrl, options: {} };
const socketsConfig: SocketsConfig = { baseUrl: environment.apiUrl, options: { autoConnect: true } };

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'standard'
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



    // other thid party modules
    NgReduxModule,
    NgbModule,
    ElasticInputModule.forRoot(),
    AngularSplitModule.forRoot(),
    CookiesModule.forRoot(),


    // ??
    SocketsModule,
    SocketIoModule.forRoot(socketIoConfig),

    // @kleiolab/lib-* modules
    SdkLb4Module,
    ReduxModule, // .forRoot(),
    ReduxQueriesModule,
    NotificationsModule,

    // own modules (@kleiolab/app-toolbox)
    AppRoutingModule,
    BasicModule,
    RepoModule,
    ProjectsModule,
    BackofficeModule,
    PassiveLinkModule,
    ControlMessagesModule,
    LanguageSearchTypeaheadModule,
    KeysModule,
    AccountModule,
    ValidationDirectivesModule,
    UserFeedbackModule,
    LoadingBarModule,
    ClassDropdownModule,
    CommentMenuModule
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
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsUrl + '/assets/mdi/mdi.svg'));
    matIconRegistry.addSvgIconSetInNamespace('gv', domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsUrl + '/assets/gv-icons.svg'));
  }
}
