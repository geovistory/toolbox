/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/active-project.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9hY3RpdmUtcHJvamVjdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBRSxvQkFBb0IsRUFBdUIsTUFBTSwrQ0FBK0MsQ0FBQzs7SUFJcEcsYUFBYSxHQUFrQjtJQUNuQyxLQUFLLEVBQUUsRUFBRTtJQUNULElBQUksRUFBRSxFQUFFO0lBQ1IsVUFBVSxFQUFFLENBQUM7SUFDYixXQUFXLEVBQUUsQ0FBQztJQUNkLFlBQVksRUFBRSxDQUFDO0lBQ2YsTUFBTSxFQUFFLEVBQUU7Q0FDWDs7QUFDRCxNQUFNLEtBQU8sb0JBQW9COzs7OztBQUFHLFVBQUMsS0FBb0MsRUFBRSxNQUEyQjs7SUFBakUsc0JBQUEsRUFBQSxxQkFBb0M7O1FBQ25FLEVBQUU7O1FBQUUsRUFBRTs7UUFBRSxHQUFHOztRQUFFLEdBQUc7O1FBQUUsR0FBRzs7UUFBRSxHQUFHO0lBQzlCLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQjs7NkZBRXFGO1FBQ3JGLEtBQUssb0JBQW9CLENBQUMsNkJBQTZCO1lBQ3JELEtBQUssd0JBQ0EsS0FBSyxFQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUM5QixDQUFDO1lBQ0YsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsbUJBQW1CO1lBQzNDLEtBQUssd0JBQ0EsS0FBSyxJQUNSLGlCQUFpQixFQUFFLElBQUksR0FDeEIsQ0FBQTtZQUNELE1BQU07UUFDUixLQUFLLG9CQUFvQixDQUFDLDZCQUE2QjtZ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SyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQ25DLENBQUE7WUFFRCxNQUFNO1FBR1IsS0FBSyxvQkFBb0IsQ0FBQyxrQkFBa0I7WUFDMUMsS0FBSyx3QkFDQSxLQUFLLElBQ1IsYUFBYSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUM1QyxDQUFDO1lBQ0YsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsdUJBQXVCO1lBQy9DLEtBQUssd0JBQ0EsS0FBSyxJQUNSLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQ3RELENBQUM7WUFDRixNQUFNO1FBRVI7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLCtCQUErQjtZQUN2RCxLQUFLLHdCQUNBLEtBQUssSUFDUix3QkFBd0IsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLHdCQUF3QixHQUNsRSxDQUFDO1lBQ0YsTUFBTTtRQUVSLEtBQUssb0JBQW9CLENBQUMsZ0NBQWdDO1lBQ3hELEtBQUssd0JBQ0EsS0FBSyxJQUNSLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLEdBQ3BFLENBQUM7WUFDRixNQUFNO1FBR1I7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLE9BQU87WUFDL0IsS0FBSyxHQUFHLGFBQWEsQ0FBQztZQUN0QixNQUFNO0tBQ1Q7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSwgdHJhbnNmZXJBcnJheUl0ZW0gfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IG9taXQgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0QWN0aW9ucywgQWN0aXZlUHJvamVjdEFjdGlvbiB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2FjdGl2ZS1wcm9qZWN0LmFjdGlvbic7XG5pbXBvcnQgeyBQcm9qZWN0RGV0YWlsIH0gZnJvbSAnLi4vbW9kZWxzL2FjdGl2ZS1wcm9qZWN0Lm1vZGVscyc7XG5cblxuY29uc3QgSU5JVElBTF9TVEFURTogUHJvamVjdERldGFpbCA9IHtcbiAgbGFiZWw6ICcnLFxuICBsaXN0OiAnJyxcbiAgdWlJZFNlcmlhbDogMCxcbiAgcGFuZWxTZXJpYWw6IDAsXG4gIGZvY3VzZWRQYW5lbDogMCxcbiAgcGFuZWxzOiBbXVxufTtcbmV4cG9ydCBjb25zdCBhY3RpdmVQcm9qZWN0UmVkdWNlciA9IChzdGF0ZTogUHJvamVjdERldGFpbCA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbik6IFByb2plY3REZXRhaWwgPT4ge1xuICBsZXQgcGksIHRpLCBwcGksIGNwaSwgcHRpLCBjdGk7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogTG9hZCBwcm9qZWN0IGRhdGEgKG1ldGFkYXRhLCBjcm0pXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQ6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC4uLmFjdGlvbi5tZXRhLnByb2plY3RQcmV2aWV3XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkaW5nQ29uZmlnRGF0YTogdHJ1ZVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHX1NVQ0NFRURFRDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLy8gY3JtOiBhY3Rpb24ucGF5bG9hZC5jcm0sXG4gICAgICAgIGNvbmZpZ0RhdGFJbml0aWFsaXplZDogdHJ1ZSxcbiAgICAgICAgbG9hZGluZ0NvbmZpZ0RhdGE6IGZhbHNlXG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBMYXlvdXQgLS0gVGFic1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9QQU5FTFM6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogYWN0aW9uLm1ldGEucGFuZWxzLFxuICAgICAgICB1aUlkU2VyaWFsOiBhY3Rpb24ubWV0YS51aUlkU2VyaWFsLFxuICAgICAgICBwYW5lbFNlcmlhbDogYWN0aW9uLm1ldGEucGFuZWxTZXJpYWwsXG4gICAgICAgIGZvY3VzZWRQYW5lbDogYWN0aW9uLm1ldGEuZm9jdXNlZFBhbmVsXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9MSVNUX1RZUEU6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxpc3Q6IGFjdGlvbi5tZXRhLmxpc3RcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuQUNUSVZBVEVfVEFCOlxuICAgICAgcGkgPSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4O1xuICAgICAgdGkgPSBhY3Rpb24ubWV0YS50YWJJbmRleDtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnNdLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSB0aSk7XG4gICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUI6XG4gICAgICBwcGkgPSBhY3Rpb24ubWV0YS5wcmV2aW91c1BhbmVsSW5kZXg7XG4gICAgICBjcGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgIHB0aSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzVGFiSW5kZXg7XG4gICAgICBjdGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50VGFiSW5kZXg7XG5cbiAgICAgIGlmIChwcGkgPT09IGNwaSkge1xuICAgICAgICBjb25zdCB0YWJzID0gWy4uLnN0YXRlLnBhbmVsc1tjcGldLnRhYnNdO1xuICAgICAgICBtb3ZlSXRlbUluQXJyYXkodGFicywgcHRpLCBjdGkpO1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtjcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1tjcGldLFxuICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcFRhYnMgPSBbLi4uc3RhdGUucGFuZWxzW3BwaV0udGFic107XG4gICAgICAgIGNvbnN0IGNUYWJzID0gWy4uLnN0YXRlLnBhbmVsc1tjcGldLnRhYnNdO1xuICAgICAgICB0cmFuc2ZlckFycmF5SXRlbShwVGFicywgY1RhYnMsIHB0aSwgY3RpKTtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgICBbcHBpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcHBpXSxcbiAgICAgICAgICAgICAgdGFiczogcFRhYnMubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gKHB0aSA8IHBUYWJzLmxlbmd0aCA/IHB0aSA6IChwdGkgLSAxKSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW2NwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW2NwaV0sXG4gICAgICAgICAgICAgIHRhYnM6IGNUYWJzLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09IGN0aSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuQUREX1RBQjpcbiAgICAgIGlmIChzdGF0ZS5wYW5lbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogc3RhdGUucGFuZWxTZXJpYWwsXG4gICAgICAgICAgICAgIHRhYnM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBmb2N1c2VkUGFuZWw6IDAsXG4gICAgICAgICAgcGFuZWxTZXJpYWw6IHN0YXRlLnBhbmVsU2VyaWFsICsgMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwaSA9IHN0YXRlLmZvY3VzZWRQYW5lbDtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgIHRhYnM6IFtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzLm1hcCh0ID0+IHtcbiAgICAgICAgICAgICAgICB0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoWydwYXRoU2VnbWVudCddLCBhY3Rpb24ubWV0YS50YWIpLFxuICAgICAgICAgICAgICAgIC8vIHBhbmVsSW5kZXg6IHBpLFxuICAgICAgICAgICAgICAgIHBhdGg6IFsnYWN0aXZlUHJvamVjdCcsIGFjdGlvbi5tZXRhLnRhYi5wYXRoU2VnbWVudCwgc3RhdGUudWlJZFNlcmlhbC50b1N0cmluZygpXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgdWlJZFNlcmlhbDogKHN0YXRlLnVpSWRTZXJpYWwgKyAxKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9UQUI6XG4gICAgICBwaSA9IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgLy8gcmVtb3ZlIHRoZSBjbG9zaW5nIHRhYlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic11cbiAgICAgICAgICAgICAgLmZpbHRlcigodGFiLCBpbmRleCkgPT4gaW5kZXggIT09IHRpKVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgLy8gYWN0aXZhdGUgYSBzaWJsaW5nIHRhYiwgaWYgbmVlZGVkIGFuZCBwb3NzaWJsZVxuICAgICAgaWYgKCFzdGF0ZS5wYW5lbHNbcGldLnRhYnMuZmluZCh0ID0+IHQuYWN0aXZlKSkge1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic11cbiAgICAgICAgICAgICAgICAubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSAodGkgPCBzdGF0ZS5wYW5lbHNbcGldLnRhYnMubGVuZ3RoID8gdGkgOiAodGkgLSAxKSkpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9QQU5FTDpcbiAgICAgIHBpID0gYWN0aW9uLm1ldGEucGFuZWxJbmRleDtcbiAgICAgIGNvbnN0IHBhbmVscyA9IFsuLi5zdGF0ZS5wYW5lbHNdO1xuICAgICAgcGFuZWxzLnNwbGljZShwaSwgMSk7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsc1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkZPQ1VTX1BBTkVMOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBmb2N1c2VkUGFuZWw6IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXhcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUw6XG4gICAgICBwcGkgPSBhY3Rpb24ubWV0YS5wcmV2aW91c1BhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgY3BpID0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXg7XG4gICAgICBjb25zdCBtb3ZlVGFiID0gc3RhdGUucGFuZWxzW3BwaV0udGFic1t0aV07XG4gICAgICAvLyByZW1vdmVzIHRhYiBmcm9tIG9sZCBwYW5lbFxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcHBpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BwaV0sXG4gICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BwaV0udGFic11cbiAgICAgICAgICAgICAgLmZpbHRlcigodGFiLCBpbmRleCkgPT4gaW5kZXggIT09IHRpKVxuICAgICAgICAgICAgICAubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB0YWIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8vIGluc2VydCBhIG5ldyBwYW5lbCBhdCBwb3NpdGlvbiBvZiBjcGlcbiAgICAgIGNvbnN0IG5ld1BhbmVscyA9IFsuLi5zdGF0ZS5wYW5lbHNdO1xuICAgICAgbmV3UGFuZWxzLnNwbGljZShjcGksIDAsIHtcbiAgICAgICAgaWQ6IHN0YXRlLnBhbmVsU2VyaWFsLFxuICAgICAgICB0YWJzOiBbbW92ZVRhYl1cbiAgICAgIH0pXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogbmV3UGFuZWxzLFxuICAgICAgICAvLyBpbmNyZWFzZSBwYW5lbCBpZCBzZXF1ZW5jZVxuICAgICAgICBwYW5lbFNlcmlhbDogc3RhdGUucGFuZWxTZXJpYWwgKyAxXG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG5cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9SRUZJTklOR19DSFVOSzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcmVmaW5pbmdDaHVuazogYWN0aW9uLnBheWxvYWQucmVmaW5pbmdDaHVua1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0NSRUFUSU5HX01FTlRJT05JTkc6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGNyZWF0aW5nTWVudGlvbmluZzogYWN0aW9uLnBheWxvYWQuY3JlYXRpbmdNZW50aW9uaW5nXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBIaWdobGlnaHRpbmcgb2YgbWVudGlvbmluZ3MgaW4gdGhlIGd1aVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RFWFQ6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lbnRpb25pbmdzRm9jdXNlZEluVGV4dDogYWN0aW9uLnBheWxvYWQubWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RBQkxFOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlOiBhY3Rpb24ucGF5bG9hZC5tZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBEZXN0cm95IHRoZSBhY3RpdmUgcHJvamVjdCBzdGF0ZSAob24gY2xvc2luZyBhIHByb2plY3QpXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuREVTVFJPWTpcbiAgICAgIHN0YXRlID0gSU5JVElBTF9TVEFURTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl19