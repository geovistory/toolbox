import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry, MatSliderModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCesiumModule } from 'angular-cesium';
import { PlaygroundModule } from 'angular-playground';
import { AngularSplitModule } from 'angular-split';
import { ElasticInputModule } from 'angular2-elastic-input';
import { AuthModule } from 'projects/app-toolbox/src/app/core/auth/auth.module';
import { DatModule } from 'projects/app-toolbox/src/app/core/dat/dat.module';
import { DfhModule } from 'projects/app-toolbox/src/app/core/dfh/dfh.module';
import { InfModule } from 'projects/app-toolbox/src/app/core/inf/inf.module';
import { LoadingBarModule } from 'projects/app-toolbox/src/app/core/loading-bar/loading-bar.module';
import { NotificationsModule } from 'projects/app-toolbox/src/app/core/notifications/notifications.module';
import { ProModule } from 'projects/app-toolbox/src/app/core/pro/pro.module';
import { ReduxStoreModule } from 'projects/app-toolbox/src/app/core/redux-store/redux-store.module';
import { SysModule } from 'projects/app-toolbox/src/app/core/sys/sys.module';
import { WarModule } from 'projects/app-toolbox/src/app/core/war/war.module';
import { FormFactoryModule } from 'projects/app-toolbox/src/app/modules/form-factory/form-factory.module';
import { ControlMessagesModule, PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { ChecklistControlModule } from 'projects/app-toolbox/src/app/shared/components/checklist-control/checklist-control.module';
import { ExampleTableModule } from 'projects/app-toolbox/src/app/shared/components/core-table/example-table/example-table.module';
import { ProjectSandboxModule } from 'projects/app-toolbox/src/app/shared/components/project-sandbox/project-sandbox.module';
import { buildModuleUrl } from 'cesium';
import 'hammerjs';
import { MccColorPickerModule } from 'material-community-components';
import { DndModule } from 'ng2-dnd';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { TreeviewModule } from 'ngx-treeview';
import { CookiesModule } from 'projects/app-toolbox/src/app/core/cookies/cookies.module';
import { EntityLabelConfigModule } from 'projects/app-toolbox/src/app/shared/modules/entity-label-config/entity-label-config.module';
import { TabModule } from 'projects/app-toolbox/src/app/core/tab/tab.module';
import { SocketsModule } from 'projects/app-toolbox/src/app/core/sockets/sockets.module';
import { SDKBrowserModule } from '@kleiolab/lib-sdk-lb3';
import { ValidationDirectivesModule } from 'projects/app-toolbox/src/app/core/validation/validation.directives';


@NgModule()
export class MatIconRegistryModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/assets/mdi/mdi.svg'));
  }
}


PlaygroundModule
  .configure({
    selector: 'gv-root',
    overlay: false,
    modules: [
      ReduxStoreModule,
      SysModule,
      InfModule,
      DatModule,
      DfhModule,
      ProModule,
      WarModule,
      TabModule,
      FormFactoryModule,
      MatDialogModule,
      MatSliderModule, // needed because of https://github.com/angular/components/issues/4278
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
      HttpClientModule,
      MatIconRegistryModule,
      ChecklistControlModule,
      CookiesModule.forRoot(),
      AuthModule,
      EntityLabelConfigModule,
      SocketsModule
    ]
  });


buildModuleUrl.setBaseUrl('/assets/cesium/')
Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODVhZjMzNC04ODE1LTRhZTYtYWMwMS0wOWZhZjUyYjQ1YTIiLCJpZCI6MTYyODgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzAwOTE4NDR9.AKPArS_LoiwqgupddFnCqRoaq6IGA16MgzhSGZFlZ6c';

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
