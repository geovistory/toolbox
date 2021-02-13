import { SystemTypeList } from './system-type-list.models';
import { SystemTypeListAPIActions } from './system-type-list.actions';
const INITIAL_STATE = new SystemTypeList();
export function systemtypeListReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        case SystemTypeListAPIActions.LOAD_STARTED:
            return Object.assign({}, state, { systemtypes: [] });
        case SystemTypeListAPIActions.LOAD_SUCCEEDED:
            return Object.assign({}, state, { systemtypes: action.payload.systemtypes });
        case SystemTypeListAPIActions.LOAD_FAILED:
            return Object.assign({}, state, { systemtypes: [] });
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case SystemTypeListAPIActions.DESTROY:
            return undefined;
    }
    return state;
}
;
//# sourceMappingURL=system-type-list.reducer.js.map