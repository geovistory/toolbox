import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { SystemTypeList } from './system-type-list.models';
import { SystemTypeListAPIAction, SystemTypeListAPIActions } from './system-type-list.actions';

const INITIAL_STATE = new SystemTypeList();

export function systemtypeListReducer(state: SystemTypeList = INITIAL_STATE, a: Action): SystemTypeList {

  const action = a as SystemTypeListAPIAction;

  switch (action.type) {
    case SystemTypeListAPIActions.LOAD_STARTED:
      return {
        ...state,
        systemtypes: []
      };
    case SystemTypeListAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        systemtypes: action.payload.systemtypes
      };
    case SystemTypeListAPIActions.LOAD_FAILED:
      return {
        ...state,
        systemtypes: []
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case SystemTypeListAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

