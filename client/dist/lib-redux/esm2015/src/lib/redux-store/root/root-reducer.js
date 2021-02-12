/**
 * @fileoverview added by tsickle
 * Generated from: root/root-reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsicm9vdC9yb290LXJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsSyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFHeEssTUFBTSxPQUFPLGtCQUFrQixHQUFHLG9CQUFvQjs7QUFDdEQsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7QUFBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUUsTUFBK0IsRUFBRSxFQUFFO0lBQ3JGLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRTtRQUN0QyxTQUFTLHFCQUNKLFNBQVMsRUFDVCxNQUFNLENBQUMsT0FBTyxDQUNsQixDQUFDO0tBQ0g7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUE7O0FBR0QsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7QUFBRyxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFFMUQsSUFBSSxNQUFNLElB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ZWZhdWx0Rm9ybVJlZHVjZXIgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9mb3JtJztcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9yb3V0ZXInO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGFjY291bnRSb290UmVkdWNlciwgYWN0aXZlUHJvamVjdFJlZHVjZXIsIGNyZWF0ZVByb2plY3RzUmVkdWNlciwgaW5mb3JtYXRpb25SZWR1Y2VyLCBsb2FkaW5nQmFyUmVkdWNlciwgc291cmNlTGlzdFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMnO1xuaW1wb3J0IHsgY3JlYXRlRGF0UmVkdWNlciwgY3JlYXRlRGZoUmVkdWNlciwgY3JlYXRlSW5mUmVkdWNlciwgY3JlYXRlUHJvUmVkdWNlciwgY3JlYXRlU3lzUmVkdWNlciwgY3JlYXRlVGFiUmVkdWNlciwgY3JlYXRlV2FyUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycyc7XG5cblxuZXhwb3J0IGNvbnN0IElOSVRfU0FOREJPWF9TVEFURSA9ICdJTklUX1NBTkRCT1hfU1RBVEUnO1xuZXhwb3J0IGNvbnN0IHNhbmRib3hTdGF0ZVJlZHVjZXIgPSAobGFzdFN0YXRlID0ge30sIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4pID0+IHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSBJTklUX1NBTkRCT1hfU1RBVEUpIHtcbiAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGxhc3RTdGF0ZTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IHBlbmRpbmdSZXF1ZXN0UmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLmFkZFBlbmRpbmcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgW3V1aWRdOiB0cnVlXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdhZGQgJyArIHV1aWQgKyAnICcgKyBEYXRlLm5vdygpKVxuICB9XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5vbWl0KFt1dWlkXSwgc3RhdGUpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuXG5leHBvcnQgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0UmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZztcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgW3V1aWRdOiBhY3Rpb24ubWV0YVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhbnVwUmVzb2x2ZWQgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gJ0NMRUFOX1VQX1JFU09MVkVEJykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS51dWlkO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4ub21pdChbdXVpZF0sIHN0YXRlKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygncmVzb2x2ZSAnICsgdXVpZCArICcgJyArIERhdGUubm93KCkudG9TdHJpbmcoKSlcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5leHBvcnQgY29uc3QgU0VUX0FQUF9TVEFURSA9ICdTRVRfQVBQX1NUQVRFJztcbmV4cG9ydCBjb25zdCBzZXRBcHBTdGF0ZSA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gU0VUX0FQUF9TVEFURSkge1xuICAgIHN0YXRlID0gYWN0aW9uLnBheWxvYWRcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCByb290UmVkdWNlciA9IGNvbXBvc2VSZWR1Y2VycyhcbiAgZGVmYXVsdEZvcm1SZWR1Y2VyKCksXG4gIGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgYWNjb3VudDogYWNjb3VudFJvb3RSZWR1Y2VyLFxuICAgIGxvYWRpbmdCYXI6IGxvYWRpbmdCYXJSZWR1Y2VyLFxuICAgIGFjdGl2ZVByb2plY3Q6IGFjdGl2ZVByb2plY3RSZWR1Y2VyLFxuICAgIHJvdXRlczogcm91dGVyUmVkdWNlcixcbiAgICBpbmZvcm1hdGlvbjogaW5mb3JtYXRpb25SZWR1Y2VyLFxuICAgIHNvdXJjZXM6IHNvdXJjZUxpc3RSZWR1Y2VyLFxuICAgIHNhbmRib3hTdGF0ZTogc2FuZGJveFN0YXRlUmVkdWNlcixcbiAgICBwcm9qZWN0czogY3JlYXRlUHJvamVjdHNSZWR1Y2VyKCksXG4gICAgc3lzOiBjcmVhdGVTeXNSZWR1Y2VyKCksXG4gICAgZGZoOiBjcmVhdGVEZmhSZWR1Y2VyKCksXG4gICAgaW5mOiBjcmVhdGVJbmZSZWR1Y2VyKCksXG4gICAgZGF0OiBjcmVhdGVEYXRSZWR1Y2VyKCksXG4gICAgcHJvOiBjcmVhdGVQcm9SZWR1Y2VyKCksXG4gICAgd2FyOiBjcmVhdGVXYXJSZWR1Y2VyKCksXG4gICAgdGFiOiBjcmVhdGVUYWJSZWR1Y2VyKCksXG4gICAgcGVuZGluZzogcGVuZGluZ1JlcXVlc3RSZWR1Y2VyLFxuICAgIHJlc29sdmVkOiBjb21wb3NlUmVkdWNlcnMocmVzb2x2ZWRSZXF1ZXN0UmVkdWNlciwgY2xlYW51cFJlc29sdmVkKSxcbiAgfSksXG4gIHNldEFwcFN0YXRlXG4pXG4iXX0=