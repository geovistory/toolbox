/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/root/root-reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import { accountRootReducer, activeProjectReducer, createProjectsReducer, informationReducer, loadingBarReducer, sourceListReducer } from '../state-gui/reducers';
import { createDatReducer, createDfhReducer, createInfReducer, createProReducer, createSysReducer, createTabReducer, createWarReducer } from '../state-schema/reducers';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9yb290L3Jvb3QtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xLLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUd4SyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsb0JBQW9COztBQUN0RCxNQUFNLE9BQU8sbUJBQW1COzs7OztBQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBRSxNQUErQixFQUFFLEVBQUU7SUFDckYsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFO1FBQ3RDLFNBQVMscUJBQ0osU0FBUyxFQUNULE1BQU0sQ0FBQyxPQUFPLENBQ2xCLENBQUM7S0FDSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQTs7QUFHRCxNQUFNLE9BQU8scUJBQXFCOzs7OztBQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUUxRCxJQUFJLE1BQU0sSUFBSSxN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bHRGb3JtUmVkdWNlciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L2Zvcm0nO1xuaW1wb3J0IHsgcm91dGVyUmVkdWNlciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3JvdXRlcic7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgYWNjb3VudFJvb3RSZWR1Y2VyLCBhY3RpdmVQcm9qZWN0UmVkdWNlciwgY3JlYXRlUHJvamVjdHNSZWR1Y2VyLCBpbmZvcm1hdGlvblJlZHVjZXIsIGxvYWRpbmdCYXJSZWR1Y2VyLCBzb3VyY2VMaXN0UmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBjcmVhdGVEYXRSZWR1Y2VyLCBjcmVhdGVEZmhSZWR1Y2VyLCBjcmVhdGVJbmZSZWR1Y2VyLCBjcmVhdGVQcm9SZWR1Y2VyLCBjcmVhdGVTeXNSZWR1Y2VyLCBjcmVhdGVUYWJSZWR1Y2VyLCBjcmVhdGVXYXJSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzJztcblxuXG5leHBvcnQgY29uc3QgSU5JVF9TQU5EQk9YX1NUQVRFID0gJ0lOSVRfU0FOREJPWF9TVEFURSc7XG5leHBvcnQgY29uc3Qgc2FuZGJveFN0YXRlUmVkdWNlciA9IChsYXN0U3RhdGUgPSB7fSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248YW55PikgPT4ge1xuICBpZiAoYWN0aW9uLnR5cGUgPT09IElOSVRfU0FOREJPWF9TVEFURSkge1xuICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbGFzdFN0YXRlO1xufTtcblxuXG5leHBvcnQgY29uc3QgcGVuZGluZ1JlcXVlc3RSZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEuYWRkUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBbdXVpZF06IHRydWVcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ2FkZCAnICsgdXVpZCArICcgJyArIERhdGUubm93KCkpXG4gIH1cblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZztcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLm9taXQoW3V1aWRdLCBzdGF0ZSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5cbmV4cG9ydCBjb25zdCByZXNvbHZlZFJlcXVlc3RSZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBbdXVpZF06IGFjdGlvbi5tZXRhXG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFudXBSZXNvbHZlZCA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSAnQ0xFQU5fVVBfUkVTT0xWRUQnKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnV1aWQ7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5vbWl0KFt1dWlkXSwgc3RhdGUpXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdyZXNvbHZlICcgKyB1dWlkICsgJyAnICsgRGF0ZS5ub3coKS50b1N0cmluZygpKVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cbmV4cG9ydCBjb25zdCBTRVRfQVBQX1NUQVRFID0gJ1NFVF9BUFBfU1RBVEUnO1xuZXhwb3J0IGNvbnN0IHNldEFwcFN0YXRlID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuICBpZiAoYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBTRVRfQVBQX1NUQVRFKSB7XG4gICAgc3RhdGUgPSBhY3Rpb24ucGF5bG9hZFxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IHJvb3RSZWR1Y2VyID0gY29tcG9zZVJlZHVjZXJzKFxuICBkZWZhdWx0Rm9ybVJlZHVjZXIoKSxcbiAgY29tYmluZVJlZHVjZXJzKHtcbiAgICBhY2NvdW50OiBhY2NvdW50Um9vdFJlZHVjZXIsXG4gICAgbG9hZGluZ0JhcjogbG9hZGluZ0JhclJlZHVjZXIsXG4gICAgYWN0aXZlUHJvamVjdDogYWN0aXZlUHJvamVjdFJlZHVjZXIsXG4gICAgcm91dGVzOiByb3V0ZXJSZWR1Y2VyLFxuICAgIGluZm9ybWF0aW9uOiBpbmZvcm1hdGlvblJlZHVjZXIsXG4gICAgc291cmNlczogc291cmNlTGlzdFJlZHVjZXIsXG4gICAgc2FuZGJveFN0YXRlOiBzYW5kYm94U3RhdGVSZWR1Y2VyLFxuICAgIHByb2plY3RzOiBjcmVhdGVQcm9qZWN0c1JlZHVjZXIoKSxcbiAgICBzeXM6IGNyZWF0ZVN5c1JlZHVjZXIoKSxcbiAgICBkZmg6IGNyZWF0ZURmaFJlZHVjZXIoKSxcbiAgICBpbmY6IGNyZWF0ZUluZlJlZHVjZXIoKSxcbiAgICBkYXQ6IGNyZWF0ZURhdFJlZHVjZXIoKSxcbiAgICBwcm86IGNyZWF0ZVByb1JlZHVjZXIoKSxcbiAgICB3YXI6IGNyZWF0ZVdhclJlZHVjZXIoKSxcbiAgICB0YWI6IGNyZWF0ZVRhYlJlZHVjZXIoKSxcbiAgICBwZW5kaW5nOiBwZW5kaW5nUmVxdWVzdFJlZHVjZXIsXG4gICAgcmVzb2x2ZWQ6IGNvbXBvc2VSZWR1Y2VycyhyZXNvbHZlZFJlcXVlc3RSZWR1Y2VyLCBjbGVhbnVwUmVzb2x2ZWQpLFxuICB9KSxcbiAgc2V0QXBwU3RhdGVcbilcbiJdfQ==