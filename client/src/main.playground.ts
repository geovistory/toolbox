import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCesiumModule } from 'angular-cesium';
import { PlaygroundModule } from 'angular-playground';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import { SDKBrowserModule, ValidationDirectivesModule } from 'app/core';
import { DatModule } from 'app/core/dat/dat.module';
import { DfhModule } from 'app/core/dfh/dfh.module';
import { InfModule } from 'app/core/inf/inf.module';
import { LoadingBarModule } from 'app/core/loading-bar/loading-bar.module';
import { NotificationsModule } from 'app/core/notifications/notifications.module';
import { ProModule } from 'app/core/pro/pro.module';
import { StoreModule } from 'app/core/store/module';
import { SysModule } from 'app/core/sys/sys.module';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { ExampleTableModule } from 'app/shared/components/core-table/example-table/example-table.module';
import { ProjectSandboxModule } from 'app/shared/components/project-sandbox/project-sandbox.module';
import { MccColorPickerModule } from 'material-community-components';
import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TreeviewModule } from 'ngx-treeview';

PlaygroundModule
  .configure({
    selector: 'gv-root',
    overlay: false,
    modules: [
      StoreModule,
      SysModule,
      InfModule,
      DatModule,
      DfhModule,
      ProModule,
      MatDialogModule,
      NotificationsModule,
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
      ValidationDirectivesModule,
    ]
  });



Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODVhZjMzNC04ODE1LTRhZTYtYWMwMS0wOWZhZjUyYjQ1YTIiLCJpZCI6MTYyODgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzAwOTE4NDR9.AKPArS_LoiwqgupddFnCqRoaq6IGA16MgzhSGZFlZ6c';

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
