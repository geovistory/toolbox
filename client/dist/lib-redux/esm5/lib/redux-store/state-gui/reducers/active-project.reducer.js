/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/active-project.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { omit } from 'ramda';
import { ActiveProjectActions } from '../../state-gui/actions/active-project.action';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2FjdGl2ZS1wcm9qZWN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUFFLG9CQUFvQixFQUF1QixNQUFNLCtDQUErQyxDQUFDOztJQUlwRyxhQUFhLEdBQWtCO0lBQ25DLEtBQUssRUFBRSxFQUFFO0lBQ1QsSUFBSSxFQUFFLEVBQUU7SUFDUixVQUFVLEVBQUUsQ0FBQztJQUNiLFdBQVcsRUFBRSxDQUFDO0lBQ2QsWUFBWSxFQUFFLENBQUM7SUFDZixNQUFNLEVBQUUsRUFBRTtDQUNYOztBQUNELE1BQU0sS0FBTyxvQkFBb0I7Ozs7O0FBQUcsVUFBQyxLQUFvQyxFQUFFLE1BQTJCOztJQUFqRSxzQkFBQSxFQUFBLHFCQUFvQzs7UUFDbkUsRUFBRTs7UUFBRSxFQUFFOztRQUFFLEdBQUc7O1FBQUUsR0FBRzs7UUFBRSxHQUFHOztRQUFFLEdBQUc7SUFDOUIsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25COzs2RkFFcUY7UUFDckYsS0FBSyxvQkFBb0IsQ0FBQyw2QkFBNkI7WUFDckQsS0FBSyx3QkFDQSxLQUFLLEVBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQzlCLENBQUM7WUFDRixNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyxtQkFBbUI7WUFDM0MsS0FBSyx3QkFDQSxLQUFLLElBQ1IsaUJBQWlCLEVBQUUsSUFBSSxHQUN4QixDQUFBO1lBQ0QsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsNkJBQTZCO1lBQ3JE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QUMsV0FBVyxHQUFHLENBQUMsR0FDbkMsQ0FBQTtZQUVELE1BQU07UUFHUixLQUFLLG9CQUFvQixDQUFDLGtCQUFrQjtZQUMxQyxLQUFLLHdCQUNBLEtBQUssSUFDUixhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQzVDLENBQUM7WUFDRixNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyx1QkFBdUI7WUFDL0MsS0FBSyx3QkFDQSxLQUFLLElBQ1Isa0JBQWtCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FDdEQsQ0FBQztZQUNGLE1BQU07UUFFUjs7NkZBRXFGO1FBQ3JGLEtBQUssb0JBQW9CLENBQUMsK0JBQStCO1lBQ3ZELEtBQUssd0JBQ0EsS0FBSyxJQUNSLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEdBQ2xFLENBQUM7WUFDRixNQUFNO1FBRVIsS0FBSyxvQkFBb0IsQ0FBQyxnQ0FBZ0M7WUFDeEQsS0FBSyx3QkFDQSxLQUFLLElBQ1IseUJBQXlCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsR0FDcEUsQ0FBQztZQUNGLE1BQU07UUFHUjs7NkZBRXFGO1FBQ3JGLEtBQUssb0JBQW9CLENBQUMsT0FBTztZQUMvQixLQUFLLEdBQUcsYUFBYSxDQUFDO1lBQ3RCLE1BQU07S0FDVDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW92ZUl0ZW1JbkFycmF5LCB0cmFuc2ZlckFycmF5SXRlbSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb25zLCBBY3RpdmVQcm9qZWN0QWN0aW9uIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uJztcbmltcG9ydCB7IFByb2plY3REZXRhaWwgfSBmcm9tICcuLi9tb2RlbHMvYWN0aXZlLXByb2plY3QubW9kZWxzJztcblxuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBQcm9qZWN0RGV0YWlsID0ge1xuICBsYWJlbDogJycsXG4gIGxpc3Q6ICcnLFxuICB1aUlkU2VyaWFsOiAwLFxuICBwYW5lbFNlcmlhbDogMCxcbiAgZm9jdXNlZFBhbmVsOiAwLFxuICBwYW5lbHM6IFtdXG59O1xuZXhwb3J0IGNvbnN0IGFjdGl2ZVByb2plY3RSZWR1Y2VyID0gKHN0YXRlOiBQcm9qZWN0RGV0YWlsID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKTogUHJvamVjdERldGFpbCA9PiB7XG4gIGxldCBwaSwgdGksIHBwaSwgY3BpLCBwdGksIGN0aTtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBMb2FkIHByb2plY3QgZGF0YSAobWV0YWRhdGEsIGNybSlcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLi4uYWN0aW9uLm1ldGEucHJvamVjdFByZXZpZXdcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUc6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmdDb25maWdEYXRhOiB0cnVlXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUdfU1VDQ0VFREVEOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAvLyBjcm06IGFjdGlvbi5wYXlsb2FkLmNybSxcbiAgICAgICAgY29uZmlnRGF0YUluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICBsb2FkaW5nQ29uZmlnRGF0YTogZmFsc2VcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIExheW91dCAtLSBUYWJzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1BBTkVMUzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBhY3Rpb24ubWV0YS5wYW5lbHMsXG4gICAgICAgIHVpSWRTZXJpYWw6IGFjdGlvbi5tZXRhLnVpSWRTZXJpYWwsXG4gICAgICAgIHBhbmVsU2VyaWFsOiBhY3Rpb24ubWV0YS5wYW5lbFNlcmlhbCxcbiAgICAgICAgZm9jdXNlZFBhbmVsOiBhY3Rpb24ubWV0YS5mb2N1c2VkUGFuZWxcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0xJU1RfVFlQRTpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbGlzdDogYWN0aW9uLm1ldGEubGlzdFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUI6XG4gICAgICBwaSA9IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic10ubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09IHRpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQjpcbiAgICAgIHBwaSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzUGFuZWxJbmRleDtcbiAgICAgIGNwaSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgcHRpID0gYWN0aW9uLm1ldGEucHJldmlvdXNUYWJJbmRleDtcbiAgICAgIGN0aSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRUYWJJbmRleDtcblxuICAgICAgaWYgKHBwaSA9PT0gY3BpKSB7XG4gICAgICAgIGNvbnN0IHRhYnMgPSBbLi4uc3RhdGUucGFuZWxzW2NwaV0udGFic107XG4gICAgICAgIG1vdmVJdGVtSW5BcnJheSh0YWJzLCBwdGksIGN0aSk7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW2NwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW2NwaV0sXG4gICAgICAgICAgICAgIHRhYnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwVGFicyA9IFsuLi5zdGF0ZS5wYW5lbHNbcHBpXS50YWJzXTtcbiAgICAgICAgY29uc3QgY1RhYnMgPSBbLi4uc3RhdGUucGFuZWxzW2NwaV0udGFic107XG4gICAgICAgIHRyYW5zZmVyQXJyYXlJdGVtKHBUYWJzLCBjVGFicywgcHRpLCBjdGkpO1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtwcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twcGldLFxuICAgICAgICAgICAgICB0YWJzOiBwVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSAocHRpIDwgcFRhYnMubGVuZ3RoID8gcHRpIDogKHB0aSAtIDEpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbY3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbY3BpXSxcbiAgICAgICAgICAgICAgdGFiczogY1RhYnMubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gY3RpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BRERfVEFCOlxuICAgICAgaWYgKHN0YXRlLnBhbmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBzdGF0ZS5wYW5lbFNlcmlhbCxcbiAgICAgICAgICAgICAgdGFiczogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZvY3VzZWRQYW5lbDogMCxcbiAgICAgICAgICBwYW5lbFNlcmlhbDogc3RhdGUucGFuZWxTZXJpYWwgKyAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBpID0gc3RhdGUuZm9jdXNlZFBhbmVsO1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogW1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnMubWFwKHQgPT4ge1xuICAgICAgICAgICAgICAgIHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbJ3BhdGhTZWdtZW50J10sIGFjdGlvbi5tZXRhLnRhYiksXG4gICAgICAgICAgICAgICAgLy8gcGFuZWxJbmRleDogcGksXG4gICAgICAgICAgICAgICAgcGF0aDogWydhY3RpdmVQcm9qZWN0JywgYWN0aW9uLm1ldGEudGFiLnBhdGhTZWdtZW50LCBzdGF0ZS51aUlkU2VyaWFsLnRvU3RyaW5nKCldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB1aUlkU2VyaWFsOiAoc3RhdGUudWlJZFNlcmlhbCArIDEpXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQjpcbiAgICAgIHBpID0gYWN0aW9uLm1ldGEucGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICAvLyByZW1vdmUgdGhlIGNsb3NpbmcgdGFiXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0sXG4gICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXVxuICAgICAgICAgICAgICAuZmlsdGVyKCh0YWIsIGluZGV4KSA9PiBpbmRleCAhPT0gdGkpXG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBhY3RpdmF0ZSBhIHNpYmxpbmcgdGFiLCBpZiBuZWVkZWQgYW5kIHBvc3NpYmxlXG4gICAgICBpZiAoIXN0YXRlLnBhbmVsc1twaV0udGFicy5maW5kKHQgPT4gdC5hY3RpdmUpKSB7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXVxuICAgICAgICAgICAgICAgIC5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09ICh0aSA8IHN0YXRlLnBhbmVsc1twaV0udGFicy5sZW5ndGggPyB0aSA6ICh0aSAtIDEpKSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMOlxuICAgICAgcGkgPSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4O1xuICAgICAgY29uc3QgcGFuZWxzID0gWy4uLnN0YXRlLnBhbmVsc107XG4gICAgICBwYW5lbHMuc3BsaWNlKHBpLCAxKTtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzXG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuRk9DVVNfUEFORUw6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZvY3VzZWRQYW5lbDogYWN0aW9uLm1ldGEucGFuZWxJbmRleFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTDpcbiAgICAgIHBwaSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzUGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICBjcGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgIGNvbnN0IG1vdmVUYWIgPSBzdGF0ZS5wYW5lbHNbcHBpXS50YWJzW3RpXTtcbiAgICAgIC8vIHJlbW92ZXMgdGFiIGZyb20gb2xkIHBhbmVsXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcHBpXSxcbiAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcHBpXS50YWJzXVxuICAgICAgICAgICAgICAuZmlsdGVyKCh0YWIsIGluZGV4KSA9PiBpbmRleCAhPT0gdGkpXG4gICAgICAgICAgICAgIC5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHRhYi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgLy8gaW5zZXJ0IGEgbmV3IHBhbmVsIGF0IHBvc2l0aW9uIG9mIGNwaVxuICAgICAgY29uc3QgbmV3UGFuZWxzID0gWy4uLnN0YXRlLnBhbmVsc107XG4gICAgICBuZXdQYW5lbHMuc3BsaWNlKGNwaSwgMCwge1xuICAgICAgICBpZDogc3RhdGUucGFuZWxTZXJpYWwsXG4gICAgICAgIHRhYnM6IFttb3ZlVGFiXVxuICAgICAgfSlcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBuZXdQYW5lbHMsXG4gICAgICAgIC8vIGluY3JlYXNlIHBhbmVsIGlkIHNlcXVlbmNlXG4gICAgICAgIHBhbmVsU2VyaWFsOiBzdGF0ZS5wYW5lbFNlcmlhbCArIDFcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1JFRklOSU5HX0NIVU5LOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZWZpbmluZ0NodW5rOiBhY3Rpb24ucGF5bG9hZC5yZWZpbmluZ0NodW5rXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfQ1JFQVRJTkdfTUVOVElPTklORzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3JlYXRpbmdNZW50aW9uaW5nOiBhY3Rpb24ucGF5bG9hZC5jcmVhdGluZ01lbnRpb25pbmdcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEhpZ2hsaWdodGluZyBvZiBtZW50aW9uaW5ncyBpbiB0aGUgZ3VpXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEVYVDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0OiBhY3Rpb24ucGF5bG9hZC5tZW50aW9uaW5nc0ZvY3VzZWRJblRleHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEFCTEU6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lbnRpb25pbmdzRm9jdXNlZEluVGFibGU6IGFjdGlvbi5wYXlsb2FkLm1lbnRpb25pbmdzRm9jdXNlZEluVGFibGVcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIERlc3Ryb3kgdGhlIGFjdGl2ZSBwcm9qZWN0IHN0YXRlIChvbiBjbG9zaW5nIGEgcHJvamVjdClcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSBJTklUSUFMX1NUQVRFO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXX0=