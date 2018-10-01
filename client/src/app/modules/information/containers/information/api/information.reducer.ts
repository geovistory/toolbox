import { indexBy, prop, omit } from 'ramda';
import { Action } from 'redux';
import { Information } from './information.models';
import { InformationAPIAction, InformationAPIActions } from './information.actions';

const INITIAL_STATE = new Information();

export function informationReducer(state: Information = INITIAL_STATE, a: Action): Information {

  const action = a as InformationAPIAction;

  /*****************************************************
  * Reducers to manage searching of data units
  *****************************************************/
  switch (action.type) {
    case InformationAPIActions.SEARCH_STARTED:
      state = {
        ...state,
        _peIt_list: [],
        loading: true
      };
      break;
    case InformationAPIActions.SEARCH_SUCCEEDED:
      state = {
        ...state,
        _peIt_list: action.meta.searchResponse.data,
        collectionSize: action.meta.searchResponse.totalCount,
        loading: false
      };
      break;

    case InformationAPIActions.SEARCH_FAILED:
      state = {
        ...state,
        _peIt_list: [],
        loading: false
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
        _peIt_editable: action.meta.peItDetail
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
    * Reducers to manage entity add form
    *****************************************************/

    case InformationAPIActions.ENTITY_ADD_EXISTING_INITIALIZED:
      state = {
        ...state,
        _peIt_add_form: action.payload._peIt_add_form
      };
      break;

    case InformationAPIActions.ENTITY_ADD_EXISTING_DESTROYED:
      state = {
        ...omit(['_peIt_add_form'], state),
      }
      break;


    case InformationAPIActions.PE_IT_CREATE_ADDED:
      state = {
        ...state,
        _peIt_create_form: action.payload._peIt_create_form
      };
      break;

    case InformationAPIActions.PE_IT_CREATE_DESTROYED:
      state = {
        ...omit(['_peIt_create_form'], state),
      }
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case InformationAPIActions.DESTROY:
      state = null;
      break;

  }

  return state;
};

