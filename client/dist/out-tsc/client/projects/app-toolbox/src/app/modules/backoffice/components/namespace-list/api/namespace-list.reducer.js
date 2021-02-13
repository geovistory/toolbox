import { NamespaceList } from './namespace-list.models';
import { NamespaceListAPIActions } from './namespace-list.actions';
const INITIAL_STATE = new NamespaceList();
export function namespaceListReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        case NamespaceListAPIActions.LOAD_STARTED:
            return Object.assign({}, state, { namespaces: [] });
        case NamespaceListAPIActions.LOAD_SUCCEEDED:
            return Object.assign({}, state, { namespaces: action.payload.namespaces });
        case NamespaceListAPIActions.LOAD_FAILED:
            return Object.assign({}, state, { namespaces: [] });
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case NamespaceListAPIActions.DESTROY:
            return undefined;
    }
    return state;
}
;
//# sourceMappingURL=namespace-list.reducer.js.map