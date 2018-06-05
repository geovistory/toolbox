import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);

// Third party imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElasticInputModule } from 'angular2-elastic-input';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

// Own imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { AuthGuard, ActiveAccountService, ActiveProjectService, SDKBrowserModule, EntityEditorService } from './core';
import { PassiveLinkModule } from './shared';
import { ControlMessagesModule, LanguageSearchTypeaheadModule } from './shared';
import { StoreModule } from './core/store/module';
import { InformationModule } from './modules/information/information.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { KeysModule } from './shared/pipes/keys.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgReduxRouterModule,
    NgReduxModule,
    StoreModule,
    SDKBrowserModule.forRoot(),
    NgbModule.forRoot(),
    ElasticInputModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProjectsModule,
    PassiveLinkModule,
    ControlMessagesModule,
    LanguageSearchTypeaheadModule,
    KeysModule
  ],
  providers: [
    EntityEditorService,
    ActiveAccountService,
    ActiveProjectService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'de-CH' }
  ],
  entryComponents: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
