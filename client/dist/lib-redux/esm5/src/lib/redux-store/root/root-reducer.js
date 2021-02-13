/**
 * @fileoverview added by tsickle
 * Generated from: root/root-reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import { accountRootReducer } from '../state-gui/reducers/account.reducers';
import { loadingBarReducer } from '../state-gui/reducers/loading-bar.reducer';
import { activeProjectReducer } from '../state-gui/reducers/active-project.reducer';
import { informationReducer } from '../state-gui/reducers/entity-list.reducer';
import { sourceListReducer } from '../state-gui/reducers/source-list.reducer';
import { createProjectsReducer } from '../state-gui/reducers/projects.reducers';
import { createSysReducer } from '../state-schema/reducers/sys.reducer';
import { createDfhReducer } from '../state-schema/reducers/dfh.reducer';
import { createInfReducer } from '../state-schema/reducers/inf.reducer';
import { createDatReducer } from '../state-schema/reducers/dat.reducer';
import { createProReducer } from '../state-schema/reducers/pro.reducer';
import { createWarReducer } from '../state-schema/reducers/war.reducer';
import { createTabReducer } from '../state-schema/reducers/tab.reducer';
/** @type {?} */
export var INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
/** @type {?} */
export var sandboxStateReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = {}; }
    if (action.type === INIT_SANDBOX_STATE) {
        lastState = tslib_1.__assign({}, lastState, action.payload);
    }
    return lastState;
});
/** @type {?} */
export var pendingRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action && action.meta && action.meta.addPending) {
        /** @type {?} */
        var uuid = action.meta.addPending;
        state = tslib_1.__assign({}, state, (_a = {}, _a[uuid] = true, _a));
        // console.log('add ' + uuid + ' ' + Date.now())
    }
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        var uuid = action.meta.removePending;
        state = tslib_1.__assign({}, omit([uuid], state));
    }
    return state;
});
/** @type {?} */
export var resolvedRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        var uuid = action.meta.removePending;
        state = tslib_1.__assign({}, state, (_a = {}, _a[uuid] = action.meta, _a));
    }
    return state;
});
/** @type {?} */
export var cleanupResolved = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    if (state === void 0) { state = {}; }
    if (action && action.type === 'CLEAN_UP_RESOLVED') {
        /** @type {?} */
        var uuid = action.meta.uuid;
        state = tslib_1.__assign({}, omit([uuid], state));
        // console.log('resolve ' + uuid + ' ' + Date.now().toString())
    }
    return state;
});
/** @type {?} */
export var SET_APP_STATE = 'SET_APP_STATE';
/** @type {?} */
export var setAppState = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    if (state === void 0) { state = {}; }
    if (action && action.type === SET_APP_STATE) {
        state = action.payload;
    }
    return state;
});
/** @type {?} */
export var rootReducer = composeReducers(defaultFormReducer(), combineReducers({
    account: accountRootReducer,
    loadingBar: loadingBarReducer,
    activeProject: activeProjectReducer,
    routes: routerReducer,
    information: informationReducer,
    sources: sourceListReducer,
    sandboxState: sandboxStateReducer,
    projects: createProjectsReducer(),
    sys: createSysReducer(),
    dfh: createDfhReducer(),
    inf: createInfReducer(),
    dat: createDatReducer(),
    pro: createProReducer(),
    war: createWarReducer(),
    tab: createTabReducer(),
    pending: pendingRequestReducer,
    resolved: composeReducers(resolvedRequestReducer, cleanupResolved),
}), setAppState);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsicm9vdC9yb290LXJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDeEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdC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QUFFLHFCQUFxQixFQUFFO0lBQ2pDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixPQUFPLEVBQUUscUJBQXFCO0lBQzlCLFFBQVEsRUFBRSxlQUFlLENBQUMsc0JBQXNCLEVBQUUsZUFBZSxDQUFDO0NBQ25FLENBQUMsRUFDRixXQUFXLENBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlUmVkdWNlcnMsIGRlZmF1bHRGb3JtUmVkdWNlciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L2Zvcm0nO1xuaW1wb3J0IHsgcm91dGVyUmVkdWNlciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3JvdXRlcic7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgYWNjb3VudFJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL2FjY291bnQucmVkdWNlcnMnO1xuaW1wb3J0IHsgbG9hZGluZ0JhclJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvbG9hZGluZy1iYXIucmVkdWNlcic7XG5pbXBvcnQgeyBhY3RpdmVQcm9qZWN0UmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9hY3RpdmUtcHJvamVjdC5yZWR1Y2VyJztcbmltcG9ydCB7IGluZm9ybWF0aW9uUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9lbnRpdHktbGlzdC5yZWR1Y2VyJztcbmltcG9ydCB7IHNvdXJjZUxpc3RSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL3NvdXJjZS1saXN0LnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdHNSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL3Byb2plY3RzLnJlZHVjZXJzJztcbmltcG9ydCB7IGNyZWF0ZVN5c1JlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvc3lzLnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlRGZoUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9kZmgucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVJbmZSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL2luZi5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZURhdFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvZGF0LnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlUHJvUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9wcm8ucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVXYXJSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL3dhci5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZVRhYlJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvdGFiLnJlZHVjZXInO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1NBTkRCT1hfU1RBVEUgPSAnSU5JVF9TQU5EQk9YX1NUQVRFJztcbmV4cG9ydCBjb25zdCBzYW5kYm94U3RhdGVSZWR1Y2VyID0gKGxhc3RTdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+KSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSU5JVF9TQU5EQk9YX1NUQVRFKSB7XG4gICAgbGFzdFN0YXRlID0ge1xuICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICB9O1xuICB9XG4gIHJldHVybiBsYXN0U3RhdGU7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBwZW5kaW5nUmVxdWVzdFJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIFt1dWlkXTogdHJ1ZVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnYWRkICcgKyB1dWlkICsgJyAnICsgRGF0ZS5ub3coKSlcbiAgfVxuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4ub21pdChbdXVpZF0sIHN0YXRlKVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkUmVxdWVzdFJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIFt1dWlkXTogYWN0aW9uLm1ldGFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYW51cFJlc29sdmVkID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09ICdDTEVBTl9VUF9SRVNPTFZFRCcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEudXVpZDtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLm9taXQoW3V1aWRdLCBzdGF0ZSlcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ3Jlc29sdmUgJyArIHV1aWQgKyAnICcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpXG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuZXhwb3J0IGNvbnN0IFNFVF9BUFBfU1RBVEUgPSAnU0VUX0FQUF9TVEFURSc7XG5leHBvcnQgY29uc3Qgc2V0QXBwU3RhdGUgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IFNFVF9BUFBfU1RBVEUpIHtcbiAgICBzdGF0ZSA9IGFjdGlvbi5wYXlsb2FkXG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21wb3NlUmVkdWNlcnMoXG4gIGRlZmF1bHRGb3JtUmVkdWNlcigpLFxuICBjb21iaW5lUmVkdWNlcnMoe1xuICAgIGFjY291bnQ6IGFjY291bnRSb290UmVkdWNlcixcbiAgICBsb2FkaW5nQmFyOiBsb2FkaW5nQmFyUmVkdWNlcixcbiAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0UmVkdWNlcixcbiAgICByb3V0ZXM6IHJvdXRlclJlZHVjZXIsXG4gICAgaW5mb3JtYXRpb246IGluZm9ybWF0aW9uUmVkdWNlcixcbiAgICBzb3VyY2VzOiBzb3VyY2VMaXN0UmVkdWNlcixcbiAgICBzYW5kYm94U3RhdGU6IHNhbmRib3hTdGF0ZVJlZHVjZXIsXG4gICAgcHJvamVjdHM6IGNyZWF0ZVByb2plY3RzUmVkdWNlcigpLFxuICAgIHN5czogY3JlYXRlU3lzUmVkdWNlcigpLFxuICAgIGRmaDogY3JlYXRlRGZoUmVkdWNlcigpLFxuICAgIGluZjogY3JlYXRlSW5mUmVkdWNlcigpLFxuICAgIGRhdDogY3JlYXRlRGF0UmVkdWNlcigpLFxuICAgIHBybzogY3JlYXRlUHJvUmVkdWNlcigpLFxuICAgIHdhcjogY3JlYXRlV2FyUmVkdWNlcigpLFxuICAgIHRhYjogY3JlYXRlVGFiUmVkdWNlcigpLFxuICAgIHBlbmRpbmc6IHBlbmRpbmdSZXF1ZXN0UmVkdWNlcixcbiAgICByZXNvbHZlZDogY29tcG9zZVJlZHVjZXJzKHJlc29sdmVkUmVxdWVzdFJlZHVjZXIsIGNsZWFudXBSZXNvbHZlZCksXG4gIH0pLFxuICBzZXRBcHBTdGF0ZVxuKVxuIl19