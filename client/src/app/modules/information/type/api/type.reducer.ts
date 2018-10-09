import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { TypeAPIAction, TypeAPIActions } from './type.actions';
import { TypeDetail } from 'app/core/state/models/type-detail';

const INITIAL_STATE = new TypeDetail();

export function typeReducer(state: TypeDetail = INITIAL_STATE, a: Action): TypeDetail {

  const action = a as TypeAPIAction;

  switch (action.type) {
    case TypeAPIActions.LOAD:
      state = {
        ...state,
        // items: {}
      };
      break;
    case TypeAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        // items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case TypeAPIActions.LOAD_FAILED:
      state = {
        ...state,
        // items: {}
      };
      break;


    case TypeAPIActions.START_EDIT:
      state = {
        ...state,
        editing: true
      };
      break;

    case TypeAPIActions.STOP_EDIT:
      state = {
        ...state,
        editing: false
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypeAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

