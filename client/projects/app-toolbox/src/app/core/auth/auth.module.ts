import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Configuration } from "@kleiolab/lib-sdk-lb4";
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { GvAuthService } from './auth.service';


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

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GvAuthService,
    lb4SdkConfigurationProvider
  ]
})
export class AuthModule { }
