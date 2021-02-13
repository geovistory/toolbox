import { TabLayoutAcitons } from './tab-layout.actions';
import { TabBase } from './tab-layout.models';
const INITIAL_STATE = new TabBase();
export function tabBaseReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        /*****************************************************
        * Set tab title
        *****************************************************/
        case TabLayoutAcitons.SET_TAB_TITLE:
            state = Object.assign({}, state, { tabTitle: action.meta.tabTitle });
            break;
        /*****************************************************
        * Set tab tooltip
        *****************************************************/
        case TabLayoutAcitons.SET_TAB_TOOLTIP:
            state = Object.assign({}, state, { tabTooltip: action.meta.tabTooltip });
            break;
        /*****************************************************
        * Set tab loading
        *****************************************************/
        case TabLayoutAcitons.SET_TAB_LOADING:
            state = Object.assign({}, state, { loading: action.meta.loading });
            break;
        /*****************************************************
        * Set show right panel
        *****************************************************/
        case TabLayoutAcitons.SET_LAYOUT_MODE:
            state = Object.assign({}, state, { layoutMode: action.meta.layoutMode });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case TabLayoutAcitons.DESTROY:
            state = undefined;
            break;
    }
    return state;
}
;
//# sourceMappingURL=tab-layout.reducer.js.map