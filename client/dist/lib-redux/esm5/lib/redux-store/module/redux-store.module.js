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
    function ReduxModule(ngRedux, devTools, rootEpics, initialState, parentModule, sdkLb3, sdkLb4) {
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
        { type: undefined, decorators: [{ type: Inject, args: [APP_INITIAL_STATE,] }] },
        { type: ReduxModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SdkLb3Module, decorators: [{ type: Optional }] },
        { type: SdkLb4Module, decorators: [{ type: Optional }] }
    ]; };
    return ReduxModule;
}());
export { ReduxModule };
if (false) {
    /** @type {?} */
    ReduxModule.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9tb2R1bGUvcmVkdXgtc3RvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBMkIsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0YsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZW5ELE1BQU0sS0FBTyxVQUFVOzs7O0FBQUcsVUFBQyxJQUFjOzs7O0FBQUssVUFBQyxNQUFNO0lBQ25ELElBQUksQ0FBQyxDQUFDLDRCQUE0QixJQUFJLE1BQU0sQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDOztRQUV0RCxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsNEJBQTRC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aUI7Z0JBQ2EsV0FBVyx1QkFBaEQsUUFBUSxZQUFJLFFBQVE7Z0JBL0ZoQixZQUFZLHVCQWdHaEIsUUFBUTtnQkEvRm9DLFlBQVksdUJBZ0d4RCxRQUFROztJQTJDYixrQkFBQztDQUFBLEFBckdELElBcUdDO1NBMURZLFdBQVc7OztJQVNwQiw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyLXJlZHV4IGVjb3N5c3RlbSBzdHVmZi5cbi8vIEBhbmd1bGFyLXJlZHV4L2Zvcm0gYW5kIEBhbmd1bGFyLXJlZHV4L3JvdXRlciBhcmUgb3B0aW9uYWxcbi8vIGV4dGVuc2lvbnMgdGhhdCBzeW5jIGZvcm0gYW5kIHJvdXRlIGxvY2F0aW9uIHN0YXRlIGJldHdlZW5cbi8vIG91ciBzdG9yZSBhbmQgQW5ndWxhci5cbmltcG9ydCB7IERldlRvb2xzRXh0ZW5zaW9uLCBOZ1JlZHV4LCBOZ1JlZHV4TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2xpbUxvYWRpbmdCYXJNb2R1bGUgfSBmcm9tICdAY2ltZS9uZ3gtc2xpbS1sb2FkaW5nLWJhcic7XG5pbXBvcnQgeyBUb2FzdHlNb2R1bGUgfSBmcm9tICdAY2ltZS9uZ3gtdG9hc3R5JztcbmltcG9ydCB7IFNka0xiM01vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBDb25maWd1cmF0aW9uUGFyYW1ldGVycywgU2RrTGI0TW9kdWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCBkeW5hbWljTWlkZGxld2FyZXMgZnJvbSAncmVkdXgtZHluYW1pYy1taWRkbGV3YXJlcyc7XG5pbXBvcnQgeyBjcmVhdGVFcGljTWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBSb290RXBpY3MgfSBmcm9tICcuLi9yb290L3Jvb3QtZXBpY3MnO1xuaW1wb3J0IHsgcm9vdFJlZHVjZXIgfSBmcm9tICcuLi9yb290L3Jvb3QtcmVkdWNlcic7XG5cblxuLyoqXG4gKiBGdW5jdGlvbiB0byB1c2UgaW4gY29tYmluYXRpb24gd2l0aCByeGpzL29wZXJhdG9yIC5maWx0ZXIoKVxuICogaW4gb3JkZXIgdG8gZ2V0IG9ubHkgYWN0aW9ucyBkaXNwYWNoZWQgd2l0aCBhIGZyYWN0YWxrZXlcbiAqIGVxdWFsIHRvIHRoZSBwcm92aWRlZCBwYXRoLlxuICpcbiAqIGV4YW1wbGU6XG4gKiBwaXBlKFxuICogICAgZmlsdGVyKGFjdGlvbiA9PiBvZlN1YnN0b3JlKGMuYmFzZVBhdGgpKGFjdGlvbikpLFxuICogICAgb2ZUeXBlKCdGb28nKVxuICogKVxuICogQHBhcmFtIHBhdGhcbiAqL1xuZXhwb3J0IGNvbnN0IG9mU3Vic3RvcmUgPSAocGF0aDogc3RyaW5nW10pID0+IChhY3Rpb24pOiBib29sZWFuID0+IHtcbiAgaWYgKCEoJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5JyBpbiBhY3Rpb24pKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgYWN0aW9uUGF0aCA9IEpTT04ucGFyc2UoYWN0aW9uWydAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSddKTtcbiAgY29uc3QgYm9vbCA9IGVxdWFscyhhY3Rpb25QYXRoLCBwYXRoKTtcbiAgcmV0dXJuIGJvb2w7XG59XG5cbmV4cG9ydCBjb25zdCBBUFBfSU5JVElBTF9TVEFURSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJQXBwU3RhdGU+KCdhcHAuSU5JVElBTF9TVEFURScpO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBpQ29uZmlnRmFjdG9yeSgpOiBDb25maWd1cmF0aW9uIHtcbiAgY29uc3QgcGFyYW1zOiBDb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IHtcbiAgICAvLyBzZXQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGhlcmUuXG4gIH1cbiAgcmV0dXJuIG5ldyBDb25maWd1cmF0aW9uKHBhcmFtcyk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOZ1JlZHV4TW9kdWxlLFxuXG4gICAgLy8gZm9yIGd1aS1zdGF0ZSBlcGljc1xuICAgIFNsaW1Mb2FkaW5nQmFyTW9kdWxlLFxuICAgIFRvYXN0eU1vZHVsZS5mb3JSb290KCksXG5cbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG5cbiAgICAvLyBBY2NvdW50QWN0aW9ucyxcbiAgICAvLyBBY3RpdmVQcm9qZWN0QWN0aW9ucyxcbiAgICAvLyBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICAvLyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcblxuICAgIC8vIEFjY291bnRFcGljcyxcbiAgICAvLyBBY3RpdmVQcm9qZWN0RXBpY3MsXG4gICAgLy8gTG9hZGluZ0JhckVwaWNzLFxuICAgIC8vIE5vdGlmaWNhdGlvbnNBUElFcGljcyxcblxuICAgIC8vIERhdEFjdGlvbnMsXG4gICAgLy8gRGZoQWN0aW9ucyxcbiAgICAvLyBJbmZBY3Rpb25zLFxuICAgIC8vIFByb0FjdGlvbnMsXG4gICAgLy8gU3lzQWN0aW9ucyxcbiAgICAvLyBUYWJBY3Rpb25zLFxuICAgIC8vIFdhckFjdGlvbnMsXG5cbiAgICAvLyBEYXRFcGljcyxcbiAgICAvLyBEZmhFcGljcyxcbiAgICAvLyBJbmZFcGljcyxcbiAgICAvLyBQcm9FcGljcyxcbiAgICAvLyBTeXNFcGljcyxcbiAgICAvLyBUYWJFcGljcyxcbiAgICAvLyBXYXJFcGljcyxcblxuICAgIC8vIFJvb3RFcGljcyxcbiAgICAvLyAvLyBTY2hlbWFBY3Rpb25zRmFjdG9yeSxcbiAgICAvLyBTY2hlbWFPYmplY3RTZXJ2aWNlLFxuICAgIC8vIHsgcHJvdmlkZTogQVBQX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiB7fSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVkdXhNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSZWR1eE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQVBQX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiB7fSB9XVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIGRldlRvb2xzOiBEZXZUb29sc0V4dGVuc2lvbixcbiAgICByb290RXBpY3M6IFJvb3RFcGljcyxcbiAgICBASW5qZWN0KEFQUF9JTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU6IElBcHBTdGF0ZSxcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFJlZHV4TW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHNka0xiMzogU2RrTGIzTW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHNka0xiNDogU2RrTGI0TW9kdWxlXG4gICkge1xuICAgIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXVxuICAgIGlmIChwYXJlbnRNb2R1bGUpIGVycm9ycy5wdXNoKCdSZWR1eE1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGluIHlvdXIgYmFzZSBBcHBNb2R1bGUgb25seS4nKTtcbiAgICBpZiAoIXNka0xiMykgZXJyb3JzLnB1c2goJ1lvdSBuZWVkIHRvIGltcG9ydCB0aGUgU2RrTGIzTW9kdWxlIGluIHlvdXIgQXBwTW9kdWxlIScpO1xuICAgIGlmICghc2RrTGI0KSBlcnJvcnMucHVzaCgnWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBTZGtMYjRNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhJyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihlcnJvcnMuam9pbignXFxuJykpO1xuXG5cbiAgICBjb25zdCBlcGljTWlkZGxld2FyZSA9IGNyZWF0ZUVwaWNNaWRkbGV3YXJlKCk7XG5cbiAgICAvLyBUZWxsIFJlZHV4IGFib3V0IG91ciByZWR1Y2VycyBhbmQgZXBpY3MuIElmIHRoZSBSZWR1eCBEZXZUb29sc1xuICAgIC8vIGNocm9tZSBleHRlbnNpb24gaXMgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyLCB0ZWxsIFJlZHV4IGFib3V0XG4gICAgLy8gaXQgdG9vLlxuICAgIG5nUmVkdXguY29uZmlndXJlU3RvcmUoXG4gICAgICAvLyBSb290UmVkdWNlclxuICAgICAgcm9vdFJlZHVjZXIsXG5cbiAgICAgIC8vIEluaXRpYWwgc3RhdGVcbiAgICAgIGluaXRpYWxTdGF0ZSxcblxuICAgICAgLy8gTWlkZGxld2FyZVxuICAgICAgW1xuICAgICAgICAvLyBjcmVhdGVMb2dnZXIoKSxcbiAgICAgICAgZXBpY01pZGRsZXdhcmUsXG4gICAgICAgIGR5bmFtaWNNaWRkbGV3YXJlcyxcbiAgICAgIF0sXG4gICAgICAvLyBFbmhhbmNlcnNcbiAgICAgIGRldlRvb2xzLmlzRW5hYmxlZCgpID8gW2RldlRvb2xzLmVuaGFuY2VyKCldIDogW11cbiAgICApO1xuXG4gICAgLy8gQXBwbHkgcm9vdEVwaWNcbiAgICBlcGljTWlkZGxld2FyZS5ydW4ocm9vdEVwaWNzLmdldFJvb3RFcGljKCkpO1xuXG5cbiAgICAvLyAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIHJvdXRlciBzdGF0ZSB3aXRoIG91ciBSZWR1eCBzdG9yZS5cbiAgICAvLyBpZiAobmdSZWR1eFJvdXRlcikge1xuICAgIC8vICAgICBuZ1JlZHV4Um91dGVyLmluaXRpYWxpemUoKTtcbiAgICAvLyB9XG5cbiAgICAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIGZvcm0gc3RhdGUgd2l0aCBvdXIgUmVkdXggc3RvcmUuXG4gICAgLy8gcHJvdmlkZVJlZHV4Rm9ybXMobmdSZWR1eCk7XG4gIH1cbn1cbiJdfQ==