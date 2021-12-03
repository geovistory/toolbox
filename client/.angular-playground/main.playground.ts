import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReduxQueriesModule } from '@kleiolab/lib-queries';
import { ReduxModule } from '@kleiolab/lib-redux';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCesiumModule } from 'angular-cesium';
import { PlaygroundModule } from 'angular-playground';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import { buildModuleUrl, Ion } from 'cesium';
import { DndModule } from 'ng2-dnd';
import { SocketIoModule } from 'ngx-socket-io';
import { BasicModule } from '../projects/app-toolbox/src/app/core/basic/basic.module';
import { CookiesModule } from '../projects/app-toolbox/src/app/core/cookies/cookies.module';
import { MaterialModule } from '../projects/app-toolbox/src/app/core/material/material.module';
import { NotificationsModule } from '../projects/app-toolbox/src/app/core/notifications/notifications.module';
import { RepoModule } from '../projects/app-toolbox/src/app/core/repo/repo.module';
import { ValidationDirectivesModule } from '../projects/app-toolbox/src/app/core/validation/validation.directives';
import { AccountModule } from '../projects/app-toolbox/src/app/modules/account/account.module';
import { BackofficeModule } from '../projects/app-toolbox/src/app/modules/backoffice/backoffice.module';
import { ProjectsModule } from '../projects/app-toolbox/src/app/modules/projects/projects.module';
import { UserFeedbackModule } from '../projects/app-toolbox/src/app/modules/user-feedback/user-feedback.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from '../projects/app-toolbox/src/app/shared';
import { LoadingBarModule } from '../projects/app-toolbox/src/app/shared/components/loading-bar/loading-bar.module';
import { KeysModule } from '../projects/app-toolbox/src/app/shared/pipes/keys.module';
import { SandboxesDefined } from './sandboxes';

buildModuleUrl.setBaseUrl('/assets/cesium/') // If youre using Cesium version >= 1.42.0 add this line
// Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/');
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODVhZjMzNC04ODE1LTRhZTYtYWMwMS0wOWZhZjUyYjQ1YTIiLCJpZCI6MTYyODgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzAwOTE4NDR9.AKPArS_LoiwqgupddFnCqRoaq6IGA16MgzhSGZFlZ6c';


@NgModule()
export class MatIconRegistryModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/assets/mdi/mdi.svg'));
    matIconRegistry.addSvgIconSetInNamespace('gv', domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/assets/gv-icons.svg'));
  }
}

platformBrowserDynamic().bootstrapModule(PlaygroundModule
  .configure({
    selector: 'gv-root',
    overlay: false,
    modules: [
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
      NgbModule,
      AngularCesiumModule.forRoot(),
      ElasticInputModule.forRoot(),
      DndModule.forRoot(),
      AngularSplitModule.forRoot(),
      // MccColorPickerModule.forRoot({}),
      CookiesModule.forRoot(),

      // only needed in playground
      MatIconRegistryModule,


      // ??
      SocketsModule,
      SocketIoModule.forRoot({ url: '' }),

      // @kleiolab/lib-* modules
      SdkLb3Module, // .forRoot(),
      SdkLb4Module,
      ReduxModule, // .forRoot(),
      ReduxQueriesModule,
      NotificationsModule,

      // own modules (@kleiolab/app-toolbox)
      // AppRoutingModule,
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
      LoadingBarModule
    ],
    sandboxesDefined: SandboxesDefined
  }))
  .catch(err => console.error(err));
