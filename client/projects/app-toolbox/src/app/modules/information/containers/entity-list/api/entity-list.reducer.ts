import { omit } from 'ramda';
import { Action } from 'redux';
import { InformationAPIAction, InformationAPIActions } from './entity-list.actions';
import { Information } from './entity-list.models';

const INITIAL_STATE = new Information();

export function informationReducer(state: Information = INITIAL_STATE, a: Action): Information {

  const action = a as InformationAPIAction;

  switch (action.type) {


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case InformationAPIActions.DESTROY:
      state = { };
      break;

  }

  return state;
};

