import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GvAuthService } from './auth.service';
import { Configuration } from '../sdk-lb4/configuration';
import { environment } from 'projects/app-toolbox/src/environments/environment';


export const lb4SdkConfigurationProvider = {
  provide: Configuration,
  useFactory: (authService: GvAuthService) => {
    const config = new Configuration(
      {
        apiKeys: {},
        basePath: environment.baseUrl,
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
