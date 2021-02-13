import { Information } from '../models/entity-list.models';
import { InformationAPIActions } from '../actions/entity-list.actions';
const INITIAL_STATE = new Information();
export function informationReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case InformationAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;
//# sourceMappingURL=entity-list.reducer.js.map