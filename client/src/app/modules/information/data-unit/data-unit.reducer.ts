
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
          _children: sortChildrenByUiContext(
            {
              ...state._children,
              ...action.payload._children
            },
            action.meta.uiContext
          ),
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.ROLE_SET_REMOVED:
        const newRoleSets = Object.assign({}, state._children);
        delete newRoleSets[action.meta.key];

        state = {
          ...state,
          _children: newRoleSets
        }
        break;

      case DataUnitActions.PROP_SET_REMOVED:
        state = {
          ...state,
          _children: omit([action.meta.stateKey], state._children)
        }
        break;

      case DataUnitActions.PROP_SET_ADDED:
        state = {
          ...state,
          selectPropState: action.payload.selectPropState,
          _children: sortChildrenByUiContext(
            {
              ...state._children,
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

