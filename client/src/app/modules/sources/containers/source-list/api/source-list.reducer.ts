import { Action } from 'redux';
import { SourceListAPIAction, SourceListAPIActions } from './source-list.actions';
import { SourceList } from './source-list.models';
import { omit } from 'ramda';

const INITIAL_STATE = new SourceList();

export function sourceListReducer(state: SourceList = INITIAL_STATE, a: Action): SourceList {

  const action = a as SourceListAPIAction;

  switch (action.type) {

    case SourceListAPIActions.INITIALIZE_LIST:
      state = {
        ...state,
        list: {
          pkAllowedClasses: action.meta.pkAllowedClasses
        }
      }
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SourceListAPIActions.DESTROY:
      state = {};
      break;

  }

  return state;
};

