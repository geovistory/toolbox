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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9tb2R1bGUvcmVkdXgtc3RvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0Ms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Qjt3QkFDekIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUMxQixTQUFTO3FCQUVWO29CQUNELFNBQVMsRUFBRTt3QkFFVCxjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBRXZCLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLHFCQUFxQjt3QkFHckIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFFVixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixRQUFRO3dCQUVSLFNBQVM7d0JBQ1Qsd0JBQXdCO3dCQUN4QixtQkFBbUI7d0JBQ25CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsSUFBSSxFQUFFO3FCQUM3QztpQkFDRjs7OztnQkE1RzJCLE9BQU87Z0JBQTFCLGlCQUFpQjtnQkFVakIsU0FBUztnREF5R2IsTUFBTSxTQUFDLGlCQUFpQjs7SUFxQzdCLHVCQUFDO0NBQUEsQUEzRkQsSUEyRkM7U0EzQ1ksZ0JBQWdCOzs7SUFFekIsbUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhci1yZWR1eCBlY29zeXN0ZW0gc3R1ZmYuXG4vLyBAYW5ndWxhci1yZWR1eC9mb3JtIGFuZCBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYXJlIG9wdGlvbmFsXG4vLyBleHRlbnNpb25zIHRoYXQgc3luYyBmb3JtIGFuZCByb3V0ZSBsb2NhdGlvbiBzdGF0ZSBiZXR3ZWVuXG4vLyBvdXIgc3RvcmUgYW5kIEFuZ3VsYXIuXG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiwgTmdSZWR1eCwgTmdSZWR1eE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbGltTG9hZGluZ0Jhck1vZHVsZSB9IGZyb20gJ0BjaW1lL25neC1zbGltLWxvYWRpbmctYmFyJztcbmltcG9ydCB7IFRvYXN0eU1vZHVsZSB9IGZyb20gJ0BjaW1lL25neC10b2FzdHknO1xuaW1wb3J0IHsgU0RLQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBBcGlNb2R1bGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IGR5bmFtaWNNaWRkbGV3YXJlcyBmcm9tICdyZWR1eC1keW5hbWljLW1pZGRsZXdhcmVzJztcbmltcG9ydCB7IGNyZWF0ZUVwaWNNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IFJvb3RFcGljcyB9IGZyb20gJy4uL3Jvb3Qvcm9vdC1lcGljcyc7XG5pbXBvcnQgeyByb290UmVkdWNlciB9IGZyb20gJy4uL3Jvb3Qvcm9vdC1yZWR1Y2VyJztcbmltcG9ydCB7IEFjY291bnRBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY2NvdW50RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MvYWNjb3VudC5lcGljcyc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0RXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MvYWN0aXZlLXByb2plY3QuZXBpY3MnO1xuaW1wb3J0IHsgTG9hZGluZ0JhckVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL2VwaWNzL2xvYWRpbmctYmFyLmVwaWNzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElFcGljcyB9IGZyb20gJy4uL3N0YXRlLWd1aS9lcGljcy9ub3RpZmljYXRpb25zLmVwaWNzJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBEZmhBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvZGZoLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBTeXNBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvc3lzLmFjdGlvbnMnO1xuaW1wb3J0IHsgVGFiQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3RhYi5hY3Rpb25zJztcbmltcG9ydCB7IFdhckFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy93YXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9kYXQuZXBpY3MnO1xuaW1wb3J0IHsgRGZoRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3MvZGZoLmVwaWNzJztcbmltcG9ydCB7IEluZkVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL2luZi5lcGljcyc7XG5pbXBvcnQgeyBQcm9FcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy9wcm8uZXBpY3MnO1xuaW1wb3J0IHsgU3lzRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvZXBpY3Mvc3lzLmVwaWNzJztcbmltcG9ydCB7IFRhYkVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzL3RhYi5lcGljcyc7XG5pbXBvcnQgeyBXYXJFcGljcyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9lcGljcy93YXIuZXBpY3MnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0U2VydmljZSB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9zZXJ2aWNlcy9zY2hlbWEtb2JqZWN0LnNlcnZpY2UnO1xuXG5cblxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIHVzZSBpbiBjb21iaW5hdGlvbiB3aXRoIHJ4anMvb3BlcmF0b3IgLmZpbHRlcigpXG4gKiBpbiBvcmRlciB0byBnZXQgb25seSBhY3Rpb25zIGRpc3BhY2hlZCB3aXRoIGEgZnJhY3RhbGtleVxuICogZXF1YWwgdG8gdGhlIHByb3ZpZGVkIHBhdGguXG4gKlxuICogZXhhbXBsZTpcbiAqIHBpcGUoXG4gKiAgICBmaWx0ZXIoYWN0aW9uID0+IG9mU3Vic3RvcmUoYy5iYXNlUGF0aCkoYWN0aW9uKSksXG4gKiAgICBvZlR5cGUoJ0ZvbycpXG4gKiApXG4gKiBAcGFyYW0gcGF0aFxuICovXG5leHBvcnQgY29uc3Qgb2ZTdWJzdG9yZSA9IChwYXRoOiBzdHJpbmdbXSkgPT4gKGFjdGlvbik6IGJvb2xlYW4gPT4ge1xuICBpZiAoISgnQGFuZ3VsYXItcmVkdXg6OmZyYWN0YWxrZXknIGluIGFjdGlvbikpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBhY3Rpb25QYXRoID0gSlNPTi5wYXJzZShhY3Rpb25bJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5J10pO1xuICBjb25zdCBib29sID0gZXF1YWxzKGFjdGlvblBhdGgsIHBhdGgpO1xuICByZXR1cm4gYm9vbDtcbn1cblxuZXhwb3J0IGNvbnN0IEFQUF9JTklUSUFMX1NUQVRFID0gbmV3IEluamVjdGlvblRva2VuPElBcHBTdGF0ZT4oJ2FwcC5JTklUSUFMX1NUQVRFJyk7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOZ1JlZHV4TW9kdWxlLFxuXG4gICAgLy8gZm9yIGd1aS1zdGF0ZSBlcGljc1xuICAgIFNsaW1Mb2FkaW5nQmFyTW9kdWxlLFxuICAgIFRvYXN0eU1vZHVsZS5mb3JSb290KCksXG5cbiAgICAvLyBmb3Igc2NoZW1hLXN0YXRlIGVwaWNzXG4gICAgU0RLQnJvd3Nlck1vZHVsZS5mb3JSb290KCksIC8vIGxpYi1zZGstbGIzXG4gICAgQXBpTW9kdWxlLCAvLyBsaWItc2RrLWxiNFxuXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuXG4gICAgQWNjb3VudEFjdGlvbnMsXG4gICAgQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG5cbiAgICBBY2NvdW50RXBpY3MsXG4gICAgQWN0aXZlUHJvamVjdEVwaWNzLFxuICAgIExvYWRpbmdCYXJFcGljcyxcbiAgICBOb3RpZmljYXRpb25zQVBJRXBpY3MsXG5cblxuICAgIERhdEFjdGlvbnMsXG4gICAgRGZoQWN0aW9ucyxcbiAgICBJbmZBY3Rpb25zLFxuICAgIFByb0FjdGlvbnMsXG4gICAgU3lzQWN0aW9ucyxcbiAgICBUYWJBY3Rpb25zLFxuICAgIFdhckFjdGlvbnMsXG5cbiAgICBEYXRFcGljcyxcbiAgICBEZmhFcGljcyxcbiAgICBJbmZFcGljcyxcbiAgICBQcm9FcGljcyxcbiAgICBTeXNFcGljcyxcbiAgICBUYWJFcGljcyxcbiAgICBXYXJFcGljcyxcblxuICAgIFJvb3RFcGljcyxcbiAgICAvLyBTY2hlbWFBY3Rpb25zRmFjdG9yeSxcbiAgICBTY2hlbWFPYmplY3RTZXJ2aWNlLFxuICAgIHsgcHJvdmlkZTogQVBQX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiB7fSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmVkdXhTdG9yZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgZGV2VG9vbHM6IERldlRvb2xzRXh0ZW5zaW9uLFxuICAgIC8vIG5nUmVkdXhSb3V0ZXI6IE5nUmVkdXhSb3V0ZXIsXG4gICAgcm9vdEVwaWNzOiBSb290RXBpY3MsXG4gICAgQEluamVjdChBUFBfSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBJQXBwU3RhdGVcbiAgKSB7XG5cbiAgICBjb25zdCBlcGljTWlkZGxld2FyZSA9IGNyZWF0ZUVwaWNNaWRkbGV3YXJlKCk7XG5cbiAgICAvLyBUZWxsIFJlZHV4IGFib3V0IG91ciByZWR1Y2VycyBhbmQgZXBpY3MuIElmIHRoZSBSZWR1eCBEZXZUb29sc1xuICAgIC8vIGNocm9tZSBleHRlbnNpb24gaXMgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyLCB0ZWxsIFJlZHV4IGFib3V0XG4gICAgLy8gaXQgdG9vLlxuICAgIG5nUmVkdXguY29uZmlndXJlU3RvcmUoXG4gICAgICAvLyBSb290UmVkdWNlclxuICAgICAgcm9vdFJlZHVjZXIsXG5cbiAgICAgIC8vIEluaXRpYWwgc3RhdGVcbiAgICAgIGluaXRpYWxTdGF0ZSxcblxuICAgICAgLy8gTWlkZGxld2FyZVxuICAgICAgW1xuICAgICAgICAvLyBjcmVhdGVMb2dnZXIoKSxcbiAgICAgICAgZXBpY01pZGRsZXdhcmUsXG4gICAgICAgIGR5bmFtaWNNaWRkbGV3YXJlcyxcbiAgICAgIF0sXG4gICAgICAvLyBFbmhhbmNlcnNcbiAgICAgIGRldlRvb2xzLmlzRW5hYmxlZCgpID8gW2RldlRvb2xzLmVuaGFuY2VyKCldIDogW11cbiAgICApO1xuXG4gICAgLy8gQXBwbHkgcm9vdEVwaWNcbiAgICBlcGljTWlkZGxld2FyZS5ydW4ocm9vdEVwaWNzLmdldFJvb3RFcGljKCkpO1xuXG5cbiAgICAvLyAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIHJvdXRlciBzdGF0ZSB3aXRoIG91ciBSZWR1eCBzdG9yZS5cbiAgICAvLyBpZiAobmdSZWR1eFJvdXRlcikge1xuICAgIC8vICAgICBuZ1JlZHV4Um91dGVyLmluaXRpYWxpemUoKTtcbiAgICAvLyB9XG5cbiAgICAvLyBFbmFibGUgc3luY2luZyBvZiBBbmd1bGFyIGZvcm0gc3RhdGUgd2l0aCBvdXIgUmVkdXggc3RvcmUuXG4gICAgLy8gcHJvdmlkZVJlZHV4Rm9ybXMobmdSZWR1eCk7XG4gIH1cbn1cbiJdfQ==