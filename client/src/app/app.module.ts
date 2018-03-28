import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';

registerLocaleData(localeDeCh);

// Third party imports
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ElasticInputModule} from 'angular2-elastic-input';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

// Own imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { AuthGuard, ActiveAccountService, ActiveProjectService, SDKBrowserModule, EntityEditorService } from './core';
import { PassiveLinkModule } from './shared';
import { ControlMessagesModule, LanguageSearchTypeaheadModule } from './shared';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    HomeModule,
    PassiveLinkModule,
    ControlMessagesModule,
    LanguageSearchTypeaheadModule
  ],
  providers: [
    EntityEditorService,
    ActiveAccountService,
    ActiveProjectService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'de-CH' }
  ],
  entryComponents : [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
