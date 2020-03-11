import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDeCh from '@angular/common/locales/de-CH';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ActiveAccountService, AuthGuard, EntityEditorService, LoopBackConfig, SDKBrowserModule, ValidationDirectivesModule } from './core';
import { SystemAdminGuard } from './core/auth/system-admin-guard.service';
import { BasicModule } from './core/basic/basic.module';
import { DatModule } from './core/dat/dat.module';
import { InfModule } from './core/inf/inf.module';
import { LoadingBarModule } from './core/loading-bar/loading-bar.module';
import { NotificationsModule } from './core/notifications/notifications.module';
import { RepoModule } from './core/repo/repo.module';
import { StoreModule } from './core/store/module';
import { SysModule } from './core/sys/sys.module';
import { AccountModule } from './modules/account/account.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UserFeedbackModule } from './modules/user-feedback/user-feedback.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from './shared';
import { KeysModule } from './shared/pipes/keys.module';
import { GestureConfig } from "../gesture-config";

// const spy = create()
// spy.unplug(spy.find(CyclePlugin));
// spy.unplug(spy.find(GraphPlugin));
// spy.plug(
//   new GraphPlugin({ keptDuration: -1 }),
// );

// TODO: check if this can stay.
const socketConfig: SocketIoConfig = { url: environment.baseUrl, options: {} };

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'standard'
};

registerLocaleData(localeDeCh);

// Third party imports
// Own imports
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent
  ],
  imports: [
    BasicModule,
    StoreModule,
    NotificationsModule,
    LoadingBarModule,
    SysModule,
    InfModule,
    DatModule,
    ProModule,
    RepoModule,
    NgReduxRouterModule,
    NgReduxModule,
    SDKBrowserModule.forRoot(),
    NgbModule,
    ElasticInputModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
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
    MatButtonModule,
    MatIconModule,
    UserFeedbackModule,
    HttpClientModule,
    HammerModule
  ],
  providers: [
    EntityEditorService,
    ActiveAccountService,
    AuthGuard,
    SystemAdminGuard,
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }

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
