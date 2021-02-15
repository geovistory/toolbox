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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsibW9kdWxlL3JlZHV4LXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQTJCLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxrQkFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7Ozs7OztBQWVuRCxNQUFNLE9BQU8sVUFBVTs7OztBQUFHLENBQUMsSUFBYyxFQUFFLEVBQUU7Ozs7QUFBQyxDQUFDLE1BQU0sRUFBVyxFQUFFO0lBQ2hFLElBQUksQ0FBQyxDQUFDLDRCQUE0QixJQUFJLE1BQU0sQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDOztVQUV0RCxVQUFVLEdBQUcsSUFBSSxDQUFDLEtB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O1lBQTFCLGlCQUFpQjtZQVVqQixTQUFTOzRDQXdGYixNQUFNLFNBQUMsaUJBQWlCO1lBQ2EsV0FBVyx1QkFBaEQsUUFBUSxZQUFJLFFBQVE7WUEvRmhCLFlBQVksdUJBZ0doQixRQUFRO1lBL0ZvQyxZQUFZLHVCQWdHeEQsUUFBUTs7OztJQU5ULDhCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXItcmVkdXggZWNvc3lzdGVtIHN0dWZmLlxuLy8gQGFuZ3VsYXItcmVkdXgvZm9ybSBhbmQgQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFyZSBvcHRpb25hbFxuLy8gZXh0ZW5zaW9ucyB0aGF0IHN5bmMgZm9ybSBhbmQgcm91dGUgbG9jYXRpb24gc3RhdGUgYmV0d2VlblxuLy8gb3VyIHN0b3JlIGFuZCBBbmd1bGFyLlxuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24sIE5nUmVkdXgsIE5nUmVkdXhNb2R1bGUgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbGltTG9hZGluZ0Jhck1vZHVsZSB9IGZyb20gJ0BjaW1lL25neC1zbGltLWxvYWRpbmctYmFyJztcbmltcG9ydCB7IFRvYXN0eU1vZHVsZSB9IGZyb20gJ0BjaW1lL25neC10b2FzdHknO1xuaW1wb3J0IHsgU2RrTGIzTW9kdWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLCBTZGtMYjRNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IGR5bmFtaWNNaWRkbGV3YXJlcyBmcm9tICdyZWR1eC1keW5hbWljLW1pZGRsZXdhcmVzJztcbmltcG9ydCB7IGNyZWF0ZUVwaWNNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IFJvb3RFcGljcyB9IGZyb20gJy4uL3Jvb3Qvcm9vdC1lcGljcyc7XG5pbXBvcnQgeyByb290UmVkdWNlciB9IGZyb20gJy4uL3Jvb3Qvcm9vdC1yZWR1Y2VyJztcblxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIHVzZSBpbiBjb21iaW5hdGlvbiB3aXRoIHJ4anMvb3BlcmF0b3IgLmZpbHRlcigpXG4gKiBpbiBvcmRlciB0byBnZXQgb25seSBhY3Rpb25zIGRpc3BhY2hlZCB3aXRoIGEgZnJhY3RhbGtleVxuICogZXF1YWwgdG8gdGhlIHByb3ZpZGVkIHBhdGguXG4gKlxuICogZXhhbXBsZTpcbiAqIHBpcGUoXG4gKiAgICBmaWx0ZXIoYWN0aW9uID0+IG9mU3Vic3RvcmUoYy5iYXNlUGF0aCkoYWN0aW9uKSksXG4gKiAgICBvZlR5cGUoJ0ZvbycpXG4gKiApXG4gKiBAcGFyYW0gcGF0aFxuICovXG5leHBvcnQgY29uc3Qgb2ZTdWJzdG9yZSA9IChwYXRoOiBzdHJpbmdbXSkgPT4gKGFjdGlvbik6IGJvb2xlYW4gPT4ge1xuICBpZiAoISgnQGFuZ3VsYXItcmVkdXg6OmZyYWN0YWxrZXknIGluIGFjdGlvbikpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBhY3Rpb25QYXRoID0gSlNPTi5wYXJzZShhY3Rpb25bJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5J10pO1xuICBjb25zdCBib29sID0gZXF1YWxzKGFjdGlvblBhdGgsIHBhdGgpO1xuICByZXR1cm4gYm9vbDtcbn1cblxuZXhwb3J0IGNvbnN0IEFQUF9JTklUSUFMX1NUQVRFID0gbmV3IEluamVjdGlvblRva2VuPElBcHBTdGF0ZT4oJ2FwcC5JTklUSUFMX1NUQVRFJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcGlDb25maWdGYWN0b3J5KCk6IENvbmZpZ3VyYXRpb24ge1xuICBjb25zdCBwYXJhbXM6IENvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzID0ge1xuICAgIC8vIHNldCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgaGVyZS5cbiAgfVxuICByZXR1cm4gbmV3IENvbmZpZ3VyYXRpb24ocGFyYW1zKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5nUmVkdXhNb2R1bGUsXG5cbiAgICAvLyBmb3IgZ3VpLXN0YXRlIGVwaWNzXG4gICAgU2xpbUxvYWRpbmdCYXJNb2R1bGUsXG4gICAgVG9hc3R5TW9kdWxlLmZvclJvb3QoKSxcblxuICBdLFxuICBwcm92aWRlcnM6IFtcblxuICAgIC8vIEFjY291bnRBY3Rpb25zLFxuICAgIC8vIEFjdGl2ZVByb2plY3RBY3Rpb25zLFxuICAgIC8vIExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIC8vIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuXG4gICAgLy8gQWNjb3VudEVwaWNzLFxuICAgIC8vIEFjdGl2ZVByb2plY3RFcGljcyxcbiAgICAvLyBMb2FkaW5nQmFyRXBpY3MsXG4gICAgLy8gTm90aWZpY2F0aW9uc0FQSUVwaWNzLFxuXG4gICAgLy8gRGF0QWN0aW9ucyxcbiAgICAvLyBEZmhBY3Rpb25zLFxuICAgIC8vIEluZkFjdGlvbnMsXG4gICAgLy8gUHJvQWN0aW9ucyxcbiAgICAvLyBTeXNBY3Rpb25zLFxuICAgIC8vIFRhYkFjdGlvbnMsXG4gICAgLy8gV2FyQWN0aW9ucyxcblxuICAgIC8vIERhdEVwaWNzLFxuICAgIC8vIERmaEVwaWNzLFxuICAgIC8vIEluZkVwaWNzLFxuICAgIC8vIFByb0VwaWNzLFxuICAgIC8vIFN5c0VwaWNzLFxuICAgIC8vIFRhYkVwaWNzLFxuICAgIC8vIFdhckVwaWNzLFxuXG4gICAgLy8gUm9vdEVwaWNzLFxuICAgIC8vIC8vIFNjaGVtYUFjdGlvbnNGYWN0b3J5LFxuICAgIC8vIFNjaGVtYU9iamVjdFNlcnZpY2UsXG4gICAgLy8geyBwcm92aWRlOiBBUFBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IHt9IH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZWR1eE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJlZHV4TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBUFBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IHt9IH1dXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgZGV2VG9vbHM6IERldlRvb2xzRXh0ZW5zaW9uLFxuICAgIHJvb3RFcGljczogUm9vdEVwaWNzLFxuICAgIEBJbmplY3QoQVBQX0lOSVRJQUxfU1RBVEUpIGluaXRpYWxTdGF0ZTogSUFwcFN0YXRlLFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUmVkdXhNb2R1bGUsXG4gICAgQE9wdGlvbmFsKCkgc2RrTGIzOiBTZGtMYjNNb2R1bGUsXG4gICAgQE9wdGlvbmFsKCkgc2RrTGI0OiBTZGtMYjRNb2R1bGVcbiAgKSB7XG4gICAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG4gICAgaWYgKHBhcmVudE1vZHVsZSkgZXJyb3JzLnB1c2goJ1JlZHV4TW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaW4geW91ciBiYXNlIEFwcE1vZHVsZSBvbmx5LicpO1xuICAgIGlmICghc2RrTGIzKSBlcnJvcnMucHVzaCgnWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBTZGtMYjNNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhJyk7XG4gICAgaWYgKCFzZGtMYjQpIGVycm9ycy5wdXNoKCdZb3UgbmVlZCB0byBpbXBvcnQgdGhlIFNka0xiNE1vZHVsZSBpbiB5b3VyIEFwcE1vZHVsZSEnKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5qb2luKCdcXG4nKSk7XG5cblxuICAgIGNvbnN0IGVwaWNNaWRkbGV3YXJlID0gY3JlYXRlRXBpY01pZGRsZXdhcmUoKTtcblxuICAgIC8vIFRlbGwgUmVkdXggYWJvdXQgb3VyIHJlZHVjZXJzIGFuZCBlcGljcy4gSWYgdGhlIFJlZHV4IERldlRvb2xzXG4gICAgLy8gY2hyb21lIGV4dGVuc2lvbiBpcyBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIsIHRlbGwgUmVkdXggYWJvdXRcbiAgICAvLyBpdCB0b28uXG4gICAgbmdSZWR1eC5jb25maWd1cmVTdG9yZShcbiAgICAgIC8vIFJvb3RSZWR1Y2VyXG4gICAgICByb290UmVkdWNlcixcblxuICAgICAgLy8gSW5pdGlhbCBzdGF0ZVxuICAgICAgaW5pdGlhbFN0YXRlLFxuXG4gICAgICAvLyBNaWRkbGV3YXJlXG4gICAgICBbXG4gICAgICAgIC8vIGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICBlcGljTWlkZGxld2FyZSxcbiAgICAgICAgZHluYW1pY01pZGRsZXdhcmVzLFxuICAgICAgXSxcbiAgICAgIC8vIEVuaGFuY2Vyc1xuICAgICAgZGV2VG9vbHMuaXNFbmFibGVkKCkgPyBbZGV2VG9vbHMuZW5oYW5jZXIoKV0gOiBbXVxuICAgICk7XG5cbiAgICAvLyBBcHBseSByb290RXBpY1xuICAgIGVwaWNNaWRkbGV3YXJlLnJ1bihyb290RXBpY3MuZ2V0Um9vdEVwaWMoKSk7XG5cblxuICAgIC8vIC8vIEVuYWJsZSBzeW5jaW5nIG9mIEFuZ3VsYXIgcm91dGVyIHN0YXRlIHdpdGggb3VyIFJlZHV4IHN0b3JlLlxuICAgIC8vIGlmIChuZ1JlZHV4Um91dGVyKSB7XG4gICAgLy8gICAgIG5nUmVkdXhSb3V0ZXIuaW5pdGlhbGl6ZSgpO1xuICAgIC8vIH1cblxuICAgIC8vIEVuYWJsZSBzeW5jaW5nIG9mIEFuZ3VsYXIgZm9ybSBzdGF0ZSB3aXRoIG91ciBSZWR1eCBzdG9yZS5cbiAgICAvLyBwcm92aWRlUmVkdXhGb3JtcyhuZ1JlZHV4KTtcbiAgfVxufVxuIl19