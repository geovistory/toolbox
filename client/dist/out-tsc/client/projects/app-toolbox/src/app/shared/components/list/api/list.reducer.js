import { List } from './list.models';
import { ListAPIActions } from './list.actions';
const INITIAL_STATE = new List();
export function listReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        /*****************************************************
        * Reducers to manage searching of entities
        *****************************************************/
        case ListAPIActions.SEARCH_STARTED:
            state = Object.assign({}, state, { items: [], loading: true });
            break;
        case ListAPIActions.SEARCH_SUCCEEDED:
            state = Object.assign({}, state, { items: action.meta.searchResponse.data, collectionSize: action.meta.searchResponse.totalCount, loading: false });
            break;
        case ListAPIActions.SEARCH_FAILED:
            state = Object.assign({}, state, { items: [], loading: false });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case ListAPIActions.DESTROY:
            state = undefined;
            break;
    }
    return state;
}
;
//# sourceMappingURL=list.reducer.js.map