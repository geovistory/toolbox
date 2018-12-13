import { indexBy, prop, omit } from 'ramda';
import { Action } from 'redux';
import { Information } from './information.models';
import { InformationAPIAction, InformationAPIActions } from './information.actions';

const INITIAL_STATE = new Information();

export function informationReducer(state: Information = INITIAL_STATE, a: Action): Information {

  const action = a as InformationAPIAction;

  switch (action.type) {

    /*****************************************************
    * Reducers to manage the list
    *****************************************************/
    case InformationAPIActions.INITIALIZE_LIST:
      state = {
        ...state,
        items: {
          pkAllowedClasses: action.meta.pkClasses
        }
      };
      break;

    /*****************************************************
    * Reducers to manage entity editor
    *****************************************************/
    case InformationAPIActions.OPEN_ENTITY_EDITOR:
      state = {
        ...state,
        loading: true,
        _peIt_editable: {}
      };
      break;

    case InformationAPIActions.OPEN_ENTITY_EDITOR_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        _peIt_editable: action.meta.peItDetail,
        _teEnt_editable: undefined
      };
      break;

    case InformationAPIActions.OPEN_ENTITY_EDITOR_FAILED:
      state = {
        ...state,
        loading: false,
        _peIt_editable: undefined
      };
      break;

    /*****************************************************
    * Reducers to manage phenomenon editor
    *****************************************************/
    case InformationAPIActions.OPEN_PHENOMENON_EDITOR:
      state = {
        ...state,
        loading: true,
        _teEnt_editable: {}
      };
      break;

    case InformationAPIActions.OPEN_PHENOMENON_EDITOR_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        _teEnt_editable: action.meta.teEntDetail,
        _peIt_editable: undefined
      };
      break;

    case InformationAPIActions.OPEN_PHENOMENON_EDITOR_FAILED:
      state = {
        ...state,
        loading: false,
        _teEnt_editable: undefined
      };
      break;


    /*****************************************************
    * Reducers to manage entity add form
    *****************************************************/

    case InformationAPIActions.START_CREATE:
      state = {
        ...state,
        _peIt_add: {
          classAndTypePk: action.meta.classAndTypePk,
          pkUiContext: action.meta.pkUiContext
        }
      };
      break;

    case InformationAPIActions.STOP_CREATE:
      state = omit(['_peIt_add'], state);
      break;


    /************************************************
       * Reducers to remove PeIt from project
       ************************************************/

    case InformationAPIActions.REMOVE_PE_IT:
      state = {
        ...state,
        loading: true
      }
      break;


    case InformationAPIActions.REMOVE_PE_IT_SUCCEEDED:
      state = omit(['_peIt_editable'], state)
      break;


    case InformationAPIActions.REMOVE_PE_IT_FAILED:
      state = {
        ...state,
        loading: false
      }
      break;


    // case InformationAPIActions.ENTITY_ADD_EXISTING_INITIALIZED:
    //   state = {
    //     ...state,
    //     _peIt_add_form: action.payload._peIt_add_form
    //   };
    //   break;

    // case InformationAPIActions.ENTITY_ADD_EXISTING_DESTROYED:
    //   state = {
    //     ...omit(['_peIt_add_form'], state),
    //   }
    //   break;


    // case InformationAPIActions.PE_IT_CREATE_ADDED:
    //   state = {
    //     ...state,
    //     _peIt_create_form: action.payload._peIt_create_form
    //   };
    //   break;

    // case InformationAPIActions.PE_IT_CREATE_DESTROYED:
    //   state = {
    //     ...omit(['_peIt_create_form'], state),
    //   }
    //   break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case InformationAPIActions.DESTROY:
      state = null;
      break;

  }

  return state;
};

