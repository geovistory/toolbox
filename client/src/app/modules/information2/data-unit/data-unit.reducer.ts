
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
          _roleSet_list: {
            ...lastState._roleSet_list,
            ...action.payload._roleSet_list
          },
          selectPropState: action.payload.selectPropState
        }
        break;

      case DataUnitActions.ROLE_SET_REMOVED:
        let newRoleSets = Object.assign({}, lastState._roleSet_list);
        delete newRoleSets[action.meta.key];

        lastState = {
          ...lastState,
          _roleSet_list: newRoleSets
        }
        break;

      case DataUnitActions.PROP_SET_REMOVED:
        lastState = omit([action.meta.stateKey], lastState)
        break;

      case DataUnitActions.PROP_SET_ADDED:
        lastState = {
          ...lastState,
          selectPropState: action.payload.selectPropState,
          [action.meta.key]: action.meta.val
        }
        break;
    }


    return lastState;
  };

