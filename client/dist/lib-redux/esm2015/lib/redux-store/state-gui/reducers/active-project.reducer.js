/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/active-project.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { omit } from 'ramda';
import { ActiveProjectActions } from '../../state-gui/actions/active-project.action';
/** @type {?} */
const INITIAL_STATE = {
    label: '',
    list: '',
    uiIdSerial: 0,
    panelSerial: 0,
    focusedPanel: 0,
    panels: []
};
/** @type {?} */
export const activeProjectReducer = (/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
(state = INITIAL_STATE, action) => {
    /** @type {?} */
    let pi;
    /** @type {?} */
    let ti;
    /** @type {?} */
    let ppi;
    /** @type {?} */
    let cpi;
    /** @type {?} */
    let pti;
    /** @type {?} */
    let cti;
    switch (action.type) {
        /************************************************************************************
         * Load project data (metadata, crm)
        ************************************************************************************/
        case ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED:
            state = Object.assign({}, state, action.meta.projectPreview);
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG:
            state = Object.assign({}, state, { loadingConfigData: true });
            break;
        case ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED:
            state = Object.assign({}, state, { configDataInitialized: true, loadingConfigData: false });
            break;
        /************************************************************************************
         * Layout -- Tabs
        ************************************************************************************/
        case ActiveProjectActions.SET_PANELS:
            state = Object.assign({}, state, { panels: action.meta.panels, uiIdSerial: action.meta.uiIdSerial, panelSerial: action.meta.panelSerial, focusedPanel: action.meta.focusedPanel });
            break;
        case ActiveProjectActions.SET_LIST_TYPE:
            state = Object.assign({}, state, { list: action.meta.list });
            break;
        case ActiveProjectActions.ACTIVATE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [pi]: Object.assign({}, state.panels[pi], { tabs: [...state.panels[pi].tabs].map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => {
                            tab.active = (index === ti);
                            return tab;
                        })) })
                }) });
            break;
        case ActiveProjectActions.MOVE_TAB:
            ppi = action.meta.previousPanelIndex;
            cpi = action.meta.currentPanelIndex;
            pti = action.meta.previousTabIndex;
            cti = action.meta.currentTabIndex;
            if (ppi === cpi) {
                /** @type {?} */
                const tabs = [...state.panels[cpi].tabs];
                moveItemInArray(tabs, pti, cti);
                state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                        [cpi]: Object.assign({}, state.panels[cpi], { tabs })
                    }) });
            }
            else {
                /** @type {?} */
                const pTabs = [...state.panels[ppi].tabs];
                /** @type {?} */
                const cTabs = [...state.panels[cpi].tabs];
                transferArrayItem(pTabs, cTabs, pti, cti);
                state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                        [ppi]: Object.assign({}, state.panels[ppi], { tabs: pTabs.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            (tab, index) => {
                                tab.active = (index === (pti < pTabs.length ? pti : (pti - 1)));
                                return tab;
                            })) }),
                        [cpi]: Object.assign({}, state.panels[cpi], { tabs: cTabs.map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            (tab, index) => {
                                tab.active = (index === cti);
                                return tab;
                            })) })
                    }) });
            }
            break;
        case ActiveProjectActions.ADD_TAB:
            if (state.panels.length === 0) {
                state = Object.assign({}, state, { panels: [
                        {
                            id: state.panelSerial,
                            tabs: []
                        }
                    ], focusedPanel: 0, panelSerial: state.panelSerial + 1 });
            }
            pi = state.focusedPanel;
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [pi]: Object.assign({}, state.panels[pi], { tabs: [
                            ...state.panels[pi].tabs.map((/**
                             * @param {?} t
                             * @return {?}
                             */
                            t => {
                                t.active = false;
                                return t;
                            })),
                            Object.assign({}, omit(['pathSegment'], action.meta.tab), { path: ['activeProject', action.meta.tab.pathSegment, state.uiIdSerial.toString()] })
                        ] })
                }), uiIdSerial: (state.uiIdSerial + 1) });
            break;
        case ActiveProjectActions.CLOSE_TAB:
            pi = action.meta.panelIndex;
            ti = action.meta.tabIndex;
            // remove the closing tab
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [pi]: Object.assign({}, state.panels[pi], { tabs: [...state.panels[pi].tabs]
                            .filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => index !== ti)) })
                }) });
            // activate a sibling tab, if needed and possible
            if (!state.panels[pi].tabs.find((/**
             * @param {?} t
             * @return {?}
             */
            t => t.active))) {
                state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                        [pi]: Object.assign({}, state.panels[pi], { tabs: [...state.panels[pi].tabs]
                                .map((/**
                             * @param {?} tab
                             * @param {?} index
                             * @return {?}
                             */
                            (tab, index) => {
                                tab.active = (index === (ti < state.panels[pi].tabs.length ? ti : (ti - 1)));
                                return tab;
                            })) })
                    }) });
            }
            break;
        case ActiveProjectActions.CLOSE_PANEL:
            pi = action.meta.panelIndex;
            /** @type {?} */
            const panels = [...state.panels];
            panels.splice(pi, 1);
            state = Object.assign({}, state, { panels });
            break;
        case ActiveProjectActions.FOCUS_PANEL:
            state = Object.assign({}, state, { focusedPanel: action.meta.panelIndex });
            break;
        case ActiveProjectActions.SPLIT_PANEL:
            ppi = action.meta.previousPanelIndex;
            ti = action.meta.tabIndex;
            cpi = action.meta.currentPanelIndex;
            /** @type {?} */
            const moveTab = state.panels[ppi].tabs[ti];
            // removes tab from old panel
            state = Object.assign({}, state, { panels: Object.assign([...state.panels], {
                    [ppi]: Object.assign({}, state.panels[ppi], { tabs: [...state.panels[ppi].tabs]
                            .filter((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => index !== ti))
                            .map((/**
                         * @param {?} tab
                         * @param {?} index
                         * @return {?}
                         */
                        (tab, index) => {
                            if (index === 0)
                                tab.active = true;
                            return tab;
                        })) })
                }) });
            // insert a new panel at position of cpi
            /** @type {?} */
            const newPanels = [...state.panels];
            newPanels.splice(cpi, 0, {
                id: state.panelSerial,
                tabs: [moveTab]
            });
            state = Object.assign({}, state, { panels: newPanels, panelSerial: state.panelSerial + 1 });
            break;
        case ActiveProjectActions.SET_REFINING_CHUNK:
            state = Object.assign({}, state, { refiningChunk: action.payload.refiningChunk });
            break;
        case ActiveProjectActions.SET_CREATING_MENTIONING:
            state = Object.assign({}, state, { creatingMentioning: action.payload.creatingMentioning });
            break;
        /************************************************************************************
        * Highlighting of mentionings in the gui
        ************************************************************************************/
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT:
            state = Object.assign({}, state, { mentioningsFocusedInText: action.payload.mentioningsFocusedInText });
            break;
        case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE:
            state = Object.assign({}, state, { mentioningsFocusedInTable: action.payload.mentioningsFocusedInTable });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2FjdGl2ZS1wcm9qZWN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM3QixPQUFPLEVBQUUsb0JBQW9CLEVBQXVCLE1BQU0sK0NBQStDLENBQUM7O01BSXBHLGFBQWEsR0FBa0I7SUFDbkMsS0FBSyxFQUFFLEVBQUU7SUFDVCxJQUFJLEVBQUUsRUFBRTtJQUNSLFVBQVUsRUFBRSxDQUFDO0lBQ2IsV0FBVyxFQUFFLENBQUM7SUFDZCxZQUFZLEVBQUUsQ0FBQztJQUNmLE1BQU0sRUFBRSxFQUFFO0NBQ1g7O0FBQ0QsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7QUFBRyxDQUFDLFFBQXVCLGFBQWEsRUFBRSxNQUEyQixFQUFpQixFQUFFOztRQUNuSCxFQUFFOztRQUFFLEVBQUU7O1FBQUUsR0FBRzs7UUFBRSxHQUFHOztRQUFFLEdBQUc7O1FBQUUsR0FBRztJQUM5QixRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkI7OzZGQUVxRjtRQUNyRixLQUFLLG9CQUFvQixDQUFDLDZCQUE2QjtZQUNyRCxLQUFLLHFCQUNBLEtBQUssRUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FDOUIsQ0FBQztZQUNGLE1BQU07UUFDUixLQUFLLG9CQUFvQixDQUFDLG1CQUFtQjtZQUMzQyxLQUFLLHFCQUNBLEtBQUssSUFDUixpQkFBaUIsRUFBRSxJQUFJLEdBQ3hCLENBQUE7WUFDRCxNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyw2QkFBNkI7WUFDckQsS0FBSyxxQkFD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QUFDO1lBQ3RCLE1BQU07S0FDVDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW92ZUl0ZW1JbkFycmF5LCB0cmFuc2ZlckFycmF5SXRlbSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb25zLCBBY3RpdmVQcm9qZWN0QWN0aW9uIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uJztcbmltcG9ydCB7IFByb2plY3REZXRhaWwgfSBmcm9tICcuLi9tb2RlbHMvYWN0aXZlLXByb2plY3QubW9kZWxzJztcblxuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBQcm9qZWN0RGV0YWlsID0ge1xuICBsYWJlbDogJycsXG4gIGxpc3Q6ICcnLFxuICB1aUlkU2VyaWFsOiAwLFxuICBwYW5lbFNlcmlhbDogMCxcbiAgZm9jdXNlZFBhbmVsOiAwLFxuICBwYW5lbHM6IFtdXG59O1xuZXhwb3J0IGNvbnN0IGFjdGl2ZVByb2plY3RSZWR1Y2VyID0gKHN0YXRlOiBQcm9qZWN0RGV0YWlsID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKTogUHJvamVjdERldGFpbCA9PiB7XG4gIGxldCBwaSwgdGksIHBwaSwgY3BpLCBwdGksIGN0aTtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBMb2FkIHByb2plY3QgZGF0YSAobWV0YWRhdGEsIGNybSlcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLi4uYWN0aW9uLm1ldGEucHJvamVjdFByZXZpZXdcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUc6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvYWRpbmdDb25maWdEYXRhOiB0cnVlXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUdfU1VDQ0VFREVEOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAvLyBjcm06IGFjdGlvbi5wYXlsb2FkLmNybSxcbiAgICAgICAgY29uZmlnRGF0YUluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICBsb2FkaW5nQ29uZmlnRGF0YTogZmFsc2VcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIExheW91dCAtLSBUYWJzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1BBTkVMUzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBhY3Rpb24ubWV0YS5wYW5lbHMsXG4gICAgICAgIHVpSWRTZXJpYWw6IGFjdGlvbi5tZXRhLnVpSWRTZXJpYWwsXG4gICAgICAgIHBhbmVsU2VyaWFsOiBhY3Rpb24ubWV0YS5wYW5lbFNlcmlhbCxcbiAgICAgICAgZm9jdXNlZFBhbmVsOiBhY3Rpb24ubWV0YS5mb2N1c2VkUGFuZWxcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0xJU1RfVFlQRTpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbGlzdDogYWN0aW9uLm1ldGEubGlzdFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUI6XG4gICAgICBwaSA9IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic10ubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09IHRpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQjpcbiAgICAgIHBwaSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzUGFuZWxJbmRleDtcbiAgICAgIGNwaSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgcHRpID0gYWN0aW9uLm1ldGEucHJldmlvdXNUYWJJbmRleDtcbiAgICAgIGN0aSA9IGFjdGlvbi5tZXRhLmN1cnJlbnRUYWJJbmRleDtcblxuICAgICAgaWYgKHBwaSA9PT0gY3BpKSB7XG4gICAgICAgIGNvbnN0IHRhYnMgPSBbLi4uc3RhdGUucGFuZWxzW2NwaV0udGFic107XG4gICAgICAgIG1vdmVJdGVtSW5BcnJheSh0YWJzLCBwdGksIGN0aSk7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW2NwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW2NwaV0sXG4gICAgICAgICAgICAgIHRhYnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwVGFicyA9IFsuLi5zdGF0ZS5wYW5lbHNbcHBpXS50YWJzXTtcbiAgICAgICAgY29uc3QgY1RhYnMgPSBbLi4uc3RhdGUucGFuZWxzW2NwaV0udGFic107XG4gICAgICAgIHRyYW5zZmVyQXJyYXlJdGVtKHBUYWJzLCBjVGFicywgcHRpLCBjdGkpO1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtwcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twcGldLFxuICAgICAgICAgICAgICB0YWJzOiBwVGFicy5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSAocHRpIDwgcFRhYnMubGVuZ3RoID8gcHRpIDogKHB0aSAtIDEpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbY3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbY3BpXSxcbiAgICAgICAgICAgICAgdGFiczogY1RhYnMubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gY3RpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5BRERfVEFCOlxuICAgICAgaWYgKHN0YXRlLnBhbmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBzdGF0ZS5wYW5lbFNlcmlhbCxcbiAgICAgICAgICAgICAgdGFiczogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGZvY3VzZWRQYW5lbDogMCxcbiAgICAgICAgICBwYW5lbFNlcmlhbDogc3RhdGUucGFuZWxTZXJpYWwgKyAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBpID0gc3RhdGUuZm9jdXNlZFBhbmVsO1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogW1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnMubWFwKHQgPT4ge1xuICAgICAgICAgICAgICAgIHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbJ3BhdGhTZWdtZW50J10sIGFjdGlvbi5tZXRhLnRhYiksXG4gICAgICAgICAgICAgICAgLy8gcGFuZWxJbmRleDogcGksXG4gICAgICAgICAgICAgICAgcGF0aDogWydhY3RpdmVQcm9qZWN0JywgYWN0aW9uLm1ldGEudGFiLnBhdGhTZWdtZW50LCBzdGF0ZS51aUlkU2VyaWFsLnRvU3RyaW5nKCldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB1aUlkU2VyaWFsOiAoc3RhdGUudWlJZFNlcmlhbCArIDEpXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQjpcbiAgICAgIHBpID0gYWN0aW9uLm1ldGEucGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICAvLyByZW1vdmUgdGhlIGNsb3NpbmcgdGFiXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1twaV0sXG4gICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXVxuICAgICAgICAgICAgICAuZmlsdGVyKCh0YWIsIGluZGV4KSA9PiBpbmRleCAhPT0gdGkpXG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBhY3RpdmF0ZSBhIHNpYmxpbmcgdGFiLCBpZiBuZWVkZWQgYW5kIHBvc3NpYmxlXG4gICAgICBpZiAoIXN0YXRlLnBhbmVsc1twaV0udGFicy5maW5kKHQgPT4gdC5hY3RpdmUpKSB7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzXVxuICAgICAgICAgICAgICAgIC5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09ICh0aSA8IHN0YXRlLnBhbmVsc1twaV0udGFicy5sZW5ndGggPyB0aSA6ICh0aSAtIDEpKSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMOlxuICAgICAgcGkgPSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4O1xuICAgICAgY29uc3QgcGFuZWxzID0gWy4uLnN0YXRlLnBhbmVsc107XG4gICAgICBwYW5lbHMuc3BsaWNlKHBpLCAxKTtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzXG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuRk9DVVNfUEFORUw6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZvY3VzZWRQYW5lbDogYWN0aW9uLm1ldGEucGFuZWxJbmRleFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTDpcbiAgICAgIHBwaSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzUGFuZWxJbmRleDtcbiAgICAgIHRpID0gYWN0aW9uLm1ldGEudGFiSW5kZXg7XG4gICAgICBjcGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgIGNvbnN0IG1vdmVUYWIgPSBzdGF0ZS5wYW5lbHNbcHBpXS50YWJzW3RpXTtcbiAgICAgIC8vIHJlbW92ZXMgdGFiIGZyb20gb2xkIHBhbmVsXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogT2JqZWN0LmFzc2lnbihbLi4uc3RhdGUucGFuZWxzXSwge1xuICAgICAgICAgIFtwcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcHBpXSxcbiAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcHBpXS50YWJzXVxuICAgICAgICAgICAgICAuZmlsdGVyKCh0YWIsIGluZGV4KSA9PiBpbmRleCAhPT0gdGkpXG4gICAgICAgICAgICAgIC5tYXAoKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHRhYi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgLy8gaW5zZXJ0IGEgbmV3IHBhbmVsIGF0IHBvc2l0aW9uIG9mIGNwaVxuICAgICAgY29uc3QgbmV3UGFuZWxzID0gWy4uLnN0YXRlLnBhbmVsc107XG4gICAgICBuZXdQYW5lbHMuc3BsaWNlKGNwaSwgMCwge1xuICAgICAgICBpZDogc3RhdGUucGFuZWxTZXJpYWwsXG4gICAgICAgIHRhYnM6IFttb3ZlVGFiXVxuICAgICAgfSlcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBuZXdQYW5lbHMsXG4gICAgICAgIC8vIGluY3JlYXNlIHBhbmVsIGlkIHNlcXVlbmNlXG4gICAgICAgIHBhbmVsU2VyaWFsOiBzdGF0ZS5wYW5lbFNlcmlhbCArIDFcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX1JFRklOSU5HX0NIVU5LOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZWZpbmluZ0NodW5rOiBhY3Rpb24ucGF5bG9hZC5yZWZpbmluZ0NodW5rXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TRVRfQ1JFQVRJTkdfTUVOVElPTklORzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3JlYXRpbmdNZW50aW9uaW5nOiBhY3Rpb24ucGF5bG9hZC5jcmVhdGluZ01lbnRpb25pbmdcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEhpZ2hsaWdodGluZyBvZiBtZW50aW9uaW5ncyBpbiB0aGUgZ3VpXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEVYVDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0OiBhY3Rpb24ucGF5bG9hZC5tZW50aW9uaW5nc0ZvY3VzZWRJblRleHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX01FTlRJT05JTkdTX0ZPQ1VTRURfSU5fVEFCTEU6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lbnRpb25pbmdzRm9jdXNlZEluVGFibGU6IGFjdGlvbi5wYXlsb2FkLm1lbnRpb25pbmdzRm9jdXNlZEluVGFibGVcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIERlc3Ryb3kgdGhlIGFjdGl2ZSBwcm9qZWN0IHN0YXRlIChvbiBjbG9zaW5nIGEgcHJvamVjdClcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSBJTklUSUFMX1NUQVRFO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXX0=