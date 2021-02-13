/**
 * @fileoverview added by tsickle
 * Generated from: module/redux-store.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { Inject, InjectionToken, NgModule } from '@angular/core';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { ToastyModule } from '@cime/ngx-toasty';
import { SDKBrowserModule } from '@kleiolab/lib-sdk-lb3';
import { ApiModule } from '@kleiolab/lib-sdk-lb4';
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
 * \@param path
 * @type {?}
 */
export var ofSubstore = (/**
 * @param {?} path
 * @return {?}
 */
function (path) { return (/**
 * @param {?} action
 * @return {?}
 */
function (action) {
    if (!('@angular-redux::fractalkey' in action))
        return false;
    /** @type {?} */
    var actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    /** @type {?} */
    var bool = equals(actionPath, path);
    return bool;
}); });
/** @type {?} */
export var APP_INITIAL_STATE = new InjectionToken('app.INITIAL_STATE');
var ɵ0 = {};
var ReduxStoreModule = /** @class */ (function () {
    function ReduxStoreModule(ngRedux, devTools, 
    // ngReduxRouter: NgReduxRouter,
    rootEpics, initialState) {
        this.ngRedux = ngRedux;
        /** @type {?} */
        var epicMiddleware = createEpicMiddleware();
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
    ReduxStoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        NgReduxModule,
                        // for gui-state epics
                        SlimLoadingBarModule,
                        ToastyModule.forRoot(),
                        // for schema-state epics
                        SDKBrowserModule.forRoot(),
                        ApiModule,
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
                        // SchemaActionsFactory,
                        SchemaObjectService,
                        { provide: APP_INITIAL_STATE, useValue: ɵ0 }
                    ]
                },] }
    ];
    /** @nocollapse */
    ReduxStoreModule.ctorParameters = function () { return [
        { type: NgRedux },
        { type: DevToolsExtension },
        { type: RootEpics },
        { type: undefined, decorators: [{ type: Inject, args: [APP_INITIAL_STATE,] }] }
    ]; };
    return ReduxStoreModule;
}());
export { ReduxStoreModule };
if (false) {
    /** @type {?} */
    ReduxStoreModule.prototype.ngRedux;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxrQkFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NB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QkFBeUI7d0JBQ3pCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTt3QkFDMUIsU0FBUztxQkFFVjtvQkFDRCxTQUFTLEVBQUU7d0JBRVQsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUV2QixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsZUFBZTt3QkFDZixxQkFBcUI7d0JBR3JCLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBRVYsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFFUixTQUFTO3dCQUNULHdCQUF3Qjt3QkFDeEIsbUJBQW1CO3dCQUNuQixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLElBQUksRUFBRTtxQkFDN0M7aUJBQ0Y7Ozs7Z0JBNUcyQixPQUFPO2dCQUExQixpQkFBaUI7Z0JBVWpCLFNBQVM7Z0RBeUdiLE1BQU0sU0FBQyxpQkFBaUI7O0lBcUM3Qix1QkFBQztDQUFBLEFBM0ZELElBMkZDO1NBM0NZLGdCQUFnQjs7O0lBRXpCLG1DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXItcmVkdXggZWNvc3lzdGVtIHN0dWZmLlxuLy8gQGFuZ3VsYXItcmVkdXgvZm9ybSBhbmQgQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFyZSBvcHRpb25hbFxuLy8gZXh0ZW5zaW9ucyB0aGF0IHN5bmMgZm9ybSBhbmQgcm91dGUgbG9jYXRpb24gc3RhdGUgYmV0d2VlblxuLy8gb3VyIHN0b3JlIGFuZCBBbmd1bGFyLlxuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24sIE5nUmVkdXgsIE5nUmVkdXhNb2R1bGUgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2xpbUxvYWRpbmdCYXJNb2R1bGUgfSBmcm9tICdAY2ltZS9uZ3gtc2xpbS1sb2FkaW5nLWJhcic7XG5pbXBvcnQgeyBUb2FzdHlNb2R1bGUgfSBmcm9tICdAY2ltZS9uZ3gtdG9hc3R5JztcbmltcG9ydCB7IFNES0Jyb3dzZXJNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQXBpTW9kdWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCBkeW5hbWljTWlkZGxld2FyZXMgZnJvbSAncmVkdXgtZHluYW1pYy1taWRkbGV3YXJlcyc7XG5pbXBvcnQgeyBjcmVhdGVFcGljTWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBSb290RXBpY3MgfSBmcm9tICcuLi9yb290L3Jvb3QtZXBpY3MnO1xuaW1wb3J0IHsgcm9vdFJlZHVjZXIgfSBmcm9tICcuLi9yb290L3Jvb3QtcmVkdWNlcic7XG5pbXBvcnQgeyBBY2NvdW50QWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLWd1aS9hY3Rpb25zL2FjY291bnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0QWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLWd1aS9hY3Rpb25zL2FjdGl2ZS1wcm9qZWN0LmFjdGlvbic7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjY291bnQuZXBpY3MnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2FjdGl2ZS1wcm9qZWN0LmVwaWNzJztcbmltcG9ydCB7IExvYWRpbmdCYXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3Mvbm90aWZpY2F0aW9ucy5lcGljcyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFRhYkFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy90YWIuYWN0aW9ucyc7XG5pbXBvcnQgeyBXYXJBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvd2FyLmFjdGlvbnMnO1xuaW1wb3J0IHsgRGF0RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzJztcbmltcG9ydCB7IERmaEVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2RmaC5lcGljcyc7XG5pbXBvcnQgeyBJbmZFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9pbmYuZXBpY3MnO1xuaW1wb3J0IHsgUHJvRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvcHJvLmVwaWNzJztcbmltcG9ydCB7IFN5c0VwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3N5cy5lcGljcyc7XG5pbXBvcnQgeyBUYWJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy90YWIuZXBpY3MnO1xuaW1wb3J0IHsgV2FyRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3Mvd2FyLmVwaWNzJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdFNlcnZpY2UgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvc2VydmljZXMvc2NoZW1hLW9iamVjdC5zZXJ2aWNlJztcblxuXG5cblxuLyoqXG4gKiBGdW5jdGlvbiB0byB1c2UgaW4gY29tYmluYXRpb24gd2l0aCByeGpzL29wZXJhdG9yIC5maWx0ZXIoKVxuICogaW4gb3JkZXIgdG8gZ2V0IG9ubHkgYWN0aW9ucyBkaXNwYWNoZWQgd2l0aCBhIGZyYWN0YWxrZXlcbiAqIGVxdWFsIHRvIHRoZSBwcm92aWRlZCBwYXRoLlxuICpcbiAqIGV4YW1wbGU6XG4gKiBwaXBlKFxuICogICAgZmlsdGVyKGFjdGlvbiA9PiBvZlN1YnN0b3JlKGMuYmFzZVBhdGgpKGFjdGlvbikpLFxuICogICAgb2ZUeXBlKCdGb28nKVxuICogKVxuICogQHBhcmFtIHBhdGhcbiAqL1xuZXhwb3J0IGNvbnN0IG9mU3Vic3RvcmUgPSAocGF0aDogc3RyaW5nW10pID0+IChhY3Rpb24pOiBib29sZWFuID0+IHtcbiAgaWYgKCEoJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5JyBpbiBhY3Rpb24pKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgYWN0aW9uUGF0aCA9IEpTT04ucGFyc2UoYWN0aW9uWydAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSddKTtcbiAgY29uc3QgYm9vbCA9IGVxdWFscyhhY3Rpb25QYXRoLCBwYXRoKTtcbiAgcmV0dXJuIGJvb2w7XG59XG5cbmV4cG9ydCBjb25zdCBBUFBfSU5JVElBTF9TVEFURSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJQXBwU3RhdGU+KCdhcHAuSU5JVElBTF9TVEFURScpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmdSZWR1eE1vZHVsZSxcblxuICAgIC8vIGZvciBndWktc3RhdGUgZXBpY3NcbiAgICBTbGltTG9hZGluZ0Jhck1vZHVsZSxcbiAgICBUb2FzdHlNb2R1bGUuZm9yUm9vdCgpLFxuXG4gICAgLy8gZm9yIHNjaGVtYS1zdGF0ZSBlcGljc1xuICAgIFNES0Jyb3dzZXJNb2R1bGUuZm9yUm9vdCgpLCAvLyBsaWItc2RrLWxiM1xuICAgIEFwaU1vZHVsZSwgLy8gbGliLXNkay1sYjRcblxuICBdLFxuICBwcm92aWRlcnM6IFtcblxuICAgIEFjY291bnRBY3Rpb25zLFxuICAgIEFjdGl2ZVByb2plY3RBY3Rpb25zLFxuICAgIExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuXG4gICAgQWNjb3VudEVwaWNzLFxuICAgIEFjdGl2ZVByb2plY3RFcGljcyxcbiAgICBMb2FkaW5nQmFyRXBpY3MsXG4gICAgTm90aWZpY2F0aW9uc0FQSUVwaWNzLFxuXG5cbiAgICBEYXRBY3Rpb25zLFxuICAgIERmaEFjdGlvbnMsXG4gICAgSW5mQWN0aW9ucyxcbiAgICBQcm9BY3Rpb25zLFxuICAgIFN5c0FjdGlvbnMsXG4gICAgVGFiQWN0aW9ucyxcbiAgICBXYXJBY3Rpb25zLFxuXG4gICAgRGF0RXBpY3MsXG4gICAgRGZoRXBpY3MsXG4gICAgSW5mRXBpY3MsXG4gICAgUHJvRXBpY3MsXG4gICAgU3lzRXBpY3MsXG4gICAgVGFiRXBpY3MsXG4gICAgV2FyRXBpY3MsXG5cbiAgICBSb290RXBpY3MsXG4gICAgLy8gU2NoZW1hQWN0aW9uc0ZhY3RvcnksXG4gICAgU2NoZW1hT2JqZWN0U2VydmljZSxcbiAgICB7IHByb3ZpZGU6IEFQUF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZToge30gfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlZHV4U3RvcmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIGRldlRvb2xzOiBEZXZUb29sc0V4dGVuc2lvbixcbiAgICAvLyBuZ1JlZHV4Um91dGVyOiBOZ1JlZHV4Um91dGVyLFxuICAgIHJvb3RFcGljczogUm9vdEVwaWNzLFxuICAgIEBJbmplY3QoQVBQX0lOSVRJQUxfU1RBVEUpIGluaXRpYWxTdGF0ZTogSUFwcFN0YXRlXG4gICkge1xuXG4gICAgY29uc3QgZXBpY01pZGRsZXdhcmUgPSBjcmVhdGVFcGljTWlkZGxld2FyZSgpO1xuXG4gICAgLy8gVGVsbCBSZWR1eCBhYm91dCBvdXIgcmVkdWNlcnMgYW5kIGVwaWNzLiBJZiB0aGUgUmVkdXggRGV2VG9vbHNcbiAgICAvLyBjaHJvbWUgZXh0ZW5zaW9uIGlzIGF2YWlsYWJsZSBpbiB0aGUgYnJvd3NlciwgdGVsbCBSZWR1eCBhYm91dFxuICAgIC8vIGl0IHRvby5cbiAgICBuZ1JlZHV4LmNvbmZpZ3VyZVN0b3JlKFxuICAgICAgLy8gUm9vdFJlZHVjZXJcbiAgICAgIHJvb3RSZWR1Y2VyLFxuXG4gICAgICAvLyBJbml0aWFsIHN0YXRlXG4gICAgICBpbml0aWFsU3RhdGUsXG5cbiAgICAgIC8vIE1pZGRsZXdhcmVcbiAgICAgIFtcbiAgICAgICAgLy8gY3JlYXRlTG9nZ2VyKCksXG4gICAgICAgIGVwaWNNaWRkbGV3YXJlLFxuICAgICAgICBkeW5hbWljTWlkZGxld2FyZXMsXG4gICAgICBdLFxuICAgICAgLy8gRW5oYW5jZXJzXG4gICAgICBkZXZUb29scy5pc0VuYWJsZWQoKSA/IFtkZXZUb29scy5lbmhhbmNlcigpXSA6IFtdXG4gICAgKTtcblxuICAgIC8vIEFwcGx5IHJvb3RFcGljXG4gICAgZXBpY01pZGRsZXdhcmUucnVuKHJvb3RFcGljcy5nZXRSb290RXBpYygpKTtcblxuXG4gICAgLy8gLy8gRW5hYmxlIHN5bmNpbmcgb2YgQW5ndWxhciByb3V0ZXIgc3RhdGUgd2l0aCBvdXIgUmVkdXggc3RvcmUuXG4gICAgLy8gaWYgKG5nUmVkdXhSb3V0ZXIpIHtcbiAgICAvLyAgICAgbmdSZWR1eFJvdXRlci5pbml0aWFsaXplKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gRW5hYmxlIHN5bmNpbmcgb2YgQW5ndWxhciBmb3JtIHN0YXRlIHdpdGggb3VyIFJlZHV4IHN0b3JlLlxuICAgIC8vIHByb3ZpZGVSZWR1eEZvcm1zKG5nUmVkdXgpO1xuICB9XG59XG4iXX0=