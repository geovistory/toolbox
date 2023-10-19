import { Inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { Configuration, ConfigurationParameters, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateEffects } from './state.effects';
import { IAppState } from './state.model';
import { AccountEpics } from './ui/epics/account.epics';
import { ActiveProjectEpics } from './ui/epics/active-project.epics';
import { NotificationsAPIEpics } from './ui/epics/notifications.epics';

export const APP_INITIAL_STATE = new InjectionToken<IAppState>('app.INITIAL_STATE');

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
  imports: [
    StoreModule.forRoot(),
    EffectsModule.forRoot(
      NotificationsAPIEpics,
      ActiveProjectEpics,
      AccountEpics,
      // important: this needs to be the last epic
      StateEffects)
  ],
  providers: [

  ]
})
export class StateModule {


  constructor(
    @Optional() @SkipSelf() parentModule?: StateModule,
    @Optional() sdkLb4?: SdkLb4Module,
    @Optional() @Inject(APP_INITIAL_STATE) initialState?: IAppState
  ) {
    const errors: string[] = []
    if (parentModule) errors.push('ReduxModule is already loaded. Import in your base AppModule only.');
    if (!sdkLb4) errors.push('You need to import the SdkLb4Module in your AppModule!');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!initialState) initialState = {}

  }
}
