import { Types } from './types.models';
import { TypesAPIActions } from './types.actions';
const INITIAL_STATE = new Types();
export function typesReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        // case TypesAPIActions.LOAD:
        //   state = {
        //     ...state,
        //     items: {}
        //   };
        //   break;
        // case TypesAPIActions.LOAD_SUCCEEDED:
        //   state = {
        //     ...state,
        //     items: indexBy(i => i.pk_entity.toString(), action.meta.types)
        //   };
        //   break;
        // case TypesAPIActions.LOAD_FAILED:
        //   state = {
        //     ...state,
        //     items: {},
        //   };
        //   break;
        // /*****************************************************
        //   * Reducers to manage the add form
        //   *****************************************************/
        // case TypesAPIActions.OPEN_ADD_FORM:
        //   state = {
        //     ...state,
        //     add: action.meta.create
        //   };
        //   break;
        // case TypesAPIActions.CLOSE_ADD_FORM:
        //   state = {
        //     ...state,
        //     add: undefined
        //   };
        //   break;
        // // case TypesAPIActions.CREATE_STARTED:
        // //   state = {
        // //     ...state,
        // //     add: undefined,
        // //     loading: true
        // //   };
        // //   break;
        // case TypesAPIActions.CREATE_SUCCEEDED:
        //   state = {
        //     ...state,
        //     loading: false,
        //     add: undefined,
        //     items: {
        //       ...state.items,
        //       [action.meta.type.pk_entity]: action.meta.type
        //     }
        //   };
        //   break;
        // // case TypesAPIActions.CREATE_FAILED:
        // //   state = {
        // //     ...state,
        // //     loading: false,
        // //     error: action.error
        // //   };
        // //   break;
        // /*****************************************************
        // * Reducers to manage the edit form
        // *****************************************************/
        // case TypesAPIActions.OPEN_EDIT_FORM:
        //   state = {
        //     ...state,
        //     edit: true
        //   };
        //   break;
        // case TypesAPIActions.OPEN_EDIT_FORM_SUCCEEDED:
        //   state = {
        //     ...state,
        //     edit: {
        //       peItDetail: action.meta.peItDetail
        //     },
        //   };
        //   break;
        // case TypesAPIActions.CLOSE_EDIT_FORM:
        //   state = {
        //     ...state,
        //     edit: false
        //   };
        //   break;
        // case TypesAPIActions.CREATE_STARTED:
        //   state = {
        //     ...state,
        //     add: undefined,
        //     loading: true
        //   };
        //   break;
        // case TypesAPIActions.CREATE_SUCCEEDED:
        //   state = {
        //     ...state,
        //     loading: false,
        //     items: {
        //       ...state.items,
        //       [action.meta.type.pk_entity]: action.meta.type
        //     }
        //   };
        //   break;
        // case TypesAPIActions.CREATE_FAILED:
        //   state = {
        //     ...state,
        //     loading: false,
        //     error: action.error
        //   };
        //   break;
        /*********************************************************************
        *  Set the tab title
        *********************************************************************/
        case TypesAPIActions.SET_TAB_TITLE:
            state = Object.assign({}, state, { tabTitle: action.meta.tabTitle });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case TypesAPIActions.DESTROY:
            return undefined;
    }
    return state;
}
;
//# sourceMappingURL=types.reducer.js.map