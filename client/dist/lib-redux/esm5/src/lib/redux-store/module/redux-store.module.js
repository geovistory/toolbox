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
/**
 * @return {?}
 */
export function apiConfigFactory() {
    /** @type {?} */
    var params = {
    // set configuration parameters here.
    };
    return new Configuration(params);
}
var ReduxModule = /** @class */ (function () {
    function ReduxModule(ngRedux, devTools, rootEpics, parentModule, sdkLb3, sdkLb4, initialState) {
        this.ngRedux = ngRedux;
        /** @type {?} */
        var errors = [];
        if (parentModule)
            errors.push('ReduxModule is already loaded. Import in your base AppModule only.');
        if (!sdkLb3)
            errors.push('You need to import the SdkLb3Module in your AppModule!');
        if (!sdkLb4)
            errors.push('You need to import the SdkLb4Module in your AppModule!');
        if (errors.length)
            throw new Error(errors.join('\n'));
        if (!initialState)
            initialState = {};
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
    /**
     * @return {?}
     */
    ReduxModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: ReduxModule,
            providers: [{ provide: APP_INITIAL_STATE, useValue: {} }]
        };
    };
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
    ReduxModule.ctorParameters = function () { return [
        { type: NgRedux },
        { type: DevToolsExtension },
        { type: RootEpics },
        { type: ReduxModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SdkLb3Module, decorators: [{ type: Optional }] },
        { type: SdkLb4Module, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_INITIAL_STATE,] }] }
    ]; };
    return ReduxModule;
}());
export { ReduxModule };
if (false) {
    /** @type {?} */
    ReduxModule.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQTJCLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxrQkFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7Ozs7OztBQWVuRCxNQUFNLEtBQU8sVUFBVTs7OztBQUFHLFVBQUMsSUFBYzs7OztBQUFLLFVBQUMsTUFBTTtJQUNuRCxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsSUFBSSxNQUFNLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQzs7UUFFdEQsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLDRC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TztnQkFBMUIsaUJBQWlCO2dCQVVqQixTQUFTO2dCQXdGeUIsV0FBVyx1QkFBakQsUUFBUSxZQUFJLFFBQVE7Z0JBOUZoQixZQUFZLHVCQStGaEIsUUFBUTtnQkE5Rm9DLFlBQVksdUJBK0Z4RCxRQUFRO2dEQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOztJQTJDekMsa0JBQUM7Q0FBQSxBQXJHRCxJQXFHQztTQTFEWSxXQUFXOzs7SUFTcEIsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhci1yZWR1eCBlY29zeXN0ZW0gc3R1ZmYuXG4vLyBAYW5ndWxhci1yZWR1eC9mb3JtIGFuZCBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYXJlIG9wdGlvbmFsXG4vLyBleHRlbnNpb25zIHRoYXQgc3luYyBmb3JtIGFuZCByb3V0ZSBsb2NhdGlvbiBzdGF0ZSBiZXR3ZWVuXG4vLyBvdXIgc3RvcmUgYW5kIEFuZ3VsYXIuXG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiwgTmdSZWR1eCwgTmdSZWR1eE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNsaW1Mb2FkaW5nQmFyTW9kdWxlIH0gZnJvbSAnQGNpbWUvbmd4LXNsaW0tbG9hZGluZy1iYXInO1xuaW1wb3J0IHsgVG9hc3R5TW9kdWxlIH0gZnJvbSAnQGNpbWUvbmd4LXRvYXN0eSc7XG5pbXBvcnQgeyBTZGtMYjNNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgQ29uZmlndXJhdGlvblBhcmFtZXRlcnMsIFNka0xiNE1vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgZHluYW1pY01pZGRsZXdhcmVzIGZyb20gJ3JlZHV4LWR5bmFtaWMtbWlkZGxld2FyZXMnO1xuaW1wb3J0IHsgY3JlYXRlRXBpY01pZGRsZXdhcmUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgUm9vdEVwaWNzIH0gZnJvbSAnLi4vcm9vdC9yb290LWVwaWNzJztcbmltcG9ydCB7IHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vcm9vdC9yb290LXJlZHVjZXInO1xuXG5cbi8qKlxuICogRnVuY3Rpb24gdG8gdXNlIGluIGNvbWJpbmF0aW9uIHdpdGggcnhqcy9vcGVyYXRvciAuZmlsdGVyKClcbiAqIGluIG9yZGVyIHRvIGdldCBvbmx5IGFjdGlvbnMgZGlzcGFjaGVkIHdpdGggYSBmcmFjdGFsa2V5XG4gKiBlcXVhbCB0byB0aGUgcHJvdmlkZWQgcGF0aC5cbiAqXG4gKiBleGFtcGxlOlxuICogcGlwZShcbiAqICAgIGZpbHRlcihhY3Rpb24gPT4gb2ZTdWJzdG9yZShjLmJhc2VQYXRoKShhY3Rpb24pKSxcbiAqICAgIG9mVHlwZSgnRm9vJylcbiAqIClcbiAqIEBwYXJhbSBwYXRoXG4gKi9cbmV4cG9ydCBjb25zdCBvZlN1YnN0b3JlID0gKHBhdGg6IHN0cmluZ1tdKSA9PiAoYWN0aW9uKTogYm9vbGVhbiA9PiB7XG4gIGlmICghKCdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleScgaW4gYWN0aW9uKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGFjdGlvblBhdGggPSBKU09OLnBhcnNlKGFjdGlvblsnQGFuZ3VsYXItcmVkdXg6OmZyYWN0YWxrZXknXSk7XG4gIGNvbnN0IGJvb2wgPSBlcXVhbHMoYWN0aW9uUGF0aCwgcGF0aCk7XG4gIHJldHVybiBib29sO1xufVxuXG5leHBvcnQgY29uc3QgQVBQX0lOSVRJQUxfU1RBVEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48SUFwcFN0YXRlPignYXBwLklOSVRJQUxfU1RBVEUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwaUNvbmZpZ0ZhY3RvcnkoKTogQ29uZmlndXJhdGlvbiB7XG4gIGNvbnN0IHBhcmFtczogQ29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSB7XG4gICAgLy8gc2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBoZXJlLlxuICB9XG4gIHJldHVybiBuZXcgQ29uZmlndXJhdGlvbihwYXJhbXMpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmdSZWR1eE1vZHVsZSxcblxuICAgIC8vIGZvciBndWktc3RhdGUgZXBpY3NcbiAgICBTbGltTG9hZGluZ0Jhck1vZHVsZSxcbiAgICBUb2FzdHlNb2R1bGUuZm9yUm9vdCgpLFxuXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuXG4gICAgLy8gQWNjb3VudEFjdGlvbnMsXG4gICAgLy8gQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgLy8gTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgLy8gTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG5cbiAgICAvLyBBY2NvdW50RXBpY3MsXG4gICAgLy8gQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIC8vIExvYWRpbmdCYXJFcGljcyxcbiAgICAvLyBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG5cbiAgICAvLyBEYXRBY3Rpb25zLFxuICAgIC8vIERmaEFjdGlvbnMsXG4gICAgLy8gSW5mQWN0aW9ucyxcbiAgICAvLyBQcm9BY3Rpb25zLFxuICAgIC8vIFN5c0FjdGlvbnMsXG4gICAgLy8gVGFiQWN0aW9ucyxcbiAgICAvLyBXYXJBY3Rpb25zLFxuXG4gICAgLy8gRGF0RXBpY3MsXG4gICAgLy8gRGZoRXBpY3MsXG4gICAgLy8gSW5mRXBpY3MsXG4gICAgLy8gUHJvRXBpY3MsXG4gICAgLy8gU3lzRXBpY3MsXG4gICAgLy8gVGFiRXBpY3MsXG4gICAgLy8gV2FyRXBpY3MsXG5cbiAgICAvLyBSb290RXBpY3MsXG4gICAgLy8gLy8gU2NoZW1hQWN0aW9uc0ZhY3RvcnksXG4gICAgLy8gU2NoZW1hT2JqZWN0U2VydmljZSxcbiAgICAvLyB7IHByb3ZpZGU6IEFQUF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZToge30gfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJlZHV4TW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUmVkdXhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFQUF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZToge30gfV1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBkZXZUb29sczogRGV2VG9vbHNFeHRlbnNpb24sXG4gICAgcm9vdEVwaWNzOiBSb290RXBpY3MsXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogUmVkdXhNb2R1bGUsXG4gICAgQE9wdGlvbmFsKCkgc2RrTGIzPzogU2RrTGIzTW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHNka0xiND86IFNka0xiNE1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFQUF9JTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU/OiBJQXBwU3RhdGVcbiAgKSB7XG4gICAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG4gICAgaWYgKHBhcmVudE1vZHVsZSkgZXJyb3JzLnB1c2goJ1JlZHV4TW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaW4geW91ciBiYXNlIEFwcE1vZHVsZSBvbmx5LicpO1xuICAgIGlmICghc2RrTGIzKSBlcnJvcnMucHVzaCgnWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBTZGtMYjNNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhJyk7XG4gICAgaWYgKCFzZGtMYjQpIGVycm9ycy5wdXNoKCdZb3UgbmVlZCB0byBpbXBvcnQgdGhlIFNka0xiNE1vZHVsZSBpbiB5b3VyIEFwcE1vZHVsZSEnKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgaWYgKCFpbml0aWFsU3RhdGUpIGluaXRpYWxTdGF0ZSA9IHt9XG5cbiAgICBjb25zdCBlcGljTWlkZGxld2FyZSA9IGNyZWF0ZUVwaWNNaWRkbGV3YXJlKCk7XG5cbiAgICAvLyBUZWxsIFJlZHV4IGFib3V0IG91ciByZWR1Y2VycyBhbmQgZXBpY3MuIElmIHRoZSBSZWR1eCBEZXZUb29sc1xuICAgIC8vIGNocm9tZSBleHRlbnNpb24gaXMgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyLCB0ZWxsIFJlZHV4IGFib3V0XG4gICAgLy8gaXQgdG9vLlxuICAgIG5nUmVkdXguY29uZmlndXJlU3RvcmUoXG4gICAgICAvLyBSb290UmVkdWNlclxuICAgICAgcm9vdFJlZHVjZXIsXG5cbiAgICAgIC8vIEluaXRpYWwgc3RhdGVcbiAgICAgIGluaXRpYWxTdGF0ZSxcblxuICAgICAgLy8gTWlkZGxld2FyZVxuICAgICAgW1xuICAgICAgICAvLyBjcmVhdGVMb2dnZXIoKSxcbiAgICAgICAgZXBpY01pZGRsZXdhcmUsXG4gICAgICAgIGR5bmFtaWNNaWRkbGV3YXJlcyxcbiAgICAgIF0sXG4gICAgICAvLyBFbmhhbmNlcnNcbiAgICAgIGRldlRvb2xzLmlzRW5hYmxlZCgpID8gW2RldlRvb2xzLmVuaGFuY2VyKCldIDogW11cbiAgICApO1xuXG4gICAgLy8gQXBwbHkgcm9vdEVwaWNcbiAgICBlcGljTWlkZGxld2FyZS5ydW4ocm9vdEVwaWNzLmdldFJvb3RFcGljKCkpO1xuXG5cbiAgICAvLyAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIHJvdXRlciBzdGF0ZSB3aXRoIG91ciBSZWR1eCBzdG9yZS5cbiAgICAvLyBpZiAobmdSZWR1eFJvdXRlcikge1xuICAgIC8vICAgICBuZ1JlZHV4Um91dGVyLmluaXRpYWxpemUoKTtcbiAgICAvLyB9XG5cbiAgICAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIGZvcm0gc3RhdGUgd2l0aCBvdXIgUmVkdXggc3RvcmUuXG4gICAgLy8gcHJvdmlkZVJlZHV4Rm9ybXMobmdSZWR1eCk7XG4gIH1cbn1cbiJdfQ==