import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaygroundModule } from 'angular-playground';
import { ElasticInputModule } from 'angular2-elastic-input';
import { SDKBrowserModule, ValidationDirectivesModule } from 'app/core';
import { LoadingBarModule } from 'app/core/loading-bar/loading-bar.module';
import { NotificationsModule } from 'app/core/notifications/notifications.module';
import { StoreModule } from 'app/core/store/module';
import { AngularCesiumModule } from 'app/modules/gv-angular-cesium/angular-cesium-fork';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { ProjectSandboxModule } from 'app/shared/components/project-sandbox/project-sandbox.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TreeviewModule } from 'ngx-treeview';
import { DndModule } from 'ng2-dnd';
import { ExampleTableModule } from 'app/shared/components/core-table/example-table/example-table.module';
import { MccColorPickerModule } from 'material-community-components';
import { AngularSplitModule } from 'angular-split';

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
      TreeviewModule.forRoot(),
      DndModule.forRoot(),
      MccColorPickerModule.forRoot({
        used_colors: ['#000000', '#123456', '#777666']
      }),
      AngularSplitModule.forRoot(),
      NotificationsModule,
      StoreModule,
      BrowserModule,
      BrowserAnimationsModule,
      ControlMessagesModule,
      PassiveLinkModule,
      FormsModule,
      ReactiveFormsModule,
      ProjectSandboxModule,
      NgxJsonViewerModule,
      LoadingBarModule,
      ExampleTableModule,
      ValidationDirectivesModule
    ]
  });

Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
