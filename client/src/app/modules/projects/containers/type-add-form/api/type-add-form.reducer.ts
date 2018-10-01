import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { TypeAddForm } from './type-add-form.models';
import { TypeAddFormAPIAction, TypeAddFormAPIActions } from './type-add-form.actions';

const INITIAL_STATE = new TypeAddForm();

export function typeAddFormReducer(state: TypeAddForm = INITIAL_STATE, a: Action): TypeAddForm {

  const action = a as TypeAddFormAPIAction;

  switch (action.type) {
    case TypeAddFormAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: {}
      };
    case TypeAddFormAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
    case TypeAddFormAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {}
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypeAddFormAPIActions.DESTROY:
    return undefined;
  }

  return state;
};

