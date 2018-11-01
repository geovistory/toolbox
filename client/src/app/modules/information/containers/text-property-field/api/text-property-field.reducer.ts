import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { TextPropertyField } from './text-property-field.models';
import { TextPropertyFieldAPIAction, TextPropertyFieldAPIActions } from './text-property-field.actions';

const INITIAL_STATE = new TextPropertyField();

export function textPropertyListReducer(state: TextPropertyField = INITIAL_STATE, a: Action): TextPropertyField {

  const action = a as TextPropertyFieldAPIAction;

  switch (action.type) {
    case TextPropertyFieldAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case TextPropertyFieldAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case TextPropertyFieldAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TextPropertyFieldAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

