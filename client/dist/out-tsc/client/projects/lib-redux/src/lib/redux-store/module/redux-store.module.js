import * as tslib_1 from "tslib";
// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { NgReduxModule } from '@angular-redux/store';
import { Inject, InjectionToken, NgModule } from '@angular/core';
import { equals } from 'ramda';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { RootEpics } from '../root/root-epics';
import { rootReducer } from '../root/root-reducer';
import { AccountActions } from '../state-gui/actions/account.actions';
import { ActiveProjectActions } from '../state-gui/actions/active-project.action';
import { LoadingBarActions } from '../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../state-gui/actions/notifications.actions';
import { AccountEpics } from '../state-gui/epics/account.epics';
import { ActiveProjectEpics } from '../state-gui/epics/active-project.epics';
import { LoadingBarEpics } from '../state-gui/epics/loading-bar.epics';
import { NotificationsAPIEpics } from '../state-gui/epics/notifications.epics';
import { DatActions } from '../state-schema/actions/dat.actions';
import { DfhActions } from '../state-schema/actions/dfh.actions';
import { InfActions } from '../state-schema/actions/inf.actions';
import { ProActions } from '../state-schema/actions/pro.actions';
import { SysActions } from '../state-schema/actions/sys.actions';
import { TabActions } from '../state-schema/actions/tab.actions';
import { WarActions } from '../state-schema/actions/war.actions';
import { DatEpics } from '../state-schema/epics/dat.epics';
import { DfhEpics } from '../state-schema/epics/dfh.epics';
import { InfEpics } from '../state-schema/epics/inf.epics';
import { ProEpics } from '../state-schema/epics/pro.epics';
import { SysEpics } from '../state-schema/epics/sys.epics';
import { TabEpics } from '../state-schema/epics/tab.epics';
import { WarEpics } from '../state-schema/epics/war.epics';
import { SchemaActionsFactory } from '../state-schema/_helpers/schema-actions-factory';
import { SchemaObjectService } from '../state-schema/services/schema-object.service';
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
export const ofSubstore = (path) => (action) => {
    if (!('@angular-redux::fractalkey' in action))
        return false;
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    const bool = equals(actionPath, path);
    return bool;
};
export const APP_INITIAL_STATE = new InjectionToken('app.INITIAL_STATE');
let ReduxStoreModule = class ReduxStoreModule {
    constructor(ngRedux, devTools, 
    // ngReduxRouter: NgReduxRouter,
    rootEpics, initialState) {
        this.ngRedux = ngRedux;
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
        devTools.isEnabled() ? [devTools.enhancer()] : []);
        // Apply rootEpic
        epicMiddleware.run(rootEpics.getRootEpic());
        // // Enable syncing of Angular router state with our Redux store.
        // if (ngReduxRouter) {
        //     ngReduxRouter.initialize();
        // }
        // Enable syncing of Angular form state with our Redux store.
        // provideReduxForms(ngRedux);
    }
};
ReduxStoreModule = tslib_1.__decorate([
    NgModule({
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
    }),
    tslib_1.__param(3, Inject(APP_INITIAL_STATE))
], ReduxStoreModule);
export { ReduxStoreModule };
//# sourceMappingURL=redux-store.module.js.map