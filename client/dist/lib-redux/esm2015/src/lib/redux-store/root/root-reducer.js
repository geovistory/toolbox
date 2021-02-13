/**
 * @fileoverview added by tsickle
 * Generated from: root/root-reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsicm9vdC9yb290LXJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JB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LFFBQVEsRUFBRSxxQkFBcUIsRUFBRTtJQUNqQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixRQUFRLEVBQUUsZUFBZSxDQUFDLHNCQUFzQixFQUFFLGVBQWUsQ0FBQztDQUNuRSxDQUFDLEVBQ0YsV0FBVyxDQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZVJlZHVjZXJzLCBkZWZhdWx0Rm9ybVJlZHVjZXIgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9mb3JtJztcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9yb3V0ZXInO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGFjY291bnRSb290UmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9hY2NvdW50LnJlZHVjZXJzJztcbmltcG9ydCB7IGxvYWRpbmdCYXJSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL2xvYWRpbmctYmFyLnJlZHVjZXInO1xuaW1wb3J0IHsgYWN0aXZlUHJvamVjdFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvYWN0aXZlLXByb2plY3QucmVkdWNlcic7XG5pbXBvcnQgeyBpbmZvcm1hdGlvblJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvZW50aXR5LWxpc3QucmVkdWNlcic7XG5pbXBvcnQgeyBzb3VyY2VMaXN0UmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9zb3VyY2UtbGlzdC5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZVByb2plY3RzUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9wcm9qZWN0cy5yZWR1Y2Vycyc7XG5pbXBvcnQgeyBjcmVhdGVTeXNSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL3N5cy5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZURmaFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvZGZoLnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlSW5mUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9pbmYucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVEYXRSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL2RhdC5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZVByb1JlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvcHJvLnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlV2FyUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy93YXIucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVUYWJSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL3RhYi5yZWR1Y2VyJztcblxuXG5leHBvcnQgY29uc3QgSU5JVF9TQU5EQk9YX1NUQVRFID0gJ0lOSVRfU0FOREJPWF9TVEFURSc7XG5leHBvcnQgY29uc3Qgc2FuZGJveFN0YXRlUmVkdWNlciA9IChsYXN0U3RhdGUgPSB7fSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248YW55PikgPT4ge1xuICBpZiAoYWN0aW9uLnR5cGUgPT09IElOSVRfU0FOREJPWF9TVEFURSkge1xuICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbGFzdFN0YXRlO1xufTtcblxuXG5leHBvcnQgY29uc3QgcGVuZGluZ1JlcXVlc3RSZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEuYWRkUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBbdXVpZF06IHRydWVcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ2FkZCAnICsgdXVpZCArICcgJyArIERhdGUubm93KCkpXG4gIH1cblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZztcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLm9taXQoW3V1aWRdLCBzdGF0ZSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5cbmV4cG9ydCBjb25zdCByZXNvbHZlZFJlcXVlc3RSZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBbdXVpZF06IGFjdGlvbi5tZXRhXG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFudXBSZXNvbHZlZCA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSAnQ0xFQU5fVVBfUkVTT0xWRUQnKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnV1aWQ7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5vbWl0KFt1dWlkXSwgc3RhdGUpXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdyZXNvbHZlICcgKyB1dWlkICsgJyAnICsgRGF0ZS5ub3coKS50b1N0cmluZygpKVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cbmV4cG9ydCBjb25zdCBTRVRfQVBQX1NUQVRFID0gJ1NFVF9BUFBfU1RBVEUnO1xuZXhwb3J0IGNvbnN0IHNldEFwcFN0YXRlID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuICBpZiAoYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBTRVRfQVBQX1NUQVRFKSB7XG4gICAgc3RhdGUgPSBhY3Rpb24ucGF5bG9hZFxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IHJvb3RSZWR1Y2VyID0gY29tcG9zZVJlZHVjZXJzKFxuICBkZWZhdWx0Rm9ybVJlZHVjZXIoKSxcbiAgY29tYmluZVJlZHVjZXJzKHtcbiAgICBhY2NvdW50OiBhY2NvdW50Um9vdFJlZHVjZXIsXG4gICAgbG9hZGluZ0JhcjogbG9hZGluZ0JhclJlZHVjZXIsXG4gICAgYWN0aXZlUHJvamVjdDogYWN0aXZlUHJvamVjdFJlZHVjZXIsXG4gICAgcm91dGVzOiByb3V0ZXJSZWR1Y2VyLFxuICAgIGluZm9ybWF0aW9uOiBpbmZvcm1hdGlvblJlZHVjZXIsXG4gICAgc291cmNlczogc291cmNlTGlzdFJlZHVjZXIsXG4gICAgc2FuZGJveFN0YXRlOiBzYW5kYm94U3RhdGVSZWR1Y2VyLFxuICAgIHByb2plY3RzOiBjcmVhdGVQcm9qZWN0c1JlZHVjZXIoKSxcbiAgICBzeXM6IGNyZWF0ZVN5c1JlZHVjZXIoKSxcbiAgICBkZmg6IGNyZWF0ZURmaFJlZHVjZXIoKSxcbiAgICBpbmY6IGNyZWF0ZUluZlJlZHVjZXIoKSxcbiAgICBkYXQ6IGNyZWF0ZURhdFJlZHVjZXIoKSxcbiAgICBwcm86IGNyZWF0ZVByb1JlZHVjZXIoKSxcbiAgICB3YXI6IGNyZWF0ZVdhclJlZHVjZXIoKSxcbiAgICB0YWI6IGNyZWF0ZVRhYlJlZHVjZXIoKSxcbiAgICBwZW5kaW5nOiBwZW5kaW5nUmVxdWVzdFJlZHVjZXIsXG4gICAgcmVzb2x2ZWQ6IGNvbXBvc2VSZWR1Y2VycyhyZXNvbHZlZFJlcXVlc3RSZWR1Y2VyLCBjbGVhbnVwUmVzb2x2ZWQpLFxuICB9KSxcbiAgc2V0QXBwU3RhdGVcbilcbiJdfQ==