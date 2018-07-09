
import { Action } from 'redux';
import { DataUnitAction, DataUnitActions } from './data-unit.actions';
import { DataUnit } from '../information.models';
import { omit } from 'ramda'
import { Meta } from '../../../../../node_modules/@angular/platform-browser';

const INITIAL_STATE: DataUnit = {
  selectPropState: 'init',
  parentPeIt: null,
};


export const dataUnitReducer =
  (lastState: DataUnit = INITIAL_STATE, action: DataUnitAction): DataUnit => {

    switch (action.type) {

      case DataUnitActions.ROLE_SET_LIST_DISPLAY_LABEL_UPDATED:
        lastState = {
          ...lastState,
          label: action.payload.label
        }
        break;

      case DataUnitActions.START_SELECT_PROPERTY:
        lastState = {
          ...lastState,
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.STOP_SELECT_PROPERTY:
        lastState = {
          ...lastState,
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.ROLE_SET_ADDED:
        lastState = {
          ...lastState,
          _children: {
            ...lastState._children,
            ...action.payload._children
          },
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.ROLE_SET_REMOVED:
        let newRoleSets = Object.assign({}, lastState._children);
        delete newRoleSets[action.meta.key];

        lastState = {
          ...lastState,
          _children: newRoleSets
        }
        break;

      case DataUnitActions.PROP_SET_REMOVED:
        lastState = {
          ...lastState,
          _children: omit([action.meta.stateKey], lastState._children)
        }
        break;

      case DataUnitActions.PROP_SET_ADDED:
        lastState = {
          ...lastState,
          selectPropState: action.payload.selectPropState,
          _children: {
            ...lastState._children,
            [action.meta.key]: action.meta.val
          }
        }
        break;
    }


    return lastState;
  };

