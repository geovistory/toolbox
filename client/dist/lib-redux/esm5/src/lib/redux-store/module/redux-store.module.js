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
import { equals } from 'ramda';
import dynamicMiddlewares from 'redux-dynamic-middlewares';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { RootEpics } from '../root/root-epics';
import { rootReducer } from '../root/root-reducer';
import { AccountActions, ActiveProjectActions, LoadingBarActions, NotificationsAPIActions } from '../state-gui/actions';
import { AccountEpics, ActiveProjectEpics, LoadingBarEpics, NotificationsAPIEpics } from '../state-gui/epics';
import { DatActions, DfhActions, InfActions, ProActions, SysActions, TabActions, WarActions } from '../state-schema/actions';
import { DatEpics, DfhEpics, InfEpics, ProEpics, SysEpics, TabEpics, WarEpics } from '../state-schema/epics';
import { SchemaActionsFactory, SchemaObjectService } from '../state-schema/_helpers';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sa0JBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEgsT0FBTyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7OztBQWlCckYsTUFBTSxLQUFPLFVBQVU7Ozs7QUFBRyxVQUFDLElBQWM7Ozs7QUFBSyxVQUFDLE1BQU07SUFDbkQsSUFBSSxDQUFDLENBQUMsNEJBQTRCLElBQUksTUFBTSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7O1FBRXRELFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztRQUM3RCxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7SUFDckMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLElBQUEsQ0FBQTs7QUFFRCxNQUFNLEtBQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQVksbUJBQW1CLENBQUM7U0FzQ3ZDLEVBQUU7QUFwQzlDO0lBd0NFLDBCQUNTLE9BQTJCLEVBQ2xDLFFBQTJCO0lBQzNCLGdDQUFnQztJQUNoQyxTQUFvQixFQUNPLFlBQXVCO1FBSjNDLFlBQU8sR0FBUCxPQUFPLENBQW9COztZQU81QixjQUFjLEdBQUcsb0JBQW9CLEVBQUU7UUFFN0MsaUVBQWlFO1FBQ2pFLGlFQUFpRTtRQUNqRSxVQUFVO1FBQ1YsT0FBTyxDQUFDLGNBQWM7UUFDcEIsY0FBYztRQUNkLFdBQVc7UUFFWCxnQkFBZ0I7UUFDaEIsWUFBWTtRQUVaLGFBQWE7UUFDYjtZQUNFLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2Qsa0JBQWtCO1NBQ25CO1FBQ0QsWUFBWTtRQUNaLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNsRCxDQUFDO1FBRUYsaUJBQWlCO1FBQ2pCLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFHNUMsa0VBQWtFO1FBQ2xFLHVCQUF1QjtRQUN2QixrQ0FBa0M7UUFDbEMsSUFBSTtRQUVKLDZEQUE2RDtRQUM3RCw4QkFBOEI7SUFDaEMsQ0FBQzs7Z0JBakZGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBRVQsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUV2QixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsZUFBZTt3QkFDZixxQkFBcUI7d0JBR3JCLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBRVYsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFFUixTQUFTO3dCQUNULG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQixFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLElBQUksRUFBRTtxQkFDN0M7aUJBQ0Y7Ozs7Z0JBN0UyQixPQUFPO2dCQUExQixpQkFBaUI7Z0JBTWpCLFNBQVM7Z0RBOEViLE1BQU0sU0FBQyxpQkFBaUI7O0lBcUM3Qix1QkFBQztDQUFBLEFBbEZELElBa0ZDO1NBM0NZLGdCQUFnQjs7O0lBRXpCLG1DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXItcmVkdXggZWNvc3lzdGVtIHN0dWZmLlxuLy8gQGFuZ3VsYXItcmVkdXgvZm9ybSBhbmQgQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFyZSBvcHRpb25hbFxuLy8gZXh0ZW5zaW9ucyB0aGF0IHN5bmMgZm9ybSBhbmQgcm91dGUgbG9jYXRpb24gc3RhdGUgYmV0d2VlblxuLy8gb3VyIHN0b3JlIGFuZCBBbmd1bGFyLlxuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24sIE5nUmVkdXgsIE5nUmVkdXhNb2R1bGUgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IGR5bmFtaWNNaWRkbGV3YXJlcyBmcm9tICdyZWR1eC1keW5hbWljLW1pZGRsZXdhcmVzJztcbmltcG9ydCB7IGNyZWF0ZUVwaWNNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uL3Jvb3QvbW9kZWxzJztcbmltcG9ydCB7IFJvb3RFcGljcyB9IGZyb20gJy4uL3Jvb3Qvcm9vdC1lcGljcyc7XG5pbXBvcnQgeyByb290UmVkdWNlciB9IGZyb20gJy4uL3Jvb3Qvcm9vdC1yZWR1Y2VyJztcbmltcG9ydCB7IEFjY291bnRBY3Rpb25zLCBBY3RpdmVQcm9qZWN0QWN0aW9ucywgTG9hZGluZ0JhckFjdGlvbnMsIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgQWNjb3VudEVwaWNzLCBBY3RpdmVQcm9qZWN0RXBpY3MsIExvYWRpbmdCYXJFcGljcywgTm90aWZpY2F0aW9uc0FQSUVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzJztcbmltcG9ydCB7IERhdEFjdGlvbnMsIERmaEFjdGlvbnMsIEluZkFjdGlvbnMsIFByb0FjdGlvbnMsIFN5c0FjdGlvbnMsIFRhYkFjdGlvbnMsIFdhckFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRFcGljcywgRGZoRXBpY3MsIEluZkVwaWNzLCBQcm9FcGljcywgU3lzRXBpY3MsIFRhYkVwaWNzLCBXYXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU2NoZW1hT2JqZWN0U2VydmljZSB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9faGVscGVycyc7XG5cblxuXG5cbi8qKlxuICogRnVuY3Rpb24gdG8gdXNlIGluIGNvbWJpbmF0aW9uIHdpdGggcnhqcy9vcGVyYXRvciAuZmlsdGVyKClcbiAqIGluIG9yZGVyIHRvIGdldCBvbmx5IGFjdGlvbnMgZGlzcGFjaGVkIHdpdGggYSBmcmFjdGFsa2V5XG4gKiBlcXVhbCB0byB0aGUgcHJvdmlkZWQgcGF0aC5cbiAqXG4gKiBleGFtcGxlOlxuICogcGlwZShcbiAqICAgIGZpbHRlcihhY3Rpb24gPT4gb2ZTdWJzdG9yZShjLmJhc2VQYXRoKShhY3Rpb24pKSxcbiAqICAgIG9mVHlwZSgnRm9vJylcbiAqIClcbiAqIEBwYXJhbSBwYXRoXG4gKi9cbmV4cG9ydCBjb25zdCBvZlN1YnN0b3JlID0gKHBhdGg6IHN0cmluZ1tdKSA9PiAoYWN0aW9uKTogYm9vbGVhbiA9PiB7XG4gIGlmICghKCdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleScgaW4gYWN0aW9uKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGFjdGlvblBhdGggPSBKU09OLnBhcnNlKGFjdGlvblsnQGFuZ3VsYXItcmVkdXg6OmZyYWN0YWxrZXknXSk7XG4gIGNvbnN0IGJvb2wgPSBlcXVhbHMoYWN0aW9uUGF0aCwgcGF0aCk7XG4gIHJldHVybiBib29sO1xufVxuXG5leHBvcnQgY29uc3QgQVBQX0lOSVRJQUxfU1RBVEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48SUFwcFN0YXRlPignYXBwLklOSVRJQUxfU1RBVEUnKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5nUmVkdXhNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuXG4gICAgQWNjb3VudEFjdGlvbnMsXG4gICAgQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG5cbiAgICBBY2NvdW50RXBpY3MsXG4gICAgQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIExvYWRpbmdCYXJFcGljcyxcbiAgICBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG5cblxuICAgIERhdEFjdGlvbnMsXG4gICAgRGZoQWN0aW9ucyxcbiAgICBJbmZBY3Rpb25zLFxuICAgIFByb0FjdGlvbnMsXG4gICAgU3lzQWN0aW9ucyxcbiAgICBUYWJBY3Rpb25zLFxuICAgIFdhckFjdGlvbnMsXG5cbiAgICBEYXRFcGljcyxcbiAgICBEZmhFcGljcyxcbiAgICBJbmZFcGljcyxcbiAgICBQcm9FcGljcyxcbiAgICBTeXNFcGljcyxcbiAgICBUYWJFcGljcyxcbiAgICBXYXJFcGljcyxcblxuICAgIFJvb3RFcGljcyxcbiAgICBTY2hlbWFBY3Rpb25zRmFjdG9yeSxcbiAgICBTY2hlbWFPYmplY3RTZXJ2aWNlLFxuICAgIHsgcHJvdmlkZTogQVBQX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiB7fSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVkdXhTdG9yZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgZGV2VG9vbHM6IERldlRvb2xzRXh0ZW5zaW9uLFxuICAgIC8vIG5nUmVkdXhSb3V0ZXI6IE5nUmVkdXhSb3V0ZXIsXG4gICAgcm9vdEVwaWNzOiBSb290RXBpY3MsXG4gICAgQEluamVjdChBUFBfSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBJQXBwU3RhdGVcbiAgKSB7XG5cbiAgICBjb25zdCBlcGljTWlkZGxld2FyZSA9IGNyZWF0ZUVwaWNNaWRkbGV3YXJlKCk7XG5cbiAgICAvLyBUZWxsIFJlZHV4IGFib3V0IG91ciByZWR1Y2VycyBhbmQgZXBpY3MuIElmIHRoZSBSZWR1eCBEZXZUb29sc1xuICAgIC8vIGNocm9tZSBleHRlbnNpb24gaXMgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyLCB0ZWxsIFJlZHV4IGFib3V0XG4gICAgLy8gaXQgdG9vLlxuICAgIG5nUmVkdXguY29uZmlndXJlU3RvcmUoXG4gICAgICAvLyBSb290UmVkdWNlclxuICAgICAgcm9vdFJlZHVjZXIsXG5cbiAgICAgIC8vIEluaXRpYWwgc3RhdGVcbiAgICAgIGluaXRpYWxTdGF0ZSxcblxuICAgICAgLy8gTWlkZGxld2FyZVxuICAgICAgW1xuICAgICAgICAvLyBjcmVhdGVMb2dnZXIoKSxcbiAgICAgICAgZXBpY01pZGRsZXdhcmUsXG4gICAgICAgIGR5bmFtaWNNaWRkbGV3YXJlcyxcbiAgICAgIF0sXG4gICAgICAvLyBFbmhhbmNlcnNcbiAgICAgIGRldlRvb2xzLmlzRW5hYmxlZCgpID8gW2RldlRvb2xzLmVuaGFuY2VyKCldIDogW11cbiAgICApO1xuXG4gICAgLy8gQXBwbHkgcm9vdEVwaWNcbiAgICBlcGljTWlkZGxld2FyZS5ydW4ocm9vdEVwaWNzLmdldFJvb3RFcGljKCkpO1xuXG5cbiAgICAvLyAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIHJvdXRlciBzdGF0ZSB3aXRoIG91ciBSZWR1eCBzdG9yZS5cbiAgICAvLyBpZiAobmdSZWR1eFJvdXRlcikge1xuICAgIC8vICAgICBuZ1JlZHV4Um91dGVyLmluaXRpYWxpemUoKTtcbiAgICAvLyB9XG5cbiAgICAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIGZvcm0gc3RhdGUgd2l0aCBvdXIgUmVkdXggc3RvcmUuXG4gICAgLy8gcHJvdmlkZVJlZHV4Rm9ybXMobmdSZWR1eCk7XG4gIH1cbn1cbiJdfQ==