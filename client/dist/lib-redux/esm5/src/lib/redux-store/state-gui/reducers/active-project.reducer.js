/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/active-project.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9hY3RpdmUtcHJvamVjdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBdUIsb0JBQW9CLEVBQUUsTUFBTSxZQUFZLENBQUM7O0lBR2pFLGFBQWEsR0FBa0I7SUFDbkMsS0FBSyxFQUFFLEVBQUU7SUFDVCxJQUFJLEVBQUUsRUFBRTtJQUNSLFVBQVUsRUFBRSxDQUFDO0lBQ2IsV0FBVyxFQUFFLENBQUM7SUFDZCxZQUFZLEVBQUUsQ0FBQztJQUNmLE1BQU0sRUFBRSxFQUFFO0NBQ1g7O0FBQ0QsTUFBTSxLQUFPLG9CQUFvQjs7Ozs7QUFBRyxVQUFDLEtBQW9DLEVBQUUsTUFBMkI7O0lBQWpFLHNCQUFBLEVBQUEscUJBQW9DOztRQUNuRSxFQUFFOztRQUFFLEVBQUU7O1FBQUUsR0FBRzs7UUFBRSxHQUFHOztRQUFFLEdBQUc7O1FBQUUsR0FBRztJQUM5QixRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkI7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLDZCQUE2QjtZQUNyRCxLQUFLLHdCQUNBLEtBQUssRUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FDOUIsQ0FBQztZQUNGLE1BQU07UUFDUixLQUFLLG9CQUFvQixDQUFDLG1CQUFtQjtZQUMzQyxLQUFLLHdCQUNBLEtBQUssSUFDUixpQkFBaUIsRUFBRSxJQUFJLEdBQ3hCLENBQUE7WUFDRCxNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyw2QkFBNkI7WUFDckQsS0FBSyx3QkFDQSxLQUFLLElBRVIscUJBQXFCLEVBQUUsSUFBSSxFQUMzQixpQkFBaUIsRUFBRSxLQUFLLEdBQ3pCLENBQUE7WUFDRCxNQUFNO1FBRVI7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLFVBQVU7WUFDbEMsS0FBSyx3QkFDQSxLQUFLLElBQ1IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUMxQixVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ2xDLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDcEMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUN2QyxDQUFBO1lBQ0QsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsYUFBYTtZQUNyQyxLQUFLLHdCQUNBLEtBQUssSUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQ3ZCLENBQUE7WUFDRCxNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyxZQUFZO1lBQ3BDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUM1QixFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUIsS0FBSyx3QkFDQSxLQUFLLElBQ1IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLGtCQUFLLEtBQUssQ0FBQyxNQUFNO29CQUNwQyxHQUFDLEVBQUUseUJBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFDbkIsSUFBSSxFQUFFLGlCQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUc7Ozs7O3dCQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUs7NEJBQzlDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQzVCLE9BQU8sR0FBRyxDQUFDO3dCQUNiLENBQUMsRUFBQyxHQUNIO3dCQUNELEdBQ0gsQ0FBQTtZQUNELE1BQU07UUFDUixLQUFLLG9CQUFvQixDQUFDLFFBQVE7WUFDaEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDckMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDcEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDbkMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRWxDLElBQUksR0FBRyxLQUFLLEdBQUcsRUFBRTs7b0JBQ1QsSUFBSSxvQkFBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssd0JBQ0EsS0FBSyxJQUNSLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxrQkFBSyxLQUFLLENBQUMsTUFBTTt3QkFDcEMsR0FBQyxHQUFHLHlCQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQ3BCLElBQUksTUFBQSxHQUNMOzRCQUNELEdBQ0gsQ0FBQTthQUNGO2lCQUFNOztvQkFDQyxPQUFLLG9CQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDOztvQkFDbkMsS0FBSyxvQkFBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDekMsaUJBQWlCLENBQUMsT0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLEtBQUssd0JBQ0EsS0FBSyxJQUNSLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxrQkFBSyxLQUFLLENBQUMsTUFBTTt3QkFDcEMsR0FBQyxHQUFHLHlCQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQ3BCLElBQUksRUFBRSxPQUFLLENBQUMsR0FBRzs7Ozs7NEJBQUMsVUFBQyxHQUFHLEVBQUUsS0FBSztnQ0FDekIsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDaEUsT0FBTyxHQUFHLENBQUM7NEJBQ2IsQ0FBQyxFQUFDLEdBQ0g7d0JBQ0QsR0FBQyxHQUFHLHlCQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQ3BCLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRzs7Ozs7NEJBQUMsVUFBQyxHQUFHLEVBQUUsS0FBSztnQ0FDekIsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQztnQ0FDN0IsT0FBTyxHQUFHLENBQUM7NEJBQ2IsQ0FBQyxFQUFDLEdBQ0g7NEJBQ0QsR0FDSCxDQUFBO2FBQ0Y7WUFFRCxNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyxPQUFPO1lBQy9CLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixLQUFLLHdCQUNBLEtBQUssSUFDUixNQUFNLEVBQUU7d0JBQ047NEJBQ0UsRUFBRSxFQUFFLEtBQUssQ0FBQyxXQUFXOzRCQUNyQixJQUFJLEVBQUUsRUFBRTt5QkFDVDtxQkFDRixFQUNELFlBQVksRUFBRSxDQUFDLEVBQ2YsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUNuQyxDQUFBO2FBQ0Y7WUFDRCxFQUFFLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUN4QixLQUFLLHdCQUNBLEtBQUssSUFDUixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sa0JBQUssS0FBSyxDQUFDLE1BQU07b0JBQ3BDLEdBQUMsRUFBRSx5QkFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUNuQixJQUFJLG1CQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7d0JBQUMsVUFBQSxDQUFDOzRCQUM1QixDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs0QkFDakIsT0FBTyxDQUFDLENBQUM7d0JBQ1gsQ0FBQyxFQUFDO2lEQUVHLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBRXpDLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs2QkFHdEY7d0JBQ0QsRUFDRixVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUNuQyxDQUFBO1lBQ0QsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsU0FBUztZQUNqQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDNUIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzFCLHlCQUF5QjtZQUN6QixLQUFLLHdCQUNBLEtBQUssSUFDUixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sa0JBQUssS0FBSyxDQUFDLE1BQU07b0JBQ3BDLEdBQUMsRUFBRSx5QkFDRSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUNuQixJQUFJLEVBQUUsaUJBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQzVCLE1BQU07Ozs7O3dCQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUssS0FBSyxFQUFFLEVBQVosQ0FBWSxFQUFDLEdBRXhDO3dCQUNELEdBQ0gsQ0FBQTtZQUNELGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sRUFBUixDQUFRLEVBQUMsRUFBRTtnQkFDOUMsS0FBSyx3QkFDQSxLQUFLLElBQ1IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLGtCQUFLLEtBQUssQ0FBQyxNQUFNO3dCQUNwQyxHQUFDLEVBQUUseUJBQ0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFDbkIsSUFBSSxFQUFFLGlCQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUM1QixHQUFHOzs7Ozs0QkFBQyxVQUFDLEdBQUcsRUFBRSxLQUFLO2dDQUNkLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDN0UsT0FBTyxHQUFHLENBQUM7NEJBQ2IsQ0FBQyxFQUFDLEdBQ0w7NEJBQ0QsR0FFSCxDQUFBO2FBQ0Y7WUFDRCxNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyxXQUFXO1lBQ25DLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Z0JBQ3RCLE1BQU0sb0JBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLHdCQUNBLEtBQUssSUFDUixNQUFNLFFBQUEsR0FDUCxDQUFBO1lBQ0QsTUFBTTtRQUVSLEtBQUssb0JBQW9CLENBQUMsV0FBVztZQUNuQyxLQUFLLHdCQUNBLEtBQUssSUFDUixZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQ3JDLENBQUE7WUFDRCxNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyxXQUFXO1lBQ25DLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ3JDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs7Z0JBQzlCLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDMUMsNkJBQTZCO1lBQzdCLEtBQUssd0JBQ0EsS0FBSyxJQUNSLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxrQkFBSyxLQUFLLENBQUMsTUFBTTtvQkFDcEMsR0FBQyxHQUFHLHlCQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQ3BCLElBQUksRUFBRSxpQkFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFDN0IsTUFBTTs7Ozs7d0JBQUMsVUFBQyxHQUFHLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSyxLQUFLLEVBQUUsRUFBWixDQUFZLEVBQUM7NkJBQ3BDLEdBQUc7Ozs7O3dCQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUs7NEJBQ2QsSUFBSSxLQUFLLEtBQUssQ0FBQztnQ0FBRSxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs0QkFDbkMsT0FBTyxHQUFHLENBQUM7d0JBQ2IsQ0FBQyxFQUFDLEdBQ0w7d0JBQ0QsR0FDSCxDQUFBOzs7Z0JBRUssU0FBUyxvQkFBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ25DLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtnQkFDdkIsRUFBRSxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUNyQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDaEIsQ0FBQyxDQUFBO1lBQ0YsS0FBSyx3QkFDQSxLQUFLLElBQ1IsTUFBTSxFQUFFLFNBQVMsRUFFakIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUNuQyxDQUFBO1lBRUQsTUFBTTtRQUdSLEtBQUssb0JBQW9CLENBQUMsa0JBQWtCO1lBQzFDLEtBQUssd0JBQ0EsS0FBSyxJQUNSLGFBQWEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FDNUMsQ0FBQztZQUNGLE1BQU07UUFDUixLQUFLLG9CQUFvQixDQUFDLHVCQUF1QjtZQUMvQyxLQUFLLHdCQUNBLEtBQUssSUFDUixrQkFBa0IsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUN0RCxDQUFDO1lBQ0YsTUFBTTtRQUVSOzs2RkFFcUY7UUFDckYsS0FBSyxvQkFBb0IsQ0FBQywrQkFBK0I7WUFDdkQsS0FBSyx3QkFDQSxLQUFLLElBQ1Isd0JBQXdCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsR0FDbEUsQ0FBQztZQUNGLE1BQU07UUFFUixLQUFLLG9CQUFvQixDQUFDLGdDQUFnQztZQUN4RCxLQUFLLHdCQUNBLEtBQUssSUFDUix5QkFBeUIsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLHlCQUF5QixHQUNwRSxDQUFDO1lBQ0YsTUFBTTtRQUdSOzs2RkFFcUY7UUFDckYsS0FBSyxvQkFBb0IsQ0FBQyxPQUFPO1lBQy9CLEtBQUssR0FBRyxhQUFhLENBQUM7WUFDdEIsTUFBTTtLQUNUO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtb3ZlSXRlbUluQXJyYXksIHRyYW5zZmVyQXJyYXlJdGVtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEFjdGlvbiwgQWN0aXZlUHJvamVjdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFByb2plY3REZXRhaWwgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBQcm9qZWN0RGV0YWlsID0ge1xuICBsYWJlbDogJycsXG4gIGxpc3Q6ICcnLFxuICB1aUlkU2VyaWFsOiAwLFxuICBwYW5lbFNlcmlhbDogMCxcbiAgZm9jdXNlZFBhbmVsOiAwLFxuICBwYW5lbHM6IFtdXG59O1xuZXhwb3J0IGNvbnN0IGFjdGl2ZVByb2plY3RSZWR1Y2VyID0gKHN0YXRlOiBQcm9qZWN0RGV0YWlsID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKTogUHJvamVjdERldGFpbCA9PiB7XG4gIGxldCBwaSwgdGksIHBwaSwgY3BpLCBwdGksIGN0aTtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBMb2FkIHByb2plY3QgZGF0YSAobWV0YWRhdGEsIGNybSlcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLi4uYWN0aW9uLm1ldGEucHJvamVjdFByZXZpZXdcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUc6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmdDb25maWdEYXRhOiB0cnVlXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUdfU1VDQ0VFREVEOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAvLyBjcm06IGFjdGlvbi5wYXlsb2FkLmNybSxcbiAgICAgICAgY29uZmlnRGF0YUluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICBsb2FkaW5nQ29uZmlnRGF0YTogZmFsc2VcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIExheW91dCAtLSBUYWJzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1BBTkVMUzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBhY3Rpb24ubWV0YS5wYW5lbHMsXG4gICAgICAgIHVpSWRTZXJpYWw6IGFjdGlvbi5tZXRhLnVpSWRTZXJpYWwsXG4gICAgICAgIHBhbmVsU2VyaWFsOiBhY3Rpb24ubWV0YS5wYW5lbFNlcmlhbCxcbiAgICAgICAgZm9jdXNlZFBhbmVsOiBhY3Rpb24ubWV0YS5mb2N1c2VkUGFuZWxcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0xJU1RfVFlQRTpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbGlzdDogYWN0aW9uLm1ldGEubGlzdFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUI6XG4gICAgICBwaSA9IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic10ubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09IHRpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQjpcbiAgICAgIHBwaSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzUGFuZWxJbmRleDtcbiAgICAgIGNwaSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgcHRpID0gYWN0aW9uLm1ldGEucHJldmlvdXNUYWJJbmRleDtcbiAgICAgIGN0aSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRUYWJJbmRleDtcblxuICAgICAgaWYgKHBwaSA9PT0gY3BpKSB7XG4gICAgICAgIGNvbnN0IHRhYnMgPSBbLi4uc3RhdGUucGFuZWxzW2NwaV0udGFic107XG4gICAgICAgIG1vdmVJdGVtSW5BcnJheSh0YWJzLCBwdGksIGN0aSk7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW2NwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW2NwaV0sXG4gICAgICAgICAgICAgIHRhYnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwVGFicyA9IFsuLi5zdGF0ZS5wYW5lbHNbcHBpXS50YWJzXTtcbiAgICAgICAgY29uc3QgY1RhYnMgPSBbLi4uc3RhdGUucGFuZWxzW2NwaV0udGFic107XG4gICAgICAgIHRyYW5zZmVyQXJyYXlJdGVtKHBUYWJzLCBjVGFicywgcHRpLCBjdGkpO1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtwcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twcGldLFxuICAgICAgICAgICAgICB0YWJzOiBwVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSAocHRpIDwgcFRhYnMubGVuZ3RoID8gcHRpIDogKHB0aSAtIDEpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbY3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbY3BpXSxcbiAgICAgICAgICAgICAgdGFiczogY1RhYnMubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gY3RpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BRERfVEFCOlxuICAgICAgaWYgKHN0YXRlLnBhbmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBzdGF0ZS5wYW5lbFNlcmlhbCxcbiAgICAgICAgICAgICAgdGFiczogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZvY3VzZWRQYW5lbDogMCxcbiAgICAgICAgICBwYW5lbFNlcmlhbDogc3RhdGUucGFuZWxTZXJpYWwgKyAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBpID0gc3RhdGUuZm9jdXNlZFBhbmVsO1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogW1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnMubWFwKHQgPT4ge1xuICAgICAgICAgICAgICAgIHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbJ3BhdGhTZWdtZW50J10sIGFjdGlvbi5tZXRhLnRhYiksXG4gICAgICAgICAgICAgICAgLy8gcGFuZWxJbmRleDogcGksXG4gICAgICAgICAgICAgICAgcGF0aDogWydhY3RpdmVQcm9qZWN0JywgYWN0aW9uLm1ldGEudGFiLnBhdGhTZWdtZW50LCBzdGF0ZS51aUlkU2VyaWFsLnRvU3RyaW5nKCldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB1aUlkU2VyaWFsOiAoc3RhdGUudWlJZFNlcmlhbCArIDEpXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQjpcbiAgICAgIHBpID0gYWN0aW9uLm1ldGEucGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICAvLyByZW1vdmUgdGhlIGNsb3NpbmcgdGFiXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0sXG4gICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXVxuICAgICAgICAgICAgICAuZmlsdGVyKCh0YWIsIGluZGV4KSA9PiBpbmRleCAhPT0gdGkpXG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBhY3RpdmF0ZSBhIHNpYmxpbmcgdGFiLCBpZiBuZWVkZWQgYW5kIHBvc3NpYmxlXG4gICAgICBpZiAoIXN0YXRlLnBhbmVsc1twaV0udGFicy5maW5kKHQgPT4gdC5hY3RpdmUpKSB7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXVxuICAgICAgICAgICAgICAgIC5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09ICh0aSA8IHN0YXRlLnBhbmVsc1twaV0udGFicy5sZW5ndGggPyB0aSA6ICh0aSAtIDEpKSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMOlxuICAgICAgcGkgPSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4O1xuICAgICAgY29uc3QgcGFuZWxzID0gWy4uLnN0YXRlLnBhbmVsc107XG4gICAgICBwYW5lbHMuc3BsaWNlKHBpLCAxKTtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzXG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuRk9DVVNfUEFORUw6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZvY3VzZWRQYW5lbDogYWN0aW9uLm1ldGEucGFuZWxJbmRleFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTDpcbiAgICAgIHBwaSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzUGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICBjcGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgIGNvbnN0IG1vdmVUYWIgPSBzdGF0ZS5wYW5lbHNbcHBpXS50YWJzW3RpXTtcbiAgICAgIC8vIHJlbW92ZXMgdGFiIGZyb20gb2xkIHBhbmVsXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcHBpXSxcbiAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcHBpXS50YWJzXVxuICAgICAgICAgICAgICAuZmlsdGVyKCh0YWIsIGluZGV4KSA9PiBpbmRleCAhPT0gdGkpXG4gICAgICAgICAgICAgIC5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHRhYi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgLy8gaW5zZXJ0IGEgbmV3IHBhbmVsIGF0IHBvc2l0aW9uIG9mIGNwaVxuICAgICAgY29uc3QgbmV3UGFuZWxzID0gWy4uLnN0YXRlLnBhbmVsc107XG4gICAgICBuZXdQYW5lbHMuc3BsaWNlKGNwaSwgMCwge1xuICAgICAgICBpZDogc3RhdGUucGFuZWxTZXJpYWwsXG4gICAgICAgIHRhYnM6IFttb3ZlVGFiXVxuICAgICAgfSlcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBuZXdQYW5lbHMsXG4gICAgICAgIC8vIGluY3JlYXNlIHBhbmVsIGlkIHNlcXVlbmNlXG4gICAgICAgIHBhbmVsU2VyaWFsOiBzdGF0ZS5wYW5lbFNlcmlhbCArIDFcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1JFRklOSU5HX0NIVU5LOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZWZpbmluZ0NodW5rOiBhY3Rpb24ucGF5bG9hZC5yZWZpbmluZ0NodW5rXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfQ1JFQVRJTkdfTUVOVElPTklORzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3JlYXRpbmdNZW50aW9uaW5nOiBhY3Rpb24ucGF5bG9hZC5jcmVhdGluZ01lbnRpb25pbmdcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEhpZ2hsaWdodGluZyBvZiBtZW50aW9uaW5ncyBpbiB0aGUgZ3VpXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEVYVDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0OiBhY3Rpb24ucGF5bG9hZC5tZW50aW9uaW5nc0ZvY3VzZWRJblRleHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEFCTEU6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lbnRpb25pbmdzRm9jdXNlZEluVGFibGU6IGFjdGlvbi5wYXlsb2FkLm1lbnRpb25pbmdzRm9jdXNlZEluVGFibGVcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIERlc3Ryb3kgdGhlIGFjdGl2ZSBwcm9qZWN0IHN0YXRlIChvbiBjbG9zaW5nIGEgcHJvamVjdClcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSBJTklUSUFMX1NUQVRFO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXX0=