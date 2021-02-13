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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9yb290L3Jvb3QtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdC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cUJBQXFCLEVBQUU7SUFDakMsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtJQUN2QixHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdkIsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0lBQ3ZCLE9BQU8sRUFBRSxxQkFBcUI7SUFDOUIsUUFBUSxFQUFFLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSxlQUFlLENBQUM7Q0FDbkUsQ0FBQyxFQUNGLFdBQVcsQ0FDWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBvc2VSZWR1Y2VycywgZGVmYXVsdEZvcm1SZWR1Y2VyIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvZm9ybSc7XG5pbXBvcnQgeyByb3V0ZXJSZWR1Y2VyIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvcm91dGVyJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IG9taXQgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBhY2NvdW50Um9vdFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvYWNjb3VudC5yZWR1Y2Vycyc7XG5pbXBvcnQgeyBsb2FkaW5nQmFyUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLWd1aS9yZWR1Y2Vycy9sb2FkaW5nLWJhci5yZWR1Y2VyJztcbmltcG9ydCB7IGFjdGl2ZVByb2plY3RSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL2FjdGl2ZS1wcm9qZWN0LnJlZHVjZXInO1xuaW1wb3J0IHsgaW5mb3JtYXRpb25SZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtZ3VpL3JlZHVjZXJzL2VudGl0eS1saXN0LnJlZHVjZXInO1xuaW1wb3J0IHsgc291cmNlTGlzdFJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvc291cmNlLWxpc3QucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0c1JlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1ndWkvcmVkdWNlcnMvcHJvamVjdHMucmVkdWNlcnMnO1xuaW1wb3J0IHsgY3JlYXRlU3lzUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9zeXMucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVEZmhSZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL2RmaC5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZUluZlJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvaW5mLnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlRGF0UmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy9kYXQucmVkdWNlcic7XG5pbXBvcnQgeyBjcmVhdGVQcm9SZWR1Y2VyIH0gZnJvbSAnLi4vc3RhdGUtc2NoZW1hL3JlZHVjZXJzL3Byby5yZWR1Y2VyJztcbmltcG9ydCB7IGNyZWF0ZVdhclJlZHVjZXIgfSBmcm9tICcuLi9zdGF0ZS1zY2hlbWEvcmVkdWNlcnMvd2FyLnJlZHVjZXInO1xuaW1wb3J0IHsgY3JlYXRlVGFiUmVkdWNlciB9IGZyb20gJy4uL3N0YXRlLXNjaGVtYS9yZWR1Y2Vycy90YWIucmVkdWNlcic7XG5cblxuZXhwb3J0IGNvbnN0IElOSVRfU0FOREJPWF9TVEFURSA9ICdJTklUX1NBTkRCT1hfU1RBVEUnO1xuZXhwb3J0IGNvbnN0IHNhbmRib3hTdGF0ZVJlZHVjZXIgPSAobGFzdFN0YXRlID0ge30sIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4pID0+IHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSBJTklUX1NBTkRCT1hfU1RBVEUpIHtcbiAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAuLi5hY3Rpb24ucGF5bG9hZFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGxhc3RTdGF0ZTtcbn07XG5cblxuZXhwb3J0IGNvbnN0IHBlbmRpbmdSZXF1ZXN0UmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLmFkZFBlbmRpbmcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgW3V1aWRdOiB0cnVlXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdhZGQgJyArIHV1aWQgKyAnICcgKyBEYXRlLm5vdygpKVxuICB9XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5yZW1vdmVQZW5kaW5nKSB7XG4gICAgY29uc3QgdXVpZCA9IGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmc7XG4gICAgc3RhdGUgPSB7XG4gICAgICAuLi5vbWl0KFt1dWlkXSwgc3RhdGUpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuXG5leHBvcnQgY29uc3QgcmVzb2x2ZWRSZXF1ZXN0UmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLnJlbW92ZVBlbmRpbmcpIHtcbiAgICBjb25zdCB1dWlkID0gYWN0aW9uLm1ldGEucmVtb3ZlUGVuZGluZztcbiAgICBzdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgW3V1aWRdOiBhY3Rpb24ubWV0YVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhbnVwUmVzb2x2ZWQgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gJ0NMRUFOX1VQX1JFU09MVkVEJykge1xuICAgIGNvbnN0IHV1aWQgPSBhY3Rpb24ubWV0YS51dWlkO1xuICAgIHN0YXRlID0ge1xuICAgICAgLi4ub21pdChbdXVpZF0sIHN0YXRlKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygncmVzb2x2ZSAnICsgdXVpZCArICcgJyArIERhdGUubm93KCkudG9TdHJpbmcoKSlcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5leHBvcnQgY29uc3QgU0VUX0FQUF9TVEFURSA9ICdTRVRfQVBQX1NUQVRFJztcbmV4cG9ydCBjb25zdCBzZXRBcHBTdGF0ZSA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gU0VUX0FQUF9TVEFURSkge1xuICAgIHN0YXRlID0gYWN0aW9uLnBheWxvYWRcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmV4cG9ydCBjb25zdCByb290UmVkdWNlciA9IGNvbXBvc2VSZWR1Y2VycyhcbiAgZGVmYXVsdEZvcm1SZWR1Y2VyKCksXG4gIGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgYWNjb3VudDogYWNjb3VudFJvb3RSZWR1Y2VyLFxuICAgIGxvYWRpbmdCYXI6IGxvYWRpbmdCYXJSZWR1Y2VyLFxuICAgIGFjdGl2ZVByb2plY3Q6IGFjdGl2ZVByb2plY3RSZWR1Y2VyLFxuICAgIHJvdXRlczogcm91dGVyUmVkdWNlcixcbiAgICBpbmZvcm1hdGlvbjogaW5mb3JtYXRpb25SZWR1Y2VyLFxuICAgIHNvdXJjZXM6IHNvdXJjZUxpc3RSZWR1Y2VyLFxuICAgIHNhbmRib3hTdGF0ZTogc2FuZGJveFN0YXRlUmVkdWNlcixcbiAgICBwcm9qZWN0czogY3JlYXRlUHJvamVjdHNSZWR1Y2VyKCksXG4gICAgc3lzOiBjcmVhdGVTeXNSZWR1Y2VyKCksXG4gICAgZGZoOiBjcmVhdGVEZmhSZWR1Y2VyKCksXG4gICAgaW5mOiBjcmVhdGVJbmZSZWR1Y2VyKCksXG4gICAgZGF0OiBjcmVhdGVEYXRSZWR1Y2VyKCksXG4gICAgcHJvOiBjcmVhdGVQcm9SZWR1Y2VyKCksXG4gICAgd2FyOiBjcmVhdGVXYXJSZWR1Y2VyKCksXG4gICAgdGFiOiBjcmVhdGVUYWJSZWR1Y2VyKCksXG4gICAgcGVuZGluZzogcGVuZGluZ1JlcXVlc3RSZWR1Y2VyLFxuICAgIHJlc29sdmVkOiBjb21wb3NlUmVkdWNlcnMocmVzb2x2ZWRSZXF1ZXN0UmVkdWNlciwgY2xlYW51cFJlc29sdmVkKSxcbiAgfSksXG4gIHNldEFwcFN0YXRlXG4pXG4iXX0=