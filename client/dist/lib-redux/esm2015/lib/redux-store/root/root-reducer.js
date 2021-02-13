/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
/** @type {?} */
export const sandboxStateReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
(lastState = {}, action) => {
    if (action.type === INIT_SANDBOX_STATE) {
        lastState = Object.assign({}, lastState, action.payload);
    }
    return lastState;
});
/** @type {?} */
export const pendingRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.meta && action.meta.addPending) {
        /** @type {?} */
        const uuid = action.meta.addPending;
        state = Object.assign({}, state, { [uuid]: true });
        // console.log('add ' + uuid + ' ' + Date.now())
    }
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        const uuid = action.meta.removePending;
        state = Object.assign({}, omit([uuid], state));
    }
    return state;
});
/** @type {?} */
export const resolvedRequestReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.meta && action.meta.removePending) {
        /** @type {?} */
        const uuid = action.meta.removePending;
        state = Object.assign({}, state, { [uuid]: action.meta });
    }
    return state;
});
/** @type {?} */
export const cleanupResolved = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.type === 'CLEAN_UP_RESOLVED') {
        /** @type {?} */
        const uuid = action.meta.uuid;
        state = Object.assign({}, omit([uuid], state));
        // console.log('resolve ' + uuid + ' ' + Date.now().toString())
    }
    return state;
});
/** @type {?} */
export const SET_APP_STATE = 'SET_APP_STATE';
/** @type {?} */
export const setAppState = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = {}, action) => {
    if (action && action.type === SET_APP_STATE) {
        state = action.payload;
    }
    return state;
});
/** @type {?} */
export const rootReducer = composeReducers(defaultFormReducer(), combineReducers({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9yb290L3Jvb3QtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0Is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USxFQUFFLHFCQUFxQixFQUFFO0lBQ2pDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixPQUFPLEVBQUUscUJBQXFCO0lBQzlCLFFBQVEsRUFBRSxlQUFlLENBQUMsc0JBQXNCLEVBQUUsZUFBZSxDQUFDO0NBQ25FLENBQUMsRUFDRixXQUFXLENBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlUmVkdWNlcnMsIGRlZmF1bHRGb3JtUmVkdWNlciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L2Zvcm0nO1xuaW1wb3J0IHsgcm91dGVyUmVkdWNlciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3JvdXRlcic7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgYWNjb3VudFJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL2FjY291bnQucmVkdWNlcnMnO1xuaW1wb3J0IHsgbG9hZGluZ0JhclJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvbG9hZGluZy1iYXIucmVkdWNlcic7XG5pbXBvcnQgeyBhY3RpdmVQcm9qZWN0UmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9hY3RpdmUtcHJvamVjdC5yZWR1Y2VyJztcbmltcG9ydCB7IGluZm9ybWF0aW9uUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9lbnRpdHktbGlzdC5yZWR1Y2VyJztcbmltcG9ydCB7IHNvdXJjZUxpc3RSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL3NvdXJjZS1saXN0LnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdHNSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL3Byb2plY3RzLnJlZHVjZXJzJztcbmltcG9ydCB7IGNyZWF0ZVN5c1JlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvc3lzLnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlRGZoUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9kZmgucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVJbmZSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL2luZi5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZURhdFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvZGF0LnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlUHJvUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9wcm8ucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVXYXJSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL3dhci5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZVRhYlJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvdGFiLnJlZHVjZXInO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1NBTkRCT1hfU1RBVEUgPSAnSU5JVF9TQU5EQk9YX1NUQVRFJztcbmV4cG9ydCBjb25zdCBzYW5kYm94U3RhdGVSZWR1Y2VyID0gKGxhc3RTdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+KSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSU5JVF9TQU5EQk9YX1NUQVRFKSB7XG4gICAgbGFzdFN0YXRlID0ge1xuICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICB9O1xuICB9XG4gIHJldHVybiBsYXN0U3RhdGU7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBwZW5kaW5nUmVxdWVzdFJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIFt1dWlkXTogdHJ1ZVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnYWRkICcgKyB1dWlkICsgJyAnICsgRGF0ZS5ub3coKSlcbiAgfVxuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4ub21pdChbdXVpZF0sIHN0YXRlKVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkUmVxdWVzdFJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIFt1dWlkXTogYWN0aW9uLm1ldGFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYW51cFJlc29sdmVkID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09ICdDTEVBTl9VUF9SRVNPTFZFRCcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEudXVpZDtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLm9taXQoW3V1aWRdLCBzdGF0ZSlcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ3Jlc29sdmUgJyArIHV1aWQgKyAnICcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkpXG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuZXhwb3J0IGNvbnN0IFNFVF9BUFBfU1RBVEUgPSAnU0VUX0FQUF9TVEFURSc7XG5leHBvcnQgY29uc3Qgc2V0QXBwU3RhdGUgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IFNFVF9BUFBfU1RBVEUpIHtcbiAgICBzdGF0ZSA9IGFjdGlvbi5wYXlsb2FkXG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21wb3NlUmVkdWNlcnMoXG4gIGRlZmF1bHRGb3JtUmVkdWNlcigpLFxuICBjb21iaW5lUmVkdWNlcnMoe1xuICAgIGFjY291bnQ6IGFjY291bnRSb290UmVkdWNlcixcbiAgICBsb2FkaW5nQmFyOiBsb2FkaW5nQmFyUmVkdWNlcixcbiAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0UmVkdWNlcixcbiAgICByb3V0ZXM6IHJvdXRlclJlZHVjZXIsXG4gICAgaW5mb3JtYXRpb246IGluZm9ybWF0aW9uUmVkdWNlcixcbiAgICBzb3VyY2VzOiBzb3VyY2VMaXN0UmVkdWNlcixcbiAgICBzYW5kYm94U3RhdGU6IHNhbmRib3hTdGF0ZVJlZHVjZXIsXG4gICAgcHJvamVjdHM6IGNyZWF0ZVByb2plY3RzUmVkdWNlcigpLFxuICAgIHN5czogY3JlYXRlU3lzUmVkdWNlcigpLFxuICAgIGRmaDogY3JlYXRlRGZoUmVkdWNlcigpLFxuICAgIGluZjogY3JlYXRlSW5mUmVkdWNlcigpLFxuICAgIGRhdDogY3JlYXRlRGF0UmVkdWNlcigpLFxuICAgIHBybzogY3JlYXRlUHJvUmVkdWNlcigpLFxuICAgIHdhcjogY3JlYXRlV2FyUmVkdWNlcigpLFxuICAgIHRhYjogY3JlYXRlVGFiUmVkdWNlcigpLFxuICAgIHBlbmRpbmc6IHBlbmRpbmdSZXF1ZXN0UmVkdWNlcixcbiAgICByZXNvbHZlZDogY29tcG9zZVJlZHVjZXJzKHJlc29sdmVkUmVxdWVzdFJlZHVjZXIsIGNsZWFudXBSZXNvbHZlZCksXG4gIH0pLFxuICBzZXRBcHBTdGF0ZVxuKVxuIl19