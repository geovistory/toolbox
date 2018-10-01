import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElasticInputModule } from 'angular2-elastic-input';
import { ActiveProjectEpics } from 'app/core/active-project/active-project.epics';
import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveAccountService, ActiveProjectService, AuthGuard, EntityEditorService, SDKBrowserModule } from './core';
import { LoadingBarModule } from './core/loading-bar/loading-bar.module';
import { NotificationsModule } from './core/notifications/notifications.module';
import { StoreModule } from './core/store/module';
import { AdminModule } from './modules/admin/admin.module';
import { AngularCesiumModule } from './modules/gv-angular-cesium/angular-cesium-fork';
import { ProjectsModule } from './modules/projects/projects.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from './shared';
import { KeysModule } from './shared/pipes/keys.module';


registerLocaleData(localeDeCh);

// Third party imports
// Own imports
@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    NgReduxRouterModule,
    NgReduxModule,
    StoreModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot(),
    ElasticInputModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    AngularCesiumModule.forRoot(),
    DndModule.forRoot(),
    NotificationsModule,
    LoadingBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProjectsModule,
    AdminModule,
    PassiveLinkModule,
    ControlMessagesModule,
    LanguageSearchTypeaheadModule,
    KeysModule,
  ],
  providers: [
    EntityEditorService,
    ActiveAccountService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'de-CH' }
  ],
  entryComponents: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
