import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { Types } from './types.models';
import { TypesAPIAction, TypesAPIActions } from './types.actions';

const INITIAL_STATE = new Types();

export function typesReducer(state: Types = INITIAL_STATE, a: Action): Types {

  const action = a as TypesAPIAction;

  switch (action.type) {
    case TypesAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: {}
      };
    case TypesAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.types)
      };
    case TypesAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {}
      };


    /*****************************************************
      * Reducers to manage the add form
      *****************************************************/
    case TypesAPIActions.OPEN_ADD_FORM:
      return {
        ...state,
        add: true
      };

    case TypesAPIActions.CLOSE_ADD_FORM:
      return {
        ...state,
        add: false
      };

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypesAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

