import { Inject, InjectionToken, isDevMode, NgModule, Optional, SkipSelf } from '@angular/core';
import { Configuration, ConfigurationParameters, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
    SocketsModule,
    SdkLb4Module,
    UiModule,
    DataModule,
    StoreModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectOutsideZone: true }),
    EffectsModule.forRoot(StateEffects),
  ],
})
export class StateModule {


  constructor(
    @Optional() @SkipSelf() parentModule?: StateModule,
    @Optional() @Inject(APP_INITIAL_STATE) initialState?: IAppState
  ) {
    const errors: string[] = []
    if (parentModule) errors.push('StateModule is already loaded. Import in your base AppModule only.');
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
