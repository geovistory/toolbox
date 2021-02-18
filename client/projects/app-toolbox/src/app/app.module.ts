import { NgReduxRouterModule } from '@angular-redux/router';
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
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { ReduxQueriesModule } from '@kleiolab/lib-queries';
import { ReduxModule } from '@kleiolab/lib-redux';
import { LoopBackConfig, SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsConfig, SocketsModule } from '@kleiolab/lib-sockets';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import 'hammerjs';
import { MccColorPickerModule } from 'material-community-components';
import { DndModule } from 'ng2-dnd';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TreeviewModule } from 'ngx-treeview';
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
import { KeysModule } from './shared/pipes/keys.module';

// TODO: check if this can stay.
const socketIoConfig: SocketIoConfig = { url: environment.baseUrl, options: {} };
const socketsConfig: SocketsConfig = { baseUrl: environment.baseUrl };

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'standard'
};

registerLocaleData(localeDeCh);

export const APP_MODULE_DECORATOR = {
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
    NgReduxRouterModule,
    NgReduxModule,
    NgbModule.forRoot(),
    AngularCesiumModule.forRoot(),
    ElasticInputModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    DndModule.forRoot(),
    TreeviewModule.forRoot(),
    AngularSplitModule.forRoot(),
    MccColorPickerModule.forRoot({}),
    CookiesModule.forRoot(),


    // ??
    SocketsModule.forRoot(socketsConfig),
    SocketIoModule.forRoot(socketIoConfig),

    // @kleiolab/lib-* modules
    SdkLb3Module.forRoot(),
    SdkLb4Module,
    ReduxModule.forRoot(),
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

  ],
  providers: [
    ActiveAccountService,
    AuthGuard,
    GvAuthService,
    SystemAdminGuard,
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    lb4SdkConfigurationProvider
  ],
  entryComponents: [
    AppComponent
  ],
  bootstrap: [AppComponent]
}


// Third party imports
// Own imports
@NgModule(APP_MODULE_DECORATOR)
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.baseUrl + '/assets/mdi/mdi.svg'));
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }
}
