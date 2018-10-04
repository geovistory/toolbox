import { provideReduxForms } from '@angular-redux/form';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createEpicMiddleware } from 'redux-observable';
import { ActiveProjectModule } from '../active-project/active-project.module';
import { RootEpics } from './epics';
import { INITIAL_STATE } from './initial-state';
// The top-level reducers and epics that make up our app's logic.
import { IAppState } from './model';
import { rootReducer } from './reducers';
import { equals } from 'ramda'

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
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    const bool = equals(actionPath, path);
    return bool;
}



@NgModule({
    imports: [
        NgReduxModule,
        NgReduxRouterModule,
        ActiveProjectModule
    ],
    providers: [
        NgReduxRouter,
        RootEpics
    ]
})
export class StoreModule {
    constructor(
        public ngRedux: NgRedux<IAppState>,
        devTools: DevToolsExtension,
        ngReduxRouter: NgReduxRouter,
        rootEpics: RootEpics
    ) {

        const epicMiddleware = createEpicMiddleware();

        // Tell Redux about our reducers and epics. If the Redux DevTools
        // chrome extension is available in the browser, tell Redux about
        // it too.
        ngRedux.configureStore(
            // RootReducer
            rootReducer,

            // Initial state
            INITIAL_STATE,

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


        // Enable syncing of Angular router state with our Redux store.
        if (ngReduxRouter) {
            ngReduxRouter.initialize();
        }

        // Enable syncing of Angular form state with our Redux store.
        provideReduxForms(ngRedux);
    }
}
