/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/module/redux-store.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { Inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { ToastyModule } from '@cime/ngx-toasty';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { Configuration, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { equals } from 'ramda';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
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
 * \@param path
 * @type {?}
 */
export const ofSubstore = (/**
 * @param {?} path
 * @return {?}
 */
(path) => (/**
 * @param {?} action
 * @return {?}
 */
(action) => {
    if (!('@angular-redux::fractalkey' in action))
        return false;
    /** @type {?} */
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    /** @type {?} */
    const bool = equals(actionPath, path);
    return bool;
}));
/** @type {?} */
export const APP_INITIAL_STATE = new InjectionToken('app.INITIAL_STATE');
/**
 * @return {?}
 */
export function apiConfigFactory() {
    /** @type {?} */
    const params = {
    // set configuration parameters here.
    };
    return new Configuration(params);
}
export class ReduxModule {
    /**
     * @param {?} ngRedux
     * @param {?} devTools
     * @param {?} rootEpics
     * @param {?} initialState
     * @param {?} parentModule
     * @param {?} sdkLb3
     * @param {?} sdkLb4
     */
    constructor(ngRedux, devTools, rootEpics, initialState, parentModule, sdkLb3, sdkLb4) {
        this.ngRedux = ngRedux;
        /** @type {?} */
        const errors = [];
        if (parentModule)
            errors.push('ReduxModule is already loaded. Import in your base AppModule only.');
        if (!sdkLb3)
            errors.push('You need to import the SdkLb3Module in your AppModule!');
        if (!sdkLb4)
            errors.push('You need to import the SdkLb4Module in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
        /** @type {?} */
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
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: ReduxModule,
            providers: [{ provide: APP_INITIAL_STATE, useValue: {} }]
        };
    }
}
ReduxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NgReduxModule,
                    // for gui-state epics
                    SlimLoadingBarModule,
                    ToastyModule.forRoot(),
                ],
                providers: [
                // AccountActions,
                // ActiveProjectActions,
                // LoadingBarActions,
                // NotificationsAPIActions,
                // AccountEpics,
                // ActiveProjectEpics,
                // LoadingBarEpics,
                // NotificationsAPIEpics,
                // DatActions,
                // DfhActions,
                // InfActions,
                // ProActions,
                // SysActions,
                // TabActions,
                // WarActions,
                // DatEpics,
                // DfhEpics,
                // InfEpics,
                // ProEpics,
                // SysEpics,
                // TabEpics,
                // WarEpics,
                // RootEpics,
                // // SchemaActionsFactory,
                // SchemaObjectService,
                // { provide: APP_INITIAL_STATE, useValue: {} }
                ]
            },] }
];
/** @nocollapse */
ReduxModule.ctorParameters = () => [
    { type: NgRedux },
    { type: DevToolsExtension },
    { type: RootEpics },
    { type: undefined, decorators: [{ type: Inject, args: [APP_INITIAL_STATE,] }] },
    { type: ReduxModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SdkLb3Module, decorators: [{ type: Optional }] },
    { type: SdkLb4Module, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    ReduxModule.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9tb2R1bGUvcmVkdXgtc3RvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBMkIsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0YsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZW5ELE1BQU0sT0FBTyxVQUFVOzs7O0FBQUcsQ0FBQyxJQUFjLEVBQUUsRUFBRTs7OztBQUFDLENBQUMsTUFBTSxFQUFXLEVBQUU7SUFDaEUsSUFBSSxDQUFDLENBQUMsNEJBQTRCLElBQUksTUFBTSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7O1VBRXRELFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztVQUM3RCxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7SUFDckMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUEsQ0FBQTs7QUFFRCxNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQVksbUJBQW1CLENBQUM7Ozs7QUFFbkYsTUFBTSxVQUFVLGdCQUFnQjs7VUFDeEIsTUFBTSxHQUE0QjtJQUN0QyxxQ0FBcUM7S0FDdEM7SUFDRCxPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUE2Q0QsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7Ozs7SUFRdEIsWUFDUyxPQUEyQixFQUNsQyxRQUEyQixFQUMzQixTQUFvQixFQUNPLFlBQXVCLEVBQzFCLFlBQXlCLEVBQ3JDLE1BQW9CLEVBQ3BCLE1BQW9CO1FBTnpCLFlBQU8sR0FBUCxPQUFPLENBQW9COztjQVE1QixNQUFNLEdBQWEsRUFBRTtRQUMzQixJQUFJLFlBQVk7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLG9FQUFvRSxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDbkYsSUFBSSxNQUFNLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztjQUdoRCxjQUFjLEdBQUcsb0JBQW9CLEVBQUU7UUFFN0MsaUVBQWlFO1FBQ2pFLGlFQUFpRTtRQUNqRSxVQUFVO1FBQ1YsT0FBTyxDQUFDLGNBQWM7UUFDcEIsY0FBYztRQUNkLFdBQVc7UUFFWCxnQkFBZ0I7UUFDaEIsWUFBWTtRQUVaLGFBQWE7UUFDYjtZQUNFLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2Qsa0JBQWtCO1NBQ25CO1FBQ0QsWUFBWTtRQUNaLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNsRCxDQUFDO1FBRUYsaUJBQWlCO1FBQ2pCLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFHNUMsa0VBQWtFO1FBQ2xFLHVCQUF1QjtRQUN2QixrQ0FBa0M7UUFDbEMsSUFBSTtRQUVKLDZEQUE2RDtRQUM3RCw4QkFBOEI7SUFDaEMsQ0FBQzs7OztJQXhETSxNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQzFELENBQUM7SUFDSixDQUFDOzs7WUFqREYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUViLHNCQUFzQjtvQkFDdEIsb0JBQW9CO29CQUNwQixZQUFZLENBQUMsT0FBTyxFQUFFO2lCQUV2QjtnQkFDRCxTQUFTLEVBQUU7Z0JBRVQsa0JBQWtCO2dCQUNsQix3QkFBd0I7Z0JBQ3hCLHFCQUFxQjtnQkFDckIsMkJBQTJCO2dCQUUzQixnQkFBZ0I7Z0JBQ2hCLHNCQUFzQjtnQkFDdEIsbUJBQW1CO2dCQUNuQix5QkFBeUI7Z0JBRXpCLGNBQWM7Z0JBQ2QsY0FBYztnQkFDZCxjQUFjO2dCQUNkLGNBQWM7Z0JBQ2QsY0FBYztnQkFDZCxjQUFjO2dCQUNkLGNBQWM7Z0JBRWQsWUFBWTtnQkFDWixZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osWUFBWTtnQkFDWixZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osWUFBWTtnQkFFWixhQUFhO2dCQUNiLDJCQUEyQjtnQkFDM0IsdUJBQXVCO2dCQUN2QiwrQ0FBK0M7aUJBQ2hEO2FBQ0Y7Ozs7WUFyRjJCLE9BQU87WUFBMUIsaUJBQWlCO1lBVWpCLFNBQVM7NENBd0ZiLE1BQU0sU0FBQyxpQkFBaUI7WUFDYSxXQUFXLHVCQUFoRCxRQUFRLFlBQUksUUFBUTtZQS9GaEIsWUFBWSx1QkFnR2hCLFFBQVE7WUEvRm9DLFlBQVksdUJBZ0d4RCxRQUFROzs7O0lBTlQsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhci1yZWR1eCBlY29zeXN0ZW0gc3R1ZmYuXG4vLyBAYW5ndWxhci1yZWR1eC9mb3JtIGFuZCBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYXJlIG9wdGlvbmFsXG4vLyBleHRlbnNpb25zIHRoYXQgc3luYyBmb3JtIGFuZCByb3V0ZSBsb2NhdGlvbiBzdGF0ZSBiZXR3ZWVuXG4vLyBvdXIgc3RvcmUgYW5kIEFuZ3VsYXIuXG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiwgTmdSZWR1eCwgTmdSZWR1eE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNsaW1Mb2FkaW5nQmFyTW9kdWxlIH0gZnJvbSAnQGNpbWUvbmd4LXNsaW0tbG9hZGluZy1iYXInO1xuaW1wb3J0IHsgVG9hc3R5TW9kdWxlIH0gZnJvbSAnQGNpbWUvbmd4LXRvYXN0eSc7XG5pbXBvcnQgeyBTZGtMYjNNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgQ29uZmlndXJhdGlvblBhcmFtZXRlcnMsIFNka0xiNE1vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgZHluYW1pY01pZGRsZXdhcmVzIGZyb20gJ3JlZHV4LWR5bmFtaWMtbWlkZGxld2FyZXMnO1xuaW1wb3J0IHsgY3JlYXRlRXBpY01pZGRsZXdhcmUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgUm9vdEVwaWNzIH0gZnJvbSAnLi4vcm9vdC9yb290LWVwaWNzJztcbmltcG9ydCB7IHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vcm9vdC9yb290LXJlZHVjZXInO1xuXG5cbi8qKlxuICogRnVuY3Rpb24gdG8gdXNlIGluIGNvbWJpbmF0aW9uIHdpdGggcnhqcy9vcGVyYXRvciAuZmlsdGVyKClcbiAqIGluIG9yZGVyIHRvIGdldCBvbmx5IGFjdGlvbnMgZGlzcGFjaGVkIHdpdGggYSBmcmFjdGFsa2V5XG4gKiBlcXVhbCB0byB0aGUgcHJvdmlkZWQgcGF0aC5cbiAqXG4gKiBleGFtcGxlOlxuICogcGlwZShcbiAqICAgIGZpbHRlcihhY3Rpb24gPT4gb2ZTdWJzdG9yZShjLmJhc2VQYXRoKShhY3Rpb24pKSxcbiAqICAgIG9mVHlwZSgnRm9vJylcbiAqIClcbiAqIEBwYXJhbSBwYXRoXG4gKi9cbmV4cG9ydCBjb25zdCBvZlN1YnN0b3JlID0gKHBhdGg6IHN0cmluZ1tdKSA9PiAoYWN0aW9uKTogYm9vbGVhbiA9PiB7XG4gIGlmICghKCdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleScgaW4gYWN0aW9uKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGFjdGlvblBhdGggPSBKU09OLnBhcnNlKGFjdGlvblsnQGFuZ3VsYXItcmVkdXg6OmZyYWN0YWxrZXknXSk7XG4gIGNvbnN0IGJvb2wgPSBlcXVhbHMoYWN0aW9uUGF0aCwgcGF0aCk7XG4gIHJldHVybiBib29sO1xufVxuXG5leHBvcnQgY29uc3QgQVBQX0lOSVRJQUxfU1RBVEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48SUFwcFN0YXRlPignYXBwLklOSVRJQUxfU1RBVEUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwaUNvbmZpZ0ZhY3RvcnkoKTogQ29uZmlndXJhdGlvbiB7XG4gIGNvbnN0IHBhcmFtczogQ29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSB7XG4gICAgLy8gc2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBoZXJlLlxuICB9XG4gIHJldHVybiBuZXcgQ29uZmlndXJhdGlvbihwYXJhbXMpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmdSZWR1eE1vZHVsZSxcblxuICAgIC8vIGZvciBndWktc3RhdGUgZXBpY3NcbiAgICBTbGltTG9hZGluZ0Jhck1vZHVsZSxcbiAgICBUb2FzdHlNb2R1bGUuZm9yUm9vdCgpLFxuXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuXG4gICAgLy8gQWNjb3VudEFjdGlvbnMsXG4gICAgLy8gQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgLy8gTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgLy8gTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG5cbiAgICAvLyBBY2NvdW50RXBpY3MsXG4gICAgLy8gQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIC8vIExvYWRpbmdCYXJFcGljcyxcbiAgICAvLyBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG5cbiAgICAvLyBEYXRBY3Rpb25zLFxuICAgIC8vIERmaEFjdGlvbnMsXG4gICAgLy8gSW5mQWN0aW9ucyxcbiAgICAvLyBQcm9BY3Rpb25zLFxuICAgIC8vIFN5c0FjdGlvbnMsXG4gICAgLy8gVGFiQWN0aW9ucyxcbiAgICAvLyBXYXJBY3Rpb25zLFxuXG4gICAgLy8gRGF0RXBpY3MsXG4gICAgLy8gRGZoRXBpY3MsXG4gICAgLy8gSW5mRXBpY3MsXG4gICAgLy8gUHJvRXBpY3MsXG4gICAgLy8gU3lzRXBpY3MsXG4gICAgLy8gVGFiRXBpY3MsXG4gICAgLy8gV2FyRXBpY3MsXG5cbiAgICAvLyBSb290RXBpY3MsXG4gICAgLy8gLy8gU2NoZW1hQWN0aW9uc0ZhY3RvcnksXG4gICAgLy8gU2NoZW1hT2JqZWN0U2VydmljZSxcbiAgICAvLyB7IHByb3ZpZGU6IEFQUF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZToge30gfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlZHV4TW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUmVkdXhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFQUF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZToge30gfV1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBkZXZUb29sczogRGV2VG9vbHNFeHRlbnNpb24sXG4gICAgcm9vdEVwaWNzOiBSb290RXBpY3MsXG4gICAgQEluamVjdChBUFBfSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBJQXBwU3RhdGUsXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBSZWR1eE1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBzZGtMYjM6IFNka0xiM01vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBzZGtMYjQ6IFNka0xiNE1vZHVsZVxuICApIHtcbiAgICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW11cbiAgICBpZiAocGFyZW50TW9kdWxlKSBlcnJvcnMucHVzaCgnUmVkdXhNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpbiB5b3VyIGJhc2UgQXBwTW9kdWxlIG9ubHkuJyk7XG4gICAgaWYgKCFzZGtMYjMpIGVycm9ycy5wdXNoKCdZb3UgbmVlZCB0byBpbXBvcnQgdGhlIFNka0xiM01vZHVsZSBpbiB5b3VyIEFwcE1vZHVsZSEnKTtcbiAgICBpZiAoIXNka0xiNCkgZXJyb3JzLnB1c2goJ1lvdSBuZWVkIHRvIGltcG9ydCB0aGUgU2RrTGI0TW9kdWxlIGluIHlvdXIgQXBwTW9kdWxlIScpO1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLmpvaW4oJ1xcbicpKTtcblxuXG4gICAgY29uc3QgZXBpY01pZGRsZXdhcmUgPSBjcmVhdGVFcGljTWlkZGxld2FyZSgpO1xuXG4gICAgLy8gVGVsbCBSZWR1eCBhYm91dCBvdXIgcmVkdWNlcnMgYW5kIGVwaWNzLiBJZiB0aGUgUmVkdXggRGV2VG9vbHNcbiAgICAvLyBjaHJvbWUgZXh0ZW5zaW9uIGlzIGF2YWlsYWJsZSBpbiB0aGUgYnJvd3NlciwgdGVsbCBSZWR1eCBhYm91dFxuICAgIC8vIGl0IHRvby5cbiAgICBuZ1JlZHV4LmNvbmZpZ3VyZVN0b3JlKFxuICAgICAgLy8gUm9vdFJlZHVjZXJcbiAgICAgIHJvb3RSZWR1Y2VyLFxuXG4gICAgICAvLyBJbml0aWFsIHN0YXRlXG4gICAgICBpbml0aWFsU3RhdGUsXG5cbiAgICAgIC8vIE1pZGRsZXdhcmVcbiAgICAgIFtcbiAgICAgICAgLy8gY3JlYXRlTG9nZ2VyKCksXG4gICAgICAgIGVwaWNNaWRkbGV3YXJlLFxuICAgICAgICBkeW5hbWljTWlkZGxld2FyZXMsXG4gICAgICBdLFxuICAgICAgLy8gRW5oYW5jZXJzXG4gICAgICBkZXZUb29scy5pc0VuYWJsZWQoKSA/IFtkZXZUb29scy5lbmhhbmNlcigpXSA6IFtdXG4gICAgKTtcblxuICAgIC8vIEFwcGx5IHJvb3RFcGljXG4gICAgZXBpY01pZGRsZXdhcmUucnVuKHJvb3RFcGljcy5nZXRSb290RXBpYygpKTtcblxuXG4gICAgLy8gLy8gRW5hYmxlIHN5bmNpbmcgb2YgQW5ndWxhciByb3V0ZXIgc3RhdGUgd2l0aCBvdXIgUmVkdXggc3RvcmUuXG4gICAgLy8gaWYgKG5nUmVkdXhSb3V0ZXIpIHtcbiAgICAvLyAgICAgbmdSZWR1eFJvdXRlci5pbml0aWFsaXplKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gRW5hYmxlIHN5bmNpbmcgb2YgQW5ndWxhciBmb3JtIHN0YXRlIHdpdGggb3VyIFJlZHV4IHN0b3JlLlxuICAgIC8vIHByb3ZpZGVSZWR1eEZvcm1zKG5nUmVkdXgpO1xuICB9XG59XG4iXX0=