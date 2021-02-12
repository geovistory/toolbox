// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { Inject, InjectionToken, NgModule } from '@angular/core';
import { equals } from 'ramda';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { IAppState } from './root/models';
import { RootEpics } from './root/root-epics';
import { rootReducer } from './root/root-reducer';
import { AccountActions, ActiveProjectActions, LoadingBarActions, NotificationsAPIActions } from './state-gui/actions';
import { AccountEpics, ActiveProjectEpics, LoadingBarEpics, NotificationsAPIEpics } from './state-gui/epics';
import { DatActions, DfhActions, InfActions, ProActions, SysActions, TabActions, WarActions } from './state-schema/actions';
import { DatEpics, DfhEpics, InfEpics, ProEpics, SysEpics, TabEpics, WarEpics } from './state-schema/epics';
import { SchemaActionsFactory, SchemaObjectService } from './state-schema/_helpers';




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

@NgModule({
  imports: [
    NgReduxModule,
  ],
  providers: [

    AccountActions,
    ActiveProjectActions,
    LoadingBarActions,
    NotificationsAPIActions,

    AccountEpics,
    ActiveProjectEpics,
    LoadingBarEpics,
    NotificationsAPIEpics,


    DatActions,
    DfhActions,
    InfActions,
    ProActions,
    SysActions,
    TabActions,
    WarActions,

    DatEpics,
    DfhEpics,
    InfEpics,
    ProEpics,
    SysEpics,
    TabEpics,
    WarEpics,

    RootEpics,
    SchemaActionsFactory,
    SchemaObjectService,
    { provide: APP_INITIAL_STATE, useValue: {} }
  ]
})
export class ReduxStoreModule {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    // ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics,
    @Inject(APP_INITIAL_STATE) initialState: IAppState
  ) {

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
        // createLogger(),
        epicMiddleware,
        dynamicMiddlewares,
      ],
      // Enhancers
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );

    // Apply rootEpic
    epicMiddleware.run(rootEpics.getRootEpic());


    // // Enable syncing of Angular router state with our Redux store.
    // if (ngReduxRouter) {
    //     ngReduxRouter.initialize();
    // }

    // Enable syncing of Angular form state with our Redux store.
    // provideReduxForms(ngRedux);
  }
}
