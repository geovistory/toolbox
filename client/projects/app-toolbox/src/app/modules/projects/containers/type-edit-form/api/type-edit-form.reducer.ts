// TODO DELETE
import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { TypeEditForm } from './type-edit-form.models';
import { TypeEditFormAPIAction, TypeEditFormAPIActions } from './type-edit-form.actions';

const INITIAL_STATE = new TypeEditForm();

export function typeEditFormReducer(state: TypeEditForm = INITIAL_STATE, a: Action): TypeEditForm {

  const action = a as TypeEditFormAPIAction;

  switch (action.type) {
    case TypeEditFormAPIActions.LOAD_STARTED:
      state = {
        ...state,
      };
      break;
    case TypeEditFormAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
      };
      break;

    case TypeEditFormAPIActions.LOAD_FAILED:
      state = {
        ...state,
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypeEditFormAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

