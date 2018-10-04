import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { DfhLabelEdit } from './dfh-label-edit.models';
import { DfhLabelEditAPIAction, DfhLabelEditAPIActions } from './dfh-label-edit.actions';

const INITIAL_STATE = new DfhLabelEdit();

export function dfhLabelEditReducer(state: DfhLabelEdit = INITIAL_STATE, a: Action): DfhLabelEdit {

  const action = a as DfhLabelEditAPIAction;

  switch (action.type) {

    case DfhLabelEditAPIActions.START_EDIT:
      state = {
        ...state,
        editing: true
      };
      break;
    case DfhLabelEditAPIActions.STOP_EDIT:
      state = {
        ...state,
        editing: false
      };
      break;

    case DfhLabelEditAPIActions.SAVE:
      state = {
        ...state,
        loading: true
      };
      break;
    case DfhLabelEditAPIActions.SAVE_SUCCEEDED:
      state = {
        ...state,
        ...action.meta.dfhLabel,
        loading: false,
        editing: false
      };
      break;

    case DfhLabelEditAPIActions.SAVE_FAILED:
      state = {
        ...state,
        loading: false
      };
      break;





    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case DfhLabelEditAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

