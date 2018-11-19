import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { MentioningList } from './mentioning-list.models';
import { MentioningListAPIAction, MentioningListAPIActions } from './mentioning-list.actions';

const INITIAL_STATE = new MentioningList();

export function mentioningListReducer(state: MentioningList = INITIAL_STATE, a: Action): MentioningList {

  const action = a as MentioningListAPIAction;

  switch (action.type) {
    case MentioningListAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case MentioningListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case MentioningListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case MentioningListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

