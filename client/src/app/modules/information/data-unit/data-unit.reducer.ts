
import { Action } from 'redux';
import { DataUnitAction, DataUnitActions } from './data-unit.actions';
import { DataUnit } from 'app/core/state/models';
import { omit } from 'ramda'
import { Meta } from '../../../../../node_modules/@angular/platform-browser';
import { sortChildrenByUiContext } from '../information.helpers';

const INITIAL_STATE = new DataUnit({
  selectPropState: 'init',
  parentPeIt: null,
});


export const dataUnitReducer =
  (state: DataUnit = INITIAL_STATE, action: DataUnitAction): DataUnit => {

    switch (action.type) {

      case DataUnitActions.ROLE_SET_LIST_DISPLAY_LABEL_UPDATED:
        state = {
          ...state,
          label: action.payload.label
        }
        break;

      case DataUnitActions.START_SELECT_PROPERTY:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.STOP_SELECT_PROPERTY:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.ROLE_SET_ADDED:
        state = {
          ...state,
          _fields: sortChildrenByUiContext(
            {
              ...state._fields,
              ...action.payload._fields
            },
            action.meta.uiContext
          ),
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.ROLE_SET_REMOVED:
        const newPropertyFields = Object.assign({}, state._fields);
        delete newPropertyFields[action.meta.key];

        state = {
          ...state,
          _fields: newPropertyFields
        }
        break;

      case DataUnitActions.PROP_SET_REMOVED:
        state = {
          ...state,
          _fields: omit([action.meta.stateKey], state._fields)
        }
        break;

      case DataUnitActions.PROP_SET_ADDED:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState,
          _fields: sortChildrenByUiContext(
            {
              ...state._fields,
              [action.meta.key]: action.meta.val
            },
            action.meta.uiContext
          )
        }
        break;


      case DataUnitActions.TOGGLE_REMOVE_VERIFICATION:
        state = {
          ...state,
          showRemoveVerification: !state.showRemoveVerification
        }
        break;
    }


    return state;
  };

