import { indexBy, prop } from 'ramda';
import { AccountList } from './account-list.models';
import { AccountListAPIActions } from './account-list.actions';
const INITIAL_STATE = new AccountList();
export function accountListReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        case AccountListAPIActions.LOAD:
            state = Object.assign({}, state, { items: {} });
            break;
        case AccountListAPIActions.LOAD_SUCCEEDED:
            state = Object.assign({}, state, { items: indexBy(prop('id'), action.meta.itemsArray) });
            break;
        case AccountListAPIActions.LOAD_FAILED:
            state = Object.assign({}, state, { items: {} });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case AccountListAPIActions.DESTROY:
            state = undefined;
            break;
    }
    return state;
}
;
//# sourceMappingURL=account-list.reducer.js.map