import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { VisualList } from './visual-list.models';
import { VisualListAPIAction, VisualListAPIActions } from './visual-list.actions';

const INITIAL_STATE = new VisualList();

export function visualListReducer(state: VisualList = INITIAL_STATE, a: Action): VisualList {

  const action = a as VisualListAPIAction;

  switch (action.type) {
    case VisualListAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case VisualListAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case VisualListAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case VisualListAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

