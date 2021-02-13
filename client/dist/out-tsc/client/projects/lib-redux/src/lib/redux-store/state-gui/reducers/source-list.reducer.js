import { SourceListAPIActions } from '../actions/source-list.actions';
import { SourceList } from '../models/source-list.models';
const INITIAL_STATE = new SourceList();
export function sourceListReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        case SourceListAPIActions.INITIALIZE_LIST:
            state = Object.assign({}, state, { list: {
                    pkAllowedClasses: action.meta.pkAllowedClasses
                } });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case SourceListAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;
//# sourceMappingURL=source-list.reducer.js.map