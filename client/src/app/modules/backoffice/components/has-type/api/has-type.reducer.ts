import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { HasType } from './has-type.models';
import { HasTypeAPIAction, HasTypeAPIActions } from './has-type.actions';

const INITIAL_STATE = new HasType();

export function hasTypeReducer(state: HasType = INITIAL_STATE, a: Action): HasType {

  const action = a as HasTypeAPIAction;

  switch (action.type) {
    case HasTypeAPIActions.LOAD:
      state = {
        ...state,
        items: []
      };
      break;
    case HasTypeAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: action.meta.itemsArray
      };
      break;

    case HasTypeAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: []
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case HasTypeAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

