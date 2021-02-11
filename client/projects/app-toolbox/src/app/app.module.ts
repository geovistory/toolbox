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
import { LoopBackConfig, SDKBrowserModule } from '@kleiolab/lib-sdk-lb3';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import 'hammerjs';
import { MccColorPickerModule } from 'material-community-components';
import { DndModule } from 'ng2-dnd';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TreeviewModule } from 'ngx-treeview';
import { ActiveAccountService } from "projects/app-toolbox/src/app/core/active-account";
import { AuthGuard } from 'projects/app-toolbox/src/app/core/auth/auth-guard.service';
import { lb4SdkConfigurationProvider } from 'projects/app-toolbox/src/app/core/auth/auth.module';
import { GvAuthService } from 'projects/app-toolbox/src/app/core/auth/auth.service';
import { SystemAdminGuard } from 'projects/app-toolbox/src/app/core/auth/system-admin-guard.service';
import { BasicModule } from 'projects/app-toolbox/src/app/core/basic/basic.module';
import { CookiesModule } from 'projects/app-toolbox/src/app/core/cookies/cookies.module';
import { DatModule } from 'projects/app-toolbox/src/app/core/dat/dat.module';
import { InfModule } from 'projects/app-toolbox/src/app/core/inf/inf.module';
import { LoadingBarModule } from 'projects/app-toolbox/src/app/core/loading-bar/loading-bar.module';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { NotificationsModule } from 'projects/app-toolbox/src/app/core/notifications/notifications.module';
import { ProModule } from 'projects/app-toolbox/src/app/core/pro/pro.module';
import { ReduxQueriesModule } from 'projects/app-toolbox/src/app/core/redux-queries/redux-queries.module';
import { ReduxStoreModule } from 'projects/app-toolbox/src/app/core/redux-store/redux-store.module';
import { RepoModule } from 'projects/app-toolbox/src/app/core/repo/repo.module';
import { ApiModule } from 'projects/app-toolbox/src/app/core/sdk-lb4/api.module';
import { SocketsModule } from 'projects/app-toolbox/src/app/core/sockets/sockets.module';
import { SysModule } from 'projects/app-toolbox/src/app/core/sys/sys.module';
import { TabModule } from 'projects/app-toolbox/src/app/core/tab/tab.module';
import { WarModule } from 'projects/app-toolbox/src/app/core/war/war.module';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidationDirectivesModule } from './core/validation/validation.directives';
import { AccountModule } from './modules/account/account.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UserFeedbackModule } from './modules/user-feedback/user-feedback.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from './shared';
import { KeysModule } from './shared/pipes/keys.module';

// TODO: check if this can stay.
const socketConfig: SocketIoConfig = { url: environment.baseUrl, options: {} };

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
    BasicModule,
    ReduxStoreModule,
    ReduxQueriesModule,
    NotificationsModule,
    LoadingBarModule,
    SysModule,
    InfModule,
    DatModule,
    ProModule,
    WarModule,
    TabModule,
    RepoModule,
    NgReduxRouterModule,
    NgReduxModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot(),
    ElasticInputModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    AngularCesiumModule.forRoot(),
    DndModule.forRoot(),
    TreeviewModule.forRoot(),
    SocketIoModule.forRoot(socketConfig),
    AngularSplitModule.forRoot(),
    MccColorPickerModule.forRoot({}),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProjectsModule,
    BackofficeModule,
    PassiveLinkModule,
    ControlMessagesModule,
    LanguageSearchTypeaheadModule,
    KeysModule,
    AccountModule,
    ValidationDirectivesModule,
    UserFeedbackModule,
    HttpClientModule,
    MaterialModule,
    ApiModule,
    CookiesModule.forRoot(),
    SocketsModule
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
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.baseUrl + '/assets/mdi/mdi.svg'));
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }
}
