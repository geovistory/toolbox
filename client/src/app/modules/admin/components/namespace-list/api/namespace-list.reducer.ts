import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { NamespaceList } from './namespace-list.models';
import { NamespaceListAPIAction, NamespaceListAPIActions } from './namespace-list.actions';

const INITIAL_STATE = new NamespaceList();

export function namespaceListReducer(state: NamespaceList = INITIAL_STATE, a: Action): NamespaceList {

  const action = a as NamespaceListAPIAction;

  switch (action.type) {
    case NamespaceListAPIActions.LOAD_STARTED:
      return {
        ...state,
        namespaces: []
      };
    case NamespaceListAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        namespaces: action.payload.namespaces
      };
    case NamespaceListAPIActions.LOAD_FAILED:
      return {
        ...state,
        namespaces: []
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case NamespaceListAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

