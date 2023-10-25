import { Inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { Configuration, ConfigurationParameters, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataModule } from './data/data.module';
import { StateEffects } from './state.effects';
import { IAppState } from './state.model';
import { UiModule } from './ui/ui.module';

export const APP_INITIAL_STATE = new InjectionToken<IAppState>('app.INITIAL_STATE');

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
  imports: [
    UiModule,
    DataModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(StateEffects),
    SocketsModule
  ],
  providers: []
})
export class StateModule {


  constructor(
    @Optional() @SkipSelf() parentModule?: StateModule,
    @Optional() sdkLb4?: SdkLb4Module,
    @Optional() @Inject(APP_INITIAL_STATE) initialState?: IAppState
  ) {
    const errors: string[] = []
    if (parentModule) errors.push('StateModule is already loaded. Import in your base AppModule only.');
    if (!sdkLb4) errors.push('You need to import the SdkLb4Module in your AppModule!');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!initialState) initialState = {
      ui: {
        account: {},
        activeProject: {},
        loadingBar: {},
        notifications: []
      },
      data: {}
    }

  }
}
