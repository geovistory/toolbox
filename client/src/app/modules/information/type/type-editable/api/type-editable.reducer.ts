import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { TypeAPIAction, TypeEditableAPIActions } from './type-editable.actions';
import { TypeDetail } from 'app/core/state/models/type-detail';

const INITIAL_STATE = new TypeDetail();

export function typeReducer(state: TypeDetail = INITIAL_STATE, a: Action): TypeDetail {

  const action = a as TypeAPIAction;

  switch (action.type) {
    case TypeEditableAPIActions.CHANGE_TYPE:
      state = {
        ...state,
        loading: true,
        editing: false
        // items: {}
      };
      break;

    case TypeEditableAPIActions.CHANGE_TYPE_SUCCEEDED:
      state = {
        ...state,
        entityAssociation: action.meta.entityAssociation
      };
      break;

    case TypeEditableAPIActions.CHANGE_TYPE_FAILED:
      state = {
        ...state,
        loading: false
      };
      break;

    case TypeEditableAPIActions.LOAD_SUCCEEDED:
      state = {
       ...state,
       entityAssociation: action.payload.entityAssociation,
       label: action.payload.label
      };
      break;

    case TypeEditableAPIActions.LOAD_FAILED:
      state = {
        ...state,
        loading: false
      };
      break;


    case TypeEditableAPIActions.START_EDIT:
      state = {
        ...state,
        editing: true
      };
      break;

    case TypeEditableAPIActions.STOP_EDIT:
      state = {
        ...state,
        editing: false
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TypeEditableAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

