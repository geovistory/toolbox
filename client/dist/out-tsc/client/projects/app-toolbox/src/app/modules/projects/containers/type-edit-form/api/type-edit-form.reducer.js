import { TypeEditForm } from './type-edit-form.models';
import { TypeEditFormAPIActions } from './type-edit-form.actions';
const INITIAL_STATE = new TypeEditForm();
export function typeEditFormReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        case TypeEditFormAPIActions.LOAD_STARTED:
            state = Object.assign({}, state);
            break;
        case TypeEditFormAPIActions.LOAD_SUCCEEDED:
            state = Object.assign({}, state);
            break;
        case TypeEditFormAPIActions.LOAD_FAILED:
            state = Object.assign({}, state);
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case TypeEditFormAPIActions.DESTROY:
            state = undefined;
            break;
    }
    return state;
}
;
//# sourceMappingURL=type-edit-form.reducer.js.map