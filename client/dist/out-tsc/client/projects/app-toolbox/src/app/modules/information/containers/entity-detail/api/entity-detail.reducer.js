import { EntityDetail } from 'projects/app-toolbox/src/app/core';
import { EntityDetailAPIActions } from './entity-detail.actions';
const INITIAL_STATE = new EntityDetail();
export function entityDetailReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        /*****************************************************
        * Reducers to manage entity editor
        *****************************************************/
        case EntityDetailAPIActions.INIT:
            state = Object.assign({}, state, action.meta.config);
            break;
        case EntityDetailAPIActions.DESTROY:
            state = {};
            break;
        // case EntityDetailAPIActions.SET_SHOW_RIGHT_AREA:
        //   state = {
        //     ...state,
        //     showRightArea: action.payload.showRightArea
        //   }
        //   break;
        case EntityDetailAPIActions.SET_RIGHT_PANEL_ACTIVE_TAB:
            state = Object.assign({}, state, { rightPanelActiveTab: action.payload.rightPanelActiveTab });
            break;
        case EntityDetailAPIActions.TOGGLE_BOOLEAN:
            state = Object.assign({}, state, { [action.meta.keyToToggle]: !state[action.meta.keyToToggle] });
            break;
    }
    return state;
}
;
//# sourceMappingURL=entity-detail.reducer.js.map