import { LOCALE_ID, enableProdMode, importProvidersFrom } from '@angular/core';

// import { Ion, buildModuleUrl } from 'cesium';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { StateModule } from '@kleiolab/lib-redux';
import { Configuration } from '@kleiolab/lib-sdk-lb4';
import { SOCKETS_CONFIG, SocketsConfig } from '@kleiolab/lib-sockets';
import { SocketIoConfig } from 'ngx-socket-io';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/pages/root/root.routes';
import { ActiveAccountService } from './app/services/active-account.service';
import { AuthGuard } from './app/services/auth-guard.service';
import { GvAuthService } from './app/services/auth.service';
import { CookiesModule } from './app/services/cookies.module';
import { SystemAdminGuard } from './app/services/system-admin-guard.service';
import { environment } from './environments/environment';

const socketsConfig: SocketsConfig = { baseUrl: environment.apiUrl, options: { autoConnect: true } };
const socketIoConfig: SocketIoConfig = { url: environment.apiUrl, options: {} };
const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

export const lb4SdkConfigurationProvider = {
  provide: Configuration,
  useFactory: (authService: GvAuthService) => {
    const config = new Configuration(
      {
        apiKeys: {},
        basePath: environment.apiUrl,
        accessToken: authService.getToken().lb4Token,
        credentials: { accesstoken: authService.getToken().lb4Token }
      })
    return authService.setLb4SdkConfig(config)
  },
  deps: [GvAuthService],
  multi: false
}

if (environment.production) {
  enableProdMode();
}

// buildModuleUrl.setBaseUrl('/assets/cesium/')
// buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line
// Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODVhZjMzNC04ODE1LTRhZTYtYWMwMS0wOWZhZjUyYjQ1YTIiLCJpZCI6MTYyODgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzAwOTE4NDR9.AKPArS_LoiwqgupddFnCqRoaq6IGA16MgzhSGZFlZ6c';

bootstrapApplication(AppComponent, {
  providers: [
    MessageService,
    importProvidersFrom(
      // angular modules
      // CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,
      // MaterialModule,
      // // other thid party modules
      // AngularSplitModule,
      CookiesModule.forRoot(),
      //  DndModule.forRoot(),
      // // ??
      // SocketsModule, SocketIoModule.forRoot(socketIoConfig),
      // // @kleiolab/lib-* modules
      StateModule,
      // // own modules (@kleiolab/app-toolbox)
      // UserFeedbackModule,
      //  BasicModule,
      //  ProjectsModule,
      //  BackofficeModule,
      //  AccountModule,
      //  ValidationDirectivesModule,
      //  ClassDropdownModule,
      //  CommentMenuModule,
    ),
    ActiveAccountService,
    AuthGuard,
    GvAuthService,
    SystemAdminGuard,
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: SOCKETS_CONFIG,
      useValue: socketsConfig
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    lb4SdkConfigurationProvider,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES)
  ]
});
