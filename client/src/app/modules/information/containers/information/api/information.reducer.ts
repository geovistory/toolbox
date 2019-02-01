import { omit } from 'ramda';
import { Action } from 'redux';
import { InformationAPIAction, InformationAPIActions } from './information.actions';
import { Information } from './information.models';

const INITIAL_STATE = new Information();

export function informationReducer(state: Information = INITIAL_STATE, a: Action): Information {

  const action = a as InformationAPIAction;

  switch (action.type) {

    /*****************************************************
    * Reducers to manage the list
    *****************************************************/
    case InformationAPIActions.INITIALIZE_LIST:
      state = {
        ...state,
        items: {
          pkAllowedClasses: action.meta.pkClasses
        }
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case InformationAPIActions.DESTROY:
      state = { };
      break;

  }

  return state;
};

