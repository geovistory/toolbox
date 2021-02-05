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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import { ProModule } from 'app/core/pro/pro.module';
import { environment } from 'environments/environment';
import 'hammerjs';
import { MccColorPickerModule } from 'material-community-components';
import { DndModule } from 'ng2-dnd';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TreeviewModule } from 'ngx-treeview';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from 'app/core/auth/auth-guard.service';
import { ActiveAccountService } from "app/core/active-account";
import { SystemAdminGuard } from 'app/core/auth/system-admin-guard.service';
import { BasicModule } from 'app/core/basic/basic.module';
import { DatModule } from 'app/core/dat/dat.module';
import { InfModule } from 'app/core/inf/inf.module';
import { LoadingBarModule } from 'app/core/loading-bar/loading-bar.module';
import { MaterialModule } from 'app/core/material/material.module';
import { NotificationsModule } from 'app/core/notifications/notifications.module';
import { RepoModule } from 'app/core/repo/repo.module';
import { ReduxStoreModule } from 'app/core/redux-store/redux-store.module';
import { SysModule } from 'app/core/sys/sys.module';
import { AccountModule } from './modules/account/account.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UserFeedbackModule } from './modules/user-feedback/user-feedback.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from './shared';
import { KeysModule } from './shared/pipes/keys.module';
import { WarModule } from 'app/core/war/war.module';
import { ApiModule } from 'app/core/sdk-lb4/api.module';
import { CookiesModule } from 'app/core/cookies/cookies.module';
import { GvAuthService } from 'app/core/auth/auth.service';
import { Configuration, ConfigurationParameters } from 'app/core/sdk-lb4/configuration';
import { lb4SdkConfigurationProvider } from 'app/core/auth/auth.module';
import { SocketsModule } from 'app/core/sockets/sockets.module';
import { TabModule } from 'app/core/tab/tab.module';
import { ReduxQueriesModule } from 'app/core/redux-queries/redux-queries.module';
import { LoopBackConfig, SDKBrowserModule } from './core/sdk';
import { ValidationDirectivesModule } from './core/validation/validation.directives';

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
