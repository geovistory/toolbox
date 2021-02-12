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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdXgtc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9tb2R1bGUvcmVkdXgtc3RvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakYsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxrQkFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4SCxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlHLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3SCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0csT0FBTyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBaUJyRixNQUFNLEtBQU8sVUFBVTs7OztBQUFHLFVBQUMsSUFBYzs7OztBQUFLLFVBQUMsTUFBTTtJQUNuRCxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsSUFBSSxNQUFNLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQzs7UUFFdEQsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7O1FBQzdELElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztJQUNyQyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsSUFBQSxDQUFBOztBQUVELE1BQU0sS0FBTyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBWSxtQkFBbUIsQ0FBQztTQXNDdkMsRUFBRTtBQXBDOUM7SUF3Q0UsMEJBQ1MsT0FBMkIsRUFDbEMsUUFBMkI7SUFDM0IsZ0NBQWdDO0lBQ2hDLFNBQW9CLEVBQ08sWUFBdUI7UUFKM0MsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7O1lBTzVCLGNBQWMsR0FBRyxvQkFBb0IsRUFBRTtRQUU3QyxpRUFBaUU7UUFDakUsaUVBQWlFO1FBQ2pFLFVBQVU7UUFDVixPQUFPLENBQUMsY0FBYztRQUNwQixjQUFjO1FBQ2QsV0FBVztRQUVYLGdCQUFnQjtRQUNoQixZQUFZO1FBRVosYUFBYTtRQUNiO1lBQ0Usa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxrQkFBa0I7U0FDbkI7UUFDRCxZQUFZO1FBQ1osUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2xELENBQUM7UUFFRixpQkFBaUI7UUFDakIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUc1QyxrRUFBa0U7UUFDbEUsdUJBQXVCO1FBQ3ZCLGtDQUFrQztRQUNsQyxJQUFJO1FBRUosNkRBQTZEO1FBQzdELDhCQUE4QjtJQUNoQyxDQUFDOztnQkFqRkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxhQUFhO3FCQUNkO29CQUNELFNBQVMsRUFBRTt3QkFFVCxjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBRXZCLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLHFCQUFxQjt3QkFHckIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFFVixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixRQUFRO3dCQUVSLFNBQVM7d0JBQ1Qsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsSUFBSSxFQUFFO3FCQUM3QztpQkFDRjs7OztnQkE3RTJCLE9BQU87Z0JBQTFCLGlCQUFpQjtnQkFNakIsU0FBUztnREE4RWIsTUFBTSxTQUFDLGlCQUFpQjs7SUFxQzdCLHVCQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0EzQ1ksZ0JBQWdCOzs7SUFFekIsbUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhci1yZWR1eCBlY29zeXN0ZW0gc3R1ZmYuXG4vLyBAYW5ndWxhci1yZWR1eC9mb3JtIGFuZCBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYXJlIG9wdGlvbmFsXG4vLyBleHRlbnNpb25zIHRoYXQgc3luYyBmb3JtIGFuZCByb3V0ZSBsb2NhdGlvbiBzdGF0ZSBiZXR3ZWVuXG4vLyBvdXIgc3RvcmUgYW5kIEFuZ3VsYXIuXG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiwgTmdSZWR1eCwgTmdSZWR1eE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgZHluYW1pY01pZGRsZXdhcmVzIGZyb20gJ3JlZHV4LWR5bmFtaWMtbWlkZGxld2FyZXMnO1xuaW1wb3J0IHsgY3JlYXRlRXBpY01pZGRsZXdhcmUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgUm9vdEVwaWNzIH0gZnJvbSAnLi4vcm9vdC9yb290LWVwaWNzJztcbmltcG9ydCB7IHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vcm9vdC9yb290LXJlZHVjZXInO1xuaW1wb3J0IHsgQWNjb3VudEFjdGlvbnMsIEFjdGl2ZVByb2plY3RBY3Rpb25zLCBMb2FkaW5nQmFyQWN0aW9ucywgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS1ndWkvYWN0aW9ucyc7XG5pbXBvcnQgeyBBY2NvdW50RXBpY3MsIEFjdGl2ZVByb2plY3RFcGljcywgTG9hZGluZ0JhckVwaWNzLCBOb3RpZmljYXRpb25zQVBJRXBpY3MgfSBmcm9tICcuLi9zdGF0ZS1ndWkvZXBpY3MnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucywgRGZoQWN0aW9ucywgSW5mQWN0aW9ucywgUHJvQWN0aW9ucywgU3lzQWN0aW9ucywgVGFiQWN0aW9ucywgV2FyQWN0aW9ucyB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zJztcbmltcG9ydCB7IERhdEVwaWNzLCBEZmhFcGljcywgSW5mRXBpY3MsIFByb0VwaWNzLCBTeXNFcGljcywgVGFiRXBpY3MsIFdhckVwaWNzIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL2VwaWNzJztcbmltcG9ydCB7IFNjaGVtYUFjdGlvbnNGYWN0b3J5LCBTY2hlbWFPYmplY3RTZXJ2aWNlIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL19oZWxwZXJzJztcblxuXG5cblxuLyoqXG4gKiBGdW5jdGlvbiB0byB1c2UgaW4gY29tYmluYXRpb24gd2l0aCByeGpzL29wZXJhdG9yIC5maWx0ZXIoKVxuICogaW4gb3JkZXIgdG8gZ2V0IG9ubHkgYWN0aW9ucyBkaXNwYWNoZWQgd2l0aCBhIGZyYWN0YWxrZXlcbiAqIGVxdWFsIHRvIHRoZSBwcm92aWRlZCBwYXRoLlxuICpcbiAqIGV4YW1wbGU6XG4gKiBwaXBlKFxuICogICAgZmlsdGVyKGFjdGlvbiA9PiBvZlN1YnN0b3JlKGMuYmFzZVBhdGgpKGFjdGlvbikpLFxuICogICAgb2ZUeXBlKCdGb28nKVxuICogKVxuICogQHBhcmFtIHBhdGhcbiAqL1xuZXhwb3J0IGNvbnN0IG9mU3Vic3RvcmUgPSAocGF0aDogc3RyaW5nW10pID0+IChhY3Rpb24pOiBib29sZWFuID0+IHtcbiAgaWYgKCEoJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5JyBpbiBhY3Rpb24pKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgYWN0aW9uUGF0aCA9IEpTT04ucGFyc2UoYWN0aW9uWydAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSddKTtcbiAgY29uc3QgYm9vbCA9IGVxdWFscyhhY3Rpb25QYXRoLCBwYXRoKTtcbiAgcmV0dXJuIGJvb2w7XG59XG5cbmV4cG9ydCBjb25zdCBBUFBfSU5JVElBTF9TVEFURSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJQXBwU3RhdGU+KCdhcHAuSU5JVElBTF9TVEFURScpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmdSZWR1eE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG5cbiAgICBBY2NvdW50QWN0aW9ucyxcbiAgICBBY3RpdmVQcm9qZWN0QWN0aW9ucyxcbiAgICBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcblxuICAgIEFjY291bnRFcGljcyxcbiAgICBBY3RpdmVQcm9qZWN0RXBpY3MsXG4gICAgTG9hZGluZ0JhckVwaWNzLFxuICAgIE5vdGlmaWNhdGlvbnNBUElFcGljcyxcblxuXG4gICAgRGF0QWN0aW9ucyxcbiAgICBEZmhBY3Rpb25zLFxuICAgIEluZkFjdGlvbnMsXG4gICAgUHJvQWN0aW9ucyxcbiAgICBTeXNBY3Rpb25zLFxuICAgIFRhYkFjdGlvbnMsXG4gICAgV2FyQWN0aW9ucyxcblxuICAgIERhdEVwaWNzLFxuICAgIERmaEVwaWNzLFxuICAgIEluZkVwaWNzLFxuICAgIFByb0VwaWNzLFxuICAgIFN5c0VwaWNzLFxuICAgIFRhYkVwaWNzLFxuICAgIFdhckVwaWNzLFxuXG4gICAgUm9vdEVwaWNzLFxuICAgIFNjaGVtYUFjdGlvbnNGYWN0b3J5LFxuICAgIFNjaGVtYU9iamVjdFNlcnZpY2UsXG4gICAgeyBwcm92aWRlOiBBUFBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IHt9IH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSZWR1eFN0b3JlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBkZXZUb29sczogRGV2VG9vbHNFeHRlbnNpb24sXG4gICAgLy8gbmdSZWR1eFJvdXRlcjogTmdSZWR1eFJvdXRlcixcbiAgICByb290RXBpY3M6IFJvb3RFcGljcyxcbiAgICBASW5qZWN0KEFQUF9JTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU6IElBcHBTdGF0ZVxuICApIHtcblxuICAgIGNvbnN0IGVwaWNNaWRkbGV3YXJlID0gY3JlYXRlRXBpY01pZGRsZXdhcmUoKTtcblxuICAgIC8vIFRlbGwgUmVkdXggYWJvdXQgb3VyIHJlZHVjZXJzIGFuZCBlcGljcy4gSWYgdGhlIFJlZHV4IERldlRvb2xzXG4gICAgLy8gY2hyb21lIGV4dGVuc2lvbiBpcyBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIsIHRlbGwgUmVkdXggYWJvdXRcbiAgICAvLyBpdCB0b28uXG4gICAgbmdSZWR1eC5jb25maWd1cmVTdG9yZShcbiAgICAgIC8vIFJvb3RSZWR1Y2VyXG4gICAgICByb290UmVkdWNlcixcblxuICAgICAgLy8gSW5pdGlhbCBzdGF0ZVxuICAgICAgaW5pdGlhbFN0YXRlLFxuXG4gICAgICAvLyBNaWRkbGV3YXJlXG4gICAgICBbXG4gICAgICAgIC8vIGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICBlcGljTWlkZGxld2FyZSxcbiAgICAgICAgZHluYW1pY01pZGRsZXdhcmVzLFxuICAgICAgXSxcbiAgICAgIC8vIEVuaGFuY2Vyc1xuICAgICAgZGV2VG9vbHMuaXNFbmFibGVkKCkgPyBbZGV2VG9vbHMuZW5oYW5jZXIoKV0gOiBbXVxuICAgICk7XG5cbiAgICAvLyBBcHBseSByb290RXBpY1xuICAgIGVwaWNNaWRkbGV3YXJlLnJ1bihyb290RXBpY3MuZ2V0Um9vdEVwaWMoKSk7XG5cblxuICAgIC8vIC8vIEVuYWJsZSBzeW5jaW5nIG9mIEFuZ3VsYXIgcm91dGVyIHN0YXRlIHdpdGggb3VyIFJlZHV4IHN0b3JlLlxuICAgIC8vIGlmIChuZ1JlZHV4Um91dGVyKSB7XG4gICAgLy8gICAgIG5nUmVkdXhSb3V0ZXIuaW5pdGlhbGl6ZSgpO1xuICAgIC8vIH1cblxuICAgIC8vIEVuYWJsZSBzeW5jaW5nIG9mIEFuZ3VsYXIgZm9ybSBzdGF0ZSB3aXRoIG91ciBSZWR1eCBzdG9yZS5cbiAgICAvLyBwcm92aWRlUmVkdXhGb3JtcyhuZ1JlZHV4KTtcbiAgfVxufVxuIl19