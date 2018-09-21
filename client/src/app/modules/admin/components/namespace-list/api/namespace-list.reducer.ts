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
        items: {},
        loading: true,
        error: null,
      };
    case NamespaceListAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray), // <- change index prop
        loading: false,
        error: null,
      };
    case NamespaceListAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {},
        loading: false,
        error: action.error,
      };


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case NamespaceListAPIActions.DESTROY:
    return undefined;
  }

  return state;
};

