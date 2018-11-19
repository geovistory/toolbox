import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { Repros } from './repros.models';
import { ReprosAPIAction, ReprosAPIActions } from './repros.actions';

const INITIAL_STATE = new Repros();

export function reprosReducer(state: Repros = INITIAL_STATE, a: Action): Repros {

  const action = a as ReprosAPIAction;

  switch (action.type) {
    case ReprosAPIActions.INIT:
      state = new Repros();
      break;

    case ReprosAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case ReprosAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case ReprosAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;


    /*****************************************************
    * Reducers to manage the visibility of elements
    *****************************************************/

    case ReprosAPIActions.TOGGLE_TEXT:
      state = {
        ...state,
        showText: !state.showText
      };
      break;

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ReprosAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

