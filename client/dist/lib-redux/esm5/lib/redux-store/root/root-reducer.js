/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import { accountRootReducer, activeProjectReducer, createProjectsReducer, informationReducer, loadingBarReducer, sourceListReducer } from '../state-gui/reducers';
import { createDatReducer, createDfhReducer, createInfReducer, createProReducer, createSysReducer, createTabReducer, createWarReducer } from '../state-schema/reducers';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9yb290L3Jvb3QtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsSyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFHeEssTUFBTSxLQUFPLGtCQUFrQixHQUFHLG9CQUFvQjs7QUFDdEQsTUFBTSxLQUFPLG1CQUFtQjs7Ozs7QUFBRyxVQUFDLFNBQWMsRUFBRSxNQUErQjtJQUEvQywwQkFBQSxFQUFBLGNBQWM7SUFDaEQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFO1FBQ3RDLFNBQVMsd0JBQ0osU0FBUyxFQUNULE1BQU0sQ0FBQyxPQUFPLENBQ2xCLENBQUM7S0FDSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQTs7QUFHRCxNQUFNLEtBQU8scUJBQXFCOzs7OztBQUFHLFVBQUMsS0FBVSxFQUFFLE1BQU07O0lBQWxCLHNCQUFBLEVBQUEsVUFBVTtJQUU5QyxJQUFJLE1BQU0s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ZWR1Y2VyIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvZm9ybSc7XG5pbXBvcnQgeyByb3V0ZXJSZWR1Y2VyIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvcm91dGVyJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IG9taXQgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBhY2NvdW50Um9vdFJlZHVjZXIsIGFjdGl2ZVByb2plY3RSZWR1Y2VyLCBjcmVhdGVQcm9qZWN0c1JlZHVjZXIsIGluZm9ybWF0aW9uUmVkdWNlciwgbG9hZGluZ0JhclJlZHVjZXIsIHNvdXJjZUxpc3RSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzJztcbmltcG9ydCB7IGNyZWF0ZURhdFJlZHVjZXIsIGNyZWF0ZURmaFJlZHVjZXIsIGNyZWF0ZUluZlJlZHVjZXIsIGNyZWF0ZVByb1JlZHVjZXIsIGNyZWF0ZVN5c1JlZHVjZXIsIGNyZWF0ZVRhYlJlZHVjZXIsIGNyZWF0ZVdhclJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMnO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1NBTkRCT1hfU1RBVEUgPSAnSU5JVF9TQU5EQk9YX1NUQVRFJztcbmV4cG9ydCBjb25zdCBzYW5kYm94U3RhdGVSZWR1Y2VyID0gKGxhc3RTdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+KSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSU5JVF9TQU5EQk9YX1NUQVRFKSB7XG4gICAgbGFzdFN0YXRlID0ge1xuICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICB9O1xuICB9XG4gIHJldHVybiBsYXN0U3RhdGU7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBwZW5kaW5nUmVxdWVzdFJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIFt1dWlkXTogdHJ1ZVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnYWRkICcgKyB1dWlkICsgJyAnICsgRGF0ZS5ub3coKSlcbiAgfVxuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4ub21pdChbdXVpZF0sIHN0YXRlKVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkUmVxdWVzdFJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIFt1dWlkXTogYWN0aW9uLm1ldGFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYW51cFJlc29sdmVkID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09ICdDTEVBTl9VUF9SRVNPTFZFRCcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEudXVpZDtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLm9taXQoW3V1aWRdLCBzdGF0ZSlcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ3Jlc29sdmUgJyArIHV1aWQgKyAnICcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpXG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuZXhwb3J0IGNvbnN0IFNFVF9BUFBfU1RBVEUgPSAnU0VUX0FQUF9TVEFURSc7XG5leHBvcnQgY29uc3Qgc2V0QXBwU3RhdGUgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IFNFVF9BUFBfU1RBVEUpIHtcbiAgICBzdGF0ZSA9IGFjdGlvbi5wYXlsb2FkXG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21wb3NlUmVkdWNlcnMoXG4gIGRlZmF1bHRGb3JtUmVkdWNlcigpLFxuICBjb21iaW5lUmVkdWNlcnMoe1xuICAgIGFjY291bnQ6IGFjY291bnRSb290UmVkdWNlcixcbiAgICBsb2FkaW5nQmFyOiBsb2FkaW5nQmFyUmVkdWNlcixcbiAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0UmVkdWNlcixcbiAgICByb3V0ZXM6IHJvdXRlclJlZHVjZXIsXG4gICAgaW5mb3JtYXRpb246IGluZm9ybWF0aW9uUmVkdWNlcixcbiAgICBzb3VyY2VzOiBzb3VyY2VMaXN0UmVkdWNlcixcbiAgICBzYW5kYm94U3RhdGU6IHNhbmRib3hTdGF0ZVJlZHVjZXIsXG4gICAgcHJvamVjdHM6IGNyZWF0ZVByb2plY3RzUmVkdWNlcigpLFxuICAgIHN5czogY3JlYXRlU3lzUmVkdWNlcigpLFxuICAgIGRmaDogY3JlYXRlRGZoUmVkdWNlcigpLFxuICAgIGluZjogY3JlYXRlSW5mUmVkdWNlcigpLFxuICAgIGRhdDogY3JlYXRlRGF0UmVkdWNlcigpLFxuICAgIHBybzogY3JlYXRlUHJvUmVkdWNlcigpLFxuICAgIHdhcjogY3JlYXRlV2FyUmVkdWNlcigpLFxuICAgIHRhYjogY3JlYXRlVGFiUmVkdWNlcigpLFxuICAgIHBlbmRpbmc6IHBlbmRpbmdSZXF1ZXN0UmVkdWNlcixcbiAgICByZXNvbHZlZDogY29tcG9zZVJlZHVjZXJzKHJlc29sdmVkUmVxdWVzdFJlZHVjZXIsIGNsZWFudXBSZXNvbHZlZCksXG4gIH0pLFxuICBzZXRBcHBTdGF0ZVxuKVxuIl19