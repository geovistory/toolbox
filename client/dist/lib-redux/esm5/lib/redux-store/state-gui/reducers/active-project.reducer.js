/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/active-project.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { omit } from 'ramda';
import { ActiveProjectActions } from '../actions';
/** @type {?} */
var INITIAL_STATE = {
    label: '',
    list: '',
    uiIdSerial: 0,
    panelSerial: 0,
    focusedPanel: 0,
    panels: []
};
/** @type {?} */
export var activeProjectReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function (state, action) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (state === void 0) { state = INITIAL_STATE; }
    /** @type {?} */
    var pi;
    /** @type {?} */
    var ti;
    /** @type {?} */
    var ppi;
    /** @type {?} */
    var cpi;
    /** @type {?} */
    var pti;
    /** @type {?} */
    var cti;
    switch (action.type) {
        /************************************************************************************
         * Load project data (metadata, crm)
        ************************************************************************************/
        case ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED:
            state = tslib_1.__assign({}, state, action.meta.projectPreview);
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG:
            state = tslib_1.__assign({}, state, { loadingConfigData: true });
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED:
            state = tslib_1.__assign({}, state, { configDataInitialized: true, loadingConfigData: false });
            break;
        /************************************************************************************
         * Layout -- Tabs
        ************************************************************************************/
        case ActiveProjectActions.SET_PANELS:
            state = tslib_1.__assign({}, state, { panels: action.meta.panels, uiIdSerial: action.meta.uiIdSerial, panelSerial: action.meta.panelSerial, focusedPanel: action.meta.focusedPanel });
            break;
        case ActiveProjectActions.SET_LIST_TYPE:
            state = tslib_1.__assign({}, state, { list: action.meta.list });
            break;
        case ActiveProjectActions.ACTIVATE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_a = {},
                    _a[pi] = tslib_1.__assign({}, state.panels[pi], { tabs: tslib_1.__spread(state.panels[pi].tabs).map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) {
                            tab.active = (index === ti);
                            return tab;
                        })) }),
                    _a)) });
            break;
        case ActiveProjectActions.MOVE_TAB:
            ppi = action.meta.previousPanelIndex;
            cpi = action.meta.currentPanelIndex;
            pti = action.meta.previousTabIndex;
            cti = action.meta.currentTabIndex;
            if (ppi === cpi) {
                /** @type {?} */
                var tabs = tslib_1.__spread(state.panels[cpi].tabs);
                moveItemInArray(tabs, pti, cti);
                state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_b = {},
                        _b[cpi] = tslib_1.__assign({}, state.panels[cpi], { tabs: tabs }),
                        _b)) });
            }
            else {
                /** @type {?} */
                var pTabs_1 = tslib_1.__spread(state.panels[ppi].tabs);
                /** @type {?} */
                var cTabs = tslib_1.__spread(state.panels[cpi].tabs);
                transferArrayItem(pTabs_1, cTabs, pti, cti);
                state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_c = {},
                        _c[ppi] = tslib_1.__assign({}, state.panels[ppi], { tabs: pTabs_1.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === (pti < pTabs_1.length ? pti : (pti - 1)));
                                return tab;
                            })) }),
                        _c[cpi] = tslib_1.__assign({}, state.panels[cpi], { tabs: cTabs.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === cti);
                                return tab;
                            })) }),
                        _c)) });
            }
            break;
        case ActiveProjectActions.ADD_TAB:
            if (state.panels.length === 0) {
                state = tslib_1.__assign({}, state, { panels: [
                        {
                            id: state.panelSerial,
                            tabs: []
                        }
                    ], focusedPanel: 0, panelSerial: state.panelSerial + 1 });
            }
            pi = state.focusedPanel;
            state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_d = {},
                    _d[pi] = tslib_1.__assign({}, state.panels[pi], { tabs: tslib_1.__spread(state.panels[pi].tabs.map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) {
                            t.active = false;
                            return t;
                        })), [
                            tslib_1.__assign({}, omit(['pathSegment'], action.meta.tab), { path: ['activeProject', action.meta.tab.pathSegment, state.uiIdSerial.toString()] })
                        ]) }),
                    _d)), uiIdSerial: (state.uiIdSerial + 1) });
            break;
        case ActiveProjectActions.CLOSE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            // remove the closing tab
            state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_e = {},
                    _e[pi] = tslib_1.__assign({}, state.panels[pi], { tabs: tslib_1.__spread(state.panels[pi].tabs).filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) { return index !== ti; })) }),
                    _e)) });
            // activate a sibling tab, if needed and possible
            if (!state.panels[pi].tabs.find((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.active; }))) {
                state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_f = {},
                        _f[pi] = tslib_1.__assign({}, state.panels[pi], { tabs: tslib_1.__spread(state.panels[pi].tabs).map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            function (tab, index) {
                                tab.active = (index === (ti < state.panels[pi].tabs.length ? ti : (ti - 1)));
                                return tab;
                            })) }),
                        _f)) });
            }
            break;
        case ActiveProjectActions.CLOSE_PANEL:
            pi = action.meta.panelIndex;
            /** @type {?} */
            var panels = tslib_1.__spread(state.panels);
            panels.splice(pi, 1);
            state = tslib_1.__assign({}, state, { panels: panels });
            break;
        case ActiveProjectActions.FOCUS_PANEL:
            state = tslib_1.__assign({}, state, { focusedPanel: action.meta.panelIndex });
            break;
        case ActiveProjectActions.SPLIT_PANEL:
            ppi = action.meta.previousPanelIndex;
            ti = action.meta.tabIndex;
            cpi = action.meta.currentPanelIndex;
            /** @type {?} */
            var moveTab = state.panels[ppi].tabs[ti];
            // removes tab from old panel
            state = tslib_1.__assign({}, state, { panels: Object.assign(tslib_1.__spread(state.panels), (_g = {},
                    _g[ppi] = tslib_1.__assign({}, state.panels[ppi], { tabs: tslib_1.__spread(state.panels[ppi].tabs).filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) { return index !== ti; }))
                            .map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        function (tab, index) {
                            if (index === 0)
                                tab.active = true;
                            return tab;
                        })) }),
                    _g)) });
            // insert a new panel at position of cpi
            /** @type {?} */
            var newPanels = tslib_1.__spread(state.panels);
            newPanels.splice(cpi, 0, {
                id: state.panelSerial,
                tabs: [moveTab]
            });
            state = tslib_1.__assign({}, state, { panels: newPanels, panelSerial: state.panelSerial + 1 });
            break;
        case ActiveProjectActions.SET_REFINING_CHUNK:
            state = tslib_1.__assign({}, state, { refiningChunk: action.payload.refiningChunk });
            break;
        case ActiveProjectActions.SET_CREATING_MENTIONING:
            state = tslib_1.__assign({}, state, { creatingMentioning: action.payload.creatingMentioning });
            break;
        /************************************************************************************
        * Highlighting of mentionings in the gui
        ************************************************************************************/
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT:
            state = tslib_1.__assign({}, state, { mentioningsFocusedInText: action.payload.mentioningsFocusedInText });
            break;
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE:
            state = tslib_1.__assign({}, state, { mentioningsFocusedInTable: action.payload.mentioningsFocusedInTable });
            break;
        /************************************************************************************
         * Destroy the active project state (on closing a project)
        ************************************************************************************/
        case ActiveProjectActions.DESTROY:
            state = INITIAL_STATE;
            break;
    }
    return state;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2FjdGl2ZS1wcm9qZWN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7SUFHakUsYUFBYSxHQUFrQjtJQUNuQyxLQUFLLEVBQUUsRUFBRTtJQUNULElBQUksRUFBRSxFQUFFO0lBQ1IsVUFBVSxFQUFFLENBQUM7SUFDYixXQUFXLEVBQUUsQ0FBQztJQUNkLFlBQVksRUFBRSxDQUFDO0lBQ2YsTUFBTSxFQUFFLEVBQUU7Q0FDWDs7QUFDRCxNQUFNLEtBQU8sb0JBQW9COzs7OztBQUFHLFVBQUMsS0FBb0MsRUFBRSxNQUEyQjs7SUFBakUsc0JBQUEsRUFBQSxxQkFBb0M7O1FBQ25FLEVBQUU7O1FBQUUsRUFBRTs7UUFBRSxHQUFHOztRQUFFLEdBQUc7O1FBQUUsR0FBRzs7UUFBRSxHQUFHO0lBQzlCLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQjs7NkZBRXFGO1FBQ3JGLEtBQUssb0JBQW9CLENBQUMsNkJBQTZCO1lBQ3JELEtBQUssd0JBQ0EsS0FBSyxFQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUM5QixDQUFDO1lBQ0YsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsbUJBQW1CO1lBQzNDLEtBQUssd0JBQ0EsS0FBSyxJQUNSLGlCQUFpQixFQUFFLElBQUksR0FDeEIsQ0FBQTtZQUNELE1BQU07UUFDUixLQUFLLG9CQUFvQixDQUFDLDZCQUE2QjtZQUNyRCxL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LFdBQVcsR0FBRyxDQUFDLEdBQ25DLENBQUE7WUFFRCxNQUFNO1FBR1IsS0FBSyxvQkFBb0IsQ0FBQyxrQkFBa0I7WUFDMUMsS0FBSyx3QkFDQSxLQUFLLElBQ1IsYUFBYSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUM1QyxDQUFDO1lBQ0YsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsdUJBQXVCO1lBQy9DLEtBQUssd0JBQ0EsS0FBSyxJQUNSLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQ3RELENBQUM7WUFDRixNQUFNO1FBRVI7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLCtCQUErQjtZQUN2RCxLQUFLLHdCQUNBLEtBQUssSUFDUix3QkFBd0IsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLHdCQUF3QixHQUNsRSxDQUFDO1lBQ0YsTUFBTTtRQUVSLEtBQUssb0JBQW9CLENBQUMsZ0NBQWdDO1lBQ3hELEtBQUssd0JBQ0EsS0FBSyxJQUNSLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLEdBQ3BFLENBQUM7WUFDRixNQUFNO1FBR1I7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLE9BQU87WUFDL0IsS0FBSyxHQUFHLGFBQWEsQ0FBQztZQUN0QixNQUFNO0tBQ1Q7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSwgdHJhbnNmZXJBcnJheUl0ZW0gfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IG9taXQgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0QWN0aW9uLCBBY3RpdmVQcm9qZWN0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgUHJvamVjdERldGFpbCB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEU6IFByb2plY3REZXRhaWwgPSB7XG4gIGxhYmVsOiAnJyxcbiAgbGlzdDogJycsXG4gIHVpSWRTZXJpYWw6IDAsXG4gIHBhbmVsU2VyaWFsOiAwLFxuICBmb2N1c2VkUGFuZWw6IDAsXG4gIHBhbmVsczogW11cbn07XG5leHBvcnQgY29uc3QgYWN0aXZlUHJvamVjdFJlZHVjZXIgPSAoc3RhdGU6IFByb2plY3REZXRhaWwgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pOiBQcm9qZWN0RGV0YWlsID0+IHtcbiAgbGV0IHBpLCB0aSwgcHBpLCBjcGksIHB0aSwgY3RpO1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIExvYWQgcHJvamVjdCBkYXRhIChtZXRhZGF0YSwgY3JtKVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVEOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAuLi5hY3Rpb24ubWV0YS5wcm9qZWN0UHJldmlld1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJRzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbG9hZGluZ0NvbmZpZ0RhdGE6IHRydWVcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJR19TVUNDRUVERUQ6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC8vIGNybTogYWN0aW9uLnBheWxvYWQuY3JtLFxuICAgICAgICBjb25maWdEYXRhSW5pdGlhbGl6ZWQ6IHRydWUsXG4gICAgICAgIGxvYWRpbmdDb25maWdEYXRhOiBmYWxzZVxuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogTGF5b3V0IC0tIFRhYnNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfUEFORUxTOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IGFjdGlvbi5tZXRhLnBhbmVscyxcbiAgICAgICAgdWlJZFNlcmlhbDogYWN0aW9uLm1ldGEudWlJZFNlcmlhbCxcbiAgICAgICAgcGFuZWxTZXJpYWw6IGFjdGlvbi5tZXRhLnBhbmVsU2VyaWFsLFxuICAgICAgICBmb2N1c2VkUGFuZWw6IGFjdGlvbi5tZXRhLmZvY3VzZWRQYW5lbFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfTElTVF9UWVBFOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsaXN0OiBhY3Rpb24ubWV0YS5saXN0XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkFDVElWQVRFX1RBQjpcbiAgICAgIHBpID0gYWN0aW9uLm1ldGEucGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0sXG4gICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXS5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gdGkpO1xuICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCOlxuICAgICAgcHBpID0gYWN0aW9uLm1ldGEucHJldmlvdXNQYW5lbEluZGV4O1xuICAgICAgY3BpID0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXg7XG4gICAgICBwdGkgPSBhY3Rpb24ubWV0YS5wcmV2aW91c1RhYkluZGV4O1xuICAgICAgY3RpID0gYWN0aW9uLm1ldGEuY3VycmVudFRhYkluZGV4O1xuXG4gICAgICBpZiAocHBpID09PSBjcGkpIHtcbiAgICAgICAgY29uc3QgdGFicyA9IFsuLi5zdGF0ZS5wYW5lbHNbY3BpXS50YWJzXTtcbiAgICAgICAgbW92ZUl0ZW1JbkFycmF5KHRhYnMsIHB0aSwgY3RpKTtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgICBbY3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbY3BpXSxcbiAgICAgICAgICAgICAgdGFic1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBUYWJzID0gWy4uLnN0YXRlLnBhbmVsc1twcGldLnRhYnNdO1xuICAgICAgICBjb25zdCBjVGFicyA9IFsuLi5zdGF0ZS5wYW5lbHNbY3BpXS50YWJzXTtcbiAgICAgICAgdHJhbnNmZXJBcnJheUl0ZW0ocFRhYnMsIGNUYWJzLCBwdGksIGN0aSk7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW3BwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BwaV0sXG4gICAgICAgICAgICAgIHRhYnM6IHBUYWJzLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09IChwdGkgPCBwVGFicy5sZW5ndGggPyBwdGkgOiAocHRpIC0gMSkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtjcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1tjcGldLFxuICAgICAgICAgICAgICB0YWJzOiBjVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSBjdGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkFERF9UQUI6XG4gICAgICBpZiAoc3RhdGUucGFuZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IHN0YXRlLnBhbmVsU2VyaWFsLFxuICAgICAgICAgICAgICB0YWJzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgZm9jdXNlZFBhbmVsOiAwLFxuICAgICAgICAgIHBhbmVsU2VyaWFsOiBzdGF0ZS5wYW5lbFNlcmlhbCArIDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGkgPSBzdGF0ZS5mb2N1c2VkUGFuZWw7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0sXG4gICAgICAgICAgICB0YWJzOiBbXG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0udGFicy5tYXAodCA9PiB7XG4gICAgICAgICAgICAgICAgdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAuLi5vbWl0KFsncGF0aFNlZ21lbnQnXSwgYWN0aW9uLm1ldGEudGFiKSxcbiAgICAgICAgICAgICAgICAvLyBwYW5lbEluZGV4OiBwaSxcbiAgICAgICAgICAgICAgICBwYXRoOiBbJ2FjdGl2ZVByb2plY3QnLCBhY3Rpb24ubWV0YS50YWIucGF0aFNlZ21lbnQsIHN0YXRlLnVpSWRTZXJpYWwudG9TdHJpbmcoKV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHVpSWRTZXJpYWw6IChzdGF0ZS51aUlkU2VyaWFsICsgMSlcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfVEFCOlxuICAgICAgcGkgPSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4O1xuICAgICAgdGkgPSBhY3Rpb24ubWV0YS50YWJJbmRleDtcbiAgICAgIC8vIHJlbW92ZSB0aGUgY2xvc2luZyB0YWJcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnNdXG4gICAgICAgICAgICAgIC5maWx0ZXIoKHRhYiwgaW5kZXgpID0+IGluZGV4ICE9PSB0aSlcblxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8vIGFjdGl2YXRlIGEgc2libGluZyB0YWIsIGlmIG5lZWRlZCBhbmQgcG9zc2libGVcbiAgICAgIGlmICghc3RhdGUucGFuZWxzW3BpXS50YWJzLmZpbmQodCA9PiB0LmFjdGl2ZSkpIHtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0sXG4gICAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnNdXG4gICAgICAgICAgICAgICAgLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gKHRpIDwgc3RhdGUucGFuZWxzW3BpXS50YWJzLmxlbmd0aCA/IHRpIDogKHRpIC0gMSkpKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfUEFORUw6XG4gICAgICBwaSA9IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXg7XG4gICAgICBjb25zdCBwYW5lbHMgPSBbLi4uc3RhdGUucGFuZWxzXTtcbiAgICAgIHBhbmVscy5zcGxpY2UocGksIDEpO1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHNcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5GT0NVU19QQU5FTDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZm9jdXNlZFBhbmVsOiBhY3Rpb24ubWV0YS5wYW5lbEluZGV4XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMOlxuICAgICAgcHBpID0gYWN0aW9uLm1ldGEucHJldmlvdXNQYW5lbEluZGV4O1xuICAgICAgdGkgPSBhY3Rpb24ubWV0YS50YWJJbmRleDtcbiAgICAgIGNwaSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgY29uc3QgbW92ZVRhYiA9IHN0YXRlLnBhbmVsc1twcGldLnRhYnNbdGldO1xuICAgICAgLy8gcmVtb3ZlcyB0YWIgZnJvbSBvbGQgcGFuZWxcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgW3BwaV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twcGldLFxuICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twcGldLnRhYnNdXG4gICAgICAgICAgICAgIC5maWx0ZXIoKHRhYiwgaW5kZXgpID0+IGluZGV4ICE9PSB0aSlcbiAgICAgICAgICAgICAgLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkgdGFiLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBpbnNlcnQgYSBuZXcgcGFuZWwgYXQgcG9zaXRpb24gb2YgY3BpXG4gICAgICBjb25zdCBuZXdQYW5lbHMgPSBbLi4uc3RhdGUucGFuZWxzXTtcbiAgICAgIG5ld1BhbmVscy5zcGxpY2UoY3BpLCAwLCB7XG4gICAgICAgIGlkOiBzdGF0ZS5wYW5lbFNlcmlhbCxcbiAgICAgICAgdGFiczogW21vdmVUYWJdXG4gICAgICB9KVxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IG5ld1BhbmVscyxcbiAgICAgICAgLy8gaW5jcmVhc2UgcGFuZWwgaWQgc2VxdWVuY2VcbiAgICAgICAgcGFuZWxTZXJpYWw6IHN0YXRlLnBhbmVsU2VyaWFsICsgMVxuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfUkVGSU5JTkdfQ0hVTks6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHJlZmluaW5nQ2h1bms6IGFjdGlvbi5wYXlsb2FkLnJlZmluaW5nQ2h1bmtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9DUkVBVElOR19NRU5USU9OSU5HOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjcmVhdGluZ01lbnRpb25pbmc6IGFjdGlvbi5wYXlsb2FkLmNyZWF0aW5nTWVudGlvbmluZ1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogSGlnaGxpZ2h0aW5nIG9mIG1lbnRpb25pbmdzIGluIHRoZSBndWlcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9URVhUOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZW50aW9uaW5nc0ZvY3VzZWRJblRleHQ6IGFjdGlvbi5wYXlsb2FkLm1lbnRpb25pbmdzRm9jdXNlZEluVGV4dFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfTUVOVElPTklOR1NfRk9DVVNFRF9JTl9UQUJMRTpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVudGlvbmluZ3NGb2N1c2VkSW5UYWJsZTogYWN0aW9uLnBheWxvYWQubWVudGlvbmluZ3NGb2N1c2VkSW5UYWJsZVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogRGVzdHJveSB0aGUgYWN0aXZlIHByb2plY3Qgc3RhdGUgKG9uIGNsb3NpbmcgYSBwcm9qZWN0KVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkRFU1RST1k6XG4gICAgICBzdGF0ZSA9IElOSVRJQUxfU1RBVEU7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdfQ==