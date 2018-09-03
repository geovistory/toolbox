import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';
import { ControlMessagesModule } from 'app/shared';
import { PassiveLinkModule } from 'app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SDKBrowserModule } from 'app/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElasticInputModule } from 'angular2-elastic-input';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ProjectSandboxModule } from 'app/shared/components/project-sandbox/project-sandbox.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { LoadingBarModule } from 'app/core/loading-bar/loading-bar.module';
import { AngularCesiumModule } from 'app/modules/gv-angular-cesium/angular-cesium-fork';
import { RouterModule } from '@angular/router';

PlaygroundModule
  .configure({
      selector: 'gv-root',
      overlay: false,
      modules: [
        SDKBrowserModule.forRoot(),
        NgbModule.forRoot(),
        ElasticInputModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        AngularCesiumModule.forRoot(),
        RouterModule.forRoot([]),
        BrowserModule,
        BrowserAnimationsModule,
        ControlMessagesModule,
        PassiveLinkModule,
        FormsModule,
        ReactiveFormsModule,
        ProjectSandboxModule,
        NgxJsonViewerModule,
        LoadingBarModule
      ]
  });

  Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
