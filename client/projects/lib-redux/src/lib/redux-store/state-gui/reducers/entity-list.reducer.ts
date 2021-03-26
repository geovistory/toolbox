import { Action } from 'redux';
import { Information } from '../models/entity-list.models';
import { InformationAPIAction, InformationAPIActions } from '../actions/entity-list.actions';


const INITIAL_STATE = new Information();

export function informationReducer(state: Information = INITIAL_STATE, a: Action): Information {

  const action = a as InformationAPIAction;

  switch (action.type) {


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case InformationAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

