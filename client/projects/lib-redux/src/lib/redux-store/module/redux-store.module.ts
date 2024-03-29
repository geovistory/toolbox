// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { Inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { Configuration, ConfigurationParameters, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { equals } from 'ramda';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { IAppState } from '../root/models/model';
import { RootEpics } from '../root/root-epics';
import { rootReducer } from '../root/root-reducer';



/**
 * Function to use in combination with rxjs/operator .filter()
 * in order to get only actions dispached with a fractalkey
 * equal to the provided path.
 *
 * example:
 * pipe(
 *    filter(action => ofSubstore(c.basePath)(action)),
 *    ofType('Foo')
 * )
 * @param path
 */
export const ofSubstore = (path: string[]) => (action): boolean => {
  if (!('@angular-redux::fractalkey' in action)) return false;

  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
  const bool = equals(actionPath, path);
  return bool;
}

export const APP_INITIAL_STATE = new InjectionToken<IAppState>('app.INITIAL_STATE');

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
  imports: [
    NgReduxModule,
  ],
  providers: [

  ]
})
export class ReduxModule {


  constructor(
    public ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    rootEpics: RootEpics,
    @Optional() @SkipSelf() parentModule?: ReduxModule,
    @Optional() sdkLb4?: SdkLb4Module,
    @Optional() @Inject(APP_INITIAL_STATE) initialState?: IAppState
  ) {
    const errors: string[] = []
    if (parentModule) errors.push('ReduxModule is already loaded. Import in your base AppModule only.');
    if (!sdkLb4) errors.push('You need to import the SdkLb4Module in your AppModule!');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!initialState) initialState = {}

    const epicMiddleware = createEpicMiddleware();

    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    ngRedux.configureStore(
      // RootReducer
      rootReducer,

      // Initial state
      initialState,

      // Middleware
      [
        epicMiddleware,
        dynamicMiddlewares,
      ],
      // Enhancers
      devTools.isEnabled()
        ? [devTools.enhancer({ trace: true })] : []
    );

    // Apply rootEpic
    epicMiddleware.run(rootEpics.getRootEpic());


  }
}
