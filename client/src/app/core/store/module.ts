import { NgModule } from '@angular/core';

// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';

// Redux ecosystem stuff.
import { createLogger } from 'redux-logger';

// The top-level reducers and epics that make up our app's logic.
import { IAppState } from './model';
import { rootReducer } from './reducers';
// import { RootEpics } from './epics';
import { INITIAL_STATE } from './initial-state';
import { ActiveProjectActions } from '../active-project/active-project.action';


@NgModule({
    imports: [NgReduxModule, NgReduxRouterModule],
    providers: [ NgReduxRouter, ActiveProjectActions]
})
export class StoreModule {
    constructor(
        public ngRedux: NgRedux<IAppState>,
        devTools: DevToolsExtension,
        ngReduxRouter: NgReduxRouter,
        // rootEpics: RootEpics, // TEMP_REDUX
    ) {
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
                createLogger(),
                //   ...rootEpics.createEpics() // TEMP_REDUX
            ],
            // Enhancers
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );

        // Enable syncing of Angular router state with our Redux store.
        if (ngReduxRouter) {
            ngReduxRouter.initialize();
        }

        // Enable syncing of Angular form state with our Redux store.
        provideReduxForms(ngRedux);
    }
}
