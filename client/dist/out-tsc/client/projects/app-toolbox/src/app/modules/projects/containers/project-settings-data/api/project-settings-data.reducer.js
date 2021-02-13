import { ProjectSettingsDataAPIActions } from './project-settings-data.actions';
import { ProjectSettingsData } from './project-settings-data.models';
const INITIAL_STATE = new ProjectSettingsData();
export function projectSettingsDataReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        /*****************************************************
        * Set tab title
        *****************************************************/
        case ProjectSettingsDataAPIActions.SET_TAB_TITLE:
            state = Object.assign({}, state, { tabTitle: action.meta.tabTitle });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case ProjectSettingsDataAPIActions.DESTROY:
            return undefined;
    }
    return state;
}
;
//# sourceMappingURL=project-settings-data.reducer.js.map