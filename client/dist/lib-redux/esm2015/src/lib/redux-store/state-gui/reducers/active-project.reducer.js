/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/active-project.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9hY3RpdmUtcHJvamVjdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0IsT0FBTyxFQUFFLG9CQUFvQixFQUF1QixNQUFNLCtDQUErQyxDQUFDOztNQUlwRyxhQUFhLEdBQWtCO0lBQ25DLEtBQUssRUFBRSxFQUFFO0lBQ1QsSUFBSSxFQUFFLEVBQUU7SUFDUixVQUFVLEVBQUUsQ0FBQztJQUNiLFdBQVcsRUFBRSxDQUFDO0lBQ2QsWUFBWSxFQUFFLENBQUM7SUFDZixNQUFNLEVBQUUsRUFBRTtDQUNYOztBQUNELE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0FBQUcsQ0FBQyxRQUF1QixhQUFhLEVBQUUsTUFBMkIsRUFBaUIsRUFBRTs7UUFDbkgsRUFBRTs7UUFBRSxFQUFFOztRQUFFLEdBQUc7O1FBQUUsR0FBRzs7UUFBRSxHQUFHOztRQUFFLEdBQUc7SUFDOUIsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25COzs2RkFFcUY7UUFDckYsS0FBSyxvQkFBb0IsQ0FBQyw2QkFBNkI7WUFDckQsS0FBSyxxQkFDQSxLQUFLLEVBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQzlCLENBQUM7WUFDRixNQUFNO1FBQ1IsS0FBSyxvQkFBb0IsQ0FBQyxtQkFBbUI7WUFDM0MsS0FBSyxxQkFDQSxLQUFLLElBQ1IsaUJBQWlCLEVBQUUsSUFBSSxHQUN4QixDQUFBO1lBQ0QsTUFBTTtRQUNSLEtBQUssb0JBQW9CLENBQUMsNkJBQTZCO1lBQ3JELEtBQUss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QWEsQ0FBQztZQUN0QixNQUFNO0tBQ1Q7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSwgdHJhbnNmZXJBcnJheUl0ZW0gfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IG9taXQgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0QWN0aW9ucywgQWN0aXZlUHJvamVjdEFjdGlvbiB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2FjdGl2ZS1wcm9qZWN0LmFjdGlvbic7XG5pbXBvcnQgeyBQcm9qZWN0RGV0YWlsIH0gZnJvbSAnLi4vbW9kZWxzL2FjdGl2ZS1wcm9qZWN0Lm1vZGVscyc7XG5cblxuY29uc3QgSU5JVElBTF9TVEFURTogUHJvamVjdERldGFpbCA9IHtcbiAgbGFiZWw6ICcnLFxuICBsaXN0OiAnJyxcbiAgdWlJZFNlcmlhbDogMCxcbiAgcGFuZWxTZXJpYWw6IDAsXG4gIGZvY3VzZWRQYW5lbDogMCxcbiAgcGFuZWxzOiBbXVxufTtcbmV4cG9ydCBjb25zdCBhY3RpdmVQcm9qZWN0UmVkdWNlciA9IChzdGF0ZTogUHJvamVjdERldGFpbCA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbik6IFByb2plY3REZXRhaWwgPT4ge1xuICBsZXQgcGksIHRpLCBwcGksIGNwaSwgcHRpLCBjdGk7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogTG9hZCBwcm9qZWN0IGRhdGEgKG1ldGFkYXRhLCBjcm0pXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQ6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC4uLmFjdGlvbi5tZXRhLnByb2plY3RQcmV2aWV3XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2FkaW5nQ29uZmlnRGF0YTogdHJ1ZVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHX1NVQ0NFRURFRDpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLy8gY3JtOiBhY3Rpb24ucGF5bG9hZC5jcm0sXG4gICAgICAgIGNvbmZpZ0RhdGFJbml0aWFsaXplZDogdHJ1ZSxcbiAgICAgICAgbG9hZGluZ0NvbmZpZ0RhdGE6IGZhbHNlXG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBMYXlvdXQgLS0gVGFic1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9QQU5FTFM6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogYWN0aW9uLm1ldGEucGFuZWxzLFxuICAgICAgICB1aUlkU2VyaWFsOiBhY3Rpb24ubWV0YS51aUlkU2VyaWFsLFxuICAgICAgICBwYW5lbFNlcmlhbDogYWN0aW9uLm1ldGEucGFuZWxTZXJpYWwsXG4gICAgICAgIGZvY3VzZWRQYW5lbDogYWN0aW9uLm1ldGEuZm9jdXNlZFBhbmVsXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9MSVNUX1RZUEU6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxpc3Q6IGFjdGlvbi5tZXRhLmxpc3RcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuQUNUSVZBVEVfVEFCOlxuICAgICAgcGkgPSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4O1xuICAgICAgdGkgPSBhY3Rpb24ubWV0YS50YWJJbmRleDtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgIHRhYnM6IFsuLi5zdGF0ZS5wYW5lbHNbcGldLnRhYnNdLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSB0aSk7XG4gICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUI6XG4gICAgICBwcGkgPSBhY3Rpb24ubWV0YS5wcmV2aW91c1BhbmVsSW5kZXg7XG4gICAgICBjcGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgIHB0aSA9IGFjdGlvbi5tZXRhLnByZXZpb3VzVGFiSW5kZXg7XG4gICAgICBjdGkgPSBhY3Rpb24ubWV0YS5jdXJyZW50VGFiSW5kZXg7XG5cbiAgICAgIGlmIChwcGkgPT09IGNwaSkge1xuICAgICAgICBjb25zdCB0YWJzID0gWy4uLnN0YXRlLnBhbmVsc1tjcGldLnRhYnNdO1xuICAgICAgICBtb3ZlSXRlbUluQXJyYXkodGFicywgcHRpLCBjdGkpO1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtjcGldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhbmVsc1tjcGldLFxuICAgICAgICAgICAgICB0YWJzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcFRhYnMgPSBbLi4uc3RhdGUucGFuZWxzW3BwaV0udGFic107XG4gICAgICAgIGNvbnN0IGNUYWJzID0gWy4uLnN0YXRlLnBhbmVsc1tjcGldLnRhYnNdO1xuICAgICAgICB0cmFuc2ZlckFycmF5SXRlbShwVGFicywgY1RhYnMsIHB0aSwgY3RpKTtcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgICBbcHBpXToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcHBpXSxcbiAgICAgICAgICAgICAgdGFiczogcFRhYnMubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmFjdGl2ZSA9IChpbmRleCA9PT0gKHB0aSA8IHBUYWJzLmxlbmd0aCA/IHB0aSA6IChwdGkgLSAxKSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWI7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW2NwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW2NwaV0sXG4gICAgICAgICAgICAgIHRhYnM6IGNUYWJzLm1hcCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhYi5hY3RpdmUgPSAoaW5kZXggPT09IGN0aSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuQUREX1RBQjpcbiAgICAgIGlmIChzdGF0ZS5wYW5lbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhbmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogc3RhdGUucGFuZWxTZXJpYWwsXG4gICAgICAgICAgICAgIHRhYnM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBmb2N1c2VkUGFuZWw6IDAsXG4gICAgICAgICAgcGFuZWxTZXJpYWw6IHN0YXRlLnBhbmVsU2VyaWFsICsgMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwaSA9IHN0YXRlLmZvY3VzZWRQYW5lbDtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFuZWxzOiBPYmplY3QuYXNzaWduKFsuLi5zdGF0ZS5wYW5lbHNdLCB7XG4gICAgICAgICAgW3BpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgIHRhYnM6IFtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXS50YWJzLm1hcCh0ID0+IHtcbiAgICAgICAgICAgICAgICB0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoWydwYXRoU2VnbWVudCddLCBhY3Rpb24ubWV0YS50YWIpLFxuICAgICAgICAgICAgICAgIC8vIHBhbmVsSW5kZXg6IHBpLFxuICAgICAgICAgICAgICAgIHBhdGg6IFsnYWN0aXZlUHJvamVjdCcsIGFjdGlvbi5tZXRhLnRhYi5wYXRoU2VnbWVudCwgc3RhdGUudWlJZFNlcmlhbC50b1N0cmluZygpXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgdWlJZFNlcmlhbDogKHN0YXRlLnVpSWRTZXJpYWwgKyAxKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9UQUI6XG4gICAgICBwaSA9IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgLy8gcmVtb3ZlIHRoZSBjbG9zaW5nIHRhYlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcGldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5wYW5lbHNbcGldLFxuICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic11cbiAgICAgICAgICAgICAgLmZpbHRlcigodGFiLCBpbmRleCkgPT4gaW5kZXggIT09IHRpKVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgLy8gYWN0aXZhdGUgYSBzaWJsaW5nIHRhYiwgaWYgbmVlZGVkIGFuZCBwb3NzaWJsZVxuICAgICAgaWYgKCFzdGF0ZS5wYW5lbHNbcGldLnRhYnMuZmluZCh0ID0+IHQuYWN0aXZlKSkge1xuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICAgIFtwaV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BpXSxcbiAgICAgICAgICAgICAgdGFiczogWy4uLnN0YXRlLnBhbmVsc1twaV0udGFic11cbiAgICAgICAgICAgICAgICAubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICB0YWIuYWN0aXZlID0gKGluZGV4ID09PSAodGkgPCBzdGF0ZS5wYW5lbHNbcGldLnRhYnMubGVuZ3RoID8gdGkgOiAodGkgLSAxKSkpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9QQU5FTDpcbiAgICAgIHBpID0gYWN0aW9uLm1ldGEucGFuZWxJbmRleDtcbiAgICAgIGNvbnN0IHBhbmVscyA9IFsuLi5zdGF0ZS5wYW5lbHNdO1xuICAgICAgcGFuZWxzLnNwbGljZShwaSwgMSk7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsc1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLkZPQ1VTX1BBTkVMOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBmb2N1c2VkUGFuZWw6IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXhcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUw6XG4gICAgICBwcGkgPSBhY3Rpb24ubWV0YS5wcmV2aW91c1BhbmVsSW5kZXg7XG4gICAgICB0aSA9IGFjdGlvbi5tZXRhLnRhYkluZGV4O1xuICAgICAgY3BpID0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXg7XG4gICAgICBjb25zdCBtb3ZlVGFiID0gc3RhdGUucGFuZWxzW3BwaV0udGFic1t0aV07XG4gICAgICAvLyByZW1vdmVzIHRhYiBmcm9tIG9sZCBwYW5lbFxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwYW5lbHM6IE9iamVjdC5hc3NpZ24oWy4uLnN0YXRlLnBhbmVsc10sIHtcbiAgICAgICAgICBbcHBpXToge1xuICAgICAgICAgICAgLi4uc3RhdGUucGFuZWxzW3BwaV0sXG4gICAgICAgICAgICB0YWJzOiBbLi4uc3RhdGUucGFuZWxzW3BwaV0udGFic11cbiAgICAgICAgICAgICAgLmZpbHRlcigodGFiLCBpbmRleCkgPT4gaW5kZXggIT09IHRpKVxuICAgICAgICAgICAgICAubWFwKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB0YWIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFiO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8vIGluc2VydCBhIG5ldyBwYW5lbCBhdCBwb3NpdGlvbiBvZiBjcGlcbiAgICAgIGNvbnN0IG5ld1BhbmVscyA9IFsuLi5zdGF0ZS5wYW5lbHNdO1xuICAgICAgbmV3UGFuZWxzLnNwbGljZShjcGksIDAsIHtcbiAgICAgICAgaWQ6IHN0YXRlLnBhbmVsU2VyaWFsLFxuICAgICAgICB0YWJzOiBbbW92ZVRhYl1cbiAgICAgIH0pXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHBhbmVsczogbmV3UGFuZWxzLFxuICAgICAgICAvLyBpbmNyZWFzZSBwYW5lbCBpZCBzZXF1ZW5jZVxuICAgICAgICBwYW5lbFNlcmlhbDogc3RhdGUucGFuZWxTZXJpYWwgKyAxXG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG5cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9SRUZJTklOR19DSFVOSzpcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcmVmaW5pbmdDaHVuazogYWN0aW9uLnBheWxvYWQucmVmaW5pbmdDaHVua1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuU0VUX0NSRUFUSU5HX01FTlRJT05JTkc6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGNyZWF0aW5nTWVudGlvbmluZzogYWN0aW9uLnBheWxvYWQuY3JlYXRpbmdNZW50aW9uaW5nXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBIaWdobGlnaHRpbmcgb2YgbWVudGlvbmluZ3MgaW4gdGhlIGd1aVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RFWFQ6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1lbnRpb25pbmdzRm9jdXNlZEluVGV4dDogYWN0aW9uLnBheWxvYWQubWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNFVF9NRU5USU9OSU5HU19GT0NVU0VEX0lOX1RBQkxFOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBtZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlOiBhY3Rpb24ucGF5bG9hZC5tZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBEZXN0cm95IHRoZSBhY3RpdmUgcHJvamVjdCBzdGF0ZSAob24gY2xvc2luZyBhIHByb2plY3QpXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgQWN0aXZlUHJvamVjdEFjdGlvbnMuREVTVFJPWTpcbiAgICAgIHN0YXRlID0gSU5JVElBTF9TVEFURTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl19