import { indexBy, prop, omit } from 'ramda';
import { Action } from 'redux';
import { DfhLabelListEdit } from './dfh-label-list-edit.models';
import { DfhLabelListEditAPIAction, DfhLabelListEditAPIActions } from './dfh-label-list-edit.actions';
import { pkEntityKey } from 'app/core/state/services/state-creator';

const INITIAL_STATE = new DfhLabelListEdit();

export function dfhLabelListEditReducer(state: DfhLabelListEdit = INITIAL_STATE, a: Action): DfhLabelListEdit {

  const action = a as DfhLabelListEditAPIAction;

  switch (action.type) {

    case DfhLabelListEditAPIActions.START_CREATE:
      state = {
        ...state,
        creating: true
      };
      break;
    case DfhLabelListEditAPIActions.STOP_CREATE:
      state = {
        ...state,
        creating: false
      };
      break;

    case DfhLabelListEditAPIActions.CREATE:
      state = {
        ...state,
        loading: true
      };
      break;
    case DfhLabelListEditAPIActions.CREATE_SUCCEEDED:
      state = {
        ...state,
        loading: false,
        creating: false,
        items: {
          ...state.items,
          [pkEntityKey(action.meta.dfhLabel)]: action.meta.dfhLabel
        }
      };
      break;

    case DfhLabelListEditAPIActions.CREATE_FAILED:
      state = {
        ...state,
        loading: false,
        creating: false
      };
      break;

    case DfhLabelListEditAPIActions.DELETE:
      state = {
        ...state,
        loading: true
      };
      break;


    case DfhLabelListEditAPIActions.DELETE_SUCCEEDED:
      state = {
        items: {
          ...omit([pkEntityKey(action.meta.dfhLabel)], state.items)
        },
        loading: false
      };
      break;

    case DfhLabelListEditAPIActions.DELETE_FAILED:
      state = {
        ...state,
        loading: false
      };
      break;


    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case DfhLabelListEditAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

