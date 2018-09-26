import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { Types } from './types.models';
import { TypesAPIAction, TypesAPIActions } from './types.actions';

const INITIAL_STATE = new Types();

export function typesReducer(state: Types = INITIAL_STATE, a: Action): Types {

  const action = a as TypesAPIAction;

  switch (action.type) {
    case TypesAPIActions.LOAD_STARTED:
      state = {
        ...state,
        items: {}
      };
      break;

    case TypesAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.types),
        class: action.meta.typeClass
      };
      break;
    case TypesAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;


    /*****************************************************
      * Reducers to manage the add form
      *****************************************************/
    case TypesAPIActions.OPEN_ADD_FORM:
      state = {
        ...state,
        add: true
      };
      break;

    case TypesAPIActions.CLOSE_ADD_FORM:
      state = {
        ...state,
        add: false
      };
      break;

    case TypesAPIActions.CREATE_STARTED:
      state = {
        ...state,
        add: false,
        loading: true
      };
      break;

    case TypesAPIActions.CREATE_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        items: {
          ...state.items,
          [action.meta.type.pk_entity]: action.meta.type
        }
      };
      break;

    case TypesAPIActions.CREATE_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.error
      };
      break;

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypesAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

